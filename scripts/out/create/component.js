/**
 * 生成组件说明文档
 */

import fs from "fs";
import path from "path";
import {
  upperFirst,
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
  getTsStrByName,
  getAnnotationByType,
} from "../utils";

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
    const val = getWithTagStr(hints[key]);
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
    const { title = getFileName(file, "cn"), description = "", hints } = info ?? {};
    mdStr += `
## ${title}
::: demo ${description}
${newFilePath}
:::\n${getHints(hints)}\n\n`;
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
      { prop: "cbArgs", label: "回调参数" },
    ],
  },
  slots: {
    title: "插槽",
    cols: [
      { prop: "name", label: "插槽名" },
      { prop: "desc", label: "说明" },
      { prop: "subTag", label: "子标签" },
    ],
  },
};
export function getTypeTable(type = "props", rows = [], info) {
  if (!rows?.length) return "";
  const { hints, title: overTitle, description } = info ?? {};
  const { title, cols } = tableTypeMap[type];
  let mdStr = `### ${overTitle ?? title}\n\n`;
  if (description) mdStr += `\n${description}\n`;
  mdStr += `${getTable(cols, rows, hints)}\n`;
  if (hints) mdStr += `${getHints(hints)}\n\n`;
  return mdStr;
}

/**
 * 获取API部分的md内容
 * @param {string} readPath 要读取的文件路径。例：/examples/0_示例_demo/DemoForm.vue
 * @param {string} title 标题
 */
const types = ["props", "emits", "slots", "expose"];
function getApiTables(readPath = "", title = "API") {
  if (!readPath) return "";
  let mdStr = `## ${title}\n\n`;
  types.forEach(type => {
    const { info } = getVueFileInfo(path.join(process.cwd(), readPath), type);
    const rows = getRowsFromVueDefine(readPath, `define${upperFirst(type)}`, true);
    mdStr += getTypeTable(type, rows, info);
  });
  return `${mdStr}\n\n`;
}

/**
 * 获取vue文件中的摘要信息
 * @param {string} readPath 要读取文件的路径
 */
function getSummaryInfo(readPath) {
  if (!readPath) return "";
  const fullPath = path.join(process.cwd(), readPath);
  const { info } = getVueFileInfo(fullPath);
  return info;
}

/**
 * 写入（生成）组件说明文档文件
 * @param {string} writePath 要写入的文件路径。例：`${docsPath}/4_示例_demo/2_文档生成_create`
 * @param {string} demoPath 要读取的文件路径。例："/examples/2_表单_form/1_BaseForm 基础表单"
 * @param {string} apiPath 读取api内容的路径
 * @param {string} tsPath 读取ts类型的文件路径
 * @advice 方法名建议 writeComponentDoc
 */
export default (writeFilePath = needParam(), demoPath = needParam(), apiPath, tsPath) => {
  const readMePath = path.join(process.cwd(), demoPath, `${readMeName}.md`);
  const isExist = fs.existsSync(readMePath);
  // const info = getSummaryInfo(apiPath);
  let fileStr = "";
  if (isExist) {
    fileStr = fs.readFileSync(readMePath, "utf-8");
  } else {
    // 现在不需要配备一个ReadMe文件了，所以不再自动生成了
    // const title = writeFilePath.split(splitOrderChar).at(-1).slice(0, -3);
    // fileStr = getInitReadMeFile(title);
    // writeFileSync(readMePath, fileStr);
  }
  const codeDemos = getCodeDemos(demoPath);
  const apiTables = getApiTables(apiPath);
  const tsDeclare = getTsTypeDeclare(tsPath);
  fileStr += `\n\n${codeDemos}${apiTables}${tsDeclare}`;
  writeFileSync(path.join(process.cwd(), writeFilePath), fileStr);
};

/**
 *
 * @returns 从Vue define（"defineProps" "defineEmits" "defineSlots" "defineExpose"）中获取表格数据（rows）
 * @param {string} readPath 读取文件的路径 例："/src/components/form/BaseForm.vue"
 * @param {defineProps|defineEmits|defineSlots|defineExpose} type 读取文件的路径 例："/src/components/form/BaseForm.vue"
 * @param {boolean} isAtMd 是否处在md文档中
 */
export function getRowsFromVueDefine(readPath = needParam(), type = "defineProps", isAtMd = false) {
  const fileStr = getTsStrByName(readPath, type, true);
  if (type !== "defineEmits") return getItemsFromTsStr(fileStr, isAtMd);
  const rows = [];
  const lines = fileStr.trim().split("\n");
  lines.map(line => {
    line = line.trim();
    const sInd = line.indexOf(":") + 1;
    const eInd = line.lastIndexOf(")");
    const annoStr = line.slice(line.indexOf(";") + 1); //注释
    const item = line.slice(sInd, eInd).trim() + annoStr;
    const commaInd = item.indexOf(","); //逗号的下标
    const name = item.slice(0, commaInd).trim().slice(1, -1);
    const [args, anno] = item
      .slice(commaInd + 1)
      .split("//")
      .map(it => it.trim());
    const row = {
      name: isAtMd ? getWithTagStr(name) : name,
      desc: isAtMd ? getWithTagStr(anno) : anno,
      cbArgs: isAtMd ? getWithTagStr(args) : args,
    };
    rows.push(row);
  });
  return rows;
}
