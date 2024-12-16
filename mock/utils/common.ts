import { getDictLabel } from "../dict";
import { CommonObj } from "@/core/_types";
import { typeOf } from "./base";
import { getBasePath } from "../_platform/_utils";
import { deleteAttrs } from "@/utils";

/**
 * 判断是否在枚举区间内
 * @param {any} val 当前数据
 * @param {(string|number)[]} range  枚举区间
 * @param {same|equal} type 策略类型 same（全等于===） equal（约等于==）
 */
export type ParseEnumType = "same" | "equal"; // same（全等于===） equal（约等于==）；
export function getIsInEnums(val: any, enums: any[] | any = [], type: ParseEnumType = "same") {
  if (!Array.isArray(enums)) enums = [enums];
  if (type === "same") return enums.includes(val);
  if (type === "equal") return enums.some(it => it == val);
  throw new Error(`暂未处理此类型：${type}`);
}

/**
 * 判断数据是否在数据区间内
 * @param {any} val 当前数据
 * @param {[any,any]} range  数据区间
 * @param {date|number} type 策略类型
 */
export type ParseRangeItemType = "date" | "number";
export function getIsBetweenRange(val: any, range: [any, any], type: ParseRangeItemType = "date") {
  if (!range?.length) return true;
  let [min, max] = range;
  if (type === "date") {
    if (!min.includes(" ")) min += " 00:00:00";
    if (!max.includes(" ")) max += " 23:59:59";
    if (!val.includes(" ")) val += " 00:00:00";
    min = new Date(min).getTime();
    max = new Date(max).getTime();
    val = new Date(val).getTime();
  } else if (type === "number") {
    min = Number(min);
    max = Number(max);
    val = Number(val);
  } else {
    throw new Error(`暂未处理此类型：${type}`);
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
export function getFilterList(list: CommonObj[], params: CommonObj, rules = {}, isExclude = false, privateKeys?: string[]): CommonObj[] {
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
      if (validType === "range") return getIsBetweenRange(item[prop], val, strategy);
      if (validType === "enums") return getIsInEnums(item[prop], val, strategy);
      throw new Error(`暂未处理此类型：${validType}`);
    });
    if (privateKeys?.length) deleteAttrs(item, privateKeys, false);
    if (children?.length) {
      item.children = getFilterList(children, params, rules, isExclude, privateKeys);
      // return !!item.children?.length;
    }
    return isExclude ? !isValid : isValid;
  });
}

/**
 * 获取构造对象
 * @param {object} obj  要依照的对象
 * @param {string[]} excludeNames  要排除生成的属性名
 * @return {object} 构造好之后的新对象
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
 * @param {object[]} navs  原始导航树数据
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
      remark: "", // 备注
      order: 1,
      perms: "menu:list:auth",
      status,
      status_text: getDictLabel("D_EnableStatus", status),
      type,
      type_text: getDictLabel("D_MenuType", type),
      is_link: type === 2 ? 1 : 0,
      is_cache,
      ...rest,
    };
  });
}

/**
 * 查找树节点
 * @param {object[]} arr  树形数据数组
 * @param {string} byId  查找时要依据的id
 * @param {object} propsMap  属性映射
 * @return {object} 查找到的树节点
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
 * @param {0|1|2}  gender 性别： 0未知 1男 2女
 * @param {number} maxNum 跟性别头像的最大下标值保持一致
 */
export function getAvatarUrl(gender: 0 | 1 | 2, maxNum = 6) {
  // 性别 0未知 1男 2女
  const max = maxNum + 1;
  const ind = Math.floor(Math.random() * max);
  const genderMap = { 1: "boy", 2: "girl" };
  if (gender === 0) return "";
  return `${getBasePath()}/static/imgs/${genderMap[gender]}-${ind}.jpg`;
}

/**
 * 获取树节点总数
 * @param {object[]} tree
 */
export function getListTotal(tree: CommonObj[] = [], total = 0) {
  if (!tree?.length) return total;
  tree.forEach((item: CommonObj) => {
    total++;
    getListTotal(item.children, total);
  });
  return total;
}
