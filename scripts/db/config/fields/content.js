// 文本内容字段
export default {
  /*** 通用类型 ***/
  // 短文本
  shortText: {
    type: "varchar",
    length: 100,
    // remark: "标题", // 短文本
  },
  // 中等长度文本
  mediemText: {
    type: "varchar",
    length: 1000,
    // remark: "", // 中等长度文本
  },
  // 长文本
  longText: {
    type: "varchar",
    length: 10000,
    // remark: "", // 长文本
  },
  /*** 常用类型 ***/
  // 标题
  title: {
    type: "varchar",
    length: 30,
    remark: "标题",
  },
  // 备注
  remark: {
    type: "varchar",
    length: 50,
    remark: "备注",
  },
};
