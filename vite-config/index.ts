import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import pkg from "../package.json";
import { getFileNameByPath } from "./utils";

import visualizer from "./plugins/visualizer";
import AutoImport from "./plugins/auto-import";
import viteMockServe from "./plugins/vite-mock-serve";
import generateComponentName from "./plugins/generate-component-name";

import { cdnImport, external } from "./plugins/cdn-import";
// import createHtmlPlugin from "./plugins/create-html-plugin";
// import viteCompression from "./plugins/vite-compression";
// import imageminPlugin from "./plugins/imagemin-plugin";

export * from "./utils";

const useCdnImport = false; // 使用cdn
const closeWarn = true; //关闭警告
// const outDirPath = path.resolve(__dirname, "../online-preview/vue");
// https://vitejs.dev/config/
export default ({ mode, command }) => {
  // const env = loadEnv(mode, process.cwd()); // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const isVitepress = process.argv[1].includes("vitepress");
  const isProd = mode === "production"; // 原来取值范围是：production, develop, 但配置了env文件后，所以改变了mode的值
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
    base: "./", // 默认为 '/'。表示应用程序的根目录。如果你的应用程序部署在域名的根目录下，你不需要修改 base 的值。
    // mode: "development", // 默认development。可选：development，production。在配置中指明将会把 serve 和 build 时的模式 都 覆盖掉。也可以通过命令行 --mode 选项来重写。
    // root: "./src/pages", // 默认：process.cwd()。项目根目录（index.html 文件所在的位置）
    // envDir: '/', // 用于加载 .env 文件的目录
    // publicDir: 'public', // 默认为/public。将 publicDir 设定为 false 可以关闭此项功能
    // cacheDir: "node_modules/.vite", // 存储缓存文件的目录。可以使用 --force 命令行选项或手动删除目录
    plugins: [
      ...(isVitepress ? [] : [vue(), visualizer, useCdnImport ? cdnImport : undefined]),
      AutoImport,
      viteMockServe,
      generateComponentName,
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
        "@": path.resolve(__dirname, "../src"),
        "#": path.resolve(__dirname, ".."),
        mock: path.join(__dirname, "../mock"),
      },
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
          api: closeWarn ? "modern" : undefined,
          // additionalData: `@import "@/assets/styles/_var.scss";`,
          additionalData: `@use "@/assets/styles/_var.scss" as *;`,
        },
        // less: {
        //   javascriptEnabled: true,
        //   additionalData: `@import "@/assets/styles/_var.scss";`,
        // },
      },
    },
    // json: {
    //   // namedExports: true, // 是否支持从 .json 文件中进行按名导入。
    //   // stringify: false, // 若设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...")
    // },
    server: {
      open: !isVitepress,
      port: isVitepress ? 5090 : 5180, //启动端口
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
          target: "http://localhost:7003", //http://127.0.0.1:5500
          changeOrigin: true, //是否跨域
          ws: true, //是否代理 websockets
          secure: false, //是否https接口
          rewrite: (path: string) => path.replace(/^\/api/, ""),
          bypass(req, res, options: any) {
            const proxyURL = options.target + options.rewrite(req.url);
            res.setHeader("x-req-proxyURL", proxyURL); // 设置响应头可以在浏览器中看到实际请求地址
          },
        },
      },
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
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      chunkSizeWarningLimit: 1000, // 默认500，打包最大体积警告
      // 压缩和混淆代码：使用 Vite 的内置压缩工具（例如 Terser）对打包后的代码进行压缩和混淆，以减小文件大小并提高加载速度。可以通过在 vite.config.js 中设置 build.minify 选项来启用压缩
      minify: "terser", // 默认：esbuild。可选：boolean | 'terser' | 'esbuild
      terserOptions: {
        compress: {
          drop_console: true, // 去掉console.log
          drop_debugger: true,
        },
      },
      // https://rollupjs.org/guide/en/#big-list-of-options
      rollupOptions: {
        // 以下文件不打包
        // external: isVitepress ? undefined : useCdnImport ? external : undefined,  // 貌似使用 vite-plugin-cdn-import 时，可以省略不写 globals
        onwarn(warning, rollupWarn) {
          if (closeWarn) return; // 关闭所有警告信息
          // // 跳过指定类型的警告
          // if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
          // // 抛出其他类型的警告，使用 Object.assign 拷贝 new Error(warning.message)，将使命令行打印额外的信息，如警告位置，和帮助 URL。
          // if (warning.code === "MISSING_EXPORT") throw Object.assign(new Error(), warning);
          // // 使用默认处理函数兜底
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
        },
      },
      // https://rollupjs.org/guide/en/#watch-options
      // watch: {},
      // 库模式。开发面向浏览器的库
      // lib: {
      //   entry: path.resolve(__dirname, "lib/main.js"),
      //   name: "MyLib",
      //   fileName: format => `my-lib.${format}.js`,
      // },
    },
  });
};
