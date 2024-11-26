// 文本内容（字符串）字段
export default {
  /*** 通用类型 ***/
  // 短文本
  shortText: {
    type: "varchar",
    length: 100,
  },
  // 中等长度文本
  mediumText: {
    type: "varchar",
    length: 1000,
  },
  // 长文本
  longText: {
    type: "varchar",
    length: 10000,
  },
  /*** 常用类型 ***/
  // 地址
  url: {
    type: "varchar",
    length: 255,
    remark: "地址",
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
    notNull: true,
    remark: "电话号码（账号）",
    defaultValue: "18483221111",
  },
  // 密码
  password: {
    type: "varchar",
    length: 16,
    notNull: true,
    remark: "密码：6~16位字母+数字组合",
    defaultValue: "mstx123456",
  },
  // 题目问题
  question: {
    type: "varchar",
    length: 255,
    remark: "题目问题",
  },
  // 文章（笔记）标题
  title: {
    type: "varchar",
    length: 25,
    remark: "文章（笔记）标题",
  },
  // 备注
  remark: {
    type: "varchar",
    length: 50,
    remark: "备注",
  },
  // id集合
  ids: {
    type: "varchar",
    length: 100000,
    remark: "id集合",
    joinChar: ",",
  },
};
