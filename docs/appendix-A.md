            <!--
            Appendix A — Code documentation (ready-to-paste)
            Title page is centered (both axes) using an inline wrapper so the block can be exported/printed.

            
                        คำอธิบาย (แยกเป็นบล็อกย่อย — loadEquipment)

                        1) บริบทและหน้าที่โดยรวม
                        - ฟังก์ชันนี้ดึงข้อมูลอุปกรณ์และรายการซ่อมจาก API ของห้องหนึ่ง ๆ แล้วแปลงเป็นรูปแบบ `Equipment[]` ที่หน้าจอแผนผังใช้
                        - ควรเรียกเมื่อ `selectedRoom` เปลี่ยนหรือเมื่อผู้ใช้รีเฟรชมุมมอง

                        2) เริ่มต้นและเรียก API
                        - `setLoading(true)` เปิด indicator
                        - เรียก `fetch(`/api/equipment/room/${selectedRoom.toUpperCase()}`)` เพื่อดึงข้อมูล
                        - ถ้า `response.ok` เป็น false ให้เซ็ต `setEquipmentList([])` แล้ว return (early exit)
                        - ข้อแนะนำ: ก่อน `.toUpperCase()` ควรตรวจสอบ `selectedRoom` ว่าไม่เป็น null/undefined

                        3) อ่านข้อมูลและเตรียม arrays
                        - `const data = await response.json();` และ `const equipmentData = data.equipment || [];`
                        - ถ้า API เปลี่ยนชื่อฟิลด์ ให้เพิ่ม normalization layer หลังจากนี้

                        4) การเรียง (sorting) ตามเลขท้ายของ `code`
                        - ใช้ regex `/(\d+)$/` ดึงเลขท้าย แล้ว `parseInt` เพื่อเรียงตามตัวเลข
                        - เหตุผล: ทำให้ fallback layout คงที่ตามลำดับ (important for deterministic placement)
                        - ข้อควรระวัง: ถ้า `code` ไม่มีเลขท้าย จะถือเป็น 0 (ถูกวางก่อนรายการที่มีเลข)

                        5) สร้าง `repairMap` จาก `repairs`
                        - เก็บเฉพาะงานที่ยังไม่ `completed` เป็น Map เพื่อมาร์คสถานะ `repair` ให้กับอุปกรณ์
                        - แนะนำให้ normalize key (equipment_code/code) เผื่อ backend ส่งชื่อฟิลด์ต่างกัน

                        6) Mapping → normalize แต่ละ item
                        - ดึง `position_x`, `position_y`, `table_number`, `side`, `row_number`
                        - `tableNumber` ถูกตั้งเป็น `item.table_number` ถ้ามี ถ้าไม่มีจะพยายาม parse จาก `code` (เลขท้าย) ถ้าไม่มีทั้งคู่จะใช้ `index + 1`
                        - ถ้าฟิลด์ชื่อไม่ตรงกัน (camelCase vs snake_case) ให้เพิ่ม helper normalization

                        7) Fallback position (เมื่อ DB ไม่มีค่า)
                        - เงื่อนไข trigger: `(positionX === 0 || !positionX) && (positionY === 0 || !positionY)` — ถ้าเป็นจริงจะคำนวณตำแหน่ง
                        - แบ่งรายการเป็นฝั่งซ้าย/ขวา: `isLeftSide = index < (sortedEquipmentData.length / 2)`
                        - กริด: 5 คอลัมน์ต่อแถว
                          - ฝั่งซ้าย baseX = 15, ฝั่งขวา baseX = 60
                          - col spacing = 5, topY = 25, row spacing = 10
                        - แนะนำ: ย้ายค่าคงที่ (15,60,5,25,10,5) เป็น constants เพื่อปรับง่าย
                        - ข้อควรระวัง: การใช้ `0` เป็นตัวบ่งชี้ "ไม่มีตำแหน่ง" อาจสับสน — ควรใช้ `NULL` ใน DB แทน 0 ถ้าเป็นไปได้

                        8) สถานะสุดท้าย (status)
                        - ถ้ามีใน `repairMap` ให้ `status = 'repair'` มิฉะนั้นใช้ `item.status` หรือ fallback `'working'`
                        - ตรวจสอบให้แน่ใจว่า key ใน `repairMap` ตรงกับ `item.code`

                        9) ผลลัพธ์สุดท้ายที่ส่งเข้า state
                        - Object ที่สร้างมี `id, name, code, type, status, position: {x,y}, tableNumber, side, row, seat, room`
                        - `seat` คำนวณจาก `(index % 5) + 1` — ถ้าเปลี่ยนจำนวนคอลัมน์ ต้องแก้สูตรด้วย

                        10) Error handling
                        - catch: `console.error(...)` และ `setEquipmentList([])` เพื่อให้ UI กลับสู่ state ปลอดภัย
                        - finally: `setLoading(false)` เสมอ

                        11) ตัวอย่างสั้น ๆ
                        - ห้องมี 9 รายการ, ไม่มีตำแหน่งใน DB → ระบบแบ่งเป็นฝั่งซ้าย/ขวาและวางในกริด 5 คอลัมน์ โดยไล่ index เป็นหลัก

                        ---

            <!-- Force content to next page when printing/exporting -->
            <div style="page-break-after:always"></div>

            # ภาคผนวก ก: เอกสารโค้ดโปรเจค (รูปแบบรายงาน)

            เอกสารนี้จัดรูปแบบให้คล้ายหน้ารายงาน (มีรูปและคำอธิบายเป็นลำดับ) เพื่อให้สามารถนำไปแปะในรายงานหรือพิมพ์เป็น PDF ได้ตรงตามแบบที่แนบมา

            ไฟล์อ้างอิงหลัก:
            - `app/map/page.tsx` — ฟังก์ชัน `loadEquipment()` (Admin map)
            - `app/technician/room-map/[taskId]/page.tsx` — ฟังก์ชัน `generateEquipmentForRoom()` (fallback layout generator)

            ---

            1) การทำงานหลัก: การโหลดอุปกรณ์และการจัดตำแหน่ง

            2) ตัวอย่างโค้ดและคำอธิบาย (รูปที่ 1..N)

            ---

            รูปที่ 1 โค้ดตัวอย่าง: ฟังก์ชัน loadEquipment() (ย่อ)

            ```ts
            ## ฟังก์ชัน: loadEquipment()

            1) ทำงานอะไรยังไง (สรุปสั้น)
            - ดึงข้อมูลอุปกรณ์และรายการซ่อมจาก API ของห้องที่เลือก
            - จัดเรียงรายการแบบ deterministic (ตามเลขท้าย code)
            - สร้างแผนที่งานซ่อมเพื่อมาร์คสถานะ
            - แปลงข้อมูลเป็น `Equipment[]` และคำนวณตำแหน่ง fallback เมื่อ DB ไม่มีค่า

            2) โค้ด (แบ่งเป็นท่อน ๆ พร้อมคำอธิบาย)

            a) เริ่มต้นและเรียก API

            ```ts
            const loadEquipment = async () => {
              try {
                setLoading(true);
                const response = await fetch(`/api/equipment/room/${selectedRoom.toUpperCase()}`);
                if (!response.ok) { setEquipmentList([]); return }
            ```

            - คำอธิบาย: เปิด loading indicator, เรียก endpoint ของห้อง, ถ้า HTTP ไม่สำเร็จให้รีเทิร์นค่าปลอดภัย

            b) อ่าน JSON และเตรียม array เบื้องต้น

            ```ts
                const data = await response.json();
                const equipmentData = data.equipment || [];
            ```

            - คำอธิบาย: ดึง `equipment` จาก payload (fallback เป็น array ว่างถ้าไม่มี)

            c) เรียงรายการตามเลขท้ายของ code

            ```ts
                const sortedEquipmentData = equipmentData.sort((a: any, b: any) => {
                  const aNum = parseInt(a.code?.match(/(\d+)$/)?.[1] || '0');
                  const bNum = parseInt(b.code?.match(/(\d+)$/)?.[1] || '0');
                  return aNum - bNum;
                });
            ```

            - คำอธิบาย: ใช้ regex ดึงเลขท้ายเพื่อให้การวางแบบ fallback มีความคงที่ (deterministic)

            d) สร้างแผนที่งานซ่อม (repairMap)

            ```ts
                const repairData = data.repairs || [];
                const repairMap = new Map();
                repairData.forEach((r: any) => { if (r.status !== 'completed') repairMap.set(r.equipment_code || r.code, r.status) });
            ```

            - คำอธิบาย: เก็บงานซ่อมที่ยังไม่เสร็จเป็น map เพื่อมาร์คสถานะ 'repair'

            e) แมปแต่ละ item → normalize + คำนวณ fallback position

            ```ts
                const formattedEquipment = sortedEquipmentData.map((item: any, index: number) => {
                  let positionX = item.position_x;
                  let positionY = item.position_y;
                  const codeMatch = item.code?.match(/(\d+)$/);
                  let tableNumber = item.table_number ?? (codeMatch ? parseInt(codeMatch[1]) : index + 1);
                  let side = item.side;
                  let row = item.row_number;

                  if ((positionX === 0 || !positionX) && (positionY === 0 || !positionY)) {
                    const isLeftSide = index < (sortedEquipmentData.length / 2);
                    side = isLeftSide ? 'left' : 'right';
                    if (isLeftSide) {
                      const leftIndex = index;
                      const rowIndex = Math.floor(leftIndex / 5);
                      const colIndex = leftIndex % 5;
                      positionX = 15 + (colIndex * 5);
                      positionY = 25 + (rowIndex * 10);
                      row = rowIndex + 1;
                    } else {
                      const rightIndex = index - Math.ceil(sortedEquipmentData.length / 2);
                      const rowIndex = Math.floor(rightIndex / 5);
                      const colIndex = rightIndex % 5;
                      positionX = 60 + (colIndex * 5);
                      positionY = 25 + (rowIndex * 10);
                      row = rowIndex + 1;
                    }
                  }

                  const status = repairMap.has(item.code) ? 'repair' : (item.status || 'working');

                  return {
                    id: String(item.id || ''),
                    name: item.name || '',
                    code: item.code || '',
                    type: item.type || 'computer',
                    status,
                    position: { x: positionX, y: positionY },
                    tableNumber,
                    side: side || 'left',
                    row: row || 1,
                    seat: (index % 5) + 1,
                    room: item.room || '',
                  } as Equipment;
                });
            ```

            - คำอธิบาย: นำค่าจาก DB (ถ้ามี) เป็นตำแหน่ง มิฉะนั้นคำนวณ fallback ตาม index และแบ่งฝั่งซ้าย/ขวาเป็นกริด 5 คอลัมน์

            f) สรุป, error handling และ set state

            ```ts
                setEquipmentList(formattedEquipment);
              } catch (err) {
                console.error('loadEquipment error', err);
                setEquipmentList([]);
              } finally { setLoading(false) }
            }
            ```

            - คำอธิบาย: เซ็ต state ให้ component แสดงผล, กรณี error คืนค่า safe default แล้วปิด loading เสมอ

            ---
            ---

            ## ฟังก์ชัน: generateEquipmentForRoom(roomCode)

            1) ทำงานอะไรยังไง (สรุปสั้น)
            - สร้างรายการ `Equipment[]` สำหรับห้องเป้าหมายโดยใช้ `lc207Equipment` เป็นแม่แบบ
            - ปรับ `code` ให้ตรงกับห้อง และคำนวณตำแหน่งตามพารามิเตอร์กริดของแต่ละห้อง

            2) โค้ด (แบ่งเป็นท่อน ๆ พร้อมคำอธิบาย)

            a) ตรวจสอบ roomCode และ fallback template

            ```ts
            const generateEquipmentForRoom = (roomCode: string): Equipment[] => {
              const room = (roomCode || 'LC207').toString().toUpperCase();
              if (room === 'LC207') return lc207Equipment;
            ```

            - คำอธิบาย: ถ้าเป็น LC207 ให้คืน template ต้นฉบับทันที (no-op); ถ้าไม่ให้แปลงชื่อห้องเป็นตัวใหญ่เพื่อใช้เป็น key

            b) พารามิเตอร์กริด (config per-room)

            ```ts
              const roomGridParams: Record<string, { leftX: number; rightX: number; colSpacing: number; topY: number; rowSpacing: number }> = {
                LC207: { leftX: 15, rightX: 65, colSpacing: 5.5, topY: 30, rowSpacing: 10 },
                LC205: { leftX: 15, rightX: 65, colSpacing: 5.5, topY: 30, rowSpacing: 10 },
                LC204: { leftX: 15, rightX: 65, colSpacing: 5.5, topY: 30, rowSpacing: 10 },
              };

              const params = roomGridParams[room] || roomGridParams['LC207'];
            ```

            - คำอธิบาย: กำหนดค่าพื้นฐานสำหรับแต่ละห้อง ถ้าไม่มี key ให้ใช้ LC207 เป็น default

            c) แมป template เป็นรายการใหม่และคำนวณตำแหน่ง

            ```ts
              return lc207Equipment.map((eq, idx) => {
                const newCode = eq.code.replace(/LC207/i, room);
                let position = { ...eq.position };
                if (eq.tableNumber && eq.tableNumber > 0) {
                  const seat = (typeof eq.seat === 'number' && eq.seat > 0) ? eq.seat : 1;
                  const row = (typeof eq.row === 'number' && eq.row > 0) ? eq.row : 1;
                  const colIndex = seat - 1;
                  const baseX = eq.side === 'right' ? params.rightX : params.leftX;
                  const x = Math.round(baseX + colIndex * params.colSpacing);
                  const y = Math.round(params.topY + (row - 1) * params.rowSpacing);
                  position = { x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) };
                } else {
                  position = { x: 50, y: 18 };
                }

                return {
                  ...eq,
                  id: String(idx + 1) + '-' + room,
                  code: newCode,
                  room,
                  position,
                  tableNumber: eq.tableNumber,
                };
              });
            }
            ```

            - คำอธิบาย: ถ้าอุปกรณ์เป็นโต๊ะ (มี tableNumber) จะคำนวณ x,y จาก seat/row และ clamp ให้อยู่ในขอบเขต ถ้าไม่ใช่จะวางบน top center

            ---

            สรุปสั้น ๆ และข้อเสนอแนะสำหรับอาจารย์/ผู้ตรวจ:
            - ระบบออกแบบให้ใช้ค่าตำแหน่งจากฐานข้อมูลเมื่อมีค่า หากไม่ให้ค่า ระบบจะคำนวณตำแหน่งแบบ deterministic โดยใช้ลำดับ (`index` หรือ `table_number`)
            - หากต้องการให้ผู้ดูแลสามารถแก้ตำแหน่งจาก UI ได้ ควรขยาย API PATCH (`app/api/equipment/route.ts`) ให้รับและเขียน `position_x`, `position_y`, `table_number`
            - สำหรับการพิมพ์รายงาน: ใช้ `docs/appendix-print.css` (มีตัวอย่างใน repo) หรือ Print → Save as PDF จาก VS Code/Browser

            End of Appendix A
