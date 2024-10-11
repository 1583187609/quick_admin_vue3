import { BaseDataType, CommonObj, CommonSize } from "@/vite-env";
import { CustomSpecialColType } from "@/config/_components/CustomSpecialTableCols.vue";
import { TableColumnCtx } from "element-plus";
import { RendererNode, VNode } from "vue";
import { RendererElement } from "vue";
import { BaseRenderData } from "../BaseRender.vue";
import { FormItemAttrs } from "@/components/form/_types";
import { HorizontalAlign, PopoverAttrs, UniteFetchType } from "@/components/_types";

/**
 * 这里是标准的ElementPlus属性
 */
// el-table 的属性
export interface TableAttrs {
  height?: string | number;
  maxHeight?: string | number;
  stripe?: boolean;
  border?: boolean;
  size?: CommonSize;
  showHeader?: boolean;
  highlightCurrentRow?: boolean; //是否要高亮当前行
  currentRowKey?: string | number; //当前行的 key，只写属性
  rowClassName?: Function | string; // 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
  rowStyle?: Function | object; //行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
  cellClassName?: Function | string; //单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
  cellStyle?: Function | object; //单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
  headerRowClassName?: Function | string; //表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
  headerRowStyle?: Function | object; //表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
  headerCellClassName?: Function | string; //表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
  headerCellStyle?: Function | object; //表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
  rowKey?: Function | string; //行数据的 Key，用来优化 Table 的渲染； 在使用reserve-selection功能与显示树形数据时，该属性是必填的。 类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
  emptyText?: string; //空数据时显示的文本内容， 也可以通过 #empty 设置
  defaultExpandAll?: boolean; //是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
  expandRowKeys?: string[]; //可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
  defaultSort?: object; //默认的排序列的 prop 和顺序。 它的 prop 属性指定默认的排序的列，order 指定默认排序的顺序。如果设置了prop，但没有设置 order，那么 order将被默认设置为ascending
  tooltipEffect?: "enum" | "dark"; //溢出的 tooltip 的 effect
  [key: string]: any;
}

// el-table-column 的属性
export interface TableColumnAttrs {
  [key: string]: any;
}

// el-pagination 的属性
export interface TablePaginationAttrs {
  currPage?: number;
  pageSize?: number;
  [key: string]: any;
}

/**
 * 这里是 Quick Admin 的属性，有改造
 */
export type SummaryListType = boolean | ((currPage: number, oldList: CommonObj[], newList: CommonObj[]) => CommonObj[]);

export type TableColType =
  | "id"
  | "sort"
  | "index"
  | "selection"
  | "operate"
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

export type TableIndexType = boolean | number | ((rowInd: number) => number);
export type TableSelectableType = boolean | ((row: any, rowInd: number) => boolean);
export type TableDragSortType = boolean; // | UniteFetchType;

// 基础表格
export interface TableColAttrs {
  prop?: string | [string, string];
  label?: BaseRenderData;
  customLabel?: BaseRenderData;
  width?: string | number;
  minWidth?: string | number;
  align?: HorizontalAlign;
  headerAlign?: HorizontalAlign;
  fixed?: boolean | "left" | "right";
  index?: number | ((rowInd: number) => number); // 序号列显示
  selectable?: (row: any, index: number) => boolean; //是否显示选择框
  sortable?: boolean | "custom"; //是否启用排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
  type?: TableColType; //列类型
  formatter?: (
    row: CommonObj,
    column?: TableColumnCtx<any>,
    cellValue?: any,
    index?: number
  ) => string | VNode<RendererNode, RendererElement, { [key: string]: any }>;
  children?: TableColAttrs[];
  attrs?: CommonObj; //该列所用组件的props属性
  /** 下面是针对业务需求而新添加的快捷属性 **/
  quickAttrs?: {
    popover?: string | PopoverAttrs | BaseRenderData;
  };
}
export type TableCol = BaseDataType | TableColAttrs;

// 可编辑的表格
export interface EditTableColAttrs extends TableColAttrs {
  field?: FormItemAttrs;
}

export type EditTableCol = BaseDataType | EditTableColAttrs;

//表格的特殊列类型
export type SpecialTableColType = "index" | "sort" | "selection" | "operate";

// 表格拖动排序之后的回调函数
export type TableDragSortEndNext = (tips?: string) => void;
