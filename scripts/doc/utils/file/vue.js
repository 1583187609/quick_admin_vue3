import fs from "fs";
import path from "path";
import { needParam, N } from "../../utils/index.js";
import compiler from "@vue/compiler-sfc";

/**
 * 判断 ts interface 行中{}的数量（为0时，说明完全左右{}数量一致
 * @param {string} line 行字符串
 * @param {type|interface} type 处理字符串时要依据的处理类型
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
