/**
 * 用于运行脚本
 */

// export enum OrderDropKeyEnum {
//   OrderType = '订单类型'
// }
// export type OrderDropListRes = {
//   [k in keyof typeof OrderDropKeyEnum]: OrderDropItem[];
// };

import fs from "fs";
import path from "path";
import { writeComponentDoc, writeTestMdDoc } from "./create/index.js";
import { docsPath, splitOrderChar } from "./utils/consts.js";

/**
 * 触发热更新写入新文件的方法
 * @notice 这个方法是为了更改文件触发热更新执行文件重写的
 */
export function hotRun() {}

/***
 * 撰写通用组件文档
 */
function writeCommonTestDocs(dirPath = "/examples", writeDemo = true, withDoc = false) {
  const fullDirPath = path.join(process.cwd(), dirPath);
  const dirNames = fs.readdirSync(fullDirPath);
  dirNames.forEach(parFile => {
    if (parFile === "0_示例_demo" && writeDemo) {
      return writeComponentDoc(
        `${docsPath}/4_示例_demo/2_文档生成_create/1_DemoForm 示例表单.md`,
        `${dirPath}/0_示例_demo/1_DemoForm 示例表单`,
        `${dirPath}/0_示例_demo/DemoForm.vue`,
        `${dirPath}/0_示例_demo/ts.ts`
      );
    }
    if (!withDoc) return;
    const currPath = path.join(fullDirPath, parFile);
    const isDir = fs.lstatSync(currPath).isDirectory();
    if (!isDir) throw new Error("暂未处理不是文件夹的情况");
    const enName = parFile.split(splitOrderChar).at(-1);
    fs.readdirSync(currPath).forEach(file => {
      const demoPath = `${dirPath}/${parFile}/${file}`;
      const writePath = `${docsPath}/2_组件_comp/${parFile}/${file}.md`;
      if (enName === "form") {
        const apiPath = "/src/components/form/BaseForm.vue";
        const tsPath = "/src/components/form/_types.ts";
        writeComponentDoc(writePath, demoPath, apiPath, tsPath);
      } else {
        writeComponentDoc(writePath, demoPath);
      }
    });
  });
}

writeCommonTestDocs(); //生成组件文档页（通用方法）

// writeTestMdDoc(); //测试生成Md文档页示例
