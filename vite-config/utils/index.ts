/********************************************************************/
/***************** vite.config.ts初始化时会用到的方法 *****************/
/********************************************************************/

/**
 * 将字符串转为驼峰
 * @param {string} str 要转换的字符串
 * @param {boolean} isBig 是否转成大驼峰，否则转成小驼峰
 */
export function toCamelCase(str: string, isBig = false) {
  str = str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, ind) => {
    if (ind === 0) return letter[isBig ? "toUpperCase" : "toLowerCase"]();
    return letter.toUpperCase();
  });
  str = str.replace(/\s+|\/|-|}/g, "");
  return str;
}

/**
 * 获取代理映射
 * @param {object} apiMap api映射对象
 */
export function getApiProxy(apiMap): any {
  // 开发环境用devServer做接口代理
  return Object.keys(apiMap).map(key => {
    const reg = new RegExp(`^${key}`);
    return {
      [key]: {
        target: apiMap[key], //http://127.0.0.1:5500
        // target: "http://127.0.0.1:5180",
        // target: "https://fanlichuan.gitee.io",
        changeOrigin: true, //是否跨域
        ws: true, //是否代理 websockets
        secure: false, //是否https接口
        rewrite: (path: string) => path.replace(reg, ""),
        bypass(req, res, options: any) {
          const proxyURL = options.target + options.rewrite(req.url);
          res.setHeader("x-req-proxyURL", proxyURL); // 设置响应头可以在浏览器中看到实际请求地址
        },
      },
    };
  });
}

/**
 * 根据地址获取文件名称
 * @param path 地址路径
 * @param char 分割字符串依赖的符号
 * @returns
 */
export function getFileNameByPath(path: string, char = "/") {
  const lastInd = path.lastIndexOf(char);
  const lastDotInd = path.lastIndexOf(".");
  const name = path.substring(lastInd + 1, lastDotInd);
  if (name !== "index" && name !== "Index") return name;
  const secondInd = path.lastIndexOf(char, lastInd - 1);
  let newName = path.substring(secondInd + 1, lastInd) || name;
  if (newName.startsWith("_")) newName = `0${newName}`; //GitHub Pages服务会将下划线开头的文件视为隐藏文件，不会暴露出来，故做此处理
  return newName;
}
