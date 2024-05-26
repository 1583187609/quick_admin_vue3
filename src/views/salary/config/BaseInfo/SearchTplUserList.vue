<!-- 页面-简介 -->
<template>
  <BaseCrud style="max-height: calc(100vh - 200px)" :fields="fields" :cols="cols" :fetch="PostUserList" selection></BaseCrud>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { PostUserList } from "@/api-mock";
import { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import { TableFieldAttrs } from "@/components/table";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const fields: FormFieldAttrs[] = [
  { prop: "xm", label: "姓名" },
  { prop: "mdmc", label: "门店名称" },
];
const cols: TableFieldAttrs[] = [
  {
    prop: "xm",
    label: "姓名",
  },
  {
    prop: "sjh",
    label: "手机号",
  },
  {
    prop: "zz",
    label: "组织",
  },
  {
    prop: "gw",
    label: "岗位",
  },
];
</script>
<style lang="scss" scoped></style>
