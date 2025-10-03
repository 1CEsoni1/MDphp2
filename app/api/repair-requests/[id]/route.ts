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
			const rawAssignedTo = body.assignedTo;
			const rawNotes = body.notes;
			const rawChangedBy = body.changedBy;
			const status = Array.isArray(rawStatus) ? rawStatus[0] : rawStatus;
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

				await conn.execute(updateSql, updateParams);

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
