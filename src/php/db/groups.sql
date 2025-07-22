-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-07-2025 a las 00:01:38
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `control`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `id_language` int(11) NOT NULL,
  `level` varchar(50) NOT NULL,
  `schedule` varchar(20) NOT NULL,
  `days` varchar(50) NOT NULL,
  `id_teacher` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `groups`
--

INSERT INTO `groups` (`id`, `id_language`, `level`, `schedule`, `days`, `id_teacher`) VALUES
(1, 1, 'A1', '8:30-10:00', 'Lunes-Miercoles', 185),
(2, 1, 'B1(Conversacional)', '16:00-17:30', 'Lunes-Miercoles', 188),
(3, 1, 'B1(Preintermedio)', '07:00-08:30', 'Lunes-Miercoles', 185),
(4, 1, 'B1(Preintermedio)', '17:30-19:00', 'Lunes-Miercoles', 188),
(5, 1, 'B2', '07:00-08:30', 'Lunes-Miercoles', 187),
(6, 1, 'B2+', '08:30-10:00', 'Jueves-Viernes', 186),
(7, 1, 'C1', '07:00-08:30', 'Jueves-Viernes', 186),
(8, 2, 'A1.1', '10:00-11:30', 'Martes-Jueves', 0),
(9, 2, 'A1.1', '12:00-13:30', 'Martes-Jueves', 0),
(10, 2, 'A1.1', '17:30-19:00', 'Martes-Miercoles', 0),
(11, 2, 'A1.2', '07:00-08:30', 'Lunes-Jueves', 0),
(12, 2, 'A2.2', '07:00-08:30', 'Martes-Miercoles', 0),
(13, 2, 'A2.2', '10:30-12:00', 'Martes-Jueves', 0),
(19, 2, 'B1.1', '12:00-13:30', 'Miercoles-Viernes', 0),
(20, 2, 'C1.2', '17:30-19:00', 'Lunes-Jueves', 0),
(24, 1, 'Test1', '12:09-14:10', 'Lunes-Martes', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
