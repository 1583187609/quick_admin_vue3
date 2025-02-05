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
// export function getPerformanceTiming(): CommonObj | undefined {
//   // 当前浏览器不支持
//   if (!performance) {
//     console.log("你的浏览器不支持 performance 接口");
//     return;
//   }
//   const t = performance.timing;
//   const data: CommonObj = {};
//   //【重要】页面加载完成的时间
//   //【原因】这几乎代表了用户等待页面可用的时间
//   data.loadPage = t.loadEventEnd - t.navigationStart;
//   //【重要】解析 DOM 树结构的时间
//   //【原因】反省下你的 DOM 树嵌套是不是太多了！
//   data.domReady = t.domComplete - t.responseEnd;
//   //【重要】重定向的时间
//   //【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
//   data.redirect = t.redirectEnd - t.redirectStart;
//   //【重要】DNS 查询时间
//   //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
//   // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
//   data.lookupDomain = t.domainLookupEnd - t.domainLookupStart;
//   //【重要】读取页面第一个字节的时间
//   //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
//   // TTFB 即 Time To First Byte 的意思
//   // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
//   data.ttfb = t.responseStart - t.navigationStart;
//   //【重要】内容加载完成的时间
//   //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
//   data.request = t.responseEnd - t.requestStart;
//   //【重要】执行 onload 回调函数的时间
//   //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
//   data.loadEvent = t.loadEventEnd - t.loadEventStart;
//   // DNS 缓存时间
//   data.appCache = t.domainLookupStart - t.fetchStart;
//   // 卸载页面的时间
//   data.unloadEvent = t.unloadEventEnd - t.unloadEventStart;
//   // TCP 建立连接完成握手的时间
//   data.connect = t.connectEnd - t.connectStart;
//   console.log(data, "data--------------");
//   return data;
// }

// 计算加载时间（使用 PerformanceNavigationTiming API）
// export function getPerformanceTiming(): CommonObj | undefined {
//   // 检测浏览器支持性
//   if (!window.performance || !performance.getEntriesByType) {
//     console.log("当前浏览器不支持 Performance Timeline API");
//     return;
//   }
//   // 获取导航性能条目
//   const [navigationEntry] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
//   if (!navigationEntry) {
//     console.log("无法获取导航性能条目");
//     return;
//   }
//   const data: CommonObj = {};
//   // 【重要】页面加载完成时间（Load Event）
//   data.loadPage = navigationEntry.duration;
//   // 【重要】DOM 解析时间（DOM 解析完成 - 响应结束）
//   data.domReady = navigationEntry.domComplete - navigationEntry.responseEnd;
//   // 【重要】重定向时间
//   data.redirect = navigationEntry.redirectEnd - navigationEntry.redirectStart;
//   // 【重要】DNS 查询时间
//   data.lookupDomain = navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart;
//   // 【重要】首字节时间（TTFB）
//   data.ttfb = navigationEntry.responseStart - navigationEntry.startTime;
//   // 【重要】请求响应时间（响应结束 - 请求开始）
//   data.request = navigationEntry.responseEnd - navigationEntry.requestStart;
//   // 【重要】load 事件处理时间
//   data.loadEvent = navigationEntry.loadEventEnd - navigationEntry.loadEventStart;
//   // DNS 缓存时间（如果是 0 表示命中缓存）
//   data.appCache = navigationEntry.domainLookupStart - navigationEntry.startTime;
//   // TCP 连接时间（如果使用 HTTPS 会包含 TLS 握手时间）
//   data.connect = navigationEntry.connectEnd - navigationEntry.connectStart;
//   // 【新增】现代 API 新增指标示例
//   data.secureConnection =
//     navigationEntry.secureConnectionStart > 0 ? navigationEntry.connectEnd - navigationEntry.secureConnectionStart : 0;
//   // 【新增】资源加载总时间（可用于对比旧 API 的 loadPage）
//   data.totalResourceLoad = navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime;
//   console.log("性能指标数据：", data);
//   return data;
// }

interface PerformanceMetrics {
  total: number; // 总耗时（基于 loadEventEnd）
  stagesTotal: number; // 各阶段耗时总和（用于验证）
  dns: number;
  tcp: number;
  ssl: number;
  ttfb: number;
  contentLoad: number;
  domParse: number;
  resourceLoad: number;
  domReady: number;
  loadEvent: number;
}

// 核心性能分析函数
export function analyzePageLoad(): PerformanceMetrics | null {
  try {
    // 现代浏览器支持方案
    if ("PerformanceObserver" in window && performance.getEntriesByType) {
      const [navigationEntry] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      if (!navigationEntry) return null;
      // 现代浏览器方案
      const {
        duration,
        domainLookupEnd,
        domainLookupStart,
        connectEnd,
        connectStart,
        secureConnectionStart,
        responseEnd,
        responseStart,
        domInteractive,
        domContentLoadedEventStart,
        domContentLoadedEventEnd,
        startTime,
        loadEventEnd,
        loadEventStart,
      } = navigationEntry;

      const metrics: PerformanceMetrics = {
        total: duration,
        stagesTotal: 0, // 先初始化为0，后续累加
        dns: domainLookupEnd - domainLookupStart,
        tcp: connectEnd - connectStart,
        ssl: secureConnectionStart > 0 ? connectEnd - secureConnectionStart : 0,
        ttfb: responseStart - startTime,
        contentLoad: responseEnd - responseStart,
        domParse: domInteractive - domContentLoadedEventStart,
        resourceLoad: loadEventStart - domContentLoadedEventEnd,
        domReady: domContentLoadedEventEnd - startTime,
        loadEvent: loadEventEnd - loadEventStart,
      };

      const { dns, tcp, ssl, ttfb, contentLoad, domParse, resourceLoad, loadEvent } = metrics;
      // 计算各阶段总和（用于与 total 对比）
      metrics.stagesTotal = dns + tcp + ssl + ttfb + contentLoad + domParse + resourceLoad + loadEvent;
      console.log(metrics, "metrics--------");
      // // 控制台输出强化总耗时
      // console.table({
      //   DNS查询: `${metrics.dns}ms`,
      //   TCP连接: `${metrics.tcp}ms`,
      //   SSL握手: `${metrics.ssl}ms`,
      //   "首字节(TTFB)": `${metrics.ttfb}ms`,
      //   内容传输: `${metrics.contentLoad}ms`,
      //   DOM解析: `${metrics.domParse}ms`,
      //   资源加载: `${metrics.resourceLoad}ms`,
      //   Load事件处理: `${metrics.loadEvent}ms`,
      //   "------------------------": "------",
      //   阶段总和: `${metrics.stagesTotal}ms`, // 各阶段累加值
      //   总加载时间: `${metrics.total}ms`, // 官方API总时间
      // });

      // 添加验证提示
      if (Math.abs(metrics.total - metrics.stagesTotal) > 100) {
        console.warn("阶段耗时总和与总时间差异较大，可能存在并行加载或测量误差");
      }

      return metrics;
    }

    // 旧浏览器回退方案
    if ("timing" in performance) {
      const t = performance.timing;
      return {
        total: t.loadEventEnd - t.navigationStart,
        dns: t.domainLookupEnd - t.domainLookupStart,
        tcp: t.connectEnd - t.connectStart,
        ssl: 0, // 旧API无法获取SSL时间
        ttfb: t.responseStart - t.navigationStart,
        contentLoad: t.responseEnd - t.responseStart,
        domParse: t.domInteractive - t.domLoading,
        resourceLoad: t.loadEventStart - t.domComplete,
        domReady: t.domContentLoadedEventEnd - t.navigationStart,
        loadEvent: t.loadEventEnd - t.loadEventStart,
      };
    }
    console.warn("当前浏览器不支持性能监测API");
    return null;
  } catch (error) {
    console.error("性能分析失败:", error);
    return null;
  }
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
  const times: CommonObj = {};
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
export function getExeTime(fun, unit = "ms") {
  const timeStart = performance.now();
  fun();
  let diffTime = performance.now() - timeStart;
  if (unit === "s") diffTime = diffTime / 1000;
  console.log(`${fun.name}执行了：${diffTime.toFixed(2)} ${unit}`);
  return diffTime;
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
