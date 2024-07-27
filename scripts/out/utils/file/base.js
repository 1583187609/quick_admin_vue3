/********************************************
 文件处理相关*********************************
 ********************************************/
import fs from "fs";
import path from "path";
import { needParam, typeOf } from "../base";
import { readMeName } from "../consts";

/**
 * 递归创建目录(同步方法)
 * 注：nodejs不能一次性创建多层目录，需要递归处理
 * @param dirname 多层目录路径 示例： hello/a/b/c
 */
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
    fs.readdirSync(folderPath).forEach((file, index) => {
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
 * 根据正则表达式获取部分文件字符串
 * @param {string} readPath 要读取的文件路径
 * @param {string|RegExp} reg 正则表达式的只读字符串或者正则表达式
 * @param {string|false} boundaryChars 边界符号：由起止符号构成
 * @returns 匹配的文件字符串
 */
export function getPartFileStr(readPath = needParam(), reg = needParam(), boundaryChars = false) {
  const isReg = typeOf(reg) === "RegExp";
  const regexp = isReg ? reg : new RegExp(reg);
  const regStr = isReg ? reg.source : reg;
  readPath = path.join(process.cwd(), readPath);
  const fileStr = fs.readFileSync(readPath, "utf-8");
  let matchStr = fileStr.match(regexp)?.[0];
  if (!matchStr) return "";
  if (boundaryChars) {
    const [c1, c2] = boundaryChars;
    const sInd = regStr.indexOf(c1) + 1;
    const eInd = regStr.lastIndexOf(c2) - regStr.length;
    matchStr = matchStr.slice(sInd, eInd).trim();
  }
  return matchStr;
}

/**
 * 根据ts类型名称获取对应的文件片段
 * @param {string} readPath 读取的文件路径。例："/examples/0_示例_demo/ts.ts"
 * @param {string} name ts类型名称。例："type FormItemType"  "interface FormFieldAttrs"
 * @param {boolean} noWrap 是否带壳
 */
function getTsStr(readPath = needParam(), name = needParam(), noWrap = true) {
  const isType = name.startsWith("type");
  if (!isType && !name.startsWith("interface")) throw new Error("ts文件必须以 type 或 interface 开头");
  let boundaryChars = "{}";
  if (noWrap) {
    if (isType) boundaryChars = "=;";
  } else {
    boundaryChars = false;
  }
  const reg = isType ? `${name} =([^;]+);` : `${name} {[^}]+.*?[^}]+}`;
  return getPartFileStr(readPath, reg, boundaryChars);
}

/**
 * 根据ts类型名称获取ts字符串（从vue文件或ts文件中获取）
 * @param {string} readPath 读取文件的路径。例："/src/components/form/BaseForm.vue"
 * @param {defineProps|type +|interface +} name ts类型名称。例"defineProps" "defineEmits" "defineSlots" "defineExpose" "type FormItemType"  "interface FormFieldAttrs"
 * @param {boolean} noWrap 是否去壳
 */
export function getTsStrByName(readPath = needParam(), name = "defineProps", noWrap = false) {
  let boundaryChars = "{}";
  if (!noWrap) boundaryChars = false;
  // 获取vue文件中的 defineProps 或 defineExpose
  if (name.startsWith("define")) {
    const ext = path.extname(readPath).slice(1);
    if (ext !== "vue") throw new Error(`${ext}文件中不存在${ext}文件中的${name}`);
    return getPartFileStr(readPath, `${name}<{([^}]+)}>`, boundaryChars);
  }
  return getTsStr(readPath, name, boundaryChars);
}

/**
 * 更改文件名称
 * @param {string} dirPath 要更改的父文件夹路径
 * @param {string} oldName 旧文件名称
 * @param {string} newName 新文件名称
 */
export function changeFileName(dirPath = "/examples", oldName = readMeName, newName = "Summary") {
  const fullDirPath = path.join(process.cwd(), dirPath);
  const dirNames = fs.readdirSync(fullDirPath);
  dirNames.forEach(file => {
    const currPath = path.join(fullDirPath, file);
    const isDir = fs.lstatSync(currPath).isDirectory();
    if (isDir) {
      changeFileName(`${dirPath}/${file}`, oldName, newName);
    } else {
      const ext = path.extname(file);
      const fileName = path.basename(file, ext); //用第二个参数去掉后缀名
      if (fileName === oldName) {
        const oldPathName = path.join(fullDirPath, file);
        const newPathName = path.join(fullDirPath, newName + ext);
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
export function deleteFileByName(dirPath = "/examples", name = readMeName + ".md") {
  // const fullDirPath = path.join(process.cwd(), dirPath, `/0_示例_demo/1_DemoForm 示例表单/${name}`);
  const fullDirPath = path.join(process.cwd(), dirPath);
  // fs.unlinkSync(fullDirPath);
  const dirNames = fs.readdirSync(fullDirPath);
  dirNames.forEach(file => {
    const currPath = path.join(fullDirPath, file);
    const isDir = fs.lstatSync(currPath).isDirectory();
    if (isDir) {
      deleteFileByName(`${dirPath}/${file}`, name);
    } else {
      if (file === name) {
        console.log(currPath, "currPath--------------");
        // const isExist = fs.existsSync(currPath);
        // isExist && fs.unlinkSync(currPath);
        fs.unlinkSync(currPath);
      }
    }
  });
}
