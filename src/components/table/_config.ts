import { CommonObj } from "../_types";
import { defaultFieldAttrs } from "@/components/form/_components/FieldItem";
import { SpecialTableColType, TableAttrs, TableColumnAttrs, TablePaginationAttrs } from "./_types";
import config from "@/config";
import { TableColAttrs } from "@/components/table";

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
export const defaultPaginationAttrs: TablePaginationAttrs = {
  // small: true,
  background: true,
  layout: "total, sizes, prev, pager, next, jumper",
};

export const specialColKeys: SpecialTableColType[] = ["index", "sort", "selection", "operate"];

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
        // onChange(e) {
        //   ElMessage.warning("暂未处理【启用/禁用】事件");
        // },
      },
    },
    // input输入框
    input: {
      prop: "value",
      label: "编辑内容",
      minWidth: 200,
      attrs: defaultFieldAttrs?.input?.attrs,
      getInferredAttrs(col: TableColAttrs) {
        const { label, attrs = {} } = col;
        const { placeholder: phr } = attrs;
        return {
          placeholder: phr?.replace("${label}", label),
        };
      },
    },
    //用户信息
    // UserInfo: {
    //   prop: "userData",
    //   label: "用户信息",
    //   fixed: "left",
    //   getInferredAttrs(col: TableColAttrs) {
    //     return {
    //       width: col?.attrs?.simple ? 222 : 440,
    //     };
    //   },
    // },
  },
  config?.table?.customSpecialCol
);
