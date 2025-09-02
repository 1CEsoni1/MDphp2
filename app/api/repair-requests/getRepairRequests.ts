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
              rr.priority, rr.report_date, rr.assigned_date, rr.completed_date, rr.images, rr.notes
       FROM tb_repair_requests rr
       LEFT JOIN tb_users u ON rr.assigned_to = u.id
       ORDER BY rr.report_date DESC`
    );

    await conn.end();

    const mapped = rows.map((r: any) => ({
      id: String(r.id),
      equipmentCode: r.equipment_code,
      equipmentName: r.equipment_name,
      location: {
        building: r.building,
        floor: String(r.floor),
        room: r.room,
      },
      status: r.status,
      description: r.description,
      reporter: r.reporter,
      assignedTo: r.assigned_to || null,
      assignedToName: r.assigned_to_name || null,
      reportDate: r.report_date ? (typeof r.report_date === 'string' ? r.report_date : r.report_date.toISOString().slice(0,10)) : null,
      priority: r.priority,
      images: r.images ? (typeof r.images === 'string' ? (JSON.parse(r.images || '[]') || []) : r.images) : [],
      completedDate: r.completed_date ? (typeof r.completed_date === 'string' ? r.completed_date : r.completed_date.toISOString()) : null,
      notes: r.notes,
    }));

    return NextResponse.json(mapped);
  } catch (e) {
    // include error details for debugging in dev
    return NextResponse.json({ success: false, message: 'DB error', error: String(e) }, { status: 500 });
  }
}
