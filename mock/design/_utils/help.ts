// const {
//   needParam,
//   snakeCase,
//   getEnumText,
//   typeOf,
//   camelCase,
//   upperFirst,
//   sqlFieldNameWay,
//   consoleLog,
//   printDevWarning,
// } = require("../../utils");

import { needParam } from "#/mock/utils";
import { CommonObj } from "@/core/_types";

// const fieldsMap = require("../../template/sql-fields");
// const fieldGroupMap = require("../../template/sql-fields/group");
// const { designEasyNoteMap } = require("../../../design/easy-note");
// const formItemTpls = require("../../template/form-items");
// const tableColTpls = require("../../template/table-cols");
// const { standTables } = require("../../../../../app/tables-data");

/**
 * 获取字典名称（根据模板名称）
 * @param {string} tpl 模板名称
 * @returns {string} 字典名称
 */
function getDictNameByTplName(tpl) {
  return upperFirst(tpl);
}

/**
 * 推断是否是区间
 */
function getInferIsRange(sqlFieldInfo) {
  const { tpl, name, type, remark, enums, notNull, length, isUnsigned } = sqlFieldInfo;
  return remark.includes("范围") || remark.includes("区间"); // 推断是否是区间
}

/**
 * 推断是否是图片
 */
function getInferIsImg(sqlFieldInfo) {
  const { tpl, name, type, remark, enums, notNull, length, isUnsigned } = sqlFieldInfo;
  return remark.includes("图片");
}

/**
 * 获取要查找字符串的最小下标
 * @param {string} str 要处理的字符串
 * @param {string} chars 要查找的字符符号
 * @returns {number} 返回找到的最小index
 */
function getMinIndex(str = "", chars = ":：(（") {
  const inds = chars
    .split("")
    .map(it => str.indexOf(it))
    .filter(i => i !== -1);
  if (inds.length) return Math.min(...inds);
  return -1;
}

/**
 * 获取label标签文字
 * @param {string} remark 备注信息
 * @returns {string}
 */
function getLabel(remark = "") {
  return remark.slice(0, getMinIndex(remark));
}

/**
 * 将简写的语法糖转换为标准的模板名称
 * @param {string} tpl 模板名称
 * @returns
 */
function toTplName(tpl) {
  if (!tpl || tpl.startsWith("T_")) return tpl;
  return `T_${tpl.charAt(0).toUpperCase()}${tpl.slice(1)}`;
}
/**
 * 表字段名转换成统一的命名方式
 * @param {string} name  要转换的变量名称
 * @param {nameWay|NameWay|name_way|NAME_WAY} way 变量命名方式
 * @returns
 */
export function letFieldNameToSameWay(name = "", way = sqlFieldNameWay) {
  if (!name) return name;
  const map = {
    nameWay: camelCase,
    NameWay: () => upperFirst(camelCase(name)),
    name_way: snakeCase,
    NAME_WAY: () => snakeCase(name).toUpperCase(),
  };
  const toConvert = map[way];
  if (!toConvert) throw new Error(`暂不支持此类型转换：${way}`);
  return toConvert(name);
}
/**
 * 转成标准的sql字段(对象)
 * @param {object} data
 * @param {boolean} isStandard 是否是标准的字段（具备完整属性）
 * @param {boolean} hasPrimaryKey 是否存在主键
 * @example data 示例：["id", "id:用户id", "id:other_id:其他id", { tpl: "id", remark: "对象id", notNull: false }]的元素
 * @returns {object|object[]} 可能返回数组或对象，若返回数组时，则是多个字段
 */
export function toStandardSqlField(field = needParam(), isStandard = false, hasPrimaryKey = false) {
  let fieldInfo = {};
  if (isStandard) {
    fieldInfo = field;
  } else {
    const t = typeOf(field);
    const splitReg = /:/g;
    if (t === "String") {
      field = toTplName(field);
      const allTrueKeys = ["notNull"]; // 所有允许简写的布尔值键名
      const curTrueKeys = []; // 当前写好的布尔为true的键名
      const list = field.split(splitReg).filter(it => {
        const isIn = allTrueKeys.includes(it);
        if (isIn) curTrueKeys.push(it);
        return !isIn;
      });
      if (list.length === 1) {
        const tpl = list[0];
        const tplInfo = fieldsMap[tpl];
        const tIT = typeOf(tplInfo);
        if (tIT === "Object") {
          fieldInfo = { ...tplInfo, tpl };
        } else if (tIT === "Array") {
          return tplInfo.map(subField => {
            if (typeOf(subField) === "String") {
              const groupKeys = Object.keys(fieldGroupMap);
              if (groupKeys.includes(subField)) throw new Error(`暂未处理第三级字段模板为组类型的情况：${tpl}.${subField}`);
            }
            return toStandardSqlField(subField, false, hasPrimaryKey);
          });
        } else if (tIT === "Undefined") {
          printDevWarning(`暂未配置表字段模板：${tpl}`);
        } else {
          throw new Error(`暂不支持解析此类型模板：${tIT}`);
        }
      } else if (list.length === 2) {
        const [tpl, remark] = list;
        fieldInfo = { ...fieldsMap[tpl], tpl, remark };
      } else if (list.length === 3) {
        const [tpl, name, remark] = list;
        fieldInfo = { ...fieldsMap[tpl], tpl, name, remark };
      } else {
        throw new Error(`暂不支持解析超过3段的文本：${field}`);
      }
      curTrueKeys?.forEach(key => {
        fieldInfo[key] = true;
      });
    } else if (t === "Object") {
      let { tpl } = field;
      tpl = toTplName(tpl);
      fieldInfo = tpl ? { ...fieldsMap[tpl], ...field } : field;
    } else {
      throw new Error(`暂未处理此类型：${t}`);
    }
  }
  const { tpl, name, isPrimaryKey, enums } = fieldInfo;
  if (!isStandard) {
    /*** 抛出错误信息，规范配置信息 ***/
    // 如果使用了模板，且未检测到该模板
    if (tpl && !fieldsMap[tpl]) throw new Error(`未检测到sql字段模板类型：${tpl}`);
    // 如果是枚举类型，却未发现枚举数据
    if (tpl === "enum" && !enums) throw new Error(`缺少枚举数据：${name}`);
  }
  /*** 兜底处理，防止忘记或错误设置属性 ***/
  if (isPrimaryKey) {
    fieldInfo.notNull = true;
    // 如果已经有主键了，则不再需要其他字段包含主键和自增属性了
    if (hasPrimaryKey) {
      Object.assign(fieldInfo, { isPrimaryKey: false, isAutoIncrement: false, defaultValue: 0 });
    }
  }
  return fieldInfo;
}
// 获取（数据库）表字段类型
export function getFieldType(fieldType = "int") {
  const t = fieldType.toLowerCase();
  const numTypes = ["tinyint", "smallint", "mediumint", "int", "integer", "bigint", "float", "double"];
  if (numTypes.includes(t)) return "number";
  const dateTypes = ["date", "datetime", "time", "year", "timestamp"];
  if (dateTypes.includes(t)) return "date";
  const charTypes = ["char", "varchar"];
  if (charTypes.includes(t)) return "string";
  const textTypes = ["tinytext", "text", "mediumtext", "longtext"];
  if (textTypes.includes(t)) return "string";
  const blobTypes = ["tinyblob", "blob", "mediumblob", "longblob"];
  if (blobTypes.includes(t)) return "string";
}
/**
 * 转成标准的查询字段（对象） 【待完善】
 * @param {object} sqlFieldInfo 标准的sql字段数据
 * @param {string|object} 查询表单的字段信息
 * @returns {object|undefined} 转成标准的查询字段信息
 */
export function toStandardQueryField(sqlFieldInfo: CommonObj = needParam(), field, isQueryForm = true) {
  if (!field) return;
  let itemTpl = ""; // 表单项的模板名称
  const { tpl, name = tpl, type, remark, enums, length, isUnsigned } = sqlFieldInfo;
  let { notNull } = sqlFieldInfo;
  if (!isQueryForm) {
    const list = field.split(":");
    list.forEach(it => {
      if (!notNull && ["required", "*"].includes(it)) notNull = true;
      // 后续再完善其他逻辑 【待完善】
    });
  }
  // 获取表单项的类型（查询表单或者增删改查表单）
  function getFormItemTypeByFieldType(dataType = "string") {
    if (enums) return "select";
    const t = dataType;
    const n = name.toLowerCase();
    if (t === "number") {
      const isId = tpl === "id" || n.includes("id");
      itemTpl = "id";
      if (isId) return "input";
      return isQueryForm ? "BaseNumberRange" : "input-number";
    }
    if (t === "string") {
      if (length <= 30) return "input";
      if (length > 30 && length < 200) return isQueryForm ? "input" : "textarea";
      return "BaseEditor";
    }
    if (t === "date") {
      return "date-picker";
    }
  }
  // 获取行数：type可选值：textarea、BaseEditor
  function getRowsNum(type = "input", words = 100) {
    const rowsMap = { textarea: 2, BaseEditor: 10 };
    const rows = rowsMap[type];
    if (rows === undefined) throw new Error(`暂不支持解析此类型：${type}`);
    const calRows = Math.floor(length / words);
    if (calRows > rows) return calRows;
    return rows;
  }
  // 获取表单项的空间属性
  function getFormItemAttrs(itemType = "input") {
    const t = itemType;
    if (t === "input" || t === "textarea") {
      const attrs = { maxlength: length };
      if (t !== "textarea") return attrs;
      return Object.assign(attrs, { type: "textarea", rows: getRowsNum("textarea") });
    }
    if (t === "select") {
      const optsName = getDictNameByTplName(tpl);
      return { options: optsName };
    }
    if (t === "input-number") {
      const min = isUnsigned ? 0 : undefined;
      const max = length ? Math.pow(10, length) - 1 : undefined;
      return { min, max };
    }
    if (t === "BaseEditor") {
      return { maxlength: length, rows: getRowsNum(BaseEditor) };
    }
    if (t === "date-picker") {
      const isRange = ["createTime", "updateTime"].includes(tpl) || getInferIsRange(sqlFieldInfo);
      return { type: isRange ? "datetimerange" : "datetime" };
    }
  }
  let itemInfo: CommonObj = {};
  if (itemTpl) {
    if (formItemTpls[itemTpl]) itemInfo = formItemTpls[itemTpl];
    else printDevWarning(`暂未配置表单项模板：${itemTpl}`);
  }
  const formItemType = getFormItemTypeByFieldType(getFieldType(type));
  itemInfo = {
    prop: letFieldNameToSameWay(name),
    label: getLabel(remark),
    type: formItemType,
    attrs: getFormItemAttrs(formItemType),
  };
  if (notNull) itemInfo.required = true;
  return itemInfo;
}
/**
 * 转成标准的查询列表表格列的字段（对象） 【待完善】
 * @param {object} sqlFieldInfo 标准的sql字段数据
 * @param {string|object} 查询表单的字段信息
 * @returns {object|undefined} 转成标准的查询字段信息
 */
export function toStandardListField(sqlFieldInfo: CommonObj = needParam(), field) {
  if (!field) return;
  const { tpl, name = tpl, type, remark, enums, notNull, length, isUnsigned } = sqlFieldInfo;
  let colTpl = "";
  /**
   * 获取列的渲染类型
   * @returns {undefined|id|text|BaseCopy|BaseImg|BaseTag|create|update|remark|datetime} 返回渲染类型
   */
  function getColRenderType() {
    if (enums) return "BaseTag";
    if (tpl === "url") {
      if (getInferIsImg(sqlFieldInfo)) return "BaseImg";
      return "BaseCopy";
    }
    if (["create", "update", "id"].includes(tpl)) return tpl;
  }
  /**
   * 获取渲染列控件的属性
   */
  function getColRenderAttrs() {
    if (enums) return { name: getDictNameByTplName(tpl) };
    if (tpl === "url") {
      if (getInferIsImg(sqlFieldInfo)) return { src: name };
    }
  }
  if (colTpl) {
    if (tableColTpls[colTpl]) return tableColTpls[colTpl];
    else printDevWarning(`暂未配置表格列模板：${colTpl}`);
  }
  return {
    prop: letFieldNameToSameWay(name),
    label: getLabel(remark),
    type: getColRenderType(),
    attrs: getColRenderAttrs(),
  };
}
/**
 * 转成标准的新增/编辑弹窗的表单字段（对象） 【待完善】
 * @param {object} sqlFieldInfo 标准的sql字段数据
 * @param {string|object} 查询表单的字段信息
 * @returns {object|undefined} 转成标准的查询字段信息
 */
export function toStandardAddEditField(sqlFieldInfo = needParam(), field) {
  return toStandardQueryField(sqlFieldInfo, field, false);
}
/**
 * 获取标准的字段信息
 * @param {object} standField 标准的字段信息（对象）
 * @returns
 */
export function getHandleFieldInfo(standField = {}) {
  const { letFieldNameToSameWay } = module.exports;
  const { tpl, name = tpl, ...rest } = standField;
  const fieldInfo = { name: letFieldNameToSameWay(name), ...fieldsMap[tpl], ...rest };
  const { enums, remark = "", joinChar } = fieldInfo;
  if (joinChar) fieldInfo.remark += `（用"${joinChar}"分隔开）`;
  if (enums && !remark.includes("注")) {
    fieldInfo.remark += ` 注：${getEnumText(enums)}`;
    // delete fieldInfo.enums; // 不要删除，留着校验传入的值是否合法
    // delete fieldInfo.joinChar;  // 数组拼字符串的链接符号
  }
  return fieldInfo;
}
/**
 * 获取数据表的字段（标准的）
 * @param {(string|object)[]} fields 字段数组
 * @param {boolean} isStandard 是否是标准的字段（具备完整属性）
 * @example fields 示例：["id", "id:用户id", "id:other_id:其他id", { tpl: "id", remark: "对象id", notNull: false }]
 * @returns {object[]}
 */
export function getStandardSqlFields(fields = needParam(), isStandard = false) {
  let hasPrimaryKey = false;
  const newFields = [];
  fields.forEach(item => {
    const standField = toStandardSqlField(item, isStandard, hasPrimaryKey);
    if (Array.isArray(standField)) {
      return standField.forEach(staField => {
        if (staField.isPrimaryKey) hasPrimaryKey = true;
        newFields.push(getHandleFieldInfo(staField));
      });
    }
    if (standField.isPrimaryKey) hasPrimaryKey = true;
    newFields.push(getHandleFieldInfo(standField));
  });
  return newFields;
}

/**
 * 获取某个表的一些字段名称，默认是所有
 * @param {string} tableName 表名称
 * @param {string[]} includeNames 要包含的字段名称
 * @param {boolean} isOmit 是否剔除includeNames的字段名称
 * @returns {string[]}
 */
export function getSomeFieldNames(tableName = needParam(), includeNames, isOmit) {
  const { sqlFields } = standTables[tableName];
  const allNames = sqlFields.map(it => it.name);
  if (!includeNames) return allNames;
  return allNames.filter(it => (isOmit ? !includeNames.includes(it) : includeNames.includes(it)));
}
