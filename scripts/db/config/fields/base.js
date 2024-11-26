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
  /*** 通用类型 ***/
  //
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
  // 创建人
  creatorId: {
    type: "int",
    notNull: true,
    remark: "创建人",
    isUnsigned: true,
  },
  // 最后修改人
  updatorId: {
    type: "int",
    remark: "最后修改人",
    isUnsigned: true,
  },
};
