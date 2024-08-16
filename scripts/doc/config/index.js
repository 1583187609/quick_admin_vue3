export const docsPath = "/docs"; //文档路径
export const demosPath = "/demos"; //示例路径
export const cachePath = "/.vitepress/cache/views"; //临时缓存路径
export const indexName = "index.md"; //首页md文件的名称
export const readMeName = "Summary.md"; //examples下面的 ReadMe 文件的名称（也可理解为摘要）
export const configName = "data.json"; //examples下面的配置文件的名称
export const isShortPath = true; //是否缩短路径
// 示例中对vue文件名称的中文标题映射
export const vueFileNameTitleMap = {
  BasicUse: "基础用法",
};

export const showMaxHeight = "calc(100vh - 150px)"; //视窗可看见的最高宽度
export const showGridAttrs = { xs: 24, sm: 12, md: 12, lg: 8, xl: 6 };

export const projectInfo = {
  title: "Quick Admin Vue3",
  description: "开发最快的后台管理模板",
  stackBrief: "Vite+Vue3+ElementPlus+Pinia+TypeScript+Sass",
}; //项目信息

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
