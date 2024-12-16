// 数字相关
export default {
  // 比率（折扣率）
  T_Ratio: {
    type: "float",
    length: 4, // 最小值0：最大值：1.00
    decimal: 2,
    notNull: true,
    remark: "比率",
    defaultValue: "1.00",
    isUnsigned: true,
  },
  // 评分：最小0分，最大100分
  T_Score: {
    type: "tinyint",
    length: 3,
    remark: "分数",
    isUnsigned: true,
  },
  // 星星数量：最小0，最大1
  T_Stars: {
    type: "tinyint",
    length: 1,
    remark: "星星数量",
    isUnsigned: true,
  },
  // 年龄
  T_Age: {
    type: "tinyint",
    length: 3,
    remark: "年龄",
    isUnsigned: true,
  },
  // 价格
  T_Price: {
    type: "float",
    length: 7, // 含小数点及小数位数，最多6位数，最大值：9999.99
    decimal: 2,
    notNull: true,
    remark: "价格",
    defaultValue: "0.00",
    isUnsigned: true,
  },
  // 数量
  T_Amount: {
    type: "smallint",
    length: 4, // 最多4位数，最大值：9999
    notNull: true,
    remark: "数量",
    defaultValue: 0,
    isUnsigned: true,
  },
};
