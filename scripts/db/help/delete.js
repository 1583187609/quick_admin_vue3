import { N, getWhereStr, needParam, typeOf } from "../utils/index.js";

/**
 * 删除表格数据
 * @param {string} name 表名称
 */
export default function (name = needParam(), where = needParam()) {
  return `DELETE FROM ${name} WHERE${N}${getWhereStr(where)};`;
}
