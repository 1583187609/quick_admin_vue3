import { CommonObj } from "@/core/_types";

/**
 * @link 参考地址 https://zhuanlan.zhihu.com/p/43746227
 * @returns
 */

/**
 * 使用 performance.timing 信息简单计算出网页性能数据
 * @returns
 */
// 计算加载时间
export function getPerformanceTiming(): CommonObj | undefined {
  // 当前浏览器不支持
  if (!performance) {
    console.log("你的浏览器不支持 performance 接口");
    return;
  }
  const t = performance.timing;
  const data: CommonObj = {};
  //【重要】页面加载完成的时间
  //【原因】这几乎代表了用户等待页面可用的时间
  data.loadPage = t.loadEventEnd - t.navigationStart;
  //【重要】解析 DOM 树结构的时间
  //【原因】反省下你的 DOM 树嵌套是不是太多了！
  data.domReady = t.domComplete - t.responseEnd;
  //【重要】重定向的时间
  //【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
  data.redirect = t.redirectEnd - t.redirectStart;
  //【重要】DNS 查询时间
  //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
  // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
  data.lookupDomain = t.domainLookupEnd - t.domainLookupStart;
  //【重要】读取页面第一个字节的时间
  //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
  // TTFB 即 Time To First Byte 的意思
  // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
  data.ttfb = t.responseStart - t.navigationStart;
  //【重要】内容加载完成的时间
  //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
  data.request = t.responseEnd - t.requestStart;
  //【重要】执行 onload 回调函数的时间
  //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
  data.loadEvent = t.loadEventEnd - t.loadEventStart;
  // DNS 缓存时间
  data.appCache = t.domainLookupStart - t.fetchStart;
  // 卸载页面的时间
  data.unloadEvent = t.unloadEventEnd - t.unloadEventStart;
  // TCP 建立连接完成握手的时间
  data.connect = t.connectEnd - t.connectStart;
  return data;
}

/**
 * 使用performance.getEntries() 获取所有资源请求的时间数据
 */

/**
 * 可以像 getPerformanceTiming 获取网页的时间一样，获取某个资源的时间
 * @param entry
 * @returns
 */
// 计算加载时间
function getEntryTiming(entry) {
  const t = entry;
  const times = {};
  // 重定向的时间
  times.redirect = t.redirectEnd - t.redirectStart;
  // DNS 查询时间
  times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;
  // 内容加载完成的时间
  times.request = t.responseEnd - t.requestStart;
  // TCP 建立连接完成握手的时间
  times.connect = t.connectEnd - t.connectStart;
  // 挂载 entry 返回
  times.name = entry.name;
  times.entryType = entry.entryType;
  times.initiatorType = entry.initiatorType;
  times.duration = entry.duration;
  return times;
}

/**
 * (3)使用 performance.now() 精确计算程序执行时间
 */
function getFunctionTimeWithPerformance(func) {
  const timeStart = performance.now();
  func();
  const timeEnd = performance.now();
  return timeEnd - timeStart;
}

/**
 * (4) 使用 performance.mark() 也可以精确计算程序执行时间
 * @param n
 */
function randomFunc(n) {
  if (!n) n = ~~(Math.random() * 10000);
  const nameStart = "markStart" + n;
  const nameEnd = "markEnd" + n;
  // 函数执行前做个标记
  performance.mark(nameStart);
  for (let i = 0; i < n; i++) {
    // do nothing
  }
  // 函数执行后再做个标记
  performance.mark(nameEnd);
  // 然后测量这个两个标记间的时间距离，并保存起来
  const name = "measureRandomFunc" + n;
  performance.measure(name, nameStart, nameEnd);
}

// // 执行三次看看
// randomFunc();
// randomFunc();
// // 指定一个名字
// randomFunc(888);
