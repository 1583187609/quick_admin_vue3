/********************************************
 文件处理相关*********************************
 ********************************************/
import fs from "fs";
import path from "path";
import { camelCase, needParam, typeOf } from "../base";
import { readMeName } from "../consts";

/**
 * 获取字符串中目标字符中最先出现的那个字符的下标
 * @param {string} str 要查找的字符串
 * @param {string|string[]} chars 目标字符,可以为数组或字符串
 * @param {boolean} isLast 是否使用 lastIndexOf 查找
 */
export function getIndex(str, chars = "", isLast = false) {
  if (typeof chars === "string") chars = chars.split("");
  let index = -1;
  for (let i = 0; i < chars.length; i++) {
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
 * @returns {
 * matchStr {string} 匹配的文件字符串
 * strType {ts|arr|obj} 字符串的来源类型
 * type {props|emits|slots|expose}
 * }
 */
export function getPartFileStr(readPath = needParam(), reg = needParam(), boundaryChars = false) {
  const isReg = typeOf(reg) === "RegExp";
  const regexp = isReg ? reg : new RegExp(reg);
  const fullPath = path.join(process.cwd(), readPath);
  const fileStr = fs.readFileSync(fullPath, "utf-8");
  let matchStr = fileStr.match(regexp)?.[0];
  if (!matchStr) return "";
  //是否是ts类型的字符串。也可能是其他开头的字符串，例：defineExpose<, defineExpose(, type = '', interface {}
  let strType = "obj";
  // const list = ["defineProps<", "defineEmits<", "defineSlots<", "defineExpose<", "interface"];
  // if (matchStr.startsWith(list)) strType = "ts";
  const tsList = ["defineProps<", "defineEmits<", "defineSlots<", "defineExpose<", "interface"];
  if (tsList.some(it => matchStr.startsWith(it))) strType = "ts";
  if (matchStr.startsWith("defineEmits([")) strType = "arr";
  // regexp.source.includes("defineProps") && console.log(matchStr, strType, "defineProps-matchStr---------------");
  const endInd = matchStr.indexOf(/[<\(]/);
  let type = "";
  if (matchStr.startsWith("define")) type = camelCase(matchStr.slice(6, endInd));
  if (matchStr.startsWith("type")) type = "type";
  if (matchStr.startsWith("interface")) type = "interface";
  if (!type) throw new Error("未检测到type类型");
  if (boundaryChars) {
    // defineEmits(["update:modelValue"])
    if (matchStr.startsWith("defineEmits([")) boundaryChars = "[]";
    const [c1, c2] = boundaryChars;
    // regexp.source.includes("defineProps") && console.log(matchStr, "defineProps-matchStr---------------");
    const sInd = matchStr.indexOf(c1) + 1;
    const eInd = matchStr.lastIndexOf(c2);
    matchStr = matchStr.slice(sInd, eInd).trim();
  }
  return { matchStr, strType, type };
}

/**
 * 根据ts类型名称获取对应的文件片段
 * @param {string} readPath 读取的文件路径。例："/demos/0_示例_demo/_typescript/standard.ts"
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
 * 根据ts类型名称获取ts或obj（对象）类型的字符串（从vue文件或ts文件中获取）
 * @param {string} readPath 读取文件的路径。例："/src/components/form/BaseForm.vue"
 * @param {defineProps|type +|interface +} name ts类型名称。例"defineProps" "defineEmits" "defineSlots" "defineExpose" "type FormItemType"  "interface FormFieldAttrs"
 * @param {boolean} noWrap 是否去壳
 */
export function getTsOrObjStrByName(readPath = needParam(), name = "defineProps", noWrap = false) {
  let boundaryChars = "{}";
  if (!noWrap) boundaryChars = false;
  // 获取vue文件中的 defineProps 或 defineExpose
  if (name.startsWith("define")) {
    const ext = path.extname(readPath).slice(1);
    if (ext !== "vue") throw new Error(`${ext}文件中不存在${ext}文件中的${name}`);
    // let regStr = `${name}<{([^}]+)}>`;
    // let regStr = `${name}[<\\(]{([\\s\\S]*)}[\\)>]`; // 匹配 defineExpose({}) 或 defineExpose<{}> 类型的字符串
    // let regStr = `${name}[<\\(]{([^}]*)}[\\)>]`; // 匹配 defineExpose({}) 或 defineExpose<{}> 类型的字符串
    const midRegStr = `<`;
    // 匹配示例：defineExpose<{}>, defineExpose({}), defineEmits([])
    let regStr = `(${name}<{[^${midRegStr}]+}>)|(${name}\\({[^${midRegStr}]+}\\))|(${name}\\(\\[[^${midRegStr}]+\\]\\);)`;
    return getPartFileStr(readPath, regStr, boundaryChars);
  }
  return getTsStr(readPath, name, boundaryChars);
}

/**
 * 更改文件名称
 * @param {string} dirPath 要更改的父文件夹路径
 * @param {string} oldName 旧文件名称（带后缀名）
 * @param {string} newName 新文件名称（带后缀名）
 */
export function changeFileName(dirPath = "/demos", oldName = readMeName, newName = "Summary.md") {
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
export function deleteFileByName(dirPath = "/demos", name = readMeName) {
  // const fullDirPath = path.join(process.cwd(), dirPath, `/0_示例_demo/1_StandardDemoForm 标准示例表单/${name}`);
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
