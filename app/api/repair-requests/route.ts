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
		return NextResponse.json({ success: false, message: 'DB error', error: String(e) }, { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const {
			equipment_code,
			equipment_name,
			building,
			floor,
			room,
			description,
			priority,
			reporter,
			status = 'pending'
		} = body;

		// ตรวจสอบข้อมูลที่จำเป็น (อนุญาตให้ building/floor/room เป็นค่าว่างได้จากฟรอนต์เอนด์)
		if (!equipment_code || !equipment_name || !description || !reporter) {
			return NextResponse.json(
				{ success: false, message: 'กรุณากรอกข้อมูลที่จำเป็น: รหัส, ชื่อ, รายละเอียด และผู้แจ้ง' },
				{ status: 400 }
			);
		}

		const conn = await mysql.createConnection({
			host: process.env.DB_HOST || "localhost",
			user: process.env.DB_USER || "root",
			password: process.env.DB_PASS || "",
			database: process.env.DB_NAME || "equipment_repair",
		});

		// เพิ่มรายการแจ้งซ่อมใหม่
		// Normalize optional fields to NULL when empty to avoid SQL type errors
		const dbBuilding = building && String(building).trim() !== "" ? building : null;
		const dbFloor = floor !== undefined && floor !== null && String(floor).trim() !== "" ? floor : null;
		const dbRoom = room && String(room).trim() !== "" ? room : null;

		// If the room has an assigned technician in tb_room.assigned_technician, use that ID
		let assignedTo: string | null = null;
		if (dbRoom) {
			try {
				const [roomRows]: any = await conn.execute(
					`SELECT assigned_technician FROM tb_room WHERE code = ? LIMIT 1`,
					[dbRoom]
				);
				if (roomRows && roomRows[0] && roomRows[0].assigned_technician) {
					assignedTo = String(roomRows[0].assigned_technician);
				}
			} catch (err) {
				console.warn('Failed to lookup assigned technician for room', dbRoom, err);
			}
		}

		// helper: return current datetime in Thailand timezone (UTC+7) as MySQL DATETIME
		const getThaiDatetime = () => {
			const d = new Date();
			const thai = new Date(d.getTime() + 7 * 60 * 60 * 1000);
			return thai.toISOString().slice(0,19).replace('T', ' ');
		};

		const assignedDate = assignedTo ? getThaiDatetime() : null;

		const [result]: any = await conn.execute(
			`INSERT INTO tb_repair_requests 
			(equipment_code, equipment_name, building, floor, room, status, description, reporter, assigned_to, assigned_date, priority, report_date) 
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())`,
			[equipment_code, equipment_name, dbBuilding, dbFloor, dbRoom, status, description, reporter, assignedTo, assignedDate, priority || 'medium']
		);

		await conn.end();

		return NextResponse.json({
			success: true,
			message: 'สร้างรายการแจ้งซ่อมสำเร็จ',
			id: result.insertId
		});

	} catch (e) {
		console.error('Error creating repair request:', e);
		return NextResponse.json(
			{ success: false, message: 'เกิดข้อผิดพลาดในการสร้างรายการแจ้งซ่อม', error: String(e) },
			{ status: 500 }
		);
	}
}
