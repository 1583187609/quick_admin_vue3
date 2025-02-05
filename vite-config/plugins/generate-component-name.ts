// npm 地址：https://www.npmjs.com/package/unplugin-generate-component-name
import GenerateComponentName from "unplugin-generate-component-name/vite";
import { toCamelCase } from "../utils";

const dirs = ["views", "modules"];
const splitReg = new RegExp(dirs.map(it => `/${it}/`).join("|"));

// 自动给组件命名
export default GenerateComponentName({
  include: ["**/*.vue"],
  enter: [
    //全局的基础组件的命名规则：根据文件或父级文件夹名称命名
    {
      include: ["src/components/**/*.vue"],
      genComponentName: res => {
        const { attrName, dirname, originalName } = res;
        if (attrName) return attrName;
        if (originalName === "Index" || originalName === "index") return toCamelCase(dirname, true);
        return originalName;
      },
    },
    //页面组件的命名规则：根据路径来命名(以index.vue作为文件名的)
    {
      include: dirs.map(it => `src/${it}/**/index.vue`),
      genComponentName: res => {
        const { attrName, filePath, originalName, dirname } = res;
        if (attrName) return attrName;
        const name = filePath.split(splitReg)[1].slice(0, -10);
        return toCamelCase(name, true);
      },
    },
    //页面组件的命名规则：根据路径来命名(以非index.vue作为文件名的，且首字母小写)
    {
      exclude: dirs.map(it => [`src/${it}/**/index.vue`, `src/${it}/**/_components/**/*.vue`]).flat(1),
      include: dirs.map(it => `src/${it}/**/*.vue`),
      genComponentName: res => {
        const { attrName, filePath, originalName, dirname } = res;
        if (attrName) return attrName;
        const afterPath = filePath.split(splitReg)[1];
        // const code = afterPath.slice(afterPath.lastIndexOf("/")+1).charCodeAt(0)
        // const isPage = code>=97 && code <=122;
        const name = afterPath.slice(0, -4);
        return toCamelCase(name, true);
      },
    },
  ],
});
