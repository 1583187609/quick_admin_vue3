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
    prop: "TestText",
    label: "文本类型",
    type: "select",
    attrs: {
      options: "TestText",
    },
  },
  {
    prop: "TestObj",
    label: "对象类型",
    type: "select",
    attrs: {
      options: "TestObj",
    },
  },
  {
    prop: "TestTree",
    label: "数组类型（树）",
    type: "tree-select",
    attrs: {
      options: "TestTree",
    },
  },
  {
    prop: "TestCascader",
    label: "数组类型（级联）",
    type: "cascader",
    attrs: {
      options: "TestCascader",
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
    prop: "TestFunction",
    label: "函数类型",
    type: "select",
    attrs: {
      options: "TestFunction",
    },
  },
  {
    prop: "TestPromise",
    label: "Promise类型",
    type: "select",
    attrs: {
      options: "TestPromise",
    },
  },
  {
    prop: "TestFetch",
    label: "直接请求",
    type: "select",
    attrs: {
      options: "TestFetch",
    },
  },
  {
    prop: "TestFetchLazy",
    label: "按需请求",
    type: "select",
    attrs: {
      options: "TestFetchLazy",
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
