import fs from "fs";
import path from "path";
import { getItemsFromTsStr, getWithTagStr } from ".";

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
export function getVueFileInfo(filePath = "") {
  let matchStr = "";
  const info = { descs: {} };
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
    item = item.trim();
    const spaceInd = item.indexOf(" ");
    const key = item.slice(1, spaceInd);
    let val = item.slice(spaceInd + 1).trim();
    val = getWithTagStr(val);
    if (["tip", "warning", "danger"].includes(key)) {
      info.descs[key] = val;
    } else {
      info[key] = val;
    }
  });
  return { file: endStr.trimStart(), info };
}
