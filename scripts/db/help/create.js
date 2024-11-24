import { fieldsMap } from "../config/index.js";
import { N, needParam, toSnakeCase, typeOf } from "../utils/index.js";

/**
 * 获取枚举对象文本
 * @param {object} enums
 * @returns
 */
function getEnumsText(enums = {}) {
  return Object.entries(enums)
    .map(arr => arr.join(""))
    .join(" ");
}

/**
 * 获取标准的字段信息
 * @param {object} data
 * @example data 示例：["id", "id:用户id", "id:other_id:其他id", { type: "id", remark: "对象id", notNull: false }]的元素
 * @param {boolean} hasPrimaryKey 是否存在主键
 * @returns
 */
function toFieldObj(data = needParam(), hasPrimaryKey = false) {
  const t = typeOf(data);
  let field = {};
  let tplType = ""; // 模板字段类型
  if (t === "Object") {
    tplType = data.type;
    return { ...fieldsMap[tplType], ...data };
  } else if (t === "String") {
    const list = data.split(/:|：/g);
    if (list.length === 1) {
      tplType = data;
      field = { ...fieldsMap[tplType], type: data };
    } else if (list.length === 2) {
      const [type, remark] = list;
      tplType = type;
      field = { ...fieldsMap[tplType], type, remark };
    } else if (list.length === 3) {
      const [type, name, remark] = list;
      tplType = type;
      field = { ...fieldsMap[tplType], type, name, remark };
    } else {
      throw new Error(`暂不支持解析超过3段的文本：${data}`);
    }
  } else {
    throw new Error(`暂未处理此类型：${t}`);
  }
  if (tplType && !fieldsMap[tplType]) throw new Error(`未检测到模板字段：${type}`);
  // 兜底处理
  const { isPrimaryKey } = field;
  if (isPrimaryKey) {
    field.notNull = true;
    if (hasPrimaryKey) {
      Object.assign(field, { isPrimaryKey: false, isAutoIncrement: false });
    }
  }
  return field;
}
/**
 * 获取创建表的字段数组（标准的）
 * @param {object[]} fields 字段数组
 * @example fields 示例：["id", "id:用户id", "id:other_id:其他id", { type: "id", remark: "对象id", notNull: false }]
 * @returns
 */
export function getTableStandardFields(fields = needParam()) {
  let hasPrimaryKey = false;
  return fields.map(item => {
    const { type, name = type, ...rest } = toFieldObj(item, hasPrimaryKey);
    if (rest.isPrimaryKey) hasPrimaryKey = true;
    // toSnakeCase：将名称转换为下划线命名方式
    const field = { name: toSnakeCase(name), ...fieldsMap[type], ...rest };
    const { enums, remark = "" } = field;
    if (enums && !remark.includes("注")) {
      field.remark += ` 注：${getEnumsText(enums)}`;
      // delete field.enums; // 不要删除，留着校验传入的值是否合法
    }
    return field;
  });
}

/**
 * 生成sql语句
 * @param {object[]} fields 要生成的字段
 * @returns
 */
function getSqlStr(fields = []) {
  const strs = fields.map(item => {
    const { name, type, length, decimal, notNull, isPrimaryKey, remark, defaultValue, isAutoIncrement, isUnsigned, isFillZero } = item;
    let dataType = type.toUpperCase();
    if (length !== undefined) dataType += `(${length})`;
    const unsignedStr = isUnsigned ? "UNSIGNED" : "";
    let decimalStr = "";
    if (decimal !== undefined) {
      if (length === undefined) throw new Error(`存在小数点位数时，必须传入长度：${name}`);
      decimalStr = `DECIMAL(${length}, ${decimal})`;
    }
    const notNullStr = notNull ? "NOT NULL" : "";
    const primaryKey = isPrimaryKey ? "PRIMARY KEY" : "";
    const remarkStr = remark ? `COMMENT '${remark}'` : "";
    let defValStr = "";
    if (defaultValue !== undefined) {
      const isCurrDate = defaultValue === "CURRENT_TIMESTAMP";
      if (isCurrDate) defValStr = `DEFAULT ${defaultValue}`;
      else defValStr = `DEFAULT '${defaultValue}'`;
    }
    const autoIncrementStr = isAutoIncrement ? "AUTO_INCREMENT" : "";
    const fillZeroStr = isFillZero ? "ZEROFILL" : "";
    const str = `${name} ${dataType} ${unsignedStr} ${decimalStr} ${notNullStr} ${primaryKey} ${remarkStr} ${defValStr} ${autoIncrementStr} ${fillZeroStr}`;
    return str.replace(/ {2,}/g, " ").trim();
  });
  return strs.join(`,${N}`);
}

/**
 * 创建表
 * @param {string} name 表名称
 * @param {object[]} standardFields 标准的表字段
 */
export default function (name = needParam(), standardFields = []) {
  let sql = `CREATE TABLE IF NOT EXISTS ${name} (${N}${getSqlStr(standardFields)}${N});`;
  // sql += `ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='${name}表'`;
  return sql;
}
