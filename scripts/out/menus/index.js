import fs from "fs";
import path from "path";
import { docsPath, indexName, splitOrderChar, sourceUrls, excludes, isSimple, getFileName } from "../utils/index.js";

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
 * @param {*} excludes 要排除的文件夹名
 * @returns
 */
function getSortReadFiles(dirPath, excludes) {
  let readFiles = fs.readdirSync(dirPath);
  if (excludes?.length) {
    readFiles = readFiles.filter(file => !excludes.some(it => file.includes(it)));
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
      return {
        text: getFileName(dirName),
        link: `${dirPath}/${file}/${fileName.slice(0, -3)}`,
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
  if (!isSimple) return linkStr;
  const linkArr = linkStr.replace(docsPath, "").split("/");
  const linkJoin = linkArr.map(it => getFileName(it, "en")).join("/");
  return linkJoin;
}

/**
 * 获取资源链接地址
 */
function getSourceItems(urlsMap = sourceUrls) {
  // vitepress 不支持多层嵌套的解析
  // const items = [];
  // const textMap = { preview: "预览", repository: "仓库", docs: "文档" };
  // for (const key in urlsMap) {
  //   const typeObj = urlsMap[key];
  //   const item = {
  //     text: textMap[key],
  //     items: Object.entries(typeObj).map(([k, v]) => {
  //       console.log(k, v, "k-v----------------");
  //       return {
  //         text: upperFirst(k),
  //         items: Object.entries(v).map(([i, j]) => {
  //           return { text: i, link: j };
  //         }),
  //       };
  //     }),
  //   };
  //   items.push(item);
  // }
  // return items;
  // 故采用如下方案
  const items = [
    {
      text: "预览",
      link: "https://gitee.com/link?target=https%3A%2F%2F1583187609.github.io%2Fquick_admin%2Freact%2Fpreview%2F%23%2Flogin",
    },
    { text: "仓库", link: "https://gitee.com/fanlichuan/quick_admin_react" },
  ];
  return items;
}

/**
 * 获取顶部导航数据（即：themeConfig.nav）
 * @param dirPath string 文件夹路径
 */
export function getNav(dirPath = docsPath, isDeep = false, endList = []) {
  const newDirPath = path.join(process.cwd(), dirPath);
  const list = [];
  const readFiles = getSortReadFiles(newDirPath, excludes);
  readFiles.forEach(file => {
    const curPath = path.join(newDirPath, file);
    const isDir = fs.lstatSync(curPath).isDirectory(); //是否是文件夹
    const fileName = getFileName(file);
    if (isDir) {
      const paths = getSubPaths(curPath);
      if (isDeep) {
        list.push({
          text: fileName,
          items: getItems(paths, dirPath, file),
        });
      } else {
        const items = getItems(paths, dirPath, file);
        list.push({
          text: fileName,
          link: getFirstPath(items),
        });
      }
    } else {
      list.push({
        text: fileName,
        link: `${dirPath}/${file}`,
      });
    }
  });
  // 资源链接，临时这样写
  if (!endList?.length) {
    endList = [
      {
        text: "资源",
        items: getSourceItems(sourceUrls),
      },
    ];
  }
  list.push(...endList);
  return list;
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
      return {
        text: fileName, //.slice(0, -3),
        link: `${dirPath}/${file.slice(0, -3)}`,
      };
    }
  });
  return navs;
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
        const reLinks = isSimple ? link.replace(docsPath, "").slice(1).split("/") : sliceLink.split("/");
        const reLink = reLinks.map(it => getFileName(it, "en")).join("/");
        rewrites[sliceLink + ".md"] = reLink + ".md";
      } else {
        cycle(items);
      }
    });
  }
  for (const key in sidebar) {
    cycle(sidebar[key]);
  }
  return rewrites;
}

/**
 * 获取侧边栏导航数据和重写的路径映射（即：themeConfig.sidebar）
 * @param wrapPath string 文件夹路径，例：/src
 */
export function getSidebarAndRewrites(wrapPath = docsPath) {
  const newWrapPath = path.join(process.cwd(), wrapPath);
  const readFiles = getSortReadFiles(newWrapPath, excludes);
  const sidebar = {};
  readFiles.map(file => {
    const dirPath = `${wrapPath}/${file}`;
    if (isSimple) {
      sidebar[`/${getFileName(file, "en")}/`] = getSideNavs(dirPath);
    } else {
      sidebar[dirPath + "/"] = getSideNavs(dirPath);
    }
  });
  return {
    sidebar,
    rewrites: Object.assign({ [`${docsPath.slice(1)}/${indexName}`]: indexName }, isSimple ? getRewrites(sidebar) : {}),
  };
}
