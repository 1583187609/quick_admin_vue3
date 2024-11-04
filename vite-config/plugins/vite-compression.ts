// 可进一步压缩js、css文件大小。原理：gzip
import viteCompression from "vite-plugin-compression";

export default viteCompression({
  ext: ".gz",
  deleteOriginFile: false,
});
// export default viteCompression({
//   ext: '.br',
//   algorithm: 'brotliCompress',
//   deleteOriginFile: false,
// })
