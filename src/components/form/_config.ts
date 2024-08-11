import { GridAttrs } from "./_types";

//覆盖重写 el-form 的默认属性值
export const defaultFormAttrs = {
  labelWidth: "auto",
  scrollToError: true,
  //statusIcon: true, //是否显示校验的状态图标
};

// 栅格的属性，同ElementPlus的el-col的属性
export const defaultGridAttrs: GridAttrs = {
  xs: 12,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 4,
};
