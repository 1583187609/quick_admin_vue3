/********************************************
 ***************** 文件处理相关 **************
 ********************************************/
import fs from "fs";
import path from "path";
import { docsPath, demosPath, readMeName } from "../../utils/index.js";

/**
 * 获取字符串中目标字符中最先出现的那个字符的下标（会忽略后半截的注释部分）
 * @param {string} str 要查找的字符串
 * @param {string|string[]} chars 目标字符,可以为数组或字符串
 * @param {boolean} isLast 是否使用 lastIndexOf 查找
 */
export function getIndexIgnoreAnno(str, chars = "", isLast = false) {
  if (typeof chars === "string") chars = chars.split("");
  let index = -1;
  for (let i = 0; i < chars.length; i++) {
    const isMeetAnno = chars[i] === "/" && chars[i + 1] === "/";
    if (isMeetAnno) return index;
    const ind = str[isLast ? "lastIndexOf" : "indexOf"](chars[i]);
    if (ind === -1) continue;
    if (index === -1) {
      index = ind;
      continue;
    }
    if (ind < index) index = ind;
  }
  return index;
}

/**
 * 递归创建目录(同步方法)
 * 注：nodejs不能一次性创建多层目录，需要递归处理
 * @param dirname 多层目录路径 示例： hello/a/b/c
 */
// export function mkdirsSync(dirname, recursive = true) {
//   fs.mkdirSync(dirname, { recursive });
// }
export function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

/**
 * 递归删除目录(同步方法)
 * 注：nodejs不能一次性删除多层目录，需要递归处理
 * @param folderPath 多层目录路径 示例： hello/a/b/c
 * @param isDelSelf 是否删除自身文件夹，及目录路径的最后一级为空文件夹时，是否删除
 */
export function deleteFolderSync(folderPath, isDelSelf = true) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach(file => {
      const curPath = path.join(folderPath, file);
      const isDir = fs.lstatSync(curPath).isDirectory();
      // 如果是文件夹则递归删除
      if (isDir) return deleteFolderSync(curPath, true);
      // 如果是文件则直接删除
      return fs.unlinkSync(curPath);
    });
    isDelSelf && fs.rmdirSync(folderPath); // 删除空文件夹
  }
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
 * 往文件中固定的行写入数据，但不执行写入文件操作（同步）
 * @param file string 文件路径或文件数据
 * @param aimStr string 指定行的字符串，在其后添加一行
 * @param isFile boolean 是否是文件
 * @return 返回添加行数据之后的文件数据字符串
 */
export function addToFileLineSync(file = "", aimStr = "", addLines = [], isFile = false) {
  const splitReg = /\r\n|\n|\r/gm;
  const fileStr = isFile ? fs.readFileSync(file, "utf8") : file;
  const lines = fileStr.split(splitReg);
  let ind = lines.findIndex(it => it.replace(/ +/g, "").includes(aimStr)) + 1;
  if (ind === -1) {
    ind = lines.length - 1;
  }
  lines.splice(ind, 0, ...addLines);
  return lines.join("\r\n");
}

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