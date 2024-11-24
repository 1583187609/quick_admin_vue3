const sqlStr = `
-- 创建user表
CREATE TABLE IF NOT EXISTS user (
id INT UNSIGNED NOT NULL PRIMARY KEY COMMENT '用户id' AUTO_INCREMENT,
phone CHAR(11) NOT NULL COMMENT '电话号码（账号）' DEFAULT '18483221111',
password VARCHAR(16) NOT NULL COMMENT '密码：6~16位字母+数字组合' DEFAULT 'mstx123456',
user_name VARCHAR(10) COMMENT '用户真实姓名',
nickname TINYINT COMMENT '用户账号昵称',
gender TINYINT(1) UNSIGNED COMMENT '性别 注：0未知 1男 2女' DEFAULT '0',
age TINYINT(3) UNSIGNED COMMENT '年龄',
role TINYINT(1) UNSIGNED NOT NULL COMMENT '角色类型' DEFAULT '4',
register_time TIMESTAMP COMMENT '注册时间'
);

-- 插入user表
INSERT INTO user
(user_name, gender, age, phone, password, role)
VALUES
('李大', '1', '19', '18483221111', 'mstx123456', '4'),
('王二', '1', '54', '18483221111', 'mstx123456', '4'),
('张三', '1', '26', '18483221111', 'mstx123456', '4'),
('李四', '1', '44', '18483221111', 'mstx123456', '4'),
('王五', '1', '34', '18483221111', 'mstx123456', '4'),
('李梅', '1', '24', '18483221111', 'mstx123456', '4');

-- 插入user表
INSERT INTO user
(user_name, gender, phone, password, role)
VALUES
('唐六', '1', '18483221111', 'mstx123456', '4'),
('程八', '2', '18483221111', 'mstx123456', '4');

-- 删除user表
DELETE FROM user WHERE
id=5;

-- 删除user表
DELETE FROM user WHERE
id = 6
AND user_name = '李四'
AND age > 20;

-- 修改user表
UPDATE user
SET gender = 2
WHERE user_name = '李四';

-- 查找user表
SELECT * FROM user WHERE
user_name = '李四'
AND age >= 20;

-- 查找user表
SELECT * FROM user WHERE
user_name NOT IN ('李四', '张三')
AND age != 24
OR user_name = '王五';

-- 查找user表
SELECT * FROM user WHERE
user_name IN ('李四', '张三');

-- 创建classify表
CREATE TABLE IF NOT EXISTS classify (
id INT UNSIGNED NOT NULL PRIMARY KEY COMMENT '所属行业id' AUTO_INCREMENT,
p_id INT UNSIGNED NOT NULL COMMENT '父级id',
name VARCHAR(10) COMMENT '分类名称'
);

-- 创建topic表
CREATE TABLE IF NOT EXISTS topic (
id INT UNSIGNED NOT NULL PRIMARY KEY COMMENT '题目id' AUTO_INCREMENT,
industry_id INT UNSIGNED NOT NULL COMMENT '所属行业id',
question VARCHAR(30) NOT NULL COMMENT '题目问题',
content VARCHAR(10000) NOT NULL COMMENT '题目内容',
creator_id INT UNSIGNED NOT NULL COMMENT '创建者id',
create_time TIMESTAMP COMMENT '创建时间',
audit_status TINYINT(1) UNSIGNED NOT NULL COMMENT '审核状态 注：1待审核 2已通过 3已驳回',
enable_status TINYINT(1) UNSIGNED NOT NULL COMMENT '启用状态 注：0未启用 1已启用'
);

-- 创建log表
CREATE TABLE IF NOT EXISTS log (
id INT UNSIGNED NOT NULL PRIMARY KEY COMMENT '日志id' AUTO_INCREMENT,
business TINYINT(1) UNSIGNED NOT NULL COMMENT '业务类型',
operate_type TINYINT(1) UNSIGNED NOT NULL COMMENT '操作类型',
operate_user_id INT UNSIGNED NOT NULL COMMENT '操作人id',
operate_time TIMESTAMP COMMENT '操作时间'
);

`