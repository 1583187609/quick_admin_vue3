// const { needParam, typeOf, consoleLog, writeFileSync } = require("../../utils");
// const { getStandardSqlFields, toStandardSqlField, toStandardQueryField, toStandardListField, toStandardAddEditField } = require("./_utils");
// const { designMap } = require("../../../design/easy-note");
// const path = require("path");
// const { letDataToJsFile } = require("../../creator/vue/_utils");

import { needParam, typeOf } from "#/mock/utils";
import { CommonObj } from "@/core/_types";
import { designMap } from "..";

// const { getStandardSqlFields, toStandardSqlField, toStandardQueryField, toStandardListField, toStandardAddEditField } = require("./_utils");
// const { designMap } = require("../../../design/easy-note");
// const path = require("path");
// const { letDataToJsFile } = require("../../creator/vue/_utils");

/**
 * 解析一个表的原始字段，处理成包含数据库字段、查询条件字段、表格列字段、新增/编辑表单字段
 * @param {(string|object)[]} originField
 */
function resolveOriginField(originField: CommonObj | string = needParam(), isStandard = false) {
  const t = typeOf(originField);
  let [sqlField, queryField, listField, addEditField] = [];
  if (t === "String") {
    [sqlField, queryField, listField, addEditField] = originField.split("|");
  } else if (t === "Object") {
    const { query, list, addEdit, ...sql } = originField;
    sqlField = sql;
    queryField = query;
    listField = list;
    addEditField = addEdit;
  } else {
    throw new Error(`暂未处理此类型：${t}`);
  }
  const standSqlField = toStandardSqlField(sqlField, isStandard);
  const sT = typeOf(standSqlField);
  if (sT === "Array") {
    return standSqlField.map(staField => resolveOriginField(staField)[0], true);
  } else if (sT === "Object") {
    return [
      {
        ...standSqlField,
        queryFormItem: toStandardQueryField(standSqlField, queryField),
        queryTableCol: toStandardListField(standSqlField, listField),
        addEditFormItem: toStandardAddEditField(standSqlField, addEditField),
      },
    ];
  } else {
    throw new Error(`暂未处理此类型：${sT}`);
  }
}

/**
 * 获取sql字段
 * @param {(string|object)[]} simpleFields
 */
export function getSqlFields(simpleFields: CommonObj[] = []) {
  return simpleFields.map(field => {
    const { queryFormItem, queryTableCol, addEditFormItem, ...rest } = field;
    return rest;
  });
}
/**
 * 获取表单项
 * @param {(string|object)[]} simpleFields
 */
export function getFormItems(simpleFields: CommonObj[] = []) {
  return simpleFields.map(field => field.queryFormItem).filter(it => !!it);
}
/**
 * 获取表格列
 * @param {(string|object)[]} simpleFields
 */
export function getTableCols(simpleFields: CommonObj[] = []) {
  return simpleFields.map(field => field.queryTableCol).filter(it => !!it);
}
/**
 * 获取新增编辑表格项
 * @param {(string|object)[]} simpleFields
 */
export function getAddEditFormItems(simpleFields: CommonObj[] = []) {
  return simpleFields.map(field => field.addEditFormItem).filter(it => !!it);
}
/**
 * 获取整个数据集
 * @param {(string|object)[]} simpleFields
 */
export function getDataSet(name = "") {
  Object.keys(designMap).forEach(key => {
    const { name = needParam("name"), fields = needParam("fields"), ...rest } = designMap[key];
    const standFields = fields.map(field => resolveOriginField(field)).flat(1);
    dataSetMap[key] = {
      name,
      fields: getStandardSqlFields(standFields, true),
      ...rest,
    };
  });
  if (!name) return dataSetMap;
  if (!dataSetMap[name]) throw new Error(`不存在此表：${name}`);
  return dataSetMap[name];
}
/**
 * 获取标准的表设计数据
 * @param {string} writePath 要写入的路径
 */
export function getStandTablesData() {
  const tables = {};
  const dataSet = getDataSet();
  for (const key in dataSet) {
    const { fields, ...rest } = dataSet[key];
    tables[key] = {
      sqlFields: getSqlFields(fields),
      formItems: getFormItems(fields),
      tableCols: getTableCols(fields),
      addEditFormItems: getAddEditFormItems(fields),
      ...rest,
    };
  }
  return tables;
}
/**
 * 写入js文件（标准的表格数据）
 * @param {string} writePath 写入文件路径
 */
export function writeStandTablesData(writePath = "/app/tables-data.js") {
  const tablesData = getStandTablesData();
  //   const fileStr = letDataToJsFile(tablesData, "exports.standTables =");
  //   writeFileSync(writePath, fileStr);
}
