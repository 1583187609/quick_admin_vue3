// vite.config.ts
import { loadEnv as loadEnv2 } from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/vite/dist/node/index.js";

// vite-config/index.ts
import { defineConfig } from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";

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
    "interview:preview": "vitepress preview"
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
    "element-plus": "^2.9.3",
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
    "vite-plugin-top-level-await": "^1.4.4",
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
function getFileNameByPath(path2, char = "/") {
  const lastInd = path2.lastIndexOf(char);
  const lastDotInd = path2.lastIndexOf(".");
  const name = path2.substring(lastInd + 1, lastDotInd);
  if (name !== "index" && name !== "Index") return name;
  const secondInd = path2.lastIndexOf(char, lastInd - 1);
  let newName = path2.substring(secondInd + 1, lastInd) || name;
  if (newName.startsWith("_")) newName = `0${newName}`;
  return newName;
}
function getBrowserObject() {
  return {
    // "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    window: {},
    location: {
      host: ""
    },
    localStorage: {
      getItem: () => {
      },
      setItem: () => {
      },
      removeItem: () => {
      }
    },
    sessionStorage: {
      getItem: () => {
      },
      setItem: () => {
      },
      removeItem: () => {
      }
    },
    document: {
      cookie: "",
      body: {},
      querySelector: () => {
      }
    }
  };
}

// vite-config/plugins/visualizer.ts
import { visualizer } from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var visualizer_default = () => visualizer({
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
import AutoImport from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/unplugin-auto-import/dist/vite.js";
var auto_import_default = AutoImport({
  // dirs: ['src/stores']
  imports: ["vue", "vue-router"],
  dts: "types/auto-imports.d.ts",
  eslintrc: {
    enabled: true,
    filepath: "types/.eslintrc-auto-import.json",
    globalsPropValue: true
  }
});

// vite-config/plugins/vite-mock-serve.ts
import { viteMockServe } from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/vite-plugin-mock/dist/index.js";
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
import GenerateComponentName from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/unplugin-generate-component-name/dist/vite.js";
var dirs = ["views", "modules"];
var splitReg = new RegExp(dirs.map((it) => `/${it}/`).join("|"));
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
      include: dirs.map((it) => `src/${it}/**/index.vue`),
      genComponentName: (res) => {
        const { attrName, filePath, originalName, dirname } = res;
        if (attrName) return attrName;
        const name = filePath.split(splitReg)[1].slice(0, -10);
        return toCamelCase(name, true);
      }
    },
    //页面组件的命名规则：根据路径来命名(以非index.vue作为文件名的，且首字母小写)
    {
      exclude: dirs.map((it) => [`src/${it}/**/index.vue`, `src/${it}/**/_components/**/*.vue`]).flat(1),
      include: dirs.map((it) => `src/${it}/**/*.vue`),
      genComponentName: (res) => {
        const { attrName, filePath, originalName, dirname } = res;
        if (attrName) return attrName;
        const afterPath = filePath.split(splitReg)[1];
        const name = afterPath.slice(0, -4);
        return toCamelCase(name, true);
      }
    }
  ]
});

// vite-config/plugins/cdn-import.ts
import cdnImportPlugin from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/vite-plugin-cdn-import/dist/index.js";
import _ from "file:///E:/Quick-Admin/quick_admin_vue3/node_modules/lodash/lodash.js";
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
var cdnImport = () => cdnImportPlugin({
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
  const isBuild = process.argv[2] === "build";
  const isProd = mode === "production";
  return defineConfig({
    // assetsInclude: ["**/*.gltf"],
    define: {
      VITE_IS_DOCS: isVitepress,
      // 是否是docs文档，留给前端页面做判断用
      // __VUE_OPTIONS_API__: true, // 启用/禁用选项式 API 支持。禁用此功能将减小打包结果的体积，但如果第三方库依赖选项式 API，则可能影响兼容性
      // __VUE_PROD_DEVTOOLS__: !isProd, // 在生产环境中启用/禁用开发者工具支持。启用会在打包结果中包含更多代码，因此建议仅在调试时启用此功能
      // __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: !isProd, // 启用/禁用生产环境构建下激活 (hydration) 不匹配的详细警告。启用会在打包结果中包含更多代码，因此建议仅在调试时启用此功能
      ...isVitepress && isBuild ? getBrowserObject() : {}
    },
    logLevel: closeWarn ? "error" : void 0,
    // 默认为 'info'。调整控制台输出的级别。可选值：'info', 'warn', 'error', 'silent'
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
      ...isVitepress ? [] : [vue(), visualizer_default(), useCdnImport ? cdnImport() : void 0],
      auto_import_default,
      vite_mock_serve_default,
      generate_component_name_default
      // topLevelAwait,
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
          api: "modern-compiler",
          // 修改api调用方式
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
      /**
       * 默认 'modules'，指支持原生 ES 模块、原生 ESM 动态导入 和 import.meta 的浏览器，等价于：['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']
       * 可选：'esnext'（即假设有原生动态导入支持，并只执行最低限度的转译）、'es2020', 'es2015'、一个浏览器版本（例如：chrome58）或是多个目标组成的一个数组等
       */
      target: "es2020",
      // 顶层await 需要 es2022及以上才支持，低于这个的需要借助插件：vite-plugin-top-level-await
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
      // terserOptions: {
      //   compress: {
      //     drop_console: true, // 去掉console.log
      //     drop_debugger: true,
      //   },
      // },
      // https://rollupjs.org/guide/en/#big-list-of-options
      rollupOptions: {
        // // 以下文件不打包
        // external: isVitepress ? undefined : useCdnImport ? external : undefined, // 貌似使用 vite-plugin-cdn-import 时，可以省略不写 globals
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
          assetFileNames(info) {
            const { name, names } = info;
            const ext = path.extname(name).slice(1);
            console.log(info.name, name, ext, "info-------------------------");
            if (!names?.length) console.log("\u672A\u627E\u5230-----------", names);
            if (["css", "js", "ts", "vue"].includes(ext)) {
              const packages = Object.keys(package_default.dependencies).map((key) => key.split("/")[0]);
              const isNodeModule = packages.some((it) => name.startsWith(it));
              const subPath = isNodeModule ? "package/" : "";
              const _name = getFileNameByPath(name);
              return `assets/[ext]/${subPath}${_name}-[hash].[ext]`;
            }
            const imgExts = ["png", "jpg", "jpeg", "webp", "svg", "gif", "ico"];
            if (imgExts.includes(ext)) return "assets/imgs/[ext]/[name]-[hash].[ext]";
            const fontExts = ["otf", "ttf"];
            if (fontExts.includes(ext)) return "assets/font/[name]-[hash].[ext]";
            return "assets/[ext]/[name]-[hash].[ext]";
          }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS1jb25maWcvaW5kZXgudHMiLCAicGFja2FnZS5qc29uIiwgInZpdGUtY29uZmlnL3V0aWxzL2luZGV4LnRzIiwgInZpdGUtY29uZmlnL3BsdWdpbnMvdmlzdWFsaXplci50cyIsICJ2aXRlLWNvbmZpZy9wbHVnaW5zL2F1dG8taW1wb3J0LnRzIiwgInZpdGUtY29uZmlnL3BsdWdpbnMvdml0ZS1tb2NrLXNlcnZlLnRzIiwgInZpdGUtY29uZmlnL3BsdWdpbnMvZ2VuZXJhdGUtY29tcG9uZW50LW5hbWUudHMiLCAidml0ZS1jb25maWcvcGx1Z2lucy9jZG4taW1wb3J0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcUXVpY2stQWRtaW5cXFxccXVpY2tfYWRtaW5fdnVlM1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcUXVpY2stQWRtaW5cXFxccXVpY2tfYWRtaW5fdnVlM1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovUXVpY2stQWRtaW4vcXVpY2tfYWRtaW5fdnVlMy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgZ2V0Vml0ZUNvbmZpZywgeyBnZXRBcGlQcm94eSB9IGZyb20gXCIuL3ZpdGUtY29uZmlnXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCAoY2ZnOiBhbnkpID0+IHtcclxuICBjb25zdCB7IG1vZGUsIGNvbW1hbmQgfSA9IGNmZztcclxuICAvLyBjb25zdCBpc0RldiA9IG1vZGUgPT09IFwiZGV2XCI7XHJcbiAgY29uc3Qgdml0ZUNvbmZpZyA9IGdldFZpdGVDb25maWcoY2ZnKTtcclxuICAvLyBpZiAoaXNEZXYpIHtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpOyAvLyBcdThCQkVcdTdGNkVcdTdCMkNcdTRFMDlcdTRFMkFcdTUzQzJcdTY1NzBcdTRFM0EgJycgXHU2NzY1XHU1MkEwXHU4RjdEXHU2MjQwXHU2NzA5XHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHVGRjBDXHU4MDBDXHU0RTBEXHU3QkExXHU2NjJGXHU1NDI2XHU2NzA5IGBWSVRFX2AgXHU1MjREXHU3RjAwXHUzMDAyXHJcbiAgY29uc3QgYXBpTWFwID0ge1xyXG4gICAgXCIvYXBpXCI6IGVudi5WSVRFX0FQUF9BUElfQkFTRVVSTCxcclxuICAgIFwiL2dpdFwiOiBcImh0dHBzOi8vZmFubGljaHVhbi5naXRlZS5pb1wiLFxyXG4gIH07XHJcbiAgdml0ZUNvbmZpZy5zZXJ2ZXIucHJveHkgPSBnZXRBcGlQcm94eShhcGlNYXApO1xyXG4gIC8vIH1cclxuICByZXR1cm4gdml0ZUNvbmZpZztcclxufTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxRdWljay1BZG1pblxcXFxxdWlja19hZG1pbl92dWUzXFxcXHZpdGUtY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxRdWljay1BZG1pblxcXFxxdWlja19hZG1pbl92dWUzXFxcXHZpdGUtY29uZmlnXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9RdWljay1BZG1pbi9xdWlja19hZG1pbl92dWUzL3ZpdGUtY29uZmlnL2luZGV4LnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBwa2cgZnJvbSBcIi4uL3BhY2thZ2UuanNvblwiO1xuaW1wb3J0IHsgZ2V0RmlsZU5hbWVCeVBhdGgsIGdldEJyb3dzZXJPYmplY3QgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5pbXBvcnQgdmlzdWFsaXplciBmcm9tIFwiLi9wbHVnaW5zL3Zpc3VhbGl6ZXJcIjtcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCIuL3BsdWdpbnMvYXV0by1pbXBvcnRcIjtcbmltcG9ydCB2aXRlTW9ja1NlcnZlIGZyb20gXCIuL3BsdWdpbnMvdml0ZS1tb2NrLXNlcnZlXCI7XG4vLyBpbXBvcnQgdG9wTGV2ZWxBd2FpdCBmcm9tIFwiLi9wbHVnaW5zL3RvcC1sZXZlbC1hd2FpdFwiO1xuaW1wb3J0IGdlbmVyYXRlQ29tcG9uZW50TmFtZSBmcm9tIFwiLi9wbHVnaW5zL2dlbmVyYXRlLWNvbXBvbmVudC1uYW1lXCI7XG5cbmltcG9ydCB7IGNkbkltcG9ydCwgZXh0ZXJuYWwgfSBmcm9tIFwiLi9wbHVnaW5zL2Nkbi1pbXBvcnRcIjtcbi8vIGltcG9ydCBjcmVhdGVIdG1sUGx1Z2luIGZyb20gXCIuL3BsdWdpbnMvY3JlYXRlLWh0bWwtcGx1Z2luXCI7XG4vLyBpbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gXCIuL3BsdWdpbnMvdml0ZS1jb21wcmVzc2lvblwiO1xuLy8gaW1wb3J0IGltYWdlbWluUGx1Z2luIGZyb20gXCIuL3BsdWdpbnMvaW1hZ2VtaW4tcGx1Z2luXCI7XG5cbmV4cG9ydCAqIGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IHVzZUNkbkltcG9ydCA9IGZhbHNlOyAvLyBcdTRGN0ZcdTc1MjhjZG5cbmNvbnN0IGNsb3NlV2FybiA9IHRydWU7IC8vXHU1MTczXHU5NUVEXHU4QjY2XHU1NDRBXG4vLyBjb25zdCBvdXREaXJQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9vbmxpbmUtcHJldmlldy92dWVcIik7XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgKHsgbW9kZSwgY29tbWFuZCB9KSA9PiB7XG4gIC8vIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSk7IC8vIFx1OEJCRVx1N0Y2RVx1N0IyQ1x1NEUwOVx1NEUyQVx1NTNDMlx1NjU3MFx1NEUzQSAnJyBcdTY3NjVcdTUyQTBcdThGN0RcdTYyNDBcdTY3MDlcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdUZGMENcdTgwMENcdTRFMERcdTdCQTFcdTY2MkZcdTU0MjZcdTY3MDkgYFZJVEVfYCBcdTUyNERcdTdGMDBcdTMwMDJcbiAgY29uc3QgaXNWaXRlcHJlc3MgPSBwcm9jZXNzLmFyZ3ZbMV0uaW5jbHVkZXMoXCJ2aXRlcHJlc3NcIik7XG4gIGNvbnN0IGlzQnVpbGQgPSBwcm9jZXNzLmFyZ3ZbMl0gPT09IFwiYnVpbGRcIjtcbiAgY29uc3QgaXNQcm9kID0gbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCI7IC8vIFx1NTM5Rlx1Njc2NVx1NTNENlx1NTAzQ1x1ODMwM1x1NTZGNFx1NjYyRlx1RkYxQXByb2R1Y3Rpb24sIGRldmVsb3AsIFx1NEY0Nlx1OTE0RFx1N0Y2RVx1NEU4NmVudlx1NjU4N1x1NEVGNlx1NTQwRVx1RkYwQ1x1NjI0MFx1NEVFNVx1NjUzOVx1NTNEOFx1NEU4Nm1vZGVcdTc2ODRcdTUwM0NcbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XG4gICAgLy8gYXNzZXRzSW5jbHVkZTogW1wiKiovKi5nbHRmXCJdLFxuICAgIGRlZmluZToge1xuICAgICAgVklURV9JU19ET0NTOiBpc1ZpdGVwcmVzcywgLy8gXHU2NjJGXHU1NDI2XHU2NjJGZG9jc1x1NjU4N1x1Njg2M1x1RkYwQ1x1NzU1OVx1N0VEOVx1NTI0RFx1N0FFRlx1OTg3NVx1OTc2Mlx1NTA1QVx1NTIyNFx1NjVBRFx1NzUyOFxuICAgICAgLy8gX19WVUVfT1BUSU9OU19BUElfXzogdHJ1ZSwgLy8gXHU1NDJGXHU3NTI4L1x1Nzk4MVx1NzUyOFx1OTAwOVx1OTg3OVx1NUYwRiBBUEkgXHU2NTJGXHU2MzAxXHUzMDAyXHU3OTgxXHU3NTI4XHU2QjY0XHU1MjlGXHU4MEZEXHU1QzA2XHU1MUNGXHU1QzBGXHU2MjUzXHU1MzA1XHU3RUQzXHU2NzlDXHU3Njg0XHU0RjUzXHU3OUVGXHVGRjBDXHU0RjQ2XHU1OTgyXHU2NzlDXHU3QjJDXHU0RTA5XHU2NUI5XHU1RTkzXHU0RjlEXHU4RDU2XHU5MDA5XHU5ODc5XHU1RjBGIEFQSVx1RkYwQ1x1NTIxOVx1NTNFRlx1ODBGRFx1NUY3MVx1NTRDRFx1NTE3Q1x1NUJCOVx1NjAyN1xuICAgICAgLy8gX19WVUVfUFJPRF9ERVZUT09MU19fOiAhaXNQcm9kLCAvLyBcdTU3MjhcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTRFMkRcdTU0MkZcdTc1MjgvXHU3OTgxXHU3NTI4XHU1RjAwXHU1M0QxXHU4MDA1XHU1REU1XHU1MTc3XHU2NTJGXHU2MzAxXHUzMDAyXHU1NDJGXHU3NTI4XHU0RjFBXHU1NzI4XHU2MjUzXHU1MzA1XHU3RUQzXHU2NzlDXHU0RTJEXHU1MzA1XHU1NDJCXHU2NkY0XHU1OTFBXHU0RUUzXHU3ODAxXHVGRjBDXHU1NkUwXHU2QjY0XHU1RUZBXHU4QkFFXHU0RUM1XHU1NzI4XHU4QzAzXHU4QkQ1XHU2NUY2XHU1NDJGXHU3NTI4XHU2QjY0XHU1MjlGXHU4MEZEXG4gICAgICAvLyBfX1ZVRV9QUk9EX0hZRFJBVElPTl9NSVNNQVRDSF9ERVRBSUxTX186ICFpc1Byb2QsIC8vIFx1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjhcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTY3ODRcdTVFRkFcdTRFMEJcdTZGQzBcdTZEM0IgKGh5ZHJhdGlvbikgXHU0RTBEXHU1MzM5XHU5MTREXHU3Njg0XHU4QkU2XHU3RUM2XHU4QjY2XHU1NDRBXHUzMDAyXHU1NDJGXHU3NTI4XHU0RjFBXHU1NzI4XHU2MjUzXHU1MzA1XHU3RUQzXHU2NzlDXHU0RTJEXHU1MzA1XHU1NDJCXHU2NkY0XHU1OTFBXHU0RUUzXHU3ODAxXHVGRjBDXHU1NkUwXHU2QjY0XHU1RUZBXHU4QkFFXHU0RUM1XHU1NzI4XHU4QzAzXHU4QkQ1XHU2NUY2XHU1NDJGXHU3NTI4XHU2QjY0XHU1MjlGXHU4MEZEXG4gICAgICAuLi4oaXNWaXRlcHJlc3MgJiYgaXNCdWlsZCA/IGdldEJyb3dzZXJPYmplY3QoKSA6IHt9KSxcbiAgICB9LFxuICAgIGxvZ0xldmVsOiBjbG9zZVdhcm4gPyBcImVycm9yXCIgOiB1bmRlZmluZWQsIC8vIFx1OUVEOFx1OEJBNFx1NEUzQSAnaW5mbydcdTMwMDJcdThDMDNcdTY1NzRcdTYzQTdcdTUyMzZcdTUzRjBcdThGOTNcdTUxRkFcdTc2ODRcdTdFQTdcdTUyMkJcdTMwMDJcdTUzRUZcdTkwMDlcdTUwM0NcdUZGMUEnaW5mbycsICd3YXJuJywgJ2Vycm9yJywgJ3NpbGVudCdcbiAgICAvLyBlbnZQcmVmaXg6ICdWSVRFXycsIC8vIFx1NEVFNSBlbnZQcmVmaXggXHU1RjAwXHU1OTM0XHU3Njg0XHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHU0RjFBXHU5MDFBXHU4RkM3IGltcG9ydC5tZXRhLmVudiBcdTY2QjRcdTk3MzJcdTU3MjhcdTRGNjBcdTc2ODRcdTVCQTJcdTYyMzdcdTdBRUZcdTZFOTBcdTc4MDFcdTRFMkRcdTMwMDJcbiAgICAvLyBjbGVhclNjcmVlbjogdHJ1ZSwgLy8gXHU4QkJFXHU0RTNBIGZhbHNlIFx1NTNFRlx1NEVFNVx1OTA3Rlx1NTE0RCBWaXRlIFx1NkUwNVx1NUM0Rlx1ODAwQ1x1OTUxOVx1OEZDN1x1NTcyOFx1N0VDOFx1N0FFRlx1NEUyRFx1NjI1M1x1NTM3MFx1NjdEMFx1NEU5Qlx1NTE3M1x1OTUyRVx1NEZFMVx1NjA2RlxuICAgIC8vIFx1NTk4Mlx1OTBFOFx1N0Y3Mlx1NTcyOCBodHRwczovLzxVU0VSTkFNRT4uZ2l0aHViLmlvLyBcdTRFMEFcdUZGMENcdTUzRUZcdTRFRTVcdTc3MDFcdTc1NjVcdTRFMERcdThCQkVcdTdGNkVcdTMwMDIgXHU1OTgyXHU5MEU4XHU3RjcyXHU1NzI4IGh0dHBzOi8vZ2l0aHViLmNvbS88VVNFUk5BTUU+LzxSRVBPPlx1RkYwQ1x1NTIxOVx1OEJCRVx1N0Y2RSBiYXNlIFx1NEUzQSAnLzxSRVBPPi8nXHUzMDAyXG4gICAgYmFzZTogXCIuL1wiLCAvLyBcdTlFRDhcdThCQTRcdTRFM0EgJy8nXHUzMDAyXHU4ODY4XHU3OTNBXHU1RTk0XHU3NTI4XHU3QTBCXHU1RThGXHU3Njg0XHU2ODM5XHU3NkVFXHU1RjU1XHUzMDAyXHU1OTgyXHU2NzlDXHU0RjYwXHU3Njg0XHU1RTk0XHU3NTI4XHU3QTBCXHU1RThGXHU5MEU4XHU3RjcyXHU1NzI4XHU1N0RGXHU1NDBEXHU3Njg0XHU2ODM5XHU3NkVFXHU1RjU1XHU0RTBCXHVGRjBDXHU0RjYwXHU0RTBEXHU5NzAwXHU4OTgxXHU0RkVFXHU2NTM5IGJhc2UgXHU3Njg0XHU1MDNDXHUzMDAyXG4gICAgLy8gbW9kZTogXCJkZXZlbG9wbWVudFwiLCAvLyBcdTlFRDhcdThCQTRkZXZlbG9wbWVudFx1MzAwMlx1NTNFRlx1OTAwOVx1RkYxQWRldmVsb3BtZW50XHVGRjBDcHJvZHVjdGlvblx1MzAwMlx1NTcyOFx1OTE0RFx1N0Y2RVx1NEUyRFx1NjMwN1x1NjYwRVx1NUMwNlx1NEYxQVx1NjI4QSBzZXJ2ZSBcdTU0OEMgYnVpbGQgXHU2NUY2XHU3Njg0XHU2QTIxXHU1RjBGIFx1OTBGRCBcdTg5ODZcdTc2RDZcdTYzODlcdTMwMDJcdTRFNUZcdTUzRUZcdTRFRTVcdTkwMUFcdThGQzdcdTU0N0RcdTRFRTRcdTg4NEMgLS1tb2RlIFx1OTAwOVx1OTg3OVx1Njc2NVx1OTFDRFx1NTE5OVx1MzAwMlxuICAgIC8vIHJvb3Q6IFwiLi9zcmMvcGFnZXNcIiwgLy8gXHU5RUQ4XHU4QkE0XHVGRjFBcHJvY2Vzcy5jd2QoKVx1MzAwMlx1OTg3OVx1NzZFRVx1NjgzOVx1NzZFRVx1NUY1NVx1RkYwOGluZGV4Lmh0bWwgXHU2NTg3XHU0RUY2XHU2MjQwXHU1NzI4XHU3Njg0XHU0RjREXHU3RjZFXHVGRjA5XG4gICAgLy8gZW52RGlyOiAnLycsIC8vIFx1NzUyOFx1NEU4RVx1NTJBMFx1OEY3RCAuZW52IFx1NjU4N1x1NEVGNlx1NzY4NFx1NzZFRVx1NUY1NVxuICAgIC8vIHB1YmxpY0RpcjogJ3B1YmxpYycsIC8vIFx1OUVEOFx1OEJBNFx1NEUzQS9wdWJsaWNcdTMwMDJcdTVDMDYgcHVibGljRGlyIFx1OEJCRVx1NUI5QVx1NEUzQSBmYWxzZSBcdTUzRUZcdTRFRTVcdTUxNzNcdTk1RURcdTZCNjRcdTk4NzlcdTUyOUZcdTgwRkRcbiAgICAvLyBjYWNoZURpcjogXCJub2RlX21vZHVsZXMvLnZpdGVcIiwgLy8gXHU1QjU4XHU1MEE4XHU3RjEzXHU1QjU4XHU2NTg3XHU0RUY2XHU3Njg0XHU3NkVFXHU1RjU1XHUzMDAyXHU1M0VGXHU0RUU1XHU0RjdGXHU3NTI4IC0tZm9yY2UgXHU1NDdEXHU0RUU0XHU4ODRDXHU5MDA5XHU5ODc5XHU2MjE2XHU2MjRCXHU1MkE4XHU1MjIwXHU5NjY0XHU3NkVFXHU1RjU1XG4gICAgcGx1Z2luczogW1xuICAgICAgLi4uKGlzVml0ZXByZXNzID8gW10gOiBbdnVlKCksIHZpc3VhbGl6ZXIoKSwgdXNlQ2RuSW1wb3J0ID8gY2RuSW1wb3J0KCkgOiB1bmRlZmluZWRdKSxcbiAgICAgIEF1dG9JbXBvcnQsXG4gICAgICB2aXRlTW9ja1NlcnZlLFxuICAgICAgZ2VuZXJhdGVDb21wb25lbnROYW1lLFxuICAgICAgLy8gdG9wTGV2ZWxBd2FpdCxcbiAgICAgIC8vIGltYWdlbWluUGx1Z2luLFxuICAgICAgLy8gY3JlYXRlSHRtbFBsdWdpbixcbiAgICAgIC8vIHZpdGVDb21wcmVzc2lvbixcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIC8vIGV4dGVuc2lvbnM6IFtcIi5tanNcIiwgXCIuanNcIiwgXCIudHNcIiwgXCIuanN4XCIsIFwiLnRzeFwiLCBcIi5qc29uXCJdLFxuICAgICAgZXh0ZW5zaW9uczogW1wiLm1qc1wiLCBcIi5qc1wiLCBcIi5tdHNcIiwgXCIudHNcIiwgXCIuanN4XCIsIFwiLnRzeFwiLCBcIi5qc29uXCIsIFwiLnN2Z1wiXSxcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIC8vIFx1NjUzRVx1NTcyOFx1NjgzOVx1NzZFRVx1NUY1NVx1NEUwQlx1NjVGNlxuICAgICAgICAvLyBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiksXG4gICAgICAgIC8vIFwiI1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIlwiKSxcbiAgICAgICAgLy8gbW9jazogcGF0aC5qb2luKF9fZGlybmFtZSwgXCJtb2NrXCIpLFxuICAgICAgICAvLyBcdTY1M0VcdTU3MjhcdTY4MzlcdTc2RUVcdTVGNTVcdTRFMEJcdTc2ODQgcGx1Z2lucy9pbmRleC50c1x1NjVGNlxuICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi9zcmNcIiksXG4gICAgICAgIFwiI1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uXCIpLFxuICAgICAgICBtb2NrOiBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uL21vY2tcIiksXG4gICAgICB9LFxuICAgICAgLy8gZGVkdXBlOiBbXSwgLy8gXHU1OTgyXHU2NzlDXHU0RjYwXHU1NzI4XHU0RjYwXHU3Njg0XHU1RTk0XHU3NTI4XHU3QTBCXHU1RThGXHU0RTJEXHU2NzA5XHU3NkY4XHU1NDBDXHU0RjlEXHU4RDU2XHU3Njg0XHU1MjZGXHU2NzJDXHVGRjA4XHU2QkQ0XHU1OTgyIG1vbm9yZXBvc1x1RkYwOVx1RkYwQ1x1OEJGN1x1NEY3Rlx1NzUyOFx1NkI2NFx1OTAwOVx1OTg3OVx1NUYzQVx1NTIzNiBWaXRlIFx1NTlDQlx1N0VDOFx1NUMwNlx1NTIxN1x1NTFGQVx1NzY4NFx1NEY5RFx1OEQ1Nlx1OTg3OVx1ODlFM1x1Njc5MFx1NEUzQVx1NTQwQ1x1NEUwMFx1NTI2Rlx1NjcyQ1x1RkYwOFx1NEVDRVx1OTg3OVx1NzZFRVx1NjgzOVx1NzZFRVx1NUY1NVx1RkYwOVxuICAgICAgLy8gY29uZGl0aW9uczogW10sXG4gICAgICAvLyBtYWluRmllbGRzOiBbXSxcbiAgICAgIC8vIHByZXNlcnZlU3ltbGlua3M6IFtdLFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICAvLyBtb2R1bGVzOiB7fSxcbiAgICAgIC8vIHBvc3Rjc3M6IHt9LFxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgLy8gXHU2NjgyXHU2NUY2XHU2RDg4XHU5NjY0XHU4QjY2XHU1NDRBXHVGRjFBRGVwcmVjYXRpb24gV2FybmluZzogVGhlIGxlZ2FjeSBKUyBBUEkgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIERhcnQgU2FzcyAyLjAuMC4gTW9yZSBpbmZvOiBodHRwczovL3Nhc3MtbGFuZy5jb20vZC9sZWdhY3ktanMtYXBpXG4gICAgICAgICAgYXBpOiBcIm1vZGVybi1jb21waWxlclwiLCAvLyBcdTRGRUVcdTY1MzlhcGlcdThDMDNcdTc1MjhcdTY1QjlcdTVGMEZcbiAgICAgICAgICAvLyBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCJAL2Fzc2V0cy9zdHlsZXMvX3Zhci5zY3NzXCI7YCxcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCJAL2Fzc2V0cy9zdHlsZXMvX3Zhci5zY3NzXCIgYXMgKjtgLFxuICAgICAgICB9LFxuICAgICAgICAvLyBsZXNzOiB7XG4gICAgICAgIC8vICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXG4gICAgICAgIC8vICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9hc3NldHMvc3R5bGVzL192YXIuc2Nzc1wiO2AsXG4gICAgICAgIC8vIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgLy8ganNvbjoge1xuICAgIC8vICAgLy8gbmFtZWRFeHBvcnRzOiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdTY1MkZcdTYzMDFcdTRFQ0UgLmpzb24gXHU2NTg3XHU0RUY2XHU0RTJEXHU4RkRCXHU4ODRDXHU2MzA5XHU1NDBEXHU1QkZDXHU1MTY1XHUzMDAyXG4gICAgLy8gICAvLyBzdHJpbmdpZnk6IGZhbHNlLCAvLyBcdTgyRTVcdThCQkVcdTdGNkVcdTRFM0EgdHJ1ZVx1RkYwQ1x1NUJGQ1x1NTE2NVx1NzY4NCBKU09OIFx1NEYxQVx1ODhBQlx1OEY2Q1x1NjM2Mlx1NEUzQSBleHBvcnQgZGVmYXVsdCBKU09OLnBhcnNlKFwiLi4uXCIpXG4gICAgLy8gfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIG9wZW46ICFpc1ZpdGVwcmVzcyxcbiAgICAgIHBvcnQ6IGlzVml0ZXByZXNzID8gNTA5MCA6IDUxODAsIC8vXHU1NDJGXHU1MkE4XHU3QUVGXHU1M0UzXG4gICAgICAvLyBob3N0OiBcIjEyNy4wLjAuMVwiLCAvLyAgXHU1OTgyXHU2NzlDXHU1QzA2XHU2QjY0XHU4QkJFXHU3RjZFXHU0RTNBIDAuMC4wLjAgXHU1QzA2XHU3NkQxXHU1NDJDXHU2MjQwXHU2NzA5XHU1NzMwXHU1NzQwXHVGRjBDXHU1MzA1XHU2MkVDXHU1QzQwXHU1N0RGXHU3RjUxXHU1NDhDXHU1MTZDXHU3RjUxXHU1NzMwXHU1NzQwXHUzMDAyXG4gICAgICAvLyBcdTc5ODFcdTc1MjhcdTYyMTZcdTkxNERcdTdGNkUgSE1SIFx1OEZERVx1NjNBNVx1RkYwOFx1NzUyOFx1NEU4RSBITVIgd2Vic29ja2V0IFx1NUZDNVx1OTg3Qlx1NEY3Rlx1NzUyOFx1NEUwRFx1NTQwQ1x1NzY4NCBodHRwIFx1NjcwRFx1NTJBMVx1NTY2OFx1NTczMFx1NTc0MFx1NzY4NFx1NjBDNVx1NTFCNVx1RkYwOVx1MzAwMlx1OEJCRVx1N0Y2RSBzZXJ2ZXIuaG1yLm92ZXJsYXkgXHU0RTNBIGZhbHNlIFx1NTNFRlx1NEVFNVx1Nzk4MVx1NzUyOFx1NUYwMFx1NTNEMVx1NjcwRFx1NTJBMVx1NTY2OFx1OTUxOVx1OEJFRlx1NzY4NFx1NUM0Rlx1ODUzRFx1MzAwMlxuICAgICAgLy8gaG1yOntcbiAgICAgIC8vICAgcHJvdG9jb2w/OiBzdHJpbmcsXG4gICAgICAvLyAgIGhvc3Q/OiBzdHJpbmcsXG4gICAgICAvLyAgIHBvcnQ/OiBudW1iZXIsXG4gICAgICAvLyAgIHBhdGg/OiBzdHJpbmcsXG4gICAgICAvLyAgIHRpbWVvdXQ/OiBudW1iZXIsXG4gICAgICAvLyAgIG92ZXJsYXk/OiBib29sZWFuLFxuICAgICAgLy8gICBjbGllbnRQb3J0PzogbnVtYmVyLFxuICAgICAgLy8gICBzZXJ2ZXI/OiBTZXJ2ZXJcbiAgICAgIC8vIH0sXG4gICAgICAvLyBzdHJpY3RQb3J0OiBmYWxzZSwgLy8gXHU4QkJFXHU0RTNBIHRydWUgXHU2NUY2XHU4MkU1XHU3QUVGXHU1M0UzXHU1REYyXHU4OEFCXHU1MzYwXHU3NTI4XHU1MjE5XHU0RjFBXHU3NkY0XHU2M0E1XHU5MDAwXHU1MUZBXHVGRjBDXHU4MDBDXHU0RTBEXHU2NjJGXHU1QzFEXHU4QkQ1XHU0RTBCXHU0RTAwXHU0RTJBXHU1M0VGXHU3NTI4XHU3QUVGXHU1M0UzXHUzMDAyXG4gICAgICAvLyBodHRwczogZmFsc2UsIC8vIFx1NUY1MyBzZXJ2ZXIucHJveHkgXHU5MDA5XHU5ODc5IFx1NEU1Rlx1ODhBQlx1NEY3Rlx1NzUyOFx1NjVGNlx1RkYwQ1x1NUMwNlx1NEYxQVx1NEVDNVx1NEY3Rlx1NzUyOCBUTFNcbiAgICAgIC8vIFx1OEJCRVx1N0Y2RVx1NEVFM1x1NzQwNlxuICAgICAgLy8gcHJveHk6IHtcbiAgICAgIC8vICAgXCIvYXBpXCI6IHtcbiAgICAgIC8vICAgICB0YXJnZXQ6IGVudi5WSVRFX0FQUF9BUElfQkFTRVVSTCwgLy9odHRwOi8vMTI3LjAuMC4xOjU1MDBcbiAgICAgIC8vICAgICAvLyB0YXJnZXQ6IFwiaHR0cDovLzEyNy4wLjAuMTo1MTgwXCIsXG4gICAgICAvLyAgICAgLy8gdGFyZ2V0OiBcImh0dHBzOi8vZmFubGljaHVhbi5naXRlZS5pb1wiLFxuICAgICAgLy8gICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSwgLy9cdTY2MkZcdTU0MjZcdThERThcdTU3REZcbiAgICAgIC8vICAgICB3czogdHJ1ZSwgLy9cdTY2MkZcdTU0MjZcdTRFRTNcdTc0MDYgd2Vic29ja2V0c1xuICAgICAgLy8gICAgIHNlY3VyZTogZmFsc2UsIC8vXHU2NjJGXHU1NDI2aHR0cHNcdTYzQTVcdTUzRTNcbiAgICAgIC8vICAgICByZXdyaXRlOiAocGF0aDogc3RyaW5nKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCBcIlwiKSxcbiAgICAgIC8vICAgICBieXBhc3MocmVxLCByZXMsIG9wdGlvbnM6IGFueSkge1xuICAgICAgLy8gICAgICAgY29uc3QgcHJveHlVUkwgPSBvcHRpb25zLnRhcmdldCArIG9wdGlvbnMucmV3cml0ZShyZXEudXJsKTtcbiAgICAgIC8vICAgICAgIHJlcy5zZXRIZWFkZXIoXCJ4LXJlcS1wcm94eVVSTFwiLCBwcm94eVVSTCk7IC8vIFx1OEJCRVx1N0Y2RVx1NTRDRFx1NUU5NFx1NTkzNFx1NTNFRlx1NEVFNVx1NTcyOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1NEUyRFx1NzcwQlx1NTIzMFx1NUI5RVx1OTY0NVx1OEJGN1x1NkM0Mlx1NTczMFx1NTc0MFxuICAgICAgLy8gICAgIH0sXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyB9LFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgXCIvYXBpXCI6IHtcbiAgICAgICAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDo3MDAzXCIsIC8vaHR0cDovLzEyNy4wLjAuMTo1NTAwXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLCAvL1x1NjYyRlx1NTQyNlx1OERFOFx1NTdERlxuICAgICAgICAgIHdzOiB0cnVlLCAvL1x1NjYyRlx1NTQyNlx1NEVFM1x1NzQwNiB3ZWJzb2NrZXRzXG4gICAgICAgICAgc2VjdXJlOiBmYWxzZSwgLy9cdTY2MkZcdTU0MjZodHRwc1x1NjNBNVx1NTNFM1xuICAgICAgICAgIHJld3JpdGU6IChwYXRoOiBzdHJpbmcpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sIFwiXCIpLFxuICAgICAgICAgIGJ5cGFzcyhyZXEsIHJlcywgb3B0aW9uczogYW55KSB7XG4gICAgICAgICAgICBjb25zdCBwcm94eVVSTCA9IG9wdGlvbnMudGFyZ2V0ICsgb3B0aW9ucy5yZXdyaXRlKHJlcS51cmwpO1xuICAgICAgICAgICAgcmVzLnNldEhlYWRlcihcIngtcmVxLXByb3h5VVJMXCIsIHByb3h5VVJMKTsgLy8gXHU4QkJFXHU3RjZFXHU1NENEXHU1RTk0XHU1OTM0XHU1M0VGXHU0RUU1XHU1NzI4XHU2RDRGXHU4OUM4XHU1NjY4XHU0RTJEXHU3NzBCXHU1MjMwXHU1QjlFXHU5NjQ1XHU4QkY3XHU2QzQyXHU1NzMwXHU1NzQwXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAvLyBjb3JzOiB0cnVlLCAvLyBcdTRFM0FcdTVGMDBcdTUzRDFcdTY3MERcdTUyQTFcdTU2NjhcdTkxNERcdTdGNkUgQ09SU1x1MzAwMlx1OUVEOFx1OEJBNFx1NTQyRlx1NzUyOFx1NUU3Nlx1NTE0MVx1OEJCOFx1NEVGQlx1NEY1NVx1NkU5MFx1RkYwQ1x1NEYyMFx1OTAxMlx1NEUwMFx1NEUyQSBcdTkwMDlcdTk4NzlcdTVCRjlcdThDNjEgXHU2NzY1XHU4QzAzXHU2NTc0XHU4ODRDXHU0RTNBXHU2MjE2XHU4QkJFXHU0RTNBIGZhbHNlIFx1ODg2OFx1NzkzQVx1Nzk4MVx1NzUyOFx1MzAwMlxuICAgICAgLy8gZm9yY2U6IHRydWUsIC8vIFx1OEJCRVx1N0Y2RVx1NEUzQSB0cnVlIFx1NUYzQVx1NTIzNlx1NEY3Rlx1NEY5RFx1OEQ1Nlx1OTg4NFx1Njc4NFx1NUVGQVx1MzAwMlxuICAgICAgLy8gd2F0Y2g6IHtcbiAgICAgIC8vICAgaWdub3JlZDogW1wiISoqL25vZGVfbW9kdWxlcy95b3VyLXBhY2thZ2UtbmFtZS8qKlwiXSxcbiAgICAgIC8vIH0sXG4gICAgICAvLyBtaWRkbGV3YXJlTW9kZTogXCJzc3JcIiwgLy8gXHU1M0VGXHU5MDA5XHVGRjFBJ3NzcicsICdodG1sJyxcbiAgICAgIC8vIGZzOiB7fSxcbiAgICAgIC8vIG9yaWdpbjogJ2h0dHA6Ly8xMjcuMC4wLjE6ODA4MC8nLFxuICAgIH0sXG4gICAgLy8gXHU4QkJFXHU3RjZFXHU0RTNBIGZhbHNlIFx1Njc2NVx1Nzk4MVx1NzUyOCBFU2J1aWxkIFx1OEY2Q1x1NjM2Mlx1MzAwMlxuICAgIC8vIGVzYnVpbGQ6IHtcbiAgICAvLyAgIGpzeEZhY3Rvcnk6IFwiaFwiLFxuICAgIC8vICAganN4RnJhZ21lbnQ6IFwiRnJhZ21lbnRcIixcbiAgICAvLyAgIGpzeEluamVjdDogYGltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdgLCAvLyBcdTkwMUFcdThGQzcgZXNidWlsZC5qc3hJbmplY3QgXHU2NzY1XHU4MUVBXHU1MkE4XHU0RTNBXHU2QkNGXHU0RTAwXHU0RTJBXHU4OEFCIEVTYnVpbGQgXHU4RjZDXHU2MzYyXHU3Njg0XHU2NTg3XHU0RUY2XHU2Q0U4XHU1MTY1IEpTWCBoZWxwZXJcbiAgICAvLyB9LFxuICAgIC8vdml0ZVx1Njc4NFx1NUVGQVx1NjVGNlx1OUVEOFx1OEJBNFx1NEY3Rlx1NzUyOEVzYnVpbGRcdUZGMENcdTYyNTNcdTUzMDVcdTkwMUZcdTVFQTZcdTY2MkZcdTUxNzZcdTRFRDZcdTYyNTNcdTUzMDVcdTVERTVcdTUxNzdcdTc2ODRcdTUzNDFcdTUxRTBcdTUwMERcdUZGMENcdTRGNDZcdTY2MkZcdTdGM0FcdTcwQjlcdTRFNUZcdTVGODhcdTY2MEVcdTY2M0VcdUZGMENcdTRFMERcdTUxNzdcdTU5MDdcdTY0Q0RcdTRGNUNBU1RcdTc2ODRcdTgwRkRcdTUyOUJcdUZGMENcdTYyNDBcdTRFRTVcdTk3MDBcdTg5ODFcdTkwMUFcdThGQzd0ZXJzZXJcdTUzQkJcdTk2NjRjb25zb2xlLmxvZ1xuICAgIGJ1aWxkOiB7XG4gICAgICAvKipcbiAgICAgICAqIFx1OUVEOFx1OEJBNCAnbW9kdWxlcydcdUZGMENcdTYzMDdcdTY1MkZcdTYzMDFcdTUzOUZcdTc1MUYgRVMgXHU2QTIxXHU1NzU3XHUzMDAxXHU1MzlGXHU3NTFGIEVTTSBcdTUyQThcdTYwMDFcdTVCRkNcdTUxNjUgXHU1NDhDIGltcG9ydC5tZXRhIFx1NzY4NFx1NkQ0Rlx1ODlDOFx1NTY2OFx1RkYwQ1x1N0I0OVx1NEVGN1x1NEU4RVx1RkYxQVsnZXMyMDIwJywgJ2VkZ2U4OCcsICdmaXJlZm94NzgnLCAnY2hyb21lODcnLCAnc2FmYXJpMTQnXVxuICAgICAgICogXHU1M0VGXHU5MDA5XHVGRjFBJ2VzbmV4dCdcdUZGMDhcdTUzNzNcdTUwNDdcdThCQkVcdTY3MDlcdTUzOUZcdTc1MUZcdTUyQThcdTYwMDFcdTVCRkNcdTUxNjVcdTY1MkZcdTYzMDFcdUZGMENcdTVFNzZcdTUzRUFcdTYyNjdcdTg4NENcdTY3MDBcdTRGNEVcdTk2NTBcdTVFQTZcdTc2ODRcdThGNkNcdThCRDFcdUZGMDlcdTMwMDEnZXMyMDIwJywgJ2VzMjAxNSdcdTMwMDFcdTRFMDBcdTRFMkFcdTZENEZcdTg5QzhcdTU2NjhcdTcyNDhcdTY3MkNcdUZGMDhcdTRGOEJcdTU5ODJcdUZGMUFjaHJvbWU1OFx1RkYwOVx1NjIxNlx1NjYyRlx1NTkxQVx1NEUyQVx1NzZFRVx1NjgwN1x1N0VDNFx1NjIxMFx1NzY4NFx1NEUwMFx1NEUyQVx1NjU3MFx1N0VDNFx1N0I0OVxuICAgICAgICovXG4gICAgICB0YXJnZXQ6IFwiZXMyMDIwXCIsIC8vIFx1OTg3Nlx1NUM0MmF3YWl0IFx1OTcwMFx1ODk4MSBlczIwMjJcdTUzQ0FcdTRFRTVcdTRFMEFcdTYyNERcdTY1MkZcdTYzMDFcdUZGMENcdTRGNEVcdTRFOEVcdThGRDlcdTRFMkFcdTc2ODRcdTk3MDBcdTg5ODFcdTUwMUZcdTUyQTlcdTYzRDJcdTRFRjZcdUZGMUF2aXRlLXBsdWdpbi10b3AtbGV2ZWwtYXdhaXRcbiAgICAgIC8vIG91dERpcjogb3V0RGlyUGF0aCxcbiAgICAgIG91dERpcjogaXNQcm9kID8gXCJkaXN0XCIgOiBgZGlzdC0ke21vZGV9YCxcbiAgICAgIC8vIGFzc2V0c0RpcjogXCJhc3NldHNcIiwgLy8gXHU2MzA3XHU1QjlBXHU3NTFGXHU2MjEwXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU3Njg0XHU1QjU4XHU2NTNFXHU4REVGXHU1Rjg0XHVGRjA4XHU3NkY4XHU1QkY5XHU0RThFIGJ1aWxkLm91dERpclx1RkYwOVx1MzAwMlxuICAgICAgLy8gbWFuaWZlc3Q6IHRydWUsIC8vIFx1NTcyOCBvdXREaXIgXHU0RTJEXHU3NTFGXHU2MjEwIG1hbmlmZXN0Lmpzb25cbiAgICAgIC8vIGFzc2V0c0lubGluZUxpbWl0OiA0MDk2LCAvLyBcdTlFRDhcdThCQTQ0MDk2XHVGRjBDXHU1MzczNGtiXG4gICAgICAvLyBjc3NDb2RlU3BsaXQ6IGZhbHNlLCAvLyBcdTlFRDhcdThCQTRcdTRFM0F0cnVlXHVGRjBDXHU0RTNBdHJ1ZVx1NjVGNlx1RkYwQ1x1NTcyOFx1NUYwMlx1NkI2NSBjaHVuayBcdTRFMkRcdTVCRkNcdTUxNjVcdTc2ODQgQ1NTIFx1NUMwNlx1NTE4NVx1ODA1NFx1NTIzMFx1NUYwMlx1NkI2NSBjaHVuayBcdTY3MkNcdThFQUJcdUZGMENcdTVFNzZcdTU3MjhcdTUxNzZcdTg4QUJcdTUyQTBcdThGN0RcdTY1RjZcdTRFMDBcdTVFNzZcdTgzQjdcdTUzRDZcdTMwMDJcdTRFM0FmYWxzZVx1NjVGNlx1RkYwQ1x1NEYxQVx1Nzk4MVx1NzUyOCBDU1MgXHU0RUUzXHU3ODAxXHU1MjA2XHU1MjcyXHVGRjA4XHU1QzA2XHU2MjQwXHU2NzA5XHU3Njg0IENTUyBcdTYyQkRcdTUzRDZcdTUyMzBcdTRFMDBcdTRFMkFcdTY1ODdcdTRFRjZcdTRFMkRcdUZGMDlcbiAgICAgIHNvdXJjZW1hcDogIWlzUHJvZCxcbiAgICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSwgLy8gXHU1NDJGXHU3NTI4L1x1Nzk4MVx1NzUyOCBnemlwIFx1NTM4Qlx1N0YyOVx1NTkyN1x1NUMwRlx1NjJBNVx1NTQ0QVx1MzAwMlx1NTM4Qlx1N0YyOVx1NTkyN1x1NTc4Qlx1OEY5M1x1NTFGQVx1NjU4N1x1NEVGNlx1NTNFRlx1ODBGRFx1NEYxQVx1NUY4OFx1NjE2Mlx1RkYwQ1x1NTZFMFx1NkI2NFx1Nzk4MVx1NzUyOFx1OEJFNVx1NTI5Rlx1ODBGRFx1NTNFRlx1ODBGRFx1NEYxQVx1NjNEMFx1OUFEOFx1NTkyN1x1NTc4Qlx1OTg3OVx1NzZFRVx1NzY4NFx1Njc4NFx1NUVGQVx1NjAyN1x1ODBGRFx1MzAwMlxuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLCAvLyBcdTlFRDhcdThCQTQ1MDBcdUZGMENcdTYyNTNcdTUzMDVcdTY3MDBcdTU5MjdcdTRGNTNcdTc5RUZcdThCNjZcdTU0NEFcbiAgICAgIC8vIFx1NTM4Qlx1N0YyOVx1NTQ4Q1x1NkRGN1x1NkRDNlx1NEVFM1x1NzgwMVx1RkYxQVx1NEY3Rlx1NzUyOCBWaXRlIFx1NzY4NFx1NTE4NVx1N0Y2RVx1NTM4Qlx1N0YyOVx1NURFNVx1NTE3N1x1RkYwOFx1NEY4Qlx1NTk4MiBUZXJzZXJcdUZGMDlcdTVCRjlcdTYyNTNcdTUzMDVcdTU0MEVcdTc2ODRcdTRFRTNcdTc4MDFcdThGREJcdTg4NENcdTUzOEJcdTdGMjlcdTU0OENcdTZERjdcdTZEQzZcdUZGMENcdTRFRTVcdTUxQ0ZcdTVDMEZcdTY1ODdcdTRFRjZcdTU5MjdcdTVDMEZcdTVFNzZcdTYzRDBcdTlBRDhcdTUyQTBcdThGN0RcdTkwMUZcdTVFQTZcdTMwMDJcdTUzRUZcdTRFRTVcdTkwMUFcdThGQzdcdTU3Mjggdml0ZS5jb25maWcuanMgXHU0RTJEXHU4QkJFXHU3RjZFIGJ1aWxkLm1pbmlmeSBcdTkwMDlcdTk4NzlcdTY3NjVcdTU0MkZcdTc1MjhcdTUzOEJcdTdGMjlcbiAgICAgIG1pbmlmeTogXCJ0ZXJzZXJcIiwgLy8gXHU5RUQ4XHU4QkE0XHVGRjFBZXNidWlsZFx1MzAwMlx1NTNFRlx1OTAwOVx1RkYxQWJvb2xlYW4gfCAndGVyc2VyJyB8ICdlc2J1aWxkXG4gICAgICAvLyB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICAvLyAgIGNvbXByZXNzOiB7XG4gICAgICAvLyAgICAgZHJvcF9jb25zb2xlOiB0cnVlLCAvLyBcdTUzQkJcdTYzODljb25zb2xlLmxvZ1xuICAgICAgLy8gICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyB9LFxuICAgICAgLy8gaHR0cHM6Ly9yb2xsdXBqcy5vcmcvZ3VpZGUvZW4vI2JpZy1saXN0LW9mLW9wdGlvbnNcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgLy8gLy8gXHU0RUU1XHU0RTBCXHU2NTg3XHU0RUY2XHU0RTBEXHU2MjUzXHU1MzA1XG4gICAgICAgIC8vIGV4dGVybmFsOiBpc1ZpdGVwcmVzcyA/IHVuZGVmaW5lZCA6IHVzZUNkbkltcG9ydCA/IGV4dGVybmFsIDogdW5kZWZpbmVkLCAvLyBcdThDOENcdTRGM0NcdTRGN0ZcdTc1Mjggdml0ZS1wbHVnaW4tY2RuLWltcG9ydCBcdTY1RjZcdUZGMENcdTUzRUZcdTRFRTVcdTc3MDFcdTc1NjVcdTRFMERcdTUxOTkgZ2xvYmFsc1xuICAgICAgICBvbndhcm4od2FybmluZywgcm9sbHVwV2Fybikge1xuICAgICAgICAgIGlmIChjbG9zZVdhcm4pIHJldHVybjsgLy8gXHU1MTczXHU5NUVEXHU2MjQwXHU2NzA5XHU4QjY2XHU1NDRBXHU0RkUxXHU2MDZGXG4gICAgICAgICAgLy8gLy8gXHU4REYzXHU4RkM3XHU2MzA3XHU1QjlBXHU3QzdCXHU1NzhCXHU3Njg0XHU4QjY2XHU1NDRBXG4gICAgICAgICAgLy8gaWYgKHdhcm5pbmcuY29kZSA9PT0gXCJVTlVTRURfRVhURVJOQUxfSU1QT1JUXCIpIHJldHVybjtcbiAgICAgICAgICAvLyAvLyBcdTYyOUJcdTUxRkFcdTUxNzZcdTRFRDZcdTdDN0JcdTU3OEJcdTc2ODRcdThCNjZcdTU0NEFcdUZGMENcdTRGN0ZcdTc1MjggT2JqZWN0LmFzc2lnbiBcdTYyRjdcdThEMUQgbmV3IEVycm9yKHdhcm5pbmcubWVzc2FnZSlcdUZGMENcdTVDMDZcdTRGN0ZcdTU0N0RcdTRFRTRcdTg4NENcdTYyNTNcdTUzNzBcdTk4OURcdTU5MTZcdTc2ODRcdTRGRTFcdTYwNkZcdUZGMENcdTU5ODJcdThCNjZcdTU0NEFcdTRGNERcdTdGNkVcdUZGMENcdTU0OENcdTVFMkVcdTUyQTkgVVJMXHUzMDAyXG4gICAgICAgICAgLy8gaWYgKHdhcm5pbmcuY29kZSA9PT0gXCJNSVNTSU5HX0VYUE9SVFwiKSB0aHJvdyBPYmplY3QuYXNzaWduKG5ldyBFcnJvcigpLCB3YXJuaW5nKTtcbiAgICAgICAgICAvLyAvLyBcdTRGN0ZcdTc1MjhcdTlFRDhcdThCQTRcdTU5MDRcdTc0MDZcdTUxRkRcdTY1NzBcdTUxNUNcdTVFOTVcbiAgICAgICAgICByb2xsdXBXYXJuKHdhcm5pbmcpO1xuICAgICAgICB9LFxuICAgICAgICAvLyBcdTU5MUFcdTk4NzVcdTk3NjJcdTVFOTRcdTc1MjhcdTZBMjFcdTVGMEZcbiAgICAgICAgLy8gaW5wdXQ6IHtcbiAgICAgICAgLy8gICAvLyBfX2Rpcm5hbWUgXHU2NjJGIHZpdGUuY29uZmlnLmpzIFx1NjU4N1x1NEVGNlx1NjI0MFx1NTcyOFx1NzY4NFx1NzZFRVx1NUY1NVxuICAgICAgICAvLyAgIG1haW46IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgICAgLy8gICBuZXN0ZWQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwibmVzdGVkL2luZGV4Lmh0bWxcIiksXG4gICAgICAgIC8vIH0sXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIC8vIFx1NTIwNlx1NjU4N1x1NEVGNlx1NTkzOVx1OEZEQlx1ODg0Q1x1NTIwNlx1NTMwNVx1NEYxOFx1NTMxNlxuICAgICAgICAgIC8vIGVudHJ5RmlsZU5hbWVzOiBcImFzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXG4gICAgICAgICAgLy8gY2h1bmtGaWxlTmFtZXM6IFwiYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanNcIixcbiAgICAgICAgICAvLyAvLyBhc3NldEZpbGVOYW1lczogXCJhc3NldHMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XVwiLFxuICAgICAgICAgIC8vIC8vXHU4RkRCXHU4ODRDXHU1MjA2XHU1MzA1XHU0RjE4XHU1MzE2XG4gICAgICAgICAgLy8gbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgICAgLy8gICBpZiAoaWQuaW5jbHVkZXMoXCIvbW9jay9cIikpIHJldHVybiBcIm1vY2tcIjtcbiAgICAgICAgICAvLyAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSkge1xuICAgICAgICAgIC8vICAgICByZXR1cm4gaWQuc3BsaXQoXCJub2RlX21vZHVsZXMvXCIpWzFdLnNwbGl0KFwiL1wiKVswXTtcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyB9LFxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzKGluZm8pIHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgbmFtZXMgfSA9IGluZm87XG4gICAgICAgICAgICAvLyBjb25zdCBuYW1lID0gbmFtZXNbMF07XG4gICAgICAgICAgICBjb25zdCBleHQgPSBwYXRoLmV4dG5hbWUobmFtZSkuc2xpY2UoMSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbmZvLm5hbWUsIG5hbWUsIGV4dCwgXCJpbmZvLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcbiAgICAgICAgICAgIGlmICghbmFtZXM/Lmxlbmd0aCkgY29uc29sZS5sb2coXCJcdTY3MkFcdTYyN0VcdTUyMzAtLS0tLS0tLS0tLVwiLCBuYW1lcyk7XG4gICAgICAgICAgICBpZiAoW1wiY3NzXCIsIFwianNcIiwgXCJ0c1wiLCBcInZ1ZVwiXS5pbmNsdWRlcyhleHQpKSB7XG4gICAgICAgICAgICAgIC8vd2FuZ0VkaXRvclx1NTMwNVx1NzY4NFx1NTQwRFx1NUI1N1x1NEUyRFx1NUUyNlx1NjcwOS9cdUZGMENcdTYyNDBcdTRFRTVcdTk3MDBcdTg5ODFcdTU5MDRcdTc0MDZcdTRFMEJcbiAgICAgICAgICAgICAgY29uc3QgcGFja2FnZXMgPSBPYmplY3Qua2V5cyhwa2cuZGVwZW5kZW5jaWVzKS5tYXAoa2V5ID0+IGtleS5zcGxpdChcIi9cIilbMF0pO1xuICAgICAgICAgICAgICBjb25zdCBpc05vZGVNb2R1bGUgPSBwYWNrYWdlcy5zb21lKGl0ID0+IG5hbWUuc3RhcnRzV2l0aChpdCkpO1xuICAgICAgICAgICAgICBjb25zdCBzdWJQYXRoID0gaXNOb2RlTW9kdWxlID8gXCJwYWNrYWdlL1wiIDogXCJcIjtcbiAgICAgICAgICAgICAgY29uc3QgX25hbWUgPSBnZXRGaWxlTmFtZUJ5UGF0aChuYW1lKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGBhc3NldHMvW2V4dF0vJHtzdWJQYXRofSR7X25hbWV9LVtoYXNoXS5bZXh0XWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpbWdFeHRzID0gW1wicG5nXCIsIFwianBnXCIsIFwianBlZ1wiLCBcIndlYnBcIiwgXCJzdmdcIiwgXCJnaWZcIiwgXCJpY29cIl07XG4gICAgICAgICAgICBpZiAoaW1nRXh0cy5pbmNsdWRlcyhleHQpKSByZXR1cm4gXCJhc3NldHMvaW1ncy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdXCI7XG4gICAgICAgICAgICBjb25zdCBmb250RXh0cyA9IFtcIm90ZlwiLCBcInR0ZlwiXTtcbiAgICAgICAgICAgIGlmIChmb250RXh0cy5pbmNsdWRlcyhleHQpKSByZXR1cm4gXCJhc3NldHMvZm9udC9bbmFtZV0tW2hhc2hdLltleHRdXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJhc3NldHMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XVwiO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgLy8gXHU1NzI4IFVNRCBcdTY3ODRcdTVFRkFcdTZBMjFcdTVGMEZcdTRFMEJcdTRFM0FcdThGRDlcdTRFOUJcdTU5MTZcdTkwRThcdTUzMTZcdTc2ODRcdTRGOURcdThENTZcdTYzRDBcdTRGOUJcdTRFMDBcdTRFMkFcdTUxNjhcdTVDNDBcdTUzRDhcdTkxQ0ZcbiAgICAgICAgICAvLyBnbG9iYWxzOiB7IHZ1ZTogXCJWdWVcIiB9LCAgLy8gXHU4QzhDXHU0RjNDXHU0RjdGXHU3NTI4IHZpdGUtcGx1Z2luLWNkbi1pbXBvcnQgXHU2NUY2XHVGRjBDXHU1M0VGXHU0RUU1XHU3NzAxXHU3NTY1XHU0RTBEXHU1MTk5IGdsb2JhbHNcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAvLyBodHRwczovL3JvbGx1cGpzLm9yZy9ndWlkZS9lbi8jd2F0Y2gtb3B0aW9uc1xuICAgICAgLy8gd2F0Y2g6IHt9LFxuICAgICAgLy8gXHU1RTkzXHU2QTIxXHU1RjBGXHUzMDAyXHU1RjAwXHU1M0QxXHU5NzYyXHU1NDExXHU2RDRGXHU4OUM4XHU1NjY4XHU3Njg0XHU1RTkzXG4gICAgICAvLyBsaWI6IHtcbiAgICAgIC8vICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwibGliL21haW4uanNcIiksXG4gICAgICAvLyAgIG5hbWU6IFwiTXlMaWJcIixcbiAgICAgIC8vICAgZmlsZU5hbWU6IGZvcm1hdCA9PiBgbXktbGliLiR7Zm9ybWF0fS5qc2AsXG4gICAgICAvLyB9LFxuICAgIH0sXG4gIH0pO1xufTtcbiIsICJ7XHJcbiAgXCJuYW1lXCI6IFwiUXVpY2sgQWRtaW4gVnVlM1wiLFxyXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gIFwiYXV0aG9yXCI6IFwiZmFubGljaHVhblwiLFxyXG4gIFwidmVyc2lvblwiOiBcIjEuMC4wXCIsXHJcbiAgXCJwcml2YXRlXCI6IHRydWUsXHJcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXHJcbiAgXCJjb250cmlidXRlc1wiOiBbXHJcbiAgICBcInlvdVwiXHJcbiAgXSxcclxuICBcImJ1Z3NcIjogXCJodHRwczovL2dpdGVlLmNvbS9mYW5saWNodWFuL3F1aWNrX2FkbWluX3Z1ZTMvaXNzdWVzXCIsXHJcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0ZWUuY29tL2ZhbmxpY2h1YW4vcXVpY2tfYWRtaW5fdnVlMy8jL2xvZ2luXCIsXHJcbiAgXCJkZXNjcmlwdGlvblwiOiBcIlx1NEVFNVx1NUZFQlx1RkYwOFx1OEJBMVx1N0I5N1x1NjczQVx1NjI2N1x1ODg0Q1x1NjU0OFx1NzM4N1x1MzAwMVx1NUYwMFx1NTNEMVx1NjU0OFx1NzM4N1x1RkYwOVx1NEUzQVx1NjgzOFx1NUZDM1x1NzY4NFx1NTQwRVx1NTNGMFx1N0JBMVx1NzQwNlx1N0NGQlx1N0VERlx1NUYwMFx1NTNEMVx1NkEyMVx1Njc3RlwiLFxyXG4gIFwia2V5d29yZHNcIjogW1xyXG4gICAgXCJxdWlja1wiLFxyXG4gICAgXCJhZG1pblwiLFxyXG4gICAgXCJ2dWUzXCIsXHJcbiAgICBcIkVsZW1lbnRQbHVzXCIsXHJcbiAgICBcIlR5cGVTY3JpcHRcIlxyXG4gIF0sXHJcbiAgXCJzY3JpcHRzXCI6IHtcclxuICAgIFwic2VydmVcIjogXCJ2aXRlXCIsXHJcbiAgICBcImRldlwiOiBcInZpdGUgLS1tb2RlIGRldlwiLFxyXG4gICAgXCJ0ZXN0XCI6IFwidml0ZSAtLW1vZGUgdGVzdFwiLFxyXG4gICAgXCJwcmVcIjogXCJ2aXRlIC0tbW9kZSBwcmVcIixcclxuICAgIFwicHJvZFwiOiBcInZpdGUgLS1tb2RlIHByb2RcIixcclxuICAgIFwiYnVpbGRcIjogXCJ2dWUtdHNjICYmIHZpdGUgYnVpbGRcIixcclxuICAgIFwiYnVpbGQ6ZGV2XCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkIC0tbW9kZSBkZXZcIixcclxuICAgIFwiYnVpbGQ6dGVzdFwiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZCAtLW1vZGUgdGVzdFwiLFxyXG4gICAgXCJidWlsZDpwcmVcIjogXCJ2dWUtdHNjICYmIHZpdGUgYnVpbGQgLS1tb2RlIHByZVwiLFxyXG4gICAgXCJidWlsZDpwcm9kXCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkIC0tbW9kZSBwcm9kXCIsXHJcbiAgICBcImJ1aWxkOnNpbXBsZVwiOiBcInZpdGUgYnVpbGRcIixcclxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxyXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IHNyYyAtLWV4dCAudHMsLnRzeCwudnVlLC5qcywuanN4XCIsXHJcbiAgICBcImxpbnQ6Zml4XCI6IFwiZXNsaW50IHNyYyAtLWZpeCAtLWV4dCAudHMsLnRzeCwudnVlLC5qcywuanN4XCIsXHJcbiAgICBcImxpbnQ6bHNcIjogXCJscy1saW50XCIsXHJcbiAgICBcImxpbnQ6c3RhZ2VkXCI6IFwibGludC1zdGFnZWRcIixcclxuICAgIFwiZm9ybWF0XCI6IFwicHJldHRpZXIgLS13cml0ZSBcXFwiKiovKi57anMsanN4LHRzLHRzeCxjc3MsdnVlfVxcXCJcIixcclxuICAgIFwicHJlcGFyZVwiOiBcImh1c2t5IGluc3RhbGxcIixcclxuICAgIFwiYXBpXCI6IFwibm9kZSAuL3NjcmlwdHMvYXBpL2luZGV4LmpzXCIsXHJcbiAgICBcImFwaXN5YVwiOiBcIm5vZGUgLi9zY3JpcHRzL2FwaS95YS5qc1wiLFxyXG4gICAgXCJpbWdzXCI6IFwibm9kZSAuL3NjcmlwdHMvaW1hZ2VzLmpzXCIsXHJcbiAgICBcInJlbW92ZVwiOiBcIm5vZGUgLi9zY3JpcHRzL3JlbW92ZS1kb2MuanNcIixcclxuICAgIFwiZG9jXCI6IFwibm9kZSAuL3NjcmlwdHMvZG9jL2luZGV4LmpzXCIsXHJcbiAgICBcImRvY3M6ZGV2XCI6IFwidml0ZXByZXNzIGRldlwiLFxyXG4gICAgXCJkb2NzOmJ1aWxkXCI6IFwidml0ZXByZXNzIGJ1aWxkXCIsXHJcbiAgICBcImRvY3M6cHJldmlld1wiOiBcInZpdGVwcmVzcyBwcmV2aWV3XCIsXHJcbiAgICBcImludGVydmlldzpkZXZcIjogXCJ2aXRlcHJlc3MgZGV2XCIsXHJcbiAgICBcImludGVydmlldzpidWlsZFwiOiBcInZpdGVwcmVzcyBidWlsZFwiLFxyXG4gICAgXCJpbnRlcnZpZXc6cHJldmlld1wiOiBcInZpdGVwcmVzcyBwcmV2aWV3XCJcclxuICB9LFxyXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQGVsZW1lbnQtcGx1cy9pY29ucy12dWVcIjogXCJeMi4zLjFcIixcclxuICAgIFwiQG1kaXQtdnVlL3NoYXJlZFwiOiBcIl4yLjEuM1wiLFxyXG4gICAgXCJAdnVldXNlL2NvcmVcIjogXCJeMTEuMy4wXCIsXHJcbiAgICBcIkB3YW5nZWRpdG9yL2VkaXRvci1mb3ItdnVlXCI6IFwiXjUuMS4xMlwiLFxyXG4gICAgXCJheGlvc1wiOiBcIl4xLjMuMlwiLFxyXG4gICAgXCJkYXlqc1wiOiBcIl4xLjExLjdcIixcclxuICAgIFwiZHJpdmVyLmpzXCI6IFwiXjEuMy4xXCIsXHJcbiAgICBcImVjaGFydHNcIjogXCJeNS40LjFcIixcclxuICAgIFwiZWNoYXJ0cy1saXF1aWRmaWxsXCI6IFwiXjMuMS4wXCIsXHJcbiAgICBcImVsZW1lbnQtcGx1c1wiOiBcIl4yLjkuM1wiLFxyXG4gICAgXCJsb2Rhc2hcIjogXCJeNC4xNy4yMVwiLFxyXG4gICAgXCJtYXJrZG93bi1pdFwiOiBcIl4xNC4xLjBcIixcclxuICAgIFwibWFya2Rvd24taXQtY29udGFpbmVyXCI6IFwiXjQuMC4wXCIsXHJcbiAgICBcIm1kNVwiOiBcIl4yLjMuMFwiLFxyXG4gICAgXCJtb2NranNcIjogXCJeMS4xLjBcIixcclxuICAgIFwibnByb2dyZXNzXCI6IFwiXjAuMi4wXCIsXHJcbiAgICBcInBhdGgtdG8tcmVnZXhwXCI6IFwiXjguMi4wXCIsXHJcbiAgICBcInBpbmlhXCI6IFwiXjIuMS43XCIsXHJcbiAgICBcInFyY29kZVwiOiBcIl4xLjUuNFwiLFxyXG4gICAgXCJxc1wiOiBcIl42LjExLjFcIixcclxuICAgIFwic2NyZWVuZnVsbFwiOiBcIl42LjAuMlwiLFxyXG4gICAgXCJzb3J0YWJsZWpzXCI6IFwiXjEuMTUuMlwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1tb2NrXCI6IFwiXjIuOS42XCIsXHJcbiAgICBcInZ1ZVwiOiBcIl4zLjUuMTJcIixcclxuICAgIFwidnVlLWkxOG5cIjogXCJeOS4xMy4xXCIsXHJcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC40LjVcIixcclxuICAgIFwidnVlZHJhZ2dhYmxlXCI6IFwiXjQuMS4wXCIsXHJcbiAgICBcInhsc3hcIjogXCJeMC4xOC41XCJcclxuICB9LFxyXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQGNvbW1pdGxpbnQvY2xpXCI6IFwiXjE5LjMuMFwiLFxyXG4gICAgXCJAY29tbWl0bGludC9jb25maWctY29udmVudGlvbmFsXCI6IFwiXjE5LjIuMlwiLFxyXG4gICAgXCJAbHMtbGludC9scy1saW50XCI6IFwiXjIuMi4zXCIsXHJcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjE4LjEzLjBcIixcclxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNS41Ni4wXCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNS41Ni4wXCIsXHJcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiOiBcIl40LjAuMFwiLFxyXG4gICAgXCJAdnVlL2NvbXBpbGVyLXNmY1wiOiBcIl4zLjUuMTNcIixcclxuICAgIFwiZXNsaW50XCI6IFwiXjcuMjMuMFwiLFxyXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjguOC4wXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tcHJldHRpZXJcIjogXCJeNC4yLjFcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi12dWVcIjogXCJeOS45LjBcIixcclxuICAgIFwiaHVza3lcIjogXCJeOS4wLjExXCIsXHJcbiAgICBcImxpbnQtc3RhZ2VkXCI6IFwiXjE1LjIuNFwiLFxyXG4gICAgXCJwcmV0dGllclwiOiBcIl4yLjguNlwiLFxyXG4gICAgXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjogXCJeNS4xMi4wXCIsXHJcbiAgICBcInNhc3NcIjogXCJeMS44MC42XCIsXHJcbiAgICBcInN0eWxlbGludFwiOiBcIl4xNi4xLjBcIixcclxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1odG1sXCI6IFwiXjEuMS4wXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctcmVjZXNzLW9yZGVyXCI6IFwiXjUuMC4wXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctcmVjb21tZW5kZWQtc2Nzc1wiOiBcIl4xNC4wLjBcIixcclxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1yZWNvbW1lbmRlZC12dWVcIjogXCJeMS41LjBcIixcclxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1zdGFuZGFyZFwiOiBcIl4zNi4wLjBcIixcclxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1zdGFuZGFyZC1zY3NzXCI6IFwiXjEzLjAuMFwiLFxyXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjQuOS4zXCIsXHJcbiAgICBcInVucGx1Z2luLWF1dG8taW1wb3J0XCI6IFwiXjAuMTguM1wiLFxyXG4gICAgXCJ1bnBsdWdpbi1nZW5lcmF0ZS1jb21wb25lbnQtbmFtZVwiOiBcIl4wLjIuMFwiLFxyXG4gICAgXCJ2aXRlXCI6IFwiXjUuNC4xMFwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1jZG4taW1wb3J0XCI6IFwiXjEuMC4xXCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uXCI6IFwiXjAuNS4xXCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLWVzbGludFwiOiBcIl4xLjguMVwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1odG1sXCI6IFwiXjMuMi4yXCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLXRvcC1sZXZlbC1hd2FpdFwiOiBcIl4xLjQuNFwiLFxyXG4gICAgXCJ2aXRlcHJlc3NcIjogXCJeMS40LjVcIixcclxuICAgIFwidnVlLWRvY2dlbi1hcGlcIjogXCJeNC43OS4yXCIsXHJcbiAgICBcInZ1ZS10c2NcIjogXCJeMS4wLjI0XCJcclxuICB9LFxyXG4gIFwibGludC1zdGFnZWRcIjoge1xyXG4gICAgXCJzcmMvKiovKi57anMsanN4LHRzLHRzeCxqc29uLGNzcyxzY3NzLGxlc3MsbWQsdnVlfVwiOiBbXHJcbiAgICAgIFwiZXNsaW50IC0tZml4XCJcclxuICAgIF0sXHJcbiAgICBcIioue2NzcyxzY3NzLHNhc3N9XCI6IFwic3R5bGVsaW50IC0tZml4XCIsXHJcbiAgICBcIioqLypcIjogXCJwcmV0dGllciAtLXdyaXRlXCIsXHJcbiAgICBcInNyYy8qKlwiOiBcImxzLWxpbnRcIlxyXG4gIH1cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXFF1aWNrLUFkbWluXFxcXHF1aWNrX2FkbWluX3Z1ZTNcXFxcdml0ZS1jb25maWdcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFF1aWNrLUFkbWluXFxcXHF1aWNrX2FkbWluX3Z1ZTNcXFxcdml0ZS1jb25maWdcXFxcdXRpbHNcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1F1aWNrLUFkbWluL3F1aWNrX2FkbWluX3Z1ZTMvdml0ZS1jb25maWcvdXRpbHMvaW5kZXgudHNcIjsvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqKioqKioqKioqKiogdml0ZS5jb25maWcudHNcdTUyMURcdTU5Q0JcdTUzMTZcdTY1RjZcdTRGMUFcdTc1MjhcdTUyMzBcdTc2ODRcdTY1QjlcdTZDRDUgKioqKioqKioqKioqKioqKiovXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogXHU1QzA2XHU1QjU3XHU3QjI2XHU0RTMyXHU4RjZDXHU0RTNBXHU5QTdDXHU1Q0YwXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFx1ODk4MVx1OEY2Q1x1NjM2Mlx1NzY4NFx1NUI1N1x1N0IyNlx1NEUzMlxuICogQHBhcmFtIHtib29sZWFufSBpc0JpZyBcdTY2MkZcdTU0MjZcdThGNkNcdTYyMTBcdTU5MjdcdTlBN0NcdTVDRjBcdUZGMENcdTU0MjZcdTUyMTlcdThGNkNcdTYyMTBcdTVDMEZcdTlBN0NcdTVDRjBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQ2FtZWxDYXNlKHN0cjogc3RyaW5nLCBpc0JpZyA9IGZhbHNlKSB7XG4gIHN0ciA9IHN0ci5yZXBsYWNlKC8oPzpeXFx3fFtBLVpdfFxcYlxcdykvZywgKGxldHRlciwgaW5kKSA9PiB7XG4gICAgaWYgKGluZCA9PT0gMCkgcmV0dXJuIGxldHRlcltpc0JpZyA/IFwidG9VcHBlckNhc2VcIiA6IFwidG9Mb3dlckNhc2VcIl0oKTtcbiAgICByZXR1cm4gbGV0dGVyLnRvVXBwZXJDYXNlKCk7XG4gIH0pO1xuICBzdHIgPSBzdHIucmVwbGFjZSgvXFxzK3xcXC98LXx9L2csIFwiXCIpO1xuICByZXR1cm4gc3RyO1xufVxuXG4vKipcbiAqIFx1ODNCN1x1NTNENlx1NEVFM1x1NzQwNlx1NjYyMFx1NUMwNFxuICogQHBhcmFtIHtvYmplY3R9IGFwaU1hcCBhcGlcdTY2MjBcdTVDMDRcdTVCRjlcdThDNjFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFwaVByb3h5KGFwaU1hcCk6IGFueSB7XG4gIC8vIFx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1x1NzUyOGRldlNlcnZlclx1NTA1QVx1NjNBNVx1NTNFM1x1NEVFM1x1NzQwNlxuICByZXR1cm4gT2JqZWN0LmtleXMoYXBpTWFwKS5tYXAoa2V5ID0+IHtcbiAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKGBeJHtrZXl9YCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIFtrZXldOiB7XG4gICAgICAgIHRhcmdldDogYXBpTWFwW2tleV0sIC8vaHR0cDovLzEyNy4wLjAuMTo1NTAwXG4gICAgICAgIC8vIHRhcmdldDogXCJodHRwOi8vMTI3LjAuMC4xOjUxODBcIixcbiAgICAgICAgLy8gdGFyZ2V0OiBcImh0dHBzOi8vZmFubGljaHVhbi5naXRlZS5pb1wiLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsIC8vXHU2NjJGXHU1NDI2XHU4REU4XHU1N0RGXG4gICAgICAgIHdzOiB0cnVlLCAvL1x1NjYyRlx1NTQyNlx1NEVFM1x1NzQwNiB3ZWJzb2NrZXRzXG4gICAgICAgIHNlY3VyZTogZmFsc2UsIC8vXHU2NjJGXHU1NDI2aHR0cHNcdTYzQTVcdTUzRTNcbiAgICAgICAgcmV3cml0ZTogKHBhdGg6IHN0cmluZykgPT4gcGF0aC5yZXBsYWNlKHJlZywgXCJcIiksXG4gICAgICAgIGJ5cGFzcyhyZXEsIHJlcywgb3B0aW9uczogYW55KSB7XG4gICAgICAgICAgY29uc3QgcHJveHlVUkwgPSBvcHRpb25zLnRhcmdldCArIG9wdGlvbnMucmV3cml0ZShyZXEudXJsKTtcbiAgICAgICAgICByZXMuc2V0SGVhZGVyKFwieC1yZXEtcHJveHlVUkxcIiwgcHJveHlVUkwpOyAvLyBcdThCQkVcdTdGNkVcdTU0Q0RcdTVFOTRcdTU5MzRcdTUzRUZcdTRFRTVcdTU3MjhcdTZENEZcdTg5QzhcdTU2NjhcdTRFMkRcdTc3MEJcdTUyMzBcdTVCOUVcdTk2NDVcdThCRjdcdTZDNDJcdTU3MzBcdTU3NDBcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfSk7XG59XG5cbi8qKlxuICogXHU2ODM5XHU2MzZFXHU1NzMwXHU1NzQwXHU4M0I3XHU1M0Q2XHU2NTg3XHU0RUY2XHU1NDBEXHU3OUYwXG4gKiBAcGFyYW0gcGF0aCBcdTU3MzBcdTU3NDBcdThERUZcdTVGODRcbiAqIEBwYXJhbSBjaGFyIFx1NTIwNlx1NTI3Mlx1NUI1N1x1N0IyNlx1NEUzMlx1NEY5RFx1OEQ1Nlx1NzY4NFx1N0IyNlx1NTNGN1xuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVOYW1lQnlQYXRoKHBhdGg6IHN0cmluZywgY2hhciA9IFwiL1wiKSB7XG4gIGNvbnN0IGxhc3RJbmQgPSBwYXRoLmxhc3RJbmRleE9mKGNoYXIpO1xuICBjb25zdCBsYXN0RG90SW5kID0gcGF0aC5sYXN0SW5kZXhPZihcIi5cIik7XG4gIGNvbnN0IG5hbWUgPSBwYXRoLnN1YnN0cmluZyhsYXN0SW5kICsgMSwgbGFzdERvdEluZCk7XG4gIGlmIChuYW1lICE9PSBcImluZGV4XCIgJiYgbmFtZSAhPT0gXCJJbmRleFwiKSByZXR1cm4gbmFtZTtcbiAgY29uc3Qgc2Vjb25kSW5kID0gcGF0aC5sYXN0SW5kZXhPZihjaGFyLCBsYXN0SW5kIC0gMSk7XG4gIGxldCBuZXdOYW1lID0gcGF0aC5zdWJzdHJpbmcoc2Vjb25kSW5kICsgMSwgbGFzdEluZCkgfHwgbmFtZTtcbiAgaWYgKG5ld05hbWUuc3RhcnRzV2l0aChcIl9cIikpIG5ld05hbWUgPSBgMCR7bmV3TmFtZX1gOyAvL0dpdEh1YiBQYWdlc1x1NjcwRFx1NTJBMVx1NEYxQVx1NUMwNlx1NEUwQlx1NTIxMlx1N0VCRlx1NUYwMFx1NTkzNFx1NzY4NFx1NjU4N1x1NEVGNlx1ODlDNlx1NEUzQVx1OTY5MFx1ODVDRlx1NjU4N1x1NEVGNlx1RkYwQ1x1NEUwRFx1NEYxQVx1NjZCNFx1OTczMlx1NTFGQVx1Njc2NVx1RkYwQ1x1NjU0NVx1NTA1QVx1NkI2NFx1NTkwNFx1NzQwNlxuICByZXR1cm4gbmV3TmFtZTtcbn1cblxuLyoqXG4gKiBcdTY3ODRcdTkwMjBTU1JcdTk3MDBcdTg5ODFcdTc2ODRcdTZENEZcdTg5QzhcdTU2NjhhcGlcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRCcm93c2VyT2JqZWN0KCkge1xuICByZXR1cm4ge1xuICAgIC8vIFwicHJvY2Vzcy5lbnYuTk9ERV9FTlZcIjogSlNPTi5zdHJpbmdpZnkocHJvY2Vzcy5lbnYuTk9ERV9FTlYpLFxuICAgIHdpbmRvdzoge30sXG4gICAgbG9jYXRpb246IHtcbiAgICAgIGhvc3Q6IFwiXCIsXG4gICAgfSxcbiAgICBsb2NhbFN0b3JhZ2U6IHtcbiAgICAgIGdldEl0ZW06ICgpID0+IHt9LFxuICAgICAgc2V0SXRlbTogKCkgPT4ge30sXG4gICAgICByZW1vdmVJdGVtOiAoKSA9PiB7fSxcbiAgICB9LFxuICAgIHNlc3Npb25TdG9yYWdlOiB7XG4gICAgICBnZXRJdGVtOiAoKSA9PiB7fSxcbiAgICAgIHNldEl0ZW06ICgpID0+IHt9LFxuICAgICAgcmVtb3ZlSXRlbTogKCkgPT4ge30sXG4gICAgfSxcbiAgICBkb2N1bWVudDoge1xuICAgICAgY29va2llOiBcIlwiLFxuICAgICAgYm9keToge30sXG4gICAgICBxdWVyeVNlbGVjdG9yOiAoKSA9PiB7fSxcbiAgICB9LFxuICB9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxRdWljay1BZG1pblxcXFxxdWlja19hZG1pbl92dWUzXFxcXHZpdGUtY29uZmlnXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFF1aWNrLUFkbWluXFxcXHF1aWNrX2FkbWluX3Z1ZTNcXFxcdml0ZS1jb25maWdcXFxccGx1Z2luc1xcXFx2aXN1YWxpemVyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9RdWljay1BZG1pbi9xdWlja19hZG1pbl92dWUzL3ZpdGUtY29uZmlnL3BsdWdpbnMvdmlzdWFsaXplci50c1wiO2ltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI7XG4vKipcbiAqIFx1NjI1M1x1NTMwNVx1NEY1M1x1NzlFRlx1NTNFRlx1ODlDNlx1NTMxNlx1OTc2Mlx1Njc3RlxuICogQGxpbmsgbnBtIFx1NjU4N1x1Njg2M1x1OTRGRVx1NjNBNVx1RkYxQWh0dHBzOi8vZ2l0Y29kZS5jb20vYnRkL3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplci9vdmVydmlld1xuICovXG5leHBvcnQgZGVmYXVsdCAoKSA9PlxuICB2aXN1YWxpemVyKHtcbiAgICBvcGVuOiB0cnVlLCAvL1x1OUVEOFx1OEJBNFx1NEUzQWZhbHNlXHVGRjBDXHU2Nzg0XHU1RUZBXHU1QjhDXHU2MjEwXHU1NDBFXHU2NjJGXHU1NDI2XHU4MUVBXHU1MkE4XHU0RUNFXHU2RDRGXHU4OUM4XHU1NjY4XHU2MjUzXHU1RjAwXG4gICAgdGl0bGU6IFwiXHU2NTg3XHU0RUY2XHU0RjUzXHU3OUVGXHU1MjA2XHU2NzkwXCIsXG4gICAgLy9cdTZDRThcdUZGMUFcdTRGN0ZcdTc1Mjggb3V0RGlyUGF0aCBcdTRGMUFcdTVCRkNcdTgxRjRcdTYyNTNcdTUzMDVcdTU5MzFcdThEMjVcdUZGMENcdTY1NDVcdTY2ODJcdTY1RjZcdTRGN0ZcdTc1MjhcdTYyNEJcdTUyQThcdTU5MERcdTUyMzZcdTdDOThcdThEMzRcdTY1QjlcdTVGMEZcdTUyMzAgb3V0RGlyUGF0aCBcdTRFMkRcbiAgICBmaWxlbmFtZTogXCIuL3B1YmxpYy9zdGF0cy5odG1sXCIsIC8vXHU5RUQ4XHU4QkE0XHU2NTg3XHU0RUY2XHU1NDBEXHU0RTNBIHN0YXRzLmh0bWxcdUZGMENcdTYyNTNcdTUzMDVcdThGOTNcdTUxRkFcdTc2ODRcdTY1ODdcdTRFRjZcdTU0MERcdTc5RjBcbiAgICBnemlwU2l6ZTogdHJ1ZSwgLy9cdTlFRDhcdThCQTRmYWxzZVx1RkYwQ1x1NjYyRlx1NTQyNlx1NjYzRVx1NzkzQWd6aXBcdTUzOEJcdTdGMjlcdTRFNEJcdTU0MEVcdTc2ODRcdTU5MjdcdTVDMEZcbiAgICBicm90bGlTaXplOiB0cnVlLCAvL1x1OUVEOFx1OEJBNGZhbHNlXG4gICAgLy8gcHJvamVjdFJvb3Q6IFwiLi9kaXN0XCIsIC8vXHU5RUQ4XHU4QkE0XHU1MDNDXHVGRjFBcHJvY2Vzcy5jd2QoKVxuICAgIC8vIHRlbXBsYXRlOiAndHJlZW1hcCcsIC8vXHU5RUQ4XHU4QkE0XHVGRjFBdHJlZW1hcFx1MzAwMlx1OEY5M1x1NTFGQVx1NkEyMVx1Njc3Rlx1RkYwQ1x1NTNFRlx1OTAwOVx1NTAzQ1x1RkYxQXN1bmJ1cnN0LCB0cmVlbWFwLCBuZXR3b3JrLCByYXctZGF0YSwgbGlzdFxuICAgIC8vIGluY2x1ZGU6IHVuZGVmaW5lZCxcbiAgICAvLyBleGNsdWRlOiB1bmRlZmluZWQsXG4gICAgLy8gZW1pdEZpbGU6IGZhbHNlLFxuICAgIC8vIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgLy8gRmlsdGVyOiB7IGJ1bmRsZTogcGljb21hdGNoUGF0dGVybiwgZmlsZTogcGljb21hdGNoUGF0dGVybiB9LFxuICB9KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcUXVpY2stQWRtaW5cXFxccXVpY2tfYWRtaW5fdnVlM1xcXFx2aXRlLWNvbmZpZ1xcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxRdWljay1BZG1pblxcXFxxdWlja19hZG1pbl92dWUzXFxcXHZpdGUtY29uZmlnXFxcXHBsdWdpbnNcXFxcYXV0by1pbXBvcnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1F1aWNrLUFkbWluL3F1aWNrX2FkbWluX3Z1ZTMvdml0ZS1jb25maWcvcGx1Z2lucy9hdXRvLWltcG9ydC50c1wiO2ltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdXRvSW1wb3J0KHtcclxuICAvLyBkaXJzOiBbJ3NyYy9zdG9yZXMnXVxyXG4gIGltcG9ydHM6IFtcInZ1ZVwiLCBcInZ1ZS1yb3V0ZXJcIl0sXHJcbiAgZHRzOiBcInR5cGVzL2F1dG8taW1wb3J0cy5kLnRzXCIsXHJcbiAgZXNsaW50cmM6IHtcclxuICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICBmaWxlcGF0aDogXCJ0eXBlcy8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvblwiLFxyXG4gICAgZ2xvYmFsc1Byb3BWYWx1ZTogdHJ1ZSxcclxuICB9LFxyXG59KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxRdWljay1BZG1pblxcXFxxdWlja19hZG1pbl92dWUzXFxcXHZpdGUtY29uZmlnXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFF1aWNrLUFkbWluXFxcXHF1aWNrX2FkbWluX3Z1ZTNcXFxcdml0ZS1jb25maWdcXFxccGx1Z2luc1xcXFx2aXRlLW1vY2stc2VydmUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1F1aWNrLUFkbWluL3F1aWNrX2FkbWluX3Z1ZTMvdml0ZS1jb25maWcvcGx1Z2lucy92aXRlLW1vY2stc2VydmUudHNcIjsvL3ZpdGUgbW9jayBcdTUzQzJcdTgwMDNcdTU3MzBcdTU3NDBcdUZGMUFodHRwOi8vZXZlbnRzLmppYW5zaHUuaW8vcC84Y2U5NDA3N2FmMmFcclxuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1tb2NrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB2aXRlTW9ja1NlcnZlKHtcclxuICAvLyBpZ25vcmU/OiBSZWdFeHAgfCAoKGZpbGVOYW1lOiBzdHJpbmcpID0+IGJvb2xlYW4pO1xyXG4gIC8vIGlnbm9yZUZpbGVzPzogc3RyaW5nW107XHJcbiAgLy8gY29uZmlnUGF0aD86IHN0cmluZztcclxuICAvLyBpbmplY3RGaWxlPzogc3RyaW5nO1xyXG4gIC8vIGluamVjdENvZGU/OiBzdHJpbmc7XHJcbiAgLy8gbG9nZ2VyPzpib29sZWFuO1xyXG4gIG1vY2tQYXRoOiBcIm1vY2tcIiwgLy9cdTg5RTNcdTY3OTBcdTY4MzlcdTc2RUVcdTVGNTVcdTRFMEJcdTc2ODRtb2NrXHU2NTg3XHU0RUY2XHU1OTM5XHJcbiAgbG9jYWxFbmFibGVkOiB0cnVlLCAvLyBcdTVGMDBcdTUzRDFcdTYyNTNcdTUzMDVcdTVGMDBcdTUxNzNcclxuICBwcm9kRW5hYmxlZDogdHJ1ZSwgLy8gXHU3NTFGXHU0RUE3XHU2MjUzXHU1MzA1XHU1RjAwXHU1MTczXHJcbiAgc3VwcG9ydFRzOiB0cnVlLCAvLyBcdTYyNTNcdTVGMDBcdTU0MEVcdUZGMENcdTUzRUZcdTRFRTVcdThCRkJcdTUzRDYgdHMgXHU2NTg3XHU0RUY2XHU2QTIxXHU1NzU3XHUzMDAyIFx1OEJGN1x1NkNFOFx1NjEwRlx1RkYwQ1x1NjI1M1x1NUYwMFx1NTQwRVx1NUMwNlx1NjVFMFx1NkNENVx1NzZEMVx1ODlDNi5qcyBcdTY1ODdcdTRFRjZcdTMwMDJcclxuICB3YXRjaEZpbGVzOiB0cnVlLCAvLyBcdTc2RDFcdTg5QzZcdTY1ODdcdTRFRjZcdTY2RjRcdTY1MzlcclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcUXVpY2stQWRtaW5cXFxccXVpY2tfYWRtaW5fdnVlM1xcXFx2aXRlLWNvbmZpZ1xcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxRdWljay1BZG1pblxcXFxxdWlja19hZG1pbl92dWUzXFxcXHZpdGUtY29uZmlnXFxcXHBsdWdpbnNcXFxcZ2VuZXJhdGUtY29tcG9uZW50LW5hbWUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1F1aWNrLUFkbWluL3F1aWNrX2FkbWluX3Z1ZTMvdml0ZS1jb25maWcvcGx1Z2lucy9nZW5lcmF0ZS1jb21wb25lbnQtbmFtZS50c1wiOy8vIG5wbSBcdTU3MzBcdTU3NDBcdUZGMUFodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS91bnBsdWdpbi1nZW5lcmF0ZS1jb21wb25lbnQtbmFtZVxyXG5pbXBvcnQgR2VuZXJhdGVDb21wb25lbnROYW1lIGZyb20gXCJ1bnBsdWdpbi1nZW5lcmF0ZS1jb21wb25lbnQtbmFtZS92aXRlXCI7XHJcbmltcG9ydCB7IHRvQ2FtZWxDYXNlIH0gZnJvbSBcIi4uL3V0aWxzXCI7XHJcblxyXG5jb25zdCBkaXJzID0gW1widmlld3NcIiwgXCJtb2R1bGVzXCJdO1xyXG5jb25zdCBzcGxpdFJlZyA9IG5ldyBSZWdFeHAoZGlycy5tYXAoaXQgPT4gYC8ke2l0fS9gKS5qb2luKFwifFwiKSk7XHJcblxyXG4vLyBcdTgxRUFcdTUyQThcdTdFRDlcdTdFQzRcdTRFRjZcdTU0N0RcdTU0MERcclxuZXhwb3J0IGRlZmF1bHQgR2VuZXJhdGVDb21wb25lbnROYW1lKHtcclxuICBpbmNsdWRlOiBbXCIqKi8qLnZ1ZVwiXSxcclxuICBlbnRlcjogW1xyXG4gICAgLy9cdTUxNjhcdTVDNDBcdTc2ODRcdTU3RkFcdTc4NDBcdTdFQzRcdTRFRjZcdTc2ODRcdTU0N0RcdTU0MERcdTg5QzRcdTUyMTlcdUZGMUFcdTY4MzlcdTYzNkVcdTY1ODdcdTRFRjZcdTYyMTZcdTcyMzZcdTdFQTdcdTY1ODdcdTRFRjZcdTU5MzlcdTU0MERcdTc5RjBcdTU0N0RcdTU0MERcclxuICAgIHtcclxuICAgICAgaW5jbHVkZTogW1wic3JjL2NvbXBvbmVudHMvKiovKi52dWVcIl0sXHJcbiAgICAgIGdlbkNvbXBvbmVudE5hbWU6IHJlcyA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBhdHRyTmFtZSwgZGlybmFtZSwgb3JpZ2luYWxOYW1lIH0gPSByZXM7XHJcbiAgICAgICAgaWYgKGF0dHJOYW1lKSByZXR1cm4gYXR0ck5hbWU7XHJcbiAgICAgICAgaWYgKG9yaWdpbmFsTmFtZSA9PT0gXCJJbmRleFwiIHx8IG9yaWdpbmFsTmFtZSA9PT0gXCJpbmRleFwiKSByZXR1cm4gdG9DYW1lbENhc2UoZGlybmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsTmFtZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvL1x1OTg3NVx1OTc2Mlx1N0VDNFx1NEVGNlx1NzY4NFx1NTQ3RFx1NTQwRFx1ODlDNFx1NTIxOVx1RkYxQVx1NjgzOVx1NjM2RVx1OERFRlx1NUY4NFx1Njc2NVx1NTQ3RFx1NTQwRChcdTRFRTVpbmRleC52dWVcdTRGNUNcdTRFM0FcdTY1ODdcdTRFRjZcdTU0MERcdTc2ODQpXHJcbiAgICB7XHJcbiAgICAgIGluY2x1ZGU6IGRpcnMubWFwKGl0ID0+IGBzcmMvJHtpdH0vKiovaW5kZXgudnVlYCksXHJcbiAgICAgIGdlbkNvbXBvbmVudE5hbWU6IHJlcyA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBhdHRyTmFtZSwgZmlsZVBhdGgsIG9yaWdpbmFsTmFtZSwgZGlybmFtZSB9ID0gcmVzO1xyXG4gICAgICAgIGlmIChhdHRyTmFtZSkgcmV0dXJuIGF0dHJOYW1lO1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBmaWxlUGF0aC5zcGxpdChzcGxpdFJlZylbMV0uc2xpY2UoMCwgLTEwKTtcclxuICAgICAgICByZXR1cm4gdG9DYW1lbENhc2UobmFtZSwgdHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy9cdTk4NzVcdTk3NjJcdTdFQzRcdTRFRjZcdTc2ODRcdTU0N0RcdTU0MERcdTg5QzRcdTUyMTlcdUZGMUFcdTY4MzlcdTYzNkVcdThERUZcdTVGODRcdTY3NjVcdTU0N0RcdTU0MEQoXHU0RUU1XHU5NzVFaW5kZXgudnVlXHU0RjVDXHU0RTNBXHU2NTg3XHU0RUY2XHU1NDBEXHU3Njg0XHVGRjBDXHU0RTE0XHU5OTk2XHU1QjU3XHU2QkNEXHU1QzBGXHU1MTk5KVxyXG4gICAge1xyXG4gICAgICBleGNsdWRlOiBkaXJzLm1hcChpdCA9PiBbYHNyYy8ke2l0fS8qKi9pbmRleC52dWVgLCBgc3JjLyR7aXR9LyoqL19jb21wb25lbnRzLyoqLyoudnVlYF0pLmZsYXQoMSksXHJcbiAgICAgIGluY2x1ZGU6IGRpcnMubWFwKGl0ID0+IGBzcmMvJHtpdH0vKiovKi52dWVgKSxcclxuICAgICAgZ2VuQ29tcG9uZW50TmFtZTogcmVzID0+IHtcclxuICAgICAgICBjb25zdCB7IGF0dHJOYW1lLCBmaWxlUGF0aCwgb3JpZ2luYWxOYW1lLCBkaXJuYW1lIH0gPSByZXM7XHJcbiAgICAgICAgaWYgKGF0dHJOYW1lKSByZXR1cm4gYXR0ck5hbWU7XHJcbiAgICAgICAgY29uc3QgYWZ0ZXJQYXRoID0gZmlsZVBhdGguc3BsaXQoc3BsaXRSZWcpWzFdO1xyXG4gICAgICAgIC8vIGNvbnN0IGNvZGUgPSBhZnRlclBhdGguc2xpY2UoYWZ0ZXJQYXRoLmxhc3RJbmRleE9mKFwiL1wiKSsxKS5jaGFyQ29kZUF0KDApXHJcbiAgICAgICAgLy8gY29uc3QgaXNQYWdlID0gY29kZT49OTcgJiYgY29kZSA8PTEyMjtcclxuICAgICAgICBjb25zdCBuYW1lID0gYWZ0ZXJQYXRoLnNsaWNlKDAsIC00KTtcclxuICAgICAgICByZXR1cm4gdG9DYW1lbENhc2UobmFtZSwgdHJ1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXFF1aWNrLUFkbWluXFxcXHF1aWNrX2FkbWluX3Z1ZTNcXFxcdml0ZS1jb25maWdcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcUXVpY2stQWRtaW5cXFxccXVpY2tfYWRtaW5fdnVlM1xcXFx2aXRlLWNvbmZpZ1xcXFxwbHVnaW5zXFxcXGNkbi1pbXBvcnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1F1aWNrLUFkbWluL3F1aWNrX2FkbWluX3Z1ZTMvdml0ZS1jb25maWcvcGx1Z2lucy9jZG4taW1wb3J0LnRzXCI7aW1wb3J0IGNkbkltcG9ydFBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tY2RuLWltcG9ydFwiO1xuaW1wb3J0IHBrZyBmcm9tIFwiLi4vLi4vcGFja2FnZS5qc29uXCI7XG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XG5cbmNvbnN0IHsgY2FtZWxDYXNlLCB1cHBlckZpcnN0IH0gPSBfO1xuXG5jb25zdCBwcm9kVXJsID0gXCIvL3VucGtnLmNvbS97bmFtZX1Ae3ZlcnNpb259L3twYXRofVwiO1xuXG5mdW5jdGlvbiBnZXRDYW1lbENhc2VOYW1lKG5hbWU6IHN0cmluZykge1xuICByZXR1cm4gdXBwZXJGaXJzdChjYW1lbENhc2UobmFtZSkpO1xufVxuZnVuY3Rpb24gZ2V0VmVyc2lvbihuYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHBrZy5kZXBlbmRlbmNpZXNbbmFtZV0ucmVwbGFjZShcIl5cIiwgXCJcIik7XG59XG5mdW5jdGlvbiBnZXRQYXRoKG5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nID0gXCJcIikge1xuICBsZXQgc3RyID0gcHJvZFVybC5yZXBsYWNlKFwie25hbWV9XCIsIG5hbWUpLnJlcGxhY2UoXCJ7dmVyc2lvbn1cIiwgZ2V0VmVyc2lvbihuYW1lKSkucmVwbGFjZShcIntwYXRofVwiLCBwYXRoKTtcbiAgaWYgKHN0ci5lbmRzV2l0aChcIi9cIikpIHN0ciA9IHN0ci5zbGljZSgwLCAtMSk7XG4gIHJldHVybiBzdHI7XG59XG5mdW5jdGlvbiBnZXRDc3MoY3NzOiBib29sZWFuIHwgc3RyaW5nLCBwYXRoOiBzdHJpbmcpIHtcbiAgaWYgKCFjc3MpIHJldHVybjtcbiAgaWYgKGNzcyA9PT0gdHJ1ZSkgcmV0dXJuIHBhdGg7XG4gIGlmICh0eXBlb2YgY3NzID09PSBcInN0cmluZ1wiKSByZXR1cm4gY3NzO1xuICB0aHJvdyBuZXcgRXJyb3IoYFx1OEJGN1x1NEYyMFx1NTE2NXN0cmluZ1x1N0M3Qlx1NTc4Qlx1NzY4NGNzc1x1NTAzQ2ApO1xufVxuZnVuY3Rpb24gZ2V0Q29uZmlnSXRlbShpdGVtOiBzdHJpbmcgfCBDb21tb25PYmosIGVuZFBhdGg/OiBzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSBpdGVtID0geyBuYW1lOiBpdGVtIH07XG4gIGlmICghaXRlbS5uYW1lKSB0aHJvdyBuZXcgRXJyb3IoYFx1N0YzQVx1NUMxMW5hbWVcdTUzQzJcdTY1NzBgKTtcbiAgY29uc3QgeyBuYW1lLCB2YXI6IHZhck5hbWUgPSBnZXRDYW1lbENhc2VOYW1lKG5hbWUpLCBwYXRoID0gZ2V0UGF0aChuYW1lLCBlbmRQYXRoKSwgY3NzLCAuLi5yZXN0IH0gPSBpdGVtO1xuICByZXR1cm4geyBuYW1lLCB2YXI6IHZhck5hbWUsIHBhdGgsIGNzczogZ2V0Q3NzKGNzcywgcGF0aCksIC4uLnJlc3QgfTtcbn1cblxuLy8gY29uc3QgaXRlbSA9IHtcbi8vICAgbmFtZTogXCJcIiwgLy9cdTk3MDBcdTg5ODEgQ0ROIFx1NTJBMFx1OTAxRlx1NzY4NFx1NTMwNVx1NTQwRFx1NzlGMFx0c3RyaW5nXG4vLyAgIHZhcjogXCJcIiwgLy9cdTUxNjhcdTVDNDBcdTUyMDZcdTkxNERcdTdFRDlcdTZBMjFcdTU3NTdcdTc2ODRcdTUzRDhcdTkxQ0ZcdHN0cmluZ1xuLy8gICBwYXRoOiBcIlwiLCAvL1x1NjMwN1x1NUI5QSBDRE4gXHU0RTBBXHU3Njg0XHU1MkEwXHU4RjdEXHU4REVGXHU1Rjg0XHRzdHJpbmcgLyBzdHJpbmdbXVxuLy8gICBjc3M6IFwiXCIsIC8vXHU1M0VGXHU0RUU1XHU2MzA3XHU1QjlBXHU0RUNFIENETiBcdTU3MzBcdTU3NDBcdTRFMEFcdTUyQTBcdThGN0RcdTU5MUFcdTRFMkFcdTY4MzdcdTVGMEZcdTg4NjhcdHN0cmluZyAvIHN0cmluZ1tdXG4vLyAgIGFsaWFzOiBcIlwiLCAvL1x1NTQwRFx1NzlGMFx1NzY4NFx1NTIyQlx1NTQwRFx1RkYwQ1x1NEY4Qlx1NTk4Mlx1MjAxQ3JlYWN0LWRvbS9jbGllbnRcdTIwMURcdTY2MkZcdTIwMUNyZWFjdC1kb21cdTIwMURcdTc2ODRcdTUyMkJcdTU0MERcdHN0cmluZ1tdXG4vLyAgIHByb2RVcmw6IFwiXCIsIC8vXHU4OTg2XHU3NkQ2XHU1MTY4XHU1QzQwXHU3Njg0IHByb2RVcmxcdHN0cmluZyAvIHN0cmluZ1tdXG4vLyB9O1xuZXhwb3J0IGNvbnN0IGV4dGVybmFsTGlzdDogYW55W10gPSBbXG4gIC8qKiogXHU2ODQ2XHU2N0I2XHU1MTY4XHU1QkI2XHU2ODc2ICoqKi9cbiAgXCJ2dWVcIixcbiAgeyBuYW1lOiBcInZ1ZS1kZW1pXCIsIHZhcjogXCJWdWVEZW1pXCIsIHBhdGg6IFwiaHR0cHM6Ly91bnBrZy5jb20vdnVlLWRlbWlAMC4xNC4xMFwiIH0sXG4gIC8vIGdldENvbmZpZ0l0ZW0oeyBuYW1lOiBcInZ1ZS1kZW1pXCIsIHZhcjogXCJWdWVEZW1pXCIsIHBhdGg6IFwiaHR0cHM6Ly91bnBrZy5jb20vdnVlLWRlbWlAMC4xNC4xMFwiIH0pLCAvLyBodHRwczovL3VucGtnLmNvbS92dWUtZGVtaUAwLjE0LjEwXG4gIGdldENvbmZpZ0l0ZW0oXCJ2dWUtcm91dGVyXCIpLCAvLyB7IG5hbWU6IFwidnVlLXJvdXRlclwiLCB2YXI6IFwiVnVlUm91dGVyXCIsIHBhdGg6IGBodHRwczovL3VucGtnLmNvbS92dWUtcm91dGVyQDQuNC41YCB9LFxuICBnZXRDb25maWdJdGVtKHsgbmFtZTogXCJ2dWUtZGVtaVwiLCB2YXI6IFwiVnVlRGVtaVwiLCBwYXRoOiBcImh0dHBzOi8vdW5wa2cuY29tL3Z1ZS1kZW1pQDAuMTQuMTBcIiB9KSwgLy8gaHR0cHM6Ly91bnBrZy5jb20vdnVlLWRlbWlAMC4xNC4xMFxuICBnZXRDb25maWdJdGVtKFwicGluaWFcIiksXG4gIC8vIHVpXHU1RTkzXG4gIGdldENvbmZpZ0l0ZW0oXCJlbGVtZW50LXBsdXNcIiksXG4gIC8qKiogXHU1N0ZBXHU3ODQwXHU1RkM1XHU1OTA3ICoqKi9cbiAgLy8gZ2V0Q29uZmlnSXRlbShcInFzXCIpLFxuICBcImF4aW9zXCIsXG4gIFwiZGF5anNcIixcbiAgXCJsb2Rhc2hcIixcbiAgLy8gZ2V0Q29uZmlnSXRlbSh7IG5hbWU6IFwidnVlLWkxOG5cIiwgdmFyOiBcIkkxOE5cIiB9KSxcbiAgLyoqKiBcdTUyOUZcdTgwRkRcdTVGQzVcdTU5MDcgKioqL1xuICAvLyBnZXRDb25maWdJdGVtKHsgbmFtZTogXCJtZDVcIiwgdmFyOiBcIm1kNVwiIH0pLFxuICAvLyBnZXRDb25maWdJdGVtKFwibnByb2dyZXNzXCIpLFxuICBnZXRDb25maWdJdGVtKFwiZWNoYXJ0c1wiKSxcbiAgZ2V0Q29uZmlnSXRlbShcImVjaGFydHMtbGlxdWlkZmlsbFwiKSxcbiAgLy8gZ2V0Q29uZmlnSXRlbSh7IG5hbWU6IFwiZHJpdmVyLmpzXCIsIHZhcjogXCJkcml2ZXJcIiB9KSxcbiAgLy8gZ2V0Q29uZmlnSXRlbShcInNjcmVlbmZ1bGxcIiksXG4gIC8vIGdldENvbmZpZ0l0ZW0oXCJzb3J0YWJsZWpzXCIpLFxuICAvLyBnZXRDb25maWdJdGVtKFwicXJjb2RlXCIpLFxuICAvLyBnZXRDb25maWdJdGVtKFwidnVlZHJhZ2dhYmxlXCIpLFxuICBnZXRDb25maWdJdGVtKFwieGxzeFwiKSxcbiAgLy8gZ2V0Q29uZmlnSXRlbShcIkB3YW5nZWRpdG9yL2VkaXRvci1mb3ItdnVlXCIpLFxuICAvKioqIG1vY2tcdTc2RjhcdTUxNzMgKioqL1xuICAvLyBnZXRDb25maWdJdGVtKFwibW9ja2pzXCIpLFxuICAvLyBnZXRDb25maWdJdGVtKFwidml0ZS1wbHVnaW4tbW9ja1wiKSxcbiAgLyoqKiBkb2NzIFx1NzZGOFx1NTE3MyAqKiovXG4gIC8vIGdldENvbmZpZ0l0ZW0oXCJtYXJrZG93bi1pdFwiKSxcbiAgLy8gZ2V0Q29uZmlnSXRlbShcIm1hcmtkb3duLWl0LWNvbnRhaW5lclwiKSxcbl07XG5cbi8vIFx1NEVFNVx1NEUwQlx1NTMwNVx1NEUwRFx1NEYxQVx1OEZEQlx1ODg0Q1x1NjI1M1x1NTMwNVx1Njc4NFx1NUVGQVxuZXhwb3J0IGNvbnN0IGV4dGVybmFsID0gZXh0ZXJuYWxMaXN0Lm1hcChpdCA9PiB7XG4gIGlmICh0eXBlb2YgaXQgPT09IFwic3RyaW5nXCIpIHJldHVybiBpdDtcbiAgcmV0dXJuIGl0Lm5hbWU7XG59KTtcblxuLyoqXG4gKiBAbGluayBucG1cdTUzMDVcdTU3MzBcdTU3NDBcdUZGMUFodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS92aXRlLXBsdWdpbi1jZG4taW1wb3J0XG4gKiBAZXhhbXBsZSBwcm9kVXJsOiAnLy91bnBrZy5jb20ve25hbWV9QHt2ZXJzaW9ufS97cGF0aH0nLCAnaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS97bmFtZX1Ae3ZlcnNpb259L3twYXRofSdcbiAqL1xuZXhwb3J0IGNvbnN0IGNkbkltcG9ydCA9ICgpID0+XG4gIGNkbkltcG9ydFBsdWdpbih7XG4gICAgcHJvZFVybCwgLy8gXHU5RUQ4XHU4QkE0XHU1MDNDXHU0RTNBXHVGRjFBaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS97bmFtZX1Ae3ZlcnNpb259L3twYXRofVxuICAgIC8vIFx1N0M3Qlx1NTc4Qlx1RkYxQShNb2R1bGUgfCBNb2R1bGVbXSB8IEdldE1vZHVsZUZ1bmMgfCBHZXRNb2R1bGVGdW5jW10pW11cbiAgICAvLyBcdTk4ODRcdThCQkVcdTlFRDhcdThCQTRcdTUwM0NcdUZGMUFyZWFjdCwgcmVhY3QtZG9tLCByZWFjdC1yb3V0ZXItZG9tLCBhbnRkLCB2dWUsIHZ1ZTIsIHZ1ZS1yb3V0ZXIsIHZ1ZS1yb3V0ZXJAMywgbW9tZW50LCBkYXlqcywgYXhpb3MsIGxvZGFzaFxuICAgIG1vZHVsZXM6IGV4dGVybmFsTGlzdCxcbiAgICBlbmFibGVJbkRldk1vZGU6IHRydWUsIC8vIFx1NEUzQXRydWVcdTY1RjZcdUZGMENcdTUzRUZcdTRFRTVcdTkwMUFcdThGQzcgQ0ROIFx1NUJGQ1x1NTE2NVx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NEUwQlx1OTAxQVx1NUUzOFx1OTcwMFx1ODk4MVx1OTAxQVx1OEZDNyBOUE0gXHU1Qjg5XHU4OEM1XHU3Njg0XHU0RjlEXHU4RDU2XG4gICAgLy8gZ2VuZXJhdGVTY3JpcHRUYWcoKXt9LFxuICAgIC8vIGdlbmVyYXRlQ3NzTGlua1RhZygpe30sXG4gIH0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUixTQUFTLFdBQUFBLGdCQUFlOzs7QUNBRSxTQUFTLG9CQUE2QjtBQUNyVixPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVOzs7QUNGakI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLE1BQVE7QUFBQSxFQUNSLFFBQVU7QUFBQSxFQUNWLFNBQVc7QUFBQSxFQUNYLFNBQVc7QUFBQSxFQUNYLFNBQVc7QUFBQSxFQUNYLGFBQWU7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBUTtBQUFBLEVBQ1IsVUFBWTtBQUFBLEVBQ1osYUFBZTtBQUFBLEVBQ2YsVUFBWTtBQUFBLElBQ1Y7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBVztBQUFBLElBQ1QsT0FBUztBQUFBLElBQ1QsS0FBTztBQUFBLElBQ1AsTUFBUTtBQUFBLElBQ1IsS0FBTztBQUFBLElBQ1AsTUFBUTtBQUFBLElBQ1IsT0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsY0FBYztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsY0FBYztBQUFBLElBQ2QsZ0JBQWdCO0FBQUEsSUFDaEIsU0FBVztBQUFBLElBQ1gsTUFBUTtBQUFBLElBQ1IsWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLElBQ2YsUUFBVTtBQUFBLElBQ1YsU0FBVztBQUFBLElBQ1gsS0FBTztBQUFBLElBQ1AsUUFBVTtBQUFBLElBQ1YsTUFBUTtBQUFBLElBQ1IsUUFBVTtBQUFBLElBQ1YsS0FBTztBQUFBLElBQ1AsWUFBWTtBQUFBLElBQ1osY0FBYztBQUFBLElBQ2QsZ0JBQWdCO0FBQUEsSUFDaEIsaUJBQWlCO0FBQUEsSUFDakIsbUJBQW1CO0FBQUEsSUFDbkIscUJBQXFCO0FBQUEsRUFDdkI7QUFBQSxFQUNBLGNBQWdCO0FBQUEsSUFDZCwyQkFBMkI7QUFBQSxJQUMzQixvQkFBb0I7QUFBQSxJQUNwQixnQkFBZ0I7QUFBQSxJQUNoQiw4QkFBOEI7QUFBQSxJQUM5QixPQUFTO0FBQUEsSUFDVCxPQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixTQUFXO0FBQUEsSUFDWCxzQkFBc0I7QUFBQSxJQUN0QixnQkFBZ0I7QUFBQSxJQUNoQixRQUFVO0FBQUEsSUFDVixlQUFlO0FBQUEsSUFDZix5QkFBeUI7QUFBQSxJQUN6QixLQUFPO0FBQUEsSUFDUCxRQUFVO0FBQUEsSUFDVixXQUFhO0FBQUEsSUFDYixrQkFBa0I7QUFBQSxJQUNsQixPQUFTO0FBQUEsSUFDVCxRQUFVO0FBQUEsSUFDVixJQUFNO0FBQUEsSUFDTixZQUFjO0FBQUEsSUFDZCxZQUFjO0FBQUEsSUFDZCxvQkFBb0I7QUFBQSxJQUNwQixLQUFPO0FBQUEsSUFDUCxZQUFZO0FBQUEsSUFDWixjQUFjO0FBQUEsSUFDZCxjQUFnQjtBQUFBLElBQ2hCLE1BQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNqQixtQkFBbUI7QUFBQSxJQUNuQixtQ0FBbUM7QUFBQSxJQUNuQyxvQkFBb0I7QUFBQSxJQUNwQixlQUFlO0FBQUEsSUFDZixvQ0FBb0M7QUFBQSxJQUNwQyw2QkFBNkI7QUFBQSxJQUM3QixzQkFBc0I7QUFBQSxJQUN0QixxQkFBcUI7QUFBQSxJQUNyQixRQUFVO0FBQUEsSUFDViwwQkFBMEI7QUFBQSxJQUMxQiwwQkFBMEI7QUFBQSxJQUMxQixxQkFBcUI7QUFBQSxJQUNyQixPQUFTO0FBQUEsSUFDVCxlQUFlO0FBQUEsSUFDZixVQUFZO0FBQUEsSUFDWiw0QkFBNEI7QUFBQSxJQUM1QixNQUFRO0FBQUEsSUFDUixXQUFhO0FBQUEsSUFDYix5QkFBeUI7QUFBQSxJQUN6QixpQ0FBaUM7QUFBQSxJQUNqQyxxQ0FBcUM7QUFBQSxJQUNyQyxvQ0FBb0M7QUFBQSxJQUNwQyw2QkFBNkI7QUFBQSxJQUM3QixrQ0FBa0M7QUFBQSxJQUNsQyxZQUFjO0FBQUEsSUFDZCx3QkFBd0I7QUFBQSxJQUN4QixvQ0FBb0M7QUFBQSxJQUNwQyxNQUFRO0FBQUEsSUFDUiwwQkFBMEI7QUFBQSxJQUMxQiwyQkFBMkI7QUFBQSxJQUMzQixzQkFBc0I7QUFBQSxJQUN0QixvQkFBb0I7QUFBQSxJQUNwQiwrQkFBK0I7QUFBQSxJQUMvQixXQUFhO0FBQUEsSUFDYixrQkFBa0I7QUFBQSxJQUNsQixXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsZUFBZTtBQUFBLElBQ2Isc0RBQXNEO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxxQkFBcUI7QUFBQSxJQUNyQixRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsRUFDWjtBQUNGOzs7QUN0SE8sU0FBUyxZQUFZLEtBQWEsUUFBUSxPQUFPO0FBQ3RELFFBQU0sSUFBSSxRQUFRLHVCQUF1QixDQUFDLFFBQVEsUUFBUTtBQUN4RCxRQUFJLFFBQVEsRUFBRyxRQUFPLE9BQU8sUUFBUSxnQkFBZ0IsYUFBYSxFQUFFO0FBQ3BFLFdBQU8sT0FBTyxZQUFZO0FBQUEsRUFDNUIsQ0FBQztBQUNELFFBQU0sSUFBSSxRQUFRLGVBQWUsRUFBRTtBQUNuQyxTQUFPO0FBQ1Q7QUFNTyxTQUFTLFlBQVksUUFBYTtBQUV2QyxTQUFPLE9BQU8sS0FBSyxNQUFNLEVBQUUsSUFBSSxTQUFPO0FBQ3BDLFVBQU0sTUFBTSxJQUFJLE9BQU8sSUFBSSxHQUFHLEVBQUU7QUFDaEMsV0FBTztBQUFBLE1BQ0wsQ0FBQyxHQUFHLEdBQUc7QUFBQSxRQUNMLFFBQVEsT0FBTyxHQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFHbEIsY0FBYztBQUFBO0FBQUEsUUFDZCxJQUFJO0FBQUE7QUFBQSxRQUNKLFFBQVE7QUFBQTtBQUFBLFFBQ1IsU0FBUyxDQUFDQyxVQUFpQkEsTUFBSyxRQUFRLEtBQUssRUFBRTtBQUFBLFFBQy9DLE9BQU8sS0FBSyxLQUFLLFNBQWM7QUFDN0IsZ0JBQU0sV0FBVyxRQUFRLFNBQVMsUUFBUSxRQUFRLElBQUksR0FBRztBQUN6RCxjQUFJLFVBQVUsa0JBQWtCLFFBQVE7QUFBQSxRQUMxQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUFRTyxTQUFTLGtCQUFrQkEsT0FBYyxPQUFPLEtBQUs7QUFDMUQsUUFBTSxVQUFVQSxNQUFLLFlBQVksSUFBSTtBQUNyQyxRQUFNLGFBQWFBLE1BQUssWUFBWSxHQUFHO0FBQ3ZDLFFBQU0sT0FBT0EsTUFBSyxVQUFVLFVBQVUsR0FBRyxVQUFVO0FBQ25ELE1BQUksU0FBUyxXQUFXLFNBQVMsUUFBUyxRQUFPO0FBQ2pELFFBQU0sWUFBWUEsTUFBSyxZQUFZLE1BQU0sVUFBVSxDQUFDO0FBQ3BELE1BQUksVUFBVUEsTUFBSyxVQUFVLFlBQVksR0FBRyxPQUFPLEtBQUs7QUFDeEQsTUFBSSxRQUFRLFdBQVcsR0FBRyxFQUFHLFdBQVUsSUFBSSxPQUFPO0FBQ2xELFNBQU87QUFDVDtBQU1PLFNBQVMsbUJBQW1CO0FBQ2pDLFNBQU87QUFBQTtBQUFBLElBRUwsUUFBUSxDQUFDO0FBQUEsSUFDVCxVQUFVO0FBQUEsTUFDUixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsY0FBYztBQUFBLE1BQ1osU0FBUyxNQUFNO0FBQUEsTUFBQztBQUFBLE1BQ2hCLFNBQVMsTUFBTTtBQUFBLE1BQUM7QUFBQSxNQUNoQixZQUFZLE1BQU07QUFBQSxNQUFDO0FBQUEsSUFDckI7QUFBQSxJQUNBLGdCQUFnQjtBQUFBLE1BQ2QsU0FBUyxNQUFNO0FBQUEsTUFBQztBQUFBLE1BQ2hCLFNBQVMsTUFBTTtBQUFBLE1BQUM7QUFBQSxNQUNoQixZQUFZLE1BQU07QUFBQSxNQUFDO0FBQUEsSUFDckI7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLE1BQU0sQ0FBQztBQUFBLE1BQ1AsZUFBZSxNQUFNO0FBQUEsTUFBQztBQUFBLElBQ3hCO0FBQUEsRUFDRjtBQUNGOzs7QUN4Rm1WLFNBQVMsa0JBQWtCO0FBSzlXLElBQU8scUJBQVEsTUFDYixXQUFXO0FBQUEsRUFDVCxNQUFNO0FBQUE7QUFBQSxFQUNOLE9BQU87QUFBQTtBQUFBLEVBRVAsVUFBVTtBQUFBO0FBQUEsRUFDVixVQUFVO0FBQUE7QUFBQSxFQUNWLFlBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUWQsQ0FBQzs7O0FDcEJrVixPQUFPLGdCQUFnQjtBQUU1VyxJQUFPLHNCQUFRLFdBQVc7QUFBQTtBQUFBLEVBRXhCLFNBQVMsQ0FBQyxPQUFPLFlBQVk7QUFBQSxFQUM3QixLQUFLO0FBQUEsRUFDTCxVQUFVO0FBQUEsSUFDUixTQUFTO0FBQUEsSUFDVCxVQUFVO0FBQUEsSUFDVixrQkFBa0I7QUFBQSxFQUNwQjtBQUNGLENBQUM7OztBQ1ZELFNBQVMscUJBQXFCO0FBRTlCLElBQU8sMEJBQVEsY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTzNCLFVBQVU7QUFBQTtBQUFBLEVBQ1YsY0FBYztBQUFBO0FBQUEsRUFDZCxhQUFhO0FBQUE7QUFBQSxFQUNiLFdBQVc7QUFBQTtBQUFBLEVBQ1gsWUFBWTtBQUFBO0FBQ2QsQ0FBQzs7O0FDZEQsT0FBTywyQkFBMkI7QUFHbEMsSUFBTSxPQUFPLENBQUMsU0FBUyxTQUFTO0FBQ2hDLElBQU0sV0FBVyxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQU0sSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEdBQUcsQ0FBQztBQUcvRCxJQUFPLGtDQUFRLHNCQUFzQjtBQUFBLEVBQ25DLFNBQVMsQ0FBQyxVQUFVO0FBQUEsRUFDcEIsT0FBTztBQUFBO0FBQUEsSUFFTDtBQUFBLE1BQ0UsU0FBUyxDQUFDLHlCQUF5QjtBQUFBLE1BQ25DLGtCQUFrQixTQUFPO0FBQ3ZCLGNBQU0sRUFBRSxVQUFVLFNBQVMsYUFBYSxJQUFJO0FBQzVDLFlBQUksU0FBVSxRQUFPO0FBQ3JCLFlBQUksaUJBQWlCLFdBQVcsaUJBQWlCLFFBQVMsUUFBTyxZQUFZLFNBQVMsSUFBSTtBQUMxRixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUE7QUFBQSxNQUNFLFNBQVMsS0FBSyxJQUFJLFFBQU0sT0FBTyxFQUFFLGVBQWU7QUFBQSxNQUNoRCxrQkFBa0IsU0FBTztBQUN2QixjQUFNLEVBQUUsVUFBVSxVQUFVLGNBQWMsUUFBUSxJQUFJO0FBQ3RELFlBQUksU0FBVSxRQUFPO0FBQ3JCLGNBQU0sT0FBTyxTQUFTLE1BQU0sUUFBUSxFQUFFLENBQUMsRUFBRSxNQUFNLEdBQUcsR0FBRztBQUNyRCxlQUFPLFlBQVksTUFBTSxJQUFJO0FBQUEsTUFDL0I7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBO0FBQUEsTUFDRSxTQUFTLEtBQUssSUFBSSxRQUFNLENBQUMsT0FBTyxFQUFFLGlCQUFpQixPQUFPLEVBQUUsMEJBQTBCLENBQUMsRUFBRSxLQUFLLENBQUM7QUFBQSxNQUMvRixTQUFTLEtBQUssSUFBSSxRQUFNLE9BQU8sRUFBRSxXQUFXO0FBQUEsTUFDNUMsa0JBQWtCLFNBQU87QUFDdkIsY0FBTSxFQUFFLFVBQVUsVUFBVSxjQUFjLFFBQVEsSUFBSTtBQUN0RCxZQUFJLFNBQVUsUUFBTztBQUNyQixjQUFNLFlBQVksU0FBUyxNQUFNLFFBQVEsRUFBRSxDQUFDO0FBRzVDLGNBQU0sT0FBTyxVQUFVLE1BQU0sR0FBRyxFQUFFO0FBQ2xDLGVBQU8sWUFBWSxNQUFNLElBQUk7QUFBQSxNQUMvQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzs7O0FDOUNrVixPQUFPLHFCQUFxQjtBQUUvVyxPQUFPLE9BQU87QUFFZCxJQUFNLEVBQUUsV0FBVyxXQUFXLElBQUk7QUFFbEMsSUFBTSxVQUFVO0FBRWhCLFNBQVMsaUJBQWlCLE1BQWM7QUFDdEMsU0FBTyxXQUFXLFVBQVUsSUFBSSxDQUFDO0FBQ25DO0FBQ0EsU0FBUyxXQUFXLE1BQWM7QUFDaEMsU0FBTyxnQkFBSSxhQUFhLElBQUksRUFBRSxRQUFRLEtBQUssRUFBRTtBQUMvQztBQUNBLFNBQVMsUUFBUSxNQUFjQyxRQUFlLElBQUk7QUFDaEQsTUFBSSxNQUFNLFFBQVEsUUFBUSxVQUFVLElBQUksRUFBRSxRQUFRLGFBQWEsV0FBVyxJQUFJLENBQUMsRUFBRSxRQUFRLFVBQVVBLEtBQUk7QUFDdkcsTUFBSSxJQUFJLFNBQVMsR0FBRyxFQUFHLE9BQU0sSUFBSSxNQUFNLEdBQUcsRUFBRTtBQUM1QyxTQUFPO0FBQ1Q7QUFDQSxTQUFTLE9BQU8sS0FBdUJBLE9BQWM7QUFDbkQsTUFBSSxDQUFDLElBQUs7QUFDVixNQUFJLFFBQVEsS0FBTSxRQUFPQTtBQUN6QixNQUFJLE9BQU8sUUFBUSxTQUFVLFFBQU87QUFDcEMsUUFBTSxJQUFJLE1BQU0scURBQWtCO0FBQ3BDO0FBQ0EsU0FBUyxjQUFjLE1BQTBCLFNBQWtCO0FBQ2pFLE1BQUksT0FBTyxTQUFTLFNBQVUsUUFBTyxFQUFFLE1BQU0sS0FBSztBQUNsRCxNQUFJLENBQUMsS0FBSyxLQUFNLE9BQU0sSUFBSSxNQUFNLDhCQUFVO0FBQzFDLFFBQU0sRUFBRSxNQUFNLEtBQUssVUFBVSxpQkFBaUIsSUFBSSxHQUFHLE1BQUFBLFFBQU8sUUFBUSxNQUFNLE9BQU8sR0FBRyxLQUFLLEdBQUcsS0FBSyxJQUFJO0FBQ3JHLFNBQU8sRUFBRSxNQUFNLEtBQUssU0FBUyxNQUFBQSxPQUFNLEtBQUssT0FBTyxLQUFLQSxLQUFJLEdBQUcsR0FBRyxLQUFLO0FBQ3JFO0FBVU8sSUFBTSxlQUFzQjtBQUFBO0FBQUEsRUFFakM7QUFBQSxFQUNBLEVBQUUsTUFBTSxZQUFZLEtBQUssV0FBVyxNQUFNLHFDQUFxQztBQUFBO0FBQUEsRUFFL0UsY0FBYyxZQUFZO0FBQUE7QUFBQSxFQUMxQixjQUFjLEVBQUUsTUFBTSxZQUFZLEtBQUssV0FBVyxNQUFNLHFDQUFxQyxDQUFDO0FBQUE7QUFBQSxFQUM5RixjQUFjLE9BQU87QUFBQTtBQUFBLEVBRXJCLGNBQWMsY0FBYztBQUFBO0FBQUE7QUFBQSxFQUc1QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtBLGNBQWMsU0FBUztBQUFBLEVBQ3ZCLGNBQWMsb0JBQW9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBTWxDLGNBQWMsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUXRCO0FBR08sSUFBTSxXQUFXLGFBQWEsSUFBSSxRQUFNO0FBQzdDLE1BQUksT0FBTyxPQUFPLFNBQVUsUUFBTztBQUNuQyxTQUFPLEdBQUc7QUFDWixDQUFDO0FBTU0sSUFBTSxZQUFZLE1BQ3ZCLGdCQUFnQjtBQUFBLEVBQ2Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUdBLFNBQVM7QUFBQSxFQUNULGlCQUFpQjtBQUFBO0FBQUE7QUFBQTtBQUduQixDQUFDOzs7QVAvRkgsSUFBTSxtQ0FBbUM7QUFtQnpDLElBQU0sZUFBZTtBQUNyQixJQUFNLFlBQVk7QUFHbEIsSUFBTyxzQkFBUSxDQUFDLEVBQUUsTUFBTSxRQUFRLE1BQU07QUFFcEMsUUFBTSxjQUFjLFFBQVEsS0FBSyxDQUFDLEVBQUUsU0FBUyxXQUFXO0FBQ3hELFFBQU0sVUFBVSxRQUFRLEtBQUssQ0FBQyxNQUFNO0FBQ3BDLFFBQU0sU0FBUyxTQUFTO0FBQ3hCLFNBQU8sYUFBYTtBQUFBO0FBQUEsSUFFbEIsUUFBUTtBQUFBLE1BQ04sY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJZCxHQUFJLGVBQWUsVUFBVSxpQkFBaUIsSUFBSSxDQUFDO0FBQUEsSUFDckQ7QUFBQSxJQUNBLFVBQVUsWUFBWSxVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUloQyxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFNTixTQUFTO0FBQUEsTUFDUCxHQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLG1CQUFXLEdBQUcsZUFBZSxVQUFVLElBQUksTUFBUztBQUFBLE1BQ25GO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBS0Y7QUFBQSxJQUNBLFNBQVM7QUFBQTtBQUFBLE1BRVAsWUFBWSxDQUFDLFFBQVEsT0FBTyxRQUFRLE9BQU8sUUFBUSxRQUFRLFNBQVMsTUFBTTtBQUFBLE1BQzFFLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFNTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxRQUFRO0FBQUEsUUFDckMsS0FBSyxLQUFLLFFBQVEsa0NBQVcsSUFBSTtBQUFBLFFBQ2pDLE1BQU0sS0FBSyxLQUFLLGtDQUFXLFNBQVM7QUFBQSxNQUN0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLRjtBQUFBLElBQ0EsS0FBSztBQUFBO0FBQUE7QUFBQSxNQUdILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQTtBQUFBLFVBRUosS0FBSztBQUFBO0FBQUE7QUFBQSxVQUVMLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUtGO0FBQUEsSUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLQSxRQUFRO0FBQUEsTUFDTixNQUFNLENBQUM7QUFBQSxNQUNQLE1BQU0sY0FBYyxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQStCM0IsT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFVBQ04sUUFBUTtBQUFBO0FBQUEsVUFDUixjQUFjO0FBQUE7QUFBQSxVQUNkLElBQUk7QUFBQTtBQUFBLFVBQ0osUUFBUTtBQUFBO0FBQUEsVUFDUixTQUFTLENBQUNDLFVBQWlCQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsVUFDcEQsT0FBTyxLQUFLLEtBQUssU0FBYztBQUM3QixrQkFBTSxXQUFXLFFBQVEsU0FBUyxRQUFRLFFBQVEsSUFBSSxHQUFHO0FBQ3pELGdCQUFJLFVBQVUsa0JBQWtCLFFBQVE7QUFBQSxVQUMxQztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBU0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBUUEsT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFLTCxRQUFRO0FBQUE7QUFBQTtBQUFBLE1BRVIsUUFBUSxTQUFTLFNBQVMsUUFBUSxJQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUt0QyxXQUFXLENBQUM7QUFBQSxNQUNaLHNCQUFzQjtBQUFBO0FBQUEsTUFDdEIsdUJBQXVCO0FBQUE7QUFBQTtBQUFBLE1BRXZCLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFRUixlQUFlO0FBQUE7QUFBQTtBQUFBLFFBR2IsT0FBTyxTQUFTLFlBQVk7QUFDMUIsY0FBSSxVQUFXO0FBTWYscUJBQVcsT0FBTztBQUFBLFFBQ3BCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFPQSxRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBWU4sZUFBZSxNQUFNO0FBQ25CLGtCQUFNLEVBQUUsTUFBTSxNQUFNLElBQUk7QUFFeEIsa0JBQU0sTUFBTSxLQUFLLFFBQVEsSUFBSSxFQUFFLE1BQU0sQ0FBQztBQUN0QyxvQkFBUSxJQUFJLEtBQUssTUFBTSxNQUFNLEtBQUssK0JBQStCO0FBQ2pFLGdCQUFJLENBQUMsT0FBTyxPQUFRLFNBQVEsSUFBSSxpQ0FBa0IsS0FBSztBQUN2RCxnQkFBSSxDQUFDLE9BQU8sTUFBTSxNQUFNLEtBQUssRUFBRSxTQUFTLEdBQUcsR0FBRztBQUU1QyxvQkFBTSxXQUFXLE9BQU8sS0FBSyxnQkFBSSxZQUFZLEVBQUUsSUFBSSxTQUFPLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQzNFLG9CQUFNLGVBQWUsU0FBUyxLQUFLLFFBQU0sS0FBSyxXQUFXLEVBQUUsQ0FBQztBQUM1RCxvQkFBTSxVQUFVLGVBQWUsYUFBYTtBQUM1QyxvQkFBTSxRQUFRLGtCQUFrQixJQUFJO0FBQ3BDLHFCQUFPLGdCQUFnQixPQUFPLEdBQUcsS0FBSztBQUFBLFlBQ3hDO0FBQ0Esa0JBQU0sVUFBVSxDQUFDLE9BQU8sT0FBTyxRQUFRLFFBQVEsT0FBTyxPQUFPLEtBQUs7QUFDbEUsZ0JBQUksUUFBUSxTQUFTLEdBQUcsRUFBRyxRQUFPO0FBQ2xDLGtCQUFNLFdBQVcsQ0FBQyxPQUFPLEtBQUs7QUFDOUIsZ0JBQUksU0FBUyxTQUFTLEdBQUcsRUFBRyxRQUFPO0FBQ25DLG1CQUFPO0FBQUEsVUFDVDtBQUFBO0FBQUE7QUFBQSxRQUdGO0FBQUEsTUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7OztBRGpQQSxJQUFPQyx1QkFBUSxDQUFDLFFBQWE7QUFDM0IsUUFBTSxFQUFFLE1BQU0sUUFBUSxJQUFJO0FBRTFCLFFBQU0sYUFBYSxvQkFBYyxHQUFHO0FBRXBDLFFBQU0sTUFBTUMsU0FBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3ZDLFFBQU0sU0FBUztBQUFBLElBQ2IsUUFBUSxJQUFJO0FBQUEsSUFDWixRQUFRO0FBQUEsRUFDVjtBQUNBLGFBQVcsT0FBTyxRQUFRLFlBQVksTUFBTTtBQUU1QyxTQUFPO0FBQ1Q7IiwKICAibmFtZXMiOiBbImxvYWRFbnYiLCAicGF0aCIsICJwYXRoIiwgInBhdGgiLCAidml0ZV9jb25maWdfZGVmYXVsdCIsICJsb2FkRW52Il0KfQo=
