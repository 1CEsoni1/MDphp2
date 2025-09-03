-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2025 at 04:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `equipment_repair`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_equipment`
--

CREATE TABLE `tb_equipment` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` enum('computer') NOT NULL,
  `status` enum('working','repair','maintenance') DEFAULT 'working',
  `position_x` float DEFAULT 0,
  `position_y` float DEFAULT 0,
  `table_number` int(11) DEFAULT NULL,
  `side` varchar(20) DEFAULT NULL,
  `row_number` int(11) DEFAULT NULL,
  `seat` varchar(10) DEFAULT NULL,
  `room` varchar(20) NOT NULL,
  `building` varchar(10) NOT NULL,
  `floor` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_equipment`
--

INSERT INTO `tb_equipment` (`id`, `code`, `name`, `type`, `status`, `position_x`, `position_y`, `table_number`, `side`, `row_number`, `seat`, `room`, `building`, `floor`, `created_at`, `updated_at`) VALUES
(1, 'PC-LC207-01', 'คอมพิวเตอร์ 01', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(2, 'PC-LC207-02', 'คอมพิวเตอร์ 02', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(3, 'PC-LC207-03', 'คอมพิวเตอร์ 03', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(4, 'PC-LC207-04', 'คอมพิวเตอร์ 04', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(5, 'PC-LC207-05', 'คอมพิวเตอร์ 05', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(6, 'PC-LC207-06', 'คอมพิวเตอร์ 06', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(7, 'PC-LC207-07', 'คอมพิวเตอร์ 07', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(8, 'PC-LC207-08', 'คอมพิวเตอร์ 08', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(9, 'PC-LC207-09', 'คอมพิวเตอร์ 09', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(10, 'PC-LC207-10', 'คอมพิวเตอร์ 10', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(11, 'PC-LC207-11', 'คอมพิวเตอร์ 11', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(12, 'PC-LC207-12', 'คอมพิวเตอร์ 12', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(13, 'PC-LC207-13', 'คอมพิวเตอร์ 13', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(14, 'PC-LC207-14', 'คอมพิวเตอร์ 14', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(15, 'PC-LC207-15', 'คอมพิวเตอร์ 15', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(16, 'PC-LC207-16', 'คอมพิวเตอร์ 16', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(17, 'PC-LC207-17', 'คอมพิวเตอร์ 17', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(18, 'PC-LC207-18', 'คอมพิวเตอร์ 18', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(19, 'PC-LC207-19', 'คอมพิวเตอร์ 19', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(20, 'PC-LC207-20', 'คอมพิวเตอร์ 20', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(21, 'PC-LC207-21', 'คอมพิวเตอร์ 21', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(22, 'PC-LC207-22', 'คอมพิวเตอร์ 22', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(23, 'PC-LC207-23', 'คอมพิวเตอร์ 23', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(24, 'PC-LC207-24', 'คอมพิวเตอร์ 24', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(25, 'PC-LC207-25', 'คอมพิวเตอร์ 25', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(26, 'PC-LC207-26', 'คอมพิวเตอร์ 26', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(27, 'PC-LC207-27', 'คอมพิวเตอร์ 27', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(28, 'PC-LC207-28', 'คอมพิวเตอร์ 28', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(29, 'PC-LC207-29', 'คอมพิวเตอร์ 29', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(30, 'PC-LC207-30', 'คอมพิวเตอร์ 30', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(31, 'PC-LC207-31', 'คอมพิวเตอร์ 31', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(32, 'PC-LC207-32', 'คอมพิวเตอร์ 32', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(33, 'PC-LC207-33', 'คอมพิวเตอร์ 33', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(34, 'PC-LC207-34', 'คอมพิวเตอร์ 34', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(35, 'PC-LC207-35', 'คอมพิวเตอร์ 35', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(36, 'PC-LC207-36', 'คอมพิวเตอร์ 36', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(37, 'PC-LC207-37', 'คอมพิวเตอร์ 37', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(38, 'PC-LC207-38', 'คอมพิวเตอร์ 38', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(39, 'PC-LC207-39', 'คอมพิวเตอร์ 39', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(40, 'PC-LC207-40', 'คอมพิวเตอร์ 40', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(41, 'PC-LC207-41', 'คอมพิวเตอร์ 41', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(42, 'PC-LC207-42', 'คอมพิวเตอร์ 42', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(43, 'PC-LC207-43', 'คอมพิวเตอร์ 43', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(44, 'PC-LC207-44', 'คอมพิวเตอร์ 44', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(45, 'PC-LC207-45', 'คอมพิวเตอร์ 45', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(46, 'PC-LC207-46', 'คอมพิวเตอร์ 46', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(47, 'PC-LC207-47', 'คอมพิวเตอร์ 47', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(48, 'PC-LC207-48', 'คอมพิวเตอร์ 48', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(49, 'PC-LC207-49', 'คอมพิวเตอร์ 49', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(50, 'PC-LC207-50', 'คอมพิวเตอร์ 50', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC207', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(51, 'PC-LC204-01', 'คอมพิวเตอร์ 01', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(52, 'PC-LC204-02', 'คอมพิวเตอร์ 02', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(53, 'PC-LC204-03', 'คอมพิวเตอร์ 03', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(54, 'PC-LC204-04', 'คอมพิวเตอร์ 04', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(55, 'PC-LC204-05', 'คอมพิวเตอร์ 05', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(56, 'PC-LC204-06', 'คอมพิวเตอร์ 06', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(57, 'PC-LC204-07', 'คอมพิวเตอร์ 07', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(58, 'PC-LC204-08', 'คอมพิวเตอร์ 08', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(59, 'PC-LC204-09', 'คอมพิวเตอร์ 09', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(60, 'PC-LC204-10', 'คอมพิวเตอร์ 10', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(61, 'PC-LC204-11', 'คอมพิวเตอร์ 11', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(62, 'PC-LC204-12', 'คอมพิวเตอร์ 12', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(63, 'PC-LC204-13', 'คอมพิวเตอร์ 13', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(64, 'PC-LC204-14', 'คอมพิวเตอร์ 14', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(65, 'PC-LC204-15', 'คอมพิวเตอร์ 15', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(66, 'PC-LC204-16', 'คอมพิวเตอร์ 16', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(67, 'PC-LC204-17', 'คอมพิวเตอร์ 17', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(68, 'PC-LC204-18', 'คอมพิวเตอร์ 18', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(69, 'PC-LC204-19', 'คอมพิวเตอร์ 19', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(70, 'PC-LC204-20', 'คอมพิวเตอร์ 20', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(71, 'PC-LC204-21', 'คอมพิวเตอร์ 21', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(72, 'PC-LC204-22', 'คอมพิวเตอร์ 22', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(73, 'PC-LC204-23', 'คอมพิวเตอร์ 23', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(74, 'PC-LC204-24', 'คอมพิวเตอร์ 24', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(75, 'PC-LC204-25', 'คอมพิวเตอร์ 25', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(76, 'PC-LC204-26', 'คอมพิวเตอร์ 26', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(77, 'PC-LC204-27', 'คอมพิวเตอร์ 27', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(78, 'PC-LC204-28', 'คอมพิวเตอร์ 28', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(79, 'PC-LC204-29', 'คอมพิวเตอร์ 29', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(80, 'PC-LC204-30', 'คอมพิวเตอร์ 30', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(81, 'PC-LC204-31', 'คอมพิวเตอร์ 31', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(82, 'PC-LC204-32', 'คอมพิวเตอร์ 32', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(83, 'PC-LC204-33', 'คอมพิวเตอร์ 33', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(84, 'PC-LC204-34', 'คอมพิวเตอร์ 34', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(85, 'PC-LC204-35', 'คอมพิวเตอร์ 35', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(86, 'PC-LC204-36', 'คอมพิวเตอร์ 36', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(87, 'PC-LC204-37', 'คอมพิวเตอร์ 37', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(88, 'PC-LC204-38', 'คอมพิวเตอร์ 38', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(89, 'PC-LC204-39', 'คอมพิวเตอร์ 39', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(90, 'PC-LC204-40', 'คอมพิวเตอร์ 40', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(91, 'PC-LC204-41', 'คอมพิวเตอร์ 41', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(92, 'PC-LC204-42', 'คอมพิวเตอร์ 42', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(93, 'PC-LC204-43', 'คอมพิวเตอร์ 43', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(94, 'PC-LC204-44', 'คอมพิวเตอร์ 44', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(95, 'PC-LC204-45', 'คอมพิวเตอร์ 45', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(96, 'PC-LC204-46', 'คอมพิวเตอร์ 46', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(97, 'PC-LC204-47', 'คอมพิวเตอร์ 47', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(98, 'PC-LC204-48', 'คอมพิวเตอร์ 48', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(99, 'PC-LC204-49', 'คอมพิวเตอร์ 49', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(100, 'PC-LC204-50', 'คอมพิวเตอร์ 50', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC204', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(101, 'PC-LC205-01', 'คอมพิวเตอร์ 01', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(102, 'PC-LC205-02', 'คอมพิวเตอร์ 02', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(103, 'PC-LC205-03', 'คอมพิวเตอร์ 03', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(104, 'PC-LC205-04', 'คอมพิวเตอร์ 04', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(105, 'PC-LC205-05', 'คอมพิวเตอร์ 05', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(106, 'PC-LC205-06', 'คอมพิวเตอร์ 06', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(107, 'PC-LC205-07', 'คอมพิวเตอร์ 07', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(108, 'PC-LC205-08', 'คอมพิวเตอร์ 08', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(109, 'PC-LC205-09', 'คอมพิวเตอร์ 09', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(110, 'PC-LC205-10', 'คอมพิวเตอร์ 10', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(111, 'PC-LC205-11', 'คอมพิวเตอร์ 11', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(112, 'PC-LC205-12', 'คอมพิวเตอร์ 12', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(113, 'PC-LC205-13', 'คอมพิวเตอร์ 13', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(114, 'PC-LC205-14', 'คอมพิวเตอร์ 14', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(115, 'PC-LC205-15', 'คอมพิวเตอร์ 15', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(116, 'PC-LC205-16', 'คอมพิวเตอร์ 16', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(117, 'PC-LC205-17', 'คอมพิวเตอร์ 17', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(118, 'PC-LC205-18', 'คอมพิวเตอร์ 18', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(119, 'PC-LC205-19', 'คอมพิวเตอร์ 19', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(120, 'PC-LC205-20', 'คอมพิวเตอร์ 20', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(121, 'PC-LC205-21', 'คอมพิวเตอร์ 21', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(122, 'PC-LC205-22', 'คอมพิวเตอร์ 22', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(123, 'PC-LC205-23', 'คอมพิวเตอร์ 23', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(124, 'PC-LC205-24', 'คอมพิวเตอร์ 24', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(125, 'PC-LC205-25', 'คอมพิวเตอร์ 25', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(126, 'PC-LC205-26', 'คอมพิวเตอร์ 26', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(127, 'PC-LC205-27', 'คอมพิวเตอร์ 27', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(128, 'PC-LC205-28', 'คอมพิวเตอร์ 28', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(129, 'PC-LC205-29', 'คอมพิวเตอร์ 29', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(130, 'PC-LC205-30', 'คอมพิวเตอร์ 30', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(131, 'PC-LC205-31', 'คอมพิวเตอร์ 31', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(132, 'PC-LC205-32', 'คอมพิวเตอร์ 32', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(133, 'PC-LC205-33', 'คอมพิวเตอร์ 33', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(134, 'PC-LC205-34', 'คอมพิวเตอร์ 34', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(135, 'PC-LC205-35', 'คอมพิวเตอร์ 35', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(136, 'PC-LC205-36', 'คอมพิวเตอร์ 36', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(137, 'PC-LC205-37', 'คอมพิวเตอร์ 37', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(138, 'PC-LC205-38', 'คอมพิวเตอร์ 38', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(139, 'PC-LC205-39', 'คอมพิวเตอร์ 39', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(140, 'PC-LC205-40', 'คอมพิวเตอร์ 40', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(141, 'PC-LC205-41', 'คอมพิวเตอร์ 41', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(142, 'PC-LC205-42', 'คอมพิวเตอร์ 42', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(143, 'PC-LC205-43', 'คอมพิวเตอร์ 43', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(144, 'PC-LC205-44', 'คอมพิวเตอร์ 44', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(145, 'PC-LC205-45', 'คอมพิวเตอร์ 45', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(146, 'PC-LC205-46', 'คอมพิวเตอร์ 46', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(147, 'PC-LC205-47', 'คอมพิวเตอร์ 47', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(148, 'PC-LC205-48', 'คอมพิวเตอร์ 48', 'computer', 'maintenance', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(149, 'PC-LC205-49', 'คอมพิวเตอร์ 49', 'computer', 'working', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57'),
(150, 'PC-LC205-50', 'คอมพิวเตอร์ 50', 'computer', 'repair', 0, 0, NULL, NULL, NULL, NULL, 'LC205', 'LC', 2, '2025-09-03 13:43:57', '2025-09-03 13:43:57');

-- --------------------------------------------------------

--
-- Table structure for table `tb_images`
--

CREATE TABLE `tb_images` (
  `id` int(11) NOT NULL,
  `repair_request_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `uploaded_by` char(4) NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_images`
--

INSERT INTO `tb_images` (`id`, `repair_request_id`, `image_url`, `uploaded_by`, `uploaded_at`) VALUES
(1, 1, 'https://example.com/images/pc1-error.jpg', '0201', '2025-09-02 07:53:07'),
(2, 2, 'https://example.com/images/pc2-screen.jpg', '0201', '2025-09-02 07:53:07'),
(3, 3, 'https://example.com/images/pc3-repair.jpg', '0202', '2025-09-02 07:53:07');

-- --------------------------------------------------------

--
-- Table structure for table `tb_notes`
--

CREATE TABLE `tb_notes` (
  `id` int(11) NOT NULL,
  `repair_request_id` int(11) NOT NULL,
  `note` text NOT NULL,
  `created_by` char(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_notes`
--

INSERT INTO `tb_notes` (`id`, `repair_request_id`, `note`, `created_by`, `created_at`) VALUES
(1, 1, 'ตรวจสอบแล้ว น่าจะเป็นปัญหาที่ RAM', '0201', '2025-09-02 07:53:07'),
(2, 2, 'กำลังสั่งอะไหล่มาเปลี่ยน', '0201', '2025-09-02 07:53:07'),
(3, 3, 'ซ่อมเสร็จแล้ว รันโปรแกรมได้ปกติ', '0202', '2025-09-02 07:53:07');

-- --------------------------------------------------------

--
-- Table structure for table `tb_repair_requests`
--

CREATE TABLE `tb_repair_requests` (
  `id` int(11) NOT NULL,
  `equipment_code` varchar(50) NOT NULL,
  `equipment_name` varchar(100) NOT NULL,
  `building` varchar(10) NOT NULL,
  `floor` int(11) NOT NULL,
  `room` varchar(20) NOT NULL,
  `status` enum('pending','assigned','in-progress','completed') DEFAULT 'pending',
  `description` text NOT NULL,
  `reporter` varchar(100) NOT NULL,
  `assigned_to` char(4) DEFAULT NULL,
  `priority` enum('low','medium','high') DEFAULT 'medium',
  `report_date` date NOT NULL,
  `assigned_date` timestamp NULL DEFAULT NULL,
  `completed_date` timestamp NULL DEFAULT NULL,
  `images` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_repair_requests`
--

INSERT INTO `tb_repair_requests` (`id`, `equipment_code`, `equipment_name`, `building`, `floor`, `room`, `status`, `description`, `reporter`, `assigned_to`, `priority`, `report_date`, `assigned_date`, `completed_date`, `images`, `notes`, `created_at`, `updated_at`) VALUES
(1, 'PC-LC207-01', 'คอมพิวเตอร์ 01', 'LC', 2, 'LC207', 'in-progress', 'คอมพิวเตอร์เปิดไม่ติด มีเสียง beep', 'อาจารย์สมชาย', '0202', 'high', '2024-01-15', NULL, NULL, NULL, NULL, '2025-09-02 07:53:07', '2025-09-03 09:06:00'),
(2, 'PC-LC207-02', 'คอมพิวเตอร์ 02', 'LC', 2, 'LC207', 'in-progress', 'จอคอมพิวเตอร์ไม่แสดงผล มีไฟกระพริบ', 'อาจารย์สมหญิง', '0202', 'medium', '2024-01-14', NULL, NULL, NULL, NULL, '2025-09-02 07:53:07', '2025-09-03 08:58:14'),
(3, 'PC-LC205-01', 'คอมพิวเตอร์ 03', 'LC', 2, 'LC205', 'in-progress', 'คอมพิวเตอร์รีสตาร์ทเองบ่อย', 'อาจารย์สมศรี', '0202', 'high', '2024-01-13', NULL, NULL, NULL, NULL, '2025-09-02 07:53:07', '2025-09-02 07:53:07'),
(4, 'PC-LC204-01', 'คอมพิวเตอร์ 04', 'LC', 2, 'LC204', 'completed', 'คอมพิวเตอร์เปิดติดแต่เข้า Windows ไม่ได้', 'อาจารย์สมหมาย', '0202', 'low', '2024-01-12', NULL, NULL, NULL, NULL, '2025-09-02 07:53:07', '2025-09-03 09:12:51'),
(9, 'PC-LC207-03', 'คอมพิวเตอร์ 05', 'LC', 2, 'LC207', 'pending', 'เครื่องเปิดไม่ติด จอไม่ขึ้น', 'อาจารย์ปรีชา', NULL, 'high', '2025-09-02', NULL, NULL, NULL, NULL, '2025-09-03 12:06:34', '2025-09-03 12:06:34');

-- --------------------------------------------------------

--
-- Table structure for table `tb_status_logs`
--

CREATE TABLE `tb_status_logs` (
  `id` int(11) NOT NULL,
  `repair_request_id` int(11) NOT NULL,
  `old_status` enum('pending','assigned','in-progress','completed') NOT NULL,
  `new_status` enum('pending','assigned','in-progress','completed') NOT NULL,
  `changed_by` char(4) NOT NULL,
  `changed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_status_logs`
--

INSERT INTO `tb_status_logs` (`id`, `repair_request_id`, `old_status`, `new_status`, `changed_by`, `changed_at`) VALUES
(1, 1, 'pending', 'assigned', '0201', '2025-09-02 07:53:07'),
(2, 2, 'assigned', 'in-progress', '0201', '2025-09-02 07:53:07'),
(3, 3, 'in-progress', 'completed', '0202', '2025-09-02 07:53:07'),
(4, 1, 'pending', 'in-progress', '0201', '2025-09-02 16:25:18'),
(5, 1, 'pending', 'in-progress', '0201', '2025-09-02 16:25:18'),
(6, 1, 'in-progress', 'completed', '0201', '2025-09-02 16:25:33'),
(7, 2, 'assigned', 'in-progress', '0202', '2025-09-03 08:58:05'),
(8, 2, 'assigned', 'in-progress', '0202', '2025-09-03 08:58:06'),
(9, 1, 'completed', 'in-progress', '0202', '2025-09-03 09:06:00'),
(10, 4, 'completed', 'in-progress', '0202', '2025-09-03 09:12:44'),
(11, 4, 'in-progress', 'completed', '0202', '2025-09-03 09:12:51');

-- --------------------------------------------------------

--
-- Table structure for table `tb_type`
--

CREATE TABLE `tb_type` (
  `id` char(2) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_type`
--

INSERT INTO `tb_type` (`id`, `name`) VALUES
('01', 'admin'),
('02', 'technician');

-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `id` char(4) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type_id` char(2) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`id`, `username`, `password`, `type_id`, `name`, `created_at`, `updated_at`) VALUES
('0101', 'admin', '1234', '01', 'System Administrator', '2025-09-02 07:53:07', '2025-09-02 07:53:07'),
('0201', 'tech1', '2345', '02', 'John Smith', '2025-09-02 07:53:07', '2025-09-02 07:53:07'),
('0202', 'tech2', '3456', '02', 'Jane Doe', '2025-09-02 07:53:07', '2025-09-02 07:53:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_equipment`
--
ALTER TABLE `tb_equipment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `uq_equipment_code` (`code`);

--
-- Indexes for table `tb_images`
--
ALTER TABLE `tb_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_images_rrid` (`repair_request_id`),
  ADD KEY `idx_images_uploaded_by` (`uploaded_by`);

--
-- Indexes for table `tb_notes`
--
ALTER TABLE `tb_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_notes_rrid` (`repair_request_id`),
  ADD KEY `idx_notes_created_by` (`created_by`);

--
-- Indexes for table `tb_repair_requests`
--
ALTER TABLE `tb_repair_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rr_equipment_code` (`equipment_code`),
  ADD KEY `fk_rr_assigned_to` (`assigned_to`);

--
-- Indexes for table `tb_status_logs`
--
ALTER TABLE `tb_status_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_statuslogs_rrid` (`repair_request_id`),
  ADD KEY `idx_statuslogs_changed_by` (`changed_by`);

--
-- Indexes for table `tb_type`
--
ALTER TABLE `tb_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `fk_users_type` (`type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_equipment`
--
ALTER TABLE `tb_equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `tb_images`
--
ALTER TABLE `tb_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_notes`
--
ALTER TABLE `tb_notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_repair_requests`
--
ALTER TABLE `tb_repair_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tb_status_logs`
--
ALTER TABLE `tb_status_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_images`
--
ALTER TABLE `tb_images`
  ADD CONSTRAINT `fk_images_request` FOREIGN KEY (`repair_request_id`) REFERENCES `tb_repair_requests` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_images_rrid` FOREIGN KEY (`repair_request_id`) REFERENCES `tb_repair_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_images_uploaded_by` FOREIGN KEY (`uploaded_by`) REFERENCES `tb_users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_images_user` FOREIGN KEY (`uploaded_by`) REFERENCES `tb_users` (`id`);

--
-- Constraints for table `tb_notes`
--
ALTER TABLE `tb_notes`
  ADD CONSTRAINT `fk_notes_created_by` FOREIGN KEY (`created_by`) REFERENCES `tb_users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_notes_request` FOREIGN KEY (`repair_request_id`) REFERENCES `tb_repair_requests` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_notes_rrid` FOREIGN KEY (`repair_request_id`) REFERENCES `tb_repair_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_notes_user` FOREIGN KEY (`created_by`) REFERENCES `tb_users` (`id`);

--
-- Constraints for table `tb_repair_requests`
--
ALTER TABLE `tb_repair_requests`
  ADD CONSTRAINT `fk_requests_assigned_user` FOREIGN KEY (`assigned_to`) REFERENCES `tb_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_rr_assigned_to` FOREIGN KEY (`assigned_to`) REFERENCES `tb_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rr_equipment_code` FOREIGN KEY (`equipment_code`) REFERENCES `tb_equipment` (`code`) ON UPDATE CASCADE;

--
-- Constraints for table `tb_status_logs`
--
ALTER TABLE `tb_status_logs`
  ADD CONSTRAINT `fk_logs_request` FOREIGN KEY (`repair_request_id`) REFERENCES `tb_repair_requests` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_logs_user` FOREIGN KEY (`changed_by`) REFERENCES `tb_users` (`id`),
  ADD CONSTRAINT `fk_statuslogs_changed_by` FOREIGN KEY (`changed_by`) REFERENCES `tb_users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_statuslogs_rrid` FOREIGN KEY (`repair_request_id`) REFERENCES `tb_repair_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD CONSTRAINT `fk_users_type` FOREIGN KEY (`type_id`) REFERENCES `tb_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
