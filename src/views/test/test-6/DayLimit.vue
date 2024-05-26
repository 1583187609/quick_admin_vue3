<!-- 组件-每日嘉宾额度配置 -->
<template>
  <BaseForm :fields="fields" class="day-limit"></BaseForm>
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
    prop: "mrdsqfycs",
    label: "每日单身圈翻阅次数",
    type: "input-number",
    attrs: {
      min: 0,
      max: 100,
    },
  },
  {
    prop: "mrxdjbrs",
    label: "每日心动嘉宾人数",
    type: "input-number",
    attrs: {
      min: 0,
      max: 100,
    },
  },
];
</script>
<style lang="scss" scoped>
.day-limit {
  width: 310px;
}
</style>
