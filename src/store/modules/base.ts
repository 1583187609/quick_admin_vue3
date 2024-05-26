import { computed, reactive, watch, ref } from "vue";
import { defineStore } from "pinia";
import { storage } from "@/utils";

export default defineStore("base", () => {
  const isFold = ref(storage.getItem("isFold", "session") ?? true);
  /**
   * 增加一层监听是为了手动刷新浏览器时（点击左上角的刷新按钮），能够保持和刷新前一样的状态
   * 存储在sessionStorage中是为了避免localStorage中存储过多，影响阅读，且是否折叠这个状态不用一直存储在localStorage中
   */
  watch(isFold, newVal => {
    storage.setItem("isFold", newVal, "session");
  });
  return {
    isFold,
  };
});
