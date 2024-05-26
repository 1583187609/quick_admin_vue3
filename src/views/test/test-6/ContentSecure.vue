<!-- 组件-内容安全配置 -->
<template>
  <div class="content-secure">内容安全配置（暂时不做）</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { BtnName } from "@/components/BaseBtn";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
</script>
<style lang="scss" scoped></style>
