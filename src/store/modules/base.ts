import { computed, reactive, watch, ref } from "vue";
import { defineStore } from "pinia";
import { storage } from "@/utils";

export default defineStore("base", () => {
  // const isTest = ref(storage.getItem("isTest", "session") ?? true);
  /**
   * 增加一层监听是为了手动刷新浏览器时（点击左上角的刷新按钮），能够保持和刷新前一样的状态
   * 存储在sessionStorage中是为了避免localStorage中存储过多，影响阅读，且是否折叠这个状态不用一直存储在localStorage中
   */
  // watch(isTest, newVal => {
  //   storage.setItem("isTest", newVal, "session");
  // });
  // return {
  //   isTest,
  // };
});
