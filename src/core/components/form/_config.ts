import { CommonSize } from "@/core/_types";
import { FormAttrs, GridAttrs } from "./_types";

//覆盖重写 el-form 的默认属性值
export const defaultFormAttrs: FormAttrs = {
  labelWidth: "auto",
  // scrollToError: true,
  // labelSuffix: "：",
  //statusIcon: true, //是否显示校验的状态图标
};

// 栅格的属性，同ElementPlus的el-col的属性
export const defaultGridAttrs: { [key in CommonSize]: GridAttrs } = {
  large: { xs: 24, sm: 12, md: 12, lg: 8, xl: 6 },
  default: { xs: 24, sm: 12, md: 12, lg: 8, xl: 6 },
  small: { xs: 12, sm: 12, md: 8, lg: 6, xl: 4 },
};

export const iconBtnsMap = {
  add: {
    name: "add",
    text: "新增",
    type: "primary",
    icon: "CirclePlus",
  },
  delete: {
    name: "delete",
    text: "删除",
    type: "danger",
    icon: "Remove",
    popconfirm: true,
  },
  edit: {
    name: "edit",
    text: "编辑",
    type: "primary",
    icon: "Edit",
  },
};
