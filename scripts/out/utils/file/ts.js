import { getBracesNum, getLineType } from ".";
import { needParam } from "../base";
import { showTypeInferred, unknownChar } from "../consts";
import { getIndex } from "./base";
import { getAtMdStr } from "./md";

const isFnReg = /\( *\) *(=>)* *\{/;
const isArrReg = /\[/;
/**
 * 获取有效的新数组(移除注释、空行等的)
 * @param {string} fileStr 文本字符串
 * @param {string} filter 过滤条件
 * @returns 新的文本行（数组）
 */
function getEffectiveLines(fileStr = "") {
  fileStr = fileStr.trim();
  if (!fileStr) return [];
  const isMulti = fileStr.includes("\n");
  // 不是多行则说明是数组。例：defineEmits(["update:modelValue"])
  if (!isMulti) return fileStr.split(",").map(it => it.trim().slice(1, -1));
  const lines = fileStr.split("\n");
  let existFnHalf = false;
  const list = lines.map((it, i) => {
    let str = it.trim();
    if (existFnHalf) {
      if (str.startsWith("}")) existFnHalf = false;
      return "";
    }
    // 去除多行注释
    if (str.startsWith("/*") || str.startsWith("*") || str.startsWith("*/")) str = "";
    // 将单行注释拼接到下一行的后面
    if (str.startsWith("//")) {
      const nextLine = lines[i + 1];
      if (nextLine && !nextLine.startsWith("//") && !nextLine.startsWith("/*")) {
        // str = str.replaceAll("|", "\\|"); //.replaceAll("[", "[").replaceAll("]", "]");
        lines[i + 1] += nextLine.includes("//") ? str.slice(2) : str;
      }
      str = "";
    }
    // if (str.startsWith("return")) str = "";
    // if (str.startsWith("}")) str = "";
    // 处理函数行
    const isFnHalf = isFnReg.test(str) && !str.includes("}");
    if (isFnHalf) {
      existFnHalf = true;
      const annoInd = str.indexOf("//");
      const keyVal = str.slice(0, annoInd);
      const anno = str.slice(annoInd + 1);
      const leftInd = str.indexOf("(");
      const name = keyVal.slice(0, leftInd).replace(":", "");
      str = `${name}: ()=>{},`;
      if (anno) str += `/${anno}`;
    }
    return str;
  });
  return list.filter(it => !!it);
}

/**
 * 获取推断的ts类型
 * @param {string} str 要分析的字符串
 * @return
 */
export function getInferredTsType(str = "") {
  if (isFnReg.test(str)) return `Function${showTypeInferred ? "（类型推断）" : ""}`;
  if (isArrReg.test(str)) return `Array${showTypeInferred ? "（类型推断）" : ""}`;
  return unknownChar;
}

/**
 * 获取表格的行数据
 * @param {{ name = "", type = "", desc = "", defVal = "", required = "" }} row 数据
 * @param {boolean} isAtMd 是否转成md标识英文的字符串
 * @returns
 */
function getTableRowItem(row = needParam(), isAtMd) {
  const { name = unknownChar, type = unknownChar, desc = unknownChar, defVal = unknownChar, required = unknownChar } = row;
  return {
    name: isAtMd ? getAtMdStr(name) : name,
    type: isAtMd ? getAtMdStr(type) : type,
    desc: isAtMd ? getAtMdStr(desc) : desc,
    default: isAtMd ? getAtMdStr(defVal) : defVal,
    required,
  };
}

/**
 * 从文件ts类型的字符串中获取items
 * @param {string} fileStr 读取的文件路径
 * @param {boolean} isAtMd 是否在md文件中展示
 */
export function getItemsFromTsStr(fileStr = "", isAtMd = false) {
  const list = getEffectiveLines(fileStr);
  return list.map(item => {
    const [keyVal, desc] = item.split("//").map(it => it.trim());
    const colonInd = keyVal.indexOf(":");
    const key = keyVal.slice(0, colonInd);
    const val = keyVal.slice(colonInd + 1);
    const required = key.at(-1) !== "?";
    const name = required ? key : key.slice(0, -1);
    const type = val.trim().replaceAll(";", "").replaceAll("|", "\\|");
    return getTableRowItem({ name, type, desc, required }, isAtMd);
  });
}

/**
 * 从文件对象类型的字符串中获取items
 * @param {string} fileStr 读取的文件路径
 * @param {boolean} isAtMd 是否在md文件中展示
 */
function getEffectiveLineType(str = needParam()) {
  const ind = getIndex(str, `,'"\`([{`);
  if (ind === -1) return "";
  // throw new Error(`暂未处理行字符串为【${str}】的情况`)
  const char = str[ind];
  if (char === ",") return "unknown";
  if (char === "(") return "Function";
  if (char === "[") return "Array";
  if (char === "{") return "Object";
  if (['"', "`", "'"].includes(char)) return "String";
  const colonInd = str.indexOf(":");
  const commaInd = str.indexOf(",");
  if (!isNaN(Number(str.slice(colonInd + 1, commaInd)))) return "Number";
  // throw new Error(`暂未处理符号为${char}不知类型的情况`);
  return "";
}
export function getItemsFromObjStr(fileStr = "", isAtMd = false) {
  const lines = getEffectiveLines(fileStr);
  // let bracesNum = 0;
  return lines
    .map(item => {
      const [keyVal, desc] = item.split("//").map(it => it.trim());
      const t = getEffectiveLineType(item);
      if (t === "unknown") {
        const commaInd = keyVal.indexOf(",");
        const name = keyVal.slice(0, commaInd);
        return getTableRowItem({ name, desc }, isAtMd);
      }
      if (t === "Function") {
        const colonInd = getIndex(keyVal, ":(");
        const name = keyVal.slice(0, colonInd);
        const type = `${t}${showTypeInferred ? "（类型推断）" : ""}`;
        return getTableRowItem({ name, type, desc }, isAtMd);
      }
      if (t === "Array" || t === "Object") {
        const colonInd = keyVal.indexOf(":");
        const name = keyVal.slice(0, colonInd);
        const type = `${t}${showTypeInferred ? "（类型推断）" : ""}`;
        return getTableRowItem({ name, type, desc }, isAtMd);
      }
      return null;
    })
    .filter(it => !!it);
  // return lines.map(item => {
  //   // const t = getEffectiveLineType(item);
  //   // if (colonInd === -1) {
  //   //   // 如果没找到，则说明是对象或数组
  //   //   let name;
  //   //   const isArr = item.indexOf("[");
  //   //   let type = isArr ? "Array" : "Function";
  //   //   if (showTypeInferred) type += `（类型推断）`;
  //   //   bracesNum = getBracesNum(item, 0, isArr ? "[]" : "{}");
  //   //   if (bracesNum === 0) {
  //   //   }
  //   //   return getTableRowItem({ name, type, desc }, isAtMd);
  //   // } else {
  //   const [keyVal, desc] = item.split("//").map(it => it.trim());
  //   const colonInd = getIndex(keyVal, ":,");
  //   const name = keyVal.slice(0, colonInd);
  //   const val = keyVal.slice(colonInd + 1);
  //   const type = getInferredTsType(val);
  //   return getTableRowItem({ name, type, desc }, isAtMd);
  //   // }
  // });
}

/**
 * 从文件数组类型的字符串中获取items
 * @param {string} fileStr 读取的文件路径
 * @param {boolean} isAtMd 是否在md文件中展示
 */
export function getItemsFromArrStr(fileStr = "", isAtMd = false) {
  const lines = getEffectiveLines(fileStr);
  const isMulti = fileStr.includes("\n");
  // 不是多行则说明是数组。例：defineEmits(["update:modelValue"])
  if (!isMulti) return lines.map(item => getTableRowItem({ name: item }, isAtMd));
  return lines.map(item => {
    const commaInd = item.indexOf(",");
    const name = item.slice(0, commaInd).slice(1, -1);
    const desc = item
      .slice(commaInd + 1)
      .replace("//", "")
      .trim();
    return getTableRowItem({ name, desc }, isAtMd);
  });
}
