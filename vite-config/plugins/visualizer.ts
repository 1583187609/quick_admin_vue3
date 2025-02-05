import { visualizer } from "rollup-plugin-visualizer";
/**
 * 打包体积可视化面板
 * @link npm 文档链接：https://gitcode.com/btd/rollup-plugin-visualizer/overview
 */
export default () =>
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
  });
