import { CommonObj, CommonSize } from "@/vite-env";
import {
  typeOf,
  propsJoinChar,
  emptyTime,
  renderValue,
  defaultGroupBtnsMaxNum,
  getChinaCharLength,
  defaultCommonSize,
} from "@/components/_utils";
import { TableCol, TableColAttrs } from "@/components/table/_types";
import {  defaultColumnAttrs } from "@/components/table";
import { merge } from "lodash";
import config from "@/config";
import { BtnItem } from "@/components/BaseBtn/_types";
import { OperateBtnsAttrs } from "./_components/GroupBtns.vue";
import {getTempGroupBtnsOfRow } from "@/components/crud/BaseCrud";
import {SpecialTableColType} from "@/components/table/_types"
import cssVars from "@/assets/styles/_var.module.scss";

/**
 * 表格特殊列
 */
export const specialColMap: CommonObj = Object.assign(
  {
    //序号列
    index: {
      prop: "$index",
      label: "序号",
      type: "index",
      width: 74, // 54,
      fixed: "left",
      // index: (ind: number) => ind + 1 + (currPage - 1) * pageSize,
    },
    //排序列
    sort: {
      prop: "$sort",
      label: "排序",
      type: "sort",
      width: 74, //54,
      fixed: "left",
    },
    //多选列
    selection: {
      prop: "$selection",
      label: "选择",
      type: "selection",
      width: 48,
      fixed: "left",
    },
    //操作列
    operate: {
      prop: "$operate",
      label: "操作",
      type: "operate",
      // minWidth: 250,
      fixed: "right",
    },
    //id：唯一标识id
    id: { prop: "id", label: "ID", minWidth: 70, fixed: "left" },
    //备注列
    remark: { prop: "remark", label: "备注", minWidth: 140 },
    //创建列
    create: {
      prop: ["createdName", "createdAt"],
      label: "创建时间",
      minWidth: 160,
    },
    //修改列
    update: {
      prop: ["updatedName", "updatedAt"],
      label: "修改时间",
      minWidth: 160,
    },
    //switch开关
    switch: {
      prop: "status",
      label: "启用状态",
      minWidth: 80,
      attrs: {
        activeValue: 1,
        inactiveValue: 0,
        activeText: "启用",
        inactiveText: "禁用",
        inlinePrompt: true,
        // onChange() {
        //   ElMessage.warning("暂未处理【启用/禁用】事件");
        // },
      },
    },
    //是否启用状态
    BaseTag: {
      prop: "status",
      label: "状态",
      minWidth: 90,
      attrs: { name: "EnableStatus" },
    },
    //图片
    BaseImg: {
      prop: "imgUrl",
      label: "图片",
      minWidth: 136,
      attrs: { size: "120" },
    },
    //文本省略显示，点击查看更多
    BaseText: {
      prop: "content",
      label: "内容",
      minWidth: 250,
    },
    // 文本复制
    BaseCopy: {
      minWidth: 190,
    },
    //用户信息
    // UserInfo: {
    //   prop: "userData",
    //   label: "用户信息",
    //   fixed: "left",
    //   getAttrs(col: TableColAttrs) {
    //     return {
    //       width: col?.attrs?.simple ? 222 : 440,
    //     };
    //   },
    // },
  },
  config?.table?.customSpecialCol
);

// 获取col和level
export function getColLevel(
  col: TableColAttrs,
  lev = 0,
  specialColMap: CommonObj,
  size: CommonSize = defaultCommonSize
): CommonObj {
  let newLev = lev;
  const { children, type, prop, label, minWidth } = col;
  const specialColAttrs = specialColMap[type as string];
  const { getAttrs } = specialColAttrs || {};
  const newCol = merge(
    {},
    defaultColumnAttrs,
    specialColAttrs,
    typeof label === "string" &&
      label?.includes("时间") && {
        minWidth: 164,
        formatter:
          type !== "custom" && typeof prop === "string"
            ? (row: CommonObj) => renderValue(emptyTime === row[prop] ? undefined : row[prop])
            : undefined,
      },
    getAttrs?.(col),
    col
  );
  if (typeOf(newCol.prop) === "Array") {
    newCol.prop = (newCol.prop as [string, string]).join(propsJoinChar);
  }
  //如果是大/小型的紧凑型，那么所有的宽度均要增加/减少20px
  // const numMap = {
  //   small: -20,
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
      const { col, level } = getColLevel(item as TableColAttrs, lev++, specialColMap);
      if (level > newLev) {
        newLev = level;
      }
      return col;
    });
  }
  return { col: newCol, level: newLev };
}

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
function getOperateColWidth(operateBtnsAttrs: OperateBtnsAttrs = {}, btns?: BtnItem[], size: CommonSize = "large"): number {
  const { fontSize, btnPadding, btnMargin, cellPadding } = sizeMap[size] as CommonObj;
  //最小宽度
  if (!btns) return 3 * fontSize + 1 * btnPadding * 2 + cellPadding * 2;
  let em = 0; //按钮文字字符数量
  let width = 0;
  // const { operateBtnsAttrs = {} } = props;
  const { vertical, maxNum = defaultGroupBtnsMaxNum } = operateBtnsAttrs as OperateBtnsAttrs;
  if (btns.length > maxNum) {
    btns = btns.slice(0, maxNum - 1).concat([{ text: "更多" } as BtnItem]);
  }
  if (vertical) {
    btns.forEach((item: BtnItem) => {
      // if (!item) return; //已经过滤过了，所以注释掉
      em = getChinaCharLength(item.text) + 1; //文字加图标 (全角符算1个，半角符算0.5个字符)
      const currWidth = em * fontSize + btnPadding * 2 + cellPadding * 2; //字符的宽度 + 按钮左右padding值 + 各个按钮之间的margin值 + 单元格的左右padding值
      if (currWidth > width) {
        width = currWidth;
      }
    });
  } else {
    btns.forEach((item: BtnItem) => {
      // if (!item) return; //已经过滤过了，所以注释掉
      em += getChinaCharLength(item.text) + 1; //文字加图标 (全角符算1个，半角符算0.5个字符)
    });
    width = em * fontSize + btns.length * btnPadding * 2 + (btns.length - 1) * btnMargin + cellPadding * 2; //字符的宽度 + 按钮左右padding值 + 各个按钮之间的margin值 + 单元格的左右padding值
  }
  return width;
}

let operateWidth = 0; //操作栏的宽度
// 获取每一行的分组按钮
export function getGroupBtnsOfRow(row: CommonObj, ind: number, props: CommonObj, newCols: TableColAttrs[]) {
  const { operateBtns = [], rows, operateBtnsAttrs, filterBtnsByAuth, disabled, size } = props;
  const btnAttrs = { attrs: { disabled } };
  const tempBtns = getTempGroupBtnsOfRow(row, ind, operateBtns, btnAttrs);
  const filterBtns = filterBtnsByAuth?.(tempBtns) ?? tempBtns;
  const width = getOperateColWidth(operateBtnsAttrs, filterBtns, size);
  if (ind < rows.length - 1) {
    if (operateWidth < width) {
      operateWidth = width;
      newCols.slice(-1)[0].minWidth = operateWidth;
    }
  } else {
    //如果操作栏没有按钮，则按照最小宽度展示操作栏，例如新增按钮
    if (operateWidth < 30) {
      operateWidth = getOperateColWidth(operateBtnsAttrs, undefined, size);
      newCols.slice(-1)[0].minWidth = operateWidth;
    }
  }
  return filterBtns;
}

/**
 * 是否需要push某特殊列
 */
export function needPushSpecialCol(key: SpecialTableColType, props: CommonObj) {
  const { operateBtns, cols = [] } = props;
  if (key === "operate") return operateBtns && cols.slice(-1)?.[0]?.type !== "operate";
  const isShow = props[key as keyof typeof props];
  return isShow && !cols.find((it: CommonObj) => it.type === key);
}

/**
 * 获取添加特殊列之后的列
 * @param props 传入的属性
 * @returns
 */
export function getAddSpecialCols(props: CommonObj) {
  const { cols, currPage, pageSize } = props;
  const keys: SpecialTableColType[] = ["index", "sort", "selection", "operate"];
  keys.forEach(key => {
    if (!needPushSpecialCol(key, props)) return;
    const specialCol = specialColMap[key];
    if (key === "index" && currPage !== undefined && pageSize !== undefined) {
      specialCol.index = (ind: number) => ind + 1 + (currPage - 1) * pageSize;
    }
    const col = typeof props[key] === "object" ? { ...specialCol, ...props[key] } : specialCol;
    key === "operate" ? cols.push(col) : cols.unshift(col);
  });
  return cols;
}
