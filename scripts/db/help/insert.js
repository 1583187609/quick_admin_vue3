import { N, getIsSqlVar, needParam, toSnakeCase } from "../utils/index.js";

//获取字典码值
export function getCodes(enums) {
  if (!enums) return;
  return Object.keys(enums).map(it => Number(it));
}

/**
 * 校验code是否合法
 * @param {number} val code值
 * @param {string} key 键名
 * @param {object} map 映射对象
 */
function valideCodes(val = 0, key = "", map = {}) {
  const codes = map[key];
  if (codes && !codes.includes(Number(val))) {
    throw new Error(`${key}应为：${codes.join(", ")}，实为：${val}`);
  }
}

/**
 * 插入表格数据
 * @param {string} name 表名称
 */
// 使用示例：addTable(
//   'user',
//   [
//     ["userName", "gender"],
//     ["唐六", 1],
//     ["程八", 2],
//   ],
//   standardFields
// )
export default function (name = needParam(), rows = [], standardFields = []) {
  const [keys = [], ...vals] = rows;
  const defKeys = [];
  const defVals = [];
  const enumCodesMap = {};
  standardFields.forEach(it => {
    const { name, defaultValue, enums } = it;
    if (enums) enumCodesMap[name] = getCodes(enums);
    if (!keys.includes(name) && defaultValue !== undefined) {
      defKeys.push(name);
      defVals.push(defaultValue);
    }
  });
  vals.forEach(it => it.push(...defVals));
  const allKeys = [...keys, ...defKeys];
  const keyStr = allKeys.map(it => toSnakeCase(it)).join(", ");
  const valStr = vals
    .map(arr => {
      return `(${arr
        .map((it, ind) => {
          valideCodes(it, allKeys[ind], enumCodesMap);
          return getIsSqlVar(it) ? it : `'${it}'`;
        })
        .join(", ")})`;
    })
    .join(`,${N}`);
  return `INSERT INTO ${name}${N}(${keyStr})${N}VALUES${N}${valStr};`;
}
