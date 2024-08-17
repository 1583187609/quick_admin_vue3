import _ from "lodash";
import { reactive } from "vue";
import dictData from "@/dict";
import { DictName } from "@/dict/_types";
import { emptyVals, setStorage, getStorage, typeOf } from "@/utils";
import { CommonObj, StrNum, OptionItem } from "@/vite-env";

const { merge } = _;

/**
 * 当传入names时，会以响应式对象读取数据
 * @param {DictName[]} names 字典映射名称
 * @notice 考虑性能因素，所以这样设计
 */
export default () => {
  const asyncNames: DictName[] = []; //异步请求的下拉项
  const storageNames: DictName[] = []; //需要本地存储的下拉项
  const commonMap = {}; //普通映射
  const proxyMap = reactive({}); //代理映射
  initMap();
  /**
   * 初始化字典映射
   */
  function initMap() {
    Object.keys(dictData).forEach((name: DictName) => {
      const currMap = dictData[name];
      const t = typeOf(currMap);
      if (["Object", "Array"].includes(t)) {
        commonMap[name] = currMap;
        return;
      }
      const data = getStorage(`dict.${name}`);
      if (t === "Function") {
        storageNames.push(name);
        if (data) return (commonMap[name] = data);
        const calData = currMap();
        if (typeOf(calData) === "Promise") {
          asyncNames.push(name);
          currMap().then(res => {
            proxyMap[name] = res;
            setStorage(`dict.${name}`, res);
          });
          return;
        }
        commonMap[name] = calData;
        return setStorage(`dict.${name}`, calData);
      }
      if (t === "Promise") {
        storageNames.push(name);
        asyncNames.push(name);
        if (data) return (proxyMap[name] = data);
        return currMap.then(res => {
          proxyMap[name] = res;
          setStorage(`dict.${name}`, res);
        });
      }
      if (t === "AsyncFunction") {
        storageNames.push(name);
        asyncNames.push(name);
        if (data) return (proxyMap[name] = data);
        return currMap().then(res => {
          proxyMap[name] = res;
          setStorage(`dict.${name}`, res);
        });
      }
    });
  }

  /**
   * 获取字典数据
   * @param name 字典名
   * @returns
   */
  async function getCalculateData(name: DictName) {
    return await new Promise(resolve => {
      const currMap = dictData[name];
      const t = typeOf(currMap);
      if (t === "Function") {
        const result = currMap();
        return typeOf(result) === "Promise" ? result.then(res => resolve(res)) : result;
      }
      if (t === "Promise") return currMap.then(res => resolve(res));
      if (t === "AsyncFunction") return currMap().then(res => resolve(res));
      throw new Error(`暂未处理此种类型：${t}`);
    });
  }

  /**
   * 设置字典映射
   * @param name 字典索引名称
   * @returns
   */
  async function setMap(name: DictName) {
    const currMap = dictData[name];
    const t = typeOf(currMap);
    if (!storageNames.includes(name)) throw new Error(`无需设置此种类型：${t}`);
    const data = await getCalculateData(name);
    if (asyncNames.includes(name)) {
      proxyMap[name] = data;
      setStorage(`dict.${name}`, data);
    }
    throw new Error(`暂未处理此种类型：${t}`);
  }

  /**
   * 获取tagMap
   * @param name 映射map的名称
   * @param codeMap 例如：YesNo 的 codeMap: {0:1, 1:0}，显示时就会将是否对调
   */
  function getMap(name: DictName, codeMap?: CommonObj) {
    const currMap = proxyMap[name] ?? commonMap[name];
    const isAsync = asyncNames.includes(name);
    if (!isAsync && !currMap) return console.error(`未找到字典映射：${name}`);
    if (!codeMap) return currMap;
    const tempMap: CommonObj = {};
    for (const key in codeMap) {
      tempMap[key] = currMap[codeMap[key]];
    }
    return merge({}, currMap, tempMap); //是为了可以不写完所有code（只写出需要对调的code即可）
  }

  /**
   * 获取字典文本内容
   * @param {string} name  字典名称
   * @param {string} key  字典中的建名
   * @param {select|cascader|tree} type  下拉项的类型
   * @param {string} char  为空时的占位符号
   */
  function getText(name: DictName, key: StrNum, char = "-"): string {
    const currMap = getMap(name);
    const val = currMap[key];
    const t = typeOf(currMap);
    // 说明是select
    if (t === "Object") {
      return (typeof val === "string" ? val : val?.text) || char;
    }
    // 说明是cascader或tree
    if (t === "Array") {
      return getCascaderOrTreeText(name, val, char);
    }
    throw new Error(`暂未处理类型：${t}`);
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
    const t = typeOf(currMap);
    // 说明是cascader或tree 或 待计算的异步函数
    if (t === "Array" || (t === "Undefined" && asyncNames.includes(name))) return currMap;
    // 说明是select
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

  // 获取cascader或tree中的文本
  function getCascaderOrTreeText(name: DictName, val: StrNum, char = "-") {
    if (emptyVals.includes(val)) return char;
    const options: OptionItem[] = getMap(name);
    if (!options) throw new Error(`字典中未找到：${name}`);
    let text = "";
    options.find(item => {
      const { label, children = [] } = item;
      const target = children.find((it: OptionItem) => it.value === val);
      if (target) text = `${label}${char}${target.label}`;
      return !!target;
    });
    return text;
  }

  return {
    getMap,
    setMap,
    getText,
    getOpts,
  };
};
