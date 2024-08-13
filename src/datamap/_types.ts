import { TagType, TagEffect } from "@/components/BaseTag.vue";
import { tagColorMap } from "./_config";
import { ClassType, OptionItem, StyleType } from "@/vite-env";
import datamap from ".";


export type DatamapName = keyof typeof datamap;
export type TagColorName = keyof typeof tagColorMap;
// export type DatamapName = keyof InstanceType<typeof datamap>;
// export type TagColorName = keyof InstanceType<typeof tagColorMap>;
export interface SelectItemProps {
  text: string;
  disabled?: boolean; //作为下拉选项时是否禁用
  //下面 elementPlus 标签 el-tag 的属性
  attrs?: {
    color?: string;
    type?: TagType;
    style?: StyleType;
    class?: ClassType;
    effect?: TagEffect;
  };
}

export interface DictMap {
  [key: string]: {
    [key: string]: SelectItemProps | OptionItem[]; //select的下拉项，或者tree或cascader的数据
  };
}
