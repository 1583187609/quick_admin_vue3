import { ElMessageBox } from "element-plus";
import _ from "lodash";
import { BtnName, BtnItem, BtnAttrs, BaseBtnType, BtnsMap } from "@/components/BaseBtn/_types";
import { getBtnObj } from "@/components/BaseBtn";
import { CommonObj, OptionItem, StrNum } from "@/vite-env";
import cssVars from "@/assets/styles/_var.module.scss";
import {
  rangeJoinChar,
  typeOf,
  getLabelFromOptionsByAllValues,
  getLabelFromOptionsByLastValue,
  defaultFormItemType,
  showMessage,
} from "@/components/_utils";
import { TableCol, TableColAttrs } from "@/components/table/_types";
import { FormFieldAttrs } from "@/components/form/_types";
import { HandleClickExtraBtnsProps } from "./_types";
import { batchBtnNames } from ".";
import ImportPopup from "./_components/ImportPopup.vue";
import { h } from "vue";

export interface ExtraBtnRestArgs {
  selectedKeys: string[];
  selectedRows: CommonObj[];
  exportRows: string[][];
}

const { upperFirst } = _;
// "index", "selection", "sort", "operate", "id", "create", "update", "remark", "custom", "switch", "BaseTag", "BaseImg", "BaseText", "BaseCopy", "UserInfo"
const allowList = [undefined, "index", "id", "create", "update", "remark"];
export function handleClickExtraBtns({
  btnObj,
  cols,
  seledRows,
  seledKeys,
  total,
  exportCfg,
  emits,
  next,
  openPopup,
  importCfg,
}: HandleClickExtraBtnsProps) {
  const { name = "", btnText, attrs, customRules } = btnObj;
  if (customRules)
    return emits("extraBtns", name, next, {
      selectedKeys: [],
      selectedRows: [],
      exportRows: [],
    });
  const colorType = attrs?.type || "primary";
  const colorKey = `color${upperFirst(colorType)}`;
  const color = cssVars[colorKey];
  if (batchBtnNames.includes(name)) {
    const isSeledAll = seledRows.length === total; //是否选择了所有
    const isOverLimit = seledRows.length > exportCfg!.limit;
    if ((["export"] as BtnName[]).includes(name) && isOverLimit) {
      showMessage(
        {
          message: `单次${btnText}不能超过 <b>${exportCfg!.limit}</b> 条，请缩小查询范围！`,
          dangerouslyUseHTMLString: true,
        },
        "warning"
      );
    } else {
      const hintTips = `确定 <b style="color:${color};">${btnText}${
        isSeledAll ? `全部</b> ` : `</b>`
      } 共 <b style="color:${color};">${seledRows.length}</b> 条记录？`;
      ElMessageBox.confirm(hintTips, "温馨提示", {
        type: name === "delete" ? "error" : "warning",
        dangerouslyUseHTMLString: true,
        closeOnClickModal: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: `el-button--${colorType}`,
        cancelButtonClass: `el-button--${colorType} is-plain`,
        draggable: true,
      })
        .then(() => {
          const exportRows: any[] = [];
          if (name === "export") {
            const newCols = (cols?.filter((it: TableCol) => {
              if (typeOf(it) !== "Object") return false;
              return !(it as TableColAttrs)?.prop?.startsWith("$");
            }) || []) as TableColAttrs[];
            exportRows.push(newCols.map((it: TableColAttrs) => it.label));
            seledRows.forEach((row: CommonObj) => {
              const list: string[] = [];
              newCols.forEach((col: TableColAttrs) => {
                const { prop, type, formatter } = col;
                let val = "";
                if (allowList.includes(type)) {
                  val = formatter ? formatter(row) : row[prop as string] ?? "";
                }
                list.push(val);
              });
              exportRows.push(list);
            });
          }
          emits("extraBtns", name, next, {
            selectedKeys: seledKeys,
            selectedRows: seledRows,
            exportRows,
          });
        })
        .catch(() => {});
    }
  } else if (name === "import") {
    // () => import("./_components/ImportPopup.vue"),
    openPopup("温馨提示", h(ImportPopup, { tplCfg: importCfg, onChange: (arr: CommonObj[]) => emits("click", name, arr) }));
  } else {
    emits("extraBtns", name, next, {
      selectedKeys: [],
      selectedRows: [],
      exportRows: [],
    });
  }
}

/**
 * 获取查询条件的文本值
 */
export function getQueryFieldValue(field: FormFieldAttrs, val: StrNum | StrNum[], joinChar = "、") {
  const { attrs, type = defaultFormItemType, options = [] } = field;
  if (type === "cascader") {
    if (typeOf(val) === "Array") return getLabelFromOptionsByAllValues(options as CommonObj[], val as StrNum[]);
    return getLabelFromOptionsByLastValue(options as CommonObj[], val as StrNum);
  }
  if (type === "select") {
    if (attrs?.multiple) {
      const opts = (options as OptionItem[]).filter(it => (val as (StrNum | boolean)[]).includes(it.value));
      return opts.map(it => it.label).join(joinChar);
    }
    return getLabelFromOptionsByLastValue(options as CommonObj[], val as StrNum);
  }
  if (["BaseNumberRange", "date-picker"].includes(type)) return (val as StrNum[])?.join(rangeJoinChar);
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
