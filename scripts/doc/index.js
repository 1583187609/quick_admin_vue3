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
import { demosPath, docsPath, splitOrderChar } from "./utils/consts.js";
import { upperFirst } from "./utils/base.js";
import { run } from "./utils/file/vue-doc.js";

/**
 * 触发热更新写入新文件的方法
 * @notice 这个方法是为了更改文件触发热更新执行文件重写的
 */
export function hotRun() {}

/***
 * 撰写通用组件文档
 * @param {boolean} withDoc 是否重写组件文档
 * @param {boolean} writeDemo 是否重写示例文档
 * @param {standard|complex|null|undefined|''} demoType 示例类型
 */
function writeCommonTestDocs(withDoc = true, writeDemo = true, demoType = "", dirPath = demosPath) {
  const fullDirPath = path.join(process.cwd(), dirPath);
  const dirNames = fs.readdirSync(fullDirPath);
  dirNames.forEach(parFile => {
    const currPath = path.join(fullDirPath, parFile);
    const isDir = fs.lstatSync(currPath).isDirectory();
    if (!isDir) throw new Error("暂未处理不是文件夹的情况");
    let readDirs = fs.readdirSync(currPath);
    if (writeDemo && parFile === "0_示例_demo") {
      readDirs = fs.readdirSync(currPath).filter(it => !it.startsWith("_"));
      readDirs.forEach(file => {
        if (demoType && !file.includes(upperFirst(demoType))) return;
        const writePath = `${docsPath}/4_示例_demo/2_文档生成_create/${file}.md`;
        const demoPath = `${dirPath}/${parFile}/${file}`;
        writeComponentDoc(writePath, demoPath);
      });
      return;
    }
    if (!withDoc) return;
    readDirs.forEach(file => {
      const writePath = `${docsPath}/2_组件_comp/${parFile}/${file}.md`;
      const demoPath = `${dirPath}/${parFile}/${file}`;
      writeComponentDoc(writePath, demoPath);
    });
  });
}

// writeCommonTestDocs(); //生成组件文档页（通用方法）
// writeCommonTestDocs(false, true, "standard"); //生成组件文档页（通用方法）

// writeTestMdDoc(); //测试生成Md文档页示例

// getTsOrObjStrByNameNew();

run();
