# การอัปเดต: ระบบช่างประจำห้อง

## สรุปการเปลี่ยนแปลง

ตามข้อเสนอแนะของอาจารย์ ได้ทำการปรับปรุงระบบให้:

1. **หน้าต่างของแต่ละ user ของช่างแสดงงานของตนเอง**: ช่างแต่ละคนจะเห็นเฉพาะงานซ่อมในห้องที่ตนรับผิดชอบเท่านั้น
2. **ห้องแต่ละห้องจะมีช่างประจำ**: 1 ห้อง มี 1 ช่างดูแลเฉพาะ
3. **ใช้แถว room ในการกำหนด**: เพิ่มฟิลด์ `assigned_technician` ในตาราง `tb_room`

## การเปลี่ยนแปลงฐานข้อมูล

### ตาราง `tb_room`
- เพิ่มฟิลด์ `assigned_technician` (char(4)) เพื่อเก็บ ID ของช่างประจำห้อง
- เพิ่ม Foreign Key ที่เชื่อมโยงกับ `tb_users(id)`

### ตัวอย่างข้อมูล
- ห้อง LC207 → ช่าง John Smith (0201)  
- ห้อง LC204 → ช่าง Jane Doe (0202)
- ห้อง LC205 → ช่าง John Smith (0201)

## การเปลี่ยนแปลง API

### PHP Backend
- เพิ่ม method `getByTechnicianRooms()` ใน `RepairRequest.php`
- อัปเดต `repair-requests.php` endpoint เพื่อรองรับ parameter `my_rooms`

### Next.js API Routes  
- สร้าง `/api/repair-requests/my-rooms` endpoint ใหม่
- รับ parameter `user_id` เพื่อดึงงานซ่อมในห้องที่ช่างคนนั้นรับผิดชอบ

## การเปลี่ยนแปลง Frontend

### Technician Dashboard (`app/technician/dashboard/page.tsx`)
- เปลี่ยนจากการแสดงงานทั้งหมด → แสดงเฉพาะงานในห้องที่รับผิดชอบ
- อัปเดต UI ให้แสดงข้อความ "งานในห้องที่รับผิดชอบ"
- เปลี่ยน message เมื่อไม่มีงาน → "ไม่มีงานซ่อมในห้องที่คุณรับผิดชอบในขณะนี้"

## วิธีการติดตั้ง

1. **อัปเดตฐานข้อมูล**:
   ```sql
   -- รันไฟล์ update_room_technician.sql ใน phpMyAdmin
   ```

2. **อัปเดต PHP Files**:
   - `api/models/RepairRequest.php`
   - `api/endpoints/repair-requests.php`

3. **อัปเดต Frontend Files**:
   - `app/api/repair-requests/my-rooms/route.ts` (ไฟล์ใหม่)
   - `app/technician/dashboard/page.tsx`

## ผลลัพธ์

- ช่างแต่ละคนจะเห็นเฉพาะงานซ่อมในห้องที่ตนได้รับมอบหมายให้ดูแล
- ระบบมีความชัดเจนในการแบ่งความรับผิดชอบตามพื้นที่
- ลดความสับสนในการจัดการงานซ่อม

## หมายเหตุ

- ระบบยังคงรองรับการมอบหมายงานแบบเดิม (assigned_to ใน tb_repair_requests)
- ช่างสามารถดูแลหลายห้องได้ (เช่น John Smith ดูแล LC207 และ LC205)
- Admin ยังคงเห็นงานทั้งหมดในระบบ