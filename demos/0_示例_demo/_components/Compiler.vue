<!-- 页面-简介 -->
<template>
  <div class="example-vue">example-vue</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import vueCompiler from "@vue/compiler-dom";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { vueStr } from "../_data";

const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
// parseVue(vueStr);
// function parseVue(codeStr: string) {
//   const result = vueCompiler.parse(codeStr);
//   console.log(result, "result-------------");
// }
</script>
<style lang="scss" scoped></style>
