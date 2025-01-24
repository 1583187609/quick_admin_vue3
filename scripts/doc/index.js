/**
 * 用于运行脚本
 */
import fs from "fs";
import path from "path";
import { writeComponentDoc, writeHomMdDoc } from "./create/index.js";
import { demosPath, docsPath, splitOrderChar } from "./utils/consts.js";
import test1 from "../../demos/12_测试_test/1_测试1_test1/index.js";
import test2 from "../../demos/12_测试_test/2_测试2_test2/index.js";
import { deleteRemainDirOrFile } from "./utils/file/handler.js";
import { removeDocFile } from "../remove-doc.js";
import { needParam } from "./utils/base.js";

/**
 * 触发热更新写入新文件的方法
 * @notice 这个方法是为了更改文件触发热更新执行文件重写的
 */
export function hotRun() {}

const testFnMap = {
  0: test1,
  1: test2,
};

// function getDocMdDirFiles(dirPath = needParam(), removeSuffix = ".md") {
//   const isDir = fs.lstatSync(dirPath).isDirectory();
//   if (!isDir) throw new Error(`路径应该为一个文件夹，当前为：${partPath}`);
//   const fileNames = fs.readdirSync(dirPath);
//   if (!removeSuffix) return fileNames;
//   return fileNames.map(it => it.slice(0, removeSuffix.length * -1));
// }

/***
 * 撰写通用组件文档
 * @param {(comp|demo|test)[]} parts 是否重写组件文档
 */
async function writeComponentDocs(parts = [], createHome = false, readDemoPath = demosPath, writeDocPath = docsPath) {
  if (createHome) writeHomMdDoc();
  const fullDemoPath = path.join(process.cwd(), readDemoPath);
  const partNames = fs.readdirSync(fullDemoPath);
  await Promise.all(
    partNames.map(async partName => {
      const name = partName.split(splitOrderChar).at(-1);
      if (parts?.length && !parts.includes(name)) return;
      const partPath = path.join(fullDemoPath, partName);
      const isDir = fs.lstatSync(partPath).isDirectory();
      if (!isDir) throw new Error(`暂未处理不是文件夹的情况：${partPath}`);
      const pageNames = fs.readdirSync(partPath);
      await Promise.all(
        pageNames.map(async (pageName, ind) => {
          if (name === "test") return testFnMap[ind]();
          const pagePath = path.join(partPath, pageName);
          const isDir = fs.lstatSync(pagePath).isDirectory();
          if (!isDir) throw new Error(`暂未处理不是文件夹的情况：${partPath}`);
          const demoFileNames = fs.readdirSync(pagePath).filter(it => !it.startsWith("_"));
          // // 比对docs和demos的文件目录，删除因变动demos内部文件夹名称，导致docs中对应的旧md文件成为无用文件的文件
          // const docMdDirPath = path.join(process.cwd(), `${writeDocPath}/${partName}/${pageName}`);
          // const mdFileNames = getDocMdDirFiles(docMdDirPath);
          // const removeFileNames = [];
          // demoFileNames.forEach((fileName, ind) => {
          //   const findInd = mdFileNames.findIndex(it => it === fileName);
          //   if (findInd === -1) removeFileNames.push(fileName);
          //   mdFileNames.splice(findInd, 1);
          // });
          // // 删除旧的无用md文件
          // if (removeFileNames.length) {
          //   removeFileNames.forEach(name => {
          //     fs.unlinkSync(`${name}.md`);
          //   });
          // }
          await Promise.all(
            demoFileNames.map(async fileName => {
              const mdPath = `${partName}/${pageName}/${fileName}`;
              const writeDocFilePath = `${writeDocPath}/${mdPath}.md`;
              const readDemoDirPath = `${readDemoPath}/${mdPath}`;
              await writeComponentDoc(writeDocFilePath, readDemoDirPath);
            })
          );
        })
      );
    })
  );
}

writeComponentDocs(); //生成组件文档页（通用方法）
// writeComponentDocs(['comp']);
// writeComponentDocs(["demo"]);
// writeComponentDocs(["test"]);

// deleteRemainDirOrFile()
// removeDocFile();
