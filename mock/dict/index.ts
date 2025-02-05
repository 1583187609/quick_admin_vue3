import allRegions from "../data/regions";
import { CommonObj, OptionItem } from "@/core/_types";
import baseDict from "./modules/base";
import otherDict from "./modules/other";
import { needParam } from "@/utils";

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
// // 获取字典文本
// export function getDictLabel(name: DictNames | CommonObj, val: string | number) {
//   const map = typeof name === "string" ? getDictMap(name) : name;
//   return map[val] ?? "";
// }
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

/******************************************************************/
/************************** 级联相关 ******************************/
/*****************************************************************/
export type CascaderName = keyof typeof cascaderMap;
const cascaderMap = {
  C_Region: allRegions,
};

/***
 * 获取级联文本（仅支持标准的OptionItem类型级联结构）
 */
export function getCascadeLabels(list: OptionItem[] = needParam(), vals: number[] = []) {
  if (!list?.length || !vals?.length) return [];
  function cycle(arr: OptionItem[], level = 0, texts: string[] = []) {
    if (!arr?.length) return [];
    const target = arr.find(it => it.value === vals[level]);
    if (!target) throw new Error(`未找到层级：${level}`);
    const { label, children } = target as CommonObj;
    texts.push(label);
    level++;
    if (level >= vals.length) return texts;
    return cycle(children, level, texts);
  }
  return cycle(list);
}

/***
 * 获取级联文本（仅支持标准的OptionItem类型级联结构）
 */
export function getCascadeLabel(cascader: OptionItem[] | string = needParam(), vals: number[] = [], joinChar = "") {
  const list = typeof cascader === "string" ? cascaderMap[cascader] : cascader;
  return getCascadeLabels(list).join(joinChar);
}

/**
 * 获取级联的随机 values （仅支持标准的OptionItem类型级联结构）
 * @param name 级联名称
 * @returns
 */
export function getCascaderRandomValues(cascader: OptionItem[] | string = needParam()) {
  const list: OptionItem[] = typeof cascader === "string" ? cascaderMap[cascader] : cascader;
  if (!list?.length) return [];
  function cycle(arr: OptionItem[], vals: number[] = []) {
    if (!arr?.length) return [];
    const ind = Math.floor(Math.random() * arr.length);
    const target = arr[ind];
    if (!target) return vals;
    const { value, children } = target as CommonObj;
    vals.push(value);
    if (!children?.length) return vals;
    return cycle(children, vals);
  }
  return cycle(list);
}
