const { D_EnableStatus } = require("../../dicts");
export default {
  // 性别
  gender: {
    type: "tinyint",
    length: 1,
    remark: "性别",
    defaultValue: 0,
    isUnsigned: true,
    enums: { 0: "未知", 1: "男", 2: "女" },
  },
  // 角色类型
  role: {
    type: "tinyint",
    remark: "角色类型",
    length: 1,
    notNull: true,
    defaultValue: 4,
    isUnsigned: true,
    enum: {
      0: "超级管理员",
      1: "普通管理员",
      2: "超级VIP用户",
      3: "普通VIP用户",
      4: "普通用户",
    },
  },
  // 账号状态（枚举类型）
  accountStatus: {
    name: "status",
    type: "tinyint",
    length: 1,
    notNull: true,
    remark: "账号状态",
    defaultValue: 1,
    isUnsigned: true,
    enum: { ...D_EnableStatus, 2: "已注销", 3: "已封禁" },
  },
  // 用户真实姓名
  userName: {
    type: "varchar",
    length: 10,
    remark: "用户真实姓名",
  },
  // 用户昵称
  nickname: {
    type: "varchar",
    length: 16,
    remark: "用户昵称",
  },
  // 身份证
  identity: {
    type: "char",
    length: 18,
    remark: "身份证",
  },
  // 电话号码
  phone: {
    type: "char",
    length: 11,
    // notNull: true,
    remark: "电话号码（账号）",
    // defaultValue: "18483221010",
  },
  // 密码
  password: {
    type: "varchar",
    length: 16,
    notNull: true,
    remark: "密码：6~16位字母+数字组合",
    defaultValue: "password123456",
  },
};
