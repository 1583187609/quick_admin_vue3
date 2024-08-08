/**
 * 留待观察，后面可能会移除的方法
 */

import fs from "fs";
import path from "path";
import { getInitReadMeFile,docsPath, demosPath, readMeName, splitOrderChar, writeFileSync  } from "./index.js";

/**
 * 递归创建临时目录(同步方法)
 * 注：nodejs不能一次性创建多层目录，需要递归处理
 * @param dirname 多层目录路径 示例： hello/a/b/c
 */
export function mkdirsTempSync(pathStr) {
  pathStr = path.join(process.cwd(), pathStr);
  const newPath = fs.mkdirSync(pathStr, { recursive: true });
  // const newPath = fs.mkdtempSync(pathStr, { recursive: true });
  console.log(newPath, "newPath----------");
  return newPath;
}

/**
 * 根据docs文件目录生成examples的文件目录
 * @param {string} readDir 读取文件夹路径
 * @param {string} writeDir 写入的文件夹路径
 */
export function createDirToExamplesByDocsDirs(readDir = `${docsPath}/2_组件_comp`, writeDir = demosPath) {
  const fullReadDir = path.join(process.cwd(), readDir);
  fs.readdirSync(fullReadDir).forEach(file => {
    const currDirPath = path.join(process.cwd(), writeDir, file);
    fs.readdirSync(path.join(fullReadDir, file)).forEach(f => {
      const fullWriteDir = path.join(process.cwd(), writeDir, file, f).slice(0, -3);
      const isExist = fs.existsSync(fullWriteDir);
      if (!isExist) {
        fs.mkdirSync(fullWriteDir, { recursive: true });
        const title = fullWriteDir.split(splitOrderChar).at(-1);
        const readMeFile = getInitReadMeFile(title);
        writeFileSync(`${fullWriteDir}/${readMeName}`, readMeFile);
      }
    });
  });
}
