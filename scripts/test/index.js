// 参考博客：https://blog.csdn.net/web2022050901/article/details/126431961
import { readFile, readFileSync, writeFile } from "fs";
import {
  parse,
  compileScript,
  compileTemplate,
  compileStyle,
  rewriteDefault,
} from "@vue/compiler-sfc";
import {
  toDisplayString as _toDisplayString,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
} from "vue";
import { writeFileSync } from "../api/utils/common.js";
import { build } from "esbuild";

const name = "Test";

const file = readFileSync(
  `src/html-doc/views/home/base-form/_components/${name}.vue`,
  "utf-8"
);
const { descriptor, errors } = parse(file, {});

// 这个 id 是 scopeId，用于 css scope，保证唯一即可
const id = Date.now().toString();
const scopeId = `data-v-${id}`;
// 编译 script，因为可能有 script setup，还要进行 css 变量注入
const script = compileScript(descriptor, { id: scopeId });

// 编译模板，转换成 render 函数
const template = compileTemplate({
  // id: scopeId,
  source: descriptor?.template?.content,
  filename: `${name}.vue`,
});

const styles = [];
// 一个 Vue 文件，可能有多个 style 标签
for (const styleBlock of descriptor.styles) {
  const styleCode = compileStyle({
    source: styleBlock.content,
    id, // style 的 scope id，
    filename: `${name}.vue`,
    scoped: styleBlock.scoped,
  });
  styles.push(styleCode);
}
const style = styles.join("\n");

// // 给 Vue 对象设置 render 函数
// script.render = render;
// // 设置一些组件的信息，用于开发环境
// script.__file = "example.vue";
// script.__scopeId = "xxxxxx";
// // 这里还可以加入其它代码，例如热更新

// console.log(template, "print-------------------------");

const codeList = [];
codeList.push(script.content);
codeList.push(template.code);
const codeStr = codeList.join("\n");
writeFileSync("scripts/test/data.js", codeStr);

// build({
//   entryPoints: ["scripts/test/data.js"],
//   // 入口文件format: "esm",
//   // 打包成 esmoutfile: "bundle.js",
//   // 设置打包文件的名字bundle: true,
//   // bundle 为 true 才是打包模式external: ["vue"],plugins: [externalGlobalPlugin({vue: "window.Vue",
//   // 将 import vue 模块，替换成 window.Vue}),],
// });

// 用于存放代码，最后 join('\n') 合并成一份完整代码
// const codeList = [];
// codeList.push(rewriteDefault(script.content, "__sfc_main__")); // 重写 default
// codeList.push(`__sfc_main__.__scopeId='${scopeId}'`);

// codeList.push(template.code);
// codeList.push(`__sfc_main__.render=render`);
// codeList.push(`export default __sfc_main__`);
// const codeStr = codeList.join("\n");
// writeFileSync("scripts/test/data-1.js", codeStr);

// import { build } from "esbuild";
// // import { externalGlobalPlugin } from "esbuild-plugin-external-global";

// await build({
//   entryPoints: ["scripts/test/data.js"],
//   outfile: "scripts/test/bundle.js",
//   bundle: true,
//   format: "esm", //cjs esm
//   // esmoutfile: "scripts/test/bundle.js",
//   // 打包成 esmoutfile: "bundle.js",
//   // 设置打包文件的名字bundle: true,
//   // bundle 为 true 才是打包模式external: ["vue"],plugins: [externalGlobalPlugin({vue: "window.Vue",
//   // 将 import vue 模块，替换成 window.Vue}),],
// });
// await build({
//   entryPoints: ["scripts/test/data-1.js"], // 入口文件format: "esm",			// 打包成 esmoutfile: "bundle.js",		// 设置打包文件的名字bundle: true,				// bundle 为 true 才是打包模式external: ["vue"],plugins: [externalGlobalPlugin({vue: "window.Vue",	// 将 import vue 模块，替换成 window.Vue}),],
// });
// console.log(codeStr, "codeStr-------------------");
