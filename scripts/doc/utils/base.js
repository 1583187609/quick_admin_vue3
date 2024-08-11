/********************************************
 基础常用（任意工程可用）**********************
 ********************************************/

import path from "path";
import util from "util";

import { betaReg, isShortPath, splitOrderChar } from "./index.js";

/**
 * 函数未传必填参数时的校验
 * @param name string 参数名称
 */
export function needParam(name = "") {
  throw new Error("请传入参数：" + name);
}

/**
 * 检测元素所属类型
 * Object.prototype.toString.call(*)的可能结果如下所示：
 * @example null             [object Null]
 * @example undefined        [object Undefined]
 * @example Symbol();        [object Symbol]
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
export function typeOf(ele) {
  let endStr = Object.prototype.toString.call(ele);
  let type = endStr.split(" ")[1].slice(0, -1);
  return type;
}

/**
 * 将字符串第一个单词大写
 */
export function upperFirst(str = "") {
  if (str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  return str;
}

/**
 * 将字符串转为小驼峰
 */
export function camelCase(str = "", isToBy = true) {
  str = str.replace(/_+|\/+|\\+/g, "_");
  str = str.replace(/{+/g, isToBy ? "By_" : "_").replace(/}+/g, "");
  str = str
    .split(/_+/)
    .map((it, ind) => {
      let firstChar = ind === 0 ? it[0].toLowerCase() : it[0].toUpperCase();
      return firstChar + it.slice(1);
    })
    .join("");
  return str;
}

/**
 * 获取剔除下划线后的文件名
 * @param {string} filePath 文件路径
 * @param {cn|en} type 获取的文件名类型，中文名或英文名
 * @param {boolean} removeBeta 是否移除徽章文本
 */
export function getFileName(filePath = needParam(), type = "cn", char = splitOrderChar, removeBeta = false) {
  const ext = path.extname(filePath);
  const file = path.basename(filePath, ext);
  if (!isShortPath) return file;
  if (!file.includes(char)) {
    if (!removeBeta) return file;
    return file.replace(betaReg, () => "");
  }
  const [num, cnName, enName] = file.split(char); // 依次为序号，中文名，英文名
  const hasNum = !isNaN(Number(num)); // 如果存在序号
  if (type === "en") {
    const name = hasNum ? enName ?? cnName : cnName;
    if (!removeBeta) return name;
    return name.replace(betaReg, () => "");
  }
  const name = hasNum ? cnName : num;
  if (!removeBeta) return name;
  return upperFirst(name.replace(betaReg, () => ""));
}

export function consoleLog(data, type, ...rest) {
  if (typeof type === "number") {
    //设为 null 时， 是打印完整信息
    const deepLog = util.inspect(data, { depth: type });
    return console.log(deepLog, ...rest);
  }
  //  黑色(30), 红色(31), 绿色(32), 黄色(33), 蓝色(34), 紫色(35), 青色(36), 白色(37)
  if (["danger", "success", "warning", "primary", "info"].includes(type)) {
    const reset = "\x1b[0m";
    const colorMap = {
      danger: "\x1b[31m",
      success: "\x1b[32m",
      warning: "\x1b[33m",
      primary: "\x1b[34m",
      info: "\x1b[36m",
    };
    return console.log(`${colorMap[type]}%s${reset}`, data, ...rest);
  }
  return console.log(data, type, ...rest);
}
