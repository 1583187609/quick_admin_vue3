import { CommonObj } from "@/vite-env";

//el-table 的属性，除了（data）
export const defaultTableAttrs: CommonObj = {
  // stripe: true,
  rowKey: "id",
  border: true,
  // size: "small",
  tableLayout: "auto", //auto, fixed
  highlightCurrentRow: true,
  defaultExpandAll: false, //为树形表格时，展开所有节点
};

//col-table-column 的属性
export const defaultColumnAttrs = {
  align: "center",
  headerAlign: "center",
};

export const defaultPaginationAttrs = {
  // small: true,
  background: true,
  layout: "total, sizes, prev, pager, next, jumper",
};
