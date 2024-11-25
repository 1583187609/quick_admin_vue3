// 基础通用字段
// 示例：
// const tpl = {
//   type: "int",
//   remark: "id",
//   length: undefined,
//   decimal: undefined,
//   notNull: undefined,
//   isPrimaryKey: undefined,
//   defaultValue: undefined,
//   isAutoIncrement: undefined,
//   isUnsigned: undefined,
//   isFillZero: undefined,
//   enum: undefined,

import { enableStatus, auditStatus } from "./enums";

// };
export default {
  /*** 通用类型 ***/
  // number: {
  //   type: "tinyint",
  //   length: 3,
  //   // decimal: undefined,
  //   // notNull: true,
  //   // isPrimaryKey: true,
  //   // remark: "",
  //   // defaultValue: undefined,
  //   // isAutoIncrement: true,
  //   isUnsigned: true,
  //   // isFillZero: false,
  //   // enum: undefined,
  // },
  // 通用枚举类型
  enum: {
    type: "tinyint",
    length: 1,
    notNull: true,
    // remark: "", // 枚举
    // defaultValue: undefined,
    isUnsigned: true,
    // enum: {},
  },
  /*** 常用类型 ***/
  // 自增id，主建
  id: {
    type: "int",
    length: undefined,
    decimal: undefined,
    notNull: true,
    isPrimaryKey: true,
    remark: "主键id",
    defaultValue: undefined,
    isAutoIncrement: true,
    isUnsigned: true,
    isFillZero: false,
    enum: undefined,
  },
  // 启用状态（枚举类型）
  enableStatus: {
    type: "tinyint",
    name: "status",
    length: 1,
    notNull: true,
    remark: "启用状态",
    defaultValue: 1,
    isUnsigned: true,
    enum: enableStatus,
  },
  // 审核状态（枚举类型）
  auditStatus: {
    type: "tinyint",
    length: 1,
    notNull: true,
    remark: "审核状态",
    defaultValue: 0,
    isUnsigned: true,
    enum: auditStatus,
  },
};
