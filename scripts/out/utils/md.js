import path from "path";
import fs from "fs";
import { resolveVueFile, writeFileSync } from "./file";
import { docsPath } from "./consts";

/**
 * 获取描述类md文本
 * @param {*} descs
 * @returns
 */
// 示例
const tempDescs = {
  tip: "这是tip消息",
  warning: "这是warning消息",
  danger: "这是danger消息",
  details: "这是details消息",
};
function getDescs(descs) {
  if (!descs) return "";
  let descStr = "";
  for (const key in descs) {
    descStr += `\n\n::: ${key}\n${descs[key]}\n:::\n`;
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
function getCodeDemo(filePath = "form/InlineForm", h2) {
  const { info } = resolveVueFile(`${path.join(process.cwd(), "examples", `${filePath}.vue`)}`);
  const { title = h2 ?? filePath.split("/").at(-1), description = "", descs } = info;
  let mdStr = `
## ${title}
::: demo ${description}
${filePath}
:::\n`;
  return `${mdStr}${getDescs(descs)}`;
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
export function getTable(cols = tempCols, rows = tempRows, descs) {
  const props = [];
  const headStrs = ["", ""].map((item, ind) => {
    const newCols = cols.map(col => {
      const { prop, label, ...restAttrs } = col;
      const { width, minWdth, align } = { ...defaultColAttrs, ...restAttrs };
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
  if (!rows?.length) {
    const row = {};
    props.forEach(prop => (row[prop] = "-"));
    rows = [row];
  }
  rows.forEach(row => {
    const rowStr = `|${props.map(prop => row[prop]).join("|")}|`;
    tableStr += `\n${rowStr}`;
  });
  return tableStr;
}

/**
 * 获取指定类型表格的md文本
 * @param {attrs|method|event|slot} type 表格类型：属性、方法、事件、插槽
 * @param {*} rows 表格数据
 * @returns
 */
const tableTypeMap = {
  attrs: {
    title: "属性",
    cols: [
      { prop: "prop", label: "属性" },
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
export function getTypeTable(type = "attrs", rows = [], descs) {
  const { title, cols } = tableTypeMap[type];
  let descStr = getDescs(descs);
  let mdStr = `### ${title}\n\n${getTable(cols, rows, descs)}${descStr}\n\n`;
  return mdStr;
}

/**
 * 获取API部分的md内容
 */
export function getAPI(
  apis = [
    {
      type: "attrs",
      rows: [],
      descs: { tip: "这是tip消息" },
    },
    { type: "method", rows: [], descs: { warning: "这是warning消息" } },
    {
      type: "event",
      rows: [],
      descs: {
        tip: "这是tip消息",
        warning: "这是warning消息",
        danger: "这是danger消息",
        details: "这是details消息",
      },
    },
    { type: "slot", rows: [] },
  ],
  title = "API"
) {
  let mdStr = `## ${title}\n\n`;
  apis.forEach(api => {
    const { type, rows, descs } = api;
    mdStr += getTypeTable(type, rows, descs);
  });
  return `${mdStr}\n\n`;
}

/**
 * 获取Ts类型
 */
export function getTypeScript(filePath = "/src/config/_types.ts") {
  let mdStr = `## 类型声明
::: details
<<< ${process.cwd()}${filePath}
:::  
\n`;
  return mdStr;
}

/**
 * 获取整篇md文档
 * @returns
 */
export function getDocs(dirPath = "/examples/form", title = "文档示例") {
  let api = getAPI();
  let codeDemo = getCodeDemo();
  let ts = getTypeScript();
  return `\n\n${codeDemo}\n\n${api}${ts}`;
}

/**
 * 写入（生成）Md文档文件
 * @param {string} readPath 要读取的文件路径
 * @param {string} writePath 要写入的文件路径
 * @param {number} order 文件的序号
 */
export function writeMdDoc(readPath = "/examples/form", writePath = `${docsPath}/5_测试_test`, order = 1) {
  let fileStr = fs.readFileSync(path.join(process.cwd(), readPath, "ReadMe.md"), "utf-8");
  const title = fileStr.split("\n")[0]?.replaceAll("#", "")?.trim() ?? "无标题";
  fileStr += getDocs();
  writeFileSync(path.join(process.cwd(), `${writePath}/${order}_${title}.md`), fileStr);
}
