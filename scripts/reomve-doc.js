/********************************************
 ******* 删除docs文档相关的文件、文件夹 *******
 ********************************************/
import fs from "fs";
import path from "path";
import { getFullPath } from "./doc/utils";

/**
 * 判断是否是绝对路径
 * @param {string} pathStr 路径
 * @returns {boolean} 是否是绝对路径
 */
export function isAbsPath(pathStr = "") {
  if (!pathStr) return false;
  // 正则表达式匹配Windows风格的绝对路径，如"C:\path\to\file"
  const windowsReg = /^[A-Za-z]:\\[^?<>:"*|]+$/;
  // 正则表达式匹配UNIX风格的绝对路径，如"/path/to/file"
  // const unixReg = /^\/[^?<>:"*|]+$/;
  return windowsReg.test(path); // || unixReg.test(path);
}

/**
 * 删除文件或递归删除目录(同步方法)
 * 注：nodejs不能一次性删除多层目录，需要递归处理
 * @param dirOrFilePath 多层目录路径 示例： hello/a/b/c
 * @param isDelSelf 是否删除自身文件夹，及目录路径的最后一级为空文件夹时，是否删除
 */
export function deleteDirOrFileSync(dirOrFilePath = "", isDelSelf = true) {
  if (!dirOrFilePath) return;
  const dirOrFilePathFull = getFullPath(dirOrFilePath);
  if (!fs.existsSync(dirOrFilePathFull)) return;
  const isDir = fs.lstatSync(dirOrFilePathFull).isDirectory();
  if (!isDir) return fs.unlinkSync(dirOrFilePathFull);
  fs.readdirSync(dirOrFilePathFull).forEach(file => {
    const curPath = path.join(dirOrFilePathFull, file);
    const isDir = fs.lstatSync(curPath).isDirectory();
    if (isDir) return deleteDirOrFileSync(curPath, true); // 如果是文件夹则递归删除
    return fs.unlinkSync(curPath); // 如果是文件则直接删除
  });
  isDelSelf && fs.rmdirSync(dirOrFilePathFull); // 删除空文件夹
}

/**
 * 写入文件
 * @param writePath string
 * @param writeStr string 写入的文件内容
 * @param encoding 编码格式
 * @return error 错误信息，如果没有错误，则为null
 */
export function writeFileSync(writePath, writeStr, showSuccess = false, encoding = "utf-8") {
  const basename = path.basename(writePath);
  const isSuccess = mkdirsSync(writePath.replace(basename, ""));
  if (isSuccess) {
    const err = fs.writeFileSync(writePath, writeStr, encoding);
    if (err) {
      console.log(writePath + "写入失败", err);
    } else {
      showSuccess && console.log(writePath + "写入成功！");
    }
    return err;
  } else {
    console.log("创建文件目录失败");
    return { err: "创建文件目录失败" };
  }
}

/**
 * 移除docs文档相关的文件、文件夹、包名称等
 * @param {string[]} dirs 根级文件或文件夹
 * @param {string[]} packageNames 包名
 */
const cachePath = "/_cache"; //缓存路径
const vitepressPath = "/.vitepress";
const docsPath = "/docs"; //文档路径
const demosPath = "/demos"; //示例路径
const scriptPath = "/scripts/doc";
const listMdPath = "/_Docs_List.md";
const defDirs = [cachePath, vitepressPath, docsPath, demosPath, scriptPath, listMdPath];
const defPackageNames = [
  "doc",
  "docs:dev",
  "docs:build",
  "docs:preview",
  "@mdit-vue/shared",
  "markdown-it",
  "markdown-it-container",
  "vue-docgen-api",
];
export function removeDocFile(dirs = defDirs, packageNames = defPackageNames) {
  dirs.forEach(dirPath => deleteDirOrFileSync(dirPath));
  const pkgPath = path.join(process.cwd(), "/package.json");
  const pkgFileStr = fs.readFileSync(pkgPath);
  const lines = pkgFileStr.split("/n").filter(line => {
    let key = line.split(":")[0];
    if (!key) return true;
    const name = key.trim().slice(1, -1);
    return !packageNames.includes(name);
  });
  writeFileSync(pkgPath, lines.join("/n"));
}
// removeDocFile();
