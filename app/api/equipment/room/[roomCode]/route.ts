import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'equipment_repair'
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roomCode: string }> }
) {
  try {
    const { roomCode: rawRoomCode } = await params
    const roomCode = rawRoomCode?.toUpperCase()
    
    if (!roomCode) {
      return NextResponse.json({ error: 'Room code is required' }, { status: 400 })
    }

    console.log('[Equipment API] Fetching equipment for room:', roomCode)

    // Get equipment for the specified room
    const [equipmentRows] = await (await connection).execute(
      'SELECT * FROM tb_equipment WHERE room = ? ORDER BY id ASC',
      [roomCode]
    )

    // Get repair requests for this room
    const [repairRows] = await (await connection).execute(
      'SELECT * FROM tb_repair_requests WHERE room = ? AND status != "completed"',
      [roomCode]
    )

    const equipment = Array.isArray(equipmentRows) ? equipmentRows : []
    const repairs = Array.isArray(repairRows) ? repairRows : []
    
    console.log('[Equipment API] Found equipment:', equipment.length, 'repairs:', repairs.length)

    return NextResponse.json({
      equipment,
      repairs
    })
  } catch (error) {
    console.error('Error in equipment room API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}