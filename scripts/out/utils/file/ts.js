import { getWithTagStr } from "./md";

/**
 * 从ts文件中获取items
 * @param {*} fileStr 读取的文件路径
 * @param {*} isAtMd 是否在md文件中展示
 */
export function getItemsFromTsStr(fileStr = "", isAtMd = false) {
  const lines = fileStr.trim().split("\n");
  const list = lines
    .map((it, i) => {
      let str = it.trim();
      // 去除多行注释
      if (str.startsWith("/*") || str.startsWith("*") || str.startsWith("*/")) str = "";
      // 将单行注释拼接到下一行的后面
      if (str.startsWith("//")) {
        const nextLine = lines[i + 1];
        if (nextLine && !nextLine.startsWith("//") && !nextLine.startsWith("/*")) {
          // str = str.replaceAll("|", "\\|"); //.replaceAll("[", "[").replaceAll("]", "]");
          lines[i + 1] += nextLine.includes("//") ? str.slice(2) : str;
        }
        str = "";
      }
      return str;
    })
    .filter(it => !!it);
  const items = list.map(item => {
    let [keyVal, desc] = item.split("//").map(it => it.trim());
    const colonInd = keyVal.indexOf(":");
    const key = keyVal.slice(0, colonInd);
    const val = keyVal.slice(colonInd + 1);
    const required = key.at(-1) !== "?";
    let name = required ? key : key.slice(0, -1);
    let type = val.trim().replaceAll(";", "").replaceAll("|", "\\|");
    let defVal = "-";
    if (isAtMd) {
      name = `\`${name}\``;
      type = `\`${type}\``;
      if (defVal !== "-") defVal = `\`${defVal}\``;
      desc = getWithTagStr(desc);
    }
    const obj = {
      name,
      type,
      desc,
      default: defVal,
      required,
    };
    return obj;
  });
  return items;
}