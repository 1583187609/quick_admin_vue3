/********************************************************************/
/*************************** 系统默认配置 ****************************/
/********************************************************************/

import config from "@/config";
import { CommonObj } from "@/core/_types";
// import { getExportData } from "@/core/utils";
import { ReqResMap } from "@/core/components/crud/BaseCrud/_types";

const { regexp, popup, date, element, paths, system, performance } = config;

export const enableTpl = performance?.enableTpl ?? true; // 是否启用模板
export const enableOptimize = performance?.enableOptimize ?? false; // 是否开启优化。若为true，则会避免计算较复杂的逻辑，同时也会少一些良好的开发体验

export const defaultNoAuthPaths = paths?.noAuth ?? ["/login"]; // 不需要授权就能登录的页面
export const defaultHomePath = paths?.home ?? "/"; // 首页路径

export const defaultCommonSize = system?.size ?? "default"; // 控件大小
export const defaultEmptyStr = system?.emptyStr ?? "-"; // 空位占位符
export const defaultThemeName = system?.theme?.name ?? "orange";
export const defaultLayouType = system?.layout?.type ?? "columns";
export const defaultLanguage = system?.language ?? "zh";
export const defaultRangeJoinChar = system?.rangeJoinChar ?? "~"; //日期、数字范围区间的连接符号

export const defaultLoginValidTime = date?.valid?.login ?? 24 * 60 * 60 * 1000; // 登录有效期时长
export const defaultDictValidTime = date?.valid?.dict ?? 24 * 60 * 60 * 1000; // 字典有效期时长
export const defaultTableColDateFormat = date?.format?.tableCol ?? "YYYY-MM-DD HH:mm:ss"; // 表格列的日期格式

export const defaultPopupType = popup?.defaultType ?? "dialog"; // 弹窗类型

export const defaultGroupBtnsMaxNum = config.OperateBtns?.max ?? 3; // 操作按钮最多显示几个按钮（若超出，则会以更多下拉形式呈现按钮）

export const defaultFormItemType = "input";

// 默认图标
export const defaultIconName = config.BaseIcon?.name ?? "ElemeFilled";

// BaseCrud 的请求参数，响应数据的键值对映射
export const defaultReqResMap: ReqResMap = Object.assign(
  {
    curr_page: "curr_page",
    page_size: "page_size",
    total_num: "total_num",
    has_more: "has_more",
    records: "records",
  },
  config.BaseCrud?.Index?.reqResMap
);

// el-tooltip的属性
export const defaultTooltipAttrs = Object.assign({ showAfter: 500 }, element?.tooltip);

// el-popover的属性
export const defaultPopoverAttrs: CommonObj = Object.assign(
  {
    // placement: "top",
    // title: "Title",
    // width: 300,
    // trigger: "hover",
    // content: "自定义提示内容",
    width: "fit-content",
    showAfter: 500,
  },
  element?.popover
);

export const defaultDialogAttrs = Object.assign(
  {
    width: "fit-content",
    style: "max-width: 94vw;min-width:200px;overflow:hidden;",
    closeOnClickModal: false,
    appendToBody: true,
    destroyOnClose: true, // 当关闭 Dialog 时，销毁其中的元素
    draggable: true,
  },
  element?.dialog
);

export const defaultDrawerAttrs = Object.assign(
  {
    size: "none",
    style: "max-width: 94vw;min-width:200px;",
    closeOnClickModal: false,
    appendToBody: true,
    destroyOnClose: true, // 是否在关闭 Drawer 之后将子元素全部销毁
  },
  element?.drawer
);

export const defaultRegexp = Object.assign(
  {
    onlyNum: /^[0-9.]+$/, //只匹配数字，至少一位，123或"123"均可
    lowerChar: /[a-z]+/, //小写字母
    //移动电话(中国，宽松)：只要是13,14,15,16,17,18,19开头即可
    phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
    // 身份证号, 支持1/2代(15位/18位数字)
    identity:
      /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,
    // 身份证号(1代,15位数字)
    identity_1: /^[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}$/,
    // 身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X
    identity_2: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
    // 邮箱
    email:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    // 密码： 6-16位字母和数字组合
    password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
    // 银行卡号
    creditCard: /^[1-9]\d{9,29}$/,
    // url地址
    url: /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/,
  },
  regexp
);

export default config;
