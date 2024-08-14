import fs from "fs";
import path from "path";
import { docsPath, demosPath, readMeName, needParam } from "../../utils/index.js";

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
 * 判断是否是绝对路径
 * @param {string} pathStr 路径
 * @returns {boolean} 是否是绝对路径
 */
export function isAbsPath(pathStr="") {
  if(!pathStr) return false;
  // 正则表达式匹配Windows风格的绝对路径，如"C:\path\to\file"
  const windowsReg = /^[A-Za-z]:\\[^?<>:"*|]+$/;
  // 正则表达式匹配UNIX风格的绝对路径，如"/path/to/file"
  // const unixReg = /^\/[^?<>:"*|]+$/;
  return windowsReg.test(path); // || unixReg.test(path);
}

/**
 * 获取完整路径（绝对路径）
 * @param {string} pathStr 绝对或相对路径
 * @returns {string} 绝对路径
 */
export function getFullPath(pathStr = needParam()){
  return isAbsPath(pathStr) ? pathStr : path.join(process.cwd(),pathStr);
}

/**
 * 删除文件或递归删除目录(同步方法)
 * 注：nodejs不能一次性删除多层目录，需要递归处理
 * @param dirOrFilePath 多层目录路径 示例： hello/a/b/c
 * @param isDelSelf 是否删除自身文件夹，及目录路径的最后一级为空文件夹时，是否删除
 */
export function deleteDirOrFileSync(dirOrFilePath="", isDelSelf = true) {
  if(!dirOrFilePath) return;
  const dirOrFilePathFull = getFullPath(dirOrFilePath);
  if (!fs.existsSync(dirOrFilePathFull)) return;
  const isDir = fs.lstatSync(dirOrFilePathFull).isDirectory();
  if(!isDir) return fs.unlinkSync(dirOrFilePathFull);
  fs.readdirSync(dirOrFilePathFull).forEach(file => {
      const curPath = path.join(dirOrFilePathFull, file);
      const isDir = fs.lstatSync(curPath).isDirectory();
      if (isDir) return deleteDirOrFileSync(curPath, true); // 如果是文件夹则递归删除
      return fs.unlinkSync(curPath); // 如果是文件则直接删除
  });
  isDelSelf && fs.rmdirSync(dirOrFilePathFull); // 删除空文件夹
}

/**
 * 删除多余的文件或文件夹
 * @param {string} toDirPath 要做删除处理的文件夹的路径
 * @param {string} byDirPath 作删除参照依据的文件夹路径
 */
export function deleteRemainDirOrFile(toDirPath = `${docsPath}/2_组件_comp`, byDirPath = `${demosPath}/2_组件_comp`) {
  const toPathFull = isAbsPath ? toDirPath : path.join(process.cwd(), toDirPath);
  const byPathFull = isAbsPath ? byDirPath : path.join(process.cwd(), byDirPath);
  if(!toPathFull) return;
  if(!fs.existsSync(byPathFull)) return deleteDirOrFileSync(toPathFull); //判断文件或文件夹是否存在
  const isDir = fs.lstatSync(toPathFull).isDirecbyry();
  if(!isDir) {
    if(!fs.existsSync(byPathFull)) deleteDirOrFileSync(toPathFull);
    return;
  }
  const dirNames = fs.readdirSync(toPathFull);
  dirNames.forEach((dirName)=>{
    const toCurrPath = path.join(toPathFull, dirName);
    const byCurrPath = path.join(byPathFull, dirName);
    deleteRemainDirOrFile(toCurrPath, byCurrPath)
  })
}
