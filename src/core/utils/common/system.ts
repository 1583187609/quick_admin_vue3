/********************************************************************/
/**************** 系统级别的方法，可能因工程改变而改变 ****************/
/********************************************************************/

import { ThemeColorType, emptyStr, needParam, typeOf } from "@/core/utils";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { CommonObj, GetRequired, OptionItem, StrNum } from "@/core/_types";
import { emptyVals, emptyTime } from "@/utils";
import cssVars from "@/assets/styles/_var.module.scss";
import dayjs from "dayjs";
import _ from "lodash";
import * as xlsx from "xlsx";

interface OptionPropsMap {
  label?: string;
  value?: string;
  children?: string;
}

const { upperFirst, snakeCase } = _;
const defaultOptionPropsMap: GetRequired<OptionPropsMap> = {
  label: "label",
  value: "value",
  children: "children",
};

/**
 * 导入excel中的数据
 * @param {any} fileBuffer
 * @param {CommonObj} opts
 * @returns {unknown[]}
 */
export function importExcel(
  fileBuffer: any,
  opts = {
    defval: "", //默认值配置
  }
): CommonObj[] {
  const workbook = xlsx.read(fileBuffer, { type: "buffer" }); // 获取 workbook
  const firstSheetName = workbook.SheetNames[0]; // 获取第一张表名
  const firstSheet = workbook.Sheets[firstSheetName]; // 获取第一张表
  return xlsx.utils.sheet_to_json(firstSheet, opts); // 获取数据
}

/**
 * 导出（下载）Excel数据表
 * @param {string[][]} data 要下载的数据  例：[["A1", "B1", "C1"], ["A2", "B2", "C2"],["A3", "B3", "C3"]]   通常第一行是表头，可以单独拼接
 * @param {string} fileName 文件名称
 * @param {string} sheetName 表名称
 * @param {Function} callback 回调函数
 * @link 参考链接 https://www.jianshu.com/p/f9ba3dd3cd4f
 */
export function exportExcel(
  data: string[][] = [],
  fileName = dayjs().format("YYYYMMDD"),
  sheetName = "表1",
  callback?: () => void
) {
  const wb = xlsx.utils.book_new(); // 创建workbook
  // 创建sheet
  // const ws = xlsx.utils.aoa_to_sheet(data);
  const ws = xlsx.utils.json_to_sheet(data, {
    // header: ["A", "B", "C", "D", "E", "F", "G"],
    skipHeader: true,
  });
  xlsx.utils.book_append_sheet(wb, ws, sheetName); // 把sheet放入workbook
  xlsx.writeFile(wb, fileName + ".xls"); // 写入文件(通过文件名控制导出的类型)
  callback?.();
}

/**
 * 获取时间阶段
 */
export function getTimePeriodAlias() {
  const hours = new Date().getHours();
  if (hours < 1) return "凌晨";
  if (hours < 8) return "清晨";
  if (hours < 11) return "上午";
  if (hours < 13) return "中午";
  if (hours < 18) return "下午";
  if (hours < 20) return "傍晚";
  if (hours < 23) return "晚上";
  return "深夜";
}

/**
 * 获取时间（几年/月/天/小时/分钟前）
 * @param {any} time 要处理的时间
 */
export function getTimeAgo(time: any = needParam()) {
  if (!time) return "";
  time = dayjs().diff(time) / 1000;
  const y = Math.floor(time / (60 * 60 * 24 * 365));
  if (y > 0) return `${y}年前`;
  const M = Math.floor(time / (60 * 60 * 24 * 30));
  if (M > 0) return `${M}月前`;
  const d = Math.floor(time / (60 * 60 * 24));
  if (d > 0) return `${d}天前`;
  const h = Math.floor(time / (60 * 60));
  if (h > 0) return `${h}小时前`;
  const m = Math.floor(time / 60);
  if (m > 0) return `${m}分钟前`;
  return "刚刚";
}

/**
 * 处理平台默认值问题 Form echo data
 * @param {FormFieldAttrs} field 要处理的字段
 * @param {CommonObj} modelValue 字段值
 * @tips 后端的数据库日期必须有一个默认值，回显的时候会显示这个默认值，因为数据量较多，改动较大，所以由前端统一处理
 */
export function handleFormInitData(field: FormFieldAttrs, modelValue?: CommonObj) {
  if (!modelValue || emptyVals.includes(emptyTime)) return;
  const { type, prop } = field;
  const propType = typeOf(prop);
  if (type?.includes("date")) {
    if (propType === "String") {
      if (modelValue[prop as string] === emptyTime) modelValue[prop as string] = "";
      return;
    }
    if (propType === "Array") {
      (prop as string[]).forEach((key: string) => {
        if (modelValue[key] === emptyTime) modelValue[key] = "";
      });
    }
  }
}

/**
 * 计算弹性布局时，末尾需要的空盒子个数
 * @param {number} total  总共多少个元素
 * @param {number} cols   多少列布局
 * @returns {number}
 */
export function getEmptyNum(total: number, cols: number): number {
  return cols - (total % cols);
}

/**
 * 对象数组排序（默认order）
 * @param { OptionItem[]} opts 要排序的数组
 * @param {number[]} inds 排序依据的对象属性键名
 */
export function getTextFromOpts(opts: OptionItem[] = [], inds: number[] = []) {
  let text = "";
  function cycle(opts: OptionItem[], ind: number = 0) {
    const { label = "", children = [] } = opts?.[inds[ind]] || {};
    text += label;
    if (children?.length) cycle(children, ind + 1);
  }
  cycle(opts);
  return text;
}

/**
 * 获取图片的http请求路径
 * @param {string} path 图片路径
 * @returns {string}
 */
export const getImgUrl = (path: string): string => {
  return new URL(path, import.meta.url).href;
};

/**
 * 根据值(非数组)从options获取label文本
 * @param {CommonObj} options 下拉项
 * @param {StrNum} val 查找依据值
 * @param {OptionPropsMap} propsMap props映射
 * @param {string} emptyChar 空字符串
 */
export function getLabelFromOptionsByLastValue(
  options: CommonObj[],
  val: StrNum,
  propsMap?: OptionPropsMap,
  emptyChar = emptyStr
) {
  const { label: labelKey, value: valueKey, children: childrenKey } = { ...defaultOptionPropsMap, ...propsMap };
  let target: CommonObj | undefined;
  function getLabel(opts: CommonObj[]): boolean {
    return !!opts.find(item => {
      const children = item[childrenKey];
      const value = item[valueKey];
      const isFind = value === val;
      if (isFind) {
        target = item;
      } else {
        if (children?.length) return getLabel(children);
      }
      return isFind;
    });
  }
  getLabel(options);
  return target?.[labelKey] ?? emptyChar;
}

/**
 * 根据值（数组）从options获取label文本
 * @param {CommonObj} options 下拉项
 * @param {StrNum} val 查找依据值
 * @param {OptionPropsMap} propsMap props映射
 * @param {string} emptyChar 空字符串
 */
export function getLabelFromOptionsByAllValues(
  options: CommonObj[] = [],
  values: StrNum[],
  propsMap?: OptionPropsMap,
  emptyChar = emptyStr,
  joinChar = "，"
) {
  const { label: labelKey, value: valueKey, children: childrenKey } = { ...defaultOptionPropsMap, ...propsMap };
  const labels: string[] = [];
  function getLabel(opts: CommonObj[], level = 0) {
    opts.find(item => {
      const children = item[childrenKey];
      const value = item[valueKey];
      const label = item[labelKey];
      const isFind = value === values[level];
      if (isFind) {
        labels.push(label);
        if (children) getLabel(children, ++level);
      }
      return isFind;
    });
  }
  getLabel(options);
  return labels.join(joinChar) || emptyChar;
}

/***
 * 获取select、cascader、tree下拉项中的文本
 * @param {OptionPropsMap} propsMap 属性名映射
 */
export function getTextFromOptions(options: CommonObj[], val: StrNum | StrNum[], propsMap?: OptionPropsMap, char = emptyStr) {
  if (emptyVals.includes(val as any)) return char;
  const t = typeOf(val);
  if (t === "Array") return getLabelFromOptionsByAllValues(options, val as StrNum[], propsMap, char);
  if (["String", "Number"].includes(t)) return getLabelFromOptionsByLastValue(options, val as StrNum, propsMap, char);
  throw new Error(`暂未处理此种情况：${t}`);
}

/**
 * 根据url地址下载文件
 * @param {string} url  下载地址
 * @param {string} name  文件名称
 */
export function downloadByUrl(url: string, name: string = dayjs().format("YYYY-MM-DD")) {
  const a = document.createElement("a");
  a.download = name;
  a.href = url;
  a.style.display = "none";
  a.click();
  a.remove();
}

/**
 * 根据 bufferData 下载文件
 * @param {string} buffer  Buffer数据
 * @param {string} name  文件名称
 */
export function downloadByBuffer(buffer, name?: string) {
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = window.URL.createObjectURL(blob);
  downloadByUrl(url, name);
}

/**
 * 获取浏览器默认语言
 * @returns {string} zh | en
 */
export function getBrowserLang() {
  const lang = (navigator.language ?? navigator?.browserLanguage).toLowerCase();
  return ["cn", "zh", "zh-cn"].includes(lang) ? "zh" : "en";
}

/**
 * 判断是否位于 dialog 弹窗中
 * @param {string} selectorClassName 选择器类名
 * @param {number} maxLevel 最多监测嵌套5层
 * @param {any} baseCrudRef 目标元素DOM
 * @notice 先不要删除，后面可能会有用
 * @example 使用示例 judgeIsInDialog("basic-dialog");
 */
export function judgeIsInDialog(selectorClassName: string = "basic-dialog", maxLevel: number = 5, baseCrudRef: any) {
  let isInDialog = false;
  getTargetPar(maxLevel);
  function getTargetPar(sLevel = 0) {
    let targetPar = baseCrudRef.value.parentNode;
    while (sLevel > 0) {
      targetPar = targetPar?.parentNode;
      sLevel--;
      if (targetPar?.classList?.contains(selectorClassName)) {
        isInDialog = true;
        break;
      }
    }
  }
  return isInDialog;
}

/**
 * 获取输入框的限制范围内的值
 * @param {Event} e 事件对象
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns
 */
export const getInputLimitNum = (value: any, min?: number, max?: number, fixNum?: number) => {
  if ([null, undefined, ""].includes(value)) return value;
  let val: string | number = Number(value);
  if (min !== undefined && val < min) val = min;
  if (max !== undefined && val > max) val = max;
  if (fixNum !== undefined) val = val.toFixed(2);
  return val;
};

/**
 * 尝试导入多个文件路径的文件
 * @param filePaths 多个文件的路径
 * @returns
 */
// export function importFileFromPaths(paths: string[] = []) {
//   const preFix = "../../../";
//   return new Promise((resolve, reject) => {
//     import(paths[0])
//       .then(res => resolve(res))
//       .catch(err => {
//         import(paths[1]).then(res => resolve(res)).catch(err => reject(err));
//       });
//   });
// }

/**
 * 获取系统主题色
 * @param type 主题色类型
 * @returns {string}
 */
export function getSysThemeColor(type: ThemeColorType) {
  return cssVars["color" + upperFirst(type)];
}
