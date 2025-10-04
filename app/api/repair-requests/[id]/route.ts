import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import formidable from "formidable";
import { Readable } from 'stream';

// Ensure this route runs on the Node runtime so filesystem operations and
// formidable parsing behave as expected in Next.js app router.
export const runtime = 'nodejs';

async function ensureUploadsDir() {
	const uploadsDir = path.join(process.cwd(), "public", "uploads");
	if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
	return uploadsDir;
}

export async function PATCH(req: Request, { params }: any) {
		try {
			console.log('[PATCH] /api/repair-requests/:id called')
			console.log('[PATCH] headers:', Object.fromEntries(req.headers.entries()))
			let body: any = {}
			let incomingFiles: any[] = []
			const contentType = (req.headers.get('content-type') || '').toLowerCase()
			if (contentType.includes('multipart/form-data')) {
				// parse with formidable
				const form = formidable({ multiples: true, keepExtensions: true });

				// Convert the Web Request (Fetch API) to a Node.js-readable stream
				// so formidable can parse it reliably in the app router.
				const raw = Buffer.from(await req.arrayBuffer());
				const nodeReq = new Readable();
				nodeReq.push(raw);
				nodeReq.push(null);
				// Provide headers/method/url to mimic IncomingMessage
				(nodeReq as any).headers = Object.fromEntries(req.headers.entries());
				(nodeReq as any).method = req.method;
				(nodeReq as any).url = req.url || '';

				const parsed: any = await new Promise((resolve, reject) => {
					form.parse(nodeReq as any, (err: any, fields: any, files: any) => {
						if (err) return reject(err);
						resolve({ fields, files });
					});
				});
				body = parsed.fields || {}
				console.log('[PATCH] parsed fields:', body)
				// normalize files to an array (handle many shapes: { files: [...]} or { files: { files: [...] } } or { myField: file })
				if (parsed.files) {
					const filesContainer = parsed.files;
					// If it's already an array
					if (Array.isArray(filesContainer)) {
						incomingFiles = filesContainer;
					} else if (typeof filesContainer === 'object') {
						// Flatten values (each value may be an array or single file)
						for (const val of Object.values(filesContainer)) {
							if (!val) continue;
							if (Array.isArray(val)) incomingFiles.push(...val as any[]);
							else incomingFiles.push(val as any);
						}
					} else {
						// fallback: single file
						incomingFiles = [filesContainer as any];
					}

					if (incomingFiles.length === 0) {
						// diagnostic: no files parsed even though parsed.files existed
						console.warn('[PATCH] parsed.files present but no files extracted', Object.keys(parsed.files || {}));
					}
				} else {
					// diagnostic: nothing parsed under files
					console.warn('[PATCH] no parsed.files (maybe client sent a different field name)');
				}
			} else {
				body = await req.json();
				console.log('[PATCH] json body:', body)
			}
			// sometimes Next provides params as a promise-like value
			const ctxParams = await params;
			// Normalise fields (formidable may return arrays for each field)
			const rawStatus = body.status;
			const rawDescription = body.description;
			const rawEquipmentName = body.equipment_name || body.equipmentName || body.equipmentName || body.equipmentName;
			const rawEquipmentCode = body.equipment_code || body.equipmentCode || body.code;
			const rawBuilding = body.building;
			const rawFloor = body.floor;
			const rawRoom = body.room;
			const rawReporter = body.reporter;
			const rawPriority = body.priority;
			const rawAssignedTo = body.assignedTo;
			const rawNotes = body.notes;
			const rawChangedBy = body.changedBy;
			const status = Array.isArray(rawStatus) ? rawStatus[0] : rawStatus;
			const description = Array.isArray(rawDescription) ? rawDescription[0] : rawDescription;
			const equipmentName = Array.isArray(rawEquipmentName) ? rawEquipmentName[0] : rawEquipmentName;
			const equipmentCode = Array.isArray(rawEquipmentCode) ? rawEquipmentCode[0] : rawEquipmentCode;
			const building = Array.isArray(rawBuilding) ? rawBuilding[0] : rawBuilding;
			const floor = Array.isArray(rawFloor) ? rawFloor[0] : rawFloor;
			const room = Array.isArray(rawRoom) ? rawRoom[0] : rawRoom;
			const reporter = Array.isArray(rawReporter) ? rawReporter[0] : rawReporter;
			const priority = Array.isArray(rawPriority) ? rawPriority[0] : rawPriority;
			let assignedTo = Array.isArray(rawAssignedTo) ? rawAssignedTo[0] : rawAssignedTo;
			const notes = Array.isArray(rawNotes) ? rawNotes[0] : rawNotes;
			const changedBy = Array.isArray(rawChangedBy) ? rawChangedBy[0] : rawChangedBy;
			// If client didn't send assignedTo (some multipart clients omit it), default to changedBy
			if (!assignedTo && changedBy) {
				assignedTo = changedBy;
			}
			console.log('[PATCH] status, assignedTo, notes length:', status, assignedTo, notes ? String(notes).length : 0)
				if (!status) return NextResponse.json({ success: false, message: 'missing status' }, { status: 400 });

				const conn = await mysql.createConnection({
						host: process.env.DB_HOST || "localhost",
						user: process.env.DB_USER || "root",
						password: process.env.DB_PASS || "",
						database: process.env.DB_NAME || "equipment_repair",
				});

				// Get current status and assigned_to
				const [rows]: any = await conn.execute('SELECT id, status, assigned_to FROM tb_repair_requests WHERE id = ?', [ctxParams.id]);
				if (rows.length === 0) {
						await conn.end();
						return NextResponse.json({ success: false, message: 'not found' }, { status: 404 });
				}
		const oldStatus = rows[0].status;
		const oldAssignedTo = rows[0].assigned_to;
		const oldStatusValue = oldStatus ?? '';

				// helper: return current datetime in Thailand timezone (UTC+7) as MySQL DATETIME
				const getThaiDatetime = () => {
					const d = new Date();
					const thai = new Date(d.getTime() + 7 * 60 * 60 * 1000);
					return thai.toISOString().slice(0,19).replace('T', ' ');
				};

				// determine timestamps to set
				let assignedDateToSet: string | null = null;
				let completedDateToSet: string | null = null;

				// If task is being assigned (either assignedTo provided or status becomes 'assigned'), set assigned_date
				if (assignedTo && String(assignedTo) !== String(oldAssignedTo)) {
					assignedDateToSet = getThaiDatetime();
				}

				// If status becomes completed (and wasn't completed before), set completed_date
				if (status === 'completed' && String(oldStatus) !== 'completed') {
					completedDateToSet = getThaiDatetime();
				}

				// Build dynamic update to include dates when needed
				const updateParts: string[] = ['status = ?', 'assigned_to = ?', 'notes = ?', 'updated_at = CURRENT_TIMESTAMP'];
				const updateParams: any[] = [status, assignedTo || null, notes || null];

				// include optional editable fields if provided
				if (equipmentName !== undefined) {
					updateParts.push('equipment_name = ?');
					updateParams.push(equipmentName);
				}
				// allow updating description and priority
				if (description !== undefined) {
					updateParts.push('description = ?');
					updateParams.push(description);
				}
				if (priority !== undefined) {
					updateParts.push('priority = ?');
					updateParams.push(priority);
				}
				if (equipmentCode !== undefined) {
					updateParts.push('equipment_code = ?');
					updateParams.push(equipmentCode);
				}
				if (building !== undefined) {
					updateParts.push('building = ?');
					updateParams.push(building);
				}
				if (floor !== undefined) {
					updateParts.push('floor = ?');
					updateParams.push(floor);
				}
				if (room !== undefined) {
					updateParts.push('room = ?');
					updateParams.push(room);
				}
				if (reporter !== undefined) {
					updateParts.push('reporter = ?');
					updateParams.push(reporter);
				}

				if (assignedDateToSet) {
					updateParts.push('assigned_date = ?');
					updateParams.push(assignedDateToSet);
				}
				if (completedDateToSet) {
					updateParts.push('completed_date = ?');
					updateParams.push(completedDateToSet);
				}

				const updateSql = `UPDATE tb_repair_requests SET ${updateParts.join(', ')} WHERE id = ?`;
				updateParams.push(ctxParams.id);
				// debug: show generated SQL and params so we can verify what's being updated
				console.log('[PATCH] updateSql:', updateSql)
				console.log('[PATCH] updateParams:', updateParams)
				await conn.execute(updateSql, updateParams);

				// Sync equipment status: if status is completed -> set equipment to working, otherwise mark as repair
				try {
					// Get the equipment_code for this repair (if present)
					const [rrRows]: any = await conn.execute('SELECT equipment_code FROM tb_repair_requests WHERE id = ?', [ctxParams.id]);
					if (rrRows && rrRows.length > 0 && rrRows[0].equipment_code) {
						const eqCode = String(rrRows[0].equipment_code);
						const eqStatus = status === 'completed' ? 'working' : 'repair';
						await conn.execute('UPDATE tb_equipment SET status = ? WHERE code = ? LIMIT 1', [eqStatus, eqCode]);
					}
				} catch (e) {
					console.warn('failed to sync tb_equipment status on PATCH', e);
				}

				// Insert status log
				if (oldStatus !== status && changedBy) {
						await conn.execute(
								'INSERT INTO tb_status_logs (repair_request_id, old_status, new_status, changed_by) VALUES (?, ?, ?, ?)',
						[ctxParams.id, oldStatusValue, status, changedBy]
						);
				}

				// handle files uploaded via multipart/form-data (formidable) available as incomingFiles
				let imagesUpdated = false;
				const handlerErrors: string[] = [];
				const savedFilenames: string[] = [];
				if (Array.isArray(incomingFiles) && incomingFiles.length > 0) {
					console.log('[PATCH] incomingFiles count:', incomingFiles.length)
					const uploadsDir = await ensureUploadsDir();
					const savedFilesObjects: string[] = [];
					for (const f of incomingFiles) {
						try {
							// formidable file object may have filepath, originalFilename, and mimetype
							const originalName = f.originalFilename || f.name || 'upload';
							const safeName = `${Date.now()}-${String(originalName).replace(/[^a-zA-Z0-9._-]/g, '-')}`;
							const destPath = path.join(uploadsDir, safeName);
							// move/rename temporary file to uploads directory
							try {
								// On some environments formidable uses 'filepath', on others 'path'
								const tmpPath = f.filepath || f.path || f.filePath;
								if (tmpPath && fs.existsSync(tmpPath)) {
									fs.renameSync(tmpPath, destPath);
								} else if (f.toBuffer) {
									// some formidable versions provide toBuffer()
									const buf = f.toBuffer();
									fs.writeFileSync(destPath, buf);
								} else if (f._writeStream && f._writeStream.path) {
									// fallback: attempt to copy
									fs.copyFileSync(f._writeStream.path, destPath);
								} else {
									// as a last resort, try reading raw data property
									const maybeData = f.data || f.buffer;
									if (maybeData) fs.writeFileSync(destPath, maybeData);
									else throw new Error('no temp file data available');
								}
								savedFilesObjects.push(safeName);
								savedFilenames.push(safeName);
							} catch (mvErr) {
								console.error('failed to move uploaded file', mvErr);
								handlerErrors.push(String(mvErr));
							}
						} catch (fileErr) {
							console.error('failed to process incoming file', fileErr);
							handlerErrors.push(String(fileErr));
						}
					}

					if (savedFilesObjects.length > 0) {
						// persist each saved filename into tb_images only if we have changedBy (to satisfy FK)
						if (changedBy) {
							try {
								for (const fn of savedFilenames) {
									// defensive coercion: ensure types are primitives
									const repairIdVal = typeof ctxParams.id === 'number' ? ctxParams.id : Number(ctxParams.id);
									const fileNameVal = String(fn);
									const changedByVal = String(changedBy);
									console.log('[PATCH] inserting tb_images values:', { repairIdVal, fileNameVal, changedByVal });
									try {
										await conn.execute('INSERT INTO tb_images (repair_request_id, image_url, uploaded_by) VALUES (?, ?, ?)', [repairIdVal, fileNameVal, changedByVal]);
									} catch (insErrInner) {
										console.error('failed to insert into tb_images (inner)', insErrInner, { repairIdVal, fileNameVal, changedByVal });
										handlerErrors.push(String(insErrInner));
									}
								}
							} catch (insErr) {
								console.error('failed to insert into tb_images', insErr);
								handlerErrors.push(String(insErr));
							}
						} else {
							handlerErrors.push('skipped inserting tb_images because changedBy was not provided');
						}

						// Always try to update images column (store JSON blob of filenames)
						try {
									console.log('[PATCH] savedFilesObjects:', savedFilesObjects)
							const [resRows]: any = await conn.execute('SELECT images FROM tb_repair_requests WHERE id = ?', [ctxParams.id]);
							let existing: any[] = [];
							if (resRows && resRows.length > 0 && resRows[0].images) {
								try {
									const raw = typeof resRows[0].images === 'string' ? resRows[0].images : resRows[0].images.toString();
									let parsed: any = [];
									try { parsed = JSON.parse(raw); } catch (e) { parsed = raw ? raw.split(',') : []; }
									if (Array.isArray(parsed)) existing = parsed.map((it: any) => (typeof it === 'string' ? it : (it.filename || ''))).filter(Boolean);
								} catch (e) {
									if (typeof resRows[0].images === 'string') {
										existing = resRows[0].images ? resRows[0].images.split(',') : [];
									}
								}
							}
							const merged = existing.concat(savedFilesObjects as string[]);
							try {
								const imagesPayload = JSON.stringify(merged);
								const repairIdVal = typeof ctxParams.id === 'number' ? ctxParams.id : Number(ctxParams.id);
								console.log('[PATCH] updating tb_repair_requests images with payload length', imagesPayload.length, { repairIdVal });
								await conn.execute('UPDATE tb_repair_requests SET images = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [imagesPayload, repairIdVal]);
								imagesUpdated = true;
							} catch (updErr) {
								console.error('failed to execute UPDATE tb_repair_requests images', updErr);
								handlerErrors.push(String(updErr));
							}
						} catch (imgErr) {
							console.error('failed to update images column', imgErr);
							handlerErrors.push(String(imgErr));
						}
					}
				}
			
				await conn.end();
				console.log('[PATCH] finished successfully')
				return NextResponse.json({ success: true, savedFiles: savedFilenames, imagesUpdated, errors: handlerErrors });
		} catch (e) {
					console.error('[PATCH] unhandled error', e)
					// try to include stack for debugging in dev
					const errAny: any = e
					const errMsg = errAny?.message ? errAny.message : String(errAny)
					const errStack = errAny?.stack ? errAny.stack : null
					return NextResponse.json({ success: false, message: 'DB error', error: errMsg, stack: errStack }, { status: 500 });
		}
}

export async function DELETE(req: Request, { params }: any) {
	const ctxParams = await params;
	const id = ctxParams.id;
	if (!id) return NextResponse.json({ success: false, message: 'missing id' }, { status: 400 });

	// basic admin check: expect header x-user-id and verify type_id === '01'
	try {
		const userId = req.headers.get('x-user-id');
		if (!userId) return NextResponse.json({ success: false, message: 'missing user id header' }, { status: 401 });

		const conn = await mysql.createConnection({
			host: process.env.DB_HOST || "localhost",
			user: process.env.DB_USER || "root",
			password: process.env.DB_PASS || "",
			database: process.env.DB_NAME || "equipment_repair",
		});

		try {
			// Some schemas use `id` as the primary key column. Try `id` first.
			let uRows: any = [];
			try {
				const res: any = await conn.execute('SELECT type_id FROM tb_users WHERE id = ? LIMIT 1', [userId]);
				uRows = res[0];
			} catch (colErr) {
				// fallback to user_id column if present
				const res: any = await conn.execute('SELECT type_id FROM tb_users WHERE user_id = ? LIMIT 1', [userId]);
				uRows = res[0];
			}
			if (!uRows || uRows.length === 0) {
				await conn.end();
				return NextResponse.json({ success: false, message: 'user not found' }, { status: 401 });
			}
			const typeId = uRows[0].type_id;
			if (String(typeId) !== '01') {
				await conn.end();
				return NextResponse.json({ success: false, message: 'forbidden' }, { status: 403 });
			}

			// Fetch equipment_code and images
			const [rrRows]: any = await conn.execute('SELECT equipment_code, images FROM tb_repair_requests WHERE id = ? LIMIT 1', [id]);
			if (!rrRows || rrRows.length === 0) {
				await conn.end();
				return NextResponse.json({ success: false, message: 'not found' }, { status: 404 });
			}
			const equipmentCode = rrRows[0].equipment_code;

			// Collect filenames from tb_images
			const [imgRows]: any = await conn.execute('SELECT image_url FROM tb_images WHERE repair_request_id = ?', [id]);
			const filenames: string[] = [];
			if (Array.isArray(imgRows) && imgRows.length > 0) {
				for (const r of imgRows) {
					if (r && r.image_url) filenames.push(String(r.image_url));
				}
			}

			// parse images JSON column as fallback
			try {
				if (rrRows[0].images) {
					const raw = typeof rrRows[0].images === 'string' ? rrRows[0].images : JSON.stringify(rrRows[0].images);
					const parsed = JSON.parse(raw || '[]');
					if (Array.isArray(parsed)) filenames.push(...parsed.map((it: any) => String(it)).filter(Boolean));
				}
			} catch (e) {
				// ignore
			}

			// Delete related rows (no transaction - execute sequentially)
			try {
				await conn.execute('DELETE FROM tb_images WHERE repair_request_id = ?', [id]);
			} catch (e) { console.warn('failed to delete tb_images rows', e); }
			try {
				await conn.execute('DELETE FROM tb_status_logs WHERE repair_request_id = ?', [id]);
			} catch (e) { console.warn('failed to delete tb_status_logs rows', e); }
			try {
				await conn.execute('DELETE FROM tb_repair_requests WHERE id = ? LIMIT 1', [id]);
			} catch (e) { console.warn('failed to delete tb_repair_requests row', e); }

			// Reconcile equipment status
			try {
				if (equipmentCode) {
					const [countRows]: any = await conn.execute("SELECT COUNT(*) AS cnt FROM tb_repair_requests WHERE equipment_code = ? AND status != 'completed'", [equipmentCode]);
					const cnt = (Array.isArray(countRows) && countRows[0] && (countRows[0].cnt !== undefined)) ? Number(countRows[0].cnt) : 0;
					const newEqStatus = cnt === 0 ? 'working' : 'repair';
					await conn.execute('UPDATE tb_equipment SET status = ? WHERE code = ? LIMIT 1', [newEqStatus, equipmentCode]);
				}
			} catch (e) {
				console.warn('failed to reconcile equipment status after delete', e);
			}

			await conn.end();

			// Unlink files after successful commit
			try {
				const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
				for (const fn of filenames) {
					if (!fn) continue;
					const p = path.join(uploadsDir, String(fn));
					try {
						if (fs.existsSync(p)) fs.unlinkSync(p);
					} catch (e) {
						console.warn('failed to unlink file', p, e);
					}
				}
			} catch (e) {
				console.warn('failed to remove uploaded files', e);
			}

			return NextResponse.json({ success: true, message: 'deleted successfully' });
		} catch (innerErr) {
			try { await conn.rollback(); } catch (rbErr) { console.warn('rollback failed', rbErr); }
			await conn.end();
			console.error('[DELETE] inner error', innerErr);
			return NextResponse.json({ success: false, message: 'delete error', error: String(innerErr) }, { status: 500 });
		}
	} catch (e) {
		console.error('[DELETE] unhandled error', e);
		const errAny: any = e;
		return NextResponse.json({ success: false, message: 'delete error', error: errAny?.message || String(errAny) }, { status: 500 });
	}
}
