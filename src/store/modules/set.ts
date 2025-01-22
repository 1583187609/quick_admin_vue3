import { reactive } from "vue";
import { defineStore } from "pinia";
import { CommonObj, CommonSize, ShowCodes, ThemeName } from "@/core/_types";
import { checkObjKeyError, showMessage, storage } from "@/utils";
import { defaultCommonSize, defaultLanguage, defaultLayouType, defaultThemeName } from "@/core/config";

export type LayoutType = "vertical" | "classics" | "horizontal" | "columns";
export type SetName = keyof typeof defaultSet;
export type LanguageTypes = "zh" | "en";
export interface LayoutAttrs {
  type: LayoutType;
  size: CommonSize;
}
interface DefaultSet {
  layout: LayoutAttrs;
  language: {
    type: LanguageTypes;
  };
  menu: {
    uniqueOpened: ShowCodes;
  };
  pageTags: {
    show: ShowCodes;
    showIcon: ShowCodes;
  };
  breadcrumb: {
    show: ShowCodes;
    showIcon: ShowCodes;
  };
  footer: {
    show: ShowCodes;
  };
  theme: {
    name: ThemeName; // 主题名称
    // color?: string; // 主题颜色
    darkMode: ShowCodes;
  };
}

export const defaultSet: DefaultSet = {
  //布局
  layout: {
    type: defaultLayouType,
    size: defaultCommonSize,
  },
  //语言
  language: {
    type: defaultLanguage,
  },
  //菜单设置
  menu: {
    uniqueOpened: 0, //是否只保持一个子菜单的展开
  },
  //页签
  pageTags: { show: 1, showIcon: 0 },
  //面包屑
  breadcrumb: { show: 1, showIcon: 1 },
  //底部
  footer: { show: 0 },
  //主题
  theme: {
    name: defaultThemeName,
    // color: cssVars.colorPrimary,
    darkMode: 0,
  },
};
export default defineStore("set", () => {
  const setCfg = reactive(storage.getItem("set") ?? JSON.parse(JSON.stringify(defaultSet)));
  // 更改设置
  function updateSet(name: SetName, obj: CommonObj) {
    // checkObjKeyError(defaultSet[name], obj); // 是为了校验防止传参出错
    Object.assign(setCfg[name], obj);
    storage.setItem("set", setCfg);
  }
  // 重设为默认值
  function resetDefault(tips = "已恢复为默认值") {
    Object.assign(setCfg, JSON.parse(JSON.stringify(defaultSet)));
    storage.setItem("set", setCfg);
    showMessage(tips);
  }
  return {
    ...setCfg,
    updateSet,
    resetDefault,
  } as CommonObj;
});
