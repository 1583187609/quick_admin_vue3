import { BtnItem, BaseBtnType, BtnsMap } from "@/core/components/BaseBtn/_types";
import { getBtnObj } from "@/core/components/BaseBtn";
import { CommonObj, OptionItem, StrNum } from "@/core/_types";
import { rangeJoinChar, typeOf, getLabelFromOptionsByAllValues, getLabelFromOptionsByLastValue, defaultFormItemType } from "@/core/utils";
import { TableColAttrs } from "@/core/components/table/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";
import _ from "lodash";

export interface ExtraBtnRestArgs {
  selectedKeys: string[];
  selectedRows: CommonObj[];
  exportRows: string[][];
}
const allowList = [undefined, "index", "id", "create", "update", "remark"];
export function getExportRows(cols: TableColAttrs[] = [], rows: CommonObj[] = []): string[][] {
  const exportRows: string[][] = [];
  const newCols = cols.filter((it: TableColAttrs) => !(it as TableColAttrs)?.prop?.startsWith("$"));
  exportRows.push(newCols.map((it: TableColAttrs) => it.label) as string[]);
  rows.forEach((row: CommonObj) => {
    const list: string[] = [];
    newCols.forEach((col: TableColAttrs) => {
      const { prop, type, formatter } = col;
      let val = "";
      if (allowList.includes(type)) val = formatter?.(row) ?? row[prop as string] ?? "";
      list.push(val);
    });
    exportRows.push(list);
  });
  return exportRows;
}

/**
 * 获取查询条件的文本值
 */
export function getQueryFieldValue(field: FormFieldAttrs, val: StrNum | StrNum[], joinChar = "、") {
  const { attrs = {}, type = defaultFormItemType } = field;
  const { options = [] } = attrs;
  if (type === "cascader") {
    if (typeOf(val) === "Array") {
      return getLabelFromOptionsByAllValues(options as CommonObj[], val as StrNum[], undefined, undefined, joinChar);
    }
    return getLabelFromOptionsByLastValue(options as CommonObj[], val as StrNum);
  }
  if (type === "select") {
    if (attrs?.multiple) {
      const opts = (options as OptionItem[]).filter(it => (val as (StrNum | boolean)[]).includes(it.value));
      return opts.map(it => it.label).join(joinChar);
    }
    return getLabelFromOptionsByLastValue(options as CommonObj[], val as StrNum);
  }
  const isRange = ["BaseNumberRange"].includes(type) || (["date-picker"].includes(type) && attrs?.type.endsWith("range"));
  if (isRange) return (val as StrNum[])?.join(rangeJoinChar);
  return val;
}

/**
 * 获取每一行的分组按钮
 * @param row 行数据
 * @param rowInd 行下标
 * @param operateBtns 操作栏按钮
 * @param baseBtnAttrs
 * @returns []
 */
export function getStandardGroupBtns(row: CommonObj, rowInd: number, operateBtns?: BaseBtnType, baseBtnAttrs?: BtnsMap, isStand = false) {
  if (!operateBtns) return [];
  const isFn = typeOf(operateBtns) === "Function";
  const btns = isFn ? (operateBtns as any)(row, rowInd) : operateBtns;
  if (!btns?.length) return [];
  return btns.map((btn: BaseBtnType) => getBtnObj(btn, row, baseBtnAttrs))?.filter((it: BtnItem) => !!it.name);
}
