import { autoComplete, Plugin } from "vite-plugin-cdn-import";

// 以下包不会进行打包构建
export const external = ["vue", "element-plus", "@element-plus/icons-vue", "vuex", "axios", "vue-router", "echarts"];

/**
 * @link 参考链接：https://blog.csdn.net/qq_23858785/article/details/130107095
 * @example prodUrl: 'https://cdn.jsdelivr.net/npm/{name}@{version}/{path}',
 */
export const importByCDN = Plugin({
  modules: [
    {
      name: "vue",
      var: "Vue",
      path: `https://unpkg.com/vue@3.3.4`,
    },
    {
      name: "vue-demi",
      var: "VueDemi",
      path: `https://unpkg.com/vue-demi@0.14.7`,
    },
    // {
    //   name: "vue-router",
    //   var: "VueRouter",
    //   path: `https://unpkg.com/vue-router@4.2.4`,
    // },
    // {
    //   name: "axios",
    //   var: "axios",
    //   path: "https://unpkg.com/axios@1.3.2",
    // },
    // {
    //   name: "dayjs",
    //   var: "dayjs",
    //   path: "https://unpkg.com/dayjs@1.11.7",
    // },
    // {
    //   name: "driver",
    //   var: "driver",
    //   path: "https://unpkg.com/driver@1.3.1",
    // },
    // {
    //   name: "echarts",
    //   var: "echarts",
    //   path: "https://unpkg.com/echarts@5.4.1",
    // },
    // {
    //   name: "echarts-liquidfill",
    //   var: "EchartsLiquidfill",
    //   path: "https://unpkg.com/echarts-liquidfill@3.1.0",
    // },
    // {
    //   name: "lodash",
    //   var: "_",
    //   path: "https://unpkg.com/lodash@4.17.21",
    // },
    // {
    //   name: "sortablejs",
    //   var: "Sortable",
    //   path: "https://unpkg.com/sortablejs@1.15.2",
    // },
    // {
    //   name: "vuedraggable",
    //   var: "vuedraggable",
    //   path: "https://unpkg.com/vuedraggable@4.1.0",
    // },
    // {
    //   name: "xlsx",
    //   var: "XLSX",
    //   path: "https://unpkg.com/xlsx@0.18.5",
    // },
    //// npm 包跟 cdn 的有些许差别，暂时不予引用（cdn的包会对type为primary的进行警告，提示应写成 ""）
    // {
    //   name: "element-plus",
    //   var: "ElementPlus",
    //   path: "https://unpkg.com/element-plus@2.3.8/dist/index.full.js",
    //   // css: 'https://unpkg.com/element-plus@2.3.8/dist/index.css', //需要cdn就把此处注释放开
    // },
    // {
    //   name: "vite-plugin-mock",
    //   var: "VitePluginMock",
    //   path: "https://unpkg.com/vite-plugin-mock@2.9.6",
    // },
    // {
    //   name: "vue-i18n",
    //   var: "I18nN",
    //   path: "https://unpkg.com/vue-i18n@2.3.8",
    // },
  ],
});
