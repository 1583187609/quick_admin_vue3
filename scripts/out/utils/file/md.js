import fs from "fs";
import path from "path";
import { getTsItemsFromVueProps, writeFileSync } from ".";
import { getVueFileInfo } from "./vue.js";
import { docsPath } from "../consts.js";
import { getFileName } from "../../index.js";

/**
 * 将字符串中的html字符串、英文单词、短语、句子等，用``打上md的标识
 */
const tempReg = /((\b\w+\b)([,: ]+(\b\w+\b))*[!,. ]*)+|(\b\w+\b)|(<[^>]*\/>)|(<[^>]+>.*?<\/[^>]+>)|(`[^`]+`)/g;
export function getWithTagStr(str = "", reg = tempReg) {
  if (!str) return "";
  return str.replace(reg, match => {
    // 判断是否已经包裹在反引号中，如果已经包裹，则不再处理
    if (match.startsWith("`") && match.endsWith("`")) return match;
    return `\`${match}\``;
  });
}

/**
 * 获取描述类md文本
 * @param {*} descs
 * @returns
 */
// 示例
// const tempDescs = {
//   tip: "这是tip消息",
//   warning: "这是warning消息",
//   danger: "这是danger消息",
//   details: "这是details消息",
// };
function getDescs(descs) {
  if (!descs) return "";
  let descStr = "";
  for (const key in descs) {
    const val = getWithTagStr(descs[key]);
    descStr += `\n\n::: ${key}\n${val}\n:::\n`;
  }
  return descStr;
}

/**
 * 文档前言
 * @param {string} filePath 文件路径
 * @param {string} rowsRange 选择某些指定行 例：{5,10}
 */
function getMdFile(filePath = "/examples/form", rowsRange = "") {
  return `<!-- @include: ../..${filePath}/ReadMe.md${rowsRange} -->`;
}

/**
 * 生成代码示例
 * @link 参考链接：https://juejin.cn/post/7243520456979398693
 * @link 参考链接：https://zhuanlan.zhihu.com/p/450698973
 * @notice 完整路径：/examples/form/InlineForm
 * @returns
 */
function getCodeDemo(dirPath = "form") {
  const newDirPath = path.join(process.cwd(), "examples", dirPath);
  let mdStr = "";
  const readFiles = fs.readdirSync(newDirPath).filter(it => it !== "ReadMe.md");
  readFiles.forEach(file => {
    const curPath = path.join(newDirPath, file);
    const isDir = fs.lstatSync(curPath).isDirectory();
    if (isDir) throw new Error("暂未处理文件夹情况");
    const filePath = `${dirPath}/${file.slice(0, -4)}`;
    const { info } = getVueFileInfo(`${path.join(newDirPath, file)}`);
    const { title = getFileName(file, "cn"), description = "", descs } = info;
    mdStr += `
  ## ${title}
  ::: demo ${description}
  ${filePath}
  :::\n${getDescs(descs)}\n\n`;
  });
  return mdStr;
}

/**
 * 获取表格的md文本
 * @param {ColItem[]} cols  列数据（数组）
 * @param {CommonObj[]} rows  表格数据
 */
// 默认的列属性
const defaultColAttrs = {
  align: "center",
  width: 10,
  minWidth: 10,
};
// 示例
const tempCols = [
  { prop: "xm", label: "姓名", width: 0, minWdth: 0, align: "center" },
  { prop: "xb", label: "性别", width: 0, minWdth: 0, align: "center" },
  { prop: "nl", label: "年龄", width: 0, minWdth: 0, align: "center" },
  { prop: "bz", label: "备注", width: 0, minWdth: 0, align: "left" },
];
const tempRows = [
  { xm: "张三", xb: "男", nl: 25, bz: "无" },
  { xm: "李四", xb: "男", nl: 32, bz: "无" },
  { xm: "王五", xb: "男", nl: 19, bz: "无" },
  { xm: "李梅", xb: "女", nl: 18, bz: "这是一条备注信息" },
];
export function getTable(cols = tempCols, rows = tempRows) {
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
  let tableStr = headStrs.join("\n");
  // if (!rows?.length) {
  //   const row = {};
  //   props.forEach(prop => (row[prop] = "-"));
  //   rows = [row];
  // }
  rows.forEach(row => {
    const rowStr = `|${props.map(prop => row[prop]).join("|")}|`;
    tableStr += `\n${rowStr}`;
  });
  return tableStr;
}

/**
 * 获取指定类型表格的md文本
 * @param {props|method|event|slot} type 表格类型：属性、方法、事件、插槽
 * @param {*} rows 表格数据
 * @returns
 */
const tableTypeMap = {
  props: {
    title: "属性",
    cols: [
      { prop: "name", label: "属性" },
      { prop: "desc", label: "说明" },
      { prop: "type", label: "类型" },
      { prop: "default", label: "默认值" },
    ],
  },
  method: {
    title: "方法",
    cols: [
      { prop: "name", label: "方法名" },
      { prop: "desc", label: "说明" },
      { prop: "type", label: "类型" },
    ],
  },
  event: {
    title: "事件",
    cols: [
      { prop: "name", label: "事件名称" },
      { prop: "desc", label: "说明" },
      { prop: "cbArgs", label: "回调参数" },
    ],
  },
  slot: {
    title: "插槽",
    cols: [
      { prop: "name", label: "插槽名" },
      { prop: "desc", label: "说明" },
      { prop: "subTag", label: "子标签" },
    ],
  },
};
export function getTypeTable(type = "props", rows = [], descs) {
  const { title, cols } = tableTypeMap[type];
  let descStr = getDescs(descs);
  let mdStr = `### ${title}\n\n${getTable(cols, rows, descs)}${descStr}\n\n`;
  return mdStr;
}

/**
 * 获取API部分的md内容
 */
const tempApis = [
  {
    type: "props",
    //读取属性的来源文件
    source: {
      name: "", //读取文件中的props
      filePath: "/src/components/form/BaseForm.vue",
    },
    descs: { tip: "这是tip消息" },
  },
  { type: "method", source: { name: "", filePath: "" }, descs: { warning: "这是warning消息" } },
  {
    type: "event",
    source: { name: "", filePath: "" },
    descs: {
      tip: "这是tip消息",
      warning: "这是warning消息",
      danger: "这是danger消息",
      details: "这是details消息",
    },
  },
  { type: "slot", source: { name: "", filePath: "" } },
];
export function getAPI(apis = tempApis, title = "API") {
  let mdStr = `## ${title}\n\n`;
  apis.forEach(api => {
    const { type, source, descs } = api;
    const { name, filePath } = source;
    let rows = [];
    if (type === "props") rows = getTsItemsFromVueProps(filePath, true);
    if (!rows.length) return;
    mdStr += getTypeTable(type, rows, descs);
  });
  return `${mdStr}\n\n`;
}

/**
 * 获取Ts类型
 */
export function getTypeScript(filePath = "/src/components/form/_types.ts") {
  let mdStr = `## 类型声明
::: details
<<< ${process.cwd()}${filePath}
:::  
\n`;
  return mdStr;
}

/**
 * 写入（生成）Md文档文件
 * @param {string} readPath 要读取的文件路径
 * @param {string} writePath 要写入的文件路径
 * @param {number} order 文件的序号
 */
export function writeMdDoc(readPath = "/examples/form", writePath = `${docsPath}/5_测试_test`, order = 1) {
  readPath = path.join(process.cwd(), readPath, "ReadMe.md");
  let fileStr = fs.readFileSync(readPath, "utf-8");
  const title = fileStr.split("\n")[0]?.replaceAll("#", "")?.trim() ?? "无标题";
  const api = getAPI(tempApis);
  const codeDemo = getCodeDemo();
  const ts = getTypeScript();
  fileStr += `\n\n${codeDemo}\n\n${api}${ts}`;
  writeFileSync(path.join(process.cwd(), `${writePath}/${order}_${title}.md`), fileStr);
}
