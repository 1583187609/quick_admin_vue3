//vite mock 参考地址：http://events.jianshu.io/p/8ce94077af2a
import { viteMockServe } from "vite-plugin-mock";

export default viteMockServe({
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
});
