import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function PATCH(req: Request, params: any) {
  try {
    const body = await req.json();
    const { status, assignedTo, notes, changedBy } = body;
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

    await conn.execute(
      'UPDATE tb_repair_requests SET status = ?, assigned_to = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, assignedTo || null, notes || null, id]
    );

    if (oldStatus !== status && changedBy) {
      await conn.execute(
        'INSERT INTO tb_status_logs (repair_request_id, old_status, new_status, changed_by) VALUES (?, ?, ?, ?)',
        [id, oldStatus, status, changedBy]
      );
    }

    await conn.end();
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, message: 'DB error', error: String(e) }, { status: 500 });
  }
}
