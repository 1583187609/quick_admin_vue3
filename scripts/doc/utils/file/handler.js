import fs from "fs";
import path from "path";
import { docsPath, demosPath, readMeName } from "../../utils/index.js";

/**
 * 更改文件名称
 * @param {string} dirPath 要更改的父文件夹路径
 * @param {string} oldName 旧文件名称（带后缀名）
 * @param {string} newName 新文件名称（带后缀名）
 */
export function changeFileName(dirPath = demosPath, oldName = readMeName, newName = "Summary.md") {
  const fullDirPath = path.join(process.cwd(), dirPath);
  const dirNames = fs.readdirSync(fullDirPath);
  dirNames.forEach(file => {
    const currPath = path.join(fullDirPath, file);
    const isDir = fs.lstatSync(currPath).isDirectory();
    if (isDir) {
      changeFileName(`${dirPath}/${file}`, oldName, newName);
    } else {
      const fileName = path.basename(file); //用第二个参数去掉后缀名
      if (fileName === oldName) {
        const oldPathName = path.join(fullDirPath, file);
        const newPathName = path.join(fullDirPath, newName);
        fs.renameSync(oldPathName, newPathName);
      }
    }
  });
}

/**
 * 递归删除某个文件夹下的指定名称的文件
 * @param {string} dirPath 目录路径
 * @param {string} name 要递归删除的文件名
 */
export function deleteFileByName(dirPath = demosPath, name = readMeName) {
  const fullDirPath = path.join(process.cwd(), dirPath);
  const dirNames = fs.readdirSync(fullDirPath);
  dirNames.forEach(file => {
    const currPath = path.join(fullDirPath, file);
    const isDir = fs.lstatSync(currPath).isDirectory();
    if (isDir) {
      deleteFileByName(`${dirPath}/${file}`, name);
    } else {
      if (file === name) {
        fs.unlinkSync(currPath);
      }
    }
  });
}

/**
 * 删除多余的文件
 * @param {string} byDirPath 参照（依据）文件夹路径
 * @param {string} delDirPath 要删除的文件所在文件夹的路径
 */
export function deleteRemainFile(byDirPath = demosPath, delDirPath = docsPath) {
  //待完善
}
