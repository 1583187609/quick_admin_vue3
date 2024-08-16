// import { useDictStore } from "@/store";
import _ from "lodash";
import { reactive } from "vue";
import { DatamapName } from "@/datamap/_types";
import { storage, typeOf } from "@/utils";
import { CommonObj, StrNum, OptionItem } from "@/vite-env";
import datamapData from ".";
import { StorageType } from "@/components/_utils/common/storage";

type CascaderName = string;

type DatamapType = "select" | "cascader" | "tree";

const { merge } = _;
const defaultStorageType: StorageType = "local";

/**
 * 获取字典映射
 * @param {string[]} names 字典名称
 * @returns
 */
function getDictMapByNames(names) {
  const obj = {};
  names.forEach(async name => {
    const map = datamapData[name];
    const t = typeOf(map);
    if (["Object", "Array"].includes(t)) return (obj[name] = map);
    const data = storage.getItem("datamap", defaultStorageType)?.[name];
    if (t === "Function") return (obj[name] = data ?? map());
    if (["AsyncFunction", "Promise"].includes(t)) return (obj[name] = data ?? (await map()));
    throw new Error(`暂未处理此种类型：${t}`);
  });
  return obj;
}

/**
 * 当传入names时，会以响应式对象读取数据
 * @param {CascaderName[]} names 字典映射名称
 * @notice 考虑性能因素，所以这样设计
 */
export default (names = []) => {
  // const { dictMap, cascaderMap } = useDictStore();
  const dictMap = reactive(getDictMapByNames(names));
  /**
   * 获取字典映射
   * @param name 字典索引名称
   * @returns
   */
  async function getMapByName(name: DatamapName) {
    const map = dictMap?.[name] ?? datamapData[name];
    const t = typeOf(map);
    if (["Object", "Array"].includes(t)) return map;
    const data = storage.getItem("datamap", defaultStorageType)?.[name];
    if (t === "Function") return data ?? map();
    if (["AsyncFunction", "Promise"].includes(t)) return data ?? (await map());
    throw new Error(`暂未处理此种类型：${t}`);
  }
  /**
   * 设置字典映射
   * @param name 字典索引名称
   * @returns
   */
  async function setMapByName(name: DatamapName) {
    const map = datamapData[name];
    const t = typeOf(map);
    if (["Object", "Array"].includes(t)) throw new Error(`无需设置此种类型：${t}`);
    if (t === "Function") return storage.setItem(`datamap.${name}`, map(), defaultStorageType);
    if (["AsyncFunction", "Promise"].includes(t)) return storage.setItem(`datamap.${name}`, await map(), defaultStorageType);
    throw new Error(`暂未处理此种类型：${t}`);
  }
  /**
   * 获取tagMap
   * @param name 映射map的名称
   * @param codeMap 例如：YesNo 的 codeMap: {0:1, 1:0}，显示时就会将是否对调
   */
  function getMap(name: DatamapName, codeMap?: CommonObj) {
    const currMap = dictMap?.[name] ?? getMapByName(name); // dictMap[name];
    if (!currMap) return console.error("未找到name为" + name + "的tagMap");
    const t = typeOf(currMap);
    if (t === "Object") {
      if (!codeMap) return currMap;
      const tempMap: CommonObj = {};
      for (const key in codeMap) {
        tempMap[key] = currMap[codeMap[key]];
      }
      return merge({}, currMap, tempMap); //是为了可以不写完所有code（只写出需要对调的code即可）
    }
    if (t === "Function") return currMap();
    if (t === "AsyncFunction") {
      console.error(`暂未处理此种类型：${t}`);
      return {};
      //return await currMap()
    }
    throw new Error(`暂未处理此种类型：${t}`);
  }

  /**
   * 获取字典文本内容
   * @param {string} name  字典名称
   * @param {string} key  字典中的建名
   * @param {select|cascader|tree} type  下拉项的类型
   * @param {string} char  为空时的占位符号
   */
  function getText(name: DatamapName, key: StrNum, type: DatamapType = "select", char = "-"): string {
    const currMap = getMap(name);
    const val = currMap[key];
    if (type === "select") return (typeof val === "string" ? val : val?.text) || char;
    if (type === "cascader") return getCascaderText(name, val, char);
    if (type === "tree") return getTreeText(name, val, char);
    throw new Error(`传参类型错误：${type}`);
  }

  /**
   * 获取字典下拉项
   * @param name DatamapName 字典名称
   * @param includeKeys string[] 过滤时要包含的keys
   * @param isExclude boolean 是否排除掉要包含的keys
   */
  function getOpts(name: DatamapName, type: DatamapType = "select", includeKeys?: StrNum[], isExclude?: boolean): OptionItem[] {
    const currMap = getMap(name);
    let opts: OptionItem[] = [];
    if (type === "select") {
      for (const key in currMap) {
        const val = isNaN(Number(key)) ? key : Number(key);
        const isInclude = includeKeys?.includes(val as StrNum) ?? true;
        if (isExclude ? isInclude : !isInclude) continue;
        let value = currMap[key];
        if (typeof value === "string") value = { text: value };
        const { text, disabled } = value;
        const opt: OptionItem = { label: text, value: val };
        if (disabled !== undefined) opt.disabled = disabled;
        opts.push(opt);
      }
      return opts;
    }
    if (type === "cascader") {
      return getCascaderOpts(name);
    }
    if (type === "tree") {
      return getTreeOpts(name);
    }
    throw new Error(`传参类型错误：${type}`);
  }

  // 获取级联中的文本
  function getCascaderText(name: CascaderName, val: StrNum, char = "-") {
    if (typeof val === "undefined") return char;
    const regions: OptionItem[] = dictMap?.[name] ?? getMapByName(name); // cascaderMap[name];
    if (!regions) throw new Error(`字典中未找到：${name}`);
    let text = "";
    regions.find(item => {
      const { label, children = [] } = item;
      const target = children.find((it: OptionItem) => it.value === val);
      if (target) text = `${label}${char}${target.label}`;
      return !!target;
    });
    return text;
  }

  // 获取级联下拉项
  function getCascaderOpts(name: CascaderName): OptionItem[] {
    const opts = dictMap?.[name] ?? getMapByName(name); // cascaderMap[name];
    if (!opts) throw new Error(`字典中未找到：${name}`);
    return opts;
  }

  // 获取树中的文本
  function getTreeText(name: DatamapName, val, char = "-") {
    return char;
  }

  // 获取树的下拉项
  function getTreeOpts(name: CascaderName): OptionItem[] {
    const opts = dictMap?.[name] ?? getMapByName(name); // cascaderMap[name];
    if (!opts) throw new Error(`字典中未找到：${name}`);
    return opts;
  }

  return {
    getMap,
    getText,
    getOpts,
  };
};
