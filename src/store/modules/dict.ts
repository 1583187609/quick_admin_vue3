import { reactive } from "vue";
import dict from "@/dict";
import cascader from "@/dict/cascader";
import { CommonObj } from "@/vite-env";
import { defineStore } from "pinia";

/**
 * 将对象按属性排序（整理文件按属性排序的时候会用到）
 * @param map CommonObj
 */
function sortMapByKey(map: CommonObj) {
  const keys = Object.keys(map);
  keys.sort();
  const obj: CommonObj = {};
  keys.forEach((key, ind) => {
    obj[key] = map[key];
  });
  return obj;
}

export default defineStore("dict", () => {
  const dictMap = reactive<CommonObj>(dict);
  const cascaderMap = reactive<CommonObj>(cascader);

  // 未来可能有如下方法
  // function getDictMap() {}
  // function setDictMap() {}
  // function clearDictMap() {}

  return {
    dictMap,
    cascaderMap,
  };
});
