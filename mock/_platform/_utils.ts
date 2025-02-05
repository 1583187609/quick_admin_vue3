/**
 * 获取基础路径
 * @example 发布到gitee上的有效地址：https://fanlichuan.gitee.io/quick_admin_vue3/dist/static/imgs/girl-1.jpg
 * @example VsCode Live Sever打开的有效地址：http://127.0.0.1:5500/dist/static/imgs/boy-6.jpg
 * @example 发布到github上的有效地址：https://1583187609.github.io/quick_admin/vue3/preview/static/imgs/boy-4.jpg
 */
// import { isDev } from "../utils";
// export function getBasePath(projectName = "quick_admin", rootPath = "/vue3/preview") {
//   if (isDev) return ""; //开发模式
//   const { origin, host } = location;
//   const isLiveSever = host?.startsWith("127");
//   return `${origin}/${isLiveSever ? "" : projectName}${isLiveSever ? "/dist" : rootPath}`;
// }
export function getBasePath() {
  const { host } = location;
  const isLiveSever = host?.startsWith("127");
  if (isLiveSever) return "/dist"; // 如果是Vs Code 的Live Server 打开的
  if (host?.endsWith("io")) return "/quick_admin/vue3/preview"; // 如果是部署在github或gitee服务上的
  return "";
}
// 获取在线预览的域名
export function getWorksDomain() {
  // return "https://fanlichuan.gitee.io"
  return "https://1583187609.github.io";
  // return "https://quickadmin.kongjz.com";
}
