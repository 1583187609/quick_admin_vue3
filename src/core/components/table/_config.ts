import { CommonObj } from "../_types";
import { defaultFieldAttrs } from "@/core/components/form/_components/FieldItem";
import { SpecialTableColType, TableAttrs, TableColumnAttrs, TablePaginationAttrs } from "./_types";
import { TableColAttrs } from "@/core/components/table/_types";
import { getExportData } from "@/utils";
import config from "@/config";

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
 * 基础的表格列类型（同时也是模板）
 * @notice 特点：模板名称（tpl的值）跟类型名称（type的值）一致
 */

export const baseTableColTypes: CommonObj = getExportData(
  {
    /*** 系统内置基础列 ***/
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
    /*** 系统内置组件列 ***/
    // 操作人/操作时间
    OperatorTime: {
      prop: "operator_time",
      label: "操作人/时间", // 含创建/更新两种类型（或更多其他类型）
      type: "OperatorTime",
    },
    //是否启用状态
    BaseTag: {
      prop: "status",
      label: "状态",
      minWidth: 90,
      type: "BaseTag",
      attrs: { name: "EnableStatus" },
    },
    //图片
    BaseImg: {
      prop: "imgUrl",
      label: "图片",
      type: "BaseImg",
      minWidth: 136,
      attrs: {
        size: "120",
        style: "margin: 0 auto",
      },
    },
    //文本省略显示，点击查看更多
    BaseText: {
      prop: "content",
      label: "内容",
      type: "BaseText",
      minWidth: 250,
    },
    // 文本复制
    BaseCopy: {
      minWidth: 190,
      type: "BaseCopy",
    },
    /*** 表单控件列 ***/
    //switch开关
    switch: {
      prop: "status",
      label: "启用状态",
      minWidth: 80,
      type: "switch",
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
      type: "input",
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
    /*** 外部组件列 ***/
    // 例：用户信息
    // UserInfo: {
    //   prop: "userData",
    //   label: "用户信息",
    //   fixed: "left",
    //   type: "UserInfo",
    //   getInferredAttrs(col: TableColAttrs) {
    //     return {
    //       width: col?.attrs?.simple ? 222 : 440,
    //     };
    //   },
    // },
  },
  config?.table?.customSpecialCol,
  "merge"
);

/**
 * 表格列模板
 */
export const defaultTableColTpls: CommonObj = {
  ...baseTableColTypes, // 基础表格列类型
  /*** 扩展模板列 ***/
  //id列：唯一标识id（不可复制id）
  id: { prop: "id", label: "ID", minWidth: 70, type: "BaseCopy", fixed: "left" },
  // 电话号码
  phone: { prop: "phone", label: "电话号码", minWidth: 110 },
  // 启用状态
  enableStatus: { prop: "status", label: "启用状态", minWidth: 80, type: "BaseTag", attrs: { name: "EnableStatus" } },
  // 是否状态列
  yesNoStatus: { label: "是否状态", minWidth: 80, type: "BaseTag", attrs: { name: "YesNoStatus" } },
  // // 时分秒列
  // time: { minWidth: 80 },
  // // 年月日时分秒列
  // dateTime: { minWidth: 160 },
  //创建人/创建列
  create: {
    prop: ["creator_name", "create_time"],
    label: "创建时间",
    minWidth: 160,
    type: "OperatorTime",
  },
  //修改人/修改时间列
  update: {
    prop: ["updator_name", "update_time"],
    label: "修改时间",
    minWidth: 160,
    type: "OperatorTime",
  },
  // 备注列
  remark: {
    // prop: "remark", // 省略不写时，prop 跟模板名称保持一致
    label: "备注信息",
    minWidth: 140,
    type: "BaseText",
  },
};
