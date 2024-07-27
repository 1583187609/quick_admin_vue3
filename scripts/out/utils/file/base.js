/********************************************
 文件处理相关*********************************
 ********************************************/
import fs from "fs";
import path from "path";
import { needParam, typeOf } from "../base";

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
export function writeFileSync(writePath, writeStr, showSuccess = true, encoding = "utf-8") {
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
 * @param readPath 要读取的文件路径
 * @param reg 正则表达式的只读字符串或者正则表达式
 * @param boundaryChars 边界符号：由起止符号构成
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
 * @param {string} readPath 读取文件的路径
 * @param {string} name ts类型名称
 * @param {boolean} noWrap 是否去壳
 */
export function getTsStrByName(readPath = "/src/components/form/BaseForm.vue", name = "props", noWrap = false) {
  let boundaryChars = "{}";
  if (!noWrap) boundaryChars = false;
  if (name === "props") {
    const ext = path.extname(readPath).slice(1);
    if (ext !== "vue") throw new Error(`${ext}文件中不存在vue文件中的props`);
    return getPartFileStr(readPath, "defineProps<{([^}]+)}>", boundaryChars);
  }
  return getTsStr(readPath, name, boundaryChars);
}
