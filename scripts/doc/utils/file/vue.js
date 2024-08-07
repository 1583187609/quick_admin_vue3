import fs from "fs";
import path from "path";
import { needParam } from "../base";
import { Interface } from "readline";
import { N } from "../consts";
import compiler from "@vue/compiler-sfc";

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
 * 获取Vue的Ts类型的Ast语法树
 * @param {*} readPathHalf 要读取文件的路径 例：/src/components/form/BaseForm.vue
 * @returns
 */
export function getVueScriptStr(readPathHalf = needParam()) {
  const readPathFull = path.join(process.cwd(), readPathHalf);
  const vueContent = fs.readFileSync(readPathFull, "utf-8");
  const sfc = compiler.parse(vueContent, {
    filename: "example.vue", // 用于错误报告
    sourceMap: false, // 是否生成source map
  });
  // const {
  //   filename,
  //   source,
  //   template,
  //   script,
  //   styles,
  //   customBlocks,
  //   cssVars,
  //   slotted,
  //   shouldForceReload,
  // } = sfc.descriptor;
  const { scriptSetup } = sfc.descriptor;
  const scriptContent = scriptSetup.content;
  return scriptContent;
}
