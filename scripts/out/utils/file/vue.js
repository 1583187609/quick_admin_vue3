import fs from "fs";
import { getWithTagStr } from ".";
import { needParam } from "../base";

/**
 * 根据类型获取html注释
 * @param {string} filePath 要读取文件的路径
 * @param {summary|props|expose|emits|slots} type 要读取的注释类型
 */
export function getAnnotationByType(filePath = needParam(), type = "summary", noWrap = false) {
  const regHtml = new RegExp(`(<!-- ${type}.*?-->)`, "gs");
  const regJs = new RegExp(`(\\/\\*\\* ${type}.*?\\*\\/)`, "gs");
  const isHtml = type === "summary";
  const reg = isHtml ? regHtml : regJs;
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
 * 解析vue文件
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
export function getVueFileInfo(filePath = "", matchType = "summary") {
  if (!filePath) return { file: "", info: null };
  const { matchStr, endStr } = getAnnotationByType(filePath, matchType, true);
  const info = { hints: {} };
  const lines = matchStr.split("\n");
  lines.forEach(item => {
    if (!item.startsWith("@")) return;
    const spaceInd = item.indexOf(" ");
    const key = item.slice(1, spaceInd);
    let val = item.slice(spaceInd + 1).trim();
    val = getWithTagStr(val);
    if (["tip", "warning", "danger"].includes(key)) {
      info.hints[key] = val;
    } else {
      info[key] = val;
    }
  });
  return { file: endStr, info };
}
