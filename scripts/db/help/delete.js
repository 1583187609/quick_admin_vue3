import { N, getWhereStr, needParam, typeOf } from "../utils/index.js";

/**
 * 删除表格数据
 * @param {string} name 表名称
 */
// 使用示例：
// deleteTable('user', "id=5");
// deleteTable('user', { id: 6, user_name: "李四", age: ">20" });
export default function (name = needParam(), where = needParam()) {
  return `DELETE FROM ${name} WHERE${N}${getWhereStr(where)};`;
}
