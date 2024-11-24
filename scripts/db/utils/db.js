import { needParam, typeOf } from "./base.js";
import { N } from "./consts.js";

/**
 * 获取数据库查询时的 where字符串
 * @param {string,array,object} where 为字符串时，可写入原生mysql语句，为数组时，表示或者（OR），为对象时，表示且（AND）
 */
export function getWhereStr(where = needParam()) {
  const t = typeOf(where);
  // const typeMap = { Object: "AND", Array: "OR" };
  // const type = typeMap[t];
  if (t === "String") return where;
  if (t === "Object") {
    const keys = Object.keys(where);
    // modKey带有修饰符的key，修饰符可能为：not
    // 如果key为id，等号后面可以为：字符串或数字
    const list = keys.map(modKey => {
      let val = where[modKey];
      const [key, mod] = modKey.split("|");
      const isNot = mod === "not";
      const valType = typeOf(val);
      let compareChar = isNot ? "!=" : "=";
      if (valType === "Array") {
        compareChar = isNot ? "NOT IN" : "IN";
        val = `(${val.map(it => `'${it}'`).join(", ")})`;
      }
      if (valType === "String") {
        const char = val.match(/[>=<]+/)?.[0];
        // 比较符号取反映射
        const negatedMap = {
          ">": "<=",
          "=": "!=",
          "<": ">=",
        };
        // 如果存在比较符号
        if (char) {
          compareChar = isNot ? negatedMap[char] : char;
          val = val.replace(char, "");
        } else {
          val = `'${val}'`;
        }
      }
      return `${key} ${compareChar} ${val}`;
    });
    return list.join(`${N}AND `);
  }
  if (t === "Array") {
    const list = where.map(item => getWhereStr(item));
    return list.map(it => it).join(`${N}OR `);
  }
  throw new Error(`暂未处理此种类型：${t}`);
}

// SELECT * FROM employees
// WHERE first_name IN ('John', 'Mary')
// AND department IN ('Sales', 'Technology');

// SELECT * FROM employees
// WHERE (first_name = 'John' OR first_name = 'Mary')
// AND (department = 'Sales' OR department = 'Technology');
