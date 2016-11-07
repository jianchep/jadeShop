/*
 Navicat MySQL Data Transfer

 Source Server         : localhost_3006
 Source Server Type    : MySQL
 Source Server Version : 50714
 Source Host           : localhost
 Source Database       : shop

 Target Server Type    : MySQL
 Target Server Version : 50714
 File Encoding         : utf-8

 Date: 11/07/2016 15:55:58 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `address_info`
-- ----------------------------
DROP TABLE IF EXISTS `address_info`;
CREATE TABLE `address_info` (
  `address_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `phonenumber` varchar(255) NOT NULL,
  `receive_name` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`address_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `address_info`
-- ----------------------------
BEGIN;
INSERT INTO `address_info` VALUES ('1', '北京市，通州区', '12345678901', '某某某', '1'), ('2', '北京市，朝阳区', '12345678901', '某某', '1'), ('3', '北京市，昌平区', '09876543211', '某某人', '2'), ('4', '北京市，海淀区', '09876543210', '某人', '3');
COMMIT;

-- ----------------------------
--  Table structure for `chat`
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat` (
  `chat_id` int(11) NOT NULL AUTO_INCREMENT,
  `from` varchar(255) NOT NULL,
  `to` varchar(255) NOT NULL,
  `msg` varchar(255) NOT NULL,
  `read` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`chat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `chat`
-- ----------------------------
BEGIN;
INSERT INTO `chat` VALUES ('1', 'admin2', 'jianchep', '你好', '1'), ('2', 'admin2', 'jianchep', '你好啊', '1'), ('3', 'jianchep', 'admin2', 'hello', '1'), ('4', 'admin2', 'jianchep', 'hello', '1'), ('5', 'admin2', 'admin1', 'haha', '1'), ('6', 'admin2', 'jianchep', 'hello', '1'), ('7', 'admin2', 'jianchep', 'hahaha', '1'), ('8', 'jianchep', 'admin2', 'heihei', '1'), ('9', 'admin2', 'jianchep', '在干嘛呢', '1'), ('10', 'jianchep', 'admin2', '写socket呢。。真好玩', '1'), ('11', 'admin2', 'jianchep', '哈哈哈哈啊', '1'), ('12', 'jianchep', 'admin2', '那你继续写吧都两点了－ －', '1'), ('13', 'admin1', 'jianchep', 'text', '1'), ('14', 'admin1', 'jianchep', '好多好多话', '1'), ('15', 'admin1', 'jianchep', '你好啊', '1'), ('16', 'jianchep', 'admin1', '我这里做一个测试吧', '1'), ('17', 'jianchep', 'admin1', '为了存一些数据来test', '1'), ('18', 'admin1', 'jianchep', '这样子', '1'), ('19', 'admin1', 'jianchep', '测试一下', '1'), ('20', 'jianchep', 'admin1', '哈哈', '1'), ('21', 'admin1', 'jianchep', '不错不错', '1'), ('22', 'jianchep', 'admin1', '嗯，可以', '1'), ('23', 'jianchep', 'admin2', '123123', '1'), ('24', 'jianchep', 'admin2', '123123123', '1'), ('25', 'jianchep', 'admin2', '12312313', '1'), ('26', 'jianchep', 'admin2', '12312312', '1'), ('27', 'jianchep', 'admin2', '123123', '1'), ('28', 'jianchep', 'admin10', '123123123', '1'), ('29', 'jianchep', 'admin2', '你好啊', '1'), ('30', 'jianchep', 'admin2', 'this is a text', '1'), ('31', 'jianchep', 'admin2', 'this is a text', '1'), ('32', 'admin2', 'jianchep', 'hahah', '1'), ('33', 'jianchep', 'admin2', '你好啊', '1'), ('34', 'jianchep', 'admin1', '123123', '1'), ('35', 'jianchep', 'admin1', 'hahah', '1'), ('36', 'jianchep', 'admin1', 'hello', '1'), ('37', 'jianchep', 'admin1', '123', '1'), ('38', 'admin1', 'jianchep', '怎么了', '1'), ('39', 'jianchep', 'admin1', '没事，test', '1'), ('40', 'jianchep', 'admin1', 'this is a test for chattiest', '1'), ('41', 'jianchep', 'admin1', 'enenne', '1'), ('42', 'jianchep', 'admin1', '再试一下', '1'), ('43', 'jianchep', 'admin1', '。。。。', '1'), ('44', 'jianchep', 'admin2', 'hello', '1'), ('45', 'jianchep', 'admin2', '1231231', '1'), ('46', 'jianchep', 'admin2', 'this is a test', '1'), ('47', 'jianchep', 'admin2', '哈哈做个测试', '1'), ('48', 'jianchep', 'admin2', '哈哈，做测试', '1'), ('49', 'jianchep', 'admin2', '哈哈', '1'), ('50', 'jianchep', 'admin2', '123', '1'), ('51', 'admin2', 'jianchep', '。。。', '1'), ('52', 'jianchep', 'admin2', 'helo', '1'), ('53', 'jianchep', 'admin2', '..', '1'), ('54', 'admin2', 'jianchep', 'ggg', '1'), ('55', 'admin2', 'jianchep', '你好啊', '1'), ('56', 'admin2', 'jianchep', '在不在呢？', '1'), ('57', 'admin2', 'jianchep', '你在不在啊？', '1'), ('58', 'jianchep', 'admin2', '在呢', '1'), ('59', 'jianchep', 'admin2', '你好啊', '1'), ('60', 'jianchep', 'admin2', '。。。。。', '1'), ('61', 'jianchep', 'admin2', 'hello你好啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', '1'), ('62', 'admin2', 'jianchep', '好吧', '1'), ('63', 'admin2', 'jianchep', '123', '1'), ('64', 'admin2', 'jianchep', 'hello', '1'), ('65', 'admin2', 'jianchep', '123123', '1'), ('66', 'admin2', 'jianchep', '你好啊', '1'), ('67', 'admin2', 'jianchep', 'hello', '1'), ('68', 'jianchep', 'admin2', 'nihau', '1'), ('69', 'admin2', 'jianchep', 'hello', '1'), ('70', 'jianchep', 'admin2', 'hello', '1'), ('71', 'jianchep', 'admin2', 'heel', '1'), ('72', 'jianchep', 'admin2', 'nihau', '1'), ('73', 'admin2', 'jianchep', 'haha', '1'), ('74', 'jianchep', 'admin2', '123', '1'), ('75', 'admin2', 'jianchep', 'haha', '1'), ('76', 'jianchep', 'admin2', '12', '1'), ('77', 'jianchep', 'admin2', 'nihau', '1'), ('78', 'jianchep', 'admin2', 'haha', '1'), ('79', 'admin2', 'jianchep', 'zheli', '1'), ('80', 'jianchep', 'admin2', 'haha', '1'), ('81', 'jianchep', 'admin2', '123', '1'), ('82', 'admin2', 'jianchep', 'hello', '1'), ('83', 'admin2', 'jianchep', 'this is a test', '1'), ('84', 'admin2', 'jianchep', 'for read?', '1'), ('85', 'jianchep', 'admin2', 'yes', '1'), ('86', 'admin2', 'jianchep', '你好啊', '1');
COMMIT;

-- ----------------------------
--  Table structure for `chatList`
-- ----------------------------
DROP TABLE IF EXISTS `chatList`;
CREATE TABLE `chatList` (
  `chatList_id` int(11) NOT NULL AUTO_INCREMENT,
  `chatList_username` varchar(255) NOT NULL,
  `chatList_chatname` varchar(255) NOT NULL,
  `chatList_time` varchar(255) NOT NULL DEFAULT '',
  `chatList_content` varchar(255) NOT NULL,
  `chatList_chat` int(11) NOT NULL,
  PRIMARY KEY (`chatList_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `chatList`
-- ----------------------------
BEGIN;
INSERT INTO `chatList` VALUES ('1', 'jianchep', 'admin2', '1476848124665', '你好啊', '0'), ('2', 'jianchep', 'admin1', '1475848633457', '怎么了', '0'), ('3', 'admin2', 'jianchep', '1476681270916', 'yes', '0'), ('4', 'admin3', 'jianchep', '1475907236786', 'hello', '1'), ('5', 'admin1', 'jianchep', '1475848874934', '。。。。', '0');
COMMIT;

-- ----------------------------
--  Table structure for `collect`
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect` (
  `collect_id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_info_id` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `state` int(11) NOT NULL,
  PRIMARY KEY (`collect_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `collect`
-- ----------------------------
BEGIN;
INSERT INTO `collect` VALUES ('1', '1', 'jianchep', '1'), ('2', '3', 'jianchep', '1'), ('3', '4', 'jianchep', '0'), ('4', '7', 'jianchep', '0'), ('5', '6', 'jianchep', '0'), ('6', '7', 'admin', '1'), ('7', '8', 'jianchep', '0'), ('8', '2', 'jianchep', '0'), ('9', '7', 'admin2', '0');
COMMIT;

-- ----------------------------
--  Table structure for `feet`
-- ----------------------------
DROP TABLE IF EXISTS `feet`;
CREATE TABLE `feet` (
  `feet_id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_info_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  PRIMARY KEY (`feet_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `feet`
-- ----------------------------
BEGIN;
INSERT INTO `feet` VALUES ('1', '1', 'jianchep'), ('2', '3', 'jianchep'), ('3', '2', 'jianchep'), ('4', '1', 'jianchep'), ('5', '1', 'jianchep'), ('6', '1', 'jianchep'), ('7', '2', 'jianchep'), ('8', '7', 'jianchep'), ('9', '9', 'jianchep');
COMMIT;

-- ----------------------------
--  Table structure for `order_info`
-- ----------------------------
DROP TABLE IF EXISTS `order_info`;
CREATE TABLE `order_info` (
  `order_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_info_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `sell_id` int(11) NOT NULL,
  `isbuy` int(11) NOT NULL,
  `is_sell` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `price_all` int(11) NOT NULL,
  `delete` int(11) NOT NULL,
  `is_comment` int(11) NOT NULL,
  PRIMARY KEY (`order_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `order_info`
-- ----------------------------
BEGIN;
INSERT INTO `order_info` VALUES ('1', '1', 'jianchep', '2', '0', '0', '1', '210', '0', '0'), ('2', '1', 'jianchep', '2', '0', '1', '2', '420', '0', '0'), ('3', '1', 'jianchep', '2', '0', '0', '1', '210', '0', '0'), ('4', '1', 'jianchep', '2', '1', '0', '1', '210', '1', '0'), ('5', '1', 'jianchep', '2', '1', '1', '1', '210', '1', '1'), ('6', '1', 'jianchep', '2', '1', '0', '1', '210', '0', '0'), ('7', '1', 'jianchep', '2', '1', '0', '4', '210', '0', '0'), ('8', '2', 'jianchep', '1', '1', '0', '1', '201', '0', '0'), ('9', '2', 'jianchep', '1', '2', '0', '1', '201', '0', '0');
COMMIT;

-- ----------------------------
--  Table structure for `shop_info`
-- ----------------------------
DROP TABLE IF EXISTS `shop_info`;
CREATE TABLE `shop_info` (
  `shop_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `photo` varchar(255) NOT NULL,
  `introduce` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `goods_number` varchar(255) NOT NULL,
  `comment_number` varchar(255) NOT NULL,
  `skim_number` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`shop_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `shop_info`
-- ----------------------------
BEGIN;
INSERT INTO `shop_info` VALUES ('1', '/images/banner1.jpeg', '1教师节礼物玫瑰山东鲜花同城速递聊城滨州荷', '1鲜花', '210', '999999', '0', '15', '1', '1'), ('2', '/images/banner1.jpeg', '2教师节礼物玫瑰山东鲜花同城速递聊城滨州荷2教师节礼物玫瑰山东鲜花同城速递聊城滨州荷2教师节礼物玫瑰山东鲜花同城速递聊城滨州荷2教师节礼物玫瑰山东鲜花同城速递聊城滨州荷2教师节礼物玫瑰山东鲜花同城速递聊城滨州荷2教师节礼物玫瑰山东鲜花同城速递聊城滨州荷2教师节礼物玫瑰山东鲜花同城速递聊城滨州荷2教师节礼物玫瑰山东鲜花同城速递聊城滨州荷2教师节礼物玫瑰山东鲜花同城速递聊城滨州荷2教师节礼物玫瑰山东鲜花同城速递聊城滨州荷', '2鲜花', '201', '999999', '0', '1', '1', '1'), ('3', '/images/banner.jpeg', '3教师节礼物玫瑰山东鲜花同城速递聊城滨州荷', '3鲜花', '1001', '9999991', '0', '1', '1', '1'), ('4', '/images/banner1.jpeg', '4教师节礼物玫瑰山东鲜花同城速递聊城滨州荷', '4鲜花', '201', '9999991', '0', '1', '1', '1'), ('5', '/images/banner.jpeg', '5教师节礼物玫瑰山东鲜花同城速递聊城滨州荷', '5鲜花', '2011', '9999991', '0', '1', '1', '1'), ('6', '/images/banner.jpeg', '1Clothes', '1', '1', '1', '1', '1', '1', '1'), ('7', '/images/banner.jpeg', '1Books', '1', '1', '1', '1', '7', '1', '1'), ('8', '/images/banner.jpeg', '1clothes', '1', '1', '1', '1', '1', '1', '1'), ('9', '/images/banner.jpeg', '1', '1', '1', '1', '1', '2', '1', '1');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `realname` varchar(255) NOT NULL,
  `password_key_question` varchar(255) NOT NULL,
  `password_key_answer` varchar(255) NOT NULL,
  `address_info_id` varchar(255) DEFAULT NULL,
  `limited` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', 'jianchep', '123456', 'admin', 'hello', 'hello', '1', '0'), ('2', 'admin', '123456', 'admin', 'hello', 'hello', '3', '1'), ('3', 'admin1', '123456', 'admin1', 'hello', 'hello', '4', '0'), ('4', 'admin2', '123456', 'admin2', 'hello', 'hello', null, '0');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
