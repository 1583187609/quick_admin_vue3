// 是否是处在NodeJs环境中
export const isAtNode = typeof global !== "undefined" && Object.prototype.toString.call(global) === "[object global]";
export const defaultDateFormat = "YYYY-MM-DD HH:mm:ss";
