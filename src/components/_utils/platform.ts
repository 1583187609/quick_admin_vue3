/********************************************************************/
/*************** 为Vue或React或各UI平台差异化单独写的方法 *************/
/********************************************************************/

import cssVars from "@/assets/styles/_var.module.scss";
import { RendererElement, RendererNode, VNode, h } from "vue";
import { ElMessage } from "element-plus";
import { typeOf } from "@/utils";
import { PopoverAttrs } from "@/components/BaseFormItem";
import type { MessageParams, TableColumnCtx } from "element-plus";
import { CommonObj, TostMessageType } from "@/vite-env";

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
    const themeMap = {
      primary: cssVars.colorPrimary,
      success: cssVars.colorSuccess,
      danger: cssVars.colorDanger,
      warning: cssVars.colorWarning,
      info: cssVars.colorInfo,
    };
    const bgColor = themeMap[type as ThemeColorType];
    console.log(`%c ${text}：`, `background:${bgColor};color:#fff;`, data);
  }
}

/**
 * 处理时间：后端的时间为 1000-01-01 00:00:00 时，实际上是空值
 * @param text 要显示的文本内容
 * @param color 文本颜色
 * @param elTag 元素标签类型
 */
export function devErrorTips(
  text: string,
  attrs: CommonObj | null = {
    style: `color: ${cssVars.colorDanger};font-weight:600;`,
  },
  elTag: string | null = "span"
): string | VNode<RendererNode, RendererElement, { [key: string]: any }> {
  if (!elTag) return `~~${text}~~`;
  return h(elTag, attrs, `~~${text}~~`);
}

/**
 * 防抖：指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
 * @param {(that:any,event:Event,args:CommonObj) => void} fn 回调函数
 * @param {Number} delay 延迟时间
 * @param {Boolean} immediate 是否立即执行
 * @param {*} params 传入的参数
 * @example methods: {onSubmit: debounce((that, event, param) => {console.log("防抖测试");})}
 */
export function debounce(fn: (that: any, event: Event, args: CommonObj) => void, delay = 1000, immediate = true, params = {}) {
  let timer: any = null;
  return function (event: Event) {
    if (timer) clearTimeout(timer);
    if (immediate) {
      const canExe = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (canExe) {
        fn(this, event, params);
      } else {
        showMessage("您的操作太频繁了", "warning");
      }
    } else {
      timer = setTimeout(() => {
        fn(this, event, params);
        timer = null;
      }, delay);
    }
  };
}

/**
 * 节流：指连续触发事件，但是在 n 秒内只执行一次函数
 * @param {(that:any,event:Event,args:CommonObj) => void} fn 回调函数
 * @param {Number} delay 延迟时间
 * @param {Boolean} immediate 是否立即执行
 * @param {*} params 传入的参数
 * @example methods: {onSubmit: throttle((that, event, param) => {console.log("节流测试");})}
 */
export function throttle(fn: (that: any, event: Event, args: CommonObj) => void, delay = 1000, immediate = true, params = {}) {
  if (immediate) {
    let previous = 0;
    return function (event: Event) {
      const now = Date.now();
      if (now - previous > delay) {
        fn(this, event, params);
        previous = now;
      }
    };
  } else {
    let timer: any = null;
    return function (event: Event) {
      if (!timer) {
        timer = setTimeout(() => {
          fn(this, event, params);
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
    if (index === 0) {
      sums[index] = "合计";
      return;
    }
    const values = data.map(item => Number(item[column.property]));
    if (values.every(value => Number.isNaN(value))) {
      sums[index] = "-"; //N/A
    } else {
      if (exceptKeys?.includes(column.property)) {
        sums[index] = "-";
      } else {
        sums[index] = `${values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!Number.isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
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
export function getScreenSizeType(): ScreenSizeType {
  let size = "";
  const width = document.body.offsetWidth;
  if (width < 768) {
    size = "xs";
  } else if (width >= 768 && width < 992) {
    size = "sm";
  } else if (width >= 992 && width < 1200) {
    size = "md";
  } else if (width >= 1200 && width < 1920) {
    size = "lg";
  } else if (width >= 1920) {
    size = "xl";
  }
  return size as ScreenSizeType;
}

/**
 * 获取popover的属性值
 * @param popover
 * @returns
 */
export function getPopoverAttrs(popover?: string | PopoverAttrs): PopoverAttrs | undefined {
  if (!popover) return;
  const t = typeOf(popover);
  if (t === "String") return { content: popover as string };
  if (t === "Object") return popover as PopoverAttrs;
  throw new Error(`暂不支持此popover类型：${t}`);
}
