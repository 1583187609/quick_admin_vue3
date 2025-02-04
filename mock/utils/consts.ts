// 是否是处在NodeJs环境中
export const isDev = process.env.NODE_ENV === "development";
export const isAtNode = typeof global !== "undefined" && Object.prototype.toString.call(global) === "[object global]";
export const defaultDateFormat = "YYYY-MM-DD HH:mm:ss";
export const dictTextPropKey = "text"; // 字典文本的属性key
export const isSsr = import.meta.env?.SSR;
