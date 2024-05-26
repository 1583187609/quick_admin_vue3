// 是否是Node环境
export const isNodeEnv = typeof global !== "undefined" && Object.prototype.toString.call(global) === "[object global]";
