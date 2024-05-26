<!-- 组件-基数配置 -->
<template>
  <BaseForm style="width: 400px" :fields="fields" :fetch="PostUserList" :fetchSuccess="refreshList"></BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { PostUserList } from "@/api-mock";
import { FormFieldAttrs } from "@/components/BaseFormItem";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    refreshList: FinallyNext;
  }>(),
  {}
);
const fields: FormFieldAttrs[] = [
  { prop: "z", label: "计算公式", required: true },
  { prop: "nr", label: "内容", required: true, attrs: { type: "textarea" } },
];
</script>
<style lang="scss" scoped></style>
