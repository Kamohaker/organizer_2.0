-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 22 Paź 2023, 20:42
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `organizer`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `linki`
--

CREATE TABLE `linki` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) NOT NULL,
  `links` varchar(1500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `linki`
--

INSERT INTO `linki` (`id`, `nazwa`, `links`) VALUES
(2, 'nowylink', 'fasfsafasfsafa'),
(3, 'sfsafafafafaf', 'asfsassfas'),
(4, 'ewtwwtwetwe', 'tewdfsw'),
(6, 'dsad', 'jhghh');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `maile`
--

CREATE TABLE `maile` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `maile`
--

INSERT INTO `maile` (`id`, `nazwa`, `email`) VALUES
(1, 'mail1', 'msasa@daa'),
(2, 'gdssmaile', 'fdssfg'),
(5, 'ggggggf', 'gfdsw');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notatnik`
--

CREATE TABLE `notatnik` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) NOT NULL,
  `opis` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `notatnik`
--

INSERT INTO `notatnik` (`id`, `nazwa`, `opis`) VALUES
(2, 'Notatka2', 'Oto notatka dwa'),
(4, 'afasf', 'dziwny tekst'),
(5, 'notka 3', 'cos tam');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `plan`
--

CREATE TABLE `plan` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) NOT NULL,
  `kiedy` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portfel`
--

CREATE TABLE `portfel` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) NOT NULL,
  `num_telefonu` int(9) NOT NULL,
  `num_konta` int(26) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `portfel`
--

INSERT INTO `portfel` (`id`, `nazwa`, `num_telefonu`, `num_konta`) VALUES
(4, 'nazwa222', 21474, 3333333),
(5, 'fasfdasffasaf', 2147483647, 2147483647);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `prowadzacy`
--

CREATE TABLE `prowadzacy` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) NOT NULL,
  `stopien` varchar(30) NOT NULL,
  `num_pokoju` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `todo`
--

CREATE TABLE `todo` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(30) NOT NULL,
  `kiedy` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `linki`
--
ALTER TABLE `linki`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `maile`
--
ALTER TABLE `maile`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `notatnik`
--
ALTER TABLE `notatnik`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `portfel`
--
ALTER TABLE `portfel`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `prowadzacy`
--
ALTER TABLE `prowadzacy`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `todo`
--
ALTER TABLE `todo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `linki`
--
ALTER TABLE `linki`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `maile`
--
ALTER TABLE `maile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `notatnik`
--
ALTER TABLE `notatnik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT dla tabeli `plan`
--
ALTER TABLE `plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `portfel`
--
ALTER TABLE `portfel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `prowadzacy`
--
ALTER TABLE `prowadzacy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `todo`
--
ALTER TABLE `todo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
