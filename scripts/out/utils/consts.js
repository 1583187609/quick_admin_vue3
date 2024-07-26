export const isDev = process.env.NODE_ENV === "development";
export const isSimple = true;
export const splitOrderChar = "_"; //用于标记序号跟文件名称，作为分隔的符号
export const docsPath = "/docs"; //文档路径
export const indexName = "index.md"; //首页md文件的名称
export const readMeName = "ReadMe"; //examples下面的ReadMe文件的名称
export const emptyVals = ["", null, undefined]; //空值，凡遇此空值，则用“-”进行占位填充。看后期是否要考虑将 "undefined", "null" 这两个加入其中

// process.env.NODE_ENV 会先为undefined值，后为development导致取出的值不对
export const excludes = true || isDev ? ["index"] : ["test", "demo", "index"]; //.vitepress构建页面时，需要排除的文件夹或文件名
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
  // 说明文档
  //   docs: {
  //     react: {
  //       gitee: "",
  //       github: "",
  //     },
  //     vue3: {
  //       gitee: "",
  //       github: "",
  //     },
  //   },
};
