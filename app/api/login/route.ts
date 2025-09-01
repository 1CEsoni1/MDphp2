import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ success: false, message: "กรุณากรอกข้อมูลให้ครบ" });
  }
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "", // ใส่รหัสผ่าน mysql ของคุณถ้ามี
      database: "equipment_repair",
    });
    const [users]: any = await conn.execute(
      `SELECT tb_users.*, tb_type.id as type_id, tb_type.name as type_name FROM tb_users JOIN tb_type ON tb_users.type_id = tb_type.id WHERE username = ? AND password = ? LIMIT 1`,
      [username, password]
    );
    await conn.end();
    if (users.length === 1) {
      // type_id = 01 (admin), 02 (technician) ตามเลข 2 ตัวแรกของ id
      return NextResponse.json({
        success: true,
        type_id: users[0].type_id,
        user_id: users[0].id,
        username: users[0].username,
        name: users[0].name,
        type_name: users[0].type_name,
      });
    } else {
      return NextResponse.json({ success: false, message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
    }
  } catch (e) {
    return NextResponse.json({ success: false, message: "เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล" });
  }
}
