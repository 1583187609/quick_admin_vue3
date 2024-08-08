// 这个文件仅供node环境使用，在浏览器中 from "path" 会提示路径错误，需要写成 "./path"或"/path"或"../path"等
import fetch from "./fetch.js";
import { writeFileSync, addToFileLineSync } from "./index.js";

/**
 * 爬取html页面
 * @param url string 要爬取的url地址，例：https://git-scm.com/book/zh/v2
 * @param writePath string 要写入本地磁盘的文件地址，例：src/html/index.html
 */
export async function fetchHtml(url = "", writePath, baseUrl = url) {
  try {
    return await fetch("GET", url).then(html => {
      if (!html) {
        throw new Error("返回的html为空，有可能是地址错误：" + url);
      }
      html = addToFileLineSync(html, "<head>", [`  <base href="${baseUrl}" />`]);
      writePath && writeFileSync(writePath, html);
      return html;
    });
  } catch (err) {
    console.error(err);
    return "";
  }
}
/**
 * 下载图片
 * @param {string} url //要下载的图片地址
 * @param {string} writePath //要写入的文件地址（含文件格式，例如:.jpg）
 */
export async function downloadImg(url, writePath) {
  return await fetch("GET", url, "binary")
    .then(res => {
      const err = writeFileSync(writePath, res, "binary");
      console.log(`下载${err ? "失败" : "成功"}`, err || "");
      return null;
    })
    .catch(err => {
      console.log("下载失败", err);
      return err;
    });
}
