<!-- 组件-代币配置 -->
<template>
  <div class="f-fs-s-c" style="width: 400px">
    <div class="title f-0">消耗代币数量（个）</div>
    <BaseForm style="width: 100%" :fields="fields" class="coin f-1"></BaseForm>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField } from "@/components/BaseFormItem";
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
const fields: FormField[] = [
  {
    prop: "cjxh",
    label: "超级喜欢消耗",
    type: "input-number",
    attrs: { min: 0, style: "width: 220px" },
  },
  {
    prop: "jsxhw",
    label: "解锁喜欢我消耗",
    type: "input-number",
    attrs: { min: 0, style: "width: 220px" },
  },
  {
    prop: "jsfk",
    label: "解锁访客消耗",
    type: "input-number",
    attrs: { min: 0, style: "width: 220px" },
  },
  {
    prop: "jsqzyh",
    label: "解锁圈子用户消耗",
    type: "input-number",
    attrs: { min: 0, style: "width: 220px" },
  },
  {
    prop: "hhyq",
    label: "会话延期消耗",
    type: "input-number",
    attrs: { min: 0, style: "width: 220px" },
  },
  {
    prop: "ckgdjb",
    label: "查看更多嘉宾消耗",
    type: "input-number",
    attrs: { min: 0, style: "width: 220px" },
  },
];
</script>
<style lang="scss" scoped>
.title {
  font-weight: 600;
  font-size: 15px;
  width: 100%;
  text-align: center;
  margin-bottom: $gap;
}
</style>
