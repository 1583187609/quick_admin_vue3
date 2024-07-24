/**
 * 留待观察，后面可能会移除的方法
 */

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
