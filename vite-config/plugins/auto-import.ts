import AutoImport from "unplugin-auto-import/vite";

export default AutoImport({
  // dirs: ['src/stores']
  imports: ["vue", "vue-router"],
  dts: "types/auto-imports.d.ts",
  eslintrc: {
    enabled: true,
    filepath: "types/.eslintrc-auto-import.json",
    globalsPropValue: true,
  },
});
