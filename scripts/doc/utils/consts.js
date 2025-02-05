export * from "../config/index.js";

// 暂时先不使用，所以先注释
export const isBrowser = !!globalThis.window; //是否是浏览器
export const T = isBrowser ? "&nbsp;&nbsp;" : "  "; //一个制表符的间距，可选："  ", "&nbsp;&nbsp;"
export const N = isBrowser ? "<br>" : "\n"; //换行符，可选：<br>, \n
export const Br = isBrowser ? N : ""; //换行符
export const badgeReg = /【\w*】/s;

// export const isDev = process.env.NODE_ENV === "development"; //process.env.NODE_ENV 会先为undefined值，后为development导致取出的值不对
// export const isDev = import.meta.env.MODE === "dev"; //是否是开发环境，本来应该是'development'，但是package.json中指定了 --mode dev
export const showDevModule = false;
export const isDev = import.meta.url.startsWith("file://");
export const splitOrderChar = "_"; //用于标记序号跟文件名称，作为分隔的符号
export const unknownChar = "-"; // 未知时的占位符
export const emptyVals = ["", null, undefined]; //空值，凡遇此空值，则用“-”进行占位填充。看后期是否要考虑将 "undefined", "null" 这两个加入其中
export const excludeNames = ["index", ...(isDev ? [] : ["test", "demo"])]; //.vitepress构建页面时，需要排除的文件夹或文件名

/**
 * 下面是配置信息（临时写在这里）
 */
export const showTypeInferred = true; //是否显示类型推断
