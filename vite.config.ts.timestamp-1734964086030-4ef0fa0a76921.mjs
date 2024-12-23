// vite.config.ts
import { loadEnv as loadEnv2 } from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/.pnpm/vite@5.4.11_@types+node@18.19.65_sass@1.81.0_terser@5.36.0/node_modules/vite/dist/node/index.js";

// vite-config/index.ts
import { defineConfig } from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/.pnpm/vite@5.4.11_@types+node@18.19.65_sass@1.81.0_terser@5.36.0/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@5.4.11_@types+node@18.19.65_sass@1.81.0_terser@5.36.0__vue@3.5.13_typescript@4.9.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";

// vite-config/plugins/visualizer.ts
import { visualizer } from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@4.27.3/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var visualizer_default = visualizer({
  open: true,
  //默认为false，构建完成后是否自动从浏览器打开
  title: "\u6587\u4EF6\u4F53\u79EF\u5206\u6790",
  //注：使用 outDirPath 会导致打包失败，故暂时使用手动复制粘贴方式到 outDirPath 中
  filename: "./public/stats.html",
  //默认文件名为 stats.html，打包输出的文件名称
  gzipSize: true,
  //默认false，是否显示gzip压缩之后的大小
  brotliSize: true
  //默认false
  // projectRoot: "./dist", //默认值：process.cwd()
  // template: 'treemap', //默认：treemap。输出模板，可选值：sunburst, treemap, network, raw-data, list
  // include: undefined,
  // exclude: undefined,
  // emitFile: false,
  // sourcemap: false,
  // Filter: { bundle: picomatchPattern, file: picomatchPattern },
});

// vite-config/plugins/auto-import.ts
import AutoImport from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/.pnpm/unplugin-auto-import@0.18.5_@vueuse+core@11.3.0_vue@3.5.13_typescript@4.9.5___rollup@4.27.3/node_modules/unplugin-auto-import/dist/vite.js";
var auto_import_default = AutoImport({
  imports: ["vue", "vue-router"],
  dts: "types/auto-imports.d.ts"
  // dirs: ['src/stores']
});

// vite-config/plugins/vite-mock-serve.ts
import { viteMockServe } from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/.pnpm/vite-plugin-mock@2.9.8_mockjs@1.1.0_vite@5.4.11_@types+node@18.19.65_sass@1.81.0_terser@5.36.0_/node_modules/vite-plugin-mock/dist/index.js";
var vite_mock_serve_default = viteMockServe({
  // ignore?: RegExp | ((fileName: string) => boolean);
  // ignoreFiles?: string[];
  // configPath?: string;
  // injectFile?: string;
  // injectCode?: string;
  // logger?:boolean;
  mockPath: "mock",
  //解析根目录下的mock文件夹
  localEnabled: true,
  // 开发打包开关
  prodEnabled: true,
  // 生产打包开关
  supportTs: true,
  // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
  watchFiles: true
  // 监视文件更改
});

// vite-config/plugins/generate-component-name.ts
import GenerateComponentName from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/.pnpm/unplugin-generate-component-name@0.2.0_rollup@4.27.3/node_modules/unplugin-generate-component-name/dist/vite.js";

// vite-config/utils/index.ts
function toCamelCase(str, isBig = false) {
  str = str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, ind) => {
    if (ind === 0) return letter[isBig ? "toUpperCase" : "toLowerCase"]();
    return letter.toUpperCase();
  });
  str = str.replace(/\s+|\/|-|}/g, "");
  return str;
}
function getApiProxy(apiMap) {
  return Object.keys(apiMap).map((key) => {
    const reg = new RegExp(`^${key}`);
    return {
      [key]: {
        target: apiMap[key],
        //http://127.0.0.1:5500
        // target: "http://127.0.0.1:5180",
        // target: "https://fanlichuan.gitee.io",
        changeOrigin: true,
        //是否跨域
        ws: true,
        //是否代理 websockets
        secure: false,
        //是否https接口
        rewrite: (path2) => path2.replace(reg, ""),
        bypass(req, res, options) {
          const proxyURL = options.target + options.rewrite(req.url);
          res.setHeader("x-req-proxyURL", proxyURL);
        }
      }
    };
  });
}

// vite-config/plugins/generate-component-name.ts
var generate_component_name_default = GenerateComponentName({
  include: ["**/*.vue"],
  enter: [
    //全局的基础组件的命名规则：根据文件或父级文件夹名称命名
    {
      include: ["src/components/**/*.vue"],
      genComponentName: (res) => {
        const { attrName, dirname, originalName } = res;
        if (attrName) return attrName;
        if (originalName === "Index" || originalName === "index") return toCamelCase(dirname, true);
        return originalName;
      }
    },
    //页面组件的命名规则：根据路径来命名(以index.vue作为文件名的)
    {
      include: ["src/views/**/index.vue"],
      genComponentName: (res) => {
        const { attrName, filePath, originalName, dirname } = res;
        if (attrName) return attrName;
        const name = filePath.split("/views/")[1].slice(0, -10);
        return toCamelCase(name, true);
      }
    },
    //页面组件的命名规则：根据路径来命名(以非index.vue作为文件名的，且首字母小写)
    {
      exclude: ["src/views/**/index.vue", "src/views/**/_components/**/*.vue"],
      include: ["src/views/**/*.vue"],
      genComponentName: (res) => {
        const { attrName, filePath, originalName, dirname } = res;
        if (attrName) return attrName;
        const afterPath = filePath.split("/views/")[1];
        const name = afterPath.slice(0, -4);
        return toCamelCase(name, true);
      }
    }
  ]
});

// vite-config/plugins/cdn-import.ts
import _ from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/lodash.js";
import cdnImportPlugin from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/.pnpm/vite-plugin-cdn-import@1.0.1_rollup@4.27.3_vite@5.4.11_@types+node@18.19.65_sass@1.81.0_terser@5.36.0_/node_modules/vite-plugin-cdn-import/dist/index.js";

// package.json
var package_default = {
  name: "Quick Admin Vue3",
  type: "module",
  author: "fanlichuan",
  version: "1.0.0",
  private: true,
  license: "MIT",
  contributes: [
    "you"
  ],
  bugs: "https://gitee.com/fanlichuan/quick_admin_vue3/issues",
  homepage: "https://gitee.com/fanlichuan/quick_admin_vue3/#/login",
  description: "\u4EE5\u5FEB\uFF08\u8BA1\u7B97\u673A\u6267\u884C\u6548\u7387\u3001\u5F00\u53D1\u6548\u7387\uFF09\u4E3A\u6838\u5FC3\u7684\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF\u5F00\u53D1\u6A21\u677F",
  keywords: [
    "quick",
    "admin",
    "vue3",
    "ElementPlus",
    "TypeScript"
  ],
  scripts: {
    serve: "vite",
    dev: "vite --mode dev",
    test: "vite --mode test",
    pre: "vite --mode pre",
    prod: "vite --mode prod",
    build: "vue-tsc && vite build",
    "build:dev": "vue-tsc && vite build --mode dev",
    "build:test": "vue-tsc && vite build --mode test",
    "build:pre": "vue-tsc && vite build --mode pre",
    "build:prod": "vue-tsc && vite build --mode prod",
    "build:simple": "vite build",
    preview: "vite preview",
    lint: "eslint src --ext .ts,.tsx,.vue,.js,.jsx",
    "lint:fix": "eslint src --fix --ext .ts,.tsx,.vue,.js,.jsx",
    "lint:ls": "ls-lint",
    "lint:staged": "lint-staged",
    format: 'prettier --write "**/*.{js,jsx,ts,tsx,css,vue}"',
    prepare: "husky install",
    api: "node ./scripts/api/index.js",
    apisya: "node ./scripts/api/ya.js",
    imgs: "node ./scripts/images.js",
    remove: "node ./scripts/remove-doc.js",
    doc: "node ./scripts/doc/index.js",
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview",
    "interview:dev": "vitepress dev",
    "interview:build": "vitepress build",
    "interview:preview": "vitepress preview",
    preinstall: "npx only-allow pnpm"
  },
  dependencies: {
    "@element-plus/icons-vue": "^2.3.1",
    "@mdit-vue/shared": "^2.1.3",
    "@vueuse/core": "^11.3.0",
    "@wangeditor/editor-for-vue": "^5.1.12",
    axios: "^1.3.2",
    dayjs: "^1.11.7",
    "driver.js": "^1.3.1",
    echarts: "^5.4.1",
    "echarts-liquidfill": "^3.1.0",
    "element-plus": "^2.8.7",
    lodash: "^4.17.21",
    "markdown-it": "^14.1.0",
    "markdown-it-container": "^4.0.0",
    md5: "^2.3.0",
    mockjs: "^1.1.0",
    nprogress: "^0.2.0",
    "path-to-regexp": "^8.2.0",
    pinia: "^2.1.7",
    qrcode: "^1.5.4",
    qs: "^6.11.1",
    screenfull: "^6.0.2",
    sortablejs: "^1.15.2",
    "vite-plugin-mock": "^2.9.6",
    vue: "^3.5.12",
    "vue-i18n": "^9.13.1",
    "vue-router": "^4.4.5",
    vuedraggable: "^4.1.0",
    xlsx: "^0.18.5"
  },
  devDependencies: {
    "@commitlint/cli": "^19.3.0",
    "@commitlint/config-conventional": "^19.2.2",
    "@ls-lint/ls-lint": "^2.2.3",
    "@types/node": "^18.13.0",
    "@typescript-eslint/eslint-plugin": "^5.56.0",
    "@typescript-eslint/parser": "^5.56.0",
    "@vitejs/plugin-vue": "^4.0.0",
    "@vue/compiler-sfc": "^3.5.13",
    eslint: "^7.23.0",
    "eslint-config-prettier": "^8.8.0",
    "eslint-plugin-prettier": "^4.2.1",
    "eslint-plugin-vue": "^9.9.0",
    husky: "^9.0.11",
    "lint-staged": "^15.2.4",
    prettier: "^2.8.6",
    "rollup-plugin-visualizer": "^5.12.0",
    sass: "^1.80.6",
    stylelint: "^16.1.0",
    "stylelint-config-html": "^1.1.0",
    "stylelint-config-recess-order": "^5.0.0",
    "stylelint-config-recommended-scss": "^14.0.0",
    "stylelint-config-recommended-vue": "^1.5.0",
    "stylelint-config-standard": "^36.0.0",
    "stylelint-config-standard-scss": "^13.0.0",
    typescript: "^4.9.3",
    "unplugin-auto-import": "^0.18.3",
    "unplugin-generate-component-name": "^0.2.0",
    vite: "^5.4.10",
    "vite-plugin-cdn-import": "^1.0.1",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-eslint": "^1.8.1",
    "vite-plugin-html": "^3.2.2",
    vitepress: "^1.4.5",
    "vue-docgen-api": "^4.79.2",
    "vue-tsc": "^1.0.24"
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,json,css,scss,less,md,vue}": [
      "eslint --fix"
    ],
    "*.{css,scss,sass}": "stylelint --fix",
    "**/*": "prettier --write",
    "src/**": "ls-lint"
  }
};

// vite-config/plugins/cdn-import.ts
var { camelCase, upperFirst } = _;
var prodUrl = "//unpkg.com/{name}@{version}/{path}";
function getCamelCaseName(name) {
  return upperFirst(camelCase(name));
}
function getVersion(name) {
  return package_default.dependencies[name].replace("^", "");
}
function getPath(name, path2 = "") {
  let str = prodUrl.replace("{name}", name).replace("{version}", getVersion(name)).replace("{path}", path2);
  if (str.endsWith("/")) str = str.slice(0, -1);
  return str;
}
function getCss(css, path2) {
  if (!css) return;
  if (css === true) return path2;
  if (typeof css === "string") return css;
  throw new Error(`\u8BF7\u4F20\u5165string\u7C7B\u578B\u7684css\u503C`);
}
function getConfigItem(item, endPath) {
  if (typeof item === "string") item = { name: item };
  if (!item.name) throw new Error(`\u7F3A\u5C11name\u53C2\u6570`);
  const { name, var: varName = getCamelCaseName(name), path: path2 = getPath(name, endPath), css, ...rest } = item;
  return { name, var: varName, path: path2, css: getCss(css, path2), ...rest };
}
var externalList = [
  /*** 框架全家桶 ***/
  "vue",
  { name: "vue-demi", var: "VueDemi", path: "https://unpkg.com/vue-demi@0.14.10" },
  // getConfigItem({ name: "vue-demi", var: "VueDemi", path: "https://unpkg.com/vue-demi@0.14.10" }), // https://unpkg.com/vue-demi@0.14.10
  getConfigItem("vue-router"),
  // { name: "vue-router", var: "VueRouter", path: `https://unpkg.com/vue-router@4.4.5` },
  getConfigItem({ name: "vue-demi", var: "VueDemi", path: "https://unpkg.com/vue-demi@0.14.10" }),
  // https://unpkg.com/vue-demi@0.14.10
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
  getConfigItem("xlsx")
  // getConfigItem("@wangeditor/editor-for-vue"),
  /*** mock相关 ***/
  // getConfigItem("mockjs"),
  // getConfigItem("vite-plugin-mock"),
  /*** docs 相关 ***/
  // getConfigItem("markdown-it"),
  // getConfigItem("markdown-it-container"),
];
var external = externalList.map((it) => {
  if (typeof it === "string") return it;
  return it.name;
});
var cdnImport = cdnImportPlugin({
  prodUrl,
  // 默认值为：https://cdn.jsdelivr.net/npm/{name}@{version}/{path}
  // 类型：(Module | Module[] | GetModuleFunc | GetModuleFunc[])[]
  // 预设默认值：react, react-dom, react-router-dom, antd, vue, vue2, vue-router, vue-router@3, moment, dayjs, axios, lodash
  modules: externalList,
  enableInDevMode: true
  // 为true时，可以通过 CDN 导入生产环境下通常需要通过 NPM 安装的依赖
  // generateScriptTag(){},
  // generateCssLinkTag(){},
});

// vite-config/index.ts
var __vite_injected_original_dirname = "E:\\Quick-Admin\\quick_admin_vue3\\vite-config";
var useCdnImport = false;
var closeWarn = true;
var vite_config_default = ({ mode, command }) => {
  const isVitepress = process.argv[1].includes("vitepress");
  const isProd = mode === "production";
  return defineConfig({
    // assetsInclude: ["**/*.gltf"],
    // define: {
    //   __VUE_OPTIONS_API__: true, // 启用/禁用选项式 API 支持。禁用此功能将减小打包结果的体积，但如果第三方库依赖选项式 API，则可能影响兼容性
    //   __VUE_PROD_DEVTOOLS__: !isProd, // 在生产环境中启用/禁用开发者工具支持。启用会在打包结果中包含更多代码，因此建议仅在调试时启用此功能
    //   __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: !isProd, // 启用/禁用生产环境构建下激活 (hydration) 不匹配的详细警告。启用会在打包结果中包含更多代码，因此建议仅在调试时启用此功能
    // },
    // logLevel: closeWarn ? "error" : undefined, // 默认为 'info'。调整控制台输出的级别。可选值：'info', 'warn', 'error', 'silent'
    // envPrefix: 'VITE_', // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。
    // clearScreen: true, // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
    // 如部署在 https://<USERNAME>.github.io/ 上，可以省略不设置。 如部署在 https://github.com/<USERNAME>/<REPO>，则设置 base 为 '/<REPO>/'。
    base: "./",
    // 默认为 '/'。表示应用程序的根目录。如果你的应用程序部署在域名的根目录下，你不需要修改 base 的值。
    // mode: "development", // 默认development。可选：development，production。在配置中指明将会把 serve 和 build 时的模式 都 覆盖掉。也可以通过命令行 --mode 选项来重写。
    // root: "./src/pages", // 默认：process.cwd()。项目根目录（index.html 文件所在的位置）
    // envDir: '/', // 用于加载 .env 文件的目录
    // publicDir: 'public', // 默认为/public。将 publicDir 设定为 false 可以关闭此项功能
    // cacheDir: "node_modules/.vite", // 存储缓存文件的目录。可以使用 --force 命令行选项或手动删除目录
    plugins: [
      ...isVitepress ? [] : [vue(), visualizer_default, useCdnImport ? cdnImport : void 0],
      auto_import_default,
      vite_mock_serve_default,
      generate_component_name_default
      // imageminPlugin,
      // createHtmlPlugin,
      // viteCompression,
    ],
    resolve: {
      // extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json", ".svg"],
      alias: {
        // 放在根目录下时
        // "@": path.resolve(__dirname, "src"),
        // "#": path.resolve(__dirname, ""),
        // mock: path.join(__dirname, "mock"),
        // 放在根目录下的 plugins/index.ts时
        "@": path.resolve(__vite_injected_original_dirname, "../src"),
        "#": path.resolve(__vite_injected_original_dirname, ".."),
        mock: path.join(__vite_injected_original_dirname, "../mock")
      }
      // dedupe: [], // 如果你在你的应用程序中有相同依赖的副本（比如 monorepos），请使用此选项强制 Vite 始终将列出的依赖项解析为同一副本（从项目根目录）
      // conditions: [],
      // mainFields: [],
      // preserveSymlinks: [],
    },
    css: {
      // modules: {},
      // postcss: {},
      preprocessorOptions: {
        scss: {
          // 暂时消除警告：Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0. More info: https://sass-lang.com/d/legacy-js-api
          api: closeWarn ? "modern" : void 0,
          // additionalData: `@import "@/assets/styles/_var.scss";`,
          additionalData: `@use "@/assets/styles/_var.scss" as *;`
        }
        // less: {
        //   javascriptEnabled: true,
        //   additionalData: `@import "@/assets/styles/_var.scss";`,
        // },
      }
    },
    // json: {
    //   // namedExports: true, // 是否支持从 .json 文件中进行按名导入。
    //   // stringify: false, // 若设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...")
    // },
    server: {
      open: !isVitepress,
      port: isVitepress ? 5090 : 5180,
      //启动端口
      // host: "127.0.0.1", //  如果将此设置为 0.0.0.0 将监听所有地址，包括局域网和公网地址。
      // 禁用或配置 HMR 连接（用于 HMR websocket 必须使用不同的 http 服务器地址的情况）。设置 server.hmr.overlay 为 false 可以禁用开发服务器错误的屏蔽。
      // hmr:{
      //   protocol?: string,
      //   host?: string,
      //   port?: number,
      //   path?: string,
      //   timeout?: number,
      //   overlay?: boolean,
      //   clientPort?: number,
      //   server?: Server
      // },
      // strictPort: false, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
      // https: false, // 当 server.proxy 选项 也被使用时，将会仅使用 TLS
      // 设置代理
      // proxy: {
      //   "/api": {
      //     target: env.VITE_APP_API_BASEURL, //http://127.0.0.1:5500
      //     // target: "http://127.0.0.1:5180",
      //     // target: "https://fanlichuan.gitee.io",
      //     changeOrigin: true, //是否跨域
      //     ws: true, //是否代理 websockets
      //     secure: false, //是否https接口
      //     rewrite: (path: string) => path.replace(/^\/api/, ""),
      //     bypass(req, res, options: any) {
      //       const proxyURL = options.target + options.rewrite(req.url);
      //       res.setHeader("x-req-proxyURL", proxyURL); // 设置响应头可以在浏览器中看到实际请求地址
      //     },
      //   },
      // },
      proxy: {
        "/api": {
          target: "http://localhost:7003",
          //http://127.0.0.1:5500
          changeOrigin: true,
          //是否跨域
          ws: true,
          //是否代理 websockets
          secure: false,
          //是否https接口
          rewrite: (path2) => path2.replace(/^\/api/, ""),
          bypass(req, res, options) {
            const proxyURL = options.target + options.rewrite(req.url);
            res.setHeader("x-req-proxyURL", proxyURL);
          }
        }
      }
      // cors: true, // 为开发服务器配置 CORS。默认启用并允许任何源，传递一个 选项对象 来调整行为或设为 false 表示禁用。
      // force: true, // 设置为 true 强制使依赖预构建。
      // watch: {
      //   ignored: ["!**/node_modules/your-package-name/**"],
      // },
      // middlewareMode: "ssr", // 可选：'ssr', 'html',
      // fs: {},
      // origin: 'http://127.0.0.1:8080/',
    },
    // 设置为 false 来禁用 ESbuild 转换。
    // esbuild: {
    //   jsxFactory: "h",
    //   jsxFragment: "Fragment",
    //   jsxInject: `import React from 'react'`, // 通过 esbuild.jsxInject 来自动为每一个被 ESbuild 转换的文件注入 JSX helper
    // },
    //vite构建时默认使用Esbuild，打包速度是其他打包工具的十几倍，但是缺点也很明显，不具备操作AST的能力，所以需要通过terser去除console.log
    build: {
      // outDir: outDirPath,
      outDir: isProd ? "dist" : `dist-${mode}`,
      // assetsDir: "assets", // 指定生成静态资源的存放路径（相对于 build.outDir）。
      // manifest: true, // 在 outDir 中生成 manifest.json
      // assetsInlineLimit: 4096, // 默认4096，即4kb
      // cssCodeSplit: false, // 默认为true，为true时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时一并获取。为false时，会禁用 CSS 代码分割（将所有的 CSS 抽取到一个文件中）
      sourcemap: !isProd,
      reportCompressedSize: false,
      // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      chunkSizeWarningLimit: 1e3,
      // 默认500，打包最大体积警告
      // 压缩和混淆代码：使用 Vite 的内置压缩工具（例如 Terser）对打包后的代码进行压缩和混淆，以减小文件大小并提高加载速度。可以通过在 vite.config.js 中设置 build.minify 选项来启用压缩
      minify: "terser",
      // 默认：esbuild。可选：boolean | 'terser' | 'esbuild
      terserOptions: {
        compress: {
          drop_console: true,
          // 去掉console.log
          drop_debugger: true
        }
      },
      // https://rollupjs.org/guide/en/#big-list-of-options
      rollupOptions: {
        // 以下文件不打包
        // external: isVitepress ? undefined : useCdnImport ? external : undefined,  // 貌似使用 vite-plugin-cdn-import 时，可以省略不写 globals
        onwarn(warning, rollupWarn) {
          if (closeWarn) return;
          rollupWarn(warning);
        },
        // 多页面应用模式
        // input: {
        //   // __dirname 是 vite.config.js 文件所在的目录
        //   main: path.resolve(__dirname, "index.html"),
        //   nested: path.resolve(__dirname, "nested/index.html"),
        // },
        output: {
          // 分文件夹进行分包优化
          // entryFileNames: "assets/js/[name]-[hash].js",
          // chunkFileNames: "assets/js/[name]-[hash].js",
          // // assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          // //进行分包优化
          // manualChunks(id) {
          //   if (id.includes("/mock/")) return "mock";
          //   if (id.includes("node_modules")) {
          //     return id.split("node_modules/")[1].split("/")[0];
          //   }
          // },
          // assetFileNames(info) {
          //   const { name } = info;
          //   const ext = path.extname(name).slice(1);
          //   console.log(name, ext, "info-------------------------");
          //   if (["css", "js", "vue"].includes(ext)) {
          //     //wangEditor包的名字中带有/，所以需要处理下
          //     const packages = Object.keys(pkg.dependencies).map(key => key.split("/")[0]);
          //     const isNodeModule = packages.some(it => name.startsWith(it));
          //     const subPath = isNodeModule ? "package/" : "";
          //     const _name = getFileNameByPath(name);
          //     return `assets/[ext]/${subPath}${_name}-[hash].[ext]`;
          //   }
          //   const imgExts = ["png", "jpg", "jpeg", "webp", "svg", "gif", "ico"];
          //   if (imgExts.includes(ext)) return "assets/imgs/[ext]/[name]-[hash].[ext]";
          //   const fontExts = ["otf", "ttf"];
          //   if (fontExts.includes(ext)) return "assets/font/[name]-[hash].[ext]";
          //   return "assets/[ext]/[name]-[hash].[ext]";
          // },
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          // globals: { vue: "Vue" },  // 貌似使用 vite-plugin-cdn-import 时，可以省略不写 globals
        }
      }
      // https://rollupjs.org/guide/en/#watch-options
      // watch: {},
      // 库模式。开发面向浏览器的库
      // lib: {
      //   entry: path.resolve(__dirname, "lib/main.js"),
      //   name: "MyLib",
      //   fileName: format => `my-lib.${format}.js`,
      // },
    }
  });
};

// vite.config.ts
var vite_config_default2 = (cfg) => {
  const { mode, command } = cfg;
  const viteConfig = vite_config_default(cfg);
  const env = loadEnv2(mode, process.cwd());
  const apiMap = {
    "/api": env.VITE_APP_API_BASEURL,
    "/git": "https://fanlichuan.gitee.io"
  };
  viteConfig.server.proxy = getApiProxy(apiMap);
  return viteConfig;
};
export {
  vite_config_default2 as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS1jb25maWcvaW5kZXgudHMiLCAidml0ZS1jb25maWcvcGx1Z2lucy92aXN1YWxpemVyLnRzIiwgInZpdGUtY29uZmlnL3BsdWdpbnMvYXV0by1pbXBvcnQudHMiLCAidml0ZS1jb25maWcvcGx1Z2lucy92aXRlLW1vY2stc2VydmUudHMiLCAidml0ZS1jb25maWcvcGx1Z2lucy9nZW5lcmF0ZS1jb21wb25lbnQtbmFtZS50cyIsICJ2aXRlLWNvbmZpZy91dGlscy9pbmRleC50cyIsICJ2aXRlLWNvbmZpZy9wbHVnaW5zL2Nkbi1pbXBvcnQudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcUXVpY2stQWRtaW5cXFxccXVpY2tfYWRtaW5fdnVlM1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcUXVpY2stQWRtaW5cXFxccXVpY2tfYWRtaW5fdnVlM1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovUXVpY2stQWRtaW4vcXVpY2tfYWRtaW5fdnVlMy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgZ2V0Vml0ZUNvbmZpZywgeyBnZXRBcGlQcm94eSB9IGZyb20gXCIuL3ZpdGUtY29uZmlnXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCAoY2ZnOiBhbnkpID0+IHtcclxuICBjb25zdCB7IG1vZGUsIGNvbW1hbmQgfSA9IGNmZztcclxuICAvLyBjb25zdCBpc0RldiA9IG1vZGUgPT09IFwiZGV2XCI7XHJcbiAgY29uc3Qgdml0ZUNvbmZpZyA9IGdldFZpdGVDb25maWcoY2ZnKTtcclxuICAvLyBpZiAoaXNEZXYpIHtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpOyAvLyBcdThCQkVcdTdGNkVcdTdCMkNcdTRFMDlcdTRFMkFcdTUzQzJcdTY1NzBcdTRFM0EgJycgXHU2NzY1XHU1MkEwXHU4RjdEXHU2MjQwXHU2NzA5XHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHVGRjBDXHU4MDBDXHU0RTBEXHU3QkExXHU2NjJGXHU1NDI2XHU2NzA5IGBWSVRFX2AgXHU1MjREXHU3RjAwXHUzMDAyXHJcbiAgY29uc3QgYXBpTWFwID0ge1xyXG4gICAgXCIvYXBpXCI6IGVudi5WSVRFX0FQUF9BUElfQkFTRVVSTCxcclxuICAgIFwiL2dpdFwiOiBcImh0dHBzOi8vZmFubGljaHVhbi5naXRlZS5pb1wiLFxyXG4gIH07XHJcbiAgdml0ZUNvbmZpZy5zZXJ2ZXIucHJveHkgPSBnZXRBcGlQcm94eShhcGlNYXApO1xyXG4gIC8vIH1cclxuICByZXR1cm4gdml0ZUNvbmZpZztcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxRdWljay1BZG1pblxcXFxxdWlja19hZG1pbl92dWUzXFxcXHZpdGUtY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxRdWljay1BZG1pblxcXFxxdWlja19hZG1pbl92dWUzXFxcXHZpdGUtY29uZmlnXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9RdWljay1BZG1pbi9xdWlja19hZG1pbl92dWUzL3ZpdGUtY29uZmlnL2luZGV4LnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBwa2cgZnJvbSBcIi4uL3BhY2thZ2UuanNvblwiO1xuaW1wb3J0IHsgZ2V0RmlsZU5hbWVCeVBhdGggfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5pbXBvcnQgdmlzdWFsaXplciBmcm9tIFwiLi9wbHVnaW5zL3Zpc3VhbGl6ZXJcIjtcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCIuL3BsdWdpbnMvYXV0by1pbXBvcnRcIjtcbmltcG9ydCB2aXRlTW9ja1NlcnZlIGZyb20gXCIuL3BsdWdpbnMvdml0ZS1tb2NrLXNlcnZlXCI7XG5pbXBvcnQgZ2VuZXJhdGVDb21wb25lbnROYW1lIGZyb20gXCIuL3BsdWdpbnMvZ2VuZXJhdGUtY29tcG9uZW50LW5hbWVcIjtcblxuaW1wb3J0IHsgY2RuSW1wb3J0LCBleHRlcm5hbCB9IGZyb20gXCIuL3BsdWdpbnMvY2RuLWltcG9ydFwiO1xuLy8gaW1wb3J0IGNyZWF0ZUh0bWxQbHVnaW4gZnJvbSBcIi4vcGx1Z2lucy9jcmVhdGUtaHRtbC1wbHVnaW5cIjtcbi8vIGltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSBcIi4vcGx1Z2lucy92aXRlLWNvbXByZXNzaW9uXCI7XG4vLyBpbXBvcnQgaW1hZ2VtaW5QbHVnaW4gZnJvbSBcIi4vcGx1Z2lucy9pbWFnZW1pbi1wbHVnaW5cIjtcblxuZXhwb3J0ICogZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgdXNlQ2RuSW1wb3J0ID0gZmFsc2U7IC8vIFx1NEY3Rlx1NzUyOGNkblxuY29uc3QgY2xvc2VXYXJuID0gdHJ1ZTsgLy9cdTUxNzNcdTk1RURcdThCNjZcdTU0NEFcbi8vIGNvbnN0IG91dERpclBhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uL29ubGluZS1wcmV2aWV3L3Z1ZVwiKTtcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlLCBjb21tYW5kIH0pID0+IHtcbiAgLy8gY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTsgLy8gXHU4QkJFXHU3RjZFXHU3QjJDXHU0RTA5XHU0RTJBXHU1M0MyXHU2NTcwXHU0RTNBICcnIFx1Njc2NVx1NTJBMFx1OEY3RFx1NjI0MFx1NjcwOVx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1RkYwQ1x1ODAwQ1x1NEUwRFx1N0JBMVx1NjYyRlx1NTQyNlx1NjcwOSBgVklURV9gIFx1NTI0RFx1N0YwMFx1MzAwMlxuICBjb25zdCBpc1ZpdGVwcmVzcyA9IHByb2Nlc3MuYXJndlsxXS5pbmNsdWRlcyhcInZpdGVwcmVzc1wiKTtcbiAgY29uc3QgaXNQcm9kID0gbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCI7IC8vIFx1NTM5Rlx1Njc2NVx1NTNENlx1NTAzQ1x1ODMwM1x1NTZGNFx1NjYyRlx1RkYxQXByb2R1Y3Rpb24sIGRldmVsb3AsIFx1NEY0Nlx1OTE0RFx1N0Y2RVx1NEU4NmVudlx1NjU4N1x1NEVGNlx1NTQwRVx1RkYwQ1x1NjI0MFx1NEVFNVx1NjUzOVx1NTNEOFx1NEU4Nm1vZGVcdTc2ODRcdTUwM0NcbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XG4gICAgLy8gYXNzZXRzSW5jbHVkZTogW1wiKiovKi5nbHRmXCJdLFxuICAgIC8vIGRlZmluZToge1xuICAgIC8vICAgX19WVUVfT1BUSU9OU19BUElfXzogdHJ1ZSwgLy8gXHU1NDJGXHU3NTI4L1x1Nzk4MVx1NzUyOFx1OTAwOVx1OTg3OVx1NUYwRiBBUEkgXHU2NTJGXHU2MzAxXHUzMDAyXHU3OTgxXHU3NTI4XHU2QjY0XHU1MjlGXHU4MEZEXHU1QzA2XHU1MUNGXHU1QzBGXHU2MjUzXHU1MzA1XHU3RUQzXHU2NzlDXHU3Njg0XHU0RjUzXHU3OUVGXHVGRjBDXHU0RjQ2XHU1OTgyXHU2NzlDXHU3QjJDXHU0RTA5XHU2NUI5XHU1RTkzXHU0RjlEXHU4RDU2XHU5MDA5XHU5ODc5XHU1RjBGIEFQSVx1RkYwQ1x1NTIxOVx1NTNFRlx1ODBGRFx1NUY3MVx1NTRDRFx1NTE3Q1x1NUJCOVx1NjAyN1xuICAgIC8vICAgX19WVUVfUFJPRF9ERVZUT09MU19fOiAhaXNQcm9kLCAvLyBcdTU3MjhcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTRFMkRcdTU0MkZcdTc1MjgvXHU3OTgxXHU3NTI4XHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3XHU2NTJGXHU2MzAxXHUzMDAyXHU1NDJGXHU3NTI4XHU0RjFBXHU1NzI4XHU2MjUzXHU1MzA1XHU3RUQzXHU2NzlDXHU0RTJEXHU1MzA1XHU1NDJCXHU2NkY0XHU1OTFBXHU0RUUzXHU3ODAxXHVGRjBDXHU1NkUwXHU2QjY0XHU1RUZBXHU4QkFFXHU0RUM1XHU1NzI4XHU4QzAzXHU4QkQ1XHU2NUY2XHU1NDJGXHU3NTI4XHU2QjY0XHU1MjlGXHU4MEZEXG4gICAgLy8gICBfX1ZVRV9QUk9EX0hZRFJBVElPTl9NSVNNQVRDSF9ERVRBSUxTX186ICFpc1Byb2QsIC8vIFx1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjhcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTY3ODRcdTVFRkFcdTRFMEJcdTZGQzBcdTZEM0IgKGh5ZHJhdGlvbikgXHU0RTBEXHU1MzM5XHU5MTREXHU3Njg0XHU4QkU2XHU3RUM2XHU4QjY2XHU1NDRBXHUzMDAyXHU1NDJGXHU3NTI4XHU0RjFBXHU1NzI4XHU2MjUzXHU1MzA1XHU3RUQzXHU2NzlDXHU0RTJEXHU1MzA1XHU1NDJCXHU2NkY0XHU1OTFBXHU0RUUzXHU3ODAxXHVGRjBDXHU1NkUwXHU2QjY0XHU1RUZBXHU4QkFFXHU0RUM1XHU1NzI4XHU4QzAzXHU4QkQ1XHU2NUY2XHU1NDJGXHU3NTI4XHU2QjY0XHU1MjlGXHU4MEZEXG4gICAgLy8gfSxcbiAgICAvLyBsb2dMZXZlbDogY2xvc2VXYXJuID8gXCJlcnJvclwiIDogdW5kZWZpbmVkLCAvLyBcdTlFRDhcdThCQTRcdTRFM0EgJ2luZm8nXHUzMDAyXHU4QzAzXHU2NTc0XHU2M0E3XHU1MjM2XHU1M0YwXHU4RjkzXHU1MUZBXHU3Njg0XHU3RUE3XHU1MjJCXHUzMDAyXHU1M0VGXHU5MDA5XHU1MDNDXHVGRjFBJ2luZm8nLCAnd2FybicsICdlcnJvcicsICdzaWxlbnQnXG4gICAgLy8gZW52UHJlZml4OiAnVklURV8nLCAvLyBcdTRFRTUgZW52UHJlZml4IFx1NUYwMFx1NTkzNFx1NzY4NFx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1NEYxQVx1OTAxQVx1OEZDNyBpbXBvcnQubWV0YS5lbnYgXHU2NkI0XHU5NzMyXHU1NzI4XHU0RjYwXHU3Njg0XHU1QkEyXHU2MjM3XHU3QUVGXHU2RTkwXHU3ODAxXHU0RTJEXHUzMDAyXG4gICAgLy8gY2xlYXJTY3JlZW46IHRydWUsIC8vIFx1OEJCRVx1NEUzQSBmYWxzZSBcdTUzRUZcdTRFRTVcdTkwN0ZcdTUxNEQgVml0ZSBcdTZFMDVcdTVDNEZcdTgwMENcdTk1MTlcdThGQzdcdTU3MjhcdTdFQzhcdTdBRUZcdTRFMkRcdTYyNTNcdTUzNzBcdTY3RDBcdTRFOUJcdTUxNzNcdTk1MkVcdTRGRTFcdTYwNkZcbiAgICAvLyBcdTU5ODJcdTkwRThcdTdGNzJcdTU3MjggaHR0cHM6Ly88VVNFUk5BTUU+LmdpdGh1Yi5pby8gXHU0RTBBXHVGRjBDXHU1M0VGXHU0RUU1XHU3NzAxXHU3NTY1XHU0RTBEXHU4QkJFXHU3RjZFXHUzMDAyIFx1NTk4Mlx1OTBFOFx1N0Y3Mlx1NTcyOCBodHRwczovL2dpdGh1Yi5jb20vPFVTRVJOQU1FPi88UkVQTz5cdUZGMENcdTUyMTlcdThCQkVcdTdGNkUgYmFzZSBcdTRFM0EgJy88UkVQTz4vJ1x1MzAwMlxuICAgIGJhc2U6IFwiLi9cIiwgLy8gXHU5RUQ4XHU4QkE0XHU0RTNBICcvJ1x1MzAwMlx1ODg2OFx1NzkzQVx1NUU5NFx1NzUyOFx1N0EwQlx1NUU4Rlx1NzY4NFx1NjgzOVx1NzZFRVx1NUY1NVx1MzAwMlx1NTk4Mlx1Njc5Q1x1NEY2MFx1NzY4NFx1NUU5NFx1NzUyOFx1N0EwQlx1NUU4Rlx1OTBFOFx1N0Y3Mlx1NTcyOFx1NTdERlx1NTQwRFx1NzY4NFx1NjgzOVx1NzZFRVx1NUY1NVx1NEUwQlx1RkYwQ1x1NEY2MFx1NEUwRFx1OTcwMFx1ODk4MVx1NEZFRVx1NjUzOSBiYXNlIFx1NzY4NFx1NTAzQ1x1MzAwMlxuICAgIC8vIG1vZGU6IFwiZGV2ZWxvcG1lbnRcIiwgLy8gXHU5RUQ4XHU4QkE0ZGV2ZWxvcG1lbnRcdTMwMDJcdTUzRUZcdTkwMDlcdUZGMUFkZXZlbG9wbWVudFx1RkYwQ3Byb2R1Y3Rpb25cdTMwMDJcdTU3MjhcdTkxNERcdTdGNkVcdTRFMkRcdTYzMDdcdTY2MEVcdTVDMDZcdTRGMUFcdTYyOEEgc2VydmUgXHU1NDhDIGJ1aWxkIFx1NjVGNlx1NzY4NFx1NkEyMVx1NUYwRiBcdTkwRkQgXHU4OTg2XHU3NkQ2XHU2Mzg5XHUzMDAyXHU0RTVGXHU1M0VGXHU0RUU1XHU5MDFBXHU4RkM3XHU1NDdEXHU0RUU0XHU4ODRDIC0tbW9kZSBcdTkwMDlcdTk4NzlcdTY3NjVcdTkxQ0RcdTUxOTlcdTMwMDJcbiAgICAvLyByb290OiBcIi4vc3JjL3BhZ2VzXCIsIC8vIFx1OUVEOFx1OEJBNFx1RkYxQXByb2Nlc3MuY3dkKClcdTMwMDJcdTk4NzlcdTc2RUVcdTY4MzlcdTc2RUVcdTVGNTVcdUZGMDhpbmRleC5odG1sIFx1NjU4N1x1NEVGNlx1NjI0MFx1NTcyOFx1NzY4NFx1NEY0RFx1N0Y2RVx1RkYwOVxuICAgIC8vIGVudkRpcjogJy8nLCAvLyBcdTc1MjhcdTRFOEVcdTUyQTBcdThGN0QgLmVudiBcdTY1ODdcdTRFRjZcdTc2ODRcdTc2RUVcdTVGNTVcbiAgICAvLyBwdWJsaWNEaXI6ICdwdWJsaWMnLCAvLyBcdTlFRDhcdThCQTRcdTRFM0EvcHVibGljXHUzMDAyXHU1QzA2IHB1YmxpY0RpciBcdThCQkVcdTVCOUFcdTRFM0EgZmFsc2UgXHU1M0VGXHU0RUU1XHU1MTczXHU5NUVEXHU2QjY0XHU5ODc5XHU1MjlGXHU4MEZEXG4gICAgLy8gY2FjaGVEaXI6IFwibm9kZV9tb2R1bGVzLy52aXRlXCIsIC8vIFx1NUI1OFx1NTBBOFx1N0YxM1x1NUI1OFx1NjU4N1x1NEVGNlx1NzY4NFx1NzZFRVx1NUY1NVx1MzAwMlx1NTNFRlx1NEVFNVx1NEY3Rlx1NzUyOCAtLWZvcmNlIFx1NTQ3RFx1NEVFNFx1ODg0Q1x1OTAwOVx1OTg3OVx1NjIxNlx1NjI0Qlx1NTJBOFx1NTIyMFx1OTY2NFx1NzZFRVx1NUY1NVxuICAgIHBsdWdpbnM6IFtcbiAgICAgIC4uLihpc1ZpdGVwcmVzcyA/IFtdIDogW3Z1ZSgpLCB2aXN1YWxpemVyLCB1c2VDZG5JbXBvcnQgPyBjZG5JbXBvcnQgOiB1bmRlZmluZWRdKSxcbiAgICAgIEF1dG9JbXBvcnQsXG4gICAgICB2aXRlTW9ja1NlcnZlLFxuICAgICAgZ2VuZXJhdGVDb21wb25lbnROYW1lLFxuICAgICAgLy8gaW1hZ2VtaW5QbHVnaW4sXG4gICAgICAvLyBjcmVhdGVIdG1sUGx1Z2luLFxuICAgICAgLy8gdml0ZUNvbXByZXNzaW9uLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgLy8gZXh0ZW5zaW9uczogW1wiLm1qc1wiLCBcIi5qc1wiLCBcIi50c1wiLCBcIi5qc3hcIiwgXCIudHN4XCIsIFwiLmpzb25cIl0sXG4gICAgICBleHRlbnNpb25zOiBbXCIubWpzXCIsIFwiLmpzXCIsIFwiLm10c1wiLCBcIi50c1wiLCBcIi5qc3hcIiwgXCIudHN4XCIsIFwiLmpzb25cIiwgXCIuc3ZnXCJdLFxuICAgICAgYWxpYXM6IHtcbiAgICAgICAgLy8gXHU2NTNFXHU1NzI4XHU2ODM5XHU3NkVFXHU1RjU1XHU0RTBCXHU2NUY2XG4gICAgICAgIC8vIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSxcbiAgICAgICAgLy8gXCIjXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiXCIpLFxuICAgICAgICAvLyBtb2NrOiBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIm1vY2tcIiksXG4gICAgICAgIC8vIFx1NjUzRVx1NTcyOFx1NjgzOVx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NCBwbHVnaW5zL2luZGV4LnRzXHU2NUY2XG4gICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uL3NyY1wiKSxcbiAgICAgICAgXCIjXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi5cIiksXG4gICAgICAgIG1vY2s6IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vbW9ja1wiKSxcbiAgICAgIH0sXG4gICAgICAvLyBkZWR1cGU6IFtdLCAvLyBcdTU5ODJcdTY3OUNcdTRGNjBcdTU3MjhcdTRGNjBcdTc2ODRcdTVFOTRcdTc1MjhcdTdBMEJcdTVFOEZcdTRFMkRcdTY3MDlcdTc2RjhcdTU0MENcdTRGOURcdThENTZcdTc2ODRcdTUyNkZcdTY3MkNcdUZGMDhcdTZCRDRcdTU5ODIgbW9ub3JlcG9zXHVGRjA5XHVGRjBDXHU4QkY3XHU0RjdGXHU3NTI4XHU2QjY0XHU5MDA5XHU5ODc5XHU1RjNBXHU1MjM2IFZpdGUgXHU1OUNCXHU3RUM4XHU1QzA2XHU1MjE3XHU1MUZBXHU3Njg0XHU0RjlEXHU4RDU2XHU5ODc5XHU4OUUzXHU2NzkwXHU0RTNBXHU1NDBDXHU0RTAwXHU1MjZGXHU2NzJDXHVGRjA4XHU0RUNFXHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHVGRjA5XG4gICAgICAvLyBjb25kaXRpb25zOiBbXSxcbiAgICAgIC8vIG1haW5GaWVsZHM6IFtdLFxuICAgICAgLy8gcHJlc2VydmVTeW1saW5rczogW10sXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIC8vIG1vZHVsZXM6IHt9LFxuICAgICAgLy8gcG9zdGNzczoge30sXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICAvLyBcdTY2ODJcdTY1RjZcdTZEODhcdTk2NjRcdThCNjZcdTU0NEFcdUZGMUFEZXByZWNhdGlvbiBXYXJuaW5nOiBUaGUgbGVnYWN5IEpTIEFQSSBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gRGFydCBTYXNzIDIuMC4wLiBNb3JlIGluZm86IGh0dHBzOi8vc2Fzcy1sYW5nLmNvbS9kL2xlZ2FjeS1qcy1hcGlcbiAgICAgICAgICBhcGk6IGNsb3NlV2FybiA/IFwibW9kZXJuXCIgOiB1bmRlZmluZWQsXG4gICAgICAgICAgLy8gYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9hc3NldHMvc3R5bGVzL192YXIuc2Nzc1wiO2AsXG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAdXNlIFwiQC9hc3NldHMvc3R5bGVzL192YXIuc2Nzc1wiIGFzICo7YCxcbiAgICAgICAgfSxcbiAgICAgICAgLy8gbGVzczoge1xuICAgICAgICAvLyAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAvLyAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIkAvYXNzZXRzL3N0eWxlcy9fdmFyLnNjc3NcIjtgLFxuICAgICAgICAvLyB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIC8vIGpzb246IHtcbiAgICAvLyAgIC8vIG5hbWVkRXhwb3J0czogdHJ1ZSwgLy8gXHU2NjJGXHU1NDI2XHU2NTJGXHU2MzAxXHU0RUNFIC5qc29uIFx1NjU4N1x1NEVGNlx1NEUyRFx1OEZEQlx1ODg0Q1x1NjMwOVx1NTQwRFx1NUJGQ1x1NTE2NVx1MzAwMlxuICAgIC8vICAgLy8gc3RyaW5naWZ5OiBmYWxzZSwgLy8gXHU4MkU1XHU4QkJFXHU3RjZFXHU0RTNBIHRydWVcdUZGMENcdTVCRkNcdTUxNjVcdTc2ODQgSlNPTiBcdTRGMUFcdTg4QUJcdThGNkNcdTYzNjJcdTRFM0EgZXhwb3J0IGRlZmF1bHQgSlNPTi5wYXJzZShcIi4uLlwiKVxuICAgIC8vIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBvcGVuOiAhaXNWaXRlcHJlc3MsXG4gICAgICBwb3J0OiBpc1ZpdGVwcmVzcyA/IDUwOTAgOiA1MTgwLCAvL1x1NTQyRlx1NTJBOFx1N0FFRlx1NTNFM1xuICAgICAgLy8gaG9zdDogXCIxMjcuMC4wLjFcIiwgLy8gIFx1NTk4Mlx1Njc5Q1x1NUMwNlx1NkI2NFx1OEJCRVx1N0Y2RVx1NEUzQSAwLjAuMC4wIFx1NUMwNlx1NzZEMVx1NTQyQ1x1NjI0MFx1NjcwOVx1NTczMFx1NTc0MFx1RkYwQ1x1NTMwNVx1NjJFQ1x1NUM0MFx1NTdERlx1N0Y1MVx1NTQ4Q1x1NTE2Q1x1N0Y1MVx1NTczMFx1NTc0MFx1MzAwMlxuICAgICAgLy8gXHU3OTgxXHU3NTI4XHU2MjE2XHU5MTREXHU3RjZFIEhNUiBcdThGREVcdTYzQTVcdUZGMDhcdTc1MjhcdTRFOEUgSE1SIHdlYnNvY2tldCBcdTVGQzVcdTk4N0JcdTRGN0ZcdTc1MjhcdTRFMERcdTU0MENcdTc2ODQgaHR0cCBcdTY3MERcdTUyQTFcdTU2NjhcdTU3MzBcdTU3NDBcdTc2ODRcdTYwQzVcdTUxQjVcdUZGMDlcdTMwMDJcdThCQkVcdTdGNkUgc2VydmVyLmhtci5vdmVybGF5IFx1NEUzQSBmYWxzZSBcdTUzRUZcdTRFRTVcdTc5ODFcdTc1MjhcdTVGMDBcdTUzRDFcdTY3MERcdTUyQTFcdTU2NjhcdTk1MTlcdThCRUZcdTc2ODRcdTVDNEZcdTg1M0RcdTMwMDJcbiAgICAgIC8vIGhtcjp7XG4gICAgICAvLyAgIHByb3RvY29sPzogc3RyaW5nLFxuICAgICAgLy8gICBob3N0Pzogc3RyaW5nLFxuICAgICAgLy8gICBwb3J0PzogbnVtYmVyLFxuICAgICAgLy8gICBwYXRoPzogc3RyaW5nLFxuICAgICAgLy8gICB0aW1lb3V0PzogbnVtYmVyLFxuICAgICAgLy8gICBvdmVybGF5PzogYm9vbGVhbixcbiAgICAgIC8vICAgY2xpZW50UG9ydD86IG51bWJlcixcbiAgICAgIC8vICAgc2VydmVyPzogU2VydmVyXG4gICAgICAvLyB9LFxuICAgICAgLy8gc3RyaWN0UG9ydDogZmFsc2UsIC8vIFx1OEJCRVx1NEUzQSB0cnVlIFx1NjVGNlx1ODJFNVx1N0FFRlx1NTNFM1x1NURGMlx1ODhBQlx1NTM2MFx1NzUyOFx1NTIxOVx1NEYxQVx1NzZGNFx1NjNBNVx1OTAwMFx1NTFGQVx1RkYwQ1x1ODAwQ1x1NEUwRFx1NjYyRlx1NUMxRFx1OEJENVx1NEUwQlx1NEUwMFx1NEUyQVx1NTNFRlx1NzUyOFx1N0FFRlx1NTNFM1x1MzAwMlxuICAgICAgLy8gaHR0cHM6IGZhbHNlLCAvLyBcdTVGNTMgc2VydmVyLnByb3h5IFx1OTAwOVx1OTg3OSBcdTRFNUZcdTg4QUJcdTRGN0ZcdTc1MjhcdTY1RjZcdUZGMENcdTVDMDZcdTRGMUFcdTRFQzVcdTRGN0ZcdTc1MjggVExTXG4gICAgICAvLyBcdThCQkVcdTdGNkVcdTRFRTNcdTc0MDZcbiAgICAgIC8vIHByb3h5OiB7XG4gICAgICAvLyAgIFwiL2FwaVwiOiB7XG4gICAgICAvLyAgICAgdGFyZ2V0OiBlbnYuVklURV9BUFBfQVBJX0JBU0VVUkwsIC8vaHR0cDovLzEyNy4wLjAuMTo1NTAwXG4gICAgICAvLyAgICAgLy8gdGFyZ2V0OiBcImh0dHA6Ly8xMjcuMC4wLjE6NTE4MFwiLFxuICAgICAgLy8gICAgIC8vIHRhcmdldDogXCJodHRwczovL2ZhbmxpY2h1YW4uZ2l0ZWUuaW9cIixcbiAgICAgIC8vICAgICBjaGFuZ2VPcmlnaW46IHRydWUsIC8vXHU2NjJGXHU1NDI2XHU4REU4XHU1N0RGXG4gICAgICAvLyAgICAgd3M6IHRydWUsIC8vXHU2NjJGXHU1NDI2XHU0RUUzXHU3NDA2IHdlYnNvY2tldHNcbiAgICAgIC8vICAgICBzZWN1cmU6IGZhbHNlLCAvL1x1NjYyRlx1NTQyNmh0dHBzXHU2M0E1XHU1M0UzXG4gICAgICAvLyAgICAgcmV3cml0ZTogKHBhdGg6IHN0cmluZykgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgXCJcIiksXG4gICAgICAvLyAgICAgYnlwYXNzKHJlcSwgcmVzLCBvcHRpb25zOiBhbnkpIHtcbiAgICAgIC8vICAgICAgIGNvbnN0IHByb3h5VVJMID0gb3B0aW9ucy50YXJnZXQgKyBvcHRpb25zLnJld3JpdGUocmVxLnVybCk7XG4gICAgICAvLyAgICAgICByZXMuc2V0SGVhZGVyKFwieC1yZXEtcHJveHlVUkxcIiwgcHJveHlVUkwpOyAvLyBcdThCQkVcdTdGNkVcdTU0Q0RcdTVFOTRcdTU5MzRcdTUzRUZcdTRFRTVcdTU3MjhcdTZENEZcdTg5QzhcdTU2NjhcdTRFMkRcdTc3MEJcdTUyMzBcdTVCOUVcdTk2NDVcdThCRjdcdTZDNDJcdTU3MzBcdTU3NDBcbiAgICAgIC8vICAgICB9LFxuICAgICAgLy8gICB9LFxuICAgICAgLy8gfSxcbiAgICAgIHByb3h5OiB7XG4gICAgICAgIFwiL2FwaVwiOiB7XG4gICAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6NzAwM1wiLCAvL2h0dHA6Ly8xMjcuMC4wLjE6NTUwMFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSwgLy9cdTY2MkZcdTU0MjZcdThERThcdTU3REZcbiAgICAgICAgICB3czogdHJ1ZSwgLy9cdTY2MkZcdTU0MjZcdTRFRTNcdTc0MDYgd2Vic29ja2V0c1xuICAgICAgICAgIHNlY3VyZTogZmFsc2UsIC8vXHU2NjJGXHU1NDI2aHR0cHNcdTYzQTVcdTUzRTNcbiAgICAgICAgICByZXdyaXRlOiAocGF0aDogc3RyaW5nKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCBcIlwiKSxcbiAgICAgICAgICBieXBhc3MocmVxLCByZXMsIG9wdGlvbnM6IGFueSkge1xuICAgICAgICAgICAgY29uc3QgcHJveHlVUkwgPSBvcHRpb25zLnRhcmdldCArIG9wdGlvbnMucmV3cml0ZShyZXEudXJsKTtcbiAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoXCJ4LXJlcS1wcm94eVVSTFwiLCBwcm94eVVSTCk7IC8vIFx1OEJCRVx1N0Y2RVx1NTRDRFx1NUU5NFx1NTkzNFx1NTNFRlx1NEVFNVx1NTcyOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1NEUyRFx1NzcwQlx1NTIzMFx1NUI5RVx1OTY0NVx1OEJGN1x1NkM0Mlx1NTczMFx1NTc0MFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgLy8gY29yczogdHJ1ZSwgLy8gXHU0RTNBXHU1RjAwXHU1M0QxXHU2NzBEXHU1MkExXHU1NjY4XHU5MTREXHU3RjZFIENPUlNcdTMwMDJcdTlFRDhcdThCQTRcdTU0MkZcdTc1MjhcdTVFNzZcdTUxNDFcdThCQjhcdTRFRkJcdTRGNTVcdTZFOTBcdUZGMENcdTRGMjBcdTkwMTJcdTRFMDBcdTRFMkEgXHU5MDA5XHU5ODc5XHU1QkY5XHU4QzYxIFx1Njc2NVx1OEMwM1x1NjU3NFx1ODg0Q1x1NEUzQVx1NjIxNlx1OEJCRVx1NEUzQSBmYWxzZSBcdTg4NjhcdTc5M0FcdTc5ODFcdTc1MjhcdTMwMDJcbiAgICAgIC8vIGZvcmNlOiB0cnVlLCAvLyBcdThCQkVcdTdGNkVcdTRFM0EgdHJ1ZSBcdTVGM0FcdTUyMzZcdTRGN0ZcdTRGOURcdThENTZcdTk4ODRcdTY3ODRcdTVFRkFcdTMwMDJcbiAgICAgIC8vIHdhdGNoOiB7XG4gICAgICAvLyAgIGlnbm9yZWQ6IFtcIiEqKi9ub2RlX21vZHVsZXMveW91ci1wYWNrYWdlLW5hbWUvKipcIl0sXG4gICAgICAvLyB9LFxuICAgICAgLy8gbWlkZGxld2FyZU1vZGU6IFwic3NyXCIsIC8vIFx1NTNFRlx1OTAwOVx1RkYxQSdzc3InLCAnaHRtbCcsXG4gICAgICAvLyBmczoge30sXG4gICAgICAvLyBvcmlnaW46ICdodHRwOi8vMTI3LjAuMC4xOjgwODAvJyxcbiAgICB9LFxuICAgIC8vIFx1OEJCRVx1N0Y2RVx1NEUzQSBmYWxzZSBcdTY3NjVcdTc5ODFcdTc1MjggRVNidWlsZCBcdThGNkNcdTYzNjJcdTMwMDJcbiAgICAvLyBlc2J1aWxkOiB7XG4gICAgLy8gICBqc3hGYWN0b3J5OiBcImhcIixcbiAgICAvLyAgIGpzeEZyYWdtZW50OiBcIkZyYWdtZW50XCIsXG4gICAgLy8gICBqc3hJbmplY3Q6IGBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnYCwgLy8gXHU5MDFBXHU4RkM3IGVzYnVpbGQuanN4SW5qZWN0IFx1Njc2NVx1ODFFQVx1NTJBOFx1NEUzQVx1NkJDRlx1NEUwMFx1NEUyQVx1ODhBQiBFU2J1aWxkIFx1OEY2Q1x1NjM2Mlx1NzY4NFx1NjU4N1x1NEVGNlx1NkNFOFx1NTE2NSBKU1ggaGVscGVyXG4gICAgLy8gfSxcbiAgICAvL3ZpdGVcdTY3ODRcdTVFRkFcdTY1RjZcdTlFRDhcdThCQTRcdTRGN0ZcdTc1MjhFc2J1aWxkXHVGRjBDXHU2MjUzXHU1MzA1XHU5MDFGXHU1RUE2XHU2NjJGXHU1MTc2XHU0RUQ2XHU2MjUzXHU1MzA1XHU1REU1XHU1MTc3XHU3Njg0XHU1MzQxXHU1MUUwXHU1MDBEXHVGRjBDXHU0RjQ2XHU2NjJGXHU3RjNBXHU3MEI5XHU0RTVGXHU1Rjg4XHU2NjBFXHU2NjNFXHVGRjBDXHU0RTBEXHU1MTc3XHU1OTA3XHU2NENEXHU0RjVDQVNUXHU3Njg0XHU4MEZEXHU1MjlCXHVGRjBDXHU2MjQwXHU0RUU1XHU5NzAwXHU4OTgxXHU5MDFBXHU4RkM3dGVyc2VyXHU1M0JCXHU5NjY0Y29uc29sZS5sb2dcbiAgICBidWlsZDoge1xuICAgICAgLy8gb3V0RGlyOiBvdXREaXJQYXRoLFxuICAgICAgb3V0RGlyOiBpc1Byb2QgPyBcImRpc3RcIiA6IGBkaXN0LSR7bW9kZX1gLFxuICAgICAgLy8gYXNzZXRzRGlyOiBcImFzc2V0c1wiLCAvLyBcdTYzMDdcdTVCOUFcdTc1MUZcdTYyMTBcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTc2ODRcdTVCNThcdTY1M0VcdThERUZcdTVGODRcdUZGMDhcdTc2RjhcdTVCRjlcdTRFOEUgYnVpbGQub3V0RGlyXHVGRjA5XHUzMDAyXG4gICAgICAvLyBtYW5pZmVzdDogdHJ1ZSwgLy8gXHU1NzI4IG91dERpciBcdTRFMkRcdTc1MUZcdTYyMTAgbWFuaWZlc3QuanNvblxuICAgICAgLy8gYXNzZXRzSW5saW5lTGltaXQ6IDQwOTYsIC8vIFx1OUVEOFx1OEJBNDQwOTZcdUZGMENcdTUzNzM0a2JcbiAgICAgIC8vIGNzc0NvZGVTcGxpdDogZmFsc2UsIC8vIFx1OUVEOFx1OEJBNFx1NEUzQXRydWVcdUZGMENcdTRFM0F0cnVlXHU2NUY2XHVGRjBDXHU1NzI4XHU1RjAyXHU2QjY1IGNodW5rIFx1NEUyRFx1NUJGQ1x1NTE2NVx1NzY4NCBDU1MgXHU1QzA2XHU1MTg1XHU4MDU0XHU1MjMwXHU1RjAyXHU2QjY1IGNodW5rIFx1NjcyQ1x1OEVBQlx1RkYwQ1x1NUU3Nlx1NTcyOFx1NTE3Nlx1ODhBQlx1NTJBMFx1OEY3RFx1NjVGNlx1NEUwMFx1NUU3Nlx1ODNCN1x1NTNENlx1MzAwMlx1NEUzQWZhbHNlXHU2NUY2XHVGRjBDXHU0RjFBXHU3OTgxXHU3NTI4IENTUyBcdTRFRTNcdTc4MDFcdTUyMDZcdTUyNzJcdUZGMDhcdTVDMDZcdTYyNDBcdTY3MDlcdTc2ODQgQ1NTIFx1NjJCRFx1NTNENlx1NTIzMFx1NEUwMFx1NEUyQVx1NjU4N1x1NEVGNlx1NEUyRFx1RkYwOVxuICAgICAgc291cmNlbWFwOiAhaXNQcm9kLFxuICAgICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLCAvLyBcdTU0MkZcdTc1MjgvXHU3OTgxXHU3NTI4IGd6aXAgXHU1MzhCXHU3RjI5XHU1OTI3XHU1QzBGXHU2MkE1XHU1NDRBXHUzMDAyXHU1MzhCXHU3RjI5XHU1OTI3XHU1NzhCXHU4RjkzXHU1MUZBXHU2NTg3XHU0RUY2XHU1M0VGXHU4MEZEXHU0RjFBXHU1Rjg4XHU2MTYyXHVGRjBDXHU1NkUwXHU2QjY0XHU3OTgxXHU3NTI4XHU4QkU1XHU1MjlGXHU4MEZEXHU1M0VGXHU4MEZEXHU0RjFBXHU2M0QwXHU5QUQ4XHU1OTI3XHU1NzhCXHU5ODc5XHU3NkVFXHU3Njg0XHU2Nzg0XHU1RUZBXHU2MDI3XHU4MEZEXHUzMDAyXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsIC8vIFx1OUVEOFx1OEJBNDUwMFx1RkYwQ1x1NjI1M1x1NTMwNVx1NjcwMFx1NTkyN1x1NEY1M1x1NzlFRlx1OEI2Nlx1NTQ0QVxuICAgICAgLy8gXHU1MzhCXHU3RjI5XHU1NDhDXHU2REY3XHU2REM2XHU0RUUzXHU3ODAxXHVGRjFBXHU0RjdGXHU3NTI4IFZpdGUgXHU3Njg0XHU1MTg1XHU3RjZFXHU1MzhCXHU3RjI5XHU1REU1XHU1MTc3XHVGRjA4XHU0RjhCXHU1OTgyIFRlcnNlclx1RkYwOVx1NUJGOVx1NjI1M1x1NTMwNVx1NTQwRVx1NzY4NFx1NEVFM1x1NzgwMVx1OEZEQlx1ODg0Q1x1NTM4Qlx1N0YyOVx1NTQ4Q1x1NkRGN1x1NkRDNlx1RkYwQ1x1NEVFNVx1NTFDRlx1NUMwRlx1NjU4N1x1NEVGNlx1NTkyN1x1NUMwRlx1NUU3Nlx1NjNEMFx1OUFEOFx1NTJBMFx1OEY3RFx1OTAxRlx1NUVBNlx1MzAwMlx1NTNFRlx1NEVFNVx1OTAxQVx1OEZDN1x1NTcyOCB2aXRlLmNvbmZpZy5qcyBcdTRFMkRcdThCQkVcdTdGNkUgYnVpbGQubWluaWZ5IFx1OTAwOVx1OTg3OVx1Njc2NVx1NTQyRlx1NzUyOFx1NTM4Qlx1N0YyOVxuICAgICAgbWluaWZ5OiBcInRlcnNlclwiLCAvLyBcdTlFRDhcdThCQTRcdUZGMUFlc2J1aWxkXHUzMDAyXHU1M0VGXHU5MDA5XHVGRjFBYm9vbGVhbiB8ICd0ZXJzZXInIHwgJ2VzYnVpbGRcbiAgICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsIC8vIFx1NTNCQlx1NjM4OWNvbnNvbGUubG9nXG4gICAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAvLyBodHRwczovL3JvbGx1cGpzLm9yZy9ndWlkZS9lbi8jYmlnLWxpc3Qtb2Ytb3B0aW9uc1xuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAvLyBcdTRFRTVcdTRFMEJcdTY1ODdcdTRFRjZcdTRFMERcdTYyNTNcdTUzMDVcbiAgICAgICAgLy8gZXh0ZXJuYWw6IGlzVml0ZXByZXNzID8gdW5kZWZpbmVkIDogdXNlQ2RuSW1wb3J0ID8gZXh0ZXJuYWwgOiB1bmRlZmluZWQsICAvLyBcdThDOENcdTRGM0NcdTRGN0ZcdTc1Mjggdml0ZS1wbHVnaW4tY2RuLWltcG9ydCBcdTY1RjZcdUZGMENcdTUzRUZcdTRFRTVcdTc3MDFcdTc1NjVcdTRFMERcdTUxOTkgZ2xvYmFsc1xuICAgICAgICBvbndhcm4od2FybmluZywgcm9sbHVwV2Fybikge1xuICAgICAgICAgIGlmIChjbG9zZVdhcm4pIHJldHVybjsgLy8gXHU1MTczXHU5NUVEXHU2MjQwXHU2NzA5XHU4QjY2XHU1NDRBXHU0RkUxXHU2MDZGXG4gICAgICAgICAgLy8gLy8gXHU4REYzXHU4RkM3XHU2MzA3XHU1QjlBXHU3QzdCXHU1NzhCXHU3Njg0XHU4QjY2XHU1NDRBXG4gICAgICAgICAgLy8gaWYgKHdhcm5pbmcuY29kZSA9PT0gXCJVTlVTRURfRVhURVJOQUxfSU1QT1JUXCIpIHJldHVybjtcbiAgICAgICAgICAvLyAvLyBcdTYyOUJcdTUxRkFcdTUxNzZcdTRFRDZcdTdDN0JcdTU3OEJcdTc2ODRcdThCNjZcdTU0NEFcdUZGMENcdTRGN0ZcdTc1MjggT2JqZWN0LmFzc2lnbiBcdTYyRjdcdThEMUQgbmV3IEVycm9yKHdhcm5pbmcubWVzc2FnZSlcdUZGMENcdTVDMDZcdTRGN0ZcdTU0N0RcdTRFRTRcdTg4NENcdTYyNTNcdTUzNzBcdTk4OURcdTU5MTZcdTc2ODRcdTRGRTFcdTYwNkZcdUZGMENcdTU5ODJcdThCNjZcdTU0NEFcdTRGNERcdTdGNkVcdUZGMENcdTU0OENcdTVFMkVcdTUyQTkgVVJMXHUzMDAyXG4gICAgICAgICAgLy8gaWYgKHdhcm5pbmcuY29kZSA9PT0gXCJNSVNTSU5HX0VYUE9SVFwiKSB0aHJvdyBPYmplY3QuYXNzaWduKG5ldyBFcnJvcigpLCB3YXJuaW5nKTtcbiAgICAgICAgICAvLyAvLyBcdTRGN0ZcdTc1MjhcdTlFRDhcdThCQTRcdTU5MDRcdTc0MDZcdTUxRkRcdTY1NzBcdTUxNUNcdTVFOTVcbiAgICAgICAgICByb2xsdXBXYXJuKHdhcm5pbmcpO1xuICAgICAgICB9LFxuICAgICAgICAvLyBcdTU5MUFcdTk4NzVcdTk3NjJcdTVFOTRcdTc1MjhcdTZBMjFcdTVGMEZcbiAgICAgICAgLy8gaW5wdXQ6IHtcbiAgICAgICAgLy8gICAvLyBfX2Rpcm5hbWUgXHU2NjJGIHZpdGUuY29uZmlnLmpzIFx1NjU4N1x1NEVGNlx1NjI0MFx1NTcyOFx1NzY4NFx1NzZFRVx1NUY1NVxuICAgICAgICAvLyAgIG1haW46IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgICAgLy8gICBuZXN0ZWQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwibmVzdGVkL2luZGV4Lmh0bWxcIiksXG4gICAgICAgIC8vIH0sXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIC8vIFx1NTIwNlx1NjU4N1x1NEVGNlx1NTkzOVx1OEZEQlx1ODg0Q1x1NTIwNlx1NTMwNVx1NEYxOFx1NTMxNlxuICAgICAgICAgIC8vIGVudHJ5RmlsZU5hbWVzOiBcImFzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICAgICAgLy8gY2h1bmtGaWxlTmFtZXM6IFwiYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanNcIixcbiAgICAgICAgICAvLyAvLyBhc3NldEZpbGVOYW1lczogXCJhc3NldHMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XVwiLFxuICAgICAgICAgIC8vIC8vXHU4RkRCXHU4ODRDXHU1MjA2XHU1MzA1XHU0RjE4XHU1MzE2XG4gICAgICAgICAgLy8gbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgICAgLy8gICBpZiAoaWQuaW5jbHVkZXMoXCIvbW9jay9cIikpIHJldHVybiBcIm1vY2tcIjtcbiAgICAgICAgICAvLyAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSkge1xuICAgICAgICAgIC8vICAgICByZXR1cm4gaWQuc3BsaXQoXCJub2RlX21vZHVsZXMvXCIpWzFdLnNwbGl0KFwiL1wiKVswXTtcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyB9LFxuICAgICAgICAgIC8vIGFzc2V0RmlsZU5hbWVzKGluZm8pIHtcbiAgICAgICAgICAvLyAgIGNvbnN0IHsgbmFtZSB9ID0gaW5mbztcbiAgICAgICAgICAvLyAgIGNvbnN0IGV4dCA9IHBhdGguZXh0bmFtZShuYW1lKS5zbGljZSgxKTtcbiAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKG5hbWUsIGV4dCwgXCJpbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgICAvLyAgIGlmIChbXCJjc3NcIiwgXCJqc1wiLCBcInZ1ZVwiXS5pbmNsdWRlcyhleHQpKSB7XG4gICAgICAgICAgLy8gICAgIC8vd2FuZ0VkaXRvclx1NTMwNVx1NzY4NFx1NTQwRFx1NUI1N1x1NEUyRFx1NUUyNlx1NjcwOS9cdUZGMENcdTYyNDBcdTRFRTVcdTk3MDBcdTg5ODFcdTU5MDRcdTc0MDZcdTRFMEJcbiAgICAgICAgICAvLyAgICAgY29uc3QgcGFja2FnZXMgPSBPYmplY3Qua2V5cyhwa2cuZGVwZW5kZW5jaWVzKS5tYXAoa2V5ID0+IGtleS5zcGxpdChcIi9cIilbMF0pO1xuICAgICAgICAgIC8vICAgICBjb25zdCBpc05vZGVNb2R1bGUgPSBwYWNrYWdlcy5zb21lKGl0ID0+IG5hbWUuc3RhcnRzV2l0aChpdCkpO1xuICAgICAgICAgIC8vICAgICBjb25zdCBzdWJQYXRoID0gaXNOb2RlTW9kdWxlID8gXCJwYWNrYWdlL1wiIDogXCJcIjtcbiAgICAgICAgICAvLyAgICAgY29uc3QgX25hbWUgPSBnZXRGaWxlTmFtZUJ5UGF0aChuYW1lKTtcbiAgICAgICAgICAvLyAgICAgcmV0dXJuIGBhc3NldHMvW2V4dF0vJHtzdWJQYXRofSR7X25hbWV9LVtoYXNoXS5bZXh0XWA7XG4gICAgICAgICAgLy8gICB9XG4gICAgICAgICAgLy8gICBjb25zdCBpbWdFeHRzID0gW1wicG5nXCIsIFwianBnXCIsIFwianBlZ1wiLCBcIndlYnBcIiwgXCJzdmdcIiwgXCJnaWZcIiwgXCJpY29cIl07XG4gICAgICAgICAgLy8gICBpZiAoaW1nRXh0cy5pbmNsdWRlcyhleHQpKSByZXR1cm4gXCJhc3NldHMvaW1ncy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdXCI7XG4gICAgICAgICAgLy8gICBjb25zdCBmb250RXh0cyA9IFtcIm90ZlwiLCBcInR0ZlwiXTtcbiAgICAgICAgICAvLyAgIGlmIChmb250RXh0cy5pbmNsdWRlcyhleHQpKSByZXR1cm4gXCJhc3NldHMvZm9udC9bbmFtZV0tW2hhc2hdLltleHRdXCI7XG4gICAgICAgICAgLy8gICByZXR1cm4gXCJhc3NldHMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XVwiO1xuICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgLy8gXHU1NzI4IFVNRCBcdTY3ODRcdTVFRkFcdTZBMjFcdTVGMEZcdTRFMEJcdTRFM0FcdThGRDlcdTRFOUJcdTU5MTZcdTkwRThcdTUzMTZcdTc2ODRcdTRGOURcdThENTZcdTYzRDBcdTRGOUJcdTRFMDBcdTRFMkFcdTUxNjhcdTVDNDBcdTUzRDhcdTkxQ0ZcbiAgICAgICAgICAvLyBnbG9iYWxzOiB7IHZ1ZTogXCJWdWVcIiB9LCAgLy8gXHU4QzhDXHU0RjNDXHU0RjdGXHU3NTI4IHZpdGUtcGx1Z2luLWNkbi1pbXBvcnQgXHU2NUY2XHVGRjBDXHU1M0VGXHU0RUU1XHU3NzAxXHU3NTY1XHU0RTBEXHU1MTk5IGdsb2JhbHNcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAvLyBodHRwczovL3JvbGx1cGpzLm9yZy9ndWlkZS9lbi8jd2F0Y2gtb3B0aW9uc1xuICAgICAgLy8gd2F0Y2g6IHt9LFxuICAgICAgLy8gXHU1RTkzXHU2QTIxXHU1RjBGXHUzMDAyXHU1RjAwXHU1M0QxXHU5NzYyXHU1NDExXHU2RDRGXHU4OUM4XHU1NjY4XHU3Njg0XHU1RTkzXG4gICAgICAvLyBsaWI6IHtcbiAgICAgIC8vICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwibGliL21haW4uanNcIiksXG4gICAgICAvLyAgIG5hbWU6IFwiTXlMaWJcIixcbiAgICAgIC8vICAgZmlsZU5hbWU6IGZvcm1hdCA9PiBgbXktbGliLiR7Zm9ybWF0fS5qc2AsXG4gICAgICAvLyB9LFxuICAgIH0sXG4gIH0pO1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcUXVpY2stQWRtaW5cXFxccXVpY2tfYWRtaW5fdnVlM1xcXFx2aXRlLWNvbmZpZ1xcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxRdWljay1BZG1pblxcXFxxdWlja19hZG1pbl92dWUzXFxcXHZpdGUtY29uZmlnXFxcXHBsdWdpbnNcXFxcdmlzdWFsaXplci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovUXVpY2stQWRtaW4vcXVpY2tfYWRtaW5fdnVlMy92aXRlLWNvbmZpZy9wbHVnaW5zL3Zpc3VhbGl6ZXIudHNcIjtpbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiO1xyXG4vKipcclxuICogXHU2MjUzXHU1MzA1XHU0RjUzXHU3OUVGXHU1M0VGXHU4OUM2XHU1MzE2XHU5NzYyXHU2NzdGXHJcbiAqIEBsaW5rIG5wbSBcdTY1ODdcdTY4NjNcdTk0RkVcdTYzQTVcdUZGMUFodHRwczovL2dpdGNvZGUuY29tL2J0ZC9yb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXIvb3ZlcnZpZXdcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IHZpc3VhbGl6ZXIoe1xyXG4gIG9wZW46IHRydWUsIC8vXHU5RUQ4XHU4QkE0XHU0RTNBZmFsc2VcdUZGMENcdTY3ODRcdTVFRkFcdTVCOENcdTYyMTBcdTU0MEVcdTY2MkZcdTU0MjZcdTgxRUFcdTUyQThcdTRFQ0VcdTZENEZcdTg5QzhcdTU2NjhcdTYyNTNcdTVGMDBcclxuICB0aXRsZTogXCJcdTY1ODdcdTRFRjZcdTRGNTNcdTc5RUZcdTUyMDZcdTY3OTBcIixcclxuICAvL1x1NkNFOFx1RkYxQVx1NEY3Rlx1NzUyOCBvdXREaXJQYXRoIFx1NEYxQVx1NUJGQ1x1ODFGNFx1NjI1M1x1NTMwNVx1NTkzMVx1OEQyNVx1RkYwQ1x1NjU0NVx1NjY4Mlx1NjVGNlx1NEY3Rlx1NzUyOFx1NjI0Qlx1NTJBOFx1NTkwRFx1NTIzNlx1N0M5OFx1OEQzNFx1NjVCOVx1NUYwRlx1NTIzMCBvdXREaXJQYXRoIFx1NEUyRFxyXG4gIGZpbGVuYW1lOiBcIi4vcHVibGljL3N0YXRzLmh0bWxcIiwgLy9cdTlFRDhcdThCQTRcdTY1ODdcdTRFRjZcdTU0MERcdTRFM0Egc3RhdHMuaHRtbFx1RkYwQ1x1NjI1M1x1NTMwNVx1OEY5M1x1NTFGQVx1NzY4NFx1NjU4N1x1NEVGNlx1NTQwRFx1NzlGMFxyXG4gIGd6aXBTaXplOiB0cnVlLCAvL1x1OUVEOFx1OEJBNGZhbHNlXHVGRjBDXHU2NjJGXHU1NDI2XHU2NjNFXHU3OTNBZ3ppcFx1NTM4Qlx1N0YyOVx1NEU0Qlx1NTQwRVx1NzY4NFx1NTkyN1x1NUMwRlxyXG4gIGJyb3RsaVNpemU6IHRydWUsIC8vXHU5RUQ4XHU4QkE0ZmFsc2VcclxuICAvLyBwcm9qZWN0Um9vdDogXCIuL2Rpc3RcIiwgLy9cdTlFRDhcdThCQTRcdTUwM0NcdUZGMUFwcm9jZXNzLmN3ZCgpXHJcbiAgLy8gdGVtcGxhdGU6ICd0cmVlbWFwJywgLy9cdTlFRDhcdThCQTRcdUZGMUF0cmVlbWFwXHUzMDAyXHU4RjkzXHU1MUZBXHU2QTIxXHU2NzdGXHVGRjBDXHU1M0VGXHU5MDA5XHU1MDNDXHVGRjFBc3VuYnVyc3QsIHRyZWVtYXAsIG5ldHdvcmssIHJhdy1kYXRhLCBsaXN0XHJcbiAgLy8gaW5jbHVkZTogdW5kZWZpbmVkLFxyXG4gIC8vIGV4Y2x1ZGU6IHVuZGVmaW5lZCxcclxuICAvLyBlbWl0RmlsZTogZmFsc2UsXHJcbiAgLy8gc291cmNlbWFwOiBmYWxzZSxcclxuICAvLyBGaWx0ZXI6IHsgYnVuZGxlOiBwaWNvbWF0Y2hQYXR0ZXJuLCBmaWxlOiBwaWNvbWF0Y2hQYXR0ZXJuIH0sXHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXFF1aWNrLUFkbWluXFxcXHF1aWNrX2FkbWluX3Z1ZTNcXFxcdml0ZS1jb25maWdcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcUXVpY2stQWRtaW5cXFxccXVpY2tfYWRtaW5fdnVlM1xcXFx2aXRlLWNvbmZpZ1xcXFxwbHVnaW5zXFxcXGF1dG8taW1wb3J0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9RdWljay1BZG1pbi9xdWlja19hZG1pbl92dWUzL3ZpdGUtY29uZmlnL3BsdWdpbnMvYXV0by1pbXBvcnQudHNcIjtpbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXV0b0ltcG9ydCh7XHJcbiAgaW1wb3J0czogW1widnVlXCIsIFwidnVlLXJvdXRlclwiXSxcclxuICBkdHM6IFwidHlwZXMvYXV0by1pbXBvcnRzLmQudHNcIixcclxuICAvLyBkaXJzOiBbJ3NyYy9zdG9yZXMnXVxyXG59KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxRdWljay1BZG1pblxcXFxxdWlja19hZG1pbl92dWUzXFxcXHZpdGUtY29uZmlnXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFF1aWNrLUFkbWluXFxcXHF1aWNrX2FkbWluX3Z1ZTNcXFxcdml0ZS1jb25maWdcXFxccGx1Z2luc1xcXFx2aXRlLW1vY2stc2VydmUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1F1aWNrLUFkbWluL3F1aWNrX2FkbWluX3Z1ZTMvdml0ZS1jb25maWcvcGx1Z2lucy92aXRlLW1vY2stc2VydmUudHNcIjsvL3ZpdGUgbW9jayBcdTUzQzJcdTgwMDNcdTU3MzBcdTU3NDBcdUZGMUFodHRwOi8vZXZlbnRzLmppYW5zaHUuaW8vcC84Y2U5NDA3N2FmMmFcclxuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1tb2NrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB2aXRlTW9ja1NlcnZlKHtcclxuICAvLyBpZ25vcmU/OiBSZWdFeHAgfCAoKGZpbGVOYW1lOiBzdHJpbmcpID0+IGJvb2xlYW4pO1xyXG4gIC8vIGlnbm9yZUZpbGVzPzogc3RyaW5nW107XHJcbiAgLy8gY29uZmlnUGF0aD86IHN0cmluZztcclxuICAvLyBpbmplY3RGaWxlPzogc3RyaW5nO1xyXG4gIC8vIGluamVjdENvZGU/OiBzdHJpbmc7XHJcbiAgLy8gbG9nZ2VyPzpib29sZWFuO1xyXG4gIG1vY2tQYXRoOiBcIm1vY2tcIiwgLy9cdTg5RTNcdTY3OTBcdTY4MzlcdTc2RUVcdTVGNTVcdTRFMEJcdTc2ODRtb2NrXHU2NTg3XHU0RUY2XHU1OTM5XHJcbiAgbG9jYWxFbmFibGVkOiB0cnVlLCAvLyBcdTVGMDBcdTUzRDFcdTYyNTNcdTUzMDVcdTVGMDBcdTUxNzNcclxuICBwcm9kRW5hYmxlZDogdHJ1ZSwgLy8gXHU3NTFGXHU0RUE3XHU2MjUzXHU1MzA1XHU1RjAwXHU1MTczXHJcbiAgc3VwcG9ydFRzOiB0cnVlLCAvLyBcdTYyNTNcdTVGMDBcdTU0MEVcdUZGMENcdTUzRUZcdTRFRTVcdThCRkJcdTUzRDYgdHMgXHU2NTg3XHU0RUY2XHU2QTIxXHU1NzU3XHUzMDAyIFx1OEJGN1x1NkNFOFx1NjEwRlx1RkYwQ1x1NjI1M1x1NUYwMFx1NTQwRVx1NUMwNlx1NjVFMFx1NkNENVx1NzZEMVx1ODlDNi5qcyBcdTY1ODdcdTRFRjZcdTMwMDJcclxuICB3YXRjaEZpbGVzOiB0cnVlLCAvLyBcdTc2RDFcdTg5QzZcdTY1ODdcdTRFRjZcdTY2RjRcdTY1MzlcclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcUXVpY2stQWRtaW5cXFxccXVpY2tfYWRtaW5fdnVlM1xcXFx2aXRlLWNvbmZpZ1xcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxRdWljay1BZG1pblxcXFxxdWlja19hZG1pbl92dWUzXFxcXHZpdGUtY29uZmlnXFxcXHBsdWdpbnNcXFxcZ2VuZXJhdGUtY29tcG9uZW50LW5hbWUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1F1aWNrLUFkbWluL3F1aWNrX2FkbWluX3Z1ZTMvdml0ZS1jb25maWcvcGx1Z2lucy9nZW5lcmF0ZS1jb21wb25lbnQtbmFtZS50c1wiOy8vIG5wbSBcdTU3MzBcdTU3NDBcdUZGMUFodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS91bnBsdWdpbi1nZW5lcmF0ZS1jb21wb25lbnQtbmFtZVxyXG5pbXBvcnQgR2VuZXJhdGVDb21wb25lbnROYW1lIGZyb20gXCJ1bnBsdWdpbi1nZW5lcmF0ZS1jb21wb25lbnQtbmFtZS92aXRlXCI7XHJcbmltcG9ydCB7IHRvQ2FtZWxDYXNlIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG4vLyBcdTgxRUFcdTUyQThcdTdFRDlcdTdFQzRcdTRFRjZcdTU0N0RcdTU0MERcclxuZXhwb3J0IGRlZmF1bHQgR2VuZXJhdGVDb21wb25lbnROYW1lKHtcclxuICBpbmNsdWRlOiBbXCIqKi8qLnZ1ZVwiXSxcclxuICBlbnRlcjogW1xyXG4gICAgLy9cdTUxNjhcdTVDNDBcdTc2ODRcdTU3RkFcdTc4NDBcdTdFQzRcdTRFRjZcdTc2ODRcdTU0N0RcdTU0MERcdTg5QzRcdTUyMTlcdUZGMUFcdTY4MzlcdTYzNkVcdTY1ODdcdTRFRjZcdTYyMTZcdTcyMzZcdTdFQTdcdTY1ODdcdTRFRjZcdTU5MzlcdTU0MERcdTc5RjBcdTU0N0RcdTU0MERcclxuICAgIHtcclxuICAgICAgaW5jbHVkZTogW1wic3JjL2NvbXBvbmVudHMvKiovKi52dWVcIl0sXHJcbiAgICAgIGdlbkNvbXBvbmVudE5hbWU6IHJlcyA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBhdHRyTmFtZSwgZGlybmFtZSwgb3JpZ2luYWxOYW1lIH0gPSByZXM7XHJcbiAgICAgICAgaWYgKGF0dHJOYW1lKSByZXR1cm4gYXR0ck5hbWU7XHJcbiAgICAgICAgaWYgKG9yaWdpbmFsTmFtZSA9PT0gXCJJbmRleFwiIHx8IG9yaWdpbmFsTmFtZSA9PT0gXCJpbmRleFwiKSByZXR1cm4gdG9DYW1lbENhc2UoZGlybmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsTmFtZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvL1x1OTg3NVx1OTc2Mlx1N0VDNFx1NEVGNlx1NzY4NFx1NTQ3RFx1NTQwRFx1ODlDNFx1NTIxOVx1RkYxQVx1NjgzOVx1NjM2RVx1OERFRlx1NUY4NFx1Njc2NVx1NTQ3RFx1NTQwRChcdTRFRTVpbmRleC52dWVcdTRGNUNcdTRFM0FcdTY1ODdcdTRFRjZcdTU0MERcdTc2ODQpXHJcbiAgICB7XHJcbiAgICAgIGluY2x1ZGU6IFtcInNyYy92aWV3cy8qKi9pbmRleC52dWVcIl0sXHJcbiAgICAgIGdlbkNvbXBvbmVudE5hbWU6IHJlcyA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBhdHRyTmFtZSwgZmlsZVBhdGgsIG9yaWdpbmFsTmFtZSwgZGlybmFtZSB9ID0gcmVzO1xyXG4gICAgICAgIGlmIChhdHRyTmFtZSkgcmV0dXJuIGF0dHJOYW1lO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBmaWxlUGF0aC5zcGxpdChcIi92aWV3cy9cIilbMV0uc2xpY2UoMCwgLTEwKTtcclxuICAgICAgICByZXR1cm4gdG9DYW1lbENhc2UobmFtZSwgdHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy9cdTk4NzVcdTk3NjJcdTdFQzRcdTRFRjZcdTc2ODRcdTU0N0RcdTU0MERcdTg5QzRcdTUyMTlcdUZGMUFcdTY4MzlcdTYzNkVcdThERUZcdTVGODRcdTY3NjVcdTU0N0RcdTU0MEQoXHU0RUU1XHU5NzVFaW5kZXgudnVlXHU0RjVDXHU0RTNBXHU2NTg3XHU0RUY2XHU1NDBEXHU3Njg0XHVGRjBDXHU0RTE0XHU5OTk2XHU1QjU3XHU2QkNEXHU1QzBGXHU1MTk5KVxyXG4gICAge1xyXG4gICAgICBleGNsdWRlOiBbXCJzcmMvdmlld3MvKiovaW5kZXgudnVlXCIsIFwic3JjL3ZpZXdzLyoqL19jb21wb25lbnRzLyoqLyoudnVlXCJdLFxyXG4gICAgICBpbmNsdWRlOiBbXCJzcmMvdmlld3MvKiovKi52dWVcIl0sXHJcbiAgICAgIGdlbkNvbXBvbmVudE5hbWU6IHJlcyA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBhdHRyTmFtZSwgZmlsZVBhdGgsIG9yaWdpbmFsTmFtZSwgZGlybmFtZSB9ID0gcmVzO1xyXG4gICAgICAgIGlmIChhdHRyTmFtZSkgcmV0dXJuIGF0dHJOYW1lO1xyXG4gICAgICAgIGNvbnN0IGFmdGVyUGF0aCA9IGZpbGVQYXRoLnNwbGl0KFwiL3ZpZXdzL1wiKVsxXTtcclxuICAgICAgICAvLyBjb25zdCBjb2RlID0gYWZ0ZXJQYXRoLnNsaWNlKGFmdGVyUGF0aC5sYXN0SW5kZXhPZihcIi9cIikrMSkuY2hhckNvZGVBdCgwKVxyXG4gICAgICAgIC8vIGNvbnN0IGlzUGFnZSA9IGNvZGU+PTk3ICYmIGNvZGUgPD0xMjI7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGFmdGVyUGF0aC5zbGljZSgwLCAtNCk7XHJcbiAgICAgICAgcmV0dXJuIHRvQ2FtZWxDYXNlKG5hbWUsIHRydWUpO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxRdWljay1BZG1pblxcXFxxdWlja19hZG1pbl92dWUzXFxcXHZpdGUtY29uZmlnXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxRdWljay1BZG1pblxcXFxxdWlja19hZG1pbl92dWUzXFxcXHZpdGUtY29uZmlnXFxcXHV0aWxzXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9RdWljay1BZG1pbi9xdWlja19hZG1pbl92dWUzL3ZpdGUtY29uZmlnL3V0aWxzL2luZGV4LnRzXCI7LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKioqKioqKioqKioqIHZpdGUuY29uZmlnLnRzXHU1MjFEXHU1OUNCXHU1MzE2XHU2NUY2XHU0RjFBXHU3NTI4XHU1MjMwXHU3Njg0XHU2NUI5XHU2Q0Q1ICoqKioqKioqKioqKioqKioqL1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKipcbiAqIFx1NUMwNlx1NUI1N1x1N0IyNlx1NEUzMlx1OEY2Q1x1NEUzQVx1OUE3Q1x1NUNGMFxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBcdTg5ODFcdThGNkNcdTYzNjJcdTc2ODRcdTVCNTdcdTdCMjZcdTRFMzJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNCaWcgXHU2NjJGXHU1NDI2XHU4RjZDXHU2MjEwXHU1OTI3XHU5QTdDXHU1Q0YwXHVGRjBDXHU1NDI2XHU1MjE5XHU4RjZDXHU2MjEwXHU1QzBGXHU5QTdDXHU1Q0YwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0NhbWVsQ2FzZShzdHI6IHN0cmluZywgaXNCaWcgPSBmYWxzZSkge1xuICBzdHIgPSBzdHIucmVwbGFjZSgvKD86Xlxcd3xbQS1aXXxcXGJcXHcpL2csIChsZXR0ZXIsIGluZCkgPT4ge1xuICAgIGlmIChpbmQgPT09IDApIHJldHVybiBsZXR0ZXJbaXNCaWcgPyBcInRvVXBwZXJDYXNlXCIgOiBcInRvTG93ZXJDYXNlXCJdKCk7XG4gICAgcmV0dXJuIGxldHRlci50b1VwcGVyQ2FzZSgpO1xuICB9KTtcbiAgc3RyID0gc3RyLnJlcGxhY2UoL1xccyt8XFwvfC18fS9nLCBcIlwiKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBcdTgzQjdcdTUzRDZcdTRFRTNcdTc0MDZcdTY2MjBcdTVDMDRcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcGlNYXAgYXBpXHU2NjIwXHU1QzA0XHU1QkY5XHU4QzYxXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBcGlQcm94eShhcGlNYXApOiBhbnkge1xuICAvLyBcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdTc1MjhkZXZTZXJ2ZXJcdTUwNUFcdTYzQTVcdTUzRTNcdTRFRTNcdTc0MDZcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGFwaU1hcCkubWFwKGtleSA9PiB7XG4gICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cChgXiR7a2V5fWApO1xuICAgIHJldHVybiB7XG4gICAgICBba2V5XToge1xuICAgICAgICB0YXJnZXQ6IGFwaU1hcFtrZXldLCAvL2h0dHA6Ly8xMjcuMC4wLjE6NTUwMFxuICAgICAgICAvLyB0YXJnZXQ6IFwiaHR0cDovLzEyNy4wLjAuMTo1MTgwXCIsXG4gICAgICAgIC8vIHRhcmdldDogXCJodHRwczovL2ZhbmxpY2h1YW4uZ2l0ZWUuaW9cIixcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLCAvL1x1NjYyRlx1NTQyNlx1OERFOFx1NTdERlxuICAgICAgICB3czogdHJ1ZSwgLy9cdTY2MkZcdTU0MjZcdTRFRTNcdTc0MDYgd2Vic29ja2V0c1xuICAgICAgICBzZWN1cmU6IGZhbHNlLCAvL1x1NjYyRlx1NTQyNmh0dHBzXHU2M0E1XHU1M0UzXG4gICAgICAgIHJld3JpdGU6IChwYXRoOiBzdHJpbmcpID0+IHBhdGgucmVwbGFjZShyZWcsIFwiXCIpLFxuICAgICAgICBieXBhc3MocmVxLCByZXMsIG9wdGlvbnM6IGFueSkge1xuICAgICAgICAgIGNvbnN0IHByb3h5VVJMID0gb3B0aW9ucy50YXJnZXQgKyBvcHRpb25zLnJld3JpdGUocmVxLnVybCk7XG4gICAgICAgICAgcmVzLnNldEhlYWRlcihcIngtcmVxLXByb3h5VVJMXCIsIHByb3h5VVJMKTsgLy8gXHU4QkJFXHU3RjZFXHU1NENEXHU1RTk0XHU1OTM0XHU1M0VGXHU0RUU1XHU1NzI4XHU2RDRGXHU4OUM4XHU1NjY4XHU0RTJEXHU3NzBCXHU1MjMwXHU1QjlFXHU5NjQ1XHU4QkY3XHU2QzQyXHU1NzMwXHU1NzQwXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG4gIH0pO1xufVxuXG4vKipcbiAqIFx1NjgzOVx1NjM2RVx1NTczMFx1NTc0MFx1ODNCN1x1NTNENlx1NjU4N1x1NEVGNlx1NTQwRFx1NzlGMFxuICogQHBhcmFtIHBhdGggXHU1NzMwXHU1NzQwXHU4REVGXHU1Rjg0XG4gKiBAcGFyYW0gY2hhciBcdTUyMDZcdTUyNzJcdTVCNTdcdTdCMjZcdTRFMzJcdTRGOURcdThENTZcdTc2ODRcdTdCMjZcdTUzRjdcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlTmFtZUJ5UGF0aChwYXRoOiBzdHJpbmcsIGNoYXIgPSBcIi9cIikge1xuICBjb25zdCBsYXN0SW5kID0gcGF0aC5sYXN0SW5kZXhPZihjaGFyKTtcbiAgY29uc3QgbGFzdERvdEluZCA9IHBhdGgubGFzdEluZGV4T2YoXCIuXCIpO1xuICBjb25zdCBuYW1lID0gcGF0aC5zdWJzdHJpbmcobGFzdEluZCArIDEsIGxhc3REb3RJbmQpO1xuICBpZiAobmFtZSAhPT0gXCJpbmRleFwiICYmIG5hbWUgIT09IFwiSW5kZXhcIikgcmV0dXJuIG5hbWU7XG4gIGNvbnN0IHNlY29uZEluZCA9IHBhdGgubGFzdEluZGV4T2YoY2hhciwgbGFzdEluZCAtIDEpO1xuICBsZXQgbmV3TmFtZSA9IHBhdGguc3Vic3RyaW5nKHNlY29uZEluZCArIDEsIGxhc3RJbmQpIHx8IG5hbWU7XG4gIGlmIChuZXdOYW1lLnN0YXJ0c1dpdGgoXCJfXCIpKSBuZXdOYW1lID0gYDAke25ld05hbWV9YDsgLy9HaXRIdWIgUGFnZXNcdTY3MERcdTUyQTFcdTRGMUFcdTVDMDZcdTRFMEJcdTUyMTJcdTdFQkZcdTVGMDBcdTU5MzRcdTc2ODRcdTY1ODdcdTRFRjZcdTg5QzZcdTRFM0FcdTk2OTBcdTg1Q0ZcdTY1ODdcdTRFRjZcdUZGMENcdTRFMERcdTRGMUFcdTY2QjRcdTk3MzJcdTUxRkFcdTY3NjVcdUZGMENcdTY1NDVcdTUwNUFcdTZCNjRcdTU5MDRcdTc0MDZcbiAgcmV0dXJuIG5ld05hbWU7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXFF1aWNrLUFkbWluXFxcXHF1aWNrX2FkbWluX3Z1ZTNcXFxcdml0ZS1jb25maWdcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcUXVpY2stQWRtaW5cXFxccXVpY2tfYWRtaW5fdnVlM1xcXFx2aXRlLWNvbmZpZ1xcXFxwbHVnaW5zXFxcXGNkbi1pbXBvcnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1F1aWNrLUFkbWluL3F1aWNrX2FkbWluX3Z1ZTMvdml0ZS1jb25maWcvcGx1Z2lucy9jZG4taW1wb3J0LnRzXCI7aW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IGNkbkltcG9ydFBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tY2RuLWltcG9ydFwiO1xuaW1wb3J0IHBrZyBmcm9tIFwiLi4vLi4vcGFja2FnZS5qc29uXCI7XG5cbmNvbnN0IHsgY2FtZWxDYXNlLCB1cHBlckZpcnN0IH0gPSBfO1xuXG5jb25zdCBwcm9kVXJsID0gXCIvL3VucGtnLmNvbS97bmFtZX1Ae3ZlcnNpb259L3twYXRofVwiO1xuXG5mdW5jdGlvbiBnZXRDYW1lbENhc2VOYW1lKG5hbWU6IHN0cmluZykge1xuICByZXR1cm4gdXBwZXJGaXJzdChjYW1lbENhc2UobmFtZSkpO1xufVxuZnVuY3Rpb24gZ2V0VmVyc2lvbihuYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHBrZy5kZXBlbmRlbmNpZXNbbmFtZV0ucmVwbGFjZShcIl5cIiwgXCJcIik7XG59XG5mdW5jdGlvbiBnZXRQYXRoKG5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nID0gXCJcIikge1xuICBsZXQgc3RyID0gcHJvZFVybC5yZXBsYWNlKFwie25hbWV9XCIsIG5hbWUpLnJlcGxhY2UoXCJ7dmVyc2lvbn1cIiwgZ2V0VmVyc2lvbihuYW1lKSkucmVwbGFjZShcIntwYXRofVwiLCBwYXRoKTtcbiAgaWYgKHN0ci5lbmRzV2l0aChcIi9cIikpIHN0ciA9IHN0ci5zbGljZSgwLCAtMSk7XG4gIHJldHVybiBzdHI7XG59XG5mdW5jdGlvbiBnZXRDc3MoY3NzOiBib29sZWFuIHwgc3RyaW5nLCBwYXRoOiBzdHJpbmcpIHtcbiAgaWYgKCFjc3MpIHJldHVybjtcbiAgaWYgKGNzcyA9PT0gdHJ1ZSkgcmV0dXJuIHBhdGg7XG4gIGlmICh0eXBlb2YgY3NzID09PSBcInN0cmluZ1wiKSByZXR1cm4gY3NzO1xuICB0aHJvdyBuZXcgRXJyb3IoYFx1OEJGN1x1NEYyMFx1NTE2NXN0cmluZ1x1N0M3Qlx1NTc4Qlx1NzY4NGNzc1x1NTAzQ2ApO1xufVxuZnVuY3Rpb24gZ2V0Q29uZmlnSXRlbShpdGVtOiBzdHJpbmcgfCBDb21tb25PYmosIGVuZFBhdGg/OiBzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSBpdGVtID0geyBuYW1lOiBpdGVtIH07XG4gIGlmICghaXRlbS5uYW1lKSB0aHJvdyBuZXcgRXJyb3IoYFx1N0YzQVx1NUMxMW5hbWVcdTUzQzJcdTY1NzBgKTtcbiAgY29uc3QgeyBuYW1lLCB2YXI6IHZhck5hbWUgPSBnZXRDYW1lbENhc2VOYW1lKG5hbWUpLCBwYXRoID0gZ2V0UGF0aChuYW1lLCBlbmRQYXRoKSwgY3NzLCAuLi5yZXN0IH0gPSBpdGVtO1xuICByZXR1cm4geyBuYW1lLCB2YXI6IHZhck5hbWUsIHBhdGgsIGNzczogZ2V0Q3NzKGNzcywgcGF0aCksIC4uLnJlc3QgfTtcbn1cblxuLy8gY29uc3QgaXRlbSA9IHtcbi8vICAgbmFtZTogXCJcIiwgLy9cdTk3MDBcdTg5ODEgQ0ROIFx1NTJBMFx1OTAxRlx1NzY4NFx1NTMwNVx1NTQwRFx1NzlGMFx0c3RyaW5nXG4vLyAgIHZhcjogXCJcIiwgLy9cdTUxNjhcdTVDNDBcdTUyMDZcdTkxNERcdTdFRDlcdTZBMjFcdTU3NTdcdTc2ODRcdTUzRDhcdTkxQ0ZcdHN0cmluZ1xuLy8gICBwYXRoOiBcIlwiLCAvL1x1NjMwN1x1NUI5QSBDRE4gXHU0RTBBXHU3Njg0XHU1MkEwXHU4RjdEXHU4REVGXHU1Rjg0XHRzdHJpbmcgLyBzdHJpbmdbXVxuLy8gICBjc3M6IFwiXCIsIC8vXHU1M0VGXHU0RUU1XHU2MzA3XHU1QjlBXHU0RUNFIENETiBcdTU3MzBcdTU3NDBcdTRFMEFcdTUyQTBcdThGN0RcdTU5MUFcdTRFMkFcdTY4MzdcdTVGMEZcdTg4NjhcdHN0cmluZyAvIHN0cmluZ1tdXG4vLyAgIGFsaWFzOiBcIlwiLCAvL1x1NTQwRFx1NzlGMFx1NzY4NFx1NTIyQlx1NTQwRFx1RkYwQ1x1NEY4Qlx1NTk4Mlx1MjAxQ3JlYWN0LWRvbS9jbGllbnRcdTIwMURcdTY2MkZcdTIwMUNyZWFjdC1kb21cdTIwMURcdTc2ODRcdTUyMkJcdTU0MERcdHN0cmluZ1tdXG4vLyAgIHByb2RVcmw6IFwiXCIsIC8vXHU4OTg2XHU3NkQ2XHU1MTY4XHU1QzQwXHU3Njg0IHByb2RVcmxcdHN0cmluZyAvIHN0cmluZ1tdXG4vLyB9O1xuZXhwb3J0IGNvbnN0IGV4dGVybmFsTGlzdDogYW55W10gPSBbXG4gIC8qKiogXHU2ODQ2XHU2N0I2XHU1MTY4XHU1QkI2XHU2ODc2ICoqKi9cbiAgXCJ2dWVcIixcbiAgeyBuYW1lOiBcInZ1ZS1kZW1pXCIsIHZhcjogXCJWdWVEZW1pXCIsIHBhdGg6IFwiaHR0cHM6Ly91bnBrZy5jb20vdnVlLWRlbWlAMC4xNC4xMFwiIH0sXG4gIC8vIGdldENvbmZpZ0l0ZW0oeyBuYW1lOiBcInZ1ZS1kZW1pXCIsIHZhcjogXCJWdWVEZW1pXCIsIHBhdGg6IFwiaHR0cHM6Ly91bnBrZy5jb20vdnVlLWRlbWlAMC4xNC4xMFwiIH0pLCAvLyBodHRwczovL3VucGtnLmNvbS92dWUtZGVtaUAwLjE0LjEwXG4gIGdldENvbmZpZ0l0ZW0oXCJ2dWUtcm91dGVyXCIpLCAvLyB7IG5hbWU6IFwidnVlLXJvdXRlclwiLCB2YXI6IFwiVnVlUm91dGVyXCIsIHBhdGg6IGBodHRwczovL3VucGtnLmNvbS92dWUtcm91dGVyQDQuNC41YCB9LFxuICBnZXRDb25maWdJdGVtKHsgbmFtZTogXCJ2dWUtZGVtaVwiLCB2YXI6IFwiVnVlRGVtaVwiLCBwYXRoOiBcImh0dHBzOi8vdW5wa2cuY29tL3Z1ZS1kZW1pQDAuMTQuMTBcIiB9KSwgLy8gaHR0cHM6Ly91bnBrZy5jb20vdnVlLWRlbWlAMC4xNC4xMFxuICBnZXRDb25maWdJdGVtKFwicGluaWFcIiksXG4gIC8vIHVpXHU1RTkzXG4gIGdldENvbmZpZ0l0ZW0oXCJlbGVtZW50LXBsdXNcIiksXG4gIC8qKiogXHU1N0ZBXHU3ODQwXHU1RkM1XHU1OTA3ICoqKi9cbiAgLy8gZ2V0Q29uZmlnSXRlbShcInFzXCIpLFxuICBcImF4aW9zXCIsXG4gIFwiZGF5anNcIixcbiAgXCJsb2Rhc2hcIixcbiAgLy8gZ2V0Q29uZmlnSXRlbSh7IG5hbWU6IFwidnVlLWkxOG5cIiwgdmFyOiBcIkkxOE5cIiB9KSxcbiAgLyoqKiBcdTUyOUZcdTgwRkRcdTVGQzVcdTU5MDcgKioqL1xuICAvLyBnZXRDb25maWdJdGVtKHsgbmFtZTogXCJtZDVcIiwgdmFyOiBcIm1kNVwiIH0pLFxuICAvLyBnZXRDb25maWdJdGVtKFwibnByb2dyZXNzXCIpLFxuICBnZXRDb25maWdJdGVtKFwiZWNoYXJ0c1wiKSxcbiAgZ2V0Q29uZmlnSXRlbShcImVjaGFydHMtbGlxdWlkZmlsbFwiKSxcbiAgLy8gZ2V0Q29uZmlnSXRlbSh7IG5hbWU6IFwiZHJpdmVyLmpzXCIsIHZhcjogXCJkcml2ZXJcIiB9KSxcbiAgLy8gZ2V0Q29uZmlnSXRlbShcInNjcmVlbmZ1bGxcIiksXG4gIC8vIGdldENvbmZpZ0l0ZW0oXCJzb3J0YWJsZWpzXCIpLFxuICAvLyBnZXRDb25maWdJdGVtKFwicXJjb2RlXCIpLFxuICAvLyBnZXRDb25maWdJdGVtKFwidnVlZHJhZ2dhYmxlXCIpLFxuICBnZXRDb25maWdJdGVtKFwieGxzeFwiKSxcbiAgLy8gZ2V0Q29uZmlnSXRlbShcIkB3YW5nZWRpdG9yL2VkaXRvci1mb3ItdnVlXCIpLFxuICAvKioqIG1vY2tcdTc2RjhcdTUxNzMgKioqL1xuICAvLyBnZXRDb25maWdJdGVtKFwibW9ja2pzXCIpLFxuICAvLyBnZXRDb25maWdJdGVtKFwidml0ZS1wbHVnaW4tbW9ja1wiKSxcbiAgLyoqKiBkb2NzIFx1NzZGOFx1NTE3MyAqKiovXG4gIC8vIGdldENvbmZpZ0l0ZW0oXCJtYXJrZG93bi1pdFwiKSxcbiAgLy8gZ2V0Q29uZmlnSXRlbShcIm1hcmtkb3duLWl0LWNvbnRhaW5lclwiKSxcbl07XG5cbi8vIFx1NEVFNVx1NEUwQlx1NTMwNVx1NEUwRFx1NEYxQVx1OEZEQlx1ODg0Q1x1NjI1M1x1NTMwNVx1Njc4NFx1NUVGQVxuZXhwb3J0IGNvbnN0IGV4dGVybmFsID0gZXh0ZXJuYWxMaXN0Lm1hcChpdCA9PiB7XG4gIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIpIHJldHVybiBpdDtcbiAgcmV0dXJuIGl0Lm5hbWU7XG59KTtcblxuLyoqXG4gKiBAbGluayBucG1cdTUzMDVcdTU3MzBcdTU3NDBcdUZGMUFodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS92aXRlLXBsdWdpbi1jZG4taW1wb3J0XG4gKiBAZXhhbXBsZSBwcm9kVXJsOiAnLy91bnBrZy5jb20ve25hbWV9QHt2ZXJzaW9ufS97cGF0aH0nLCAnaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS97bmFtZX1Ae3ZlcnNpb259L3twYXRofSdcbiAqL1xuZXhwb3J0IGNvbnN0IGNkbkltcG9ydCA9IGNkbkltcG9ydFBsdWdpbih7XG4gIHByb2RVcmwsIC8vIFx1OUVEOFx1OEJBNFx1NTAzQ1x1NEUzQVx1RkYxQWh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0ve25hbWV9QHt2ZXJzaW9ufS97cGF0aH1cbiAgLy8gXHU3QzdCXHU1NzhCXHVGRjFBKE1vZHVsZSB8IE1vZHVsZVtdIHwgR2V0TW9kdWxlRnVuYyB8IEdldE1vZHVsZUZ1bmNbXSlbXVxuICAvLyBcdTk4ODRcdThCQkVcdTlFRDhcdThCQTRcdTUwM0NcdUZGMUFyZWFjdCwgcmVhY3QtZG9tLCByZWFjdC1yb3V0ZXItZG9tLCBhbnRkLCB2dWUsIHZ1ZTIsIHZ1ZS1yb3V0ZXIsIHZ1ZS1yb3V0ZXJAMywgbW9tZW50LCBkYXlqcywgYXhpb3MsIGxvZGFzaFxuICBtb2R1bGVzOiBleHRlcm5hbExpc3QsXG4gIGVuYWJsZUluRGV2TW9kZTogdHJ1ZSwgLy8gXHU0RTNBdHJ1ZVx1NjVGNlx1RkYwQ1x1NTNFRlx1NEVFNVx1OTAxQVx1OEZDNyBDRE4gXHU1QkZDXHU1MTY1XHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU0RTBCXHU5MDFBXHU1RTM4XHU5NzAwXHU4OTgxXHU5MDFBXHU4RkM3IE5QTSBcdTVCODlcdTg4QzVcdTc2ODRcdTRGOURcdThENTZcbiAgLy8gZ2VuZXJhdGVTY3JpcHRUYWcoKXt9LFxuICAvLyBnZW5lcmF0ZUNzc0xpbmtUYWcoKXt9LFxufSk7XG4iLCAie1xyXG4gIFwibmFtZVwiOiBcIlF1aWNrIEFkbWluIFZ1ZTNcIixcclxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcclxuICBcImF1dGhvclwiOiBcImZhbmxpY2h1YW5cIixcclxuICBcInZlcnNpb25cIjogXCIxLjAuMFwiLFxyXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxyXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxyXG4gIFwiY29udHJpYnV0ZXNcIjogW1xyXG4gICAgXCJ5b3VcIlxyXG4gIF0sXHJcbiAgXCJidWdzXCI6IFwiaHR0cHM6Ly9naXRlZS5jb20vZmFubGljaHVhbi9xdWlja19hZG1pbl92dWUzL2lzc3Vlc1wiLFxyXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGVlLmNvbS9mYW5saWNodWFuL3F1aWNrX2FkbWluX3Z1ZTMvIy9sb2dpblwiLFxyXG4gIFwiZGVzY3JpcHRpb25cIjogXCJcdTRFRTVcdTVGRUJcdUZGMDhcdThCQTFcdTdCOTdcdTY3M0FcdTYyNjdcdTg4NENcdTY1NDhcdTczODdcdTMwMDFcdTVGMDBcdTUzRDFcdTY1NDhcdTczODdcdUZGMDlcdTRFM0FcdTY4MzhcdTVGQzNcdTc2ODRcdTU0MEVcdTUzRjBcdTdCQTFcdTc0MDZcdTdDRkJcdTdFREZcdTVGMDBcdTUzRDFcdTZBMjFcdTY3N0ZcIixcclxuICBcImtleXdvcmRzXCI6IFtcclxuICAgIFwicXVpY2tcIixcclxuICAgIFwiYWRtaW5cIixcclxuICAgIFwidnVlM1wiLFxyXG4gICAgXCJFbGVtZW50UGx1c1wiLFxyXG4gICAgXCJUeXBlU2NyaXB0XCJcclxuICBdLFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcInNlcnZlXCI6IFwidml0ZVwiLFxyXG4gICAgXCJkZXZcIjogXCJ2aXRlIC0tbW9kZSBkZXZcIixcclxuICAgIFwidGVzdFwiOiBcInZpdGUgLS1tb2RlIHRlc3RcIixcclxuICAgIFwicHJlXCI6IFwidml0ZSAtLW1vZGUgcHJlXCIsXHJcbiAgICBcInByb2RcIjogXCJ2aXRlIC0tbW9kZSBwcm9kXCIsXHJcbiAgICBcImJ1aWxkXCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkXCIsXHJcbiAgICBcImJ1aWxkOmRldlwiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZCAtLW1vZGUgZGV2XCIsXHJcbiAgICBcImJ1aWxkOnRlc3RcIjogXCJ2dWUtdHNjICYmIHZpdGUgYnVpbGQgLS1tb2RlIHRlc3RcIixcclxuICAgIFwiYnVpbGQ6cHJlXCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkIC0tbW9kZSBwcmVcIixcclxuICAgIFwiYnVpbGQ6cHJvZFwiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZCAtLW1vZGUgcHJvZFwiLFxyXG4gICAgXCJidWlsZDpzaW1wbGVcIjogXCJ2aXRlIGJ1aWxkXCIsXHJcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIixcclxuICAgIFwibGludFwiOiBcImVzbGludCBzcmMgLS1leHQgLnRzLC50c3gsLnZ1ZSwuanMsLmpzeFwiLFxyXG4gICAgXCJsaW50OmZpeFwiOiBcImVzbGludCBzcmMgLS1maXggLS1leHQgLnRzLC50c3gsLnZ1ZSwuanMsLmpzeFwiLFxyXG4gICAgXCJsaW50OmxzXCI6IFwibHMtbGludFwiLFxyXG4gICAgXCJsaW50OnN0YWdlZFwiOiBcImxpbnQtc3RhZ2VkXCIsXHJcbiAgICBcImZvcm1hdFwiOiBcInByZXR0aWVyIC0td3JpdGUgXFxcIioqLyoue2pzLGpzeCx0cyx0c3gsY3NzLHZ1ZX1cXFwiXCIsXHJcbiAgICBcInByZXBhcmVcIjogXCJodXNreSBpbnN0YWxsXCIsXHJcbiAgICBcImFwaVwiOiBcIm5vZGUgLi9zY3JpcHRzL2FwaS9pbmRleC5qc1wiLFxyXG4gICAgXCJhcGlzeWFcIjogXCJub2RlIC4vc2NyaXB0cy9hcGkveWEuanNcIixcclxuICAgIFwiaW1nc1wiOiBcIm5vZGUgLi9zY3JpcHRzL2ltYWdlcy5qc1wiLFxyXG4gICAgXCJyZW1vdmVcIjogXCJub2RlIC4vc2NyaXB0cy9yZW1vdmUtZG9jLmpzXCIsXHJcbiAgICBcImRvY1wiOiBcIm5vZGUgLi9zY3JpcHRzL2RvYy9pbmRleC5qc1wiLFxyXG4gICAgXCJkb2NzOmRldlwiOiBcInZpdGVwcmVzcyBkZXZcIixcclxuICAgIFwiZG9jczpidWlsZFwiOiBcInZpdGVwcmVzcyBidWlsZFwiLFxyXG4gICAgXCJkb2NzOnByZXZpZXdcIjogXCJ2aXRlcHJlc3MgcHJldmlld1wiLFxyXG4gICAgXCJpbnRlcnZpZXc6ZGV2XCI6IFwidml0ZXByZXNzIGRldlwiLFxyXG4gICAgXCJpbnRlcnZpZXc6YnVpbGRcIjogXCJ2aXRlcHJlc3MgYnVpbGRcIixcclxuICAgIFwiaW50ZXJ2aWV3OnByZXZpZXdcIjogXCJ2aXRlcHJlc3MgcHJldmlld1wiLFxyXG4gICAgXCJwcmVpbnN0YWxsXCI6IFwibnB4IG9ubHktYWxsb3cgcG5wbVwiXHJcbiAgfSxcclxuICBcImRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcIkBlbGVtZW50LXBsdXMvaWNvbnMtdnVlXCI6IFwiXjIuMy4xXCIsXHJcbiAgICBcIkBtZGl0LXZ1ZS9zaGFyZWRcIjogXCJeMi4xLjNcIixcclxuICAgIFwiQHZ1ZXVzZS9jb3JlXCI6IFwiXjExLjMuMFwiLFxyXG4gICAgXCJAd2FuZ2VkaXRvci9lZGl0b3ItZm9yLXZ1ZVwiOiBcIl41LjEuMTJcIixcclxuICAgIFwiYXhpb3NcIjogXCJeMS4zLjJcIixcclxuICAgIFwiZGF5anNcIjogXCJeMS4xMS43XCIsXHJcbiAgICBcImRyaXZlci5qc1wiOiBcIl4xLjMuMVwiLFxyXG4gICAgXCJlY2hhcnRzXCI6IFwiXjUuNC4xXCIsXHJcbiAgICBcImVjaGFydHMtbGlxdWlkZmlsbFwiOiBcIl4zLjEuMFwiLFxyXG4gICAgXCJlbGVtZW50LXBsdXNcIjogXCJeMi44LjdcIixcclxuICAgIFwibG9kYXNoXCI6IFwiXjQuMTcuMjFcIixcclxuICAgIFwibWFya2Rvd24taXRcIjogXCJeMTQuMS4wXCIsXHJcbiAgICBcIm1hcmtkb3duLWl0LWNvbnRhaW5lclwiOiBcIl40LjAuMFwiLFxyXG4gICAgXCJtZDVcIjogXCJeMi4zLjBcIixcclxuICAgIFwibW9ja2pzXCI6IFwiXjEuMS4wXCIsXHJcbiAgICBcIm5wcm9ncmVzc1wiOiBcIl4wLjIuMFwiLFxyXG4gICAgXCJwYXRoLXRvLXJlZ2V4cFwiOiBcIl44LjIuMFwiLFxyXG4gICAgXCJwaW5pYVwiOiBcIl4yLjEuN1wiLFxyXG4gICAgXCJxcmNvZGVcIjogXCJeMS41LjRcIixcclxuICAgIFwicXNcIjogXCJeNi4xMS4xXCIsXHJcbiAgICBcInNjcmVlbmZ1bGxcIjogXCJeNi4wLjJcIixcclxuICAgIFwic29ydGFibGVqc1wiOiBcIl4xLjE1LjJcIixcclxuICAgIFwidml0ZS1wbHVnaW4tbW9ja1wiOiBcIl4yLjkuNlwiLFxyXG4gICAgXCJ2dWVcIjogXCJeMy41LjEyXCIsXHJcbiAgICBcInZ1ZS1pMThuXCI6IFwiXjkuMTMuMVwiLFxyXG4gICAgXCJ2dWUtcm91dGVyXCI6IFwiXjQuNC41XCIsXHJcbiAgICBcInZ1ZWRyYWdnYWJsZVwiOiBcIl40LjEuMFwiLFxyXG4gICAgXCJ4bHN4XCI6IFwiXjAuMTguNVwiXHJcbiAgfSxcclxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcIkBjb21taXRsaW50L2NsaVwiOiBcIl4xOS4zLjBcIixcclxuICAgIFwiQGNvbW1pdGxpbnQvY29uZmlnLWNvbnZlbnRpb25hbFwiOiBcIl4xOS4yLjJcIixcclxuICAgIFwiQGxzLWxpbnQvbHMtbGludFwiOiBcIl4yLjIuM1wiLFxyXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4xOC4xMy4wXCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjUuNTYuMFwiLFxyXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjUuNTYuMFwiLFxyXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNC4wLjBcIixcclxuICAgIFwiQHZ1ZS9jb21waWxlci1zZmNcIjogXCJeMy41LjEzXCIsXHJcbiAgICBcImVzbGludFwiOiBcIl43LjIzLjBcIixcclxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl44LjguMFwiLFxyXG4gICAgXCJlc2xpbnQtcGx1Z2luLXByZXR0aWVyXCI6IFwiXjQuMi4xXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tdnVlXCI6IFwiXjkuOS4wXCIsXHJcbiAgICBcImh1c2t5XCI6IFwiXjkuMC4xMVwiLFxyXG4gICAgXCJsaW50LXN0YWdlZFwiOiBcIl4xNS4yLjRcIixcclxuICAgIFwicHJldHRpZXJcIjogXCJeMi44LjZcIixcclxuICAgIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI6IFwiXjUuMTIuMFwiLFxyXG4gICAgXCJzYXNzXCI6IFwiXjEuODAuNlwiLFxyXG4gICAgXCJzdHlsZWxpbnRcIjogXCJeMTYuMS4wXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctaHRtbFwiOiBcIl4xLjEuMFwiLFxyXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXJlY2Vzcy1vcmRlclwiOiBcIl41LjAuMFwiLFxyXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXJlY29tbWVuZGVkLXNjc3NcIjogXCJeMTQuMC4wXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctcmVjb21tZW5kZWQtdnVlXCI6IFwiXjEuNS4wXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctc3RhbmRhcmRcIjogXCJeMzYuMC4wXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctc3RhbmRhcmQtc2Nzc1wiOiBcIl4xMy4wLjBcIixcclxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl40LjkuM1wiLFxyXG4gICAgXCJ1bnBsdWdpbi1hdXRvLWltcG9ydFwiOiBcIl4wLjE4LjNcIixcclxuICAgIFwidW5wbHVnaW4tZ2VuZXJhdGUtY29tcG9uZW50LW5hbWVcIjogXCJeMC4yLjBcIixcclxuICAgIFwidml0ZVwiOiBcIl41LjQuMTBcIixcclxuICAgIFwidml0ZS1wbHVnaW4tY2RuLWltcG9ydFwiOiBcIl4xLjAuMVwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiOiBcIl4wLjUuMVwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1lc2xpbnRcIjogXCJeMS44LjFcIixcclxuICAgIFwidml0ZS1wbHVnaW4taHRtbFwiOiBcIl4zLjIuMlwiLFxyXG4gICAgXCJ2aXRlcHJlc3NcIjogXCJeMS40LjVcIixcclxuICAgIFwidnVlLWRvY2dlbi1hcGlcIjogXCJeNC43OS4yXCIsXHJcbiAgICBcInZ1ZS10c2NcIjogXCJeMS4wLjI0XCJcclxuICB9LFxyXG4gIFwibGludC1zdGFnZWRcIjoge1xyXG4gICAgXCJzcmMvKiovKi57anMsanN4LHRzLHRzeCxqc29uLGNzcyxzY3NzLGxlc3MsbWQsdnVlfVwiOiBbXHJcbiAgICAgIFwiZXNsaW50IC0tZml4XCJcclxuICAgIF0sXHJcbiAgICBcIioue2NzcyxzY3NzLHNhc3N9XCI6IFwic3R5bGVsaW50IC0tZml4XCIsXHJcbiAgICBcIioqLypcIjogXCJwcmV0dGllciAtLXdyaXRlXCIsXHJcbiAgICBcInNyYy8qKlwiOiBcImxzLWxpbnRcIlxyXG4gIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFSLFNBQVMsV0FBQUEsZ0JBQWU7OztBQ0FFLFNBQVMsb0JBQTZCO0FBQ3JWLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7OztBQ0ZrVSxTQUFTLGtCQUFrQjtBQUs5VyxJQUFPLHFCQUFRLFdBQVc7QUFBQSxFQUN4QixNQUFNO0FBQUE7QUFBQSxFQUNOLE9BQU87QUFBQTtBQUFBLEVBRVAsVUFBVTtBQUFBO0FBQUEsRUFDVixVQUFVO0FBQUE7QUFBQSxFQUNWLFlBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUWQsQ0FBQzs7O0FDbkJvVixPQUFPLGdCQUFnQjtBQUU1VyxJQUFPLHNCQUFRLFdBQVc7QUFBQSxFQUN4QixTQUFTLENBQUMsT0FBTyxZQUFZO0FBQUEsRUFDN0IsS0FBSztBQUFBO0FBRVAsQ0FBQzs7O0FDTEQsU0FBUyxxQkFBcUI7QUFFOUIsSUFBTywwQkFBUSxjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFPM0IsVUFBVTtBQUFBO0FBQUEsRUFDVixjQUFjO0FBQUE7QUFBQSxFQUNk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QVUsa0JBQWtCLFFBQVE7QUFBQSxVQUMxQztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBU0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBUUEsT0FBTztBQUFBO0FBQUEsTUFFTCxRQUFRLFNBQVMsU0FBUyxRQUFRLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BS3RDLFdBQVcsQ0FBQztBQUFBLE1BQ1osc0JBQXNCO0FBQUE7QUFBQSxNQUN0Qix1QkFBdUI7QUFBQTtBQUFBO0FBQUEsTUFFdkIsUUFBUTtBQUFBO0FBQUEsTUFDUixlQUFlO0FBQUEsUUFDYixVQUFVO0FBQUEsVUFDUixjQUFjO0FBQUE7QUFBQSxVQUNkLGVBQWU7QUFBQSxRQUNqQjtBQUFBLE1BQ0Y7QUFBQTtBQUFBLE1BRUEsZUFBZTtBQUFBO0FBQUE7QUFBQSxRQUdiLE9BQU8sU0FBUyxZQUFZO0FBQzFCLGNBQUksVUFBVztBQU1mLHFCQUFXLE9BQU87QUFBQSxRQUNwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBT0EsUUFBUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFnQ1I7QUFBQSxNQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBU0Y7QUFBQSxFQUNGLENBQUM7QUFDSDs7O0FEck9BLElBQU9DLHVCQUFRLENBQUMsUUFBYTtBQUMzQixRQUFNLEVBQUUsTUFBTSxRQUFRLElBQUk7QUFFMUIsUUFBTSxhQUFhLG9CQUFjLEdBQUc7QUFFcEMsUUFBTSxNQUFNQyxTQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFDdkMsUUFBTSxTQUFTO0FBQUEsSUFDYixRQUFRLElBQUk7QUFBQSxJQUNaLFFBQVE7QUFBQSxFQUNWO0FBQ0EsYUFBVyxPQUFPLFFBQVEsWUFBWSxNQUFNO0FBRTVDLFNBQU87QUFDVDsiLAogICJuYW1lcyI6IFsibG9hZEVudiIsICJwYXRoIiwgInBhdGgiLCAicGF0aCIsICJ2aXRlX2NvbmZpZ19kZWZhdWx0IiwgImxvYWRFbnYiXQp9Cg==
