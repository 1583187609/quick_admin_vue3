import userTpls from "./user";
import baseTpls from "./base";

// 示例
// const tplDemo = {
//   T_Demo: {
//     type: "id",
//     prop: "id", // 省略不写，则跟模板名称的下划线命名保持一致
//     remark: "自增id",
//     notNull: false,
//     isAutoIncrement: true,
//     defaultValue: 1,
//     attrs: {
//       min: 1,
//     },
//   },
// };
export default {
  ...userTpls,
  ...baseTpls,
};
