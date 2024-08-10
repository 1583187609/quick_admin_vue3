import { ElMessageBox } from "element-plus";
import { upperFirst } from "lodash";
import { BtnName, BtnItem } from "@/components/BaseBtn";
import { CommonObj } from "@/vite-env";
import cssVars from "@/assets/styles/_var.module.scss";
import { specialColMap } from "@/components/table";
import {
  rangeJoinChar,
  typeOf,
  getLabelFromOptionsByAllValues,
  getLabelFromOptionsByLastValue,
  defaultFormItemType,
  showMessage,
} from "@/components/_utils";
import { TableField, TableColAttrs } from "@/components/table";
import { FormFieldAttrs } from "@/components/form";
import { HandleClickExtraBtnsProps, SpecialBoolColType } from "./_types";
import { batchBtnNames } from ".";
import { BaseBtnType, getBtnObj } from "@/components/BaseBtn";
import ImportPopup from "./_components/ImportPopup.vue";
import { h } from "vue";

export interface ExtraBtnRestArgs {
  selectedKeys: string[];
  selectedRows: CommonObj[];
  exportRows: string[][];
}

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
  const { name = "", text, attrs, customRules } = btnObj;
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
          message: `单次${text}不能超过 <b>${exportCfg!.limit}</b> 条，请缩小查询范围！`,
          dangerouslyUseHTMLString: true,
        },
        "warning"
      );
    } else {
      const hintTips = `确定 <b style="color:${color};">${text}${
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
            const newCols = (cols?.filter((it: TableField) => {
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
 * 是否需要push某特殊列
 */
export function needPushSpecialCol(key: SpecialBoolColType, props: CommonObj) {
  const { operateBtns, cols = [] } = props;
  if (key === "operate") return operateBtns && cols.slice(-1)?.[0]?.type !== "operate";
  const isShow = props[key as keyof typeof props];
  return isShow && !cols.find((it: CommonObj) => it.type === key);
}

export function getAddSpecialCols(props: CommonObj) {
  const { cols, currPage, pageSize } = props;
  const keys: SpecialBoolColType[] = ["index", "sort", "selection", "operate"];
  keys.forEach(key => {
    if (!needPushSpecialCol(key, props)) return;
    const specialCol = specialColMap[key];
    if (key === "index" && currPage !== undefined && pageSize !== undefined) {
      specialCol.index = (ind: number) => ind + 1 + (currPage - 1) * pageSize;
    }
    cols.unshift(typeof props[key] === "object" ? { ...specialCol, ...props[key] } : specialCol);
  });
  return cols;
}

/**
 * 获取查询条件的文本值
 */
export function getQueryFieldValue(field: FormFieldAttrs, val: any) {
  const { attrs, type = defaultFormItemType, options = [] } = field;
  if (type === "cascader") {
    return typeOf(val) === "Array" ? getLabelFromOptionsByAllValues(options, val) : getLabelFromOptionsByLastValue(options, val);
  } else if (type === "select") {
    if (attrs?.multiple) {
      const opts = options.filter(it => val.includes(it.value));
      return opts.map(it => it.label).join("、");
    } else {
      return getLabelFromOptionsByLastValue(options, val);
    }
  } else if (type === "BaseNumberRange") {
    return val?.join(rangeJoinChar);
  } else if (type === "date-picker") {
    return val?.join(rangeJoinChar);
  } else {
    return val;
  }
}

//获取每一行的分组按钮
export function getTempGroupBtnsOfRow(row: CommonObj, $rowInd: number, operateBtns: any, attrs?: CommonObj) {
  const isFn = typeOf(operateBtns) === "Function";
  const btns = isFn ? (operateBtns as any)(row, $rowInd) : operateBtns;
  const tempBtns = btns?.map((btn: BaseBtnType) => getBtnObj(btn, row, attrs))?.filter((it: BtnItem) => !!it.name);
  return tempBtns ?? [];
}
