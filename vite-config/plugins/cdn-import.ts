import cdnImportPlugin from "vite-plugin-cdn-import";
import pkg from "../../package.json";
import _ from "lodash";

const { camelCase, upperFirst } = _;

const prodUrl = "//unpkg.com/{name}@{version}/{path}";

function getCamelCaseName(name: string) {
  return upperFirst(camelCase(name));
}
function getVersion(name: string) {
  return pkg.dependencies[name].replace("^", "");
}
function getPath(name: string, path: string = "") {
  let str = prodUrl.replace("{name}", name).replace("{version}", getVersion(name)).replace("{path}", path);
  if (str.endsWith("/")) str = str.slice(0, -1);
  return str;
}
function getCss(css: boolean | string, path: string) {
  if (!css) return;
  if (css === true) return path;
  if (typeof css === "string") return css;
  throw new Error(`请传入string类型的css值`);
}
function getConfigItem(item: string | CommonObj, endPath?: string) {
  if (typeof item === "string") item = { name: item };
  if (!item.name) throw new Error(`缺少name参数`);
  const { name, var: varName = getCamelCaseName(name), path = getPath(name, endPath), css, ...rest } = item;
  return { name, var: varName, path, css: getCss(css, path), ...rest };
}

// const item = {
//   name: "", //需要 CDN 加速的包名称	string
//   var: "", //全局分配给模块的变量	string
//   path: "", //指定 CDN 上的加载路径	string / string[]
//   css: "", //可以指定从 CDN 地址上加载多个样式表	string / string[]
//   alias: "", //名称的别名，例如“react-dom/client”是“react-dom”的别名	string[]
//   prodUrl: "", //覆盖全局的 prodUrl	string / string[]
// };
export const externalList: any[] = [
  /*** 框架全家桶 ***/
  "vue",
  { name: "vue-demi", var: "VueDemi", path: "https://unpkg.com/vue-demi@0.14.10" },
  // getConfigItem({ name: "vue-demi", var: "VueDemi", path: "https://unpkg.com/vue-demi@0.14.10" }), // https://unpkg.com/vue-demi@0.14.10
  getConfigItem("vue-router"), // { name: "vue-router", var: "VueRouter", path: `https://unpkg.com/vue-router@4.4.5` },
  getConfigItem({ name: "vue-demi", var: "VueDemi", path: "https://unpkg.com/vue-demi@0.14.10" }), // https://unpkg.com/vue-demi@0.14.10
  getConfigItem("pinia"),
  // ui库
  getConfigItem("element-plus"),
  /*** 基础必备 ***/
  // getConfigItem("qs"),
  "axios",
  "dayjs",
  "lodash",
  // getConfigItem({ name: "vue-i18n", var: "I18N" }),
  /*** 功能必备 ***/
  // getConfigItem({ name: "md5", var: "md5" }),
  // getConfigItem("nprogress"),
  getConfigItem("echarts"),
  getConfigItem("echarts-liquidfill"),
  // getConfigItem({ name: "driver.js", var: "driver" }),
  // getConfigItem("screenfull"),
  // getConfigItem("sortablejs"),
  // getConfigItem("qrcode"),
  // getConfigItem("vuedraggable"),
  getConfigItem("xlsx"),
  // getConfigItem("@wangeditor/editor-for-vue"),
  /*** mock相关 ***/
  // getConfigItem("mockjs"),
  // getConfigItem("vite-plugin-mock"),
  /*** docs 相关 ***/
  // getConfigItem("markdown-it"),
  // getConfigItem("markdown-it-container"),
];

// 以下包不会进行打包构建
export const external = externalList.map(it => {
  if (typeof it === "string") return it;
  return it.name;
});

/**
 * @link npm包地址：https://www.npmjs.com/package/vite-plugin-cdn-import
 * @example prodUrl: '//unpkg.com/{name}@{version}/{path}', 'https://cdn.jsdelivr.net/npm/{name}@{version}/{path}'
 */
export const cdnImport = () =>
  cdnImportPlugin({
    prodUrl, // 默认值为：https://cdn.jsdelivr.net/npm/{name}@{version}/{path}
    // 类型：(Module | Module[] | GetModuleFunc | GetModuleFunc[])[]
    // 预设默认值：react, react-dom, react-router-dom, antd, vue, vue2, vue-router, vue-router@3, moment, dayjs, axios, lodash
    modules: externalList,
    enableInDevMode: true, // 为true时，可以通过 CDN 导入生产环境下通常需要通过 NPM 安装的依赖
    // generateScriptTag(){},
    // generateCssLinkTag(){},
  });
