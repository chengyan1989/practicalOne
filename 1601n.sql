-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2018-07-16 09:05:50
-- 服务器版本： 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `1601n`
--

-- --------------------------------------------------------

--
-- 表的结构 `access`
--

CREATE TABLE `access` (
  `id` int(11) NOT NULL,
  `accessname` varchar(20) NOT NULL,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `roler`
--

CREATE TABLE `roler` (
  `id` int(11) NOT NULL,
  `rolename` varchar(30) NOT NULL,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

-- --------------------------------------------------------

--
-- 表的结构 `ruler_access`
--

CREATE TABLE `ruler_access` (
  `id` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `birthday` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `phone` varchar(11) NOT NULL,
  `address` text,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `birthday`, `phone`, `address`, `update_time`) VALUES
(3, 'xiaochen', '123456', '2018-07-16 06:52:17', '13133809344', NULL, '2018-07-16 07:04:48'),
(4, 'xiaochen', '123456', '2018-07-16 06:52:17', '13133809344', NULL, '2018-07-16 07:04:48'),
(5, 'xiaochen', '123456', '2018-07-16 06:52:17', '13133809344', NULL, '2018-07-16 07:04:48'),
(6, 'xiaochen', '123456', '2018-07-16 06:52:17', '13133809344', NULL, '2018-07-16 07:04:48'),
(7, 'xiaochen', '123456', '2018-07-16 06:54:13', '13133809344', NULL, '2018-07-16 07:04:48');

-- --------------------------------------------------------

--
-- 表的结构 `user_ruler`
--

CREATE TABLE `user_ruler` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `rid` int(11) NOT NULL,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `access`
--
ALTER TABLE `access`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roler`
--
ALTER TABLE `roler`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ruler_access`
--
ALTER TABLE `ruler_access`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_ruler`
--
ALTER TABLE `user_ruler`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `access`
--
ALTER TABLE `access`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `roler`
--
ALTER TABLE `roler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `ruler_access`
--
ALTER TABLE `ruler_access`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用表AUTO_INCREMENT `user_ruler`
--
ALTER TABLE `user_ruler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
