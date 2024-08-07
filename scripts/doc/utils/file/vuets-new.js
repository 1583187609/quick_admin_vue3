import { N, needParam, typeOf, getAtMdStr, getBracesNum, getIndexIgnoreAnno, unknownChar } from "../../utils/index.js";

let initSum = 0;
let fnSum = 0;
let publicSum = 0;
let infaSum = 0;
let codeAnnoSum = 0;
let expandSum = 0;

const jsNameChar = `A-Za-z_0-9$`; //js命名可用的字符
const defineKeywords = ["defineProps", "defineEmits", "defineSlots", "defineExpose"];
const jsKeywords = ["const", "var", "let", "function"]; //js关键词
const tsKeywords = ["type", "interface"]; //ts关键词

/**
 * 是否是声明行
 */
export function isDeclare(line = needParam(), nameRegStr = needParam(), isLog = false) {
  const reg = new RegExp(`^ *${nameRegStr}[\\s\\S]*`);
  const isTrue = reg.test(line);
  if (isLog) console.log(line, reg, isTrue, "str,reg-source--------------");
  return isTrue;
}

/**
 * 是否是导入ts的type行
 */
export function isImportDeclare(line = needParam()) {
  return isDeclare(line, `import[\\s\\S]*`);
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
  return isDeclare(line, `(export +)*type +[\\s\\S]+ *= *`);
}

/**
 * 是否是 interface 导入行
 */
export function isInterfaceDeclare(line = needParam()) {
  return isDeclare(line, `(export +)*interface +[\\s\\S]+ *\\{`);
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
  const keywordRegStr = `(${tsKeywords.join("|")}) +`;
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
export function isVueDefineDeclare(line = needParam(), nameRegStr = `(${defineKeywords.join("|")})`, withDefVals = true) {
  const keywordRegStr = `(const|var|let) +`;
  const newRegStr = `(${keywordRegStr}[${jsNameChar}]+ += +)?${nameRegStr}{1}`;
  if (!withDefVals) return isDeclare(line, newRegStr);
  return isDeclare(line, newRegStr) || line.includes("withDefaults");
}

/**
 * 获取该行的类型
 * @param {string} line 要处理的行字符串
 * @returns {""|"anno"|"ts"|'js'|"other"} 行的类型
 */
export function getLineType(line = needParam()) {
  if (line.trim() === "") return "";
  if (isJsKeywordsDeclare(line)) return "js";
  if (isTsKeywordsDeclare(line)) return "ts";
  if (isAnnotation(line)) return "anno";
  return "other";
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
    } else if (infaSum) {
      infaSum = getBracesNum(nextLine, infaSum, startType);
      const isEnd = infaSum === 0;
      if (isEnd) return nextInd;
      return getNearLineIndex(rows, ++nextInd, startType);
    } else if (codeAnnoSum) {
      codeAnnoSum = getBracesNum(nextLine, codeAnnoSum, startType);
      const isEnd = codeAnnoSum === 0;
      if (isEnd) return nextInd;
      return getNearLineIndex(rows, ++nextInd, startType);
    } else if (expandSum) {
      expandSum = getBracesNum(nextLine, expandSum, startType);
      const isEnd = expandSum === 0;
      if (isEnd) return nextInd;
      return getNearLineIndex(rows, ++nextInd, startType);
    } else {
      publicSum = getBracesNum(nextLine, publicSum, startType);
      const isEnd = publicSum === 0;
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
  const keywords = [...defineKeywords, ...jsKeywords, "import", "export", ...tsKeywords];
  const regStr = `${keywords.join("|")}`;
  const reg = new RegExp(` *\\/\\/ *(${regStr}) *[\\s\\S]+`);
  return reg.test(str);
}

/**
 * 获取新行
 */
function getNewImportTypeLine(line = needParam()) {
  if (/^ *import +type +[\s\S]+/.test(line)) return line;
  const splitChar = " from ";
  const [frontStr, behindStr] = line.split(splitChar);
  const sInd = line.indexOf("{") + 1;
  const eInd = getIndexIgnoreAnno(line, "}", true);
  const sliceStr = frontStr
    .trim()
    .slice(sInd, eInd)
    .split(",")
    .filter(it => /^ *type +/.test(it))
    .map(it => it.replace("type", "").trim())
    .join(", ");
  if (!sliceStr) return "";
  return `import type {${sliceStr}}${splitChar}${behindStr}`;
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
 * 获取Vue defineXxx Api的边界字符串（将用它来作为边界开始和结束的依据）
 * @param {string} line 行文本字符串
 */
function getDefineBoundChars(line = "") {
  const starChars = "<([{";
  const endChars = ">)]}";
  const charInd = getIndexIgnoreAnno(line, starChars);
  if (charInd === -1) return "";
  const sChar = line[charInd];
  const eChar = endChars[starChars.indexOf(sChar)];
  return [sChar, eChar];
}

/**
 * 获取处理了注释之后的文件
 * @param {string} scriptStr  script标签部分的字符串
 * @param {boolean} isTrim 行文本字符串是否 trim
 */
const cfgMap = {
  ts: {
    isTrim: false,
    isMergeAnno: false,
    isClearBlankLine: false,
    onlySave: "ts",
  },
  clear: {
    isTrim: true,
    isMergeAnno: true,
    isClearBlankLine: true,
  },
  define: {
    isTrim: true,
    isMergeAnno: true,
    isClearBlankLine: true,
    onlySave: "define",
  },
  origin: {
    isTrim: false,
    isMergeAnno: false,
    isClearBlankLine: false,
  },
};
const defaultCfg = {
  isTrim: false, //是否trim() 行的两边
  isClearBlankLine: false, //是否清除空行
  isMergeAnno: false, //是否合并注释
  onlySave: "", //只保留defineXxx 定义的行文本。可选值：'ts', 'define', ""
  nN: N, // 换行符
};
const splitDefineChar = "====================";
export function getPartStrFromVueScript(scriptStr = needParam(), name = "origin") {
  const cfg = { ...defaultCfg, ...(cfgMap[name] ?? {}) };
  const {
    isTrim = false, //是否trim() 行的两边
    isClearBlankLine = false, //是否清除空行
    isMergeAnno = false, //是否合并注释
    onlySave = "", //只保留defineXxx 定义的行文本。可选值：'ts', 'define', ""
    nN = N, // 换行符
  } = cfg;

  const isOnlySaveDefine = onlySave === "define"; //是否只保留defineXxx 定义的行文本
  const isOnlySaveTs = onlySave === "ts"; //是否只保留 Ts 类型行文本
  const newLines = [];
  const annos = []; //多行注释累加
  let annoUntilInd = -1; //多行注释累加时直到第n行是注释截止行
  let defUntilInd = -1; // defineXxx api 的 until 下标
  let infaUntilInd = -1; // ts interface 的 until 下标
  let existImportUntilInd = -1; //是否在 import 内部
  let codeAnnoUntilInd = -1; //代码注释块
  let multiAnnoUntilInd = -1;
  let isAtType = false; //是否在多行type的内部
  const lines = scriptStr.split(N);
  lines.forEach((item, ind) => {
    let line = item.trim();
    const currType = getLineType(line);
    if (multiAnnoUntilInd >= ind) {
      if (multiAnnoUntilInd === ind) multiAnnoUntilInd = -1;
      return newLines.push(isTrim ? line : item);
    }
    if (currType === "") {
      if (isClearBlankLine) return;
      return newLines.push(isTrim ? line : item);
    }
    if (isMergeAnno) {
      if (annoUntilInd > ind) {
        if (annoUntilInd === ind) annoUntilInd = -1;
        return annos.push(isTrim ? line : item);
      }
      if (annoUntilInd === ind) {
        const existSingleAnno = line.includes("//");
        let mergeAnno = getMergeAnnos(annos);
        annos.length = 0;
        if (mergeAnno) {
          mergeAnno = (existSingleAnno ? "" : "//") + mergeAnno;
          line += mergeAnno;
          item += mergeAnno;
        }
      }
      const isAnno = currType === "anno";
      if (isAnno) {
        const isCodeAnno = getIsCodeAnno(line);
        if (isCodeAnno) return; // 要忽略掉代码注释，没有有效的描述文本
        annos.push(isTrim ? line : item);
        const nearInd = getNearLineIndex(lines, ind + 1, "anno");
        if (nearInd > ind) annoUntilInd = nearInd;
        return;
      }
    }
    if (isOnlySaveDefine) {
      if (defUntilInd >= ind) {
        newLines.push(isTrim ? line : item);
        if (defUntilInd === ind) {
          defUntilInd = -1;
          splitDefineChar && newLines.push(splitDefineChar);
        }
        return;
      }
      const isDefine = isVueDefineDeclare(line);
      if (!isDefine) return;
      const boundChars = getDefineBoundChars(line);
      publicSum = getBracesNum(line, publicSum, boundChars);
      const nearInd = getNearLineIndex(lines, ind + 1, boundChars);
      if (nearInd > ind) defUntilInd = nearInd;
      newLines.push(isTrim ? line : item);
      if (nearInd === ind + 1) {
        splitDefineChar && newLines.push(splitDefineChar);
      }
      return;
    }
    if (isOnlySaveTs) {
      if (existImportUntilInd >= ind) {
        if (existImportUntilInd === ind) existImportUntilInd = -1;
        return;
      }
      if (infaUntilInd >= ind) {
        if (infaUntilInd === ind) infaUntilInd = -1;
        return newLines.push(isTrim ? line : item);
      }
      if (isAtType) {
        if (getTypeIsEnd(line)) isAtType = false;
        return newLines.push(isTrim ? line : item);
      }
      const isImport = isImportDeclare(line);
      if (isImport) {
        const boundChars = ["{", "}"];
        infaSum = getBracesNum(line, infaSum, boundChars);
        const isSingle = infaSum === 0;
        if (isSingle) {
          const isImportType = !!getNewImportTypeLine(line);
          if (!isImportType) return;
          return newLines.push(isTrim ? line : item);
        }
        // 此处是多行
        const nearInd = getNearLineIndex(lines, ind + 1, boundChars); //待完善
        const endInd = nearInd + 1;
        const sliceLines = lines.slice(ind, endInd);
        const imprTypeLine = getNewImportTypeLine(sliceLines.join(""));
        // 说明是import type
        if (imprTypeLine) {
          existImportUntilInd = endInd;
          return newLines.push(imprTypeLine);
        } else {
          if (nearInd > ind) infaUntilInd = nearInd;
          return newLines.push(isTrim ? line : item);
        }
      }
      const isTsDeclare = isTsKeywordsDeclare(line);
      if (isTsDeclare) {
        if (isInterfaceDeclare(line)) {
          const boundChars = ["{", "}"];
          infaSum = getBracesNum(line, infaSum, boundChars);
          const isEnd = infaSum === 0;
          if (!isEnd) {
            const nearInd = getNearLineIndex(lines, ind + 1, boundChars); //待完善
            infaUntilInd = nearInd;
          }
        } else {
          const isEnd = getTypeIsEnd(line);
          if (!isEnd) isAtType = true;
        }
        return newLines.push(isTrim ? line : item);
      }
      const isAnno = isAnnotation(line);
      if (isAnno) {
        if (codeAnnoUntilInd >= ind) {
          if (codeAnnoUntilInd === ind) codeAnnoUntilInd = -1;
          return;
        }
        const isCodeAnno = getIsCodeAnno(line);
        if (isCodeAnno) {
          const boundChars = getDefineBoundChars(line);
          codeAnnoSum = getBracesNum(line, codeAnnoSum, boundChars, false);
          if (codeAnnoSum === 0) return;
          const nearInd = getNearLineIndex(lines, ind + 1, boundChars, false);
          if (nearInd > ind) codeAnnoUntilInd = nearInd;
          return;
        }

        const isMultiAnno = /^ *\/\*+$/.test(line);
        //是否是多行注释
        if (isMultiAnno) {
          const nearInd = getNearLineIndex(lines, ind + 1, "anno");
          const nearLine = lines[nearInd];
          const isTsDeclare = isTsKeywordsDeclare(nearLine);
          if (!isTsDeclare) return;
          multiAnnoUntilInd = nearInd;
          return newLines.push(isTrim ? line : item);
        } else {
          const isSingleAnno = /^ *\/\/[\s\S]+/.test(line);
          if (!isSingleAnno) return;
          const nearLine = lines[ind + 1];
          if (isTsKeywordsDeclare(nearLine) || isImportTypeDeclare(nearLine)) return newLines.push(isTrim ? line : item);
        }
      }
      return;
    }
    newLines.push(isTrim ? line : item);
  });
  return newLines.join(nN);
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

// const vueStr = getVueScriptStr(mockVueFile);
// const originStr = getPartStrFromVueScript(vueStr);
// const clearStr = getPartStrFromVueScript(vueStr, "clear");
// const defineStr = getPartStrFromVueScript(vueStr, "define");
// const tsStr = getPartStrFromVueScript(vueStr, "ts");
// console.log(tsStr);
