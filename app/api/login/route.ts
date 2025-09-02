import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ success: false, message: "กรุณากรอกข้อมูลให้ครบ" });
  }
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "equipment_repair",
    });
    const [users]: any = await conn.execute(
      `SELECT tb_users.*, tb_type.id as type_id, tb_type.name as type_name FROM tb_users JOIN tb_type ON tb_users.type_id = tb_type.id WHERE username = ? AND password = ? LIMIT 1`,
      [username, password]
    );
    await conn.end();
    if (users.length === 1) {
      // type_id = 01 (admin), 02 (technician) ตามเลข 2 ตัวแรกของ id
      const u = users[0];
      return NextResponse.json({
        success: true,
        type_id: u.type_id,
        user_id: u.id,
        userId: u.id,
        id: u.id,
        username: u.username,
        name: u.name,
        type_name: u.type_name,
      });
    } else {
      return NextResponse.json({ success: false, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
    }
  } catch (e) {
    return NextResponse.json({ success: false, message: "เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล", error: String(e) }, { status: 500 });
  }
}
