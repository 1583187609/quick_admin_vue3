import { CommonObj, StrNum } from "@/vite-env";
import { TableColAttrs } from "@/components/table/_types";
import { BtnItem } from "@/components/BaseBtn/_types";
import { TplCfgAttrs } from "./_components/CommonImport.vue";

export type FilterAuthItem = number | { code: number; disabled: boolean }; //disabled: 默认false
export type FilterByAuthFn = (auth: number[]) => boolean;
export type TriggerGetListType = "extraParams" | "reset" | "search" | "sizeChange" | "currChange" | "change" | "expose" | "refresh";

/**
 * 处理点击额外按钮
 */
export interface HandleClickExtraBtnsProps {
  btnObj: BtnItem;
  cols?: TableColAttrs[];
  seledRows: CommonObj[];
  seledKeys: StrNum[];
  total: number;
  exportCfg?: {
    limit: number; //一次性导出数据的上限条数
  };
  $emit: any;
  refreshList?: any;
  next: any;
  openPopup?: any;
  importCfg?: TplCfgAttrs;
}

// 键值对类型（只含label、value两个属性）
export interface KeyValItem {
  label: string;
  value: string;
}

//请求参数的键名映射
export interface ReqMap {
  curr_page?: string;
  page_size?: string;
}
//响应参数的键名映射
export interface ResMap {
  curr_page?: string;
  page_size?: string;
  total_num?: string;
  has_more?: string;
  records?: string;
}

export interface ExportCfg {
  limit: number; //一次性导出数据的上限条数
}
