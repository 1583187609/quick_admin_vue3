/********************************************************************/
/***************************** 系统常量 ******************************/
/********************************************************************/

import { getExportData } from "@/components/_utils";
import { ReqMap, ResMap } from "@/components/crud/BaseCrud/_types";
import config from "@/config";

export * from "./base";

const { table, form, homePath, widgetSize } = config;

export const isOptimization = false; // 是否开启优化。若为true，则会避免计算较复杂的逻辑，同时也会少一些良好的开发体验

export const emptyStr = "-"; // 空位占位符
export const rangeJoinChar = "~"; //日期、数字范围区间的连接符号
export const defaultIconName = "ElemeFilled"; //默认图标
export const defaultLoginExpired = 24 * 60 * 60 * 1000; //登录过期时间
export const defaultRefreshDictExpired = 24 * 60 * 60 * 1000; //刷新字典的时间

export const defaultHomePath = getExportData("/", homePath); //首页路径
export const defaultWidgetSize = getExportData("medium", widgetSize); //控件大小
export const defaultCommonSize = getExportData("default", form?.defaultCommonSize);
export const defaultGroupBtnsMaxNum = getExportData(3, table?.defaultGroupBtnsMaxNum);
export const defaultFormItemType = getExportData("input", form?.defaultFormItemType);
export const emptyTime = getExportData("", config?.form?.emptyTime, "alert"); //本应该为空的默认时间（当出现此值时，说明此时间应该为空）

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
