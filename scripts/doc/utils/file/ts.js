import { getHandleAnnoFile, getTableRow } from "./vuets";

/**
 * 从文件ts类型的字符串中获取items
 * @param {string} fileStr 读取的文件路径
 * @param {boolean} isAtMd 是否在md文件中展示
 */
export function getItemsFromTsStr(fileStr = "", isAtMd = false) {
  const list = getHandleAnnoFile(fileStr, true);
  return list.map(item => {
    const [keyVal, desc] = item.split("//").map(it => it.trim());
    const colonInd = keyVal.indexOf(":");
    const key = keyVal.slice(0, colonInd);
    const val = keyVal.slice(colonInd + 1);
    const required = key.at(-1) !== "?";
    const name = required ? key : key.slice(0, -1);
    const type = val.trim().replaceAll(";", "").replaceAll("|", "\\|");
    return getTableRow({ name, type, desc, required }, isAtMd);
  });
}
