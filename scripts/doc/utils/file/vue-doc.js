import fs from "fs";
import path from "path";
import * as bt from "@babel/types";
import { NodePath } from "ast-types";
// import handlers from "./handlers.js";
import { N, docsPath, getAtMdStr, getFileName, getTsTypeDeclare, needParam, toCodeBlock, writeFileSync } from "../index.js";
import vueDocs from "vue-docgen-api";
import { getTableRow } from "./vuets.js";
import { getNoticesStr, getNoticesFromTags, getTypeTable } from "../../create/component.js";
import { demosPath, splitOrderChar } from "../consts.js";

const { parse, ScriptHandlers, TemplateHandlers } = vueDocs;
// const infoStr = JSON.stringify(info);
// fileStr += `${toCodeBlock(infoStr)}${N}`;
export async function run(
  readPath = `${demosPath}/0_示例_demo/_components/StandardDemoForm.vue`,
  writePath = `${docsPath}/5_测试_test/1_测试专区1_test1.md`
) {
  const title = getFileName(writePath);
  const sumStr = getSummaryFileStr(readPath, title);
  let fileStr = `${sumStr}${N}`;
  fileStr += `## Info${N}`;
  fileStr += `${await getApiTablesStr(readPath)}${N}`;
  fileStr += `${getTsTypeDeclare(readPath)}${N}`;
  writePath = path.join(process.cwd(), writePath);
  writeFileSync(writePath, fileStr);
}

/**
 * 根据name从注释中获取信息
 * @param {string} filePath 要读取文件的路径
 * @param {summary|props|expose|emits|slots} type 要读取的注释类型
 */
export function getInfoFromAnnoByName(readPath = needParam(), name = "summary") {
  const readPathFull = path.join(process.cwd(), readPath);
  const fileStr = fs.readFileSync(readPathFull, "utf-8");
  const htmlRegStr = `(<!-- *${name}.*?-->)`;
  const jsRegStr = `(\\/\\*\\* *${name}.*?\\*\\/)`;
  const regStr = `${htmlRegStr}|${jsRegStr}`;
  const reg = new RegExp(regStr, "gs");
  const info = { type: name, title: getFileName(readPath) };
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

async function getParseInfo(readPath = needParam()) {
  const readPathFull = path.join(process.cwd(), readPath);
  return await parse(readPathFull, {
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
  const info = getInfoFromAnnoByName(readPath);
  const { tags, description } = info;
  if (description) fileStr += `${description}${N}${N}`;
  const notices = getNoticesFromTags(tags);
  if (notices) fileStr += `${getNoticesStr(notices)}${N}${N}`;
  return fileStr;
}

export async function getApiTablesStr(readPath = needParam()) {
  const info = await getParseInfo(readPath);
  // const { description, displayName, exportName, sourceFiles, tags } = info;
  const { events, expose, props, slots } = info;
  const data = {
    props,
    emits: events,
    expose,
    slots,
  };
  let fileStr = "";
  const map = {
    props: getItemsOfProps,
    emits: getItemsOfEvents,
    expose: getItemsOfExpose,
    slots: getItemsOfSlots,
  };
  Object.keys(map).forEach(key => {
    const rows = map[key](data[key]);
    const descInfo = getInfoFromAnnoByName(readPath, key);
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
      return `${elements.map(it => it.name).join(" | ")}[ ]`;
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
