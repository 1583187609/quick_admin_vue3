import { N, getWhereStr, needParam } from "../utils/index.js";

/**
 * 获取要修改字段的字符串
 * @param {object} fieldMap 要修改的字段信息
 * @returns
 */
function getUpdateFieldsStr(fieldMap = {}) {
  return Object.entries(fieldMap)
    .map(arr => arr.join(" = "))
    .join(", ");
}

/**
 * 修改表格数据
 * @param {string} name 表名称
 */
// 使用示例：updateTable('user', { gender: 2 }, { user_name: "李四" })
export default function (name = needParam(), fieldMap = {}, where = needParam()) {
  return `UPDATE ${name}${N}SET ${getUpdateFieldsStr(fieldMap)}${N}WHERE ${getWhereStr(where)};`;
}
