import { CommonObj, StrNum } from "@/core/_types";
import { TableColAttrs } from "@/core/components/table/_types";
import { BtnItem } from "@/core/components/BaseBtn/_types";
import { ImportCfgAttrs } from "./_components/CommonImport.vue";

export type FilterAuthItem = number | { code: number; disabled: boolean }; //disabled: 默认false
export type HandleButtonAuth = (auth: number[]) => boolean;
export type TriggerGetListType =
  | "ready"
  | "extraParams"
  | "reset"
  | "search"
  | "sizeChange"
  | "currChange"
  | "change"
  | "expose"
  | "refresh";

// 键值对类型（只含label、value两个属性）
export interface KeyValItem {
  label: string;
  value: string;
}

// 请求/响应参数的键名映射
export interface ReqResMap {
  curr_page?: string;
  page_size?: string;
  total_num?: string;
  has_more?: string;
  records?: string;
}

export interface ExportCfg {
  limit: number; //一次性导出数据的上限条数
}
