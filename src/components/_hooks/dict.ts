import { reactive } from "vue";
import dictData from "@/dict";
import { DictName } from "@/dict/_types";
import { emptyVals, setStorage, getStorage, typeOf, storage, StorageType, showMessage } from "@/utils";
import { CommonObj, StrNum, OptionItem } from "@/vite-env";
import dayjs from "dayjs";

// 配置项，启用本地存储类型、存储自动过期时间（过期后，会重新请求更新存储数据）
const storateType: StorageType | "" = ""; //存储方式，可选值： '', local、session、cookie
const autoExpiredTimes = 1000 * 2; // 自动过期时间。自动过期后，会重新发起请求更新本地存储。默认为：2秒

/**
 * 字典映射处理hooks
 * @notice 启用本地存储逻辑待完善
 * @param {string[]} initDictNames 处于性能优化的目的，只初始化指定名称的字典
 */
const lazyProxyLoaded: CommonObj = {}; //{[name]: true || undeinde}
export default (initDictNames = Object.keys(dictData) as DictName[]) => {
  const lazyNames: DictName[] = []; //懒加载请求的下拉项
  const commonMap: CommonObj = {}; //普通映射
  const proxyMap = reactive<CommonObj>({}); //代理映射

  initMap();

  /**
   * 初始化字典映射
   * @param {boolean} handleAll 是否初始化处理所有异步请求接口
   * @param {number} expired 如果使用了本地存储，间隔多久刷新一次本地存储
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
  }

  /**
   * 获取有效期内存储的数据
   * @param name 字典名称
   * @returns
   */
  function getValidStorageData(name: DictName): undefined | CommonObj {
    const lastTime = storage.getItem("lastRefreshDate");
    const isExpired = !lastTime || new Date(lastTime).getTime() + autoExpiredTimes < Date.now();
    if (!isExpired) return getStorage(`dict.${name}`, storateType as StorageType);
    updateStorageDict(); //过期之后全量更新字典
  }

  /**
   * 处理需计算的的字典映射（非对象、数组类型）
   * @param {DictName} name 字典名称
   * @param {boolean} first 是否是第一次
   * @returns
   */
  function handleCalculateMap(name: DictName) {
    const currMap = dictData[name];
    if (!currMap) throw new Error(`未找到字典映射：${name}`);
    if (lazyProxyLoaded[name]) return; //如果加载过，便不再进行加载
    lazyProxyLoaded[name] = true;
    if (storateType) {
      const data = getValidStorageData(name); // 获取本地存储数据
      if (data) return (proxyMap[name] = data);
    }
    (currMap as Function)()().then(res => {
      proxyMap[name] = res;
      storateType && setStorage(`dict.${name}`, res, storateType);
    });
  }

  /**
   * 设置字典映射
   * @param name 字典索引名称
   * @returns
   */
  function setMap(name: DictName) {
    const currMap = dictData[name];
    if (!currMap) throw new Error(`未找到字典映射：${name}`);
    if (!lazyNames.includes(name)) throw new Error(`无需设置此种类型：${typeOf(currMap)}`);
    handleCalculateMap(name);
  }

  /**
   * 更新存储中的字典数据
   * @param {DictName|DictName[]} names 字典映射名称
   */
  function updateStorageDict(names: DictName | DictName[] = lazyNames) {
    if (!storateType) return showMessage("未开启本地存储，故无需执行更新操作", "warning");
    if (typeof names === "string") names = [names];
    names.forEach((name: DictName) => setMap(name));
    // 如果是全量刷新存储在storage中的字典数据，则需要更新下刷新时间
    if (names === lazyNames) {
      storage.setItem("lastRefreshDate", dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
    }
  }

  /**
   * 获取tagMap
   * @param name 映射map的名称
   */
  function getMap(name: DictName) {
    const currMap = proxyMap[name] ?? commonMap[name];
    if (!currMap) handleCalculateMap(name);
    return currMap;
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
    if (t === "Object") return (typeof val === "string" ? val : val?.text) || char;
    // 说明是cascader或tree
    if (t === "Array") return getCascaderOrTreeText(name, val, char);
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
    const t = typeOf(currMap);
    if (t === "Array") return currMap as OptionItem[]; // 说明是cascader或tree的数据
    if (t === "Undefined") return currMap; // 说明是懒加载函数
    if (t === "Object") {
      // 其余的说明是select
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

  /***
   * 获取cascader或tree中的文本
   * @notice 待完善
   */
  function getCascaderOrTreeText(name: DictName, val: StrNum, char = "-") {
    if (emptyVals.includes(val as any)) return char;
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

  /**
   * 获取字典名称
   * @param name 名称
   * @returns 数组或数组映射对象
   */
  function getDictNames(type?: "lazy" | "common") {
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
    getDictNames,
    updateStorageDict,
  };
};
