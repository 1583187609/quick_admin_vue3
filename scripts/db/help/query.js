import { N, getWhereStr, needParam } from "../utils/index.js";

/**
 * 查询表格数据
 * @param {string} name 表名称
 */
export default function (name = needParam(), where = needParam()) {
  return `SELECT * FROM ${name} WHERE${N}${getWhereStr(where)};`;
}
