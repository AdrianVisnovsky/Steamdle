-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2023 at 10:18 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `steamdle`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `addSuccessfulGuess` (IN `in_day` DATE)   BEGIN

	IF (SELECT COUNT(*) FROM `daily_challenge` WHERE Day = in_day) > 0 THEN

		UPDATE `daily_challenge` SET
        	Guessed = Guessed + 1
        WHERE Day = in_day;
        
	END IF;
    
	SELECT Guessed
    	FROM `daily_challenge`
        WHERE Day = in_day;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getDailyChallengeGame` (IN `gameDay` DATE)  DETERMINISTIC BEGIN

	IF (SELECT COUNT(*) FROM `daily_challenge` WHERE Day = gameDay) = 0 THEN

        SET @newAppId =
            (SELECT AppId
                FROM `games`
                ORDER BY RAND()
                LIMIT 1);

        INSERT INTO `daily_challenge`(Day, AppId, PlayerCount, Guessed)
            VALUES(gameDay, @newAppId, 0, 0);
        
	END IF;

	UPDATE `daily_challenge` SET
		PlayerCount = PlayerCount + 1
	WHERE Day = gameDay;

	SELECT Day, AppId, PlayerCount, Guessed
 	   FROM `daily_challenge`
 	   WHERE Day = gameDay;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `daily_challenge`
--

CREATE TABLE `daily_challenge` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `Day` date NOT NULL,
  `AppId` int(11) NOT NULL,
  `PlayerCount` int(11) NOT NULL,
  `Guessed` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `daily_challenge`
--

INSERT INTO `daily_challenge` (`ID`, `Day`, `AppId`, `PlayerCount`, `Guessed`, `created_at`, `updated_at`) VALUES
(1, '2023-04-02', 440, 71, 5, NULL, NULL),
(2, '2023-04-03', 377160, 40, 1, NULL, NULL),
(4, '2023-04-04', 20540, 1, 1, NULL, NULL),
(5, '2023-04-07', 304390, 73, 1, NULL, NULL),
(6, '2023-04-08', 380600, 43, 1, NULL, NULL),
(8, '2023-04-09', 838350, 47, 8, NULL, NULL),
(9, '2023-04-10', 204300, 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `AppId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`ID`, `AppId`) VALUES
(10, 10),
(101, 20),
(37, 30),
(38, 40),
(39, 50),
(102, 60),
(40, 70),
(11, 80),
(41, 130),
(12, 220),
(13, 240),
(103, 280),
(42, 300),
(43, 320),
(14, 340),
(15, 360),
(44, 380),
(45, 400),
(46, 420),
(4, 440),
(47, 500),
(16, 550),
(1, 570),
(17, 620),
(104, 630),
(2, 730),
(664, 1200),
(105, 1250),
(665, 1500),
(666, 1510),
(667, 1520),
(668, 1530),
(669, 1930),
(670, 2100),
(671, 2280),
(672, 2300),
(673, 2310),
(674, 2350),
(314, 2400),
(675, 2600),
(676, 2630),
(315, 2700),
(677, 2820),
(106, 3590),
(678, 3700),
(107, 3830),
(316, 3900),
(317, 3910),
(679, 3920),
(318, 3990),
(18, 4000),
(319, 4500),
(108, 4560),
(320, 4570),
(321, 4580),
(109, 4700),
(680, 4720),
(322, 4760),
(681, 4770),
(323, 4920),
(324, 6000),
(325, 6020),
(326, 6030),
(110, 6060),
(682, 6370),
(683, 6800),
(684, 6810),
(685, 6830),
(686, 6840),
(327, 6850),
(328, 6860),
(329, 6880),
(330, 6900),
(331, 6910),
(687, 6920),
(688, 6980),
(689, 7000),
(690, 7510),
(691, 7520),
(692, 7600),
(693, 7650),
(694, 7660),
(111, 7670),
(332, 7760),
(695, 7770),
(333, 7940),
(696, 8000),
(697, 8140),
(112, 8190),
(698, 8230),
(113, 8500),
(699, 8600),
(334, 8800),
(114, 8850),
(115, 8870),
(48, 8930),
(335, 8980),
(700, 9050),
(701, 9160),
(336, 9200),
(702, 9310),
(116, 9340),
(703, 9350),
(704, 9420),
(337, 9450),
(117, 9480),
(705, 9880),
(338, 9900),
(118, 10090),
(706, 10150),
(49, 10180),
(119, 10500),
(339, 10680),
(120, 11020),
(340, 11450),
(707, 11610),
(341, 12100),
(342, 12110),
(121, 12120),
(708, 12140),
(709, 12150),
(710, 12170),
(711, 12180),
(343, 12200),
(122, 12210),
(344, 12220),
(712, 12710),
(345, 12810),
(713, 12830),
(346, 12900),
(714, 13140),
(715, 13210),
(716, 13520),
(717, 15100),
(718, 15120),
(123, 15620),
(50, 15700),
(347, 16450),
(348, 16810),
(349, 17080),
(350, 17300),
(719, 17330),
(124, 17390),
(125, 17410),
(720, 17450),
(351, 17460),
(126, 17470),
(721, 17480),
(722, 17500),
(352, 17570),
(723, 18500),
(353, 19900),
(354, 20500),
(724, 20510),
(355, 20540),
(356, 20570),
(127, 20900),
(128, 20920),
(357, 21090),
(358, 21100),
(359, 21690),
(360, 22000),
(361, 22100),
(725, 22180),
(726, 22300),
(362, 22320),
(363, 22330),
(364, 22350),
(129, 22370),
(130, 22380),
(727, 22600),
(728, 23310),
(365, 23490),
(729, 24010),
(131, 24200),
(132, 24240),
(366, 24740),
(367, 24780),
(730, 24790),
(731, 24800),
(133, 24960),
(368, 24980),
(732, 25000),
(733, 25890),
(734, 26500),
(369, 26800),
(735, 26900),
(736, 28000),
(737, 31270),
(370, 31280),
(738, 32350),
(739, 32360),
(134, 32370),
(371, 32380),
(740, 32390),
(372, 32400),
(741, 32420),
(373, 32430),
(742, 32440),
(374, 32470),
(375, 32500),
(376, 32800),
(377, 33230),
(743, 33900),
(135, 33930),
(136, 34030),
(378, 34270),
(137, 34330),
(744, 34830),
(379, 34870),
(745, 35130),
(138, 35140),
(139, 35450),
(380, 35700),
(140, 35720),
(381, 38400),
(382, 38410),
(746, 38420),
(383, 39000),
(141, 39120),
(384, 39140),
(747, 39150),
(748, 39160),
(749, 39190),
(750, 39200),
(142, 39210),
(385, 40100),
(386, 40390),
(387, 40800),
(388, 40970),
(389, 41000),
(143, 41070),
(390, 41500),
(391, 41700),
(144, 42680),
(145, 42700),
(146, 42910),
(51, 44350),
(392, 47410),
(393, 47780),
(394, 47790),
(395, 47810),
(396, 47870),
(147, 47890),
(148, 48000),
(397, 48190),
(149, 48700),
(398, 48720),
(19, 49520),
(150, 50130),
(399, 50300),
(151, 50620),
(152, 55100),
(400, 55110),
(153, 55150),
(154, 55230),
(155, 56400),
(156, 57300),
(157, 57690),
(401, 63380),
(402, 65800),
(158, 65930),
(403, 65980),
(404, 67370),
(405, 70000),
(52, 72850),
(53, 96000),
(406, 96100),
(159, 99900),
(160, 104900),
(161, 105450),
(20, 105600),
(162, 107100),
(163, 107410),
(407, 108600),
(164, 108710),
(54, 109600),
(408, 110800),
(409, 113020),
(165, 113200),
(55, 113400),
(410, 113420),
(411, 200170),
(166, 200210),
(167, 200260),
(168, 200510),
(169, 200710),
(170, 201790),
(412, 201810),
(413, 202750),
(171, 202970),
(172, 203140),
(56, 203160),
(173, 203290),
(174, 203770),
(414, 204100),
(175, 204300),
(57, 204360),
(415, 204450),
(416, 204880),
(176, 205100),
(417, 205230),
(418, 205950),
(177, 206210),
(178, 206420),
(419, 206440),
(420, 206480),
(421, 206500),
(179, 207140),
(422, 207230),
(180, 207610),
(58, 208090),
(423, 208140),
(424, 208580),
(181, 208650),
(182, 209000),
(183, 209080),
(425, 209160),
(426, 209670),
(184, 209870),
(185, 210770),
(427, 211160),
(428, 211500),
(186, 211820),
(429, 212070),
(430, 212160),
(187, 212500),
(188, 212680),
(189, 213670),
(431, 214340),
(190, 214420),
(432, 214490),
(655, 214560),
(191, 214950),
(433, 215080),
(434, 215280),
(435, 215530),
(436, 216150),
(59, 218230),
(21, 218620),
(437, 218680),
(192, 219150),
(60, 219640),
(96, 219740),
(438, 219890),
(22, 219990),
(193, 220200),
(194, 220240),
(439, 221040),
(195, 221100),
(61, 221380),
(196, 221910),
(197, 222880),
(198, 223470),
(199, 223710),
(200, 223750),
(62, 224260),
(656, 224540),
(201, 224600),
(440, 224760),
(441, 225080),
(202, 225540),
(203, 225840),
(442, 226840),
(63, 227300),
(23, 227940),
(443, 228200),
(444, 230230),
(5, 230410),
(445, 231060),
(204, 231430),
(205, 232090),
(206, 232770),
(446, 232890),
(207, 233130),
(447, 233270),
(208, 233450),
(448, 233720),
(209, 234140),
(449, 234630),
(450, 234650),
(451, 235540),
(452, 236090),
(210, 236110),
(24, 236390),
(453, 236430),
(454, 236850),
(211, 236870),
(455, 237310),
(456, 237930),
(457, 238010),
(458, 238090),
(212, 238320),
(459, 238370),
(213, 238460),
(25, 238960),
(214, 239030),
(64, 239140),
(460, 239160),
(461, 239200),
(462, 239350),
(463, 239820),
(464, 240320),
(465, 240720),
(466, 241600),
(467, 242050),
(468, 242700),
(215, 242720),
(65, 242760),
(469, 242860),
(470, 242920),
(471, 244210),
(472, 244450),
(216, 244850),
(473, 244930),
(474, 245170),
(475, 245620),
(476, 246620),
(477, 247080),
(478, 247120),
(217, 248570),
(479, 248820),
(480, 250320),
(481, 250400),
(218, 250900),
(219, 251570),
(220, 252130),
(482, 252150),
(26, 252490),
(27, 252950),
(66, 253710),
(483, 253980),
(484, 254700),
(67, 255710),
(485, 257510),
(486, 259080),
(487, 261030),
(488, 261110),
(313, 261550),
(221, 261640),
(222, 262060),
(489, 262280),
(223, 262410),
(490, 263500),
(224, 264710),
(491, 265590),
(225, 265630),
(226, 265930),
(492, 266840),
(493, 268050),
(227, 268420),
(228, 268500),
(494, 268910),
(495, 269210),
(496, 270550),
(497, 270880),
(6, 271590),
(28, 272060),
(68, 273110),
(69, 273350),
(498, 274170),
(229, 274190),
(499, 274940),
(29, 275390),
(500, 275850),
(70, 278360),
(230, 280790),
(231, 281990),
(232, 282070),
(233, 282440),
(501, 284160),
(71, 285800),
(502, 285900),
(234, 286160),
(235, 286570),
(236, 286690),
(237, 286940),
(503, 287290),
(238, 287390),
(504, 287450),
(505, 287700),
(239, 289070),
(506, 289130),
(507, 289650),
(30, 291480),
(7, 291550),
(508, 291650),
(72, 292030),
(509, 292910),
(510, 293180),
(511, 293540),
(240, 294100),
(241, 295110),
(512, 298110),
(513, 298240),
(514, 298630),
(242, 299360),
(31, 301520),
(243, 302830),
(515, 303390),
(516, 304030),
(32, 304050),
(244, 304390),
(517, 304430),
(8, 304930),
(518, 305620),
(245, 306130),
(519, 307690),
(520, 307780),
(521, 308600),
(522, 310560),
(523, 310950),
(524, 311210),
(246, 311690),
(525, 312530),
(526, 312660),
(247, 312990),
(527, 314160),
(248, 316010),
(249, 317360),
(73, 319630),
(528, 319830),
(529, 322170),
(250, 322330),
(530, 322500),
(251, 323190),
(252, 323580),
(531, 323850),
(532, 325610),
(533, 326460),
(534, 327690),
(535, 330830),
(536, 331470),
(537, 332070),
(538, 333420),
(74, 333930),
(539, 334230),
(253, 335240),
(254, 335300),
(540, 335330),
(541, 337000),
(542, 337950),
(543, 339280),
(255, 339610),
(544, 342200),
(256, 343710),
(545, 346010),
(75, 346110),
(546, 346330),
(76, 346900),
(547, 349040),
(548, 349700),
(257, 355180),
(258, 355840),
(259, 356190),
(549, 359320),
(9, 359550),
(550, 360430),
(551, 361420),
(552, 362890),
(77, 363970),
(553, 364360),
(554, 364470),
(555, 365450),
(78, 365590),
(556, 367500),
(260, 367520),
(557, 368230),
(79, 370910),
(261, 372000),
(558, 373420),
(262, 374320),
(559, 376570),
(80, 377160),
(560, 379430),
(297, 379720),
(263, 380600),
(561, 380840),
(81, 381210),
(562, 382490),
(563, 383080),
(564, 383870),
(264, 386180),
(82, 386360),
(565, 386940),
(566, 387290),
(567, 387990),
(568, 388410),
(569, 389430),
(265, 389570),
(570, 389730),
(266, 391220),
(267, 391460),
(268, 391540),
(571, 391720),
(572, 392110),
(573, 393380),
(269, 394360),
(574, 394510),
(270, 395170),
(662, 397540),
(271, 397900),
(575, 403640),
(83, 407530),
(576, 409710),
(84, 413150),
(577, 417860),
(85, 417910),
(272, 424280),
(273, 424370),
(578, 427270),
(274, 427520),
(579, 427730),
(580, 429470),
(275, 431240),
(581, 433340),
(33, 433850),
(582, 434650),
(276, 435150),
(277, 436520),
(583, 438040),
(86, 438100),
(584, 438740),
(87, 439700),
(585, 440900),
(586, 442080),
(34, 444090),
(88, 444200),
(587, 444640),
(588, 447040),
(589, 447820),
(590, 448510),
(591, 450390),
(592, 453480),
(593, 457140),
(594, 457330),
(595, 460920),
(596, 460930),
(597, 462780),
(278, 466240),
(598, 466560),
(599, 466910),
(600, 470220),
(601, 471710),
(602, 474960),
(279, 475150),
(89, 477160),
(603, 480490),
(658, 482730),
(604, 485510),
(280, 489520),
(281, 489830),
(282, 491950),
(605, 493340),
(283, 504370),
(284, 506540),
(301, 508440),
(606, 510840),
(607, 511470),
(645, 513710),
(608, 518790),
(609, 524220),
(610, 529920),
(611, 530620),
(285, 530700),
(612, 536930),
(613, 537180),
(286, 548430),
(35, 550650),
(614, 550900),
(90, 552500),
(615, 552520),
(91, 552990),
(92, 555570),
(616, 558100),
(287, 563560),
(617, 577800),
(3, 578080),
(618, 578310),
(646, 581320),
(97, 582010),
(619, 582160),
(620, 582500),
(93, 582660),
(647, 583950),
(94, 588430),
(621, 588650),
(288, 594570),
(289, 594650),
(302, 601150),
(290, 601510),
(622, 611500),
(623, 612880),
(659, 617290),
(624, 620980),
(303, 629760),
(625, 630100),
(304, 632360),
(626, 637090),
(627, 637650),
(628, 638070),
(629, 641990),
(630, 644560),
(631, 644930),
(291, 646570),
(648, 646910),
(632, 648350),
(633, 648800),
(634, 657200),
(635, 666220),
(292, 674940),
(636, 680780),
(637, 696370),
(293, 698780),
(95, 700330),
(649, 706990),
(638, 723780),
(639, 730310),
(650, 736190),
(640, 738060),
(296, 744900),
(98, 755790),
(641, 761890),
(642, 766570),
(305, 779340),
(663, 782330),
(643, 809960),
(298, 812140),
(660, 813780),
(294, 813820),
(306, 814380),
(644, 823130),
(651, 834910),
(299, 838350),
(307, 844870),
(300, 845070),
(99, 863550),
(652, 871720),
(653, 880940),
(308, 883710),
(295, 884660),
(654, 893520),
(657, 905370),
(309, 976730),
(100, 1046930),
(36, 1085660),
(310, 1089350),
(311, 1100600),
(661, 1172380),
(312, 1174180);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_04_01_233547_games', 2),
(7, '2023_04_01_235023_create_table_games', 3),
(8, '2023_04_02_000234_create_table_daily_challenge', 4),
(9, '2023_04_02_123047_games_add_day_index', 5);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `daily_challenge`
--
ALTER TABLE `daily_challenge`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `daily_challenge_day_unique` (`Day`),
  ADD KEY `daily_challenge_appid_foreign` (`AppId`),
  ADD KEY `daily_challenge_day_index` (`Day`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `games_appid_unique` (`AppId`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `daily_challenge`
--
ALTER TABLE `daily_challenge`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=751;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `daily_challenge`
--
ALTER TABLE `daily_challenge`
  ADD CONSTRAINT `daily_challenge_appid_foreign` FOREIGN KEY (`AppId`) REFERENCES `games` (`AppId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;