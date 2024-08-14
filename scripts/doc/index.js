/**
 * 用于运行脚本
 */
import fs from "fs";
import path from "path";
import { writeComponentDoc, writeHomMdDoc } from "./create/index.js";
import { demosPath, docsPath, splitOrderChar } from "./utils/consts.js";
import test1 from "../../demos/5_测试_test/1_测试1_test1/index.js";
import test2 from "../../demos/5_测试_test/2_测试2_test2/index.js";
import { deleteRemainDirOrFile } from "./utils/file/handler.js";
import { removeDocFile } from "../reomve-doc.js";

/**
 * 触发热更新写入新文件的方法
 * @notice 这个方法是为了更改文件触发热更新执行文件重写的
 */
export function hotRun() {}

const testFnMap = {
  0: test1,
  1: test2,
};

/***
 * 撰写通用组件文档
 * @param {(comp|demo|test)[]} parts 是否重写组件文档
 */
async function writeComponentDocs(parts = []) {
  const fullDemoPath = path.join(process.cwd(), demosPath);
  const partNames = fs.readdirSync(fullDemoPath);
  await Promise.all(
    partNames.map(async partName => {
      const name = partName.split(splitOrderChar).at(-1);
      if (parts?.length && !parts.includes(name)) return;
      const partPath = path.join(fullDemoPath, partName);
      const isDir = fs.lstatSync(partPath).isDirectory();
      if (!isDir) throw new Error("暂未处理不是文件夹的情况");
      const pageNames = fs.readdirSync(partPath);
      await Promise.all(
        pageNames.map(async (pageName, ind) => {
          if (name === "test") {
            testFnMap[ind]();
            return;
          }
          const pagePath = path.join(partPath, pageName);
          const isDir = fs.lstatSync(pagePath).isDirectory();
          if (!isDir) throw new Error("暂未处理不是文件夹的情况");
          const fileNames = fs.readdirSync(pagePath).filter(it => !it.startsWith("_"));
          await Promise.all(
            fileNames.map(async fileName => {
              const midPath = `${partName}/${pageName}/${fileName}`;
              const writeFilePath = `${docsPath}/${midPath}.md`;
              const readDemoPath = `${demosPath}/${midPath}`;
              await writeComponentDoc(writeFilePath, readDemoPath);
            })
          );
        })
      );
    })
  );
}

// writeHomMdDoc();
writeComponentDocs(); //生成组件文档页（通用方法）
// writeComponentDocs(['comp']);
// writeComponentDocs(['demo']);
// writeComponentDocs(["test"]);

// deleteRemainDirOrFile()
// removeDocFile();