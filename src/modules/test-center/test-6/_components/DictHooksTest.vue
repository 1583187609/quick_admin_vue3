<!-- 字典hooks测试 -->
<template>
  <TestView :records="records">
    <BaseForm class="f-2" v-model="modelData" :fields="fields" />
  </TestView>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import TestView from "@/core/components/TestView.vue";
const records = {
  hasTest: {
    title: "已测试属性",
    list: [],
  },
  waitBetter: {
    title: "待完善属性",
    list: [],
  },
};
const modelData = reactive({});
const fields = [
  {
    prop: "D_TestText",
    label: "文本类型",
    type: "select",
    attrs: {
      options: "D_TestText",
    },
  },
  {
    prop: "D_TestObj",
    label: "对象类型",
    type: "select",
    attrs: {
      options: "D_TestObj",
    },
  },
  {
    prop: "D_TestTree",
    label: "数组类型（树）",
    type: "tree-select",
    attrs: {
      options: "D_TestTree",
    },
  },
  {
    prop: "D_TestCascader",
    label: "数组类型（级联）",
    type: "cascader",
    attrs: {
      options: "D_TestCascader",
    },
  },
  {
    prop: "address",
    label: "省市区级联）",
    type: "cascader",
    attrs: {
      options: "C_Region",
    },
  },
  {
    prop: "D_TestFunction",
    label: "函数类型",
    type: "select",
    attrs: {
      options: "D_TestFunction",
    },
  },
  {
    prop: "D_TestPromiseArray",
    label: "Promise类型",
    type: "select",
    attrs: {
      options: "D_TestPromiseArray",
    },
  },
  {
    prop: "D_TestFetch",
    label: "直接请求",
    type: "select",
    attrs: {
      options: "D_TestFetch",
    },
  },
  {
    prop: "D_TestFetchLazy",
    label: "按需请求",
    type: "select",
    attrs: {
      options: "D_TestFetchLazy",
    },
  },
  {
    prop: "TestInsert_0",
    label: "批量插入",
    type: "select",
    attrs: {
      options: "TestInsert_0",
    },
    quickAttrs: {
      popover: "非按需请求",
    },
  },
];
</script>
<style lang="scss" scoped></style>
