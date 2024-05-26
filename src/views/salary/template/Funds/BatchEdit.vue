<!-- 页面-简介 -->
<template>
  <BaseForm style="width: 400px" :fields="fields" :fetch="PostUserList" :fetchSuccess="refreshList"></BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { PostUserList } from "@/api-mock";
import { FormField } from "@/components/BaseFormItem";
import { BatchEditType } from "./Index.vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    type: BatchEditType;
    ids: StrNum[];
    refreshList: FinallyNext;
  }>(),
  {}
);
const fields: FormField[] = [
  props.type === "baseNum" && {
    prop: "jnjs",
    label: "缴纳基数",
    required: true,
    after: "元",
  },
  props.type === "payRatio" && {
    prop: "grjcbl",
    label: "个人缴存比例",
    required: true,
    after: "元",
  },
];
</script>
<style lang="scss" scoped></style>
