/********************************************************************/
/************** 为临时放置的后续可能会移到其他文件下的方法 *************/
/********************************************************************/

import { CommonObj } from "@/core/_types";

/**
 * 计算百分比
 * @param {number} num 当前值
 * @param {number} total 值总数
 * @param {number} fixedNum 要保留的小数位数
 */
export function getPercentage(num: number, total: number, fixedNum: number = 2) {
  if (!total) return Number(0).toFixed(fixedNum);
  return ((num / total) * 100).toFixed(fixedNum);
}

/**
 * 获取带错别字，敏感词标识的html字符串
 * @param {string} str 要处理的字符串
 * @param {string[]} wrongWords 错别字数组
 * @param {string[]} sensWords 敏感词数组
 * @param {string} wrongStyle 错别字样式
 * @param {string} sensStyle 敏感词样式
 * @example getTagHtmlStr("我们的假象，在希望的田野上，热爱我们的祖国！",['假象'],['我', '的'])
 */
export function getTagHtmlStr(
  str = "",
  wrongWords: string[] = [],
  sensWords: string[] = [],
  wrongStyle = "color: red;",
  sensStyle = "color: darkorange;"
) {
  // wrongGroups=['假象->家乡']
  // const wrongWords = wrongGroups.map(it=>it.split("->")[0])
  const wrongStr = wrongWords.join("|");
  const sensStr = sensWords.join("|");
  const wordStr = [wrongStr, sensStr]
    .filter(it => it !== "")
    .map(item => (item ? `(${item})` : item))
    .join("|");
  if (str && wordStr) {
    const reg = new RegExp(wordStr, "g");
    str = str.replace(reg, (matchStr: string, chars: string, index: number) => {
      const isWrong = wrongWords.includes(matchStr);
      return `<span style="${isWrong ? wrongStyle : sensStyle}">${matchStr}</span>`;
    });
  }
  return str;
}

/**
 * 获取 css 变量的值
 * @tips 暂时没用上
 */
// export function getCssVarVal(name: string = "--color-primary") {
//   const val = getComputedStyle(document.documentElement).getPropertyValue(name); // 获取计算后的样式
//   if (!val) {
//     throw new Error(`不存在此CSS变量：${name}`);
//   }
//   return val;
// }

/**
 * 监测本地文件是否更改
 * @param {any} e 事件对象
 * @link 参考：https://geek-docs.com/html/html-ask-answer/256_html_check_if_file_has_changed_using_html5_file_api.html
 */
// export function checkFileChanged(e: any) {
//   const { lastModifiedDate: lastModified } = e.target.files[0];
//   const isChanged = localStorage.getItem("lastModified") !== lastModified.toString();
//   if (isChanged) localStorage.setItem("lastModified", lastModified);
//   return isChanged;
// }

/**
 * 将浏览器路径参数转为对象
 * @param searchStr string 要转化的字符串
 * @notice urlSearchToParams(`http://127.0.0.1:5174/test/10/3?id=3&age=&sex=&isAgree=true`)
 * 解析有误=> {http://127.0.0.1:5174/test/10/3?id: '3', age: '', sex: '', isAgree: 'true'}
 * 故暂时弃用
 */
// export function urlSearchToParams(searchStr = location.search.slice(1)) {
//   return Object.fromEntries(new URLSearchParams(searchStr));
// }

/**
 * 将浏览器路径参数转为对象
 * @param {string} searchStr 要转化的字符串
 * @param {string[]} noHandleKeys 不需要处理（转number、布尔值等）的字符串
 */
export function urlSearchToParams(path: string, noHandleKeys?: string[]) {
  if (!path) return "";
  const str = path.split("?")[1];
  const obj: CommonObj = {};
  str.split("&").forEach((item: string) => {
    let [key, val] = item.split("=");
    if (!noHandleKeys?.includes(key) && val !== "") {
      const num = Number(val);
      if (!isNaN(num)) {
        val = num as any;
      } else {
        if (val === "true") {
          val = true as any;
        } else if (val === "false") {
          val = false as any;
        }
      }
    }
    obj[key] = val;
  });
  return obj;
}

/**
 * 将浏览器路径对象转为参数
 * @param {CommonObj} params 要转化的参数
 */
export function urlParamsToSearch(params?: CommonObj) {
  if (!params) return "";
  let str: string = "";
  for (const key in params) {
    const val = params[key] ?? "";
    if (typeof val === "object") throw new Error("路由参数中不允许传入非基本数据类型的值");
    str += `&${key}=${val}`;
  }
  return str.slice(1);
}

/**
 * 获取html文本
 * @param {string} str 要高亮的文本
 * @param {string} words 关键词
 * @returns {string} html字符串
 */
export const getHtmlStr = (str: string, words: string): string => {
  return str;

  // 关键词高亮处理
  // const index = str.indexOf(words);
  // const beforeStr = str.substring(0, index);
  // const afterStr = str.slice(index + words.length);
  // if (index > -1) return `<span>${beforeStr}<span style="color:red">${words}</span>${afterStr}</span>`;
  // return `<span>${str}</span>`;

  // react tsx 写法
  // return index > -1 ? (
  //   <span>
  //     {beforeStr}
  //     <span style={{ color: "red" }}>{words}</span>
  //     {afterStr}
  //   </span>
  // ) : (
  //   <span>{str}</span>
  // );
};

/**
 * 根据关键词模糊过滤树节点
 * @param {string} val 模糊搜索的关键词
 * @param {CommonObj[]} tree 树数据
 * @param {CommonObj[]} newArr 缓存的节点树
 * @returns {CommonObj[]} 返回一个新的树，不改变原数组
 */
export const filterTreeByKeywords = (val: string, tree: CommonObj[], newArr: CommonObj[] = []): CommonObj[] => {
  if (!(tree.length && val)) return tree;
  tree.forEach(item => {
    const { title, children } = item;
    if (title.includes(val)) {
      item.title = getHtmlStr(title, val);
      if (children?.length) {
        item.children = filterTreeByKeywords(val, children);
      }
      return newArr.push(item);
    }
    if (!children?.length) return item;
    const subArr = filterTreeByKeywords(val, children);
    if (subArr?.length) {
      item.title = getHtmlStr(title, val);
      newArr.push({ ...item, children: subArr });
    }
    return item;
  });
  return newArr;
};

/**
 * 给数字每隔 3 位就增加一个逗号
 * @param {string | number} num 要转化的数字
 * @returns {string}
 */
export const addCommasToNumber = (num: string | number): string => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * 动态加载js脚本（加载web-view脚本）
 * @param {String} url js脚本地址
 * @param {Object} [attr={}] 需要给`script`标签额外指定的属性
 * @return {Promise} 返回一个Promise对象
 * @example loadScript('https://appx/web-view.min.js')
 */

export function loadScript(url) {
  const attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const returnScript = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return new Promise(function (resolve, reject) {
    const $script = document.createElement("script");
    $script.type = "text/javascript";

    $script.onload = function () {
      return resolve($script);
    };

    $script.onerror = function (err) {
      reject(err || new Error("load script error: ".concat(url)));
    };

    for (const key in attr) {
      $script[key] = attr[key];
    }

    $script.src = url;
    document.body.appendChild($script);
    returnScript && returnScript($script);
  });
}
