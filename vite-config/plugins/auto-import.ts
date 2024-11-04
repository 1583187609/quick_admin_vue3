import AutoImport from "unplugin-auto-import/vite";

export default AutoImport({
  imports: ["vue", "vue-router"],
  dts: "types/auto-imports.d.ts",
  // dirs: ['src/stores']
});
