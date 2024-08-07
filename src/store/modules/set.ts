import { computed, reactive, ref, watch } from "vue";
import { defineStore } from "pinia";
import { CommonObj, ShowCodes } from "@/vite-env";
import { checkObjKeyError, defaultWidgetSize, showMessage, storage } from "@/utils";
import cssVars from "@/assets/styles/_var.module.scss";

export type LayoutType = "vertical" | "classics" | "horizontal" | "columns";
export type LayoutSize = "large" | "medium" | "small" | "mini";
export type SetName = keyof typeof defaultSet;
export type LanguageTypes = "zh" | "en";
export interface LayoutAttrs {
  type: LayoutType;
  size: LayoutSize;
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
    color: string;
    darkMode: ShowCodes;
  };
}

export const defaultSet: DefaultSet = {
  //布局
  layout: {
    type: "columns",
    size: defaultWidgetSize,
  },
  //语言
  language: {
    type: "zh",
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
    color: cssVars.colorPrimary,
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
