// 数字常用字段
export default {
  /*** 通用类型 ***/
  // 待补充
  /*** 常用类型 ***/
  // 价格
  price: {
    type: "float",
    length: 7, // 含小数点及小数位数，最多6位数，最大值：9999.99
    decimal: 2,
    notNull: true,
    remark: "价格",
    defaultValue: "0.00",
    isUnsigned: true,
  },
  // 数量
  amount: {
    type: "smallint",
    length: 4, // 最多4位数，最大值：9999
    notNull: true,
    remark: "数量",
    defaultValue: 0,
    isUnsigned: true,
  },
};
