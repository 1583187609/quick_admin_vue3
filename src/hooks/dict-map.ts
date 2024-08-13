import { useDictStore } from "@/store";
import { merge } from "lodash";
import { CascaderName, DictName } from "@/dict/_types";
import { typeOf } from "@/utils";
import { CommonObj, StrNum, OptionItem } from "@/vite-env";

export default () => {
  const { dictMap, cascaderMap } = useDictStore();
  /**
   * 获取tagMap
   * @param name 映射map的名称
   * @param codeMap 例如：YesNo 的 codeMap: {0:1, 1:0}，显示时就会将是否对调
   */
  function getMap(name: DictName, codeMap?: CommonObj) {
    const currMap = dictMap[name];
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
   * @param {string} char  为空时的占位符号
   */
  function getText(name: DictName, key: StrNum, char = "-"): string {
    const currMap = getMap(name);
    const val = currMap[key];
    if (typeof val === "string") return val || char;
    return val?.text || char;
  }

  /**
   * 获取字典下拉项
   * @param name DictName 字典名称
   * @param includeKeys string[] 过滤时要包含的keys
   * @param isExclude boolean 是否排除掉要包含的keys
   */
  function getOpts(name: DictName, includeKeys?: StrNum[], isExclude?: boolean): OptionItem[] {
    const currMap = getMap(name);
    let opts: OptionItem[] = [];
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

  // 获取级联中的文字
  function getCascaderText(name: CascaderName, val: StrNum, char = "-") {
    if (typeof val === "undefined") return char;
    const regions: OptionItem[] = cascaderMap[name];
    if (!regions) throw new Error(`未找到name为${name}的字典映射`);
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
    const opts = cascaderMap[name];
    if (!opts) throw new Error(`未找到name为${name}的字典映射`);
    return opts;
  }

  return {
    getMap,
    getText,
    getOpts,
    getCascaderText,
    getCascaderOpts,
  };
};
