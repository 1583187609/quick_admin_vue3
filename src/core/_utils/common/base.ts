/********************************************************************/
/*************** 为Base*.vue正常执行逻辑提供的常用的方法 ***************/
/********************************************************************/

import { regexp, showMessage, toCamelCase } from "@/core/_utils";
import _ from "lodash";
import config from "@/config";
import type { ConfigMergeStrategy } from "@/config/_types";
import { CommonObj, StrNum } from "@/vite-env";
import { BtnName } from "@/core/BaseBtn/_types";
import { propsJoinChar, emptyVals } from "@/utils";

const { merge, cloneDeep } = _;

/**
 * 检测元素所属类型
 * @param {any} ele 要检测的元素
 * Object.prototype.toString.call(*)的可能结果如下所示：
 * @example null             [object Null]
 * @example undefined        [object Undefined]
 * @example Symbol());       [object Symbol]
 * @example true             [object Boolean]
 * @example ''               [object String]
 * @example 1                [object Number]
 * @example []               [object Array]
 * @example {}               [object Object]
 * @example new Date()       [object Date]
 * @example new Function()   [object Function]
 * @example new RegExp()     [object RegExp]
 * @example new Error()      [object Error]
 * @example document         [object HTMLDocument]
 * @example window           [object global] window 是全局对象 global 的引用
 * @param {*} ele 待检测的对象、字符串、数组等
 * @returns {String} 元素类型（string、number、boolean、symbol、undefined、null、function、date、array、object、regexp、error、htmldocument、global）
 */
export type TypeOfReturn =
  | "Null"
  | "Undefined"
  | "Symbol"
  | "Boolean"
  | "String"
  | "Number"
  | "Array"
  | "Object"
  | "Date"
  | "Function"
  | "Promise"
  | "AsyncFunction"
  | "RegExp"
  | "Error"
  | "HTMLDocument"
  | "global";
export const typeOf = (ele: any): TypeOfReturn => {
  const endStr = Object.prototype.toString.call(ele);
  return endStr.split(" ")[1].slice(0, -1) as TypeOfReturn;
};

/**
 * 通用克隆方法
 * @param {any} data 要克隆的数据
 * @returns
 * @notice JSON.parse(JSON.stringify()) 会删除函数的键值对；structuredClone会有兼容性问题；lodash的cloneDeep的缺点待完善
 */
// export const commonClone = (data: any) => {
//   if (typeof data !== "object" || data === null) throw new Error("基础数据类型请不要使用此方法进行克隆");
//   return cloneDeep(data);
// };
export const commonClone = (data: any) => {
  // 如果为基础数据类型，function，null，则直接返回
  if (typeof data !== "object" || data === null) return data;
  let newData: any;
  const t = typeOf(data);
  if (t === "Array") {
    newData = [];
    data.forEach((item, ind) => {
      newData[ind] = commonClone(item);
    });
  } else if (t === "Object") {
    newData = {};
    Object.keys(data).forEach(key => {
      newData[key] = commonClone(data[key]);
    });
  } else if (t === "Function") {
    throw new Error("检测到了类型为Function");
  } else {
    throw new Error(`暂未处理此种类型：${t}`);
  }
  return newData;
};

/**
 * 把css的值转换下，如果已经带有单位，则返回原值，如果没有带单位，则加上px
 * @param {string,number,undefined} val   数值
 * @param {string} unit  单位
 * @returns
 */
export const toCssVal = (val: number | string | undefined, unit = "px") => {
  val = String(val);
  const isOnlyNum = regexp.onlyNum.test(val);
  return isOnlyNum ? val + unit : val;
};

/**
 * 获取css值的单位
 * @param {string} val  数值
 * @returns {string}
 */
export const getCssValUnit = (val: string) => {
  const res = val.match(regexp.lowerChar);
  return res ? res[0] : "";
};

/**
 * 把css的值转换下，如果已经带有单位，则返回原值，如果没有带单位，则加上px
 * @param {string,number,undefined} val  数值
 * @param {string} operator 运算符号，可选值：+, -, *, /
 * @param {string} num 操作数
 * @returns {string}
 */
export const calCssVal = (val: number | string | undefined, operator: string, num: number): string => {
  val = String(val);
  const unit = getCssValUnit(val);
  const newVal = parseFloat(val);
  let end; //运算结果
  switch (operator) {
    case "+":
      end = newVal + num;
      break;
    case "-":
      end = newVal - num;
      break;
    case "*":
      end = newVal * num;
      break;
    case "/":
      end = newVal / num;
      break;
    default:
      throw new Error("暂不支持此运算符进行运算：" + operator);
  }
  return end + unit;
};

/**
 * 获取中文字符长度（全角符算1个，半角符算0.5个字符）
 * @param {string} str 要处理的字符串
 */
export function getChinaCharLength(str?: string): number {
  if (!str) return 0;
  return str.replace(/[^\x00-\xff]/g, "**").length / 2;
}

/**
 * 获取字符串的字节长度（全角符算2个，半角符算1个字符）
 * @param {string} str 字符串
 */
export function getBytes(str = "") {
  const len = str.length;
  let bytes = len;
  for (let i = 0; i < len; i++) {
    if (str.charCodeAt(i) > 255) bytes++;
  }
  return bytes;
}

/**
 * 剔除对象值为指定类型的对象属性
 * @param {CommonObj} obj 要剔除属性的对象
 * @param {any[]} list 要剔除的属性值构成的数组
 */
export function omitAttrs(obj: CommonObj, list = emptyVals) {
  const newObj: CommonObj = {};
  for (const key in obj) {
    const val = obj[key];
    const t = typeOf(val);
    if (t === "Object") {
      newObj[key] = omitAttrs(val);
      continue;
    }
    // 如果range类字段，每个值都为空字符串，则剔除掉这个属性
    if (t === "Array") {
      if (val.some((it: StrNum) => it !== "")) newObj[key] = val;
      continue;
    }
    if (!list.includes(val)) {
      newObj[key] = val;
      continue;
    }
  }
  return newObj;
}

/**
 * 剔除对象属性（不会改变原数组）
 * @param {CommonObj} obj 要剔除属性的对象
 * @param {string | string[]} keys 剔除的属性数组
 */
export function deleteAttrs(obj: CommonObj = {}, keys?: string | string[]) {
  if (!keys?.length) return obj;
  const newObj = JSON.parse(JSON.stringify(obj));
  if (typeof keys === "string") return delete newObj[keys];
  keys.forEach(key => delete newObj[key]);
  return newObj;
}

/**
 * 将联合prop拆成两个字段（不会修改原对象）
 * @param {CommonObj} obj 要拆解的对象
 * @param {boolean} isRange 是否是区间数组
 * @returns {CommonObj} args
 */
export function splitPropsParams(args: CommonObj): CommonObj {
  const obj = JSON.parse(JSON.stringify(args));
  const entrs = Object.keys(obj).filter(it => it.includes(propsJoinChar));
  entrs.forEach((prop: string, ind: number) => {
    if (!obj[prop]) return;
    const type = typeOf(obj[prop]);
    //区间数组 [min,max] = [最小值，最大值]
    if (type === "Array") {
      const [minProp, maxProp] = prop.split(propsJoinChar);
      const [minVal, maxVal] = obj[prop];
      obj[minProp] = minVal;
      obj[maxProp] = maxVal;
    } else if (type === "Object") {
      //表单字段中无prop，但是有children属性
      const keys = prop.split(propsJoinChar);
      keys.forEach((key: string) => {
        obj[key] = obj[prop][key];
      });
    } else {
      throw new Error(`暂未处理type为${type}的类型`);
    }
    delete obj[prop];
  });
  return obj;
}

/**
 * 根据路由信息生成组件名称
 * @param {object} route  路由信息
 * @returns {string} name  组件名称
 */
export function getCompNameByRoute(route: CommonObj): string {
  const { path, meta, query, name, matched } = route;
  const { tagIdKey = "id" } = meta;
  const defName = matched.at(-1)?.components?.default.name;
  let compName = defName ?? toCamelCase(path, true);
  if (query[tagIdKey]) compName += "Of" + query[tagIdKey];
  return compName;
}

/**
 * 处理暴露的数据对象
 *@param {object} sysData 系统数据
 *@param {object} customData 自定义数据
 */
export function getExportData(sysData: any, customData?: any, mergeType: ConfigMergeStrategy = config?.mergeStrategy ?? "assign") {
  if ([null, undefined].includes(customData)) return sysData;
  if (!mergeType) return customData;
  const isBaseData = ["string", "number", "boolean"].includes(typeof sysData); //如果是基础数据类型
  if (isBaseData) mergeType = "alert";
  if (mergeType === "merge") return merge(sysData, customData);
  if (mergeType === "assign") return Object.assign(sysData, customData);
  if (mergeType === "alert") return customData ?? sysData;
  if (mergeType === "auto") return sysData;
  throw new Error(`暂不支持${mergeType}合并策略`);
}

/**
 * 判断两个元素是否一致（是否修改过）
 * @param {any} e_1 第一个元素
 * @param {any} e_2 第二个元素
 */
export function getIsUpdated(e_1: any, e_2: any) {
  const t1 = typeOf(e_1);
  const t2 = typeOf(e_2);
  if (t1 !== t2) return true;
  if (t1 === "Array") {
    if (e_1.length !== e_2.length) return true;
    const updated = !!e_1.find((it: any, i: number) => getIsUpdated(e_1[i], e_2[i]));
    if (updated) return true;
  } else if (t1 === "Object") {
    if (Object.keys(e_1).length !== Object.keys(e_2).length) return true;
    for (const key in e_1) {
      const updated = getIsUpdated(e_1[key], e_2[key]);
      if (updated) return true;
    }
  } else {
    if (e_1 !== e_2) return true;
  }
  return false;
}

/**
 * 处理分组（操作）按钮（表格中操作列的按钮）
 * @param {CommonObj} map 事件方法映射
 * @param {BtnName} name 触发的按钮名称
 */
export function handleBtnNext(map: CommonObj, name: BtnName) {
  map[name] ? map[name]() : showMessage(`点击了${name}按钮`, "info");
}

/**
 * 对象数组排序（默认order）
 * @param {CommonObj[]} arr 要排序的数组
 * @param {string} key  排序依据的对象属性键名
 * @param {asc | desc | random} type 排序方式 asc 升序 desc 降序 random 随机
 */
export type SortType = "asc" | "desc" | "random";
export function sortObjArrByKey(arr: CommonObj[] = [], key = "order", type: SortType = "asc"): CommonObj[] {
  arr.sort((a: CommonObj, b: CommonObj) => {
    if (type === "asc") return a[key] - b[key];
    if (type === "desc") return b[key] - a[key];
    if (type === "random") return Math.random() - 0.5;
    throw new Error(`传参类型错误：${type}`);
  });
  return arr;
}

/**
 * 复制文本
 * @param {string} text 要复制到剪切板的内容
 */
export function copyText(text = "") {
  const input = document.createElement("input");
  input.setAttribute("value", text);
  document.body.appendChild(input);
  input.select();
  const copyText = document.execCommand("copy");
  if (copyText) showMessage("复制成功！");
  document.body.removeChild(input);
}

/**
 * 文本是否已超出（出现了省略号）
 * @param {target} target 目标dom元素
 */
export function getIsOver(target: any) {
  if (!target) return false;
  const { scrollHeight, clientHeight } = target;
  return scrollHeight > clientHeight;
}

/**
 * 抛出错误信息（主要用在template模板中）
 * @param {string} msg 脱误提示信息
 */
export function throwTplError(msg: string) {
  throw new Error(msg);
}

/**
 * 是否是数组元素的删除
 */
// export function isArrDel(fObj: CommonObj, tObj: CommonObj) {
//   for (const key in fObj) {
//     const type = typeOf(fObj[key]);
//     if (type === "Array") {
//       const isDel = fObj[key].length > tObj[key]?.length;
//       if (isDel) return true;
//     } else if (type === "Object") {
//       const isDel = isArrDel(fObj[key], tObj[key]);
//       if (isDel) return true;
//     }
//   }
//   return false;
// }
