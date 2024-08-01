/**
 * 生成组件说明文档
 */

import fs from "fs";
import path from "path";
import {
  getFileName,
  getTable,
  getTsTypeDeclare,
  getVueApiInfo,
  getAtMdStr,
  needParam,
  readMeName,
  splitOrderChar,
  writeFileSync,
  configName,
  N,
} from "../utils";
import { getDefineRowsMap } from "../utils/file/vuets";

/**
 * 获取描述类md文本
 * @param {object} hints
 * @returns
 */
// 示例
// const tempDescs = {
//   tip: "这是tip消息",
//   warning: "这是warning消息",
//   danger: "这是danger消息",
//   details: "这是details消息",
// };
export function getHints(hints) {
  if (!hints) return "";
  let descStr = "";
  for (const key in hints) {
    const val = getAtMdStr(hints[key]);
    descStr += `${N}::: ${key}${N}${val}${N}:::${N}`;
  }
  return descStr;
}

/**
 * 初始化ReadMe文件
 * @param {string} title 标题
 * @returns
 */
export function getInitReadMeFile(title) {
  return `# ${title}${N}\n待完善${N}`;
}

/**
 * 初始化配置文件
 * @param {string} apiPath api来源路径。例：`${dirPath}/0_示例_demo/_components/StandardDemoForm.vue`,
 * @param {string} tsPath ts类型声明来源路径。例：`${dirPath}/0_示例_demo/_typescript/standard.ts`
 * @returns
 */
export function getInitConfigFile(apiPath = "", tsPath = "") {
  return `{
  "apiPath": "${apiPath}",
  "tsPath": "${tsPath}"
}`;
}

/**
 * 生成代码示例
 * @param {string} readPath 读取文件的路径 例："/demos/2_表单_form/1_BaseForm 基础表单"
 * @link 参考链接：https://juejin.cn/post/7243520456979398693
 * @link 参考链接：https://zhuanlan.zhihu.com/p/450698973
 * @notice 完整路径：/demos/2_表单_form/1_BaseForm 基础表单/InlineForm
 * @returns
 */
function getCodeDemos(readPath) {
  if (!readPath) return "";
  let mdStr = "";
  const dirPath = path.join(process.cwd(), readPath);
  const readFiles = fs.readdirSync(dirPath).filter(it => ![readMeName, configName].includes(it));
  readFiles.forEach(file => {
    const curPath = path.join(dirPath, file);
    const isDir = fs.lstatSync(curPath).isDirectory();
    if (isDir) throw new Error("暂未处理文件夹情况");
    const newFilePath = `${readPath}/${file}`;
    const { info } = getVueApiInfo(`${path.join(dirPath, file)}`);
    const { title = getFileName(file, "cn"), description = "", hints } = info ?? {};
    mdStr += `
## ${title}
::: demo ${description}
${newFilePath}
:::${N}${getHints(hints)}${N}`;
  });
  return mdStr;
}

// * @param {props|method|event|slot} type 表格类型：属性、方法、事件、插槽
/**
 * 获取指定类型表格的md文本
 * @param {props|expose|emits|slots} type 表格类型：属性、方法、事件、插槽
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
  expose: {
    title: "方法",
    cols: [
      { prop: "name", label: "方法名" },
      { prop: "desc", label: "说明" },
      { prop: "type", label: "类型" },
    ],
  },
  emits: {
    title: "事件",
    cols: [
      { prop: "name", label: "事件名称" },
      { prop: "desc", label: "说明" },
      { prop: "type", label: "回调参数" },
    ],
  },
  slots: {
    title: "插槽",
    cols: [
      { prop: "name", label: "插槽名" },
      { prop: "desc", label: "说明" },
      { prop: "type", label: "子标签" },
    ],
  },
};
export function getTypeTable(type = "props", rows = [], info) {
  if (!rows?.length) return "";
  const { hints, title: overTitle, description } = info ?? {};
  const { title, cols } = tableTypeMap[type];
  let mdStr = "";
  if (description) mdStr += `${N}${description}${N}`;
  mdStr += `${getTable(cols, rows, hints)}${N}`;
  if (hints) mdStr += `${getHints(hints)}${N}${N}`;
  if (!mdStr) return "";
  return `### ${overTitle ?? title}${N}${N}${mdStr}`;
}

/**
 * 获取API部分的md内容
 * @param {string} readPath 要读取的文件路径。例：/demos/0_示例_demo/_components/StandardDemoForm.vue
 * @param {string} title 标题
 */
const types = ["props", "emits", "slots", "expose"];
function getApiTables(readPath = "", title = "API") {
  if (!readPath) return "";
  let mdStr = "";
  const rowsMap = getDefineRowsMap(readPath, true);
  const readPathFull = path.join(process.cwd(), readPath);
  types.forEach(type => {
    const { info } = getVueApiInfo(readPathFull, type);
    const rows = rowsMap[type];
    mdStr += getTypeTable(type, rows, info);
  });
  if (!mdStr) return "";
  return `## ${title}${N}${N}${mdStr}${N}`;
}

/**
 * 获取vue文件中的摘要信息
 * @param {string} readPath 要读取文件的路径
 * @param {object} info 返回的信息
 */
function getSummaryInfo(readPath = "") {
  if (!readPath) return "";
  const fullPath = path.join(process.cwd(), readPath);
  const { info } = getVueApiInfo(fullPath);
  return info;
}

/**
 * 写入（生成）组件说明文档文件
 * @param {string} writePath 要写入的文件路径。例：`${docsPath}/4_示例_demo/2_文档生成_create`
 * @param {string} demoPath 要读取的文件路径。例："/demos/2_表单_form/1_BaseForm 基础表单"
 * @param {string} apiPath 读取api内容的路径
 * @param {string} tsPath 读取ts类型的文件路径
 * @advice 方法名建议 writeComponentDoc
 */
// apiPath, tsPath
export default (writeFilePath = needParam(), demoPath = needParam()) => {
  let fileStr = "";
  // 获取apiPath, tsPath
  const fullFilePath = path.join(process.cwd(), demoPath, configName);
  const isExist = fs.existsSync(fullFilePath);
  const dataStr = isExist ? fs.readFileSync(fullFilePath, "utf-8") : getInitConfigFile();
  !isExist && writeFileSync(fullFilePath, dataStr);
  const { apiPath, tsPath } = JSON.parse(dataStr);

  // 从api来源文件中读取摘要信息，并拼接字符串
  const info = getSummaryInfo(apiPath);
  const { title = writeFilePath.split(splitOrderChar).at(-1).slice(0, -3) ?? "无标题", hints, description } = info ?? {};
  fileStr += `# ${title}${N}${N}`;
  const oldFileStr = fileStr;
  if (description) fileStr += `${description}${N}${N}`;
  if (hints) fileStr += `${getHints(hints)}${N}${N}`;

  // 从ReadMe文件中读取摘要信息
  // const readMePath = path.join(process.cwd(), demoPath, readMeName);
  // const isExist = fs.existsSync(readMePath);
  // if (isExist) {
  //   fileStr = fs.readFileSync(readMePath, "utf-8");
  // } else {
  //   // 现在不需要配备一个ReadMe文件了，所以不再自动生成了
  //   // const title = writeFilePath.split(splitOrderChar).at(-1).slice(0, -3);
  //   // fileStr = getInitReadMeFile(title);
  //   // writeFileSync(readMePath, fileStr);
  // }

  if (demoPath) fileStr += `${getCodeDemos(demoPath)}${N}${N}`;
  if (apiPath) {
    const apiStr = getApiTables(apiPath);
    if (apiStr) fileStr += `${apiStr}${N}${N}`;
  }
  if (tsPath) {
    const tsFileStr = getTsTypeDeclare(tsPath);
    if (tsFileStr) fileStr += `${tsFileStr}${N}${N}`;
  }
  if (oldFileStr.trim() === fileStr.trim()) fileStr += `待完善${N}${N}`;
  writeFileSync(path.join(process.cwd(), writeFilePath), fileStr);
};
