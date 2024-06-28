import { CommonObj } from "@/vite-env";
import { CustomSpecialColType } from "@/config/_components/CustomSpecialTableCols.vue";
import { TableColumnCtx } from "element-plus";
import { RendererNode, VNode } from "vue";
import { RendererElement } from "vue";
import { PopoverAttrs } from "@/components/BaseFormItem";
import { BaseRenderData } from "../BaseRender.vue";

export type AlignType = "left" | "center" | "right";

export type SummaryListType = boolean | ((currPage: number, oldList: CommonObj[], newList: CommonObj[]) => CommonObj[]);
export interface PaginationAttrs {
  currPage: number;
  pageSize: number;
}

export type ColItemType =
  | "index"
  | "selection"
  | "sort"
  | "operate"
  | "id"
  | "remark"
  | "custom"
  | "create"
  | "update"
  | "switch"
  | "BaseTag"
  | "BaseImg"
  | "BaseText"
  | "BaseCopy"
  | CustomSpecialColType;

export interface TableFieldAttrs {
  label?: BaseRenderData;
  customLabel?: BaseRenderData;
  prop?: string | [string, string];
  width?: string | number;
  minWidth?: string | number;
  headerAlign?: AlignType;
  align?: AlignType;
  fixed?: boolean | "left" | "right";
  index?: boolean;
  selection?: boolean; //是否显示选择框
  type?: ColItemType;
  attrs?: CommonObj;
  sortable?: boolean | "custom"; //是否启用排序
  extra?: {
    popover?: string | PopoverAttrs | BaseRenderData;
  };
  formatter?: (
    row: any,
    column?: TableColumnCtx<any>,
    cellValue?: any,
    index?: number
  ) => string | VNode<RendererNode, RendererElement, { [key: string]: any }>;
  children?: TableFieldAttrs[];
}
export type TableField = boolean | TableFieldAttrs;
