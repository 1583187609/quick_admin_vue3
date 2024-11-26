import { needParam, typeOf } from "./base.js";
import { N } from "./consts.js";

// 比较符号取反映射
const negatedMap = {
  ">": "<=",
  "=": "!=",
  "<": ">=",
};

/**
 * 获取数据库查询时的 where字符串
 * @param {string|boolean|array|object} where 为字符串时，可写入原生mysql语句，为数组时，表示或者（OR），为对象时，表示且（AND）
 */
export function getWhereStr(where = true, nChar = N) {
  const t = typeOf(where);
  if (["String", "Boolean"].includes(t)) return where;
  if (t === "Object") {
    const keys = Object.keys(where);
    // modKey带有修饰符的key，修饰符可能为：not
    // 如果key为id，等号后面可以为：字符串或数字
    const list = keys.map(modKey => {
      let val = where[modKey];
      let [key, mod] = modKey.split("|");
      if (mod) mod = mod.toUpperCase();
      const isNot = mod === "NOT";
      const valType = typeOf(val);
      let compareChar = isNot ? "!=" : "=";
      if (valType === "Array") {
        compareChar = isNot ? "NOT IN" : "IN";
        val = `(${val.map(it => `'${it}'`).join(", ")})`;
      } else if (valType === "String") {
        /**
         * @param LIKE % 表示任意0个或多个字符。若匹配中文，有时需使用两个百分号（%%），_ 表示任意单个字符
         * 示例： '%张%'（包含张）、'abc%'（以abc开头）、'_o%'（第二个字符是o）
         * @param REGEXT 正式表达式。例：'^a[0-9]+'（以a开头且后面跟着一个或多个数字的记录）
         */
        if (getIsSqlVar(mod)) {
          compareChar = mod;
          val = `'${val}'`;
        } else {
          const char = val.match(/[>=<]+/)?.[0];
          // 如果存在比较符号
          if (char) {
            compareChar = isNot ? negatedMap[char] : char;
            val = val.replace(char, "");
          } else {
            val = `'${val}'`;
          }
        }
      }
      return `${key} ${compareChar} ${val}`;
    });
    return list.join(`${nChar}AND `);
  }
  if (t === "Array") {
    const list = where.map(item => {
      const itemType = typeOf(item);
      if (itemType !== "Object") throw new Error(`暂未处理此类型：${itemType}`);
      return getWhereStr(item);
    });
    return list.map(it => it).join(`${N}OR `);
  }
  throw new Error(`暂未处理此种类型：${t}`);
}

/**
 * 获取字段字符串
 * @param {string[]} fields 字段
 * @param {string} tableName 表名称
 */
export function getFieldsStr(fields = ["*"], tableName) {
  return fields.join(", ");
}

/**
 * 判断是否是mysql的变量名称
 * @param {any} str 要检测的字符串
 */
export function getIsSqlVar(str) {
  if (typeof str !== "string") return false;
  return ["CURRENT_TIMESTAMP", "LIKE", "REGEXP"].includes(str.toUpperCase());
}
