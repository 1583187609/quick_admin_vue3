/***************************************************************************/
/************************** 这里是全局的 ts 类型 ****************************/
/***************************************************************************/

import { ButtonType } from "@/components/BaseBtn/_types";
import { BaseRenderData } from "../BaseRender.vue";
import { RenderComponent } from "@/components/BaseRender.vue";
import type { MessageParams, messageType } from "element-plus";
import { EpPropMergeType } from "element-plus/es/utils";
import { AxiosResponse } from "axios";
import { ClosePopupType } from "@/components/BasicPopup/_types";

export * from "@/components/BasicPopup/_types";

export type ClassType = any;
export type StyleType = any;
export type FetchType = (data?: CommonObj) => Promise<AxiosResponse<any, any>>;
export type UniteFetchType = FetchType | ((params: CommonObj) => FetchType);
export type SetTimeout = null | NodeJS.Timeout;
export type SetInterval = null | NodeJS.SetInterval;
export type TostMessageType = messageType;
export type FinallyNext = (
  hint?: string | MessageParams,
  closeType?: ClosePopupType,
  cb?: () => void,
  isRefreshList?: boolean //是否刷新列表。默认true
) => void;
export type StrNum = string | number;
export type BaseDataType = null | undefined | boolean | string | number; //基础数据类型
export interface CommonObj {
  [key: string]: any;
}
export type CommonSize = "large" | "default" | "small"; //按钮、表单、表格等的通用大小
export type ShowCodes = 0 | 1; //0 false  1 true
export interface OptionItem {
  value: string | number | boolean;
  label?: string;
  disabled?: boolean;
  customOption?: RenderComponent;
  children?: OptionItem[];
}

// el-tab-pane 的 props 属性
export interface TabItem {
  label: string;
  name: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown> | undefined;
}

// 以下是测试部分，待验证
// export interface ComplexObject {
//   mandatory: string;
//   option1?: number;
//   option2?: boolean;
// }

// export type GetRequired<T> = {
//   [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P];
// };

// export type GetOptional<T> = {
//   [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P];
// };

// export type GetAllKeys<T> = {
//   [P in keyof T]: T[P];
// };

// let keys: GetOptional<ComplexObject>;

//其他参考
// export type BtnAllNames = keyof typeof btnsMap;
// export type BtnAllNames = keyof InstanceType<typeof btnsMap>;
// function handler<T extends object, K extends keyof T>(obj: T, propName: K) {}

export interface User {
  address: string;
  name: string;
  age: number;
}
//可选参数
export type GetPartial<T> = {
  [P in keyof T]?: T[P];
};
//必选参数
export type GetRequired<T> = {
  [P in keyof T]-?: T[P];
};
//提取部分属性
export type GetPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
//排除部分属性(排除type中的，即联合类型中的)
export type GetExclude<T, K> = T extends K ? never : T;

// 排除部分属性(排除interface中的，即接口类型中的)
export type GetOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

//使用示例
export type PartialUser = GetPartial<User>;
export type RequiredUser = GetRequired<User>;
export type PickUser = GetPick<User, "age" | "name">;
export type ExcludeUser = GetExclude<"a" | "b" | "c", "a" | "c">;
export type OmitUser = GetOmit<User, "age">;

// 临时记录，后续整理

// export type CommonButtonSize = "large" | "default" | "small";
// export type CommonFormSize = "large" | "default" | "small";
// export type CommonTableSize = "large" | "default" | "small";

// export type ValidType = keyof typeof defaultRulesTypes;

// export enum OrderDropKeyEnum {
//   OrderType = '订单类型'
// }
// export type OrderDropListRes = {
//   [k in keyof typeof OrderDropKeyEnum]: OrderDropItem[];
// };

export interface PopconfirmAttrs {
  title?: string;
  icon?: any;
  iconColor?: any;
  description?: string;
  cancel?: () => void;
  okText?: string;
  cancelText?: string;
  confirmButtonType?: ButtonType;
  disabled?: boolean;
  [key: string]: any;
}

export type PopTrigger = "click" | "focus" | "hover" | "contextmenu";
export type PopPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";
export interface PopoverAttrs {
  trigger?: PopTrigger;
  placement?: PopPlacement;
  content?: string;
  title?: string;
  disabled?: boolean;
  width?: StrNum;
  defaultSlot?: BaseRenderData;
}

export type Popover = string | PopoverAttrs;

export type HorizontalAlign = "left" | "center" | "right";
