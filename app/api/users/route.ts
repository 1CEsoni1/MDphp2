import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // เรียก PHP API (ใช้ตัวแปรสภาพแวดล้อมเพื่อให้ปรับบนเครื่องอื่นได้)
    const base = process.env.PHP_API_BASE || 'http://localhost/modul/New%20folder/MDphp2';
    const url = `${base.replace(/\/$/, '')}/api/endpoints/users.php`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    const users = await response.json();
    
    // แปลงรูปแบบข้อมูลให้ตรงกับที่หน้าแอดมินต้องการ
    const formattedUsers = users.map((user: any) => ({
      user_id: user.id,
      username: user.username,
      type_id: user.type,
      name: user.name
    }));
    
    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}