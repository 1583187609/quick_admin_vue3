/**
 * 常用枚举库说明
 * @tips 0代表全部 或 布尔值为false
 */

// 审核状态
export const auditStatus = {
  0: "待审核",
  1: "已通过",
  2: "已驳回",
};

// 启用状态
export const enableStatus = { 0: "未启用（已禁用）", 1: "已启用（正常）" };

// 是否状态
export const yesStatus = { 0: "否", 1: "是" };

// 程度枚举
export function getLevelEnums(words = ["差", "好"]) {
  const [badWord, goodWord] = words;
  return {
    1: `很${badWord}`,
    2: `较${badWord}`,
    3: `一般`,
    4: `较${goodWord}`,
    5: `很${goodWord}`,
  };
}

// 其他可能用到的字典
// 搜索结果反馈 1过于重复相似 2内容过时 3结果不够相关 4标题封面信息少 5不够专业深度 6推荐的内容不符合我的喜好

// 枚举类型
export default {
  /*** 通用类型 ***/
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
