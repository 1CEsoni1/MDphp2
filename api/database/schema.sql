
DROP DATABASE IF EXISTS equipment_repair;

CREATE DATABASE equipment_repair;
USE equipment_repair;

-- User type table
CREATE TABLE tb_type(
    id CHAR(2) PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Users table
CREATE TABLE tb_users(
    id CHAR(4) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    type_id CHAR(2) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(type_id) REFERENCES tb_type(id)
);

-- Equipment table
CREATE TABLE tb_equipment(
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    type ENUM('computer') NOT NULL,
    status ENUM('working','repair','maintenance') DEFAULT 'working',
    position_x FLOAT DEFAULT 0,
    position_y FLOAT DEFAULT 0,
    table_number INT,
    side VARCHAR(20),
    row_number INT,
    seat VARCHAR(10),
    room VARCHAR(20) NOT NULL,
    building VARCHAR(10) NOT NULL,
    floor INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Repair requests
CREATE TABLE tb_repair_requests(
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_code VARCHAR(50) NOT NULL,
    equipment_name VARCHAR(100) NOT NULL,
    building VARCHAR(10) NOT NULL,
    floor INT NOT NULL,
    room VARCHAR(20) NOT NULL,
    status ENUM('pending','assigned','in-progress','completed') DEFAULT 'pending',
    description TEXT NOT NULL,
    reporter VARCHAR(100) NOT NULL,
    assigned_to CHAR(4) NULL,
    priority ENUM('low','medium','high') DEFAULT 'medium',
    report_date DATE NOT NULL,
    assigned_date TIMESTAMP NULL,
    completed_date TIMESTAMP NULL,
    images TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(assigned_to) REFERENCES tb_users(id) ON DELETE SET NULL,
    FOREIGN KEY(equipment_code) REFERENCES tb_equipment(code)
);

-- Status logs
CREATE TABLE tb_status_logs(
    id INT AUTO_INCREMENT PRIMARY KEY,
    repair_request_id INT NOT NULL,
    old_status ENUM('pending','assigned','in-progress','completed') NOT NULL,
    new_status ENUM('pending','assigned','in-progress','completed') NOT NULL,
    changed_by CHAR(4) NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(repair_request_id) REFERENCES tb_repair_requests(id),
    FOREIGN KEY(changed_by) REFERENCES tb_users(id)
);

-- Notes
CREATE TABLE tb_notes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    repair_request_id INT NOT NULL,
    note TEXT NOT NULL,
    created_by CHAR(4) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(repair_request_id) REFERENCES tb_repair_requests(id),
    FOREIGN KEY(created_by) REFERENCES tb_users(id)
);

-- Images
CREATE TABLE tb_images(
    id INT AUTO_INCREMENT PRIMARY KEY,
    repair_request_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    uploaded_by CHAR(4) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(repair_request_id) REFERENCES tb_repair_requests(id),
    FOREIGN KEY(uploaded_by) REFERENCES tb_users(id)
);

-- ---------------------
-- Insert sample data
-- ---------------------

-- User types
INSERT INTO tb_type (id, name) VALUES
('01', 'admin'),
('02', 'technician');

-- Users
INSERT INTO tb_users (id, username, password, type_id, name) VALUES
('0101', 'admin', '1234', '01', 'System Administrator'),
('0201', 'tech1', '2345', '02', 'John Smith'),
('0202', 'tech2', '3456', '02', 'Jane Doe');

-- Equipment
INSERT INTO tb_equipment (code, name, type, status, room, building, floor) VALUES
('PC-LC207-01', 'คอมพิวเตอร์ 01', 'computer', 'working', 'LC207', 'LC', 2),
('PC-LC207-02', 'คอมพิวเตอร์ 02', 'computer', 'repair', 'LC207', 'LC', 2),
('PC-LC205-01', 'คอมพิวเตอร์ 03', 'computer', 'working', 'LC205', 'LC', 2),
('PC-LC204-01', 'คอมพิวเตอร์ 04', 'computer', 'maintenance', 'LC204', 'LC', 2);

-- Repair Requests
INSERT INTO tb_repair_requests (
    equipment_code, equipment_name, building, floor, room, status,
    description, reporter, assigned_to, priority, report_date
) VALUES
('PC-LC207-01', 'คอมพิวเตอร์ 01', 'LC', 2, 'LC207', 'pending',
 'คอมพิวเตอร์เปิดไม่ติด มีเสียง beep', 'อาจารย์สมชาย', NULL, 'high', '2024-01-15'),

('PC-LC207-02', 'คอมพิวเตอร์ 02', 'LC', 2, 'LC207', 'assigned',
 'จอคอมพิวเตอร์ไม่แสดงผล มีไฟกระพริบ', 'อาจารย์สมหญิง', '0201', 'medium', '2024-01-14'),

('PC-LC205-01', 'คอมพิวเตอร์ 03', 'LC', 2, 'LC205', 'in-progress',
 'คอมพิวเตอร์รีสตาร์ทเองบ่อย', 'อาจารย์สมศรี', '0202', 'high', '2024-01-13'),

('PC-LC204-01', 'คอมพิวเตอร์ 04', 'LC', 2, 'LC204', 'completed',
 'คอมพิวเตอร์เปิดติดแต่เข้า Windows ไม่ได้', 'อาจารย์สมหมาย', '0201', 'low', '2024-01-12');

-- Status Logs
INSERT INTO tb_status_logs (repair_request_id, old_status, new_status, changed_by) VALUES
(1, 'pending', 'assigned', '0201'),
(2, 'assigned', 'in-progress', '0201'),
(3, 'in-progress', 'completed', '0202');

-- Notes
INSERT INTO tb_notes (repair_request_id, note, created_by) VALUES
(1, 'ตรวจสอบแล้ว น่าจะเป็นปัญหาที่ RAM', '0201'),
(2, 'กำลังสั่งอะไหล่มาเปลี่ยน', '0201'),
(3, 'ซ่อมเสร็จแล้ว รันโปรแกรมได้ปกติ', '0202');

-- Images
INSERT INTO tb_images (repair_request_id, image_url, uploaded_by) VALUES
(1, 'https://example.com/images/pc1-error.jpg', '0201'),
(2, 'https://example.com/images/pc2-screen.jpg', '0201'),
(3, 'https://example.com/images/pc3-repair.jpg', '0202');

CREATE DATABASE IF NOT EXISTS equipment_repair;
USE equipment_repair;

-- User type table
CREATE TABLE tb_type (
    id CHAR(2) PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Users table
CREATE TABLE tb_users (
    id CHAR(4) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    type_id CHAR(2) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (type_id) REFERENCES tb_type(id)
);

-- Equipment table (focus on computer only, for LC/UD, floors 1-3, rooms LC207, LC205, LC204)
CREATE TABLE tb_equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    type ENUM('computer') NOT NULL,
    status ENUM('working', 'repair', 'maintenance') DEFAULT 'working',
    position_x FLOAT DEFAULT 0,
    position_y FLOAT DEFAULT 0,
    table_number INT,
    side VARCHAR(20),
    row_number INT,
    seat VARCHAR(10),
    room VARCHAR(20) NOT NULL,
    building VARCHAR(10) NOT NULL,
    floor INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE tb_repair_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_code VARCHAR(50) NOT NULL,
    equipment_name VARCHAR(100) NOT NULL,
    building VARCHAR(10) NOT NULL,
    floor INT NOT NULL,
    room VARCHAR(20) NOT NULL,
    status ENUM('pending', 'assigned', 'in-progress', 'completed') DEFAULT 'pending',
    description TEXT NOT NULL,
    reporter VARCHAR(100) NOT NULL,
    assigned_to CHAR(4) NULL,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    report_date DATE NOT NULL,
    assigned_date TIMESTAMP NULL,
    completed_date TIMESTAMP NULL,
    images TEXT, -- JSON array of image URLs
    notes TEXT, -- JSON array of notes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to) REFERENCES tb_users(id) ON DELETE SET NULL,
    FOREIGN KEY (equipment_code) REFERENCES tb_equipment(code)
);

-- Notes table (for repair request comments/history)
CREATE TABLE tb_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    repair_request_id INT NOT NULL,
    note TEXT NOT NULL,
    created_by CHAR(4) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (repair_request_id) REFERENCES tb_repair_requests(id),
    FOREIGN KEY (created_by) REFERENCES tb_users(id)
);

-- Images table (for repair request evidence images)
CREATE TABLE tb_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    repair_request_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    uploaded_by CHAR(4) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (repair_request_id) REFERENCES tb_repair_requests(id),
    FOREIGN KEY (uploaded_by) REFERENCES tb_users(id)
);

-- Insert default types
INSERT INTO tb_type (id, name) VALUES
('01', 'admin'),
('02', 'technician');


-- Insert default users
INSERT INTO tb_users (id, username, password, type_id, name) VALUES
('0101', 'admin', '1234', '01', 'System Administrator'),
('0201', 'tech1', '2345', '02', 'John Smith'),
('0202', 'tech2', '3456', '02', 'Jane Doe');



-- Insert sample computer equipment (LC, UD buildings, floors 1-3, rooms LC207, LC205, LC204)
INSERT INTO tb_equipment (code, name, type, status, room, building, floor) VALUES
('PC-LC207-01', 'คอมพิวเตอร์ 01', 'computer', 'working', 'LC207', 'LC', 2),
('PC-LC207-02', 'คอมพิวเตอร์ 02', 'computer', 'repair', 'LC207', 'LC', 2),
('PC-LC205-01', 'คอมพิวเตอร์ 03', 'computer', 'working', 'LC205', 'LC', 2),
('PC-LC204-01', 'คอมพิวเตอร์ 04', 'computer', 'maintenance', 'LC204', 'LC', 2),




-- Insert sample repair requests (map to above equipment, with building/floor/room fields)
INSERT INTO tb_repair_requests (equipment_code, equipment_name, building, floor, room, status, description, reporter, assigned_to, priority, report_date)
VALUES
('PC-LC207-01', 'คอมพิวเตอร์ 01', 'LC', 2, 'LC207', 'pending', 'คอมพิวเตอร์เปิดไม่ติด มีเสียง beep', 'อาจารย์สมชาย', NULL, 'high', '2024-01-15'),
('PC-LC207-02', 'คอมพิวเตอร์ 02', 'LC', 2, 'LC207', 'assigned', 'จอคอมพิวเตอร์ไม่แสดงผล มีไฟกระพริบ', 'อาจารย์สมหญิง', '0201', 'medium', '2024-01-14'),
('PC-LC205-01', 'คอมพิวเตอร์ 03', 'LC', 2, 'LC205', 'in-progress', 'คอมพิวเตอร์รีสตาร์ทเองบ่อย', 'อาจารย์สมศรี', '0202', 'high', '2024-01-13'),
('PC-LC204-01', 'คอมพิวเตอร์ 04', 'LC', 2, 'LC204', 'completed', 'คอมพิวเตอร์เปิดติดแต่เข้า Windows ไม่ได้', 'อาจารย์สมหมาย', '0201', 'low', '2024-01-12'),

