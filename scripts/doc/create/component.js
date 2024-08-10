/**
 * 生成组件说明文档
 */

import fs from "fs";
import path from "path";
import {
  N,
  getFileName,
  getTable,
  getTsTypeDeclare,
  needParam,
  readMeName,
  writeFileSync,
  configName,
  getNoticesStr,
  getNoticesFromTags,
  getApiTablesStr,
  getInfoByAnnoName,
  getSummaryFileStr,
} from "../utils/index.js";

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
 * @param {string} apiPath api来源路径。例：`/xxx/xx.vue`,
 * @param {string} tsPath ts类型声明来源路径。例：`/xxx/xx.ts`
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
 * @param {string} readPath 读取文件的路径 例：`${demosPath}/xxx/xx`
 * @link 参考链接：https://juejin.cn/post/7243520456979398693
 * @link 参考链接：https://zhuanlan.zhihu.com/p/450698973
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
    const info = getInfoByAnnoName(path.join(readPath, file));
    const { title, description = "", tags } = info ?? {};
    const notices = getNoticesFromTags(tags);
    mdStr += `
## ${title}
::: demo ${description}
${newFilePath}
:::${N}${getNoticesStr(notices)}${N}`;
  });
  return mdStr;
}

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
      { prop: "type", label: "Scope" },
      // { prop: "type", label: "子标签" },
    ],
  },
};
export function getTypeTable(type = "props", rows = [], info) {
  if (!rows?.length) return "";
  const { tags, title: overTitle, description } = info ?? {};
  const notices = getNoticesFromTags(tags);
  const { title, cols } = tableTypeMap[type];
  let mdStr = "";
  if (description) mdStr += `${N}${description}${N}`;
  mdStr += `${getTable(cols, rows, notices)}${N}`;
  if (notices) mdStr += `${getNoticesStr(notices)}${N}${N}`;
  if (!mdStr) return "";
  return `### ${overTitle ?? title}${N}${N}${mdStr}`;
}

/**

/**
 * 写入（生成）组件说明文档文件
 * @param {string} writePath 要写入的文件路径。例：`${docsPath}/xxx/xx`
 * @param {string} demoPath 要读取的文件路径。例："${demosPath}/xxx/xx"
 * @advice 方法名建议 writeComponentDoc
 */
export default async (writeFilePath = needParam(), demoPath = needParam()) => {
  let fileStr = "";
  // 获取apiPath, tsPath
  const fullFilePath = path.join(process.cwd(), demoPath, configName);
  const isExist = fs.existsSync(fullFilePath);
  const dataStr = isExist ? fs.readFileSync(fullFilePath, "utf-8") : getInitConfigFile();
  !isExist && writeFileSync(fullFilePath, dataStr);
  const { apiPath, tsPath } = JSON.parse(dataStr);

  const title = getFileName(writeFilePath);
  fileStr += `# ${title}${N}${N}`;
  const oldFileStr = fileStr;

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

  // 从api来源文件中读取摘要信息，并拼接字符串
  if (apiPath) {
    fileStr += getSummaryFileStr(apiPath, title);
  }

  if (demoPath) fileStr += `${getCodeDemos(demoPath)}${N}${N}`;

  if (apiPath) {
    const apiStr = await getApiTablesStr(apiPath);
    if (apiStr) fileStr += `${apiStr}${N}${N}`;
  }

  if (tsPath) {
    const tsFileStr = getTsTypeDeclare(tsPath);
    if (tsFileStr) fileStr += `${tsFileStr}${N}${N}`;
  }

  if (oldFileStr.trim() === fileStr.trim()) fileStr += `待完善${N}${N}`;
  writeFileSync(path.join(process.cwd(), writeFilePath), fileStr);
};
