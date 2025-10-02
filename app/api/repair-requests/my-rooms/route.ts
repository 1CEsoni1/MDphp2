import { NextRequest, NextResponse } from 'next/server'
import mysql from "mysql2/promise";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get('user_id')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    // Connect to MySQL directly
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root", 
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "equipment_repair",
    });

    // Query for repair requests either:
    // 1. In rooms assigned to this technician, OR
    // 2. Directly assigned to this technician
    const [rows]: any = await conn.execute(
      `SELECT rr.id, rr.equipment_code, rr.equipment_name, rr.building, rr.floor, rr.room,
              rr.status, rr.description, rr.reporter, rr.assigned_to, u.name as assigned_to_name,
              rr.priority, rr.report_date, rr.assigned_date, rr.completed_date, rr.images, rr.notes
       FROM tb_repair_requests rr
       LEFT JOIN tb_users u ON rr.assigned_to = u.id
       LEFT JOIN tb_room r ON rr.room = r.code
       WHERE r.assigned_technician = ? OR rr.assigned_to = ?
       ORDER BY rr.created_at DESC`,
      [userId, userId]
    );

    await conn.end();

    // Transform data to match frontend expectations
    const transformedData = rows.map((r: any) => ({
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

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error fetching repair requests:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}