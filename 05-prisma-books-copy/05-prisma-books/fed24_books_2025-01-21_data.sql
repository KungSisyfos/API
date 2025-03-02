-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Värd: localhost
-- Tid vid skapande: 21 jan 2025 kl 11:52
-- Serverversion: 11.5.2-MariaDB
-- PHP-version: 7.4.33

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `fed24_books`
--

--
-- Dumpning av Data i tabell `Author`
--

INSERT INTO `Author` (`id`, `name`) VALUES
(1, 'Sir Arthur C. Clarke'),
(2, 'Isaac Asimov'),
(3, 'Jason Anspach'),
(4, 'Nick Cole'),
(5, 'J.R.R. Tolkien'),
(6, 'Jane Austen'),
(7, 'Douglas Adams'),
(8, 'Amal El-Mohtar'),
(9, 'Max Gladstone'),
(11, 'Mr Beast');

--
-- Dumpning av Data i tabell `Book`
--

INSERT INTO `Book` (`id`, `title`, `pages`) VALUES
(1, '2001: A Space Odessey', 224),
(2, '2010: Odessey Two', 291),
(3, 'Foundation', 542),
(4, 'Galaxy\'s Edge: Book 1-2', 674),
(5, 'Pride and Prejudice', 279),
(6, 'The Hitchhiker\'s Guide to the Galaxy', 216),
(7, 'The Restaurant at the End of the Universe', 250),
(8, 'Life, the Universe and Everything', 224),
(9, 'So Long, and Thanks for All the Fish', 225),
(10, 'Mostly Harmless', 288),
(11, 'This Is How You Lose the Time War', 208),
(13, 'This Is How You Get Rich Quick', 1);

--
-- Dumpning av Data i tabell `_AuthorToBook`
--

INSERT INTO `_AuthorToBook` (`A`, `B`) VALUES
(1, 1),
(1, 2),
(2, 3),
(5, 3),
(3, 4),
(4, 4),
(5, 4),
(6, 5),
(7, 6),
(7, 7),
(7, 8),
(7, 9),
(7, 10),
(8, 11),
(9, 11),
(11, 13);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
