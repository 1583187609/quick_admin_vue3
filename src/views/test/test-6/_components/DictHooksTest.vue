<!-- 字典hooks测试 -->
<template>
  <TestView :records="records">
    <BaseForm class="f-2" v-model="model" :fields="fields" />
  </TestView>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import TestView from "@/components/TestView.vue";
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
const model = reactive({});
const fields = [
  {
    prop: "TestText",
    label: "文本类型",
    type: "select",
    options: "TestText",
    extraAttrs: {},
  },
  {
    prop: "TestObj",
    label: "对象类型",
    type: "select",
    options: "TestObj",
    extraAttrs: {},
  },
  {
    prop: "TestTree",
    label: "数组类型（树）",
    type: "tree-select",
    options: "TestTree",
    extraAttrs: {},
  },
  {
    prop: "TestCascader",
    label: "数组类型（级联）",
    type: "cascader",
    options: "TestCascader",
    extraAttrs: {},
  },
  {
    prop: "address",
    label: "省市区级联）",
    type: "cascader",
    options: "Region",
    extraAttrs: {},
  },
  {
    prop: "TestFunction",
    label: "函数类型",
    type: "select",
    options: "TestFunction",
    extraAttrs: {},
  },
  {
    prop: "TestPromise",
    label: "Promise类型",
    type: "select",
    options: "TestPromise",
    extraAttrs: {},
  },
  {
    prop: "TestFetch",
    label: "直接请求",
    type: "select",
    options: "TestFetch",
    extraAttrs: {},
  },
  {
    prop: "TestFetchLazy",
    label: "按需请求",
    type: "select",
    options: "TestFetchLazy",
    extraAttrs: {},
  },
  {
    prop: "TestInsert_0",
    label: "批量插入",
    type: "select",
    options: "TestInsert_0",
    extraAttrs: {
      popover: "非按需请求",
    },
  },
];
</script>
<style lang="scss" scoped></style>
