import { computed, reactive, ref, watch } from "vue";
import { defineStore } from "pinia";
import { CommonObj, ShowCodes } from "@/vite-env";
import { checkObjKeyError, defaultWidgetSize, showMessage, storage } from "@/utils";
import cssVars from "@/assets/styles/_var.module.scss";

export default defineStore("dict", () => {
  const setCfg = reactive(storage.getItem("set") ?? JSON.parse(JSON.stringify(defaultSet)));
  // 更改设置
  function updateSet(name: SetName, obj: CommonObj) {
    // // checkObjKeyError(defaultSet[name], obj); // 是为了校验防止传参出错
    // Object.assign(setCfg[name], obj);
    // storage.setItem("set", setCfg);
  }
  // 重设为默认值
  function resetDefault(tips = "已恢复为默认值") {
    // Object.assign(setCfg, JSON.parse(JSON.stringify(defaultSet)));
    // storage.setItem("set", setCfg);
    // showMessage(tips);
  }
  return {
    ...setCfg,
    updateSet,
    resetDefault,
  } as CommonObj;
});
