import allAddress from "../data/address";
import { CommonObj, OptionItem } from "@/core/_types";
import baseDict from "./modules/base";
import otherDict from "./modules/other";

// export type DictNames =
//   | "D_EnableStatus"
//   | "D_YesNoStatus"
//   | "D_Gender"
//   | "D_RoleType"
//   | "D_MenuType";
// const dictMap: { [key in DictNames]: CommonObj } = {
export type DictNames = keyof typeof dictMap;
const dictMap: CommonObj = {
  ...baseDict,
  ...otherDict,
};

export default dictMap;

// 获取字典映射
export function getDictMap(name: DictNames) {
  const map = dictMap[name];
  if (!map) throw new Error(`不存在该字典：${map}`);
  return map;
}
// 获取字典文本
export function getDictLabel(name: DictNames, val: string | number) {
  return getDictMap(name)[val] ?? "";
}
// 获取字典文本集合
export function getDictLables(name: DictNames) {
  return Object.values(getDictMap(name));
}
// 获取字典码值
export function getDictValues(name: DictNames) {
  return Object.keys(getDictMap(name)).map(it => {
    const num = Number(it);
    return isNaN(num) ? it : num;
  });
}
/**
 * 根据字典获取下拉选项数据
 * @param {string} name  字典名
 */
export function getDictOptions(name: string) {
  const map = getDictMap(name);
  const opts: OptionItem[] = [];
  for (const key in map) {
    opts.push({ label: map[key], value: Number(key) });
  }
  return opts;
}

export type CascaderName = keyof typeof cascaderMap;
const cascaderMap = {
  Region: allAddress,
};
//获取级联地址文本
export function getCascadeLabel(name: CascaderName, ids: [number, number, number] = [0, 0, 0], byKey = "id") {
  const mapOpts = cascaderMap[name];
  if (!mapOpts) return "";
  const [pId, cId, aId] = ids;
  const pItem = mapOpts.find((it: CommonObj) => it[byKey] === pId);
  const cItem = pItem?.city.find((it: CommonObj) => it[byKey] === cId);
  const aItem = cItem?.area.find((it: CommonObj) => it[byKey] === aId);
  return `${pItem?.name}${cItem?.name}${aItem?.name || ""}`;
}
