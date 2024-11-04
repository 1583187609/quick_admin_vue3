import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import pkg from "../package.json";
import { getFileNameByPath } from "./utils";

import visualizer from "./plugins/visualizer";
import AutoImport from "./plugins/auto-import";
import viteMockServe from "./plugins/vite-mock-serve";
import generateComponentName from "./plugins/generate-component-name";

// import { importByCDN, external } from "./plugins/import-by-cdn";
// import createHtmlPlugin from "./plugins/create-html-plugin";
// import viteCompression from "./plugins/vite-compression";
// import imageminPlugin from "./plugins/imagemin-plugin";

export * from "./utils";

// const outDirPath = path.resolve(__dirname, "../online-preview/vue");
// https://vitejs.dev/config/
export default ({ mode, command }) => {
  // const env = loadEnv(mode, process.cwd()); // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const isVitepress = process.argv[1].includes("vitepress");
  const isProd = mode === "production"; // 原来取值范围是：production, develop, 但配置了env文件后，所以改变了mode的值
  return defineConfig({
    // define: {
    //   __VUE_OPTIONS_API__: true, // 启用/禁用选项式 API 支持。禁用此功能将减小打包结果的体积，但如果第三方库依赖选项式 API，则可能影响兼容性
    //   __VUE_PROD_DEVTOOLS__: !isProd, // 在生产环境中启用/禁用开发者工具支持。启用会在打包结果中包含更多代码，因此建议仅在调试时启用此功能
    //   __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: !isProd, // 启用/禁用生产环境构建下激活 (hydration) 不匹配的详细警告。启用会在打包结果中包含更多代码，因此建议仅在调试时启用此功能
    // },
    base: "./", //表示应用程序的根目录。如果你的应用程序部署在域名的根目录下，你不需要修改 base 的值。
    // base: "/", //表示应用程序的根目录。如果你的应用程序部署在域名的根目录下，你不需要修改 base 的值。
    // root: "./src/pages", // 项目根目录
    plugins: [
      ...(isVitepress ? [] : [vue(), visualizer]),
      AutoImport,
      viteMockServe,
      generateComponentName,
      // imageminPlugin,
      // importByCDN,
      // createHtmlPlugin,
      // viteCompression,
    ],
    resolve: {
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
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "@/assets/styles/_var.scss";`,
          additionalData: `@use "@/assets/styles/_var.scss" as *;`,
        },
        // less: {
        //   javascriptEnabled: true,
        //   additionalData: `@import "@/assets/styles/_var.scss";`,
        // },
      },
    },
    server: {
      open: !isVitepress,
      // port: 5180, //启动端口
      // hmr: {
      //   host: "127.0.0.1",
      //   port: 5180,
      // },
      // // 设置 https 代理
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
    },
    //vite构建时默认使用Esbuild，打包速度是其他打包工具的十几倍，但是缺点也很明显，不具备操作AST的能力，所以需要通过terser去除console.log
    build: {
      outDir: isProd ? "dist" : `dist-${mode}`,
      // outDir: outDirPath,
      // 压缩和混淆代码：使用 Vite 的内置压缩工具（例如 Terser）对打包后的代码进行压缩和混淆，以减小文件大小并提高加载速度。可以通过在 vite.config.js 中设置 build.minify 选项来启用压缩
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true, // 去掉console.log
          drop_debugger: true,
        },
      },
      sourcemap: !isProd,
      // assetsInlineLimit: 4096, // 默认4096
      // cssCodeSplit: false, // 默认为true，当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时一并获取。
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      chunkSizeWarningLimit: 1000, // 打包最大体积警告
      rollupOptions: {
        // 以下文件不打包
        // external,
        output: {
          // 分文件夹进行分包优化
          entryFileNames: "assets/js/[name]-[hash].js",
          chunkFileNames: "assets/js/[name]-[hash].js",
          // assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          //进行分包优化
          manualChunks(id) {
            if (id.includes("/mock/")) return "mock";
            if (id.includes("node_modules")) {
              return id.split("node_modules/")[1].split("/")[0];
            }
          },
          assetFileNames(info) {
            const { name } = info;
            const ext = path.extname(name).slice(1);
            if (["css", "js", "vue"].includes(ext)) {
              //wangEditor包的名字中带有/，所以需要处理下
              const packages = Object.keys(pkg.dependencies).map(key => key.split("/")[0]);
              // if (ext === "vue" || ext === "js") {
              //   console.log(info, packages, "info-------------------------");
              // }
              const isNodeModule = packages.some(it => name.startsWith(it));
              const subPath = isNodeModule ? "package/" : "";
              const _name = getFileNameByPath(name);
              return `assets/[ext]/${subPath}${_name}-[hash].[ext]`;
            }
            const imgExts = ["png", "jpg", "jpeg", "webp", "svg", "gif", "ico"];
            if (imgExts.includes(ext)) return "assets/imgs/[ext]/[name]-[hash].[ext]";
            const fontExts = ["otf", "ttf"];
            if (fontExts.includes(ext)) return "assets/font/[name]-[hash].[ext]";
            return "assets/[ext]/[name]-[hash].[ext]";
          },
        },
      },
    },
  });
};
