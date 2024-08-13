import { useDictStore } from "@/store";
import { merge } from "lodash";
import { DatamapName } from "@/datamap/_types";
import { typeOf } from "@/utils";
import { CommonObj, StrNum, OptionItem } from "@/vite-env";

type CascaderName = string;

export default () => {
  const { dictMap, cascaderMap } = useDictStore();
  /**
   * 获取tagMap
   * @param name 映射map的名称
   * @param codeMap 例如：YesNo 的 codeMap: {0:1, 1:0}，显示时就会将是否对调
   */
  function getMap(name: DatamapName, codeMap?: CommonObj) {
    const currMap = dictMap[name];
    if (!currMap) return console.error("未找到name为" + name + "的tagMap");
    if (codeMap) {
      const tempMap: CommonObj = {};
      for (const key in codeMap) {
        tempMap[key] = currMap[codeMap[key]];
      }
      return merge({}, currMap, tempMap); //是为了可以不写完所有code（只写出需要对调的code即可）
    }
    return currMap;
  }

  /**
   * 获取字典文本内容
   * @param {string} name  字典名称
   * @param {string} key  字典中的建名
   * @param {string} char  为空时的占位符号
   */
  function getText(name: DatamapName, key: StrNum, char = "-"): string {
    const currMap = getMap(name);
    return currMap[key]?.text || char;
  }

  /**
   * 获取字典下拉项
   * @param name DatamapName 字典名称
   * @param includeKeys string[] 过滤时要包含的keys
   * @param isExclude boolean 是否排除掉要包含的keys
   */
  function getOpts(name: DatamapName, includeKeys: StrNum[] = [], isExclude = false): OptionItem[] {
    const currMap = getMap(name);
    let opts: OptionItem[] = [];
    for (const key in currMap) {
      const { text, disabled } = currMap[key];
      const val = isNaN(Number(key)) ? key : Number(key);
      const opt: OptionItem = { label: text, value: val };
      if (disabled !== undefined) {
        opt.disabled = disabled;
      }
      opts.push(opt);
    }
    if (typeOf(includeKeys) !== "Array") {
      throw new Error("请传入一个数组");
    }
    if (includeKeys?.length) {
      opts = opts.filter(it => {
        const isInclude = includeKeys.includes(it.value as StrNum);
        return isExclude ? !isInclude : isInclude;
      });
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
