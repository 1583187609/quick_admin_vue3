import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";
import imageminPlugin from "vite-plugin-imagemin"; //将图片转为体积占用更小的图片存储方式
import { visualizer } from "rollup-plugin-visualizer";
import GenerateComponentName from "unplugin-generate-component-name/vite"; //npm 地址：https://www.npmjs.com/package/unplugin-generate-component-name
import pkg from "./package.json";
import { toCamelCase } from "./src/components/_utils/common/_init";
import viteCompression from "vite-plugin-compression"; //可进一步压缩js、css文件大小。原理：gzip
// import { autoComplete, Plugin as importToCDN } from "vite-plugin-cdn-import";
// import { createHtmlPlugin } from "vite-plugin-html";

const outDirPath = path.resolve(__dirname, "../online-preview/vue");
/**
 * 根据地址获取文件名称
 * @param path 地址路径
 * @param char 分割字符串依赖的符号
 * @returns
 */
function getFileNameByPath(path: string, char = "/") {
  const lastInd = path.lastIndexOf(char);
  const lastDotInd = path.lastIndexOf(".");
  const name = path.substring(lastInd + 1, lastDotInd);
  if (name !== "index" && name !== "Index") return name;
  const secondInd = path.lastIndexOf(char, lastInd - 1);
  return path.substring(secondInd + 1, lastInd) || name;
}
// https://vitejs.dev/config/
export default ({ mode, command }) => {
  // const env = loadEnv(mode, process.cwd(), ''); // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: "./", //表示应用程序的根目录。如果你的应用程序部署在域名的根目录下，你不需要修改 base 的值。
    // root: "./src/pages", // 项目根目录
    plugins: [
      vue(),
      // 自动给组件命名
      GenerateComponentName({
        include: ["**/*.vue"],
        enter: [
          //全局的基础组件的命名规则：根据文件或父级文件夹名称命名
          {
            include: ["src/components/**/*.vue"],
            genComponentName: (res) => {
              const { attrName, dirname, originalName } = res;
              if (attrName) return attrName;
              if (originalName === "Index" || originalName === "index")
                return toCamelCase(dirname, true);
              return originalName;
            },
          },
          //页面组件的命名规则：根据路径来命名(以index.vue作为文件名的)
          {
            include: ["src/views/**/index.vue"],
            genComponentName: (res) => {
              const { attrName, filePath, originalName, dirname } = res;
              if (attrName) return attrName;
              const name = filePath.split("/views/")[1].slice(0, -10);
              return toCamelCase(name, true);
            },
          },
          //页面组件的命名规则：根据路径来命名(以非index.vue作为文件名的，且首字母小写)
          {
            exclude: ["src/views/**/index.vue"],
            include: ["src/views/**/*.vue"],
            genComponentName: (res) => {
              const { attrName, filePath, originalName, dirname } = res;
              if (attrName) return attrName;
              const afterPath = filePath.split("/views/")[1];
              // const code = afterPath.slice(afterPath.lastIndexOf("/")+1).charCodeAt(0)
              // const isPage = code>=97 && code <=122;
              const name = afterPath.slice(0, -4);
              return toCamelCase(name, true);
            },
          },
        ],
      }),

      //vite mock 参考地址：http://events.jianshu.io/p/8ce94077af2a
      viteMockServe({
        // ignore?: RegExp | ((fileName: string) => boolean);
        // ignoreFiles?: string[];
        // configPath?: string;
        // injectFile?: string;
        // injectCode?: string;
        // logger?:boolean;
        mockPath: "mock", //解析根目录下的mock文件夹
        localEnabled: true, // 开发打包开关
        prodEnabled: true, // 生产打包开关
        supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
        watchFiles: true, // 监视文件更改
      }),
      // vite html ejs 参考：https://www.jianshu.com/p/77cceaaa4723
      // createHtmlPlugin({
      //   minify: true,
      //   // entry: 'src/main.ts', //在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
      //   // template: 'public/index.html', //如果想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
      //   // 需要注入 index.html ejs 模版的数据
      //   inject: {
      //     data: {
      //       title: "后台管理模板",
      //       // injectScript: `<script src="./inject.js"></script>`,
      //     },
      //   },
      // }),
      // eslint 插件
      // eslintPlugin({
      //   include: ["src/**/*.ts", "src/**/*.vue", "src/*.ts", "src/*.vue"],
      // }),
      // 将图片转换为 WebP 格式 压缩算法和格式来减小文件大小
      imageminPlugin({
        gifsicle: { optimizationLevel: 3 }, // 配置 GIF 优化选项
        optipng: { optimizationLevel: 5 }, // 配置 PNG 优化选项
        webp: { quality: 75 }, // 配置 WebP 转换选项
      }),
      /**
       * @link 参考链接：https://blog.csdn.net/qq_23858785/article/details/130107095
       * @example prodUrl: 'https://cdn.jsdelivr.net/npm/{name}@{version}/{path}',
       */
      // importToCDN({
      //   modules: [
      //     {
      //       name: "vue",
      //       var: "Vue",
      //       path: `https://unpkg.com/vue@3.3.4`,
      //     },
      //     {
      //       name: "vue-demi",
      //       var: "VueDemi",
      //       path: `https://unpkg.com/vue-demi@0.14.7`,
      //     },
      //     // {
      //     //   name: "vue-router",
      //     //   var: "VueRouter",
      //     //   path: `https://unpkg.com/vue-router@4.2.4`,
      //     // },
      //     // {
      //     //   name: "axios",
      //     //   var: "axios",
      //     //   path: "https://unpkg.com/axios@1.3.2",
      //     // },
      //     // {
      //     //   name: "dayjs",
      //     //   var: "dayjs",
      //     //   path: "https://unpkg.com/dayjs@1.11.7",
      //     // },
      //     // {
      //     //   name: "driver",
      //     //   var: "driver",
      //     //   path: "https://unpkg.com/driver@1.3.1",
      //     // },
      //     // {
      //     //   name: "echarts",
      //     //   var: "echarts",
      //     //   path: "https://unpkg.com/echarts@5.4.1",
      //     // },
      //     // {
      //     //   name: "echarts-liquidfill",
      //     //   var: "EchartsLiquidfill",
      //     //   path: "https://unpkg.com/echarts-liquidfill@3.1.0",
      //     // },
      //     // {
      //     //   name: "lodash",
      //     //   var: "_",
      //     //   path: "https://unpkg.com/lodash@4.17.21",
      //     // },
      //     // {
      //     //   name: "sortablejs",
      //     //   var: "Sortable",
      //     //   path: "https://unpkg.com/sortablejs@1.15.2",
      //     // },
      //     // {
      //     //   name: "vuedraggable",
      //     //   var: "vuedraggable",
      //     //   path: "https://unpkg.com/vuedraggable@4.1.0",
      //     // },
      //     // {
      //     //   name: "xlsx",
      //     //   var: "XLSX",
      //     //   path: "https://unpkg.com/xlsx@0.18.5",
      //     // },
      //     //// npm 包跟 cdn 的有些许差别，暂时不予引用（cdn的包会对type为primary的进行警告，提示应写成 ""）
      //     // {
      //     //   name: "element-plus",
      //     //   var: "ElementPlus",
      //     //   path: "https://unpkg.com/element-plus@2.3.8/dist/index.full.js",
      //     //   // css: 'https://unpkg.com/element-plus@2.3.8/dist/index.css', //需要cdn就把此处注释放开
      //     // },
      //     // {
      //     //   name: "vite-plugin-mock",
      //     //   var: "VitePluginMock",
      //     //   path: "https://unpkg.com/vite-plugin-mock@2.9.6",
      //     // },
      //     // {
      //     //   name: "vue-i18n",
      //     //   var: "I18nN",
      //     //   path: "https://unpkg.com/vue-i18n@2.3.8",
      //     // },
      //   ],
      // }),
      viteCompression({
        ext: ".gz",
        deleteOriginFile: false,
      }),
      // viteCompression({
      //   ext: '.br',
      //   algorithm: 'brotliCompress',
      //   deleteOriginFile: false,
      // }),
      /**
       * 打包体积可视化面板
       * @link npm 文档链接：https://gitcode.com/btd/rollup-plugin-visualizer/overview
       */
      visualizer({
        open: true, //默认为false，构建完成后是否自动从浏览器打开
        title: "文件体积分析",
        //注：使用 outDirPath 会导致打包失败，故暂时使用手动复制粘贴方式到 outDirPath 中
        filename: "./public/stats.html", //默认文件名为 stats.html，打包输出的文件名称
        gzipSize: true, //默认false，是否显示gzip压缩之后的大小
        brotliSize: true, //默认false
        // projectRoot: "./dist", //默认值：process.cwd()
        // template: 'treemap', //默认：treemap。输出模板，可选值：sunburst, treemap, network, raw-data, list
        // include: undefined,
        // exclude: undefined,
        // emitFile: false,
        // sourcemap: false,
        // Filter: { bundle: picomatchPattern, file: picomatchPattern },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "#": path.resolve(__dirname, ""),
        mock: path.join(__dirname, "mock"),
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
      open: true,
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
      // outDir: mode === "production" ? "dist" : `dist-${mode}`,
      outDir: outDirPath,
      // 压缩和混淆代码：使用 Vite 的内置压缩工具（例如 Terser）对打包后的代码进行压缩和混淆，以减小文件大小并提高加载速度。可以通过在 vite.config.js 中设置 build.minify 选项来启用压缩
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true, // 去掉console.log
          drop_debugger: true,
        },
      },
      sourcemap: mode !== "production",
      // assetsInlineLimit: 4096, // 默认4096
      // cssCodeSplit: false, //默认为true，当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时一并获取。
      reportCompressedSize: false, //启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      chunkSizeWarningLimit: 1000, //打包最大体积警告
      rollupOptions: {
        //以下文件不打包
        // external: [
        //   "vue",
        //   "element-plus",
        //   "@element-plus/icons-vue",
        //   "vuex",
        //   "axios",
        //   "vue-router",
        //   "echarts",
        // ],
        output: {
          //进行分包优化
          manualChunks(id) {
            if (id.includes("/mock/")) return "mock";
            if (id.includes("node_modules")) {
              return id.split("node_modules/")[1].split("/")[0];
            }
          },
          // 分文件夹进行分包优化
          entryFileNames: "assets/js/[name]-[hash].js",
          chunkFileNames: "assets/js/[name]-[hash].js",
          // assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          assetFileNames(info) {
            const { name } = info;
            const ext = path.extname(name).slice(1);
            if (["css", "js", "vue"].includes(ext)) {
              //wangEditor包的名字中带有/，所以需要处理下
              const packages = Object.keys(pkg.dependencies).map(
                (key) => key.split("/")[0]
              );
              // if (ext === "vue" || ext === "js") {
              //   console.log(info, packages, "info-------------------------");
              // }
              const isNodeModule = packages.some((it) => name.startsWith(it));
              const subPath = isNodeModule ? "package/" : "";
              const _name = getFileNameByPath(name);
              return `assets/[ext]/${subPath}${_name}-[hash].[ext]`;
            }
            const imgExts = ["png", "jpg", "jpeg", "webp", "svg", "gif", "ico"];
            if (imgExts.includes(ext))
              return "assets/imgs/[ext]/[name]-[hash].[ext]";
            const fontExts = ["otf", "ttf"];
            if (fontExts.includes(ext))
              return "assets/font/[name]-[hash].[ext]";
            return "assets/[ext]/[name]-[hash].[ext]";
          },
        },
      },
    },
  });
};
