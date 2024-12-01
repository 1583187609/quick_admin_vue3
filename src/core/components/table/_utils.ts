import { CommonObj, CommonSize, StrNum } from "@/vite-env";
import {
  typeOf,
  propsJoinChar,
  emptyTime,
  renderValue,
  defaultGroupBtnsMaxNum,
  getChinaCharLength,
  defaultCommonSize,
  isOptimization,
  emptyStr,
} from "@/core/utils";
import { TableCol, TableColAttrs } from "@/core/components/table/_types";
import { defaultColumnAttrs, specialColKeys, defaultTableColTpls } from "@/core/components/table";
import { BtnItem } from "@/core/components/BaseBtn/_types";
import { OperateBtnsAttrs } from "@/core/components/table/_components/GroupBtns.vue";
import { getTempGroupBtnsOfRow } from "@/core/components/crud/BaseCrud";
import { SpecialTableColType } from "@/core/components/table/_types";
import cssVars from "@/assets/styles/_var.module.scss";
import { filterBtnsByAuth } from "@/core/components/crud/_utils";
import _ from "lodash";

const { merge } = _;

export const operateBtnsEmitName = "operateBtns";

//获取操作栏的宽度
const { gapLarge, gapDefault, gapSmall } = cssVars;
const sizeMap = {
  large: {
    fontSize: 14,
    btnPadding: parseInt(gapLarge),
    btnMargin: parseInt(gapLarge),
    cellPadding: parseInt(gapLarge) + 12,
  },
  default: {
    fontSize: 14,
    btnPadding: parseInt(gapDefault),
    btnMargin: parseInt(gapDefault),
    cellPadding: parseInt(gapDefault) + 12,
  },
  small: {
    fontSize: 12,
    btnPadding: parseInt(gapSmall),
    btnMargin: parseInt(gapSmall),
    cellPadding: parseInt(gapSmall) + 12,
  },
};
/**
 * 获取操作列的宽度
 * @param {OperateBtnsAttrs} operateBtnsAttrs 操作栏按钮属性
 * @param {BtnItem[]} btns 按钮数组
 * @param {CommonSize} size 按钮大小
 * @returns {number} 操作列宽度
 */
function getOperateColWidth(operateBtnsAttrs: OperateBtnsAttrs = {}, btns?: BtnItem[], size: CommonSize = "large"): number {
  const { fontSize, btnPadding, btnMargin, cellPadding } = sizeMap[size] as CommonObj;
  //最小宽度
  if (!btns) return 3 * fontSize + 1 * btnPadding * 2 + cellPadding * 2;
  let em = 0; //按钮文字字符数量
  let width = 0;
  const { vertical, maxNum = defaultGroupBtnsMaxNum } = operateBtnsAttrs as OperateBtnsAttrs;
  if (btns.length > maxNum) {
    btns = btns.slice(0, maxNum - 1).concat([{ text: "更多" } as BtnItem]);
  }
  if (vertical) {
    btns.forEach((item: BtnItem) => {
      // if (!item) return; //已经过滤过了，所以无需过滤，故注释掉
      em = getChinaCharLength(item.text) + 1; //文字加图标 (全角符算1个，半角符算0.5个字符)
      const currWidth = em * fontSize + btnPadding * 2 + cellPadding * 2; //字符的宽度 + 按钮左右padding值 + 各个按钮之间的margin值 + 单元格的左右padding值
      if (currWidth > width) width = currWidth;
    });
  } else {
    btns.forEach((item: BtnItem) => {
      // if (!item) return; //已经过滤过了，所以无需过滤，故注释掉
      em += getChinaCharLength(item.text) + 1; //文字加图标 (全角符算1个，半角符算0.5个字符)
    });
    width = em * fontSize + btns.length * btnPadding * 2 + (btns.length - 1) * btnMargin + cellPadding * 2; //字符的宽度 + 按钮左右padding值 + 各个按钮之间的margin值 + 单元格的左右padding值
  }
  return width;
}

//获取每一行的分组按钮
export function getGroupBtnsOfRowSimple(row: CommonObj, $rowInd: number, props: CommonObj) {
  const { operateBtns, filterByAuth } = props;
  const tempBtns = getTempGroupBtnsOfRow(row, $rowInd, operateBtns);
  return filterBtnsByAuth(tempBtns, filterByAuth);
}

let operateWidth = 0; //操作栏的宽度
// 获取每一行的分组按钮
export function getGroupBtnsOfRow(row: CommonObj, rowInd: number, props: CommonObj, operateCol?: TableColAttrs, cb?: (width: StrNum) => void) {
  const { operateBtns = [], rows, operateBtnsAttrs, filterByAuth, disabled, size } = props;
  const btnAttrs = { attrs: { disabled } };
  const tempBtns = getTempGroupBtnsOfRow(row, rowInd, operateBtns, btnAttrs);
  const filterBtns = filterBtnsByAuth?.(tempBtns, filterByAuth) ?? tempBtns;
  // 如果没有操作栏按钮或者已手动设置操作栏宽度，则无需处理操作栏的宽度，故直接返回
  if (!operateBtns?.length || operateCol?.width) return filterBtns;
  // 如果开启优化，则不会再进行操作栏列宽的计算
  if (isOptimization) {
    cb?.(100);
    return filterBtns;
  }
  const width = getOperateColWidth(operateBtnsAttrs, filterBtns, size);
  const isLastRow = rowInd === rows.length - 1;
  if (!isLastRow) {
    if (operateWidth < width) operateWidth = width;
  } else {
    //如果操作栏没有按钮，则按照最小宽度展示操作栏，例如新增按钮
    // if (operateWidth < 30) {
    //  operateWidth = getOperateColWidth(operateBtnsAttrs, undefined, size);
    // }
    cb?.(operateWidth);
  }
  return filterBtns;
}

/**
 * 根据带.的props读取数据值
 * @param row 表格行数据
 * @param prop prop值
 * @returns any
 */
export function flatPropsValue(row: CommonObj, prop: string) {
  const keys = (prop as string).split(".");
  let data: CommonObj = row;
  for (const key of keys) {
    data = row[key];
    if (typeof data === "undefined") return emptyStr;
  }
  return data;
}

/**
 * 获取系统推断的表格列属性（根据label名称等标志，推断一些属性值）
 * @param col 表格列配置属性
 * @returns
 */
function getSysInferredAttrs(col: TableColAttrs) {
  const { width, minWidth, type, prop, label, formatter } = col;
  if (typeof label !== "string") return;
  const colAttrs: TableColAttrs = {};
  // 是否需要处理多级 props
  const isMultiProps = !isOptimization && prop?.includes(".") && !formatter;
  if (isMultiProps) colAttrs.formatter = (row: CommonObj) => flatPropsValue(row, prop as string);
  // 如果未设置宽度，则进行推断处理宽度
  const noWidth = !width && !minWidth;
  if (noWidth) {
    if (label?.includes("时间")) {
      colAttrs.minWidth = 164;
      if (type !== "custom") {
        colAttrs.formatter = (row: CommonObj) => {
          const val = isMultiProps ? flatPropsValue(row, prop as string) : row[prop as string];
          return renderValue(emptyTime === val ? undefined : val);
        };
      }
    }
    if (!isOptimization) {
      if (label?.includes("备注")) Object.assign(colAttrs, defaultTableColTpls.remark);
      // label?.includes("id") && Object.assign(colAttrs, defaultTableColTpls.id);
    }
  }
  // 如果仍未设置宽度，则以label字符长度+1为宽度
  // if (!colAttrs.width && !colAttrs.minWidth) {
  //   colAttrs.minWidth = label.length + 1 + "em";
  // }
  return colAttrs;
}

// 获取col和level
export function getColAndLevel(col: TableColAttrs, lev = 0, size: CommonSize = defaultCommonSize): CommonObj {
  let newLev = lev;
  const { getInferredAttrs, ...restCol } = col as any;
  const { children, type, visible = true, exportable = true } = restCol;
  // 如果是index、sort、selection、operate几个特殊列
  const isSpecialCol = type && specialColKeys.includes(type as SpecialTableColType);
  const sysInferredAttrs = isSpecialCol ? undefined : getSysInferredAttrs(restCol);
  const newCol = merge({ visible, exportable }, defaultColumnAttrs, sysInferredAttrs, getInferredAttrs?.(restCol), restCol);
  // newCol.width ?? newCol.minWidth ?? (newCol.minWidth = `${newCol.label.length + 1}em`);
  if (isSpecialCol) return { col: newCol, level: 1 };
  if (typeOf(newCol.prop) === "Array") newCol.prop = (newCol.prop as [string, string]).join(propsJoinChar);
  //如果是大/小型的紧凑型，那么所有的宽度均要增加/减少20px
  // const numMap = {
  //   small: -20,
  //   default: 0,
  //   large: 20,
  // };
  // if (size !== "default") {
  //   const { width, minWidth } = newCol;
  //   width && (newCol.width += numMap[size]);
  //   minWidth && (newCol.minWidth += numMap[size]);
  // }
  // if (minWidth) {
  //   delete newCol.width;
  // }
  if (children?.length) {
    newCol.children = children.map((item: TableCol) => {
      if (typeOf(item) !== "Object") return 0;
      const { col, level } = getColAndLevel(item as TableColAttrs, lev++, size);
      if (level > newLev) newLev = level;
      return col;
    });
  }
  return { col: newCol, level: newLev };
}

/**
 * 将列处理成标准数据结构的列
 * @param {object} props 传入的属性
 * @returns {object[]} 返回标准数据结构的列
 */
export function getHandleCols(props: CommonObj, cb?: (maxLev: number, cols: TableColAttrs[]) => void) {
  let hasOperateCol = false;
  let maxLevel = 0;
  const { cols = [], operateBtns, currPage, pageSize, size } = props;
  const newCols = cols.map(col => {
    // if (!col) return col;
    let { col: newCol, level } = getColAndLevel(col, 1, size);
    const { type } = newCol;
    if (type === "operate") {
      hasOperateCol = true;
      newCol = { ...defaultTableColTpls.operate, ...newCol };
    } else if (type === "index") {
      if (currPage && pageSize && newCol.index === undefined) {
        newCol.index = (ind: number) => ind + 1 + (currPage - 1) * pageSize;
      }
    }
    if (level > maxLevel) maxLevel = level;
    return newCol;
  });
  if (!hasOperateCol && operateBtns?.length) newCols.push(getColAndLevel(defaultTableColTpls.operate, 1, size).col);
  cb?.(maxLevel, newCols);
  return newCols.filter(col => !!col && col.visible); // 过滤掉非对象的列;
}
