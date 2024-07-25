import fs from "fs";

const wordRegex = /\b[^\W0-9_]+\b/g; // 匹配英文单词
const sentenceRegex = /[A-Z][^\.\?!]*[^\.]+[\.\?!]/g; // 匹配英文完整句子
const htmlTagRegex = /<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)>/g; // 匹配HTML标签
const tagReg = new RegExp(`${wordRegex.source}|${sentenceRegex.source}|${htmlTagRegex.source}`, "gi"); //wordRegex;
function tagStr(str = "") {
  if (!str) return "";
  return str.replace(tagReg, (a, b) => {
    return `\`${a}\``;
  });
}

/**
 * 解析vue文件
 * @param filePath vue文件路径
 * @returns {file: '', info:{}}
 */
// const tempVueFileStr = `
// <!--
//  @title 行内表单
//  @desc 这是行内表单的描述
// -->
// <template></template>
// <style></style>
// <!--
//  @title 行内表单1
//  @desc 这是行内表单的描述1
// -->
// `;
export function resolveVueFile(filePath = "") {
  let matchStr = "";
  const info = {
    descs: {},
  };
  const fileStr = fs.readFileSync(filePath, "utf8");
  const endStr = fileStr.replace(/(<!--.*?-->)/gs, a => {
    if (!matchStr) matchStr = a; //只识别第一次匹配的，其他的则忽略
    return "";
  });
  const infos = matchStr
    .slice(4, -3)
    .split(/\n/g)
    .filter(it => !!it);
  infos.map(item => {
    let [key, val] = item.trim().split(" ");
    key = key.slice(1);
    val = tagStr(val);
    if (["tip", "warning", "danger"].includes(key)) {
      info.descs[key] = val;
    } else {
      info[key] = val;
    }
  });
  return { file: endStr.trimStart(), info };
}
