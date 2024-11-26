import { enableStatus } from "./enums.js";

// 用户相关字段
export default {
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
  // 性别
  gender: {
    type: "tinyint",
    length: 1,
    remark: "性别",
    defaultValue: 0,
    isUnsigned: true,
    enums: { 0: "未知", 1: "男", 2: "女" },
  },
  // 账号状态（枚举类型）
  accountStatus: {
    type: "tinyint",
    length: 1,
    notNull: true,
    remark: "账号状态",
    defaultValue: 1,
    isUnsigned: true,
    enum: { ...enableStatus, 2: "已注销" },
  },
};
