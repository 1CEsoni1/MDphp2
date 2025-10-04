import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function GET(req: NextRequest) {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'equipment_repair',
    })

    const [rows]: any = await conn.execute('SELECT * FROM tb_equipment ORDER BY id ASC')
    await conn.end()

    return NextResponse.json(Array.isArray(rows) ? rows : [])
  } catch (e) {
    console.error('GET /api/equipment error', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'equipment_repair',
    })

    await conn.execute('DELETE FROM tb_equipment WHERE id = ?', [id])
    await conn.end()

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('DELETE /api/equipment error', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body || !body.id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    const { id, name, code, status } = body
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'equipment_repair',
    })

    const parts: string[] = []
    const params: any[] = []
    if (name !== undefined) { parts.push('name = ?'); params.push(name) }
    if (code !== undefined) { parts.push('code = ?'); params.push(code) }
    if (status !== undefined) { parts.push('status = ?'); params.push(status) }
    if (parts.length === 0) return NextResponse.json({ error: 'nothing to update' }, { status: 400 })

    params.push(id)
    const sql = `UPDATE tb_equipment SET ${parts.join(', ')} WHERE id = ?`
    await conn.execute(sql, params)
    await conn.end()

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('PATCH /api/equipment error', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
