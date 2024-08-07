import fs from "fs";
import path from "path";
import vueDocs from "vue-docgen-api";
// import * as bt from "@babel/types";
// import { NodePath } from "ast-types";
import {
  N,
  unknownChar,
  needParam,
  writeFileSync,
  isVueDefineDeclare,
  getInfoByAnnoName,
  getNearLineIndex,
  getAtMdStr,
} from "../../utils/index.js";
import { getTypeTable } from "../../create/component.js";
// import handlers from "../../temp/handlers.js";

const { parse, ScriptHandlers, TemplateHandlers } = vueDocs;

// 获取临时路径
function getTempPathFull(readPath = "", tempPath = "/_cache/temp.vue") {
  const readPathFull = path.join(process.cwd(), readPath);
  const fileStr = fs.readFileSync(readPathFull, "utf-8");
  const newLines = [];
  const lines = fileStr.split(N);
  let expandUntilInd = -1;
  lines.forEach((line, ind) => {
    if (expandUntilInd > ind) {
      if (!line.includes("//")) return newLines.push(line);
      const [codeStr, annoStr] = line.split("//").map(it => it.trim());
      if (!annoStr) return newLines.push(codeStr);
      const annos = ["/**", `* ${annoStr}`, "*/"];
      if (codeStr) annos.push(codeStr);
      return newLines.push(...annos);
    }
    const isDefine = isVueDefineDeclare(line, undefined, false);
    if (!isDefine) return newLines.push(line);
    const nearInd = getNearLineIndex(lines, ind, ["{", "}"]);
    if (nearInd > ind) expandUntilInd = nearInd;
    newLines.push(line);
  });
  const newFileStr = newLines.join(N);
  const tempPathFull = path.join(process.cwd(), tempPath);
  writeFileSync(tempPathFull, newFileStr);
  return tempPathFull;
}

/**
 * 获取解析的信息
 * @param {string} readPath 要读取文件的路径
 * @returns {object} 解析的数据信息
 */
async function getParseInfo(readPath = needParam()) {
  const tempPathFull = getTempPathFull(readPath);
  return await parse(tempPathFull, {
    // alias: { "@": path.join(process.cwd(), "src") },
    // resolve: [path.join(process.cwd(), "src")],
    // ...handlers,
    // validExtends(){},
  });
}

/**
 * 从tags中获取提示信息
 * @param {object[]} tags 标识数据（数组）
 * @returns {object} tip、danger、warning、details 提示信息
 */
export function getNoticesFromTags(tags = []) {
  if (!tags?.length) return;
  const notices = {};
  tags.forEach(item => {
    const { title, description } = item;
    const type = item.type.name;
    if (title === "notice") notices[type] = description;
  });
  return notices;
}

/**
 * 获取表格的行数据
 * @param {{ name = "", type = "", desc = "", defVal = "", required = "" }} row 数据
 * @param {boolean} isAtMd 是否转成md标识英文的字符串
 */
function getTableRow(row = needParam(), isAtMd = false) {
  const { name = unknownChar, type = unknownChar, desc = unknownChar, defVal = unknownChar, required = unknownChar } = row;
  return {
    name: isAtMd ? getAtMdStr(name) : name,
    type: isAtMd ? getAtMdStr(type.replaceAll("|", "\\|")) : type,
    desc: isAtMd ? getAtMdStr(desc) : desc,
    default: isAtMd ? getAtMdStr(defVal) : defVal,
    required,
  };
}

/**
 * 获取 props 表格行数据
 * @param {string} list props 数组
 * @returns {object[]}
 */
function getPropsRows(list = []) {
  /**
   * 获取TS类型
   * @param {Object} typeInfo type信息
   * @param {Object} tags 标识信息
   * @returns {String} ts类型
   */
  function getType(typeInfo = {}, tags = {}) {
    const { name, elements } = typeInfo;
    if (name === "Array") {
      return `${elements.map(it => it.name).join(" | ")}[]`;
    } else if (name === "TSFunctionType") {
      const { params = [], returns = [], type } = tags;
      if (type) return type[0].type.name;
      const args = params.map(it => `${it.name}: ${it.type.name}`);
      const retStr = returns.map(it => it.type.name).join("") || "void";
      return `(${args.join(", ")}) => ${retStr}`;
    } else if (name === "union") {
      return elements.map(it => it.name).join(" | ");
    } else {
      return name;
    }
  }
  return list.map(item => {
    const { name, type, required, defaultValue, description, tags } = item;
    const { func, value } = defaultValue ?? {};
    let defVal = value;
    if (value) {
      defVal = value.split("=>").at(-1).trim();
    }
    return getTableRow(
      {
        name,
        type: getType(type, tags),
        required,
        defVal,
        desc: description,
      },
      true
    );
  });
}

/**
 * 获取 slots 表格行数据
 * @param {string} list slots 数组
 * @returns {object[]}
 */
function getSlotsRows(list = []) {
  return list.map((item, ind) => {
    const { name, type, description, tags, bindings } = item;
    return getTableRow(
      {
        name,
        desc: description,
        type: bindings?.map(it => it.name).join(", "),
      },
      true
    );
  });
}

/**
 * 获取 emits 表格行数据
 * @param {string} list emits 数组
 * @returns {object[]}
 */
function getEmitsRows(list = []) {
  function getType(type) {
    let typeStr = type?.names?.join(", ") ?? "";
    if (!typeStr) return;
    if (!typeStr.startsWith("(")) typeStr = `(${typeStr})`;
    return typeStr;
  }
  return list.map(item => {
    const { name, type, description, tags } = item;
    return getTableRow(
      {
        name,
        type: getType(type),
        desc: description,
      },
      true
    );
  });
}

/**
 * 获取 expose 表格行数据
 * @param {string} list expose 数组
 * @returns {object[]}
 */
function getExposeRows(list = []) {
  function getType(tags = []) {
    const typeTarget = tags.find(it => it.title === "type");
    if (typeTarget) return typeTarget.type.name;
    const params = [];
    const returns = [];
    tags.forEach(item => {
      const { title } = item;
      if (title === "param") {
        params.push(item);
      } else if (title === "returns") {
        returns.push(item);
      }
    });
    const args = params.map(it => `${it.name}: ${it.type.name}`);
    const retStr = returns.map(it => it.type.name).join("") || "void";
    return `(${args.join(", ")}) => ${retStr}`;
  }
  return list.map(item => {
    const { name, description, tags } = item;
    return getTableRow(
      {
        name,
        type: getType(tags),
        desc: description,
      },
      true
    );
  });
}

/**
 * 获取Vue文件defineXxx api 的表格（md文件能解析的字符串）
 * @param {string} readPath 要读取文件的路径
 * @returns {string} md文件的字符串
 */
export async function getApiTablesStr(readPath = needParam()) {
  const info = await getParseInfo(readPath);
  // const { description, displayName, exportName, sourceFiles, tags,expose, props, slots  } = info;
  const { events, ...rest } = info;
  const data = { emits: events, ...rest };
  let fileStr = "";
  const map = {
    props: getPropsRows,
    emits: getEmitsRows,
    expose: getExposeRows,
    slots: getSlotsRows,
  };
  Object.keys(map).forEach(key => {
    const rows = map[key](data[key]);
    const descInfo = getInfoByAnnoName(readPath, key);
    fileStr += `${getTypeTable(key, rows, descInfo)}${N}`;
  });
  return fileStr;
}
