import { ElMessageBox } from "element-plus";
import { BtnName, BtnItem, BaseBtnType, BtnsMap } from "@/core/components/BaseBtn/_types";
import { getBtnObj } from "@/core/components/BaseBtn";
import { CommonObj, OptionItem, StrNum } from "@/core/_types";
import cssVars from "@/assets/styles/_var.module.scss";
import {
  rangeJoinChar,
  typeOf,
  getLabelFromOptionsByAllValues,
  getLabelFromOptionsByLastValue,
  defaultFormItemType,
  showMessage,
  ThemeColorType,
  showConfirmMessage,
} from "@/core/utils";
import { TableColAttrs } from "@/core/components/table/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { HandleClickExtraBtnsProps } from "./_types";
import { batchBtnNames } from ".";
import { defineAsyncComponent } from "vue";
import _ from "lodash";

const { upperFirst } = _;

const CommonImport = defineAsyncComponent(() => import("./_components/CommonImport.vue"));

export interface ExtraBtnRestArgs {
  selectedKeys: string[];
  selectedRows: CommonObj[];
  exportRows: string[][];
}

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

// 显示确认弹窗（渲染html字符串）
export function showConfirmHtmlBox({ btnObj, seledRows, seledKeys, cols, total, next, isSeledAll, $emit, e }) {
  const { name = "", text, attrs } = btnObj;
  const colorType = attrs?.type || "primary";
  const colorKey = `color${upperFirst(colorType)}`;
  const color = cssVars[colorKey];
  const style = `style="color:${color};"`;
  const len = isSeledAll ? total : seledRows.length;
  const hintTips = `确定 <b ${style}>${text}${isSeledAll ? "全部" : ""}</b> 共 <b ${style}>${len}</b> 条记录吗？`;
  showConfirmMessage(hintTips, colorType).then(() => {
    let exportRows: any[] = [];
    if (name === "export") {
      const newCols = cols.filter((it: TableColAttrs) => !(it as TableColAttrs)?.prop?.startsWith("$"));
      exportRows = getExportRows(newCols, seledRows);
    }
    $emit(
      "extraBtns",
      name,
      next,
      {
        selectedKeys: seledKeys,
        selectedRows: seledRows,
        exportRows,
      },
      e
    );
  });
}

// "index", "selection", "sort", "operate", "id", "create", "update", "remark", "custom", "switch", "BaseTag", "BaseImg", "BaseText", "BaseCopy", "UserInfo"
const allowList = [undefined, "index", "id", "create", "update", "remark"];
export function handleClickExtraBtns({
  btnObj,
  cols = [],
  seledRows,
  seledKeys,
  total,
  exportCfg,
  e,
  $emit,
  next,
  openPopup,
  importCfg,
}: HandleClickExtraBtnsProps) {
  const { name = "", text, handleClickType } = btnObj;
  if (handleClickType === "custom")
    return $emit(
      "extraBtns",
      name,
      next,
      {
        selectedKeys: [],
        selectedRows: [],
        exportRows: [],
      },
      e
    );
  if (batchBtnNames.includes(name)) {
    if (name === "export") {
      const isOverLimit = exportCfg?.limit ? seledRows.length > exportCfg.limit : false;
      if (isOverLimit) {
        const htmlMsg = `单次${text}不能超过 <b>${exportCfg!.limit}</b> 条，请缩小查询范围！`;
        showMessage({ message: htmlMsg, dangerouslyUseHTMLString: true }, "warning");
      } else {
        showConfirmHtmlBox({
          btnObj,
          seledRows,
          seledKeys,
          cols,
          total,
          next,
          e,
          $emit,
          isSeledAll: seledRows.length === 0 || seledRows.length === total,
        });
      }
    } else {
      showConfirmHtmlBox({ btnObj, seledRows, seledKeys, cols, total, next, e, $emit, isSeledAll: seledRows.length === total });
    }
  } else if (name === "import") {
    openPopup("导入文件", [CommonImport, { ...importCfg, onChange: (arr: CommonObj[]) => $emit("click", name, arr, e) }]);
  } else {
    $emit(
      "extraBtns",
      name,
      next,
      {
        selectedKeys: [],
        selectedRows: [],
        exportRows: [],
      },
      e
    );
  }
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
export function getTempGroupBtnsOfRow(row: CommonObj, rowInd: number, operateBtns?: BaseBtnType, baseBtnAttrs?: BtnsMap) {
  if (!operateBtns) return [];
  const isFn = typeOf(operateBtns) === "Function";
  const btns = isFn ? (operateBtns as any)(row, rowInd) : operateBtns;
  const tempBtns = btns?.map((btn: BaseBtnType) => getBtnObj(btn, row, baseBtnAttrs))?.filter((it: BtnItem) => !!it.name);
  return tempBtns ?? [];
}
