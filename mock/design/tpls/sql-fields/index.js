// 字段枚举
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
//   joinChar: undefined, // 默认','
// };

import baseTpls from "./base";
import numberTpls from "./number";
import stringTpls from "./string";
import arrayTpls from "./array";
import objectTpls from "./object";
import dateTpls from "./date";
import userTpls from "./user";
import groupTpls from "./group";
module.exports = {
  ...baseTpls,
  ...numberTpls,
  ...stringTpls,
  ...arrayTpls,
  ...objectTpls,
  ...dateTpls,
  ...userTpls,
  ...groupTpls,
};
