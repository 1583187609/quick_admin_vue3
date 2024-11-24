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
// };
export default {
  // 自增id，主建
  id: {
    type: "int",
    length: undefined,
    decimal: undefined,
    notNull: true,
    isPrimaryKey: true,
    // remark: "",
    defaultValue: undefined,
    isAutoIncrement: true,
    isUnsigned: true,
    isFillZero: false,
    enum: undefined,
  },
  // 枚举类型
  enum: {
    type: "tinyint",
    length: 1,
    notNull: true,
    // remark: "", // 枚举
    // defaultValue: undefined,
    isUnsigned: true,
    // enum: {},
  },
};
