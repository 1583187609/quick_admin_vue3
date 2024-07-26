/**
 * 生成组件说明文档
 */

import fs from "fs";
import path from "path";
import {
  docsPath,
  getFileName,
  getTable,
  getTsItemsFromVueProps,
  getTypeScript,
  getVueFileInfo,
  getWithTagStr,
  writeFileSync,
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
function getAPI(apis = tempApis, title = "API") {
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
 * 写入（生成）组件说明文档文件
 * @param {string} readPath 要读取的文件路径
 * @param {string} writePath 要写入的文件路径
 * @param {number} order 文件的序号
 * @advice 方法名建议 writeComponentDoc
 */
export default (readPath = "/examples/form", writePath = `${docsPath}/4_示例_demo/2_文档生成_create`, order = 1) => {
  readPath = path.join(process.cwd(), readPath, "ReadMe.md");
  let fileStr = fs.readFileSync(readPath, "utf-8");
  const title = fileStr.split("\n")[0]?.replaceAll("#", "")?.trim() ?? "无标题";
  const api = getAPI(tempApis);
  const codeDemo = getCodeDemo();
  const ts = getTypeScript();
  fileStr += `\n\n${codeDemo}\n\n${api}${ts}`;
  writeFileSync(path.join(process.cwd(), `${writePath}/${order}_${title}.md`), fileStr);
};
