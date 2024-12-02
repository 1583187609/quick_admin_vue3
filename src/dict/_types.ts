import { TagAttrs } from "@/core/components/BaseTag.vue";
import { tagColorMap } from "./_config";
import { OptionItem } from "@/core/_types";
import dict from ".";

export type DictName = keyof typeof dict;
export type TagColorName = keyof typeof tagColorMap;
// export type DictName = keyof InstanceType<typeof dict>;
// export type TagColorName = keyof InstanceType<typeof tagColorMap>;

export interface SelectAttrs {
  disabled?: boolean;
  [key: string]: any;
}
export interface CascaderAttrs {
  [key: string]: any;
}
export interface TreeAttrs {
  [key: string]: any;
}

export interface SelectItemProps {
  text: string;
  // 同 elementPlus 的 el-tag, el-select, el-cascader, el-tree的属性
  attrs?: TagAttrs | SelectAttrs | CascaderAttrs | TreeAttrs;
}

export interface DataMap {
  [key: string]: {
    [key: string]: string | SelectItemProps | OptionItem[]; //文本，select的下拉项，或者tree或cascader的数据
  };
}
