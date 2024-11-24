import { N, getWhereStr, needParam } from "../utils/index.js";

/**
 * 获取要修改字段的字符串
 * @param {object} info 要修改的信息
 * @returns
 */
function getUpdateStr(info = {}) {
  return Object.entries(info)
    .map(arr => arr.join(" = "))
    .join(", ");
}

/**
 * 修改表格数据
 * @param {string} name 表名称
 */
export default function (name = needParam(), info = {}, where = needParam()) {
  return `UPDATE ${name}${N}SET ${getUpdateStr(info)}${N}WHERE ${getWhereStr(where)};`;
}
