import { CommonObj } from "@/core/_types";
import { defaultFieldAttrs } from "@/core/components/form/_components/FieldItem/_config";
import { SpecialTableColType, TableAttrs, TableColumnAttrs, TablePaginationAttrs } from "./_types";
import { TableColAttrs } from "@/core/components/table/_types";
import { defaultCommonSize } from "@/core/config";
import config from "@/config";

export const specialColKeys: SpecialTableColType[] = ["index", "sort", "selection", "operate"];

// el-table 的属性，除了（data）
export const defaultTableAttrs: TableAttrs = Object.assign(
  {
    // stripe: true,
    rowKey: "id",
    border: true,
    // size: "small",
    tableLayout: "auto", //auto, fixed
    highlightCurrentRow: true,
    defaultExpandAll: false, //为树形表格时，展开所有节点
  },
  config.element?.table
);

// el-table-column 的属性
export const defaultTableColumnAttrs: TableColumnAttrs = Object.assign(
  {
    align: "center",
    headerAlign: "center",
  },
  config.element?.tableColumn
);

// el-pagination 的属性
export const defaultPaginationAttrs: TablePaginationAttrs = Object.assign(
  {
    // small: true,
    background: true,
    // defaultPageSize: 20,
    // defaultCurrentPage: 1,
    layout: "total, sizes, prev, pager, next, jumper",
  },
  config.element?.pagination
);

/**
 * 基础的表格列类型（同时也是模板）
 * @notice 特点：模板名称（tpl的值）跟类型名称（type的值）一致
 */
const defaultOperateColWidthMap = { large: 250, default: 210, small: 170 };
const defaultBaseImgColWidthMap = { large: 156, default: 136, small: 114 };

const baseTableColTpls: CommonObj = {
  /*** 系统内置基础列 ***/
  //序号列
  T_Index: {
    prop: "$index",
    label: "序号",
    type: "index",
    width: 74, // 54,
    fixed: "left",
    // index: (ind: number) => ind + 1 + (currPage - 1) * pageSize,
  },
  //排序列
  T_Sort: {
    prop: "$sort",
    label: "排序",
    type: "sort",
    width: 74, //54,
    fixed: "left",
  },
  //多选列
  T_Selection: {
    prop: "$selection",
    label: "选择",
    type: "selection",
    width: 48,
    fixed: "left",
  },
  //操作列
  T_Operate: {
    prop: "$operate",
    label: "操作",
    type: "operate",
    width: defaultOperateColWidthMap[defaultCommonSize], // 按三个按钮计算的宽度（每个按钮均有图标，按钮文字均为两个字符）
    fixed: "right",
  },
  /*** 系统内置组件列 ***/
  //是否启用状态
  T_BaseTag: {
    prop: "status",
    label: "状态",
    minWidth: 90,
    type: "BaseTag",
    attrs: { name: "D_EnableStatus" },
  },
  //图片
  T_BaseImg: {
    prop: "imgUrl",
    label: "图片",
    type: "BaseImg",
    minWidth: defaultBaseImgColWidthMap[defaultCommonSize],
    attrs: {
      size: "8.6em",
      style: "margin: 0 auto",
    },
  },
  //文本省略显示，点击查看更多
  T_BaseText: {
    prop: "content",
    label: "内容",
    type: "BaseText",
    minWidth: 250,
  },
  // 文本复制
  T_BaseCopy: {
    minWidth: 190,
    type: "BaseCopy",
  },
  /*** 表单控件列 ***/
  //switch开关
  T_Switch: {
    prop: "status",
    label: "启用状态",
    minWidth: 80,
    type: "switch",
    attrs: defaultFieldAttrs?.switch?.attrs,
    // attrs: {
    //   // onChange(e) {
    //   //   ElMessage.warning("暂未处理【启用/禁用】事件");
    //   // },
    // },
  },
  // input输入框
  T_Input: {
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
  // T_UserInfo: {
  //   prop: "user_data",
  //   label: "用户信息",
  //   fixed: "left",
  //   type: "UserInfo",
  //   getInferredAttrs(col: TableColAttrs) {
  //     return {
  //       width: col?.attrs?.simple ? 222 : 440,
  //     };
  //   },
  // },
};

/**
 * 表格列模板
 */
export const defaultTableColTpls: CommonObj = Object.assign(
  {
    ...baseTableColTpls, // 基础表格列类型
    /*** 扩展模板列 ***/
    //id列：唯一标识id（不可复制id）
    T_Id: { prop: "id", label: "ID", minWidth: 70, type: "BaseCopy", fixed: "left" },
    // 电话号码
    T_Phone: { prop: "phone", label: "电话号码", minWidth: 110 },
    // 启用状态
    T_EnableStatus: { prop: "status", label: "启用状态", minWidth: 80, type: "BaseTag", attrs: { name: "D_EnableStatus" } },
    // 是否状态列
    T_YesNoStatus: { label: "是否状态", minWidth: 80, type: "BaseTag", attrs: { name: "D_YesNoStatus" } },
    // // 时分秒列
    // time: { minWidth: 80 },
    // // 年月日时分秒列
    // dateTime: { minWidth: 160 },
    //创建人/创建列
    T_Create: {
      prop: "create_time",
      label: "创建时间",
      minWidth: 160,
      type: "UserTime",
      attrs: {
        userProp: "create_user",
        timeProp: "create_time",
      },
    },
    //修改人/修改时间列
    T_Update: {
      prop: "update_time",
      label: "修改时间",
      minWidth: 160,
      type: "UserTime",
      attrs: {
        userProp: "update_user",
        timeProp: "update_time",
      },
    },
    // 备注列
    T_Remark: {
      // prop: "remark", // 省略不写时，prop 跟模板名称保持一致
      label: "备注",
      minWidth: 140,
      type: "BaseText",
    },
  },
  config?.tpls?.tableCol
);
