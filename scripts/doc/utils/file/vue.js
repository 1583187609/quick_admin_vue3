import fs from "fs";
import path from "path";
import { N, getFileName, getNoticesFromTags, getNoticesStr, needParam, upperFirst } from "../../utils/index.js";
import compiler from "@vue/compiler-sfc";

/**
 * 判断 ts interface 行中{}的数量（为0时，说明完全左右{}数量一致
 * @param {string} line 行字符串
 * @param {type|Interface} type 处理字符串时要依据的处理类型
 * @param {string|[string,string]} chars 分界的字符串
 * @param {boolean} ignoreAnno 是否忽略注释
 * @returns {boolean} 该行是否已结束
 */
export function getBracesNum(line = "", num = 0, chars = "{}", ignoreAnno = true) {
  if (typeof chars === "string") chars = chars.split("");
  if (chars.length !== 2) throw new Error(`chars应该始终保持2个长度`);
  const [left, right] = chars;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (ignoreAnno) {
      // 如果遇见了注释
      const isMeetAnno = c === "/" && line[i + 1] === "/";
      if (isMeetAnno) return num;
    }
    if (c === left) {
      num++;
      continue;
    }
    if (c === right) num--;
  }
  return num;
}

/**
 * 获取vue文件中的摘要信息
 * @param {string} readPath 要读取文件的路径
 * @param {object} info 返回的信息
 */
export function getSummaryFileStr(readPath = "") {
  let fileStr = "";
  if (!readPath) return fileStr;
  if (!readPath) return "";
  const info = getInfoByAnnoName(readPath);
  const { tags, description } = info;
  if (description) fileStr += `${description}${N}${N}`;
  const notices = getNoticesFromTags(tags);
  if (notices) fileStr += `${getNoticesStr(notices)}${N}${N}`;
  return fileStr;
}

/**
 * 获取Vue的Ts类型的Ast语法树
 * @param {*} readPathHalf 要读取文件的路径 例：/src/components/form/BaseForm.vue
 * @returns
 */
export function getVueScriptStr(readPathHalf = needParam()) {
  const readPathFull = path.join(process.cwd(), readPathHalf);
  const vueContent = fs.readFileSync(readPathFull, "utf-8");
  const sfc = compiler.parse(vueContent, {
    filename: "example.vue", // 用于错误报告
    sourceMap: false, // 是否生成source map
  });
  // const {
  //   filename,
  //   source,
  //   template,
  //   script,
  //   styles,
  //   customBlocks,
  //   cssVars,
  //   slotted,
  //   shouldForceReload,
  // } = sfc.descriptor;
  const { scriptSetup } = sfc.descriptor;
  const scriptContent = scriptSetup.content;
  return scriptContent;
}

/**
 * 获取信息注释的正则表达式
 * @param {summary|hidden|props|emits|slots|expose|string} name 注释名称
 * @param {string} modifier 正则表达式匹配的类型
 */
function getRegexpOfInfoAnno(name = "\\w+", modifier = "gs") {
  const htmlRegStr = `(<!-- *${name}.*?-->)`;
  const jsRegStr = `(\\/\\*\\* *${name}.*?\\*\\/)`;
  const regStr = `${htmlRegStr}|${jsRegStr}`;
  return new RegExp(regStr, modifier);
}

/**
 * 获取文件中的有效片段，忽略掉生成 docs 需要的注释
 * @param {string} fileStr 要处理的文件字符串
 * @returns {string} 有效代码文件字符串
 */
export function getFileStrWithoutDocAnno(fileStr = needParam()) {
  if (!fileStr) return "";
  const infoAnnoReg = getRegexpOfInfoAnno();
  // 这样处理下是为了占用高度资源最小化
  fileStr = fileStr.replace(infoAnnoReg, () => "").trim();
  return `${fileStr}${N}`;
}

/**
 * 根据注释名称从注释中获取信息
 * @param {string} filePath 要读取文件的路径
 * @param {summary|props|expose|emits|slots} type 要读取的注释类型
 * @returns {
 *  tags: [],
 *  type: "",
 *  title: "",
 * }
 */
export function getInfoByAnnoName(readPath = needParam(), name = "summary") {
  const readPathFull = path.join(process.cwd(), readPath);
  const fileStr = fs.readFileSync(readPathFull, "utf-8");
  const reg = getRegexpOfInfoAnno(name);
  const info = { type: name, title: name === "summary" ? getFileName(readPath) : upperFirst(name) };
  const matchStr = fileStr.match(reg)?.[0];
  if (!matchStr) return info;
  const lines = matchStr.split(N);
  if (!lines.length) return info;
  const startInd = lines[0].indexOf(name) + name.length + 1;
  const title = lines[0].slice(startInd).trim();
  if (title) info.title = title;
  const tags = [];
  lines.slice(1, -1).map((it, i) => {
    it = it.replace("*", "").trim();
    if (i === 0 && !it.startsWith("@")) {
      info.description = it;
      return it;
    }
    let sInd = it.indexOf("{");
    let eInd = it.indexOf("}");
    if (sInd === -1 && eInd === -1) {
      sInd = eInd = it.indexOf(" ");
    }
    const title = it.slice(1, sInd).trim();
    let type = it.slice(sInd + 1, eInd).trim();
    if (!type && title === "notice") type = "tip";
    const description = it.slice(eInd + 1).trim();
    tags.push({
      description,
      title,
      type: { name: type },
    });
    return it;
  });
  if (tags?.length) info.tags = tags;
  return info;
}
