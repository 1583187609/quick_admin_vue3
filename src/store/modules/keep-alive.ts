import { ref } from "vue";
import { defineStore } from "pinia";
import { typeOf } from "@/utils";

export default defineStore("keep-alive", () => {
  const list = ref<string[]>([]);
  //新增
  function add(name: string | string[]) {
    if (!name) return;
    if (typeof name === "string") {
      !list.value.includes(name) && list.value.push(name);
    } else if (Array.isArray(name)) {
      name.forEach(it => add(it));
    } else {
      throw new Error(`暂不支持${typeOf(name)}类型`);
    }
  }
  //移除
  function remove(name: string | string[]) {
    if (!name) return;
    if (typeof name === "string") {
      list.value = list.value.filter(it => it !== name);
    } else if (Array.isArray(name)) {
      list.value = list.value.filter(it => !name.includes(it));
    } else {
      throw new Error(`暂不支持${typeOf(name)}类型`);
    }
  }
  //清除
  function clean() {
    list.value = [];
  }

  return {
    list,
    add,
    remove,
    clean,
  };
});
