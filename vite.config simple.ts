import { defineConfig, loadEnv } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const isProd = mode === "production";
  return defineConfig({
    base: "./",
    plugins: [vue()],
    resolve: {
      alias: {
        // 放在根目录下时
        "@": path.resolve(__dirname, "src"),
        "#": path.resolve(__dirname, ""),
        mock: path.join(__dirname, "mock"),
        // 放在根目录下的 plugins/index.ts时
        // "@": path.resolve(__dirname, "../src"),
        // "#": path.resolve(__dirname, ".."),
        // mock: path.join(__dirname, "../mock"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 暂时消除警告：Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0. More info: https://sass-lang.com/d/legacy-js-api
          api: "modern",
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
      // open: !isVitepress,
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
        // external: isVitepress ? undefined : useCdnImport ? external : undefined,
        // onwarn(warning, rollupWarn) {
        //   if (closeWarn) return; // 关闭所有警告信息
        //   // // 跳过指定类型的警告
        //   // if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
        //   // // 抛出其他类型的警告，使用 Object.assign 拷贝 new Error(warning.message)，将使命令行打印额外的信息，如警告位置，和帮助 URL。
        //   // if (warning.code === "MISSING_EXPORT") throw Object.assign(new Error(), warning);
        //   // // 使用默认处理函数兜底
        //   // rollupWarn(warning);
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
        },
      },
    },
  });
};
