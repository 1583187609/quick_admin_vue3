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
function getTableRowItem(row, isAtMd) {
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
function getIsEnd() {}
export function getItemsFromObjStr(fileStr = "", isAtMd = false) {
  const lines = getEffectiveLines(fileStr);
  return lines.map(item => {
    const [keyVal, desc] = item.split("//").map(it => it.trim());
    const colonInd = getIndex(keyVal, ":,");
    const name = keyVal.slice(0, colonInd);
    const val = keyVal.slice(colonInd + 1);
    const type = getInferredTsType(val);
    return getTableRowItem({ name, type, desc }, isAtMd);
  });
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
