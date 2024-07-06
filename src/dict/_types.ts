import { TagType, TagEffect } from "@/components/BaseTag.vue";
import dict from ".";
import { tagColorMap } from "./_config";

export type DictName = keyof typeof dict;
export type TagColorName = keyof typeof tagColorMap;
// export type DictName = keyof InstanceType<typeof dict>;
// export type TagColorName = keyof InstanceType<typeof tagColorMap>;
export interface DictItemProps {
  text: string;
  disabled?: boolean; //作为下拉选项时是否禁用
  //下面 elementPlus 标签 el-tag 的属性
  attrs?: {
    color?: string;
    type?: TagType;
    style?: any;
    effect?: TagEffect;
  };
}

export interface DictMap {
  [key: string]: {
    [key: string]: DictItemProps;
  };
}
