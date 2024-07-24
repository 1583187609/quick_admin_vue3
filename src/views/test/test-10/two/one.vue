<!-- 页面-简介 -->
<template>
  <div>测试10-2-1</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
const htmlString = `
<!--
 @title 行内表单
 @desc 这是行内表单的描述
-->
<template></template>
<style></style>
<!--
 @title 行内表单1
 @desc 这是行内表单的描述1
-->
`;
function resolveVueFile(fileStr = "") {
  let matchStr = "";
  const endStr = fileStr.replace(/(<!--.*?-->)/gs, a => {
    if (!matchStr) matchStr = a; //只识别第一次匹配的，其他的则忽略
    return "";
  });
  console.log(matchStr.slice(4, -3).trim(), "str---------");
  const infos = matchStr
    .slice(4, -3)
    .split(/\n/g)
    .filter(it => !!it);
  console.log(infos, "matchStr-----------");
  const info = {};
  infos.map(item => {
    const [key, val] = item.trim().split(" ");
    info[key.slice(1)] = val;
  });
  return { fileStr: endStr.trim(), info };
}
const result = resolveVueFile(htmlString);
</script>
<style lang="scss" scoped></style>
