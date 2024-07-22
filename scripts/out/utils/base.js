/********************************************
 基础常用（任意工程可用）**********************
 ********************************************/

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
 * @returns {String} 元素类型（string、number、boolean、symbol、undefined、null、function、date、array、object、regexp、error、htmldocument、global）
 */
export function typeOf(ele) {
  let endStr = Object.prototype.toString.call(ele);
  let type = endStr.split(" ")[1].slice(0, -1);
  return type;
}

/**
 * 函数未传必填参数时的校验
 * @param name string 参数名称
 */
export function needParam(name) {
  throw new Error("请传入参数：" + name);
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
