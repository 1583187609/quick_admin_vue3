/****************************************************************************************************/
/*************** 此处的方法可能与src/components/_utils中的方法重名，故单独提取出来进行维护 ***************/
/****************************************************************************************************/

import { CommonObj, OptionItem, StrNum } from "@/core/_types";
import dayjs from "dayjs";
import { defaultDateFormat } from "./consts";
import allAddress from "../data/address";

/**
 * 函数未传必填参数时的校验
 * @param name string 参数名称
 */
export function needParam(name = "") {
  throw new Error(`${name}必传`);
}

/**
 * 检测元素所属类型
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
 * @returns {string} 元素类型（String、Number、Boolean、Symbol、Undefined、Null、Function、Date、Array、Object、Regexp、Error、HtmlDocument、Global）
 */
export function typeOf(ele: any) {
  const endStr = Object.prototype.toString.call(ele);
  const type = endStr.split(" ")[1].slice(0, -1);
  return type;
}

/**
 * 判断是否是合法日期
 * @param {any} date 日期值
 * @returns {boolean} 是否合法
 */
export function isValidDate(date: any) {
  return new Date(date).toString() !== "Invalid Date";
}

/**
 * 获取日期时间戳
 * @param {any} date 日期值，如果为示意日期（日期对象不能解析）时，数值：1, -1，单位：y, M, d, h, m, s，示例：-1d
 */
export function getDateTimestamp(date: any) {
  if (isValidDate(date)) return new Date(date).getTime();
  const reg = /^[-\+]?[0-9]+[yMdhms]{1}$/;
  if (typeof date !== "string" || !reg.test(date)) throw new Error(`请输入正确的日期，例：-1h`);
  const unit = date.at(-1) as string; // 单位
  const num = Number(date.slice(0, -1)); // 数值
  const nowTime = Date.now();
  if (num === 0) return nowTime;
  const ratioMap: CommonObj = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 60 * 60 * 24,
    M: 60 * 60 * 24 * 30,
    y: 60 * 60 * 24 * 365,
  };
  return nowTime + num * ratioMap[unit] * 1000;
}

/**
 * 获取限定区间的随机日期
 * @param minDate 距离现在最久的时刻（单位：秒）数值：1, -1，单位：y, M, d, h, m, s
 * @param maxDate 距离现在最近的时刻（单位：秒）
 * @returns
 */
export function getRandomLimitDate(minDate = "-1y", maxDate = Date.now(), fmt = defaultDateFormat): StrNum {
  const minTime = getDateTimestamp(minDate);
  const maxTime = getDateTimestamp(maxDate);
  if (minTime >= maxTime) throw new Error(`最小时间不能大于等于最大时间`);
  const diffTime = maxTime - minTime;
  const currTime = Math.floor(Math.random() * diffTime) + minTime;
  return fmt ? dayjs(currTime).format(fmt) : currTime;
}

/**
 * 删除对象属性(不改变原数组）
 * @param {object} obj  要删除属性所在的对象
 * @param {string[]} keys  要删除的属性名
 */
export function deleteAttrs(obj: CommonObj = {}, keys: string | string[]) {
  const newObj = JSON.parse(JSON.stringify(obj));
  if (!keys?.length) return newObj;
  if (typeof keys === "string") return delete newObj[keys];
  keys.forEach(key => delete newObj[key]);
  return newObj;
}

// const tempCascader = [
//   {
//     name: "Level one 1",
//     list: [
//       {
//         name: "Level two 1-1",
//         list: [
//           {
//             name: "Level three 1-1-1",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Level one 2",
//     list: [
//       {
//         name: "Level two 2-1",
//         list: [
//           {
//             name: "Level three 2-1-1",
//           },
//         ],
//       },
//       {
//         name: "Level two 2-2",
//         list: [
//           {
//             name: "Level three 2-2-1",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Level one 3",
//     list: [
//       {
//         name: "Level two 3-1",
//         list: [
//           {
//             name: "Level three 3-1-1",
//           },
//         ],
//       },
//       {
//         name: "Level two 3-2",
//         list: [
//           {
//             name: "Level three 3-2-1",
//           },
//         ],
//       },
//     ],
//   },
// ];

/**
 * 获取标准的级联数据
 */
export function getStandardCascader(
  cascader: CommonObj[] = allAddress,
  props: CommonObj = { label: "label", value: "value", children: "children" }
): OptionItem[] {
  const { label: labelKey, value: valueKey, children: childrenKey } = props;
  function cycleHandle(list: CommonObj[] = []) {
    return list.map((item: CommonObj) => {
      if (labelKey !== "label") {
        item.label = item[labelKey] ?? "";
        delete item[labelKey];
      }
      if (valueKey !== "value") {
        item.value = item[valueKey] ?? "";
        delete item[valueKey];
      }
      if (childrenKey !== "children" && item[childrenKey]?.length) {
        item.children = cycleHandle(item.children);
        delete item[childrenKey];
      }
      return item as OptionItem;
    }) as OptionItem[];
  }
  return cycleHandle(cascader);
}
