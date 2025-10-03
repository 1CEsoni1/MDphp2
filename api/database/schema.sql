-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2025 at 03:09 PM
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
-- Table structure for table `tb_equipment_location`
--

CREATE TABLE `tb_equipment_location` (
  `id` int(11) NOT NULL,
  `equipment_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `position_x` int(11) DEFAULT 0,
  `position_y` int(11) DEFAULT 0,
  `table_number` int(11) DEFAULT NULL,
  `side` varchar(20) DEFAULT NULL,
  `row_number` int(11) DEFAULT NULL,
  `seat` int(11) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_equipment_location`
--

INSERT INTO `tb_equipment_location` (`id`, `equipment_id`, `room_id`, `position_x`, `position_y`, `table_number`, `side`, `row_number`, `seat`, `updated_at`) VALUES
(1, 1, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(2, 2, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(3, 3, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(4, 4, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(5, 5, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(6, 6, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(7, 7, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(8, 8, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(9, 9, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(10, 10, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(11, 11, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(12, 12, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(13, 13, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(14, 14, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(15, 15, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(16, 16, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(17, 17, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(18, 18, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(19, 19, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(20, 20, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(21, 21, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(22, 22, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(23, 23, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(24, 24, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(25, 25, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(26, 26, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(27, 27, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(28, 28, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(29, 29, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(30, 30, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(31, 31, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(32, 32, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(33, 33, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(34, 34, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(35, 35, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(36, 36, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(37, 37, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(38, 38, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(39, 39, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(40, 40, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(41, 41, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(42, 42, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(43, 43, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(44, 44, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(45, 45, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(46, 46, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(47, 47, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(48, 48, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(49, 49, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(50, 50, 1, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(51, 51, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(52, 52, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(53, 53, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(54, 54, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(55, 55, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(56, 56, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(57, 57, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(58, 58, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(59, 59, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(60, 60, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(61, 61, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(62, 62, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(63, 63, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(64, 64, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(65, 65, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(66, 66, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(67, 67, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(68, 68, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(69, 69, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(70, 70, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(71, 71, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(72, 72, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(73, 73, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(74, 74, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(75, 75, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(76, 76, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(77, 77, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(78, 78, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(79, 79, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(80, 80, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(81, 81, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(82, 82, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(83, 83, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(84, 84, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(85, 85, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(86, 86, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(87, 87, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(88, 88, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(89, 89, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(90, 90, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(91, 91, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(92, 92, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(93, 93, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(94, 94, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(95, 95, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(96, 96, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(97, 97, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(98, 98, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(99, 99, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(100, 100, 2, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(101, 101, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(102, 102, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(103, 103, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(104, 104, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(105, 105, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(106, 106, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(107, 107, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(108, 108, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(109, 109, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(110, 110, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(111, 111, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(112, 112, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(113, 113, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(114, 114, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(115, 115, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(116, 116, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(117, 117, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(118, 118, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(119, 119, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(120, 120, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(121, 121, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(122, 122, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(123, 123, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(124, 124, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(125, 125, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(126, 126, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(127, 127, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(128, 128, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(129, 129, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(130, 130, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(131, 131, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(132, 132, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(133, 133, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(134, 134, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(135, 135, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(136, 136, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(137, 137, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(138, 138, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(139, 139, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(140, 140, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(141, 141, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(142, 142, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(143, 143, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(144, 144, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(145, 145, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(146, 146, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(147, 147, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(148, 148, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(149, 149, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57'),
(150, 150, 3, 0, 0, NULL, NULL, NULL, NULL, '2025-09-03 13:43:57');

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
(3, 3, 'https://example.com/images/pc3-repair.jpg', '0202', '2025-09-02 07:53:07'),
(4, 8, '1759399039655-bell.png', '0202', '2025-10-02 09:57:19'),
(5, 8, '1759399483792-bell.png', '0202', '2025-10-02 10:04:43'),
(6, 8, '1759399718471-bell.png', '0202', '2025-10-02 10:08:38'),
(7, 3, '1759490615740-bell.png', '0201', '2025-10-03 11:23:35'),
(8, 3, '1759491051070-bell.png', '0201', '2025-10-03 11:30:51'),
(9, 5, '1759491431698-man.png', '0201', '2025-10-03 11:37:11'),
(10, 5, '1759491692949-bell.png', '0201', '2025-10-03 11:41:32'),
(11, 5, '1759492195628-bell.png', '0201', '2025-10-03 11:49:55'),
(12, 5, '1759492457606-catty.jpg', '0201', '2025-10-03 11:54:17'),
(13, 3, '1759492656419-bell.png', '0201', '2025-10-03 11:57:36'),
(14, 5, '1759494080854-bell.png', '0201', '2025-10-03 12:21:20'),
(15, 5, '1759494742714-bell.png', '0201', '2025-10-03 12:32:22'),
(16, 5, '1759494793772-bell.png', '0201', '2025-10-03 12:33:13'),
(17, 5, '1759494936644-man.png', '0201', '2025-10-03 12:35:36'),
(18, 11, '1759495978324-bell.png', '0201', '2025-10-03 12:52:58'),
(19, 11, '1759496000052-bell.png', '0201', '2025-10-03 12:53:20'),
(20, 11, '1759496103227-bell.png', '0201', '2025-10-03 12:55:03'),
(21, 11, '1759496345755-bell.png', '0201', '2025-10-03 12:59:05'),
(22, 11, '1759496488400-bell.png', '0201', '2025-10-03 13:01:28'),
(23, 3, '1759496760903-bell.png', '0201', '2025-10-03 13:06:00'),
(24, 3, '1759496784043-bell.png', '0201', '2025-10-03 13:06:24');

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
(1, 'PC-LC204-01', 'คอมพิวเตอร์ 01', 'LC', 2, 'LC204', 'in-progress', 'คอมพิวเตอร์เปิดไม่ติด มีเสียง beep', 'อาจารย์สมชาย', '0202', 'high', '2024-01-15', NULL, NULL, NULL, NULL, '2025-09-02 07:53:07', '2025-10-02 09:48:38'),
(2, 'PC-LC204-02', 'คอมพิวเตอร์ 02', 'LC', 2, 'LC204', 'in-progress', 'จอคอมพิวเตอร์ไม่แสดงผล มีไฟกระพริบ', 'อาจารย์สมหญิง', '0202', 'medium', '2024-01-14', NULL, NULL, NULL, NULL, '2025-09-02 07:53:07', '2025-10-02 09:48:38'),
(3, 'PC-LC205-01', 'คอมพิวเตอร์ 01', 'LC', 2, 'LC205', 'completed', 'คอมพิวเตอร์รีสตาร์ทเองบ่อย', 'อาจารย์สมศรี', '0201', 'high', '2024-01-13', '2025-10-03 13:05:56', '2025-10-03 13:06:24', '[\"1759490615740-bell.png\",\"1759491051070-bell.png\",\"1759492656419-bell.png\",\"1759496760903-bell.png\",\"1759496784043-bell.png\"]', 'csdsd', '2025-09-02 07:53:07', '2025-10-03 13:06:24'),
(4, 'PC-LC204-01', 'คอมพิวเตอร์ 04', 'LC', 2, 'LC204', 'completed', 'คอมพิวเตอร์เปิดติดแต่เข้า Windows ไม่ได้', 'อาจารย์สมหมาย', '0202', 'low', '2024-01-12', NULL, NULL, NULL, NULL, '2025-09-02 07:53:07', '2025-10-02 09:48:38'),
(5, 'PC-LC207-03', 'คอมพิวเตอร์ 05', 'LC', 2, 'LC207', 'completed', 'เครื่องเปิดไม่ติด จอไม่ขึ้น', 'อาจารย์ปรีชา', '0201', 'high', '2025-09-02', '2025-10-03 12:35:17', '2025-10-03 12:35:36', '[\"1759494936644-man.png\"]', '00000', '2025-09-03 12:06:34', '2025-10-03 12:35:36'),
(6, 'PC-LC207-11', 'คอมพิวเตอร์ 11', 'LC', 2, 'LC207', 'in-progress', 'จอไม่แสดงผล มีเสียงบี๊บ', 'อาจารย์สมชาย', '0201', 'medium', '2025-09-30', NULL, NULL, NULL, NULL, '2025-09-30 16:28:14', '2025-10-02 09:48:38'),
(7, 'PC-LC205-05', 'คอมพิวเตอร์ 05', 'LC', 2, 'LC205', 'in-progress', 'เมาส์ทำงานผิดปกติ', 'อาจารย์สมหญิง', '0201', 'low', '2025-09-30', NULL, NULL, NULL, NULL, '2025-09-30 16:28:14', '2025-10-02 09:48:38'),
(8, 'PC-LC204-44', 'คอมพิวเตอร์ 44', 'LC', 2, 'LC204', 'completed', 'จอเขียว', 'อาจารย์สมปอง', '0202', 'medium', '2025-10-02', '2025-10-01 17:00:00', '2025-10-02 10:08:38', '[\"1759399718471-bell.png\"]', 'ยยยยยยยยยยยยยยย', '2025-10-02 09:07:28', '2025-10-02 10:08:38'),
(9, 'PC-LC204-43', 'คอมพิวเตอร์ 43', 'LC', 2, 'LC204', 'pending', 'จอดำ', 'อาจารย์สมปอง', '0202', 'medium', '2025-10-02', '2025-10-01 17:00:00', NULL, NULL, NULL, '2025-10-02 09:06:04', '2025-10-02 09:48:38'),
(11, 'PC-LC207-20', 'คอมพิวเตอร์ 20', 'LC', 2, 'LC207', 'completed', 'sssssss', 'อาจารย์สมสัก', '0201', 'medium', '2025-10-03', '2025-10-03 12:47:18', '2025-10-03 13:01:28', '[\"1759496488400-bell.png\"]', 'dsdsdsd', '2025-10-03 12:47:18', '2025-10-03 13:01:28');

-- --------------------------------------------------------

--
-- Table structure for table `tb_room`
--

CREATE TABLE `tb_room` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `building` varchar(50) DEFAULT NULL,
  `floor` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `assigned_technician` char(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_room`
--

INSERT INTO `tb_room` (`id`, `code`, `name`, `building`, `floor`, `created_at`, `assigned_technician`) VALUES
(1, 'LC207', 'LC207', 'LC', 2, '2025-09-03 14:37:01', '0201'),
(2, 'LC204', 'LC204', 'LC', 2, '2025-09-03 14:37:01', '0202'),
(3, 'LC205', 'LC205', 'LC', 2, '2025-09-03 14:37:01', '0201');

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
(11, 4, 'in-progress', 'completed', '0202', '2025-09-03 09:12:51'),
(13, 7, 'pending', 'in-progress', '0201', '2025-09-30 16:29:12'),
(14, 7, 'pending', 'in-progress', '0201', '2025-09-30 16:29:12'),
(15, 7, 'pending', 'in-progress', '0201', '2025-09-30 16:29:12'),
(16, 7, 'pending', 'in-progress', '0201', '2025-09-30 16:29:12'),
(17, 5, 'pending', 'in-progress', '0201', '2025-09-30 16:29:37'),
(18, 7, 'pending', 'in-progress', '0201', '2025-09-30 16:53:39'),
(19, 7, 'pending', 'in-progress', '0201', '2025-09-30 16:54:57'),
(20, 7, 'pending', 'in-progress', '0201', '2025-09-30 16:56:47'),
(21, 6, 'assigned', 'in-progress', '0201', '2025-09-30 16:57:34'),
(22, 8, 'pending', 'in-progress', '0202', '2025-10-02 09:51:18'),
(23, 8, 'pending', 'in-progress', '0202', '2025-10-02 09:51:18'),
(24, 8, 'pending', 'in-progress', '0202', '2025-10-02 09:51:53'),
(25, 8, 'pending', 'in-progress', '0202', '2025-10-02 09:52:25'),
(26, 8, 'pending', 'in-progress', '0202', '2025-10-02 09:57:02'),
(27, 8, 'in-progress', 'completed', '0202', '2025-10-02 09:57:19'),
(28, 8, 'pending', 'in-progress', '0202', '2025-10-02 10:04:31'),
(29, 8, 'in-progress', 'completed', '0202', '2025-10-02 10:04:43'),
(30, 8, 'pending', 'in-progress', '0202', '2025-10-02 10:07:58'),
(31, 8, 'in-progress', 'completed', '0202', '2025-10-02 10:08:38'),
(32, 3, 'in-progress', 'completed', '0201', '2025-10-03 11:11:15'),
(33, 3, 'in-progress', 'assigned', '0201', '2025-10-03 11:13:48'),
(34, 3, 'assigned', 'in-progress', '0201', '2025-10-03 11:13:49'),
(35, 3, 'in-progress', 'assigned', '0201', '2025-10-03 11:23:52'),
(36, 3, 'assigned', 'in-progress', '0201', '2025-10-03 11:23:53'),
(37, 5, 'in-progress', 'assigned', '0201', '2025-10-03 11:41:07'),
(38, 5, 'assigned', 'in-progress', '0201', '2025-10-03 11:41:11'),
(39, 5, 'in-progress', 'assigned', '0201', '2025-10-03 11:49:28'),
(40, 5, 'assigned', 'in-progress', '0201', '2025-10-03 11:49:28'),
(41, 5, 'in-progress', 'completed', '0201', '2025-10-03 11:49:55'),
(42, 5, 'in-progress', 'assigned', '0201', '2025-10-03 11:53:54'),
(43, 5, 'assigned', 'in-progress', '0201', '2025-10-03 11:53:54'),
(44, 5, 'in-progress', 'completed', '0201', '2025-10-03 11:54:17'),
(45, 3, 'in-progress', 'assigned', '0201', '2025-10-03 11:54:29'),
(46, 3, 'assigned', 'in-progress', '0201', '2025-10-03 11:54:30'),
(47, 3, 'in-progress', 'completed', '0201', '2025-10-03 11:57:36'),
(48, 5, 'in-progress', 'assigned', '0201', '2025-10-03 12:20:54'),
(49, 5, 'in-progress', 'completed', '0201', '2025-10-03 12:21:20'),
(50, 5, 'in-progress', 'assigned', '0201', '2025-10-03 12:31:58'),
(51, 5, 'assigned', 'in-progress', '0201', '2025-10-03 12:32:02'),
(52, 5, 'in-progress', 'assigned', '0201', '2025-10-03 12:32:36'),
(53, 5, 'assigned', 'in-progress', '0201', '2025-10-03 12:32:43'),
(54, 5, 'in-progress', 'assigned', '0201', '2025-10-03 12:35:17'),
(55, 5, 'in-progress', 'completed', '0201', '2025-10-03 12:35:36'),
(57, 11, 'pending', 'in-progress', '0201', '2025-10-03 12:47:39'),
(58, 11, 'in-progress', 'completed', '0201', '2025-10-03 13:01:28'),
(59, 3, 'completed', 'assigned', '0201', '2025-10-03 13:05:56'),
(60, 3, 'assigned', 'in-progress', '0201', '2025-10-03 13:06:00'),
(61, 3, 'in-progress', 'completed', '0201', '2025-10-03 13:06:24');

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
-- Indexes for table `tb_equipment_location`
--
ALTER TABLE `tb_equipment_location`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_equipment_room` (`equipment_id`,`room_id`),
  ADD KEY `idx_room_id` (`room_id`);

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
-- Indexes for table `tb_room`
--
ALTER TABLE `tb_room`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `fk_room_assigned_technician` (`assigned_technician`);

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
-- AUTO_INCREMENT for table `tb_equipment_location`
--
ALTER TABLE `tb_equipment_location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;

--
-- AUTO_INCREMENT for table `tb_images`
--
ALTER TABLE `tb_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `tb_notes`
--
ALTER TABLE `tb_notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_repair_requests`
--
ALTER TABLE `tb_repair_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tb_room`
--
ALTER TABLE `tb_room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_status_logs`
--
ALTER TABLE `tb_status_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_equipment_location`
--
ALTER TABLE `tb_equipment_location`
  ADD CONSTRAINT `fk_eq_loc_equipment` FOREIGN KEY (`equipment_id`) REFERENCES `tb_equipment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_eq_loc_room` FOREIGN KEY (`room_id`) REFERENCES `tb_room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tb_images`
--
ALTER TABLE `tb_images`
  ADD CONSTRAINT `fk_images_request` FOREIGN KEY (`repair_request_id`) REFERENCES `tb_repair_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_images_uploaded_by` FOREIGN KEY (`uploaded_by`) REFERENCES `tb_users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_images_user` FOREIGN KEY (`uploaded_by`) REFERENCES `tb_users` (`id`);

--
-- Constraints for table `tb_notes`
--
ALTER TABLE `tb_notes`
  ADD CONSTRAINT `fk_notes_created_by` FOREIGN KEY (`created_by`) REFERENCES `tb_users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_notes_request` FOREIGN KEY (`repair_request_id`) REFERENCES `tb_repair_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_notes_user` FOREIGN KEY (`created_by`) REFERENCES `tb_users` (`id`);

--
-- Constraints for table `tb_repair_requests`
--
ALTER TABLE `tb_repair_requests`
  ADD CONSTRAINT `fk_requests_assigned_user` FOREIGN KEY (`assigned_to`) REFERENCES `tb_users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_rr_assigned_to` FOREIGN KEY (`assigned_to`) REFERENCES `tb_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rr_equipment_code` FOREIGN KEY (`equipment_code`) REFERENCES `tb_equipment` (`code`) ON UPDATE CASCADE;

--
-- Constraints for table `tb_room`
--
ALTER TABLE `tb_room`
  ADD CONSTRAINT `fk_room_assigned_technician` FOREIGN KEY (`assigned_technician`) REFERENCES `tb_users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tb_status_logs`
--
ALTER TABLE `tb_status_logs`
  ADD CONSTRAINT `fk_logs_request` FOREIGN KEY (`repair_request_id`) REFERENCES `tb_repair_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_logs_user` FOREIGN KEY (`changed_by`) REFERENCES `tb_users` (`id`),
  ADD CONSTRAINT `fk_statuslogs_changed_by` FOREIGN KEY (`changed_by`) REFERENCES `tb_users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD CONSTRAINT `fk_users_type` FOREIGN KEY (`type_id`) REFERENCES `tb_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
