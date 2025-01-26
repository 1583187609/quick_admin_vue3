/**
 * 菜单生成相关
 */

import fs from "fs";
import path from "path";
import {
  docsPath,
  indexName,
  splitOrderChar,
  excludeNames,
  isShortPath,
  getFileName,
  consoleLog,
  isDev,
} from "../utils/index.js";

/**
 * 把字符串和对象排序，如果有数字前缀，则根据数字前缀排序
 * @param {string[][]} paths
 */
// 参数paths示例
// const paths = [
//   "",
//   "1_one",
//   {
//     text: "3_分组3",
//     items: ["three/3-1.md", "three/3-2.md"],
//     collapsed: false,
//   },
//   {
//     text: "2_分组2",
//     items: ["two/2-1", "two/2-2"],
//     collapsed: false,
//   },
//   "4_vue-press",
// ];
function sortPaths(paths = [], char = splitOrderChar) {
  paths.sort(function (a, b) {
    const isStrA = typeof a === "string";
    const isStrB = typeof b === "string";
    const titleA = isStrA ? a : Array.isArray(a) ? a[1] : a.text;
    const titleB = isStrB ? b : Array.isArray(b) ? b[1] : b.text;
    const numA = Number(titleA.split(char)[0]) || 0;
    const numB = Number(titleB.split(char)[0]) || 0;
    return numA - numB;
  });
  return paths;
}

/**
 * 获取过滤且排序后的文件名列表
 * @param {*} dirPath 要读取的文件所在文件夹路径
 * @param {*} excNames 要排除的文件夹名
 * @returns
 */
function getSortReadFiles(dirPath, excNames) {
  let readFiles = fs.readdirSync(dirPath);
  if (excNames?.length) {
    readFiles = readFiles.filter(file => !excNames.some(it => file.includes(it)));
  }
  sortPaths(readFiles);
  return readFiles;
}

/**
 * 递归获取子路径
 * @param folderPath 多层目录路径 示例： hello/a/b/c
 * @param urls 多层路径记录
 */
function getSubPaths(folderPath = "", urls = []) {
  const paths = fs.readdirSync(folderPath).map(file => {
    const curPath = path.join(folderPath, file);
    const isDir = fs.lstatSync(curPath).isDirectory(); //是否是文件夹
    const cloneUrls = [...urls];
    cloneUrls.push(file);
    if (isDir) {
      const items = getSubPaths(curPath, cloneUrls);
      return {
        text: file,
        items,
        collapsed: false,
      };
    } else {
      if (file === indexName) return "";
      return [cloneUrls.join("/"), cloneUrls.at(-1).slice(0, -3)];
    }
  });
  return sortPaths(paths);
}

/**
 * 获取vitepress导航中的items数据
 * @param {*} paths 多级路径
 * @param {*} dirPath 文件夹路径
 * @param {*} file 文件名称
 * @returns
 */
function getItems(paths = [], dirPath = "", file = "") {
  return paths.map(subPaths => {
    if (Array.isArray(subPaths)) {
      const [fileName, dirName] = subPaths;
      let link = `${dirPath}/${file}/${fileName.slice(0, -3)}`;
      // if (isShortPath) {
      //   link = getShortPath(link).replace(docsPath, "");
      // }
      // const activeMatch = link.split("/")[0] + "/";
      return {
        text: getFileName(dirName),
        link,
        activeMatch: isShortPath ? link : undefined,
      };
    } else {
      const { text, items } = subPaths;
      return {
        text: getFileName(text),
        items: getItems(items, dirPath, file),
      };
    }
  });
}

/**
 * 获取第一级地址
 * @param {object[]} children
 * @returns
 */
function getFirstPath(children = []) {
  let linkStr = "";
  function cycle(arr) {
    if (!arr?.length) return false;
    return arr.find(item => {
      const { link, items } = item;
      if (link) {
        linkStr = link;
        return true;
      }
      return cycle(items);
    });
  }
  cycle(children);
  if (!isShortPath) return linkStr;
  const linkArr = linkStr.replace(docsPath, "").split("/");
  const linkJoin = linkArr
    .map(it => {
      let enName = getFileName(it, "en");
      if (enName.includes(" ")) enName = getFirstEnglishWords(enName);
      return enName;
    })
    .join("/");
  return linkJoin;
}

/**
 * 获取某个内容部分的第一级菜单
 * @param {string} name 内容部分名称
 * @returns
 */
export function getPartFirstPathByName(name) {
  let currName = `/${name}/`;
  const { sidebar } = getSidebarAndRewrites();
  const firstName = Object.keys(sidebar)[0];
  if (!name) {
    currName = firstName;
  }
  return getFirstPath(sidebar?.[currName] ?? sidebar[firstName]);
}

/**
 * 获取顶部导航数据（即：themeConfig.nav）
 * @param dirPath string 文件夹路径
 */
export function getNavs(dirPath = docsPath, isDeep = false) {
  const newDirPath = path.join(process.cwd(), dirPath);
  const navs = [];
  const readFiles = getSortReadFiles(newDirPath, excludeNames);
  readFiles.forEach((file, ind) => {
    const curPath = path.join(newDirPath, file);
    const isDir = fs.lstatSync(curPath).isDirectory(); //是否是文件夹
    const cnName = getFileName(file);
    if (isDir) {
      const order = Number(file.split("_")[0]) || 0; // 如果是NaN，则为0
      if (!isDev && order > 10) return; // 如果大于10，则是测试、示例、等模块，不宜呈现在非开发环境
      const paths = getSubPaths(curPath);
      if (isDeep) {
        navs.push({
          text: cnName,
          items: getItems(paths, dirPath, file),
        });
      } else {
        const items = getItems(paths, dirPath, file);
        const firstLink = getFirstPath(items);
        const activeMatch = "/" + firstLink.split("/")[1] + "/";
        // console.log(firstLink, activeMatch, "firstLink-----------");
        // if (ind === 2 && isErr) {
        // }
        navs.push({
          text: cnName,
          link: firstLink,
          activeMatch: activeMatch,
        });
      }
    } else {
      // const activeMatch = `${file.split("/")[0]}/`;
      navs.push({
        text: cnName,
        link: `${dirPath}/${file}`,
        activeMatch: isShortPath ? `${dirPath}/${file}` : undefined,
      });
    }
  });
  return navs;
}

/**
 * 获取简短的英文路径
 * @param {string} pathStr 要处理的路径字符串
 * @returns
 */
function getShortPath(pathStr = "") {
  return pathStr
    .split("/")
    .map(it => {
      let enName = getFileName(it, "en");
      if (enName.includes(" ")) enName = getFirstEnglishWords(enName);
      return enName;
    })
    .join("/");
}

/**
 * 获取侧边栏导航数据的子项navs（即：themeConfig.sidebar的子项）
 * @param dirPath string 文件夹路径，例：/src/views
 */
function getSideNavs(dirPath) {
  const newDirPath = path.join(process.cwd(), dirPath);
  const readFiles = getSortReadFiles(newDirPath);
  const navs = readFiles.map(file => {
    const curPath = path.join(newDirPath, file);
    const isDir = fs.lstatSync(curPath).isDirectory(); //是否是文件夹
    const fileName = getFileName(file);
    if (isDir) {
      const paths = getSubPaths(curPath);
      return {
        text: fileName,
        items: getItems(paths, dirPath, file),
      };
    } else {
      let link = `${dirPath}/${file.slice(0, -3)}`;
      // if (isShortPath) {
      //   link = getShortPath(link).replace(docsPath, "");
      // }
      return {
        text: fileName,
        link,
      };
    }
  });
  return navs;
}

/**
 * 从字符串中获取第一个英文单词
 * @param {string} str 要处理的字符串
 * @param {string} char 分隔符
 * @returns
 */
function getFirstEnglishWords(str = "", char = " ") {
  if (!str) return "";
  return str.split(char).find(it => {
    const wordsReg = /^\b\w+\b$/;
    return wordsReg.test(it);
  });
}

/**
 * 获取重写路径映射
 * @param {*} sidebar
 */
function getRewrites(sidebar) {
  const rewrites = {};
  function cycle(children = []) {
    children.forEach(item => {
      const { link, items } = item;
      if (link) {
        const sliceLink = link.slice(1);
        let reLinks = sliceLink.split("/");
        if (isShortPath) reLinks = link.replace(docsPath, "").slice(1).split("/");

        //示例：'docs/11_示例_demo/2_文档生成_create/1_StandardDemoForm 标准示例表单.md': 'demo/create/StandardDemoForm.md',
        const reLink = reLinks
          .map(it => {
            let enName = getFileName(it, "en");
            if (enName.includes(" ")) enName = getFirstEnglishWords(enName);
            return enName;
          })
          .join("/");
        rewrites[sliceLink + ".md"] = reLink + ".md";
      } else {
        cycle(items);
      }
    });
  }
  for (const key in sidebar) {
    cycle(sidebar[key]);
  }
  // console.log(rewrites, "rewrites-----------");
  return rewrites;
}

/**
 * 获取侧边栏导航数据和重写的路径映射（即：themeConfig.sidebar）
 * @param wrapPath string 文件夹路径，例：/src
 */
export function getSidebarAndRewrites(wrapPath = docsPath) {
  const newWrapPath = path.join(process.cwd(), wrapPath);
  const readFiles = getSortReadFiles(newWrapPath, excludeNames);
  const sidebar = {};
  readFiles.map(file => {
    const dirPath = `${wrapPath}/${file}`;
    if (isShortPath) {
      sidebar[`/${getFileName(file, "en")}/`] = getSideNavs(dirPath);
    } else {
      sidebar[dirPath + "/"] = getSideNavs(dirPath);
    }
  });
  // consoleLog(sidebar, "sideBar------------");
  return {
    sidebar,
    rewrites: Object.assign({ [`${docsPath.slice(1)}/${indexName}`]: indexName }, isShortPath ? getRewrites(sidebar) : {}),
  };
}
