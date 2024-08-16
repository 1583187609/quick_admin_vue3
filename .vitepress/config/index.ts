import { defineConfig } from "vitepress";
import { getNavs, getSidebarAndRewrites } from "../../scripts/doc/menus/index.js";
import plugins from "./plugins.ts";
import { hotRun } from "../../scripts/doc/index.js";

const { sidebar, rewrites } = getSidebarAndRewrites() as any;

hotRun();

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // lang: "en-US", //这将呈现为页面 HTML 中的 <html lang="en-US"> 标签
  title: "Quick Admin Vue3",
  // titleTemplate: "", //允许自定义每个页面的标题后缀或整个标题
  description: "A VitePress Site", //站点的描述。这将呈现为页面 HTML 中的 <meta> 标签
  head: [["link", { rel: "icon", href: "/ico.svg" }]],
  // base: "/", //站点将部署到的 base URL。它应该始终以 / 开头和结尾。例：/bar/
  cleanUrls: true, //当设置为 true 时，VitePress 将从 URL 中删除 .html 后缀
  //自定义目录 <-> URL 映射
  // rewrites: {
  //   // 示例
  //   // 'packages/pkg-a/src/pkg-a-docs.md': 'pkg-a/index.md', // packages/pkg-a/src/pkg-a-docs.md  -->  /pkg-a/index.html
  //   // "src/guide/基础/1_安装.md": "guide/基础/安装.md", // 访问页面路径：guide/基础/安装.html
  // },
  rewrites,
  // srcDir: "./src", //相对于项目根目录的 markdown 文件所在的文件夹
  srcExclude: ["**/README.md", "**/TODO.md"], // 用于匹配应排除作为源内容输出的 markdown 文件
  // outDir: "./dist", //默认值："./.vitepress/dist"。项目的构建输出位置，相对于项目根目录
  // assetsDir: "", // 指定放置生成的静态资源的目录。该路径应位于 outDir 内，并相对于它进行解析
  // cacheDir: "", //缓存文件的目录，相对于项目根目录
  // ignoreDeadLinks: false, //当设置为 true 时，VitePress 不会因为死链而导致构建失败。
  // metaChunk: false, //当设置为 true 时，将页面元数据提取到单独的 JavaScript 块中，而不是内联在初始 HTML 中。这使每个页面的 HTML 负载更小，并使页面元数据可缓存，从而当站点中有很多页面时可以减少服务器带宽。
  // mpa: false, //设置为 true 时，生产应用程序将在 MPA 模式下构建。MPA 模式默认提供 零 JavaScript 支持，代价是禁用客户端导航，并且需要明确选择加入才能进行交互。
  // appearance: true, //可选值：boolean | 'dark' | 'force-dark' | import('@vueuse/core').UseDarkOptions
  lastUpdated: true, // 是否使用 Git 获取每个页面的最后更新时间戳。时间戳将包含在每个页面的页面数据中，可通过 useData 访问。
  markdown: {
    // 数学方程需要安装：npm add -D markdown-it-mathjax3
    // math: true,
    image: {
      lazyLoading: true, // 默认禁用图片懒加载
    },
    container: {
      //   tipLabel: "温馨提示",
      //   warningLabel: "注意事项",
      //   dangerLabel: "特别注意",
      //   infoLabel: "内容描述",
      detailsLabel: "查看详情",
    },
    config: md => plugins(md),
  },
  // vue:{
  //   // Vite 配置选项
  // },
  // vite:{
  //   // @vitejs/plugin-vue 选项
  // },
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: "/logo.svg",
    // siteTitle: false, // 默认情况下，nav 显示 config.title 作为站点的标题。如果想更改导航栏上显示的内容，可以在 themeConfig.siteTitle 选项中定义自定义文本。
    search: {
      provider: "local",
      // options: {
      // locales: {
      //   zh: {
      //     translations: {
      //       button: {
      //         buttonText: "搜索文档",
      //         buttonAriaLabel: "搜索文档",
      //       },
      //       modal: {
      //         noResultsText: "无法找到相关结果",
      //         resetButtonTitle: "清除查询条件",
      //         footer: {
      //           selectText: "选择",
      //           navigateText: "切换",
      //         },
      //       },
      //     },
      //   },
      // },
      // miniSearch: {
      //   /**
      //    * @type {Pick<import('minisearch').Options, 'extractField' | 'tokenize' | 'processTerm'>}
      //    */
      //   options: {
      //     /* ... */
      //   },
      //   /**
      //    * @type {import('minisearch').SearchOptions}
      //    * @default
      //    * { fuzzy: 0.2, prefix: true, boost: { title: 4, text: 2, titles: 1 } }
      //    */
      //   searchOptions: {
      //     /* ... */
      //   },
      // },
      // /**
      //  * 自定义渲染内容
      //  * @param {string} src
      //  * @param {import('vitepress').MarkdownEnv} env
      //  * @param {import('markdown-it')} md
      //  */
      // _render(src, env, md) {
      //   const html = md.render(src, env)
      //   // 从搜索中排除页面
      //   if (env.frontmatter?.search === false) return ''
      //   if (env.relativePath.startsWith('some/path')) return ''
      //   return html // 返回 html 字符串
      // },
      // },
    },
    // // 或者
    // search:{
    //    provider: 'algolia',
    //    options: {
    //      appId: '...',
    //      apiKey: '...',
    //      indexName: '...'
    //    }
    // },
    lightModeSwitchTitle: "切换为浅色模式",
    darkModeSwitchTitle: "切换为深色模式",
    returnToTopLabel: "返回顶部", // 仅在移动端显示
    langMenuLabel: "切换语言",
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
      {
        icon: { svg: "gitee" },
        link: "https://github.com/vuejs/vitepress",
        // ariaLabel: "cool link",
      },
      {
        icon: { svg: "掘金" },
        link: "https://github.com/vuejs/vitepress",
      },
    ],
    externalLinkIcon: true, //是否在 markdown 中的外部链接旁显示外部链接图标。
    // 右下角的广告窗位
    // carbonAds: {
    //   code: "your-carbon-code",
    //   placement: "your-carbon-placement",
    // },
    lastUpdated: {
      text: "上次更新时间",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "medium",
      },
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    // 首页顶部导航
    // nav:  [
    //   { text: "指南", link: "/src/guide/基础/1_安装" },
    //   { text: "组件", link: "/src/views/1_基础组件/1_BaseForm" },
    //   { text: "示例", link: "/src/demo/2_other" },
    //   {
    //     text: "资源",
    //     items: [
    //       { text: "链接1", link: "/src/views/1_基础组件/1_BaseForm" },
    //       {
    //         text: "链接2",
    //         link: "/src/views/1_基础组件/1_BaseForm",
    //         // activeMatch: "/config/", // 当用户位于 `/config/` 路径时，该链接处于激活状态
    //         // target: "_self",
    //         // rel: "sponsored",
    //       },
    //     ],
    //   },
    // ],
    nav: getNavs(),
    // 文档页左侧导航，可以进一步将侧边栏项目嵌入到 6 级深度，从根级别上计数。请注意，深度超过 6 级将被忽略，并且不会在侧边栏上显示。
    // sidebar: [
    //   {
    //     text: "Examples",
    //     items: [
    //       { text: "Markdown Examples", link: "/markdown-examples" },
    //       { text: "Runtime API Examples", link: "/api-examples" },
    //     ],
    //   },
    // ],
    sidebar,
    // 文档页左下角 编辑链接可让显示链接以编辑 Git 管理服务 (例如 GitHub 或 GitLab) 上的页面
    // editLink: {
    //   pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
    //   text: "Edit this page on GitHub",
    // },
    // editLink: {
    //   pattern: ({ filePath }) => {
    //     if (filePath.startsWith("packages/")) {
    //       return `https://github.com/acme/monorepo/edit/main/${filePath}`;
    //     } else {
    //       return `https://github.com/acme/monorepo/edit/main/docs/${filePath}`;
    //     }
    //   },
    // },
    // 页脚配置。可以添加 message 和 copyright。由于设计原因，仅当页面不包含侧边栏时才会显示页脚。
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present Fan Li Chuan",
    },
  },
});
