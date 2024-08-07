import fs from "fs";
import path from "path";
// import * as bt from "@babel/types";
// import { NodePath } from "ast-types";
import {
  N,
  getBracesNum,
  needParam,
  typeOf,
  upperFirst,
  writeFileSync,
  getLineType,
  getTableRow,
  isVueDefineDeclare,
} from "../../utils/index.js";
import vueDocs from "vue-docgen-api";
import { getNoticesStr, getNoticesFromTags, getTypeTable } from "../../create/component.js";
// import handlers from "../../temp/handlers.js";

const { parse, ScriptHandlers, TemplateHandlers } = vueDocs;

/**
 * 根据注释名称从注释中获取信息
 * @param {string} filePath 要读取文件的路径
 * @param {summary|props|expose|emits|slots} type 要读取的注释类型
 * @returns {
 *  tags: [],
 *  type: "",
 *  title: "",
 * }
 */
export function getInfoByAnnoName(readPath = needParam(), name = "summary") {
  const readPathFull = path.join(process.cwd(), readPath);
  const fileStr = fs.readFileSync(readPathFull, "utf-8");
  const htmlRegStr = `(<!-- *${name}.*?-->)`;
  const jsRegStr = `(\\/\\*\\* *${name}.*?\\*\\/)`;
  const regStr = `${htmlRegStr}|${jsRegStr}`;
  const reg = new RegExp(regStr, "gs");
  const info = { type: name, title: upperFirst(name) };
  const matchStr = fileStr.match(reg)?.[0];
  if (!matchStr) return info;
  const lines = matchStr.split(N);
  if (!lines.length) return info;
  const startInd = lines[0].indexOf(name) + name.length + 1;
  const title = lines[0].slice(startInd).trim();
  if (title) info.title = title;
  const tags = [];
  lines.slice(1, -1).map((it, i) => {
    it = it.replace("*", "").trim();
    if (i === 0 && !it.startsWith("@")) {
      info.description = it;
      return it;
    }
    let sInd = it.indexOf("{");
    let eInd = it.indexOf("}");
    if (sInd === -1 && eInd === -1) {
      sInd = eInd = it.indexOf(" ");
    }
    const title = it.slice(1, sInd).trim();
    let type = it.slice(sInd + 1, eInd).trim();
    if (!type && title === "notice") type = "tip";
    const description = it.slice(eInd + 1).trim();
    tags.push({
      description,
      title,
      type: { name: type },
    });
    return it;
  });
  if (tags?.length) info.tags = tags;
  return info;
}

let expandSum = 0;
/**
 * 获取下一次遇到其他不同本行类型的行下标
 * @param {string[]} rows 多行文本数据数组
 * @param {number} nextInd 下一行的下标
 * @param {ts|arr|obj|["",""]} startType 刚开始查找时行文本的类型
 */
export function getNearLineIndex(rows = [], nextInd = needParam(), startType = "ts") {
  const t = typeOf(startType);
  let nextLine = rows[nextInd];
  if (nextLine === undefined) return -1;
  nextLine = nextLine.trim();
  if (t === "String") {
    const isEnd = getLineType(nextLine) !== startType;
    if (isEnd) return nextInd;
    return getNearLineIndex(rows, ++nextInd, startType);
  } else if (t === "Array") {
    if (expandSum) {
      expandSum = getBracesNum(nextLine, expandSum, startType);
      const isEnd = expandSum === 0;
      if (isEnd) return nextInd;
      return getNearLineIndex(rows, ++nextInd, startType);
    }
  } else {
    throw new Error(`暂未处理${t}类型`);
  }
}

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
    const boundChars = ["{", "}"];
    expandSum = getBracesNum(line, expandSum, boundChars);
    if (expandSum === 0) return newLines.push(line);
    const nearInd = getNearLineIndex(lines, ind + 1, boundChars);
    if (nearInd > ind) expandUntilInd = nearInd;
    newLines.push(line);
  });
  const newFileStr = newLines.join(N);
  const tempPathFull = path.join(process.cwd(), tempPath);
  writeFileSync(tempPathFull, newFileStr);
  return tempPathFull;
}

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
 * 获取vue文件中的摘要信息
 * @param {string} readPath 要读取文件的路径
 * @param {object} info 返回的信息
 */
export function getSummaryFileStr(readPath = "") {
  let fileStr = "";
  if (!readPath) return fileStr;
  if (!readPath) return "";
  const info = getInfoByAnnoName(readPath);
  const { tags, description } = info;
  if (description) fileStr += `${description}${N}${N}`;
  const notices = getNoticesFromTags(tags);
  if (notices) fileStr += `${getNoticesStr(notices)}${N}${N}`;
  return fileStr;
}

export async function getApiTablesStr(readPath = needParam()) {
  const info = await getParseInfo(readPath);
  // const { description, displayName, exportName, sourceFiles, tags,expose, props, slots  } = info;
  const { events, ...rest } = info;
  const data = { emits: events, ...rest };
  let fileStr = "";
  const map = {
    props: getItemsOfProps,
    emits: getItemsOfEvents,
    expose: getItemsOfExpose,
    slots: getItemsOfSlots,
  };
  Object.keys(map).forEach(key => {
    const rows = map[key](data[key]);
    const descInfo = getInfoByAnnoName(readPath, key);
    fileStr += `${getTypeTable(key, rows, descInfo)}${N}`;
  });
  return fileStr;
}

function getItemsOfProps(list = []) {
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

function getItemsOfSlots(list = []) {
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

function getItemsOfEvents(list = []) {
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

function getItemsOfExpose(list = []) {
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
