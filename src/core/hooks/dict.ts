import dictData from "@/dict";
import { DictName } from "@/dict/_types";
import { getStorage, typeOf, storage, StorageType, getTextFromOptions, emptyStr, needParam } from "@/utils";
import { CommonObj, StrNum, OptionItem } from "@/core/_types";
import { GetMockCommon } from "@/api-mock";

export type DictObj = CommonObj;

// 配置项，启用本地存储类型、存储自动过期时间（过期后，会重新请求更新存储数据）
const storageType: "" | StorageType = "local"; //存储方式，可选值： '', local、session、cookie
const autoExpiredTimes = 1000 * 10; // 自动过期时间。启用本地存储类型且自动过期后，会重新发起请求更新本地存储。默认为：10秒
const enableStorage = false; // 是否启用本地缓存

/**
 * 判断是否过期
 * @returns {boolean} 是否过期
 */
function getIsExpired() {
  const expiredDate = storage.getItem("dictExpiredDate");
  return !expiredDate || Date.now() > new Date(expiredDate).getTime() + autoExpiredTimes;
}
/**
 * 获取有效期内存储的字典数据
 * @param {DictName} name 字典名称
 * @param {boolean} enable 是否启用存储进行缓存数据
 * @returns
 */
function getStorageDictData(name: DictName) {
  if (!enableStorage || getIsExpired()) return;
  return getStorage(`dict.${name}`, storageType as StorageType);
}

// 获取下拉项的文本（只可能是select）
function getSelectText(map: DictObj = needParam(), code: StrNum = needParam(), emptyChar = emptyStr) {
  return map[code]?.text || emptyChar;
}
// 获取数组的文本，包含：select、cascader、tree
function getCascaderText(list: OptionItem[] = needParam(), codes: StrNum[] = needParam(), emptyChar = emptyStr) {
  if (!list?.length) return emptyChar;
  return getTextFromOptions(list as OptionItem[], codes, undefined, emptyChar);
}

/**
 * 字典映射处理hooks
 * @notice 后续完善本地缓存字典逻辑（只针对异步的进行缓存，更新时机为登录后或手动刷新、或循环监听刷新）
 * @param {string[]} initDictNames 处于性能优化的目的，只初始化指定名称的字典
 */
export default () => {
  // 初始化批量下拉
  initBatch();
  function initBatch() {
    GetMockCommon().then((res: any) => {
      const list = res.records.slice(0, 3);
      list.map((item, ind) => {
        const name = `D_BatchInsert_${ind}`;
        const opts = Array(3).fill("");
        dictData[name] = opts.map((it, i) => ({ label: `批量请求下拉${ind}_选项${i}`, value: i }));
      });
      return dictData;
    });
  }
  /**
   * 设置字典映射
   * @param {DictName} name 字典索引名称
   * @returns
   */
  function setMap(name: DictName, val: any) {
    dictData[name] = val;
    // const isAsync = [""].includes("test");
    // if (enableStorage && isAsync) {
    //   setStorage(`dict.${name}`, val, storageType as StorageType);
    // }
  }
  /**
   * 获取tagMap
   * @param {DictName} name 映射map的名称
   * @returns 如果为对象，则是下拉项，如果为数组，则是树形数据或级联数据
   */
  function getMap(name: DictName | DictObj | Promise<any>): DictObj | OptionItem[] | Function | Promise<any> {
    const t = typeOf(name);
    if (t === "Object") return name as DictObj;
    if (t === "String") {
      const currMap = dictData[name as string];
      if (!currMap) throw new Error(`不存在该字典：${name}`);
      return currMap;
    }
    if (t === "Promise") return name as Promise<any>;
    throw new Error(`暂不支持此类型：${t}`);
  }

  // 是否是经过计算之后得到的最简类型（如果是，需要设置下，进行缓存，避免后面再进行运算）
  function isAfterCalRes(t, level) {
    if (!level) return false;
    return ["Object", "Array", "Promise"].includes(t);
  }
  /**
   * 获取字典文本内容（下拉项或级联的文本内容）
   * @param {string|object} name  字典名称(object是提供给特殊的自定义对象使用的)
   * @param {string} code  字典中的code值
   * @param {object} propsMap  属性名label、value等的映射
   * @param {string} emptyChar  为空时的占位符号
   * @notice （不提供 propsMap?: CommonObj，应该由某个方法统一转成标准级联数据结构）
   */
  function getText(
    name: DictName | DictObj = needParam(),
    code: StrNum | StrNum[] = needParam(),
    emptyChar = emptyStr,
    level = 0
  ): string | Promise<any> {
    const currMap = getMap(name);
    const t = typeOf(currMap);
    if (isAfterCalRes(t, level)) setMap(name as DictName, currMap);
    if (t === "Object") return getSelectText(currMap, code as StrNum, emptyChar);
    if (t === "Array") return getCascaderText(currMap as OptionItem[], code as StrNum[], emptyChar);
    if (t === "Promise") return currMap as Promise<any>;
    if (t === "Function") return getText((currMap as Function)(), code, emptyChar, level + 1);
    throw new Error(`暂未处理类型：${t}`);
  }
  /**
   * 获取字典下拉项
   * @param {DictName} name 字典名称
   * @param {string[]} includeKeys  过滤时要包含的keys
   * @param {boolean} isExclude  是否排除掉要包含的keys
   */
  function getOpts(name: DictName | DictObj, includeKeys?: StrNum[], isExclude?: boolean, level = 0): OptionItem[] | Promise<any> {
    const currMap = getMap(name);
    const t = typeOf(currMap);
    if (isAfterCalRes(t, level)) setMap(name as DictName, currMap);
    // 说明是select、cascader、tree的数据
    if (t === "Array") return currMap as OptionItem[];
    // 说明是select
    if (t === "Object") {
      const opts: OptionItem[] = [];
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
    if (t === "Promise") return currMap as Promise<any>;
    if (t === "Function") return getOpts((currMap as Function)(), includeKeys, isExclude, level + 1);
    throw new Error(`暂未处理此种类型：${t}`);
  }
  /**
   * 获取字典名称
   * @param name 名称
   * @returns 数组或数组映射对象
   */
  function getNames(type?: "lazy" | "common") {
    // if (!type) return initDictNames;
    // if (type === "lazy") return asyncNames;
    // if (type === "common") {
    //   const names: DictName[] = [];
    //   initDictNames.forEach((name: DictName) => {
    //     if (!asyncNames.includes(name)) names.push(name);
    //   });
    //   return names;
    // }
    // throw new Error(`传参类型错误：${type}`);
  }
  return {
    getMap,
    setMap,
    getText,
    getOpts,
    getNames,
  };
};
