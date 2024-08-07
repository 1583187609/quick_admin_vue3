export * from "../config/index.js";

// 暂时先不使用，所以先注释
export const isBrowser = !!globalThis.window; //是否是浏览器
export const T = isBrowser ? "&nbsp;&nbsp;" : "  "; //一个制表符的间距，可选："  ", "&nbsp;&nbsp;"
export const N = isBrowser ? "<br>" : "\n"; //换行符，可选：<br>, \n
export const Br = isBrowser ? N : ""; //换行符

export const isDev = process.env.NODE_ENV === "development";
export const isSimple = true;
export const splitOrderChar = "_"; //用于标记序号跟文件名称，作为分隔的符号
export const unknownChar = "-"; // 未知时的占位符

export const indexName = "index.md"; //首页md文件的名称
export const readMeName = "Summary.md"; //examples下面的 ReadMe 文件的名称（也可理解为摘要）
export const configName = "data.json"; //examples下面的配置文件的名称
export const emptyVals = ["", null, undefined]; //空值，凡遇此空值，则用“-”进行占位填充。看后期是否要考虑将 "undefined", "null" 这两个加入其中

// process.env.NODE_ENV 会先为undefined值，后为development导致取出的值不对
export const excludeNames = true || isDev ? ["index"] : ["test", "demo", "index"]; //.vitepress构建页面时，需要排除的文件夹或文件名
// 资源地址
export const sourceUrls = {
  // 预览地址
  preview: {
    react: {
      gitee: "https://fanlichuan.gitee.io/quick_admin/react/preview/#/login",
      github: "https://gitee.com/link?target=https%3A%2F%2F1583187609.github.io%2Fquick_admin%2Freact%2Fpreview%2F%23%2Flogin",
    },
    vue3: {
      gitee: "https://fanlichuan.gitee.io/quick_admin/vue3/preview/#/login",
      github: "https://gitee.com/link?target=https%3A%2F%2F1583187609.github.io%2Fquick_admin%2Fvue3%2Fpreview%2F%23%2Flogin",
    },
  },
  // 仓库地址
  repository: {
    react: {
      gitee: "https://gitee.com/fanlichuan/quick_admin_react",
      github: "https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2F1583187609%2Fquick_admin_react",
    },
    vue3: {
      gitee: "https://gitee.com/fanlichuan/quick_admin_vue3",
      github: "https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2F1583187609%2Fquick_admin_vue3",
    },
  },
};

/**
 * 下面是配置信息（临时写在这里）
 */
export const showTypeInferred = true; //是否显示类型推断