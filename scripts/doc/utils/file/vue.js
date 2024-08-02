import fs from "fs";
import path from "path";
import { getAtMdStr } from ".";
import { needParam } from "../base";
import { Interface } from "readline";
import { N } from "../consts";
import { getLineType, getNearLineIndex, isImportTypeDeclare, isInterfaceDeclare, isTypeDeclare } from "./vuets";

/**
 * 根据类型获取html注释
 * @param {string} filePath 要读取文件的路径
 * @param {summary|props|expose|emits|slots} type 要读取的注释类型
 */
export function getAnnotationByType(filePath = needParam(), type = "summary", noWrap = false) {
  const isHtml = type === "summary";
  const htmlRegStr = `(<!-- ${type}.*?-->)`;
  const jsRegStr = `(\\/\\*\\* ${type}.*?\\*\\/)`;
  const regStr = isHtml ? htmlRegStr : jsRegStr;
  const reg = new RegExp(regStr, "gs");
  let matchStr = "";
  const fileStr = fs.readFileSync(filePath, "utf8");
  const endStr = fileStr.replace(reg, a => {
    if (!matchStr) matchStr = a; //只识别第一次匹配的，其他的则忽略
    return "";
  });
  if (!noWrap) return matchStr;
  const sInd = (isHtml ? 4 : 3) + 1 + type.length;
  const eInd = isHtml ? -3 : -2;
  matchStr = matchStr
    .slice(sInd, eInd)
    .split(N)
    .map(it => {
      if (!isHtml) it = it.replace("*", "");
      return it.trim();
    })
    .filter(it => !!it)
    .join(N);
  return { matchStr, endStr };
}

/**
 * 获取vue文件中api的信息
 * @param {string} filePath vue文件路径
 * @param {summary|props|expose|emits|slots} matchType 要读取的注释类型
 * @returns {file: '', info:{}}
 */
// const tempVueFileStr = `
// <!-- summary
//  @title 行内表单
//  @desc 这是行内表单的描述
// -->
// <template></template>
// <style></style>
// <!-- props
//  @title 行内表单1
//  @desc 这是行内表单的描述1
// -->
// `;
/**
 * key可能的取值
 * @title 标题
 * @description  描述信息（摘要）
 * @tip tip 块信息
 * @warning warning 块信息
 * @danger danger 块信息
 * @details details 块信息
 */
// 改成如下新的
/**
 * key可能的取值
 * @title 标题
 * @description  描述信息（摘要）
 * @notice {tip} tip 块信息（默认为tip）
 * @notice {warning} warning 块信息
 * @notice {danger} danger 块信息
 * @notice {details} details 块信息
 */
export function getVueApiInfo(filePath = "", matchType = "summary") {
  if (!filePath) return { file: "", info: null };
  const { matchStr, endStr } = getAnnotationByType(filePath, matchType, true);
  const info = { hints: {} };
  const lines = matchStr.split(N);
  lines.forEach(item => {
    if (!item.startsWith("@")) return;
    const spaceInd = item.indexOf(" ");
    const key = item.slice(1, spaceInd);
    const val = getAtMdStr(item.slice(spaceInd + 1).trim());
    const isHint = ["tip", "warning", "danger"].includes(key);
    if (isHint) {
      info.hints[key] = val;
      return;
    }
    info[key] = val;
  });
  return { file: endStr, info };
}

/**
 * 判断ts type的行（字符串）是否是结束行
 * @param {string} line 行字符串
 * @param {type|Interface} type 处理字符串时要依据的处理类型
 * @returns {boolean} 该行是否已结束
 */
function getTypeIsEnd(line = "") {
  const semiInd = line.indexOf(";");
  const annoInd = line.indexOf("//");
  return semiInd !== -1 && (annoInd === -1 || semiInd < annoInd);
}

/**
 * 判断 ts interface 行中{}的数量（为0时，说明完全左右{}数量一致
 * @param {string} line 行字符串
 * @param {type|Interface} type 处理字符串时要依据的处理类型
 * @param {string|[string,string]} chars 分界的字符串
 * @returns {boolean} 该行是否已结束
 */
export function getBracesNum(line = "", n = 0, chars = "{}") {
  if (typeof chars === "string") chars = chars.split("");
  const [left, right] = chars;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    // 如果是注释
    const isAnno = c === "/" && line[i + 1] === "/";
    if (isAnno) return n;
    if (c === left) {
      n++;
      continue;
    }
    if (c === right) n--;
  }
  return n;
}

/**
 * 从Vue文件中获取 script 部分的字符串
 * @param {string} readPathFull 要读取的文件路径。例：/demos/Hello.vue
 * @param {boolean} noWrap 是否去壳（及外面包裹的一层script）
 * @returns {string} script 部分的字符串
 */
function getScriptFromVueFile(readPathFull = "", noWrap = false) {
  const vueFileStr = fs.readFileSync(readPathFull, "utf8");
  if (!vueFileStr) return "";
  const tag = "script";
  const mid = "[\\s\\S]*";
  const exc = "[^>]*";
  const lang = `lang=["']ts["']`;
  const regStr = `(<${tag} ${exc}${lang} ${exc}setup${exc}>${mid}<\\/${tag}>)|(<${tag} ${exc}setup ${exc}${lang}${exc}>${mid}<\\/${tag}>)`;
  const reg = new RegExp(regStr);
  const scriptStr = vueFileStr.match(reg)?.[0];
  if (!scriptStr) return "";
  if (noWrap) {
    const sInd = scriptStr.indexOf(">") + 1;
    const eInd = -1 * (tag.length + 3);
    return scriptStr.slice(sInd, eInd).trim();
  }
  return scriptStr;
}

/**
 * 从Vue文件中获取Ts类型声明
 * @param {string} readPathHalf 要读取的文件路径。例：/demos/Hello.vue
 * @returns Ts类型声明字符串
 */
export function getTsDeclareFromVueFile(readPathHalf = "") {
  const fullPath = path.join(process.cwd(), readPathHalf);
  const scriptStr = getScriptFromVueFile(fullPath, true);
  const rows = scriptStr.split(N);
  const newLines = [];
  let isAtType = false;
  let isAtInfa = false;
  let untilInd = -1;
  let infaBracesNum = 0;
  rows.forEach((item, ind) => {
    if (untilInd >= ind) return newLines.push(item);
    const line = item.trim();
    if (line.startsWith("import")) {
      if (isImportTypeDeclare(line)) return newLines.push(item);
      const splitChar = " from ";
      const [frontStr, behindStr] = line.split(splitChar);
      const sInd = line.indexOf("{");
      const sliceStr = frontStr
        .trim()
        .slice(sInd + 1, -1)
        .split(",")
        .filter(it => it.startsWith("type "))
        .map(it => it.replace("type", "").trim())
        .join(", ");
      if (!sliceStr) return;
      newLines.push(`import type {${sliceStr}}${splitChar}${behindStr}`);
      return;
    }
    if (isTypeDeclare(line)) {
      newLines.push(item);
      if (getTypeIsEnd(line)) return;
      isAtType = true;
      return;
    }
    if (isAtType) {
      if (getTypeIsEnd(line)) isAtType = false;
      return newLines.push(item);
    }
    if (isInterfaceDeclare(line)) {
      newLines.push(item);
      infaBracesNum = getBracesNum(line);
      if (infaBracesNum == 0) return;
      isAtInfa = true;
      return;
    }
    if (isAtInfa) {
      infaBracesNum = getBracesNum(line, infaBracesNum);
      if (infaBracesNum === 0) isAtInfa = false;
      return newLines.push(item);
    }
    const currType = getLineType(line);
    if (currType === "") return newLines.push(item);
    const isAnno = currType === "anno"; //是否是注释行
    if (isAnno) {
      const nearInd = getNearLineIndex(rows, ind + 1, "anno");
      if (nearInd > -1) {
        untilInd = nearInd;
        newLines.push(item);
      }
    }
  });
  return newLines.join(N).trim();
}
