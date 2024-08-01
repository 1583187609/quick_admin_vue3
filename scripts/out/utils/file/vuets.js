import fs from "fs";
import path from "path";
import { needParam, typeOf } from "../base";
import { N, camelCase, getAtMdStr, getBracesNum, getIndexIgnoreAnno, showTypeInferred, unknownChar } from "../index";

let initSum = 0;
let fnSum = 0;
const jsNameChar = `A-Za-z_0-9$`; //js命名可用的字符
const defineKeywords = ["defineProps", "defineEmits", "defineSlots", "defineExpose"];
const jsKeywords = ["const", "var", "let", "function"]; //js关键词

/**
 * 是否是声明行
 */
export function isDeclare(line = needParam(), nameRegStr = needParam()) {
  const reg = new RegExp(`^ *${nameRegStr}[\\s\\S]+`);
  return reg.test(line);
}

/**
 * 是否是导入ts的type行
 */
export function isImportTypeDeclare(line = needParam()) {
  return isDeclare(line, `import +(type +)|([\\s,\\S])+type +[\\s\\S]+`);
}

/**
 * 是否是 type 导入行
 */
export function isTypeDeclare(line = needParam()) {
  return isDeclare(line, `(export +)*type +\\w+ *= *[\\s\\S]*`);
}

/**
 * 是否是 interface 导入行
 */
export function isInterfaceDeclare(line = needParam()) {
  return isDeclare(line, `(export +)*interface *[\\s\\S]+{[\\s\\S]*`);
}

/**
 * 是否是注释行
 * @param {string} line
 * @param {all|single|multi} type 注释类型
 */
export function isAnnotation(line = needParam(), type = "all") {
  const singleRegStr = `\\/\\/`;
  const multiRegStr = `\\/\\*|\\*|\\*\\/`;
  const allRegStr = `(${singleRegStr}|${multiRegStr})`;
  let annoRegStr = allRegStr;
  if (type === "single") annoRegStr = singleRegStr;
  else if (type === "multi") annoRegStr = multiRegStr;
  return isDeclare(line, annoRegStr);
}

/**
 * 是否是JS关键词声明行
 */
export function isJsKeywordsDeclare(line = needParam(), nameRegStr = "") {
  const keywordRegStr = `(${jsKeywords.join("|")}) +`;
  return isDeclare(line, `(export +)?${keywordRegStr}${nameRegStr}`);
}

/**
 * 是否是TS关键词声明行
 */
export function isTsKeywordsDeclare(line = needParam(), nameRegStr = "") {
  const keywordRegStr = `(type|interface) +`;
  return isDeclare(line, `(export +)?${keywordRegStr}${nameRegStr}`);
}

/**
 * 是否是对象内部的函数
 */
export function isObjectInnerFunction(line = needParam()) {
  return isDeclare(line, `[${jsNameChar}]+ *:* *\\([\\s\\S]*\\)`);
}

/**
 * 是否是对象内部的数组
 */
export function isObjectInnerArray(line = needParam()) {
  return /^ *[A-Z-a-z]+: *\[/.test(line);
}

/**
 * 是否是Vue define 声明行
 */
export function isVueDefineDeclare(line = needParam(), nameRegStr = `(${defineKeywords.join("|")})`) {
  const keywordRegStr = `(const|var|let) +`;
  const newRegStr = `(${keywordRegStr}[${jsNameChar}]+ += +)?${nameRegStr}{1}`;
  return isDeclare(line, newRegStr);
}

/**
 * 获取该行的类型
 * @param {string} line 要处理的行字符串
 * @returns {""|"anno"|"ts"|'js'|"other"} 行的类型
 */
export function getLineType(line = needParam()) {
  if (line === "") return "";
  if (isJsKeywordsDeclare(line)) return "js";
  if (isTsKeywordsDeclare(line)) return "ts";
  if (isAnnotation(line)) return "anno";
  return "other";
}

/**
 * 获取Vue文件中的script部分
 * @param {string} readPath 要读取的vue文件
 * @param {boolean} noWrap 是否去壳，即：去掉边界字符串
 */
export function getVueScriptStr(readPath = needParam(), noWrap = true) {
  const [sChar, eChar] = ["<script", "</script"];
  const ext = path.extname(readPath);
  if (ext !== ".vue") throw new Error(`该文件不是vue文件：${readPath}`);
  const fullPath = path.join(process.cwd(), readPath);
  const fileStr = fs.readFileSync(fullPath, "utf8");
  const sReg = new RegExp(`^ *${sChar}[\\s\\S]+`);
  const eReg = new RegExp(`^ *${eChar}[\\s\\S]+`);
  const lines = fileStr.split(N);
  let isAtScript = false;
  const newLines = lines
    .map(item => {
      if (sReg.test(item)) {
        isAtScript = true;
        return noWrap ? undefined : item; // 此处还有标签跟其他文字同行的逻辑需要处理
      } else if (eReg.test(item)) {
        isAtScript = false;
        return noWrap ? undefined : item; // 此处还有标签跟其他文字同行的逻辑需要处理
      }
      if (!isAtScript) return;
      return item;
    })
    .filter(it => it !== undefined);
  return newLines.join(N);
}

/**
 * 获取Vue文件中的defineXxx类型的文本
 * @param {string} scriptStr script标签部分的文本字符串
 * @line 见如下 getResolveInfo("",false,true)
 */
// function getVueDefineFileStr(scriptStr = "") {
//   const lines = scriptStr.split(N);
//   let sum = 0;
//   let name = "";
//   let isAtInner = false;
//   const rows = [];
//   const mapRows = {};
//   lines.forEach(item => {
//     if (isAnnotation(item)) return;
//     if (isAtInner) return rows.push(item);
//     if (isVueDefineDeclare(item)) {
//       isAtInner = true;
//       rows.push(item);
//       const newNum = getBracesNum(item, sum);
//       const isEnd = newNum === 0;
//       if (isEnd) isAtInner = false;
//       const isFirstLine = sum === 0; //是否是第一行
//       if (isFirstLine) {
//         name = item.match(new RegExp(`(${defineKeywords.join("|")})`))?.[0];
//         const codeType = getDefineCodeType(item);
//       }
//     }
//     if (rows.length && !isAtInner) {
//       mapRows[name] = rows;
//       rows.length = 0;
//     }
//   });
//   return rows.join(N);
// }

/**
 * 获取 Ts 声明（待完善）
 * @param {string} scriptStr script标签部分的文本字符串
 */
function getTsDeclareStr(scriptStr = "") {
  const lines = scriptStr.split(N);
  let sum = 0;
  let isAtInner = false;
  const rows = [];
  lines.forEach(item => {
    if (isAnnotation(item)) return;
    if (isImportTypeDeclare(item)) return rows.push(item);
    if (isTsKeywordsDeclare(item)) {
      const name = item.match(/(type)|(interface)/)?.[0];
    }
    if (isAtInner) {
      sum = getBracesNum(item, sum) === 0;
      const isEnd = sum === 0;
      isAtInner = !isEnd;
      if (isEnd) return;
      return rows.push(item);
    }
    if (isTsKeywordsDeclare(item)) {
      isAtInner = true;
      rows.push(item);
      sum = getBracesNum(item, sum) === 0;
      const isEnd = sum === 0;
      if (isEnd) isAtInner = false;
    }
  });
  return rows.join(N);
}

/**
 * 获取下一次遇到其他不同本行类型的行下标
 * @param {string[]} rows 多行文本数据数组
 * @param {number} nextInd 下一行的下标
 * @parma {ts|arr|obj|["",""]} startType 刚开始查找时行文本的类型
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
    if (initSum) {
      initSum = getBracesNum(nextLine, initSum, startType);
      const isEnd = initSum === 0;
      if (isEnd) return nextInd;
      return getNearLineIndex(rows, ++nextInd, startType);
    } else if (fnSum) {
      fnSum = getBracesNum(nextLine, fnSum, startType);
      const isEnd = fnSum === 0;
      if (isEnd) return nextInd;
      return getNearLineIndex(rows, ++nextInd, startType);
    }
  } else {
    throw new Error(`暂未处理${t}类型`);
  }
}
/**
 * 提取出注释中的描述文字（过滤掉注释代码等）
 * @param {string} line 行文本数据
 */
function getAnnoDesc(line = "") {
  let str = "";
  if (/^ *\/\//.test(line)) {
    str = line.slice(2).trim();
  } else {
    const isDesc = !/ *(\/\*+)|(\*+ +@)|(\*+\/+)/.test(line);
    if (isDesc) str = line.replaceAll("*", "").trim();
  }
  if (str && !str.endsWith("。")) str += "。";
  return str;
}
/**
 * 合并注释处理
 * @param {string[]} lines 多行文本
 */
function getMergeAnnos(lines = []) {
  return lines
    .map(line => getAnnoDesc(line))
    .filter(it => !!it)
    .join("");
}

/**
 * 是否是代码注释行
 * @param {string} str 要检测的文本字符串
 */
function getIsCodeAnno(str = "") {
  const keywords = [...defineKeywords, ...jsKeywords];
  const regStr = `${keywords.join("|")}`;
  const reg = new RegExp(` *\\/\\/ *(${regStr}) *[\\s\\S]+`);
  return reg.test(str);
}

/**
 * 获取处理了注释之后的文件
 * @param {string} scriptStr  script标签部分的字符串
 * @param {boolean} isTrim 行文本字符串是否 trim
 */
export function getHandleAnnoFile(scriptStr = needParam(), isTrim = false) {
  const newLines = [];
  const annos = []; //多行注释累加
  let annoUntilInd = -1; //多行注释累加时直到第n行是注释截止行
  let isCodeAnno = false; //是否是代码注释
  const lines = scriptStr.split(N);
  lines.forEach((item, ind) => {
    let line = item.trim();
    if (annoUntilInd > ind) return annos.push(line);
    if (annoUntilInd === ind) {
      const mergeAnno = getMergeAnnos(annos);
      item += (line.includes("//") ? "" : "//") + mergeAnno;
      newLines.push(isTrim ? line : item);
      annos.length = 0;
      isCodeAnno = false;
      return;
    }
    const currType = getLineType(line);
    if (currType === "") return isTrim ? undefined : newLines.push(isTrim ? line : item);
    const isAnno = currType === "anno";
    if (isAnno) {
      // 要忽略掉代码注释，不是有效的描述文本
      if (!isCodeAnno) isCodeAnno = getIsCodeAnno(line);
      if (isCodeAnno) return;
      annos.push(line);
      const nearInd = getNearLineIndex(lines, ind + 1, "anno");
      if (nearInd > ind) annoUntilInd = nearInd;
      return;
    }
    newLines.push(isTrim ? line : item);
  });
  return newLines.join(N);
}

/**
 * 获取Vue defineXxx Api的边界字符串（将用它来作为边界开始和结束的依据）
 * @param {string} line 行文本字符串
 */
function getDefineBoundChars(line = needParam()) {
  const leftChars = line.match(/[<{\(][{\[]/)?.[0];
  const boundMap = {
    "<{": ["<", ">"],
    "([": ["[", "]"],
    "({": ["{", "}"],
  };
  return boundMap[leftChars];
}

/**
 * 获取vue defineXxx 的代码类型
 * @param {string} line 行文本数据
 */
export function getDefineCodeType(line = needParam()) {
  const leftChars = line.match(/[<{\(][{\[]/)?.[0];
  const codeTypeMap = {
    "<{": "ts",
    "([": "arr",
    "({": "obj",
  };
  const type = codeTypeMap[leftChars];
  if (!type) throw new Error(`暂未处理${type}类型`);
  return type;
}

/**
 * 获取表格的行数据
 * @param {{ name = "", type = "", desc = "", defVal = "", required = "" }} row 数据
 * @param {boolean} isAtMd 是否转成md标识英文的字符串
 */
export function getTableRow(row = needParam(), isAtMd = false) {
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
 * 获取推断的类型
 * @param {string} line 读取的行文本数据
 */
export function getInferredType(line = needParam()) {
  // const char = line.match(/,|'|"|`|\(|\[|\{/)?.[0];
  // if (!char) return;
  // 用下面的方法可以排除过滤掉注释后面的文字的查找
  const ind = getIndexIgnoreAnno(line, `,'"\`([{`);
  if (ind === -1) return;
  const char = line[ind];
  const colonInd = line.indexOf(":");
  if (char === ",") {
    if (colonInd !== -1 && colonInd < ind) return "Number";
    return "unknown";
  }
  if (char === "(") return "Function";
  if (char === "[") return "Array";
  if (char === "{") return "Object";
  if (['"', "`", "'"].includes(char)) return "String";
  throw new Error(`暂未处理符号为【${char}】不知类型的情况`);
}

/**
 * 从TS字符串中获取行数据
 * @param {string} line 行文本数据
 */
function getRowItemFromTs(line = needParam()) {
  const [keyVal, desc] = line.split("//").map(it => it.trim());
  const isDefineEmitsTs = line.startsWith("(");
  const colonInd = keyVal.indexOf(":");
  // 如果是defineEmits的TS类型，则需要单独处理
  if (isDefineEmitsTs) {
    const lastColonInd = keyVal.lastIndexOf(":");
    const commaInd = keyVal.indexOf(",");
    const name = keyVal
      .slice(colonInd + 1, commaInd)
      .replace(/'|"|`/g, "")
      .trim();
    const type = keyVal.slice(commaInd + 1, lastColonInd - 1).trim();
    return { name, type, desc };
  } else {
    const key = keyVal.slice(0, colonInd);
    const val = keyVal.slice(colonInd + 1);
    const required = key.at(-1) !== "?";
    const name = required ? key : key.slice(0, -1);
    const type = val.trim().replaceAll(";", "");
    return { name, type, desc, required };
  }
}

/**
 * 从数组字符串中获取行数据
 * @param {string} line 行文本数据
 */
function getRowItemFromArr(line = needParam()) {
  const commaInd = line.indexOf(",");
  const name = line.slice(0, commaInd).slice(1, -1);
  const desc = line
    .slice(commaInd + 1)
    .replace("//", "")
    .trim();
  return { name, desc };
}

/**
 * 从对象字符串中获取行数据
 * @param {string} line 行文本数据
 */
function getRowItemFromObj(line = needParam()) {
  const [keyVal, desc] = line.split("//").map(it => it.trim());
  const t = getInferredType(line);
  const splitIndexMap = {
    unknown: keyVal.indexOf(","),
    Function: getIndexIgnoreAnno(keyVal, ":("),
    Array: keyVal.indexOf(":"),
    String: keyVal.indexOf(":"),
    Number: keyVal.indexOf(":"),
  };
  const splitInd = splitIndexMap[t] ?? -1;
  if (splitInd === -1) throw new Error(`暂未处理${t}类型`);
  const name = keyVal.slice(0, splitInd);
  const type = `${t}${showTypeInferred ? "（类型推断）" : ""}`;
  return { name, desc, type };
}

/**
 * 获取表格数据
 * @param {string[]} 行文本数据
 * @param {ts|arr|obj} codeType 代码类型
 * @param {boolean} isAtMd 是否在md文件中展示，如果在，则需要进行部分代码转换
 */
function getTableRows(lines = [], codeType = needParam(), isAtMd = false) {
  return lines
    .map(line => {
      let item = null;
      if (codeType === "ts") {
        item = getRowItemFromTs(line);
      } else if (codeType === "arr") {
        item = getRowItemFromArr(line);
      } else if (codeType === "obj") {
        item = getRowItemFromObj(line);
      }
      if (!item) throw new Error(`暂未处理${codeType}类型`);
      return getTableRow(item, isAtMd);
    })
    .filter(it => !!it);
}

/**
 * 解析Vue文件的信息
 * @param {string} fileTrim  trim之后的文件字符串
 * @param {boolean} isAtMd  是否在md文件中展示
 * @param {boolean} isPushAll  是否将defineExpose内部，有多行代码的函数的中间代码块全部push进数组中
 */
export function getResolveInfo(fileTrim = "", isAtMd = false, isPushAll = false) {
  const allInfo = {
    props: [],
    emits: [],
    slots: [],
    expose: [],
  };
  const itemsInfo = {
    props: [],
    emits: [],
    slots: [],
    expose: [],
  };
  const lines = fileTrim.split(N);
  const regStr = `(${defineKeywords.join("|")})`;
  const reg = new RegExp(regStr);
  let name = "";
  let codeType = "";
  let defineLines = [];
  let defineUntilInd = -1; // Vue defineXxx 多行代码块
  let fnOrArrUntilInd = -1; // 函数或数组多行代码块
  lines.forEach((line, ind) => {
    if (defineUntilInd > ind) {
      if (isPushAll) return defineLines.push(line);
      if (fnOrArrUntilInd >= ind) return;
      const isFn = isObjectInnerFunction(line); // 是否是对象内部的函数
      const isArr = isObjectInnerArray(line); // 是否是对象内部的数组
      const isFnOrArr = isFn || isArr;
      if (!isFnOrArr) return defineLines.push(line);
      defineLines.push(line);
      const fnBoundChars = isFn ? ["{", "}"] : ["[", "]"];
      fnSum = getBracesNum(line, 0, fnBoundChars);
      if (fnSum !== 0) {
        fnOrArrUntilInd = getNearLineIndex(lines, ind + 1, fnBoundChars);
      }
      return;
    }
    if (defineUntilInd === ind) {
      if (isPushAll) return defineLines.push(line);
      itemsInfo[name] = getTableRows(allInfo[name], codeType, isAtMd);
      return;
    }
    const isDefine = isVueDefineDeclare(line);
    if (!isDefine) return;
    // 执行到这里，说明是每一个defineXxx片段的第一行
    name = camelCase(line.match(reg)?.[0].replace("define", ""));
    defineLines = allInfo[name];
    if (isPushAll) defineLines.push(line);
    codeType = getDefineCodeType(line);
    const boundChars = getDefineBoundChars(line);
    initSum = getBracesNum(line, 0, boundChars);
    // 如果缩写成了单行
    if (initSum == 0) {
      const regStr = `[<\\(\\{\\[]{2}[\\s\\S]+[\\]\\}\\)>]{2}`;
      const reg = new RegExp(regStr);
      const innerStr = line.match(reg)?.[0]?.trim().slice(2, -2); //单行中间包裹的字符串
      if (innerStr) {
        const splitChar = codeType === "ts" ? ";" : ",";
        const items = innerStr
          .split(splitChar)
          .map(it => {
            it = it.trim();
            if (it) it += splitChar;
            return it;
          })
          .filter(it => !!it);
        itemsInfo[name] = getTableRows(items, codeType, isAtMd);
        defineLines.push(...items);
      }
      return;
    }
    const nearInd = getNearLineIndex(lines, ind + 1, boundChars);
    if (nearInd > ind) defineUntilInd = nearInd;
  });
  return isPushAll ? allInfo : itemsInfo;
}

/**
 * 将Vue文件中的defineXxx解析为渲染表格时需要的rows数据
 */
export function getDefineRowsMap(readPathHalf = needParam(), isAtMd = false) {
  const vueStr = getVueScriptStr(readPathHalf);
  const trimFile = getHandleAnnoFile(vueStr, true);
  return getResolveInfo(trimFile, isAtMd);
}
