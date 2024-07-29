const isBrowser = !!globalThis.window; //是否是浏览器
export const t = isBrowser ? "&nbsp;&nbsp;" : "  "; //一个制表符的间距，可选："  ", "&nbsp;&nbsp;"
export const n = isBrowser ? "<br>" : "\n"; //换行符，可选：<br>, \n
export const br = isBrowser ? n : ""; //换行符
//基础数据类型
export const baseDataTypes = ["string", "number", "boolean", "undefined", "null"];
