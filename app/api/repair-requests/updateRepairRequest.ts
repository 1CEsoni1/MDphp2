import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

async function ensureUploadsDir() {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  return uploadsDir;
}

export async function PATCH(req: Request, params: any) {
  try {
    const body = await req.json();
    const { status, assignedTo, notes, changedBy, files } = body;
    const id = params?.params?.id || params?.id;
    if (!status) return NextResponse.json({ success: false, message: 'missing status' }, { status: 400 });

    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "equipment_repair",
    });

    const [rows]: any = await conn.execute('SELECT id, status FROM tb_repair_requests WHERE id = ?', [id]);
    if (rows.length === 0) {
      await conn.end();
      return NextResponse.json({ success: false, message: 'not found' }, { status: 404 });
    }
    const oldStatus = rows[0].status;
    const oldStatusValue = oldStatus ?? '';

    await conn.execute(
      'UPDATE tb_repair_requests SET status = ?, assigned_to = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, assignedTo || null, notes || null, id]
    );

    if (oldStatus !== status && changedBy) {
      await conn.execute(
        'INSERT INTO tb_status_logs (repair_request_id, old_status, new_status, changed_by) VALUES (?, ?, ?, ?)',
        [id, oldStatusValue, status, changedBy]
      );
    }

  // handle files array [{ name, data: base64 }]
    let imagesUpdated = false;
    const handlerErrors: string[] = [];
    const savedFilenames: string[] = [];
    if (Array.isArray(files) && files.length > 0) {
      const uploadsDir = await ensureUploadsDir();
      // savedFilesObjects will hold objects { filename, data: <base64>, mime }
      const savedFilesObjects: any[] = [];
      for (const f of files) {
        try {
          const filename = `${Date.now()}-${(f.name || 'upload').replace(/[^a-zA-Z0-9._-]/g, '-')}`;
          const filePath = path.join(uploadsDir, filename);
          // extract mime and base64
          const dataStr = String(f.data || '');
          const m = dataStr.match(/^data:([^;]+);base64,(.*)$/);
          let mime = 'application/octet-stream';
          let base64 = dataStr.replace(/^data:.*;base64,/, '');
          if (m) {
            mime = m[1];
            base64 = m[2];
          }
          fs.writeFileSync(filePath, Buffer.from(base64, 'base64'));
          // only store filename in DB images column to avoid large packet sizes
          savedFilesObjects.push(filename);
          savedFilenames.push(filename);
        } catch (fileErr) {
          console.error('failed to save file', fileErr);
        }
      }

      // if any files saved, append them into tb_repair_requests.images (store JSON blob of objects)
      if (savedFilesObjects.length > 0) {
        // persist each saved filename into tb_images only if we have changedBy (to satisfy FK constraint)
        if (changedBy) {
          try {
            for (const fn of savedFilenames) {
              await conn.execute('INSERT INTO tb_images (repair_request_id, image_url, uploaded_by) VALUES (?, ?, ?)', [id, fn, changedBy]);
            }
          } catch (imgInsErr) {
            console.error('failed to insert into tb_images', imgInsErr);
            handlerErrors.push(String(imgInsErr));
          }
        } else {
          handlerErrors.push('skipped inserting tb_images because changedBy was not provided');
        }

        // Always try to update images column (store JSON array of objects with base64)
        try {
          const [resRows]: any = await conn.execute('SELECT images FROM tb_repair_requests WHERE id = ?', [id]);
          let existing: string[] = [];
          if (resRows && resRows.length > 0 && resRows[0].images) {
            try {
              const raw = typeof resRows[0].images === 'string' ? resRows[0].images : resRows[0].images.toString();
              const parsed = JSON.parse(raw);
              if (Array.isArray(parsed)) existing = parsed.map((it: any) => (typeof it === 'string' ? it : (it.filename || ''))).filter(Boolean);
            } catch (e) {
              if (typeof resRows[0].images === 'string') {
                existing = resRows[0].images ? resRows[0].images.split(',') : [];
              }
            }
          }
          const merged = existing.concat(savedFilesObjects as string[]);
          try {
            await conn.execute('UPDATE tb_repair_requests SET images = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [JSON.stringify(merged), id]);
            imagesUpdated = true;
          } catch (updErr) {
            console.error('failed to execute UPDATE tb_repair_requests images', updErr);
            handlerErrors.push(String(updErr));
          }
        } catch (imgErr) {
          console.error('failed to update images column', imgErr);
          handlerErrors.push(String(imgErr));
        }
      }
    }

  await conn.end();
  return NextResponse.json({ success: true, savedFiles: savedFilenames, imagesUpdated, errors: handlerErrors });
  } catch (e) {
  return NextResponse.json({ success: false, message: 'DB error', error: String(e) }, { status: 500 });
  }
}
