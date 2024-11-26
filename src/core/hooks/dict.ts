import { reactive } from "vue";
import dictData from "@/dict";
import { DictName } from "@/dict/_types";
import {
  emptyVals,
  setStorage,
  getStorage,
  typeOf,
  storage,
  StorageType,
  showMessage,
  getTextFromOptions,
  emptyStr,
  needParam,
} from "@/utils";
import { CommonObj, StrNum, OptionItem } from "@/vite-env";
import dayjs from "dayjs";
import { GetMockCommonList } from "@/api-mock";

// 配置项，启用本地存储类型、存储自动过期时间（过期后，会重新请求更新存储数据）
const storateType: "" | StorageType = "local"; //存储方式，可选值： '', local、session、cookie
const autoExpiredTimes = 1000 * 10; // 自动过期时间。启用本地存储类型且自动过期后，会重新发起请求更新本地存储。默认为：10秒

/**
 * 判断是否过期
 * @returns {boolean} 是否过期
 */
function getIsExpired() {
  const expiredDate = storage.getItem("dictExpiredDate");
  return !expiredDate || Date.now() > new Date(expiredDate).getTime() + autoExpiredTimes;
}

/**
 * 字典映射处理hooks
 * @param {string[]} initDictNames 处于性能优化的目的，只初始化指定名称的字典
 */
const lazyProxyLoaded: CommonObj = {}; //{[name]: true || undeinde}
export default (initDictNames = Object.keys(dictData) as DictName[]) => {
  const lazyNames: DictName[] = []; //懒加载请求的下拉项
  const insertNames: DictName[] = storage.getItem("insertDictNames") ?? []; //批量插入的下拉项
  const commonMap: CommonObj = {}; //普通映射
  const proxyMap = reactive<CommonObj>({}); //代理映射

  initMap();

  /**
   * 初始化字典映射
   */
  function initMap() {
    initDictNames.forEach((name: DictName) => {
      const currMap = dictData[name];
      if (!currMap) throw new Error(`未找到字典映射：${name}`);
      if (["Object", "Array"].includes(typeOf(currMap))) return (commonMap[name] = currMap);
      // 懒加载的下拉项
      if ((currMap as Function).name === "lazy") return lazyNames.push(name);
      // 需要普通函数进行处理的下拉项
      if (commonMap[name]) return;
      const data = (currMap as Function)();
      const t = typeOf(data);
      if (t !== "Object") throw new Error(`暂未处理函数返回的此种类型：${t}`);
      commonMap[name] = data;
      return;
    });
    insertMap();
  }

  /**
   * 插入通过接口一次性请求得到的字典map
   * @notice 初次加载时，是一定要批量插入的（不用按需插入）
   * @notice 批量插入逻辑待完善
   */
  async function insertMap() {
    if (insertNames.length && !getIsExpired()) {
      return insertNames.forEach((name: DictName) => {
        proxyMap[name] = getStorage(`dict.${name}`, storateType as StorageType);
      });
    }
    return await GetMockCommonList().then((res: any) => {
      const list = res.records.slice(0, 3);
      const inserted = insertNames.length > 0; // 是否已经插入过names
      list.map((item, ind) => {
        const name = "TestInsert_" + ind;
        !inserted && insertNames.push(name as DictName);
        const opts = Array(3)
          .fill("")
          .map((it, i) => ({ label: `批量插入${ind}_${i}`, value: i }));
        proxyMap[name] = opts;
        storateType && setStorage(`dict.${name}`, opts, storateType);
      });
      storage.setItem("insertDictNames", insertNames);
    });
  }

  /**
   * 获取有效期内存储的数据
   * @param {DictName} name 字典名称
   * @returns
   */
  function getValidStorageData(name: DictName): null | CommonObj {
    if (!getIsExpired()) return getStorage(`dict.${name}`, storateType as StorageType);
    updateStorageDict(); //过期之后全量更新字典
    return null;
  }

  /**
   * 处理需计算的的字典映射（非对象、数组类型）
   * @param {DictName} name 字典名称
   * @returns
   */
  async function handleCalculateMap(name: DictName) {
    const currMap = dictData[name];
    if (!currMap) throw new Error(`未找到字典映射：${name}`);
    if (lazyProxyLoaded[name]) return; //如果加载过，便不再进行加载
    lazyProxyLoaded[name] = true;
    if (storateType) {
      const data = getValidStorageData(name); // 获取本地存储数据
      if (data) return (proxyMap[name] = data);
    }
    return await (currMap as Function)()().then(res => {
      proxyMap[name] = res;
      storateType && setStorage(`dict.${name}`, res, storateType);
      return res;
    });
  }

  /**
   * 更新存储中的字典数据
   * @param {DictName | DictName[]} names 字典映射名称
   */
  async function updateStorageDict(names: DictName | DictName[] = lazyNames) {
    if (!storateType) return showMessage("未开启本地存储，故无需执行更新操作", "warning");
    if (typeof names === "string") names = [names];
    await Promise.all(names.map(async (name: DictName) => await setMap(name)));
    await insertMap();
    // 如果是全量刷新存储在storage中的字典数据，则需要更新刷新时间
    if (names === lazyNames) {
      storage.setItem("dictExpiredDate", dayjs(Date.now() + autoExpiredTimes).format("YYYY-MM-DD HH:mm:ss"));
    }
  }

  /**
   * 设置字典映射
   * @param {DictName} name 字典索引名称
   * @returns
   */
  async function setMap(name: DictName) {
    const currMap = dictData[name];
    if (!currMap) throw new Error(`未找到字典映射：${name}`);
    if (!lazyNames.includes(name)) throw new Error(`无需设置此种类型：${typeOf(currMap)}`);
    return await handleCalculateMap(name);
  }

  /**
   * 获取tagMap
   * @param {DictName} name 映射map的名称
   */
  function getMap(name: DictName) {
    const currMap = proxyMap[name] ?? commonMap[name];
    if (!currMap) handleCalculateMap(name);
    return currMap;
  }

  /**
   * 获取字典文本内容
   * @param {string|object} name  字典名称(object是提供给特殊的自定义对象使用的)
   * @param {string} code  字典中的code值
   * @param {object} propsMap  属性名label、value等的映射
   * @param {string} emptyChar  为空时的占位符号
   */
  function getText(
    name: DictName | CommonObj = needParam(),
    code: StrNum | StrNum[] = needParam(),
    propsMap?: CommonObj,
    emptyChar = emptyStr
  ): string {
    // if (emptyVals.includes(code as any)) return emptyChar;
    const currMap = typeof name === "string" ? getMap(name) : name;
    if (!currMap) return emptyChar; // throw new Error(`未找到${name}的映射`);
    if (typeOf(code) === "Array") return getTextFromOptions(currMap, code as StrNum[], propsMap, emptyChar);
    const val = currMap[code as StrNum];
    const t = typeOf(currMap);
    // 说明是select
    if (t === "Object") {
      const textStr = typeof val === "string" ? val : val?.text;
      return emptyVals.includes(textStr) ? emptyChar : textStr;
    }
    // 说明是select、cascader、tree
    if (t === "Array") return getTextFromOptions(currMap, code as StrNum, propsMap, emptyChar);
    throw new Error(`暂未处理类型：${t}`);
  }

  /**
   * 获取字典下拉项
   * @param {DictName} name 字典名称
   * @param {string[]} includeKeys  过滤时要包含的keys
   * @param {boolean} isExclude  是否排除掉要包含的keys
   */
  function getOpts(name: DictName, includeKeys?: StrNum[], isExclude?: boolean): OptionItem[] {
    const currMap = getMap(name);
    const t = typeOf(currMap);
    if (t === "Array") return currMap as OptionItem[]; // 说明是select、cascader、tree的数据
    if (t === "Undefined") return currMap; // 说明是懒加载函数请求到的数据
    if (t === "Object") {
      // 说明是select
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
    throw new Error(`暂未处理此种类型：${t}`);
  }

  /**
   * 获取字典名称
   * @param name 名称
   * @returns 数组或数组映射对象
   */
  function getNames(type?: "lazy" | "common") {
    if (!type) return initDictNames;
    if (type === "lazy") return lazyNames;
    if (type === "common") {
      const names: DictName[] = [];
      initDictNames.forEach((name: DictName) => {
        if (!lazyNames.includes(name)) names.push(name);
      });
      return names;
    }
    throw new Error(`传参类型错误：${type}`);
  }

  return {
    getMap,
    setMap,
    getText,
    getOpts,
    getNames,
    updateStorageDict,
  };
};
