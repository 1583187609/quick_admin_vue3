import { getCascadeLabel, getDictLabel } from "../dict";
import { CommonObj, OptionItem } from "@/core/_types";
import { typeOf } from "./base";
import { getBasePath } from "../_platform/_utils";
import { deleteAttrs, emptyVals } from "@/utils";
import allData from "../data";
import { dictTextPropKey } from "./consts";

/**
 * 判断是否在枚举区间内
 * @param {any} val 当前数据
 * @param {(string|number)[]} pickArr  枚举区间
 * @param {same|equal} type 策略类型 same（全等于===） equal（约等于==）
 */
export type ParseEnumType = "same" | "equal"; // same（全等于===） equal（约等于==）；
export function getIsInPickArr(val: any, pickArr: any[] | any = [], type: ParseEnumType = "same") {
  if (!Array.isArray(pickArr)) pickArr = [pickArr];
  if (type === "same") return pickArr.includes(val);
  if (type === "equal") return pickArr.some(it => it == val);
  throw new Error(`暂未处理此类型：${type}`);
}

/**
 * 判断是否属于该级联
 * @param val 行数据的级联codes
 * @param codes 传入的参数codes
 * @param type 策略类型（待定）
 */
export function getIsInCascader(val: any[] = [], codes: any[] = [], type?) {
  return codes.every((code, ind) => val[ind] === code);
}

/**
 * 判断数据是否在数据区间内
 * @param {any} val 当前数据
 * @param {[any,any]} range  数据区间
 * @param {date|number} type 策略类型
 */
export type ParseRangeItemType = "date" | "number";
export function getIsBetweenRange(val: any, range: [any, any], type: ParseRangeItemType = "date") {
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
 * 将字典的code翻译成文本
 * @param enName 英文名称（表名）
 * @returns 例：{role: "D_RoleType"}
 */
function getCodeMap(enName: string) {
  const target = allData[enName];
  if (!target) throw new Error(`不存在该表：${enName}`);
  const { rules = [] } = target;
  const map: CommonObj = {};
  rules.forEach((rule: CommonObj) => {
    const { type, prop, attrs } = rule;
    if (["dict", "cascader"].includes(type)) {
      const { name } = attrs;
      map[prop] = name;
    }
  });
  return map;
}
/**
 * 获取匹配策略方式
 * @param {string} type 模板类型
 * @param {any} val 传入的值
 * @returns {[strategy, way]}
 * ["match", "equal"]：id,
 * ["match", "blur"]:  string, name, phone
 * ["pick", "same"]：dict,
 * ["between", "date"]: date
 * 多义性：number（match-equal, between-number)
 * 不可能作为表单字段：address, image
 * 暂未处理完善：cascader
 * 其余默认：dict
 */

function getStrategyWay(type, val) {
  if (["createTime", "updateTime"].includes(type)) type = "date";
  else if (["createUser", "updateUser"].includes(type)) type = "name";
  if (["string", "name", "phone"].includes(type)) return ["match", "blur"];
  const t = typeOf(val);
  if (type === "number") {
    if (t === "Array") return ["between", "number"];
    return ["match", "equal"];
  }
  if (type === "date") {
    if (t === "Array") return ["between", "date"];
    if (t === "String") return ["match", "same"];
    throw new Error(`暂未处理此类型：${t}`);
  }
  if (type === "cascader") return ["cascader", "equal"];
  return ["match", "equal"];
}
/**
 * 判断是否是空参数
 * @param {any} val 要判断的参数值
 * @returns {boolean} 是否是空参数
 */
function getIsEmptyParams(val: any) {
  if (emptyVals.includes(val)) return true;
  const t = typeOf(val);
  if (t === "Array") return !val.length;
  if (t === "Object") return !Object.keys(val).length;
  return false;
}
/**
 * 获取过滤股则
 * @param enName 英文名称（表名）
 * @returns {object}
 * 返回示例
 * {
    ids: ["pick", "same", byKey],
    age: ["between", "number"],
    name: ["match", "blur"],
    create_time: ["between", "date", "create_time"],
   }
*/
export function getFilterRules(enName: string, params: CommonObj) {
  const target = allData[enName];
  if (!target) throw new Error(`不存在该表：${enName}`);
  const keys = Object.keys(params);
  if (!keys.length) return;
  const ruleMap: CommonObj = {};
  const { rules = [] } = target;
  keys.forEach(key => {
    const val = params[key];
    if (getIsEmptyParams(val)) return;
    let byKey = key;
    const targetRule = rules.find(it => {
      if (key.at(-1) !== "s") return it.prop === key;
      const isFind = it.prop === key.slice(0, -1);
      if (isFind) byKey = key.slice(0, -1);
      return isFind;
    });
    if (!targetRule) return;
    const [strategy, way] = getStrategyWay(targetRule.type, val);
    ruleMap[key] = [strategy, way, byKey];
  });
  return ruleMap;
}

/**
 * 判断是否是符合条件的被查询行
 * @param params 传递的查询参数
 * @param row 列表行数据
 * @param filterRules 查询匹配规则
 * @returns
 */
function getIsValid(params: CommonObj, row: CommonObj, filterRules: CommonObj) {
  const keys = Object.keys(params);
  return keys.every(key => {
    const val = params[key];
    if (getIsEmptyParams(val)) return true;
    const [validType, strategy, prop = key] = filterRules[key] ?? ["match", "equal"];
    if (row[prop] === undefined) return true;
    if (validType === "match") {
      if (strategy === "blur") return row[prop].includes(val);
      if (strategy === "equal") return row[prop] == val;
      if (strategy === "same") return row[prop] === val;
      throw new Error(`暂未处理此类型：${strategy}`);
    }
    // 如果为 between 和 pick 类型，则 val 是数组
    if (validType === "between") return getIsBetweenRange(row[prop], val, strategy);
    if (validType === "pick") return getIsInPickArr(row[prop], val, strategy);
    if (validType === "cascader") return getIsInCascader(row[prop], val, strategy);
    throw new Error(`暂未处理此类型：${validType}`);
  });
}

/**
 * 过滤列表（不会更改原数组，仅处理标准数据结构的级联OptionItem）
 * @param {object[]} list 要处理的列表
 * @param {object} params 传递的参数
 * @param {object} filterRules  过滤规则
 * @example filterRules = {
 * // 未写出来的，默认为 ["match", "equal", prop] 第三个参数是对应的属性名，默认跟rules的键名保持一致
    name: ["match", "blur", "name"], // 模糊匹配
    status: ["match", "same", "status"], // 严格匹配（===）
    is_cache: ["match", "equal", "is_cache"], // 非严格匹配（==）
    create_time: ["between", "date", "create_time"], // 日期区间
    age: ["between", "number", "age"], // 数字区间
    ids: ["pick", "same", "id"], // 枚举区间之一
  }
 * @param {boolean} isExclude 是否排除条件匹配的项 
 * @returns {object[]} 
 */
export function getFilterList(
  list: CommonObj[],
  params: CommonObj,
  filterRules?: any,
  delKeys?: string[],
  codeMap?: string | CommonObj
): CommonObj[] {
  if (getIsEmptyParams(list)) return [];
  if (typeof codeMap === "string") codeMap = getCodeMap(codeMap);
  // slice 浅克隆一层，不影响原数组
  return list.slice().filter((item: CommonObj) => {
    const { children } = item;
    const isValid = getIsValid(params, item, filterRules);
    if (delKeys?.length) deleteAttrs(item, delKeys, false);
    if (codeMap) fillTextProp(item, codeMap as CommonObj); // 将字典值携带上文本字段
    if (children?.length) {
      item.children = getFilterList(children, params, filterRules, delKeys, codeMap);
    }
    return isValid;
  });
}

/**
 * 填充文本属性
 * @param {object} data 要填充的数据（对象）
 */
function fillTextProp(data: CommonObj, codeMap: CommonObj) {
  const keys = Object.keys(codeMap);
  keys.forEach(prop => {
    const name = codeMap![prop];
    const t = name.charAt(0);
    const fnMap = { D: getDictLabel, C: getCascadeLabel };
    const fn = fnMap[t];
    if (!fn) throw new Error(`暂未处理此类型：${t}`);
    data[`${prop}_${dictTextPropKey}`] = fn(name, data[prop]);
  });
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
/**
 * 获取列表（根据ids，不会改变原数组）
 * @param tree 要处理的嵌套树列表
 * @param ids 要依据的ids
 * @param deleteChildren 是否删除children属性
 * @param propsMap 键值对映射
 * @returns
 */
export function getListByIds(tree: CommonObj[] = [], ids: number[] = [], deleteChildren = true, propsMap?: CommonObj) {
  if (!tree?.length || !ids?.length) return [];
  const { id: idKey = "id", children: childrenKey = "children" } = propsMap ?? {};
  const list: CommonObj[] = [];
  function cycle(arr: CommonObj[]) {
    // slice 只深克隆一层
    if (!arr?.length) return;
    arr.forEach((item: CommonObj) => {
      const id = item[idKey];
      if (id === undefined) return; // throw new Error(`不存在该属性：${byKey}`);
      if (ids.includes(id)) list.push(item);
      cycle(item[childrenKey]);
      deleteChildren && delete item[childrenKey];
    });
  }
  cycle(JSON.parse(JSON.stringify(tree)));
  return list;
}
/**
 * 删除节点（根据ids，不会改变原数组）
 * @param tree
 * @param ids
 */
export function deleteListByIds(tree: CommonObj[], ids: number[], propsMap?: CommonObj) {
  if (!tree?.length || !ids?.length) return tree;
  const { id: idKey = "id", children: childrenKey = "children" } = propsMap ?? {};
  function cycle(arr: CommonObj[]) {
    if (!arr?.length) return arr;
    return arr.filter((item: CommonObj) => {
      const id = item[idKey];
      if (item[childrenKey]?.length) item[childrenKey] = cycle(item[childrenKey]);
      return !ids.includes(id);
    });
  }
  return cycle(tree);
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
