import { CommonObj, CommonSize } from "@/vite-env";
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
} from "@/components/_utils";
import { TableCol, TableColAttrs } from "@/components/table/_types";
import { defaultColumnAttrs, specialColKeys, specialColMap } from "@/components/table";
import { BtnItem } from "@/components/BaseBtn/_types";
import { OperateBtnsAttrs } from "@/components/table/_components/GroupBtns.vue";
import { getTempGroupBtnsOfRow } from "@/components/crud/BaseCrud";
import { SpecialTableColType } from "@/components/table/_types";
import cssVars from "@/assets/styles/_var.module.scss";
import { filterBtnsByAuth } from "@/components/crud/_utils";
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
export function getGroupBtnsOfRow(row: CommonObj, ind: number, props: CommonObj, newCols: TableColAttrs[]) {
  const { operateBtns = [], rows, operateBtnsAttrs, filterByAuth, disabled, size } = props;
  const btnAttrs = { attrs: { disabled } };
  const tempBtns = getTempGroupBtnsOfRow(row, ind, operateBtns, btnAttrs);
  const filterBtns = filterBtnsByAuth?.(tempBtns, filterByAuth) ?? tempBtns;
  const operateCol = newCols.at(-1)!;
  // 如果开启优化，则不会再进行操作栏列宽的计算
  if (isOptimization) {
    operateCol.width = 100;
    return filterBtns;
  }
  if (operateCol.width) return filterBtns; // 如果操作栏设置了宽度，则不再进行自动计算，可用于性能优化
  const width = getOperateColWidth(operateBtnsAttrs, filterBtns, size);
  const isLastRow = ind === rows.length - 1;
  if (!isLastRow) {
    if (operateWidth < width) operateWidth = width;
  } else {
    //如果操作栏没有按钮，则按照最小宽度展示操作栏，例如新增按钮
    // if (operateWidth < 30) {
    //  operateWidth = getOperateColWidth(operateBtnsAttrs, undefined, size);
    // }
    operateCol.width = operateWidth;
  }
  return filterBtns;
}

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
 * 获取推断的表格列属性
 * @param col 表格列配置属性
 * @returns
 */
export function getInferredColAttrs(col: TableColAttrs) {
  const { type, prop, label, formatter } = col;
  if (typeof label !== "string") return;
  const colAttrs: TableColAttrs = {};
  // 是否需要处理多级 props
  let isHandleMultiProps = !isOptimization && prop?.includes(".") && !formatter;
  if (isHandleMultiProps) {
    colAttrs.formatter = (row: CommonObj) => flatPropsValue(row, prop as string);
  }
  if (label?.includes("时间")) {
    colAttrs.minWidth = 164;
    if (type !== "custom") {
      colAttrs.formatter = (row: CommonObj) => {
        const val = isHandleMultiProps ? flatPropsValue(row, prop as string) : row[prop as string];
        return renderValue(emptyTime === val ? undefined : val);
      };
    }
  }
  if (!isOptimization && !type) {
    label?.includes("备注") && Object.assign(colAttrs, specialColMap.remark);
    // label?.includes("id") && Object.assign(colAttrs, specialColMap.id);
  }
  return colAttrs;
}

// 获取col和level
export function getColAndLevel(col: TableColAttrs, lev = 0, size: CommonSize = defaultCommonSize): CommonObj {
  let newLev = lev;
  const { children, type, prop, label, visible = true, exportable = true, formatter } = col;
  const specialColAttrs = specialColMap[type as string];
  const { getInferredAttrs } = specialColAttrs || {};
  // 如果是index、sort、selection、operate特殊列
  if (type && specialColKeys.includes(type as SpecialTableColType)) {
    const newCol = merge({ visible, exportable }, defaultColumnAttrs, specialColAttrs, getInferredAttrs?.(col), col);
    return { col: newCol, level: 1 };
  }
  const inferredColAttrs = getInferredColAttrs(col);
  const newCol = merge(
    { visible, exportable },
    defaultColumnAttrs,
    specialColAttrs,
    inferredColAttrs,
    getInferredAttrs?.(col),
    col
  );
  if (typeOf(newCol.prop) === "Array") {
    newCol.prop = (newCol.prop as [string, string]).join(propsJoinChar);
  }
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
 * 获取处理之后的列
 * @param props 传入的属性
 * @returns
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
      newCol = { ...specialColMap.operate, ...newCol };
    } else if (type === "index") {
      if (currPage && pageSize && newCol.index === undefined) {
        newCol.index = (ind: number) => ind + 1 + (currPage - 1) * pageSize;
      }
    }
    if (level > maxLevel) maxLevel = level;
    return newCol;
  });
  if (!hasOperateCol && operateBtns?.length) newCols.push(getColAndLevel(specialColMap.operate, 1, size).col);
  cb?.(maxLevel, newCols);
  return newCols.filter(col => !!col && col.visible); // 过滤掉非对象的列;
}
