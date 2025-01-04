/********************************************************************/
/*************** 为Vue或React或各UI平台差异化单独写的方法 *************/
/********************************************************************/

import cssVars from "@/assets/styles/_var.module.scss";
import { RendererElement, RendererNode, VNode, h, isVNode, markRaw } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { emptyStr, emptyVals, getChinaCharLength, isDev, storage, typeOf, defaultPopoverAttrs, noAuthPaths } from "@/core/utils";
import { FormField, FormFieldAttrs } from "@/core/components/form/_types";
import type { MessageParams, TableColumnCtx } from "element-plus";
import { CommonObj, TostMessageType } from "@/core/_types";
import { PopoverAttrs, PopoverSlots } from "@/core/_types";
import { HArgs, RenderVue } from "@/core/components/BaseRender.vue";
// import { getBtnObj } from "../components/BaseBtn";
import _ from "lodash";

const { upperFirst } = _;

export const themeMap = {
  primary: cssVars.colorPrimary,
  success: cssVars.colorSuccess,
  danger: cssVars.colorDanger,
  warning: cssVars.colorWarning,
  info: cssVars.colorInfo,
};

/**
 * 展示message提示信息，默认展示成功通知
 * @param hint string, MessageParams 提示内容
 */
export function showMessage(hint: string | MessageParams, type: TostMessageType = "success") {
  if (!hint) return;
  if (typeof hint !== "string") return ElMessage(hint);
  const speed = 7; //速度：7字/秒
  let duration = (hint.length / speed) * 1000;
  if (duration < 1500) duration = 1500;
  ElMessage({
    message: hint,
    type,
    duration,
    grouping: true,
    showClose: duration > 2000,
  });
}

/**
 * 显示确认提示框
 * @param htmlStr 提示的文本内容
 * @param type 提示框类型
 * @param {string} title 标题
 * @param lightWords 高亮文字
 * @returns {Promise}
 */
export function showConfirmMessage(htmlStr: string, type: ThemeColorType = "warning", title = "温馨提示", lightWords: string[] = []) {
  const typeMap = { danger: "error" };
  const colorType = type;
  // const colorKey = `color${upperFirst(colorType)}`;
  // const color = cssVars[colorKey];
  // const style = `style="color:${color};"`;
  // const lightStr = `<b ${style}>${0}</b>`;
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(htmlStr, title, {
      type: typeMap[type] ?? type,
      dangerouslyUseHTMLString: true,
      closeOnClickModal: false,
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      confirmButtonClass: `el-button--${colorType}`,
      cancelButtonClass: `el-button--${colorType} is-plain`,
      draggable: true,
    })
      .then(res => resolve(res))
      .catch(() => {});
  });
}

/**
 * 输出请求参数与响应数据的log信息
 * @param data any 要打印的数据
 * @param type PrintLogType 要打印的日志类型 或要输出的文本内容
 */
export type PrintLogType = "req" | "res" | "err" | "log";
export type ThemeColorType = "primary" | "success" | "danger" | "warning" | "info";
export function printLog(data: any, type: PrintLogType | ThemeColorType = "req", text: boolean | string = "") {
  if (["req", "res", "err", "log"].includes(type)) {
    const map: CommonObj = {
      req: {
        label: "请求参数",
        bgColor: cssVars.colorPrimary,
      },
      res: {
        label: "响应数据",
        bgColor: cssVars.colorSuccess,
      },
      err: {
        label: "错误数据",
        bgColor: cssVars.colorDanger,
      },
      log: {
        label: "查看数据",
        bgColor: cssVars.colorInfo,
      },
    };
    const { label, bgColor } = map[type];
    console.log(
      `%c ${text && typeof text === "string" ? text : "" + label}：`,
      `background:${bgColor};color:#fff;line-height:1.4;border-radius:4px;`,
      data
    );
  } else {
    const bgColor = themeMap[type as ThemeColorType];
    console.log(`%c ${text}：`, `background:${bgColor};color:#fff;line-height:1.4;border-radius:4px;`, data);
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
  return emptyVals.includes(val) ? emptyStr : (val as string);
}

/**
 * 防抖：指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
 * @param {(that:any,event:Event,args:CommonObj) => void} fn 回调函数
 * @param {Boolean} immediate 是否立即执行
 * @param {Number} delay 延迟时间
 * @example methods: {onSubmit: debounce((that, event, ...args) => {console.log("防抖测试");})}
 */
export function debounce(fn: (event: Event, ...args: any) => void, immediate = true, delay = 1000, showMsg = true) {
  let timer: any = null;
  return function (event: Event, ...args: any) {
    if (timer) clearTimeout(timer);
    if (immediate) {
      const canExe = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (canExe) {
        fn(event, ...args);
      } else {
        showMsg && showMessage("您的操作太频繁了", "warning");
      }
    } else {
      timer = setTimeout(() => {
        fn(event, ...args);
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
export function throttle(fn: (event: Event, ...args: any) => void, immediate = true, delay = 1000) {
  if (immediate) {
    let previous = 0;
    return function (e: Event, ...args: any) {
      const now = Date.now();
      if (now - previous > delay) {
        fn(e, ...args);
        previous = now;
      }
    };
  } else {
    let timer: any = null;
    return function (e: Event, ...args: any) {
      if (!timer) {
        timer = setTimeout(() => {
          fn(e, ...args);
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
      sums[index] = emptyStr; //N/A
    } else {
      if (exceptKeys?.includes(column.property)) {
        sums[index] = emptyStr;
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
export function getPopoverAttrs(popover?: PopoverAttrs | PopoverSlots | string | HArgs, width = "200px"): PopoverAttrs | PopoverSlots | undefined {
  if (!popover) return;
  const t = typeOf(popover);
  if (t === "String") return { ...defaultPopoverAttrs, width, content: popover } as PopoverAttrs;
  if (t === "Object") {
    // 如果是虚拟dom或者是引入的vue组件
    if ((popover as RenderVue).setup || isVNode(popover)) return { ...defaultPopoverAttrs, slots: { default: popover } } as PopoverAttrs;
    return { ...defaultPopoverAttrs, ...popover } as PopoverAttrs;
  }
  if (t === "Array") return { ...defaultPopoverAttrs, slots: { default: popover } } as PopoverAttrs;
  throw new Error(`暂不支持此popover类型：${t}`);
}

/**
 * 获取插槽映射
 * @param {any} slots 插槽值
 * @returns {Object}
 */
export function getSlotsMap(slots: any) {
  if (!slots) return;
  const t = typeOf(slots);
  if (t === "String") return { default: slots };
  if ((t === "Array" && slots.length <= 3) || (t === "Object" && (slots.setup || isVNode(slots)))) return { default: slots };
  return slots;
}

/**
 * 获取 el-form-item 的插槽
 * @param field
 */
export function getFormItemSlots(field: any, popover: any = ""): CommonObj {
  const { label, slots, quickAttrs } = field;
  if (!slots) return { label };
  if (!quickAttrs.popover) return slots;
  return slots;
}

/**
 * 获取el-table-column 的插槽
 * @param col
 */
export function getTableColumnSlots(col: any, popover: any = ""): CommonObj {
  const { label, slots } = col;
  if (!popover) return slots;
  if (!slots) return { header: label };
  return slots;
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
    const { label, children, quickAttrs } = item as FormFieldAttrs;
    const popNum = quickAttrs?.popover ? 1 : 0;
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

export function getModuleNames() {
  const files = import.meta.glob("@/modules/*-center/page.json", { eager: true, import: "default" });
  const opts = Object.entries(files).map(([key, val]) => {
    return { label: val.title, value: key.split("/")[3].split("-")[0] };
  });
  return opts;
}

/**
 * 计算开发的有效、无效vue组件
 * @param type 类型
 * @param name 模块名称，当类型为page时有效
 * @return
 */
export function getVueFiles(type: "comp" | "page" = "comp", name?: string) {
  const globMap = {
    comp: import.meta.glob("@/core/**/*.vue"),
    page: import.meta.glob("@/modules/**/*.vue"),
  };
  // const unValidChars = type === "comp" ? [" "] : [" ", "/_"];
  const unValidChars = [" "];
  let allNames = Object.keys(globMap[type]);
  if (type === "page" && name) {
    const sInd = "/src/modules/".length;
    allNames = allNames.filter(it => it.slice(sInd).startsWith(name));
  }
  const valideNames: string[] = []; //无效
  const unValidNames: string[] = []; //无效
  //有效
  allNames.forEach((key: string) => {
    const isUnValid = unValidChars.some(char => key.includes(char));
    isUnValid ? unValidNames.push(key) : valideNames.push(key);
  });
  return {
    valideNames,
    unValidNames,
  };
}

/***
 * 是否是可直接被BaseRender.vue渲染的元素
 */
export function isRenderData(ele: any) {
  const t = typeOf(ele);
  if (t === "String") return true;
  if (t === "Array" && ele.length >= 1 && ele.length <= 3) return true;
  if (t === "Object" && (ele.setup || isVNode(ele))) return true;
  return false;
}

/***
 * 是否是可直接被BaseRender.vue渲染的元素
 */
// export function isBaseBtn(data: any) {
//   if (!data) return false;
//   const t = typeOf(data);
//   if (t === "String") return [getBtnObj(data)];
//   if (t === "Array") {
//     const btns = data.map(it => getBtnObj(it));
//     return btns.find(it => !it) ? false : btns;
//   }
// }

/**
 * 获取自定义渲染的元素
 * @param {any} data
 * @returns
 */
// export function getCustomRender(data: any) {
//   const t = typeOf(data);
//   if (t === "Array") return data.length <= 3 ? h(...data) : undefined;
//   if (t === "Object") return data.setup || isVNode(data);
//   return undefined;
// }
