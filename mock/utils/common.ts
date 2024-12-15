import _ from "lodash";
import dictMap from "../dict";
import { getDictText } from "../dict";
import { CommonObj, OptionItem } from "@/core/_types";
import { typeOf } from "./base";
import { getBasePath } from "../_platform/_utils";

const { merge } = _;

/**
 * 获取请求参数
 * @param req 请求体
 * @param ignoreKeys [array] 不要转成数字类型的key值数组
 */
export function getRequestParams(req: CommonObj, ignoreKeys = ["phone"]) {
  const { url, body, query, headers } = req;
  // 将字符串化的数组或对象，转成对应的数组或对象
  for (const key in query) {
    const val = query[key];
    const isParse = typeof val === "string" && ["[", "{"].includes(val.charAt(0));
    if (isParse) query[key] = JSON.parse(val);
  }
  const reqParams = merge({}, body, query);
  //是否忽略掉要转成number类型
  function isIgnore(key: string, val: any) {
    const valType = typeOf(val);
    const isEmptyStr = val === "";
    const isIgnoreKey = ignoreKeys?.includes(key);
    const isIgnoreType = ["Null", "Undefined", "Boolean", "Array"].includes(valType);
    return isEmptyStr || isIgnoreKey || isIgnoreType;
  }
  for (const key in reqParams) {
    const val = reqParams[key];
    if (isIgnore(key, val)) continue;
    const numVal = Number(val);
    if (!isNaN(numVal)) {
      reqParams[key] = numVal;
    } else {
      if (val === "true") {
        reqParams[key] = true;
      } else if (val === "false") {
        reqParams[key] = false;
      }
    }
  }
  return reqParams;
}

/**
 * 处理数据，转化成vite mock api需要的数据结构
 */
export function toViteMockApi(obj: CommonObj) {
  const arr: CommonObj[] = [];
  for (const key in obj) {
    const [method, url] = key.split(" ");
    arr.push({
      url,
      method: method.toLowerCase(), //一定要转为小写，不然打包出来会提示404，踩了很久的坑
      response: obj[key],
    });
  }
  return arr;
}

// 判断是否在枚举区间内
export type ParseEnumType = "same" | "equal"; // same（全等于===） equal（约等于==）；
export function getIsInEnum(val: any, enums: any[] | any = [], parse: ParseEnumType = "same") {
  if (!Array.isArray(enums)) enums = [enums];
  if (parse === "same") return enums.includes(val);
  if (parse === "equal") return enums.some(it => it == val);
  throw new Error(`暂未处理此类型：${parse}`);
}

/**
 * 判断数据是否在数据区间内
 * @param range [any,any] 数据区间
 * @param now 当前数据
 * @param parse 要转换成的格式，之后再进行对比
 */
export type ParseRangeItemType = "date" | "number";
export function getIsInRange(val: any, range: [any, any], parse: ParseRangeItemType = "date") {
  if (!range?.length) return true;
  let [min, max] = range;
  if (parse === "date") {
    if (!min.includes(" ")) min += " 00:00:00";
    if (!max.includes(" ")) max += " 23:59:59";
    if (!val.includes(" ")) val += " 00:00:00";
    min = new Date(min).getTime();
    max = new Date(max).getTime();
    val = new Date(val).getTime();
  } else if (parse === "number") {
    min = Number(min);
    max = Number(max);
    val = Number(val);
  } else {
    throw new Error(`暂未处理此类型：${parse}`);
  }
  return val > min && val < max;
}

/**
 * 过滤列表
 * @param {object[]} list 要处理的列表
 * @param {object} params 传递的参数
 * @param {object} rules  过滤规则
 * @example rules = {
 * // 未写出来的，默认为 ["match", "equal", prop] 第三个参数是对应的属性名，默认跟rules的键名保持一致
    name: ["match", "blur", "name"], // 模糊匹配
    status: ["match", "same", "status"], // 严格匹配（===）
    is_cache: ["match", "equal", "is_cache"], // 非严格匹配（==）
    create_time: ["range", "date", "create_time"], // 日期区间
    age: ["range", "number", "age"], // 数字区间
    ids: ["enums", "same", "id"], // 枚举区间之一
  }
 * @param {boolean} isExclude 是否排除条件匹配的项 
 * @returns {object[]}
 */
export function getFilterList(list: CommonObj[], params: CommonObj, rules = {}, isExclude = false) {
  const keys = Object.keys(params);
  return list?.filter((item: CommonObj) => {
    const { children } = item;
    const isValid = keys.every(key => {
      const val = params[key];
      if (val === undefined) return true;
      const [validType, strategy, prop = key] = rules[key] ?? ["match", "equal"];
      if (validType === "match") {
        if (strategy === "blur") return item[prop].includes(val);
        if (strategy === "equal") return item[prop] == val;
        if (strategy === "same") return item[prop] === val;
        throw new Error(`暂未处理此类型：${strategy}`);
      }
      if (validType === "range") return getIsInRange(item[prop], val, strategy);
      if (validType === "enums") return getIsInEnum(item[prop], val, strategy);
      throw new Error(`暂未处理此类型：${validType}`);
    });
    if (children?.length) {
      item.children = getFilterList(children, params, rules, isExclude);
      // return !!item.children?.length;
    }
    return isExclude ? !isValid : isValid;
  });
}

/**
 * 根据字典获取下拉选项数据
 * @param name string 字典名
 * @param ignoreKeys array 要忽略翻译的键名数组集合
 */
export function getOptsFromDict(name: string, ignoreKeys: string[]) {
  const opts: OptionItem[] = [];
  const map = dictMap[name];
  if (!map) return null;
  for (const key in map) {
    if (!ignoreKeys?.includes(key)) {
      opts.push({ value: Number(key), label: map[key] });
    }
  }
  return opts;
}
/**
 * 获取字典映射中的keys值
 * @param name string 字典名
 * @param val number 指定值
 */
export function getDictMapKeys(name: string, val: string | number) {
  if (val === undefined) {
    return Object.keys(dictMap[name]).map(item => Number(item));
  } else {
    return [val];
  }
}

/**
 * 修改一个对象，例：用户
 * @param newObj object 新传入的对象
 * @param oldObj object 对象默认（初始）值
 * @return object 返回合并之后的对象
 */
export function addObj(newObj: CommonObj, oldObj: CommonObj, othObj: CommonObj) {
  // const obj: CommonObj = {};
  // for (const key in oldObj) {
  //   obj[key] = newObj[key] ?? oldObj[key];
  // }
  // return obj;
  return merge({}, oldObj, newObj);
}

/**
 * 获取构造对象
 * @param obj object 要依照的对象
 * @param excludeNames string[] 要排除生成的属性名
 * @return object 构造好之后的新对象
 */
export function getConstructorObj(obj: CommonObj = {}, excludeNames?: string[]) {
  const newObj: CommonObj = {};
  const typeMap: CommonObj = {
    Undefined: undefined,
    Boolean: false,
    Number: NaN,
    String: "",
    Function: () => {},
  };
  for (const key in obj) {
    // if (!excludeNames?.includes(key)) {
    const type = typeOf(obj[key]);
    newObj[key] = typeMap[type];
    // }
  }
  return newObj;
}

/**
 * 获取NavsTree
 * @param navs object[] 原始导航树数据
 */
export function getNavsTree(navs?: CommonObj[]): CommonObj[] {
  if (!navs) return [];
  return navs.map((item: CommonObj, ind) => {
    const { label, component = "", path, children, status, is_cache, type, ...rest } = item;
    return {
      name: label,
      menu_path: path,
      component_path: component,
      children: getNavsTree(children),
      remark: "", //备注
      order: 1,
      perms: "menu:list:auth",
      status,
      status_text: getDictText("D_EnableStatus", status),
      type,
      type_text: getDictText("D_MenuType", type),
      is_link: type === 2 ? 1 : 0,
      is_cache,
      ...rest,
    };
  });
}

/**
 * 修改一个对象，例：用户
 * @param arr object[] 树形数据数组
 * @param byId string 查找时要依据的id
 * @param propsMap object 属性映射
 * @return object 查找到的树节点
 */
export function findTreeNode(arr: any[], byId: string, propsMap: CommonObj = { id: "id", children: "children" }) {
  let node = null;
  function getFindInfo(arr: any[], byId: string): any {
    arr?.find((item: any, ind: number) => {
      const isFind = byId === item[propsMap.id];
      if (isFind) {
        node = item;
        return isFind;
      } else {
        return !!getFindInfo(item[propsMap.children], byId);
      }
    });
  }
  getFindInfo(arr, byId);
  return node;
}

/**
 * 获取图片地址
 * @tips  性别： 0未知 1男 2女
 * @params maxNum 跟性别头像的最大下标值保持一致
 */
export function getAvatarUrl(gender: 0 | 1 | 2, maxNum = 6) {
  //性别 0未知 1男 2女
  const max = maxNum + 1;
  const ind = Math.floor(Math.random() * max);
  const genderMap = {
    1: "boy",
    2: "girl",
  };
  if (gender === 0) return "";
  return `${getBasePath()}/static/imgs/${genderMap[gender]}-${ind}.jpg`;
}
