/********************************************************************/
/*************** 为Vue或React或各UI平台差异化单独写的方法 *************/
/********************************************************************/

import cssVars from "@/assets/styles/_var.module.scss";
import { RendererElement, RendererNode, VNode, h, isVNode } from "vue";
import { ElMessage } from "element-plus";
import { emptyVals, getChinaCharLength, isDev, storage, typeOf } from "@/components/_utils";
import { FormField, FormFieldAttrs, PopoverAttrs } from "@/components/form/_components/FieldItem";
import type { MessageParams, TableColumnCtx } from "element-plus";
import { CommonObj, TostMessageType } from "@/vite-env";

export const noAuthPaths = ["/login"]; //不需要授权就能登录的页面
export const errorPaths = ["/403", "/404", "/500"];

export const themeMap = {
  primary: cssVars.colorPrimary,
  success: cssVars.colorSuccess,
  danger: cssVars.colorDanger,
  warning: cssVars.colorWarning,
  info: cssVars.colorInfo,
};

/**
 * 展示message提示信息
 * @param hint string, MessageParams 提示内容
 * @description 默认展示成功通知
 */
export function showMessage(hint: string | MessageParams, type: TostMessageType = "success") {
  if (!hint) return;
  if (typeof hint === "string") {
    const speed = 7; //速度：7字/秒
    let duration = (hint.length / speed) * 1000;
    if (duration < 1500) {
      duration = 1500;
    }
    ElMessage({
      message: hint,
      type,
      duration,
      grouping: true,
      showClose: duration > 2000,
    });
  } else {
    ElMessage(hint);
  }
}

/**
 * 输出请求参数与响应数据的log信息
 * @param data any 要打印的数据
 * @param type PrintLogType 要打印的日志类型 或要输出的文本内容
 */
export type PrintLogType = "req" | "res" | "err";
export type ThemeColorType = "primary" | "success" | "danger" | "warning" | "info";
export function printLog(data: any, type: PrintLogType | ThemeColorType = "req", text: string = "") {
  if (["req", "res", "err"].includes(type)) {
    const map: CommonObj = {
      req: {
        text: "请求参数",
        bgColor: cssVars.colorPrimary,
      },
      res: {
        text: "响应数据",
        bgColor: cssVars.colorSuccess,
      },
      err: {
        text: "错误数据",
        bgColor: cssVars.colorDanger,
      },
    };
    const { text, bgColor } = map[type];
    console.log(`%c ${text}：`, `background:${bgColor};color:#fff;`, data);
  } else {
    const bgColor = themeMap[type as ThemeColorType];
    console.log(`%c ${text}：`, `background:${bgColor};color:#fff;`, data);
  }
}

/**
 * 处理时间：后端的时间为 1000-01-01 00:00:00 时，实际上是空值
 * @param text 要显示的文本内容
 * @param color 文本颜色
 */
export function devErrorTips(
  text: string = "",
  type: ThemeColorType | "" = "danger"
): string | VNode<RendererNode, RendererElement, { [key: string]: any }> {
  if (isDev) return type ? h("span", { style: `color: ${themeMap[type]};` }, `${text}`) : text;
  return text;
}

/**
 * 处理时间：后端的时间为 1000-01-01 00:00:00 时，实际上是空值
 * @param text 要显示的文本内容
 * @param color 文本颜色
 */
export function renderValue(val?: string): string {
  return emptyVals.includes(val) ? "-" : (val as string);
}

/**
 * 防抖：指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
 * @param {(that:any,event:Event,args:CommonObj) => void} fn 回调函数
 * @param {Boolean} immediate 是否立即执行
 * @param {Number} delay 延迟时间
 * @example methods: {onSubmit: debounce((that, event, ...args) => {console.log("防抖测试");})}
 */
export function debounce(fn: (that: any, event: Event, ...args: any) => void, immediate = true, delay = 1000) {
  let timer: any = null;
  return function (event: Event, ...args: any) {
    if (timer) clearTimeout(timer);
    if (immediate) {
      const canExe = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (canExe) {
        fn(this, event, ...args);
      } else {
        showMessage("您的操作太频繁了", "warning");
      }
    } else {
      timer = setTimeout(() => {
        fn(this, event, ...args);
        timer = null;
      }, delay);
    }
  };
}

/**
 * 节流：指连续触发事件，但是在 n 秒内只执行一次函数
 * @param {(that:any,event:Event,args:CommonObj) => void} fn 回调函数
 * @param {Boolean} immediate 是否立即执行
 * @param {Number} delay 延迟时间
 * @example methods: {onSubmit: throttle((that, event, ...args) => {console.log("节流测试");})}
 */
export function throttle(fn: (that: any, event: Event, ...args: any) => void, immediate = true, delay = 1000) {
  if (immediate) {
    let previous = 0;
    return function (e: Event, ...args: any) {
      const now = Date.now();
      if (now - previous > delay) {
        fn(this, e, ...args);
        previous = now;
      }
    };
  } else {
    let timer: any = null;
    return function (e: Event, ...args: any) {
      if (!timer) {
        timer = setTimeout(() => {
          fn(this, e, ...args);
          timer = null;
        }, delay);
      }
    };
  }
}

/**
 * 处理ElementPlus表格的汇总
 * @param exceptKeys 要排除掉的不进行汇总的列prop
 */
export interface SummaryMethodProps<T = CommonObj> {
  columns: TableColumnCtx<T>[];
  data: T[];
}
export function handleTableSummary(param: SummaryMethodProps, exceptKeys?: string[]) {
  const { columns, data } = param;
  const sums: string[] = [];
  columns.forEach((column, index) => {
    if (index === 0) return (sums[index] = "合计");
    const values = data.map(item => Number(item[column.property]));
    if (values.every(value => Number.isNaN(value))) {
      sums[index] = "-"; //N/A
    } else {
      if (exceptKeys?.includes(column.property)) {
        sums[index] = "-";
      } else {
        sums[index] = `${values.reduce((prev, curr) => {
          const value = Number(curr);
          return Number.isNaN(value) ? prev : prev + curr;
        }, 0)}`;
      }
    }
  });
  return sums;
}

/**
 * 获取屏幕大小的类型，对应着element-plus定义的屏幕类型
 * @return string 屏幕类型
 */
export type ScreenSizeType = "xs" | "sm" | "md" | "lg" | "xl";
export function getScreenSizeType(w = document.body.offsetWidth): ScreenSizeType {
  if (w < 768) return "xs";
  if (w >= 768 && w < 992) return "sm";
  if (w >= 992 && w < 1200) return "md";
  if (w >= 1200 && w < 1920) return "lg";
  if (w >= 1920) return "xl";
  return "xl";
}

/**
 * 获取popover的属性值
 * @param popover
 * @returns
 */
export function getPopoverAttrs(popover?: string | PopoverAttrs): PopoverAttrs | undefined {
  if (!popover) return;
  const t = typeof popover;
  if (t === "string") return { content: popover as string };
  if (t === "object") {
    if (isVNode(popover) || popover.render || popover.component) return { defaultSlot: popover };
    return popover as PopoverAttrs;
  }
  throw new Error(`暂不支持此popover类型：${t}`);
}

/**
 * 获取label的最大字符长度
 * @param fields 表单域
 * @param num 额外的空白宽度，默认2 // 2是因为：一个是间距宽度，一个是*宽度
 */
export function getMaxLength(fields: FormField[] = [], num = 2): number {
  let max = 1;
  fields.forEach(item => {
    if (typeOf(item) !== "Object") return;
    const { label, children, extraAttrs } = item as FormFieldAttrs;
    const popNum = extraAttrs?.popover ? 1 : 0;
    if (label?.length + popNum > max) {
      max = getChinaCharLength(label) + popNum; //全角符算1个，半角符算0.5个字符
    }
    if (children) {
      const _max = getMaxLength(children, 0);
      if (_max > max) max = _max;
    }
  });
  return max + num;
}

/**
 * 获取用户信息
 * @returns
 */
export function getUserInfo(id = ""): CommonObj | null {
  const info = storage.getItem("userInfo");
  const path = location.hash.slice(1);
  if (!noAuthPaths.some((it: string) => path.startsWith(it)) && !info) {
    // if (!info) showMessage("检测到未登录异常", "error");
    console.error(`检测到未登录异常，在${location.pathname}：${id}处执行`);
  }
  return info;
}

/**
 * 计算src/components下开发的有效页面
 * @return
 */
export function getDevelopComponents() {
  const comps = import.meta.glob("@/components/**/**/*.vue");
  const allNames = Object.keys(comps);
  const unValidNames: string[] = []; //无效页面
  //有效页面
  const valideNames = allNames.filter((key: string) => {
    if (key.includes(" ")) unValidNames.push(key);
    return !key.includes(" ");
  });
  return {
    valideNames,
    unValidNames,
  };
}
