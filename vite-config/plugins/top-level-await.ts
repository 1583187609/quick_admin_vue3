import topLevelAwait from "vite-plugin-top-level-await";

// 可选配置项
export default topLevelAwait({
  promiseExportName: "__tla",
  promiseImportName: i => `__tla_${i}`,
});
