import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET(req: Request) {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "equipment_repair",
    });

    const [rows]: any = await conn.execute(
      `SELECT rr.id, rr.equipment_code, rr.equipment_name, rr.building, rr.floor, rr.room,
              rr.status, rr.description, rr.reporter, rr.assigned_to, u.name as assigned_to_name,
              rr.priority, rr.report_date, rr.assigned_date, rr.completed_date, rr.images, rr.notes,
              r.assigned_technician as room_assigned_technician, ru.name as room_assigned_name,
              GROUP_CONCAT(i.image_url SEPARATOR '||') as images_from_table
       FROM tb_repair_requests rr
       LEFT JOIN tb_users u ON rr.assigned_to = u.id
       LEFT JOIN tb_images i ON i.repair_request_id = rr.id
       LEFT JOIN tb_room r ON rr.room = r.code
       LEFT JOIN tb_users ru ON r.assigned_technician = ru.id
       GROUP BY rr.id
       ORDER BY rr.report_date DESC`
    );

    await conn.end();

    const detectMimeFromBuffer = (b: Buffer) => {
      if (!b || b.length < 4) return 'application/octet-stream';
      if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'image/png';
      if (b[0] === 0xff && b[1] === 0xd8) return 'image/jpeg';
      if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return 'image/gif';
      return 'application/octet-stream';
    };

    const bufferToUtf8 = (v: any) => {
      try {
        if (Buffer.isBuffer(v)) return v.toString('utf8');
        if (typeof v === 'string') return v;
        return String(v);
      } catch (e) {
        return '';
      }
    };

    const mapped = rows.map((r: any) => {
      const images: string[] = [];

      // images from tb_images (filenames)
      if (r.images_from_table) {
        try {
          const parts = (r.images_from_table || '').split('||').filter(Boolean);
          for (const fn of parts) images.push(`/uploads/${String(fn).replace(/^\/+/, '')}`);
        } catch (e) {
          // ignore
        }
      }

      // images from rr.images column: could be JSON (array of filenames or objects), BLOB binary image, or comma-separated
      if (r.images) {
        try {
          const raw = bufferToUtf8(r.images);
          let parsed: any = null;
          try { parsed = JSON.parse(raw); } catch (e) { parsed = null; }

          if (parsed) {
            if (Array.isArray(parsed)) {
              for (const it of parsed) {
                if (!it) continue;
                if (typeof it === 'string') {
                  images.push(`/uploads/${String(it).replace(/^\/+/, '')}`);
                  continue;
                }
                if (it.data && it.mime) {
                  images.push(`data:${it.mime};base64,${it.data}`);
                  continue;
                }
                if (it.filename) {
                  images.push(`/uploads/${String(it.filename).replace(/^\/+/, '')}`);
                }
              }
            } else if (typeof parsed === 'object' && parsed.data) {
              images.push(`data:${parsed.mime || 'application/octet-stream'};base64,${parsed.data}`);
            }
          } else {
            if (Buffer.isBuffer(r.images)) {
              const mime = detectMimeFromBuffer(r.images);
              images.push(`data:${mime};base64,${r.images.toString('base64')}`);
            } else if (typeof raw === 'string' && raw.trim()) {
              const arr = raw.includes(',') ? raw.split(',') : [raw];
              for (const fn of arr) {
                const s = String(fn).trim();
                if (!s) continue;
                images.push(s.startsWith('/') || s.startsWith('http') ? s : `/uploads/${s.replace(/^\/+/, '')}`);
              }
            }
          }
        } catch (e) {
          // ignore parsing errors
        }
      }

      const unique = Array.from(new Set(images.filter(Boolean)));

      return {
        id: String(r.id),
        equipmentCode: r.equipment_code,
        equipmentName: r.equipment_name,
        location: { building: r.building, floor: String(r.floor), room: r.room },
        status: r.status,
        description: r.description,
        reporter: r.reporter,
        assignedTo: r.assigned_to || null,
        assignedToName: r.assigned_to_name || null,
        roomAssignedTechnician: r.room_assigned_technician || null,
        roomAssignedTechnicianName: r.room_assigned_name || null,
        reportDate: r.report_date ? (typeof r.report_date === 'string' ? r.report_date : r.report_date.toISOString().slice(0,10)) : null,
        priority: r.priority,
        images: unique,
        completedDate: r.completed_date ? (typeof r.completed_date === 'string' ? r.completed_date : r.completed_date.toISOString()) : null,
        notes: r.notes,
      };
    });

    return NextResponse.json(mapped);
  } catch (e) {
    return NextResponse.json({ success: false, message: 'DB error', error: String(e) }, { status: 500 });
  }
}
