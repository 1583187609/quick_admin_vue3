/**
 * 获取支持上传的图片后缀类型
 */
export function getAcceptTypeStr(accept: string): string {
  const types = accept.split(",").map((it: string) => it.split("/")[1]);
  return types.join("，");
}

/**
 * 获取支持上传的图片大小限制(自带单位)
 */
export function getLimitSizeStr(limitSize: number): string {
  const size = limitSize / 1024;
  if (size < 1024) return `${size.toFixed(1)}kb`;
  return `${(size / 1024).toFixed(1)}Mb`;
}

// 获取文件提示文案
export function getFileTips(props) {
  const { accept, limitSize } = props;
  const type = getAcceptTypeStr(accept);
  const size = getLimitSizeStr(limitSize);
  return `仅支持${type}，不超过${size}`;
}

/**
 * 校验图片类型
 * @param {string} accept 可接受的文件类型 image/png,image/jpeg
 * @param {string} fileType 当前的文件类型 image/png,image/jpeg
 */
function validFileType(accept: string, fileType: string): string {
  const acceptTypes = accept.split(",");
  if (acceptTypes.includes(fileType)) return "";
  return `仅支持上传${getAcceptTypeStr(accept)}格式的图片`;
}

/**
 * 校验图片类型
 * @param {number} limitSize 文件体积最大大小
 * @param {number} fileSize 当前文件大小
 */
function validFileSize(limitSize: number, fileSize: number) {
  if (fileSize <= limitSize) return "";
  return `图片大小不能超过${getLimitSizeStr(limitSize)}`;
}

/**
 * 获取文件不合规范的提示文案
 * @param {CommonObj} props 上传组件的props属性
 * @param {CommonObj} file 上传的文件信息
 */
export function getErrorTips(props, file) {
  const { limitSize, accept } = props;
  const { type, size } = file;
  return validFileType(accept, type) || validFileSize(limitSize, size);
}
