import { CommonObj } from "@/core/_types";

/**
 * 获取支持上传的文件后缀类型
 */
export function getAcceptTypeStr(accept: string): string {
  const types = accept.split(",").map((it: string) => it.split(/[\/.]/)[1]);
  return types.join("，");
}

/**
 * 获取支持上传的文件大小限制(自带单位)
 */
export function getLimitSizeStr(limitSize: number, num = 0): string {
  const size = limitSize / 1024;
  if (size < 1024) return `${size.toFixed(num)}kb`;
  return `${(size / 1024).toFixed(num)}M`;
}

// 获取文件提示文案
export function getFileTips(props: CommonObj) {
  const { accept, limitSize } = props;
  const type = getAcceptTypeStr(accept);
  const size = getLimitSizeStr(limitSize);
  return `仅支持${type}格式，且不超过${size}`;
}

/**
 * 校验文件类型
 * @param {string} accept 可接受的文件类型 image/png,image/jpeg，或.png, .doc, .pdf等
 * @param {string} fileType 当前的文件类型 image/png,image/jpeg
 */
function validFileType(accept: string, fileType: string): string {
  const acceptTypes = accept.split(",").map(it => it.split(/[\/.]/)[1]);
  if (acceptTypes.includes(fileType.split("/")[1])) return "";
  return `仅支持上传${getAcceptTypeStr(accept)}格式的文件`;
}

/**
 * 校验文件类型
 * @param {number} limitSize 文件体积最大大小
 * @param {number} fileSize 当前文件大小
 * @param {boolean} allowEmpty 是否允许上传空文件
 */
function validFileSize(limitSize: number, fileSize: number, allowEmpty = true) {
  if (!allowEmpty && fileSize === 0) return "文件内容不能为空";
  if (fileSize <= limitSize) return "";
  return `文件大小不能超过 ${getLimitSizeStr(limitSize)}`;
}

/**
 * 获取文件不合规范的提示文案
 * @param {object} props 上传组件的props属性
 * @param {object} file 上传的文件信息
 */
export function getErrorTips(props: CommonObj, file: CommonObj) {
  const { limitSize, accept, allowEmpty } = props;
  const { type, size } = file;
  return validFileType(accept, type) || validFileSize(limitSize, size, allowEmpty);
}
