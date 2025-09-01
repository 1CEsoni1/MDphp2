-- Equipment Repair System Database Schema

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

-- Equipment table
CREATE TABLE tb_equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    type ENUM('computer', 'ac', 'projector', 'electrical', 'router') NOT NULL,
    status ENUM('working', 'repair', 'maintenance') DEFAULT 'working',
    position_x FLOAT DEFAULT 0,
    position_y FLOAT DEFAULT 0,
    table_number INT,
    side VARCHAR(20),
    row_number INT,
    seat VARCHAR(10),
    room VARCHAR(50),
    building VARCHAR(50),
    floor INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Repair requests table
CREATE TABLE tb_repair_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_code VARCHAR(50) NOT NULL,
    equipment_name VARCHAR(100) NOT NULL,
    location VARCHAR(200) NOT NULL,
    status ENUM('pending', 'assigned', 'in-progress', 'completed') DEFAULT 'pending',
    description TEXT NOT NULL,
    reporter VARCHAR(100) NOT NULL,
    assigned_to CHAR(4) NULL,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_date TIMESTAMP NULL,
    completed_date TIMESTAMP NULL,
    images TEXT, -- JSON array of image URLs
    notes TEXT, -- JSON array of notes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to) REFERENCES tb_users(id) ON DELETE SET NULL
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


-- Insert sample equipment
INSERT INTO tb_equipment (name, code, type, status, position_x, position_y, table_number, room, building, floor) VALUES
('Computer Lab PC 01', 'PC-001', 'computer', 'working', 100, 150, 1, 'Computer Lab', 'Building A', 2),
('Air Conditionerit 1', 'AC-001', 'ac', 'repair', 50, 50, NULL, 'Computer Lab', 'Building A', 2),
('Projector Main', 'PROJ-001', 'projector', 'working', 200, 100, NULL, 'Computer Lab', 'Building A', 2);


-- Insert sample repair requests
INSERT INTO tb_repair_requests (equipment_code, equipment_name, location, status, description, reporter, assigned_to, priority) VALUES
('AC-001', 'Air Conditioner Unit 1', 'Computer Lab, Building A, Floor 2', 'assigned', 'Air conditioner not cooling properly', 'Teacher A', '0201', 'high'),
('PC-001', 'Computer Lab PC 01', 'Computer Lab, Building A, Floor 2', 'pending', 'Computer won\'t start up', 'Student B', NULL, 'medium');
