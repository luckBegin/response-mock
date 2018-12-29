/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : api_mock

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 29/12/2018 17:32:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `createTime` datetime(0) DEFAULT CURRENT_TIMESTAMP,
  `modifyTime` datetime(0) DEFAULT NULL,
  `createUser` int(10) DEFAULT NULL,
  `enable` tinyint(2) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES (3, '测试项目1', 'asd23', '2018-12-29 14:27:05', NULL, NULL, 1);
INSERT INTO `project` VALUES (4, '测试项目2', '12123', '2018-12-29 14:27:21', NULL, NULL, 1);

-- ----------------------------
-- Table structure for request
-- ----------------------------
DROP TABLE IF EXISTS `request`;
CREATE TABLE `request`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `method` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `statusCode` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `response` longtext CHARACTER SET utf8 COLLATE utf8_bin,
  `createTime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `createUser` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `projectId` int(10) DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of request
-- ----------------------------
INSERT INTO `request` VALUES (1, '/list/?', 'GET', '200', '{\"success\":true,\"code\":200,\"message\":\"\"}', '2018-12-29 17:30:39', NULL, 3, 'asd123');

SET FOREIGN_KEY_CHECKS = 1;
