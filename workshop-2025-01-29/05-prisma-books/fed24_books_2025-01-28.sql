-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Värd: localhost
-- Tid vid skapande: 28 jan 2025 kl 10:04
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

-- --------------------------------------------------------

--
-- Tabellstruktur `Author`
--

CREATE TABLE `Author` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `birthyear` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `Author`
--

INSERT INTO `Author` (`id`, `name`, `birthyear`) VALUES
(1, 'Sean Banan', NULL),
(3, 'Mrs Y', NULL),
(4, 'Mrs Y', NULL),
(5, 'Mrs Y', NULL),
(6, 'Mrs Y', NULL),
(8, 'Señor Author', 1984),
(9, 'Nano Author', 2025),
(10, 'Selma Lagerlöf', NULL),
(11, 'Astrid Lindgren', 1907),
(12, 'Amal El-Mohtar', 1984),
(13, 'Max Gladstone', NULL),
(14, ' X ', NULL),
(15, 'X', NULL),
(16, 'X', NULL),
(17, 'Mr X', NULL),
(18, 'Mr X', NULL),
(19, 'Ms Y', 2001);

-- --------------------------------------------------------

--
-- Tabellstruktur `Book`
--

CREATE TABLE `Book` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) NOT NULL,
  `pages` int(10) UNSIGNED NOT NULL,
  `publisherId` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `Book`
--

INSERT INTO `Book` (`id`, `title`, `pages`, `publisherId`) VALUES
(1, 'This Is How You Win the Time War', 1337, 4),
(2, 'This is How You Lose the Time War', 208, 1);

-- --------------------------------------------------------

--
-- Tabellstruktur `Publisher`
--

CREATE TABLE `Publisher` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `Publisher`
--

INSERT INTO `Publisher` (`id`, `name`) VALUES
(1, 'Hutchinson'),
(4, 'Quercus Books');

-- --------------------------------------------------------

--
-- Tabellstruktur `User`
--

CREATE TABLE `User` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellstruktur `_AuthorToBook`
--

CREATE TABLE `_AuthorToBook` (
  `A` int(10) UNSIGNED NOT NULL,
  `B` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `_AuthorToBook`
--

INSERT INTO `_AuthorToBook` (`A`, `B`) VALUES
(12, 2),
(13, 2);

-- --------------------------------------------------------

--
-- Tabellstruktur `_BookToUser`
--

CREATE TABLE `_BookToUser` (
  `A` int(10) UNSIGNED NOT NULL,
  `B` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tabellstruktur `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumpning av Data i tabell `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('06d8d058-a1fd-47ec-a501-efe5d4004efd', 'e66a962bb5a25dde3c30059c320ee406da5f63a1ba147019d89323666025c525', '2025-01-23 13:24:23.483', '20250123083723_added_publisher', NULL, NULL, '2025-01-23 13:24:23.312', 1),
('4853caaa-3c2a-47df-8d79-7c5016007c6f', '4159f49c9b791e90fcb39f7aa6b51119b175c337fdde382907ef098b6ef52b3f', '2025-01-28 08:57:39.939', '20250128085739_added_user_model', NULL, NULL, '2025-01-28 08:57:39.716', 1),
('7667f057-d59d-43ee-8710-2b2c8e4cf169', 'ea6091133bfdc10847bf9006373754b1380ad1f56951dd9a02b240c034ead45f', '2025-01-23 13:24:23.110', '20250121115420_init', NULL, NULL, '2025-01-23 13:24:22.875', 1),
('a18b72c2-679b-402c-8c96-3e623f45f3ee', '13be9d9fd07de0bb790370dc7785231f850bc6c2cc069fe43a152890fa5aa5a3', '2025-01-23 13:24:23.184', '20250121121328_added_isbn_to_books', NULL, NULL, '2025-01-23 13:24:23.110', 1),
('d045c6ab-62d8-4106-a872-3929b55b1402', 'a547deecbe0339f8fbecb20a446f3372282e2353f9d7fca52196931abd435229', '2025-01-23 13:24:23.310', '20250121122028_removed_isbn_from_books_added_birthyear_to_author', NULL, NULL, '2025-01-23 13:24:23.186', 1);

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `Author`
--
ALTER TABLE `Author`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `Book`
--
ALTER TABLE `Book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Book_publisherId_fkey` (`publisherId`);

--
-- Index för tabell `Publisher`
--
ALTER TABLE `Publisher`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Index för tabell `_AuthorToBook`
--
ALTER TABLE `_AuthorToBook`
  ADD UNIQUE KEY `_AuthorToBook_AB_unique` (`A`,`B`),
  ADD KEY `_AuthorToBook_B_index` (`B`);

--
-- Index för tabell `_BookToUser`
--
ALTER TABLE `_BookToUser`
  ADD UNIQUE KEY `_BookToUser_AB_unique` (`A`,`B`),
  ADD KEY `_BookToUser_B_index` (`B`);

--
-- Index för tabell `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `Author`
--
ALTER TABLE `Author`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT för tabell `Book`
--
ALTER TABLE `Book`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT för tabell `Publisher`
--
ALTER TABLE `Publisher`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT för tabell `User`
--
ALTER TABLE `User`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `Book`
--
ALTER TABLE `Book`
  ADD CONSTRAINT `Book_publisherId_fkey` FOREIGN KEY (`publisherId`) REFERENCES `Publisher` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Restriktioner för tabell `_AuthorToBook`
--
ALTER TABLE `_AuthorToBook`
  ADD CONSTRAINT `_AuthorToBook_A_fkey` FOREIGN KEY (`A`) REFERENCES `Author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_AuthorToBook_B_fkey` FOREIGN KEY (`B`) REFERENCES `Book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriktioner för tabell `_BookToUser`
--
ALTER TABLE `_BookToUser`
  ADD CONSTRAINT `_BookToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_BookToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
