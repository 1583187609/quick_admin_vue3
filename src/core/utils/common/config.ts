/********************************************************************/
/***************************** 系统常量 ******************************/
/********************************************************************/

import { getExportData } from "@/core/utils";
import { ReqMap, ResMap } from "@/core/components/crud/BaseCrud/_types";
import config from "@/config";
import { CommonObj } from "@/core/_types";

const { table, form, homePath, widgetSize, popup } = config;

export const isOptimization = false; // 是否开启优化。若为true，则会避免计算较复杂的逻辑，同时也会少一些良好的开发体验
export const enableTpl = true; // 是否启用模板

export const emptyStr = "-"; // 空位占位符
export const rangeJoinChar = "~"; //日期、数字范围区间的连接符号
export const defaultIconName = "ElemeFilled"; //默认图标
export const defaultLoginExpired = 24 * 60 * 60 * 1000; //登录过期时间
export const defaultRefreshDictExpired = 24 * 60 * 60 * 1000; //刷新字典的时间

export const defaultPopupType = getExportData("dialog", popup?.defaultType); // 弹窗类型
export const defaultHomePath = getExportData("/", homePath); // 首页路径
export const defaultCommonSize = getExportData("small", widgetSize); // 控件大小
export const defaultThemeName = "orange";
export const defaultTableColDateFormat = "YYYY-MM-DD HH:mm:ss"; // 表格列的日期格式
// export const defaultFormItemDateFormat = "YYYY-MM-DD"; // 表单项的日期格式
// export const defaultFormItemDateValueFormat = "YYYY-MM-DD"; // 表单项的日期值的格式（作为参数传递时）
export const defaultPagination = { currPage: 1, pageSize: 20, show: true };
export const defaultGroupBtnsMaxNum = getExportData(3, table?.defaultGroupBtnsMaxNum);
export const defaultFormItemType = getExportData("input", form?.defaultFormItemType);

export const defaultReqMap: ReqMap = {
  curr_page: "curr_page",
  page_size: "page_size",
};
export const defaultResMap: ResMap = {
  curr_page: "curr_page",
  page_size: "page_size",
  total_num: "total_num",
  has_more: "has_more",
  records: "records",
};

export const defaultTooltipAttrs = {
  showAfter: 500,
};

export const defaultPopoverAttrs: CommonObj = getExportData(
  {
    // placement: "top",
    // title: "Title",
    // width: 300,
    // trigger: "hover",
    // content: "自定义提示内容",
    width: "fit-content",
    showAfter: 500,
  },
  form?.defaultPopoverAttrs
);

export const defaultDialogAttrs = {
  width: "fit-content",
  style: "max-width: 94vw;min-width:200px;overflow:hidden;",
  closeOnClickModal: false,
  appendToBody: true,
  destroyOnClose: true, // 当关闭 Dialog 时，销毁其中的元素
  draggable: true,
};

export const defaultDrawerAttrs = {
  size: "none",
  style: "max-width: 94vw;min-width:200px;",
  closeOnClickModal: false,
  appendToBody: true,
  destroyOnClose: true, // 是否在关闭 Drawer 之后将子元素全部销毁
};

// // 后续会提取成配置对象
// export default {
//   /*** 优化相关 ***/
//   isOptimization: false, // 是否开启优化。若为true，则会避免计算较复杂的逻辑，同时也会少一些良好的开发体验

//   /*** 基础配置 ***/
//   emptyStr: "-", // 空位占位符
//   rangeJoinChar: "~", //日期、数字范围区间的连接符号
//   defaultIconName: "ElemeFilled", //默认图标
//   defaultLoginExpired: 24 * 60 * 60 * 1000, //登录过期时间
//   defaultRefreshDictExpired: 24 * 60 * 60 * 1000, //刷新字典的时间

//   defaultHomePath: getExportData("/", homePath), //首页路径
//   defaultCommonSize: getExportData("default", form?.defaultCommonSize),
//   defaultGroupBtnsMaxNum: getExportData(3, table?.defaultGroupBtnsMaxNum),
//   defaultFormItemType: getExportData("input", form?.defaultFormItemType),

//   defaultReqMap: {
//     curr_page: "curr_page",
//     page_size: "page_size",
//   },
//   defaultResMap: {
//     curr_page: "curr_page",
//     page_size: "page_size",
//     total_num: "total_num",
//     has_more: "has_more",
//     records: "records",
//   },
//   defaultTooltipAttrs: {
//     showAfter: 500,
//   },
// };
