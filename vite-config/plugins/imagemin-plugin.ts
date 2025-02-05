// 将图片转换为 WebP 格式 压缩算法和格式来减小文件大小

import imageminPlugin from "vite-plugin-imagemin"; //将图片转为体积占用更小的图片存储方式

export default imageminPlugin({
  gifsicle: { optimizationLevel: 3 }, // 配置 GIF 优化选项
  optipng: { optimizationLevel: 5 }, // 配置 PNG 优化选项
  webp: { quality: 75 }, // 配置 WebP 转换选项
});
