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
  getTsTypeDeclare,
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
 * 初始化ReadMe文件
 * @param {string} title 标题
 * @returns
 */
export function getInitReadMeFile(title) {
  return `# ${title}\n\n待完善`;
}

/**
 * 生成代码示例
 * @param {string} readPath 读取文件的路径 例："/examples/2_表单_form/1_BaseForm 基础表单 基础表单 基础表单 基础表单"
 * @link 参考链接：https://juejin.cn/post/7243520456979398693
 * @link 参考链接：https://zhuanlan.zhihu.com/p/450698973
 * @notice 完整路径：/examples/2_表单_form/1_BaseForm 基础表单 基础表单 基础表单 基础表单/InlineForm
 * @returns
 */
function getCodeDemos(readPath) {
  if (!readPath) return "";
  let mdStr = "";
  const dirPath = path.join(process.cwd(), readPath);
  const readFiles = fs.readdirSync(dirPath).filter(it => it !== `${readMeName}.md`);
  readFiles.forEach(file => {
    const curPath = path.join(dirPath, file);
    const isDir = fs.lstatSync(curPath).isDirectory();
    if (isDir) throw new Error("暂未处理文件夹情况");
    const newFilePath = `${readPath}/${file}`;
    const { info } = getVueFileInfo(`${path.join(dirPath, file)}`);
    const { title = getFileName(file, "cn"), description = "", descs } = info;
    mdStr += `
## ${title}
::: demo ${description}
${newFilePath}
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
// apis 参数示例
// const tempApis = [
//   {
//     type: "props",
//     // rows: getRowsOfProps("/src/components/form/BaseForm.vue", true),
//     descs: { tip: "这是tip消息" },
//   },
//   { type: "method", descs: { warning: "这是warning消息" } },
//   {
//     type: "event",
//     descs: {
//       tip: "这是tip消息",
//       warning: "这是warning消息",
//       danger: "这是danger消息",
//       details: "这是details消息",
//     },
//   },
//   { type: "slot" },
// ];
function getApiTables(apis, title = "API") {
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
 * @param {string} readPath 要读取的文件路径。例："/examples/2_表单_form/1_BaseForm 基础表单 基础表单 基础表单 基础表单"
 * @param {string} writePath 要写入的文件路径。例：`${docsPath}/4_示例_demo/2_文档生成_create`
 * @param {object} sections 分块内容
 * @param {number} order 文件的序号（用于文件目录中的位置排序）
 * @advice 方法名建议 writeComponentDoc
 */
// sections 示例
// const tempSecs = {
//   apis: tempApis,
//   tsPath: "/src/components/form/_types.ts",
// };
export default (readPath = needParam(), writeFilePath = needParam(), sections) => {
  const readMePath = path.join(process.cwd(), readPath, `${readMeName}.md`);
  const isExist = fs.existsSync(readMePath);
  let fileStr = "";
  if (isExist) {
    fileStr = fs.readFileSync(readMePath, "utf-8");
  } else {
    fileStr = getInitReadMeFile(writeFilePath.split(splitOrderChar).at(-1).slice(0, -3));
    writeFileSync(readMePath, fileStr);
  }
  if (sections) {
    const { apis, tsPath } = sections;
    const codeDemos = getCodeDemos(readPath);
    const apiTables = getApiTables(apis);
    const tsStr = getTsTypeDeclare(tsPath);
    fileStr += `\n\n${codeDemos}${apiTables}${tsStr}`;
  }
  writeFileSync(path.join(process.cwd(), writeFilePath), fileStr);
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
