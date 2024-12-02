import allAddress from "../data/address";
import { CommonObj } from "@/core/_types";
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
//获取字典文本
export function getDictText(name: DictNames, val: string | number) {
  return dictMap[name][val] || "";
}
//获取字典码值
export function getDictCodes(name: DictNames) {
  return Object.keys(dictMap[name]).map(it => Number(it));
}
export default dictMap as CommonObj;

export type CascaderType = keyof typeof cascaderMap;
const cascaderMap = {
  Region: allAddress,
};
//获取级联地址文本
export function getCascadeText(type: CascaderType, ids: [number, number, number] = [0, 0, 0], byKey = "id") {
  const mapOpts = cascaderMap[type];
  if (!mapOpts) return "-";
  const [pId, cId, aId] = ids;
  const pItem = mapOpts.find((it: CommonObj) => it[byKey] === pId);
  const cItem = pItem?.city.find((it: CommonObj) => it[byKey] === cId);
  const aItem = cItem?.area.find((it: CommonObj) => it[byKey] === aId);
  return `${pItem?.name}${cItem?.name}${aItem?.name || ""}`;
}
