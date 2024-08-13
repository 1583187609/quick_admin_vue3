import { TableAttrs, TableColumnAttrs, TablePaginationAttrs } from "./_types";

//el-table 的属性，除了（data）
export const defaultTableAttrs: TableAttrs = {
  // stripe: true,
  rowKey: "id",
  border: true,
  // size: "small",
  tableLayout: "auto", //auto, fixed
  highlightCurrentRow: true,
  defaultExpandAll: false, //为树形表格时，展开所有节点
};

// el-table-column 的属性
export const defaultColumnAttrs: TableColumnAttrs = {
  align: "center",
  headerAlign: "center",
};

// el-pagination 的属性
export const defaultPaginationAttrs:TablePaginationAttrs = {
  // small: true,
  background: true,
  layout: "total, sizes, prev, pager, next, jumper",
};
