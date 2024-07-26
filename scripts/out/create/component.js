/**
 * 生成组件说明文档
 */

import fs from "fs";
import path from "path";
import {
  docsPath,
  emptyVals,
  getFileName,
  getTable,
  getTypeDeclare,
  getVueFileInfo,
  getWithTagStr,
  needParam,
  readMeName,
  splitOrderChar,
  writeFileSync,
  getItemsFromTsStr,
} from "../utils";

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
export function getHints(descs) {
  if (!descs) return "";
  let descStr = "";
  for (const key in descs) {
    const val = getWithTagStr(descs[key]);
    descStr += `\n\n::: ${key}\n${val}\n:::\n`;
  }
  return descStr;
}

/**
 * 生成代码示例
 * @param {string} readPath 读取文件的路径 例："/examples/form"
 * @link 参考链接：https://juejin.cn/post/7243520456979398693
 * @link 参考链接：https://zhuanlan.zhihu.com/p/450698973
 * @notice 完整路径：/examples/form/InlineForm
 * @returns
 */
function getCodeDemo(readPath) {
  if (!readPath) return "";
  const dirPath = path.join(process.cwd(), readPath);
  let mdStr = "";
  const readFiles = fs.readdirSync(dirPath).filter(it => it !== `${readMeName}.md`);
  readFiles.forEach(file => {
    const curPath = path.join(dirPath, file);
    const isDir = fs.lstatSync(curPath).isDirectory();
    if (isDir) throw new Error("暂未处理文件夹情况");
    const subPath = readPath.split("/").slice(2).join("/");
    const filePath = `${subPath}/${file.slice(0, -4)}`;
    const { info } = getVueFileInfo(`${path.join(dirPath, file)}`);
    const { title = getFileName(file, "cn"), description = "", descs } = info;
    mdStr += `
## ${title}
::: demo ${description}
${filePath}
:::\n${getHints(descs)}\n\n`;
  });
  return mdStr;
}

/**
 * 获取指定类型表格的md文本
 * @param {props|method|event|slot} type 表格类型：属性、方法、事件、插槽
 * @param {*} rows 表格数据
 * @returns
 */
export const tableTypeMap = {
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
export function getTypeTable(type = "props", rows = [], descs, customTitle) {
  const { title, cols } = tableTypeMap[type];
  const titleStr = customTitle ?? `### ${title}\n\n`;
  let descStr = getHints(descs);
  let mdStr = `${titleStr}${getTable(cols, rows, descs)}${descStr}\n\n`;
  return mdStr;
}

/**
 * 获取API部分的md内容
 */
const tempApis = [
  {
    type: "props",
    rows: [], // getRowsOfProps("/src/components/form/BaseForm.vue", true),
    descs: { tip: "这是tip消息" },
  },
  { type: "method", descs: { warning: "这是warning消息" } },
  {
    type: "event",
    descs: {
      tip: "这是tip消息",
      warning: "这是warning消息",
      danger: "这是danger消息",
      details: "这是details消息",
    },
  },
  { type: "slot" },
];
function getAPI(apis, title = "API") {
  if (!apis?.length) return "";
  let mdStr = `## ${title}\n\n`;
  apis.forEach(api => {
    const { type, rows, descs } = api;
    if (!rows?.length) return;
    mdStr += getTypeTable(type, rows, descs);
  });
  return `${mdStr}\n\n`;
}

/**
 * 写入（生成）组件说明文档文件
 * @param {string} readPath 要读取的文件路径。例："/examples/form"
 * @param {string} writePath 要写入的文件路径。例：`${docsPath}/4_示例_demo/2_文档生成_create`
 * @param {object} sections 分块内容
 * @param {number} order 文件的序号（用于文件目录中的位置排序）
 * @advice 方法名建议 writeComponentDoc
 */
const tempSecs = {
  demoDirPath: "/examples/form",
  apis: tempApis,
  tsPath: "/src/components/form/_types.ts",
};
export default (readPath = needParam(), writePath = needParam(), sections, order) => {
  readPath = path.join(process.cwd(), readPath, `${readMeName}.md`);
  let fileStr = fs.readFileSync(readPath, "utf-8");
  const title = fileStr.split("\n")[0]?.replaceAll("#", "")?.trim() ?? "无标题";
  if (sections) {
    const { demoDirPath, apis, tsPath } = sections;
    const codeDemo = getCodeDemo(demoDirPath);
    const api = getAPI(apis);
    const tsStr = getTypeDeclare(tsPath);
    fileStr += `\n\n${codeDemo}${api}${tsStr}`;
  }
  let fileName = `${title}.md`;
  if (!emptyVals.includes(order)) fileName = `${order}${splitOrderChar}${fileName}`;
  writeFileSync(path.join(process.cwd(), writePath, fileName), fileStr);
};

/**
 * 获取API-属性-表格-行数据（rows）
 * @param {string} readPath 读取文件的路径 例："/src/components/form/BaseForm.vue"
 * @param {boolean} isAtMd 是否处在md文档中
 */
export function getRowsOfProps(readPath = needParam(), isAtMd = false) {
  readPath = path.join(process.cwd(), readPath);
  const regex = /<{([^}]+)}>/;
  const fileStr = fs.readFileSync(readPath, "utf-8");
  const matchStr = fileStr.match(regex)?.[0];
  return getItemsFromTsStr(matchStr.slice(2, -2), isAtMd);
}

/**
 *
 * @returns 获取API-方法-表格-行数据（rows)
 */
export function getRowsOfMethod() {
  const { cols } = tableTypeMap.method;
  const row = {};
  cols.forEach(({ prop }) => {
    row[prop] = "-";
  });
  return [row];
}

/**
 *
 * @returns 获取API-事件-表格-行数据（rows)
 */
export function getRowsOfEvent() {
  const { cols } = tableTypeMap.event;
  const row = {};
  cols.forEach(({ prop }) => {
    row[prop] = "-";
  });
  return [row];
}

/**
 *
 * @returns 获取API-插槽-表格-行数据（rows)
 */
export function getRowsOfSlot() {
  const { cols } = tableTypeMap.slot;
  const row = {};
  cols.forEach(({ prop }) => {
    row[prop] = "-";
  });
  return [row];
}
