import fs from "fs";
import path from "path";
import { getAtMdStr } from ".";
import { needParam } from "../base";
import { Interface } from "readline";

const typeReg = /^export +type +\w+ *= *[\s\S]*/;
const infaReg = /^export +interface *[\s\S]+{[\s\S]*/;
const imprReg = /^import +type *{[\s\S]*/;

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
    .split("\n")
    .map(it => {
      if (!isHtml) it = it.replace("*", "");
      return it.trim();
    })
    .filter(it => !!it)
    .join("\n");
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
export function getVueApiInfo(filePath = "", matchType = "summary") {
  if (!filePath) return { file: "", info: null };
  const { matchStr, endStr } = getAnnotationByType(filePath, matchType, true);
  const info = { hints: {} };
  const lines = matchStr.split("\n");
  lines.forEach(item => {
    if (!item.startsWith("@")) return;
    const spaceInd = item.indexOf(" ");
    const key = item.slice(1, spaceInd);
    let val = item.slice(spaceInd + 1).trim();
    val = getAtMdStr(val);
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
 * @returns {boolean} 该行是否已结束
 */
function getInterfaceBracesNum(line = "", n = 0) {
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === "{") {
      n++;
    } else if (char === "}") {
      n--;
    }
  }
  return n;
}

/**
 * 获取该行的类型
 * @param {string} str 要处理的行字符串
 * @returns {""|"anno"|"ts"|"other"} 行的类型
 */
function getLineType(str = needParam()) {
  if (str === "") return "";
  const annoChars = ["//", "/*", "*", "*/"];
  const isAnno = annoChars.some(it => str.startsWith(it));
  if (isAnno) return "anno";
  if (typeReg.test(str) || infaReg.test(str)) return "ts";
  return "other";
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
 * @param {string} nChar 换行符
 * @returns Ts类型声明字符串
 */
export function getTsDeclareFromVueFile(readPathHalf = "", nChar = "\n") {
  const fullPath = path.join(process.cwd(), readPathHalf);
  const scriptStr = getScriptFromVueFile(fullPath, true);
  const rows = scriptStr.split("\n");
  const newLines = [];
  let isAtType = false;
  let isAtInfa = false;
  let untilInd = -1;
  let infaBracesNum = 0;
  rows.forEach((item, ind) => {
    if (untilInd >= ind) return newLines.push(item);
    const line = item.trim();
    if (line.startsWith("import")) {
      if (imprReg.test(line)) return newLines.push(item);
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
    const isType = typeReg.test(line);
    if (isType) {
      newLines.push(item);
      if (getTypeIsEnd(line)) return;
      isAtType = true;
      return;
    }
    if (isAtType) {
      if (getTypeIsEnd(line)) isAtType = false;
      return newLines.push(item);
    }
    const isInfa = infaReg.test(line);
    if (isInfa) {
      newLines.push(item);
      infaBracesNum = getInterfaceBracesNum(line);
      if (infaBracesNum == 0) return;
      isAtInfa = true;
      return;
    }
    if (isAtInfa) {
      infaBracesNum = getInterfaceBracesNum(line, infaBracesNum);
      if (infaBracesNum === 0) isAtInfa = false;
      return newLines.push(item);
    }
    const currType = getLineType(line);
    if (currType === "") return newLines.push(item);
    const isAnnoLine = currType === "anno"; //是否是注释行
    if (isAnnoLine) {
      function getNearTsLineIndex(nextInd) {
        let nextLine = rows[nextInd];
        if (nextLine === undefined) return -1;
        nextLine = nextLine.trim();
        let nextType = getLineType(nextLine);
        const isEmptyOrAnno = ["", "anno"].includes(nextType); //是否是空行或注释行
        if (isEmptyOrAnno) return getNearTsLineIndex(++nextInd);
        if (nextType === "ts") return nextInd;
        return -1;
      }
      const nearInd = getNearTsLineIndex(ind + 1);
      if (nearInd > -1) {
        untilInd = nearInd;
        newLines.push(item);
      }
    }
  });
  return newLines.join(nChar).trim();
}
