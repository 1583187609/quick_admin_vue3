import path from "path";
import { N, readMeName } from "../consts";
import { needParam } from "../base";
import { getTsDeclareFromVueFile } from "./vue";

/**
 * 获取（计算出）md文档标识需要的正则表达式
 */
// 下列依次为：匹配Ts的箭头函数、BaseBtnType[]、
const specialRegStrs = [`\\([\\s\\S]*\\) *(=>){1} *[\\s\\S]+`, `\\w+\\[\\]`];
const tempRegStr = `((\\b\\w+\\b)([,: -~\\|]+(\\b\\w+\\b))*[!,. ]*)+|(\\b\\w+\\b)|(<[^>]*/>)|(<[^>]+>.*?</[^>]+>)|(\`[^\`]+\`)`;
function getMdRegexp() {
  const regStr = specialRegStrs.map(it => `(${it})`).join("|") + `|${tempRegStr}`;
  return new RegExp(regStr, "g");
}

/**
 * 将字符串中的html字符串、英文单词、短语、句子等，用``打上md的标识
 * @param {string} str 要处理的字符串
 */
const mdReg = getMdRegexp(); //提取出来就不用每次都重新计算了
export function getAtMdStr(str = "") {
  if (!str) return "";
  if (str === "-") return str;
  return str.replace(mdReg, match => {
    // 判断是否已经包裹在反引号中，如果已经包裹，则不再处理
    if (match.startsWith("`") && match.endsWith("`")) return match;
    return `\`${match}\``;
  });
}

/**
 * 文档前言
 * @param {string} filePath 文件路径。例："/demos/2_表单_form/1_BaseForm 基础表单"
 * @param {string} rowsRange 选择某些指定行 例：{5,10}
 */
export function getMdFileByPath(filePath = needParam(), rowsRange = "") {
  return `<!-- @include: ../..${filePath}/${readMeName}${rowsRange} -->`;
}

/**
 * 获取Ts类型
 * @param {string} filePath 要读取文件的路径。例："/src/components/form/_types.ts"
 */
export function getTsTypeDeclare(filePath = needParam()) {
  if (!filePath) return "";
  let contStr = "";
  const ext = path.extname(filePath);
  if (ext === ".ts") {
    contStr = `<<< ${process.cwd()}${filePath}`;
  } else if (ext === ".vue") {
    const scriptStr = getTsDeclareFromVueFile(filePath);
    contStr = `${toCodeBlock(scriptStr, "ts")}`;
  } else {
    throw new Error(`暂未处理${ext}类型文件`);
  }
  const mdStr = `## 类型声明
::: details
${contStr}
:::  
`;
  return mdStr;
}

/**
 * 获取表格的md文本
 * @param {ColItem[]} cols  列数据（数组）
 * @param {CommonObj[]} rows  表格数据
 */
// 默认的列属性
const defaultColAttrs = {
  align: "left",
  width: 10,
  minWidth: 10,
};
// 示例
// const tempCols = [
//   { prop: "xm", label: "姓名", width: 0, minWidth: 0, align: "center" },
//   { prop: "xb", label: "性别", width: 0, minWidth: 0, align: "center" },
//   { prop: "nl", label: "年龄", width: 0, minWidth: 0, align: "center" },
//   { prop: "bz", label: "备注", width: 0, minWidth: 0, align: "left" },
// ];
// const tempRows = [
//   { xm: "张三", xb: "男", nl: 25, bz: "无" },
//   { xm: "李四", xb: "男", nl: 32, bz: "无" },
//   { xm: "王五", xb: "男", nl: 19, bz: "无" },
//   { xm: "李梅", xb: "女", nl: 18, bz: "这是一条备注信息" },
// ];
export function getTable(cols = needParam(), rows = []) {
  const props = [];
  const headStrs = ["", ""].map((item, ind) => {
    const newCols = cols.map(col => {
      const { prop, label, ...restAttrs } = col;
      const { width, minWidth, align } = { ...defaultColAttrs, ...restAttrs };
      if (ind === 0) {
        props.push(prop);
        return label;
      }
      let str = ":---:";
      if (align === "left") str = str.slice(0, -1);
      else if (align === "right") str = str = str.slice(1);
      return str;
    });
    return `|${newCols.join("|")}|`;
  });
  let tableStr = headStrs.join(N);
  // if (!rows?.length) {
  //   const row = {};
  //   props.forEach(prop => (row[prop] = "-"));
  //   rows = [row];
  // }
  rows.forEach(row => {
    const rowStr = `|${props.map(prop => row[prop]).join("|")}|`;
    tableStr += `${N}${rowStr}`;
  });
  return tableStr;
}

/**
 * 将代码推进代码块中
 * @param {string} code 代码字符串
 * @param {js|ts|md|css|……} type 代码块类型
 */
export function toCodeBlock(code, type = "md") {
  if (!type) return code;
  if (type)
    return `
\`\`\` ${type}
${code}
\`\`\`
`;
}
