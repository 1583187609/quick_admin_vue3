// 文本内容（字符串）字段
export default {
  /*** 通用类型 ***/
  // 短文本
  T_ShortText: {
    type: "varchar",
    length: 100,
  },
  // 中等长度文本
  T_MediumText: {
    type: "varchar",
    length: 1000,
  },
  // 长文本
  T_LongText: {
    type: "varchar",
    length: 10000,
  },
  // label文字
  T_Label: {
    type: "varchar",
    length: 16,
    // remark: "label文字",
  },
  // 变量名
  T_VarName: {
    type: "varchar",
    length: 16,
    // remark: "变量名",
  },
  // json字符串
  T_Json: {
    type: "mediumtext",
    // length: 1000,
    // remark: "json字符串",
  },
  // 备注
  T_Remark: {
    type: "varchar",
    length: 50,
    remark: "备注",
  },
  /*** 常用类型 ***/
  // 资源地址，例：图片、文件等资源地址
  T_Url: {
    type: "varchar",
    length: 255,
    remark: "地址",
  },
  // 题目问题
  T_Question: {
    type: "varchar",
    length: 255,
    remark: "题目问题",
  },
  // 文章（笔记）标题
  T_Title: {
    type: "varchar",
    length: 25,
    remark: "文章（笔记）标题",
  },
};
