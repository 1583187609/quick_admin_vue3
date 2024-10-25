<!-- 嵌套表单测试 -->
<template>
  <TestView :records="records">
    <BaseForm class="f-2" v-model="modelData" :fields="fields" label-suffix="：" :size="size">
      <template #zdy>这是自定义的表单字段</template>
    </BaseForm>
    <!-- <template #side> </template> -->
  </TestView>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, CommonSize, FinallyNext, StrNum } from "@/vite-env";
import TestView from "@/core/TestView.vue";
const records = {
  hasTest: {
    title: "已测试属性",
    list: [],
  },
  waitBetter: {
    title: "待完善属性",
    list: ["prop传值", "grid属性值按预期展示"],
  },
};
const size: CommonSize = "default"; // large, default, small
const modelData = reactive({
  inner_obj: {
    one: "嵌套对象必填项一",
    two: "嵌套对象必填项二",
  },
});
const fields = [
  { prop: "id", label: "用户ID", quickAttrs: {} },
  { prop: "nc", label: "昵称", quickAttrs: {} },
  {
    label: "嵌套（对象）",
    prop: "inner_obj",
    // required: true,
    // showChildrenLabel: true,
    children: [
      {
        prop: "one",
        label: "一",
        required: true,
        labelWidth: "0",
        quickAttrs: {
          // grid: 12,
        },
      },
      {
        prop: "two",
        label: "二",
        required: true,
        labelWidth: "0",
        quickAttrs: {
          // grid: 12,
        },
      },
    ],
  },
  {
    label: "嵌套（数组）",
    prop: "inner_arr",
    required: true,
    type: "addDel",
    // showChildrenLabel: true,
    children: [
      {
        prop: "one",
        label: "一",
        required: true,
        labelWidth: "0",
        quickAttrs: {
          grid: 12,
        },
      },
      {
        prop: "two",
        label: "二",
        required: true,
        labelWidth: "0",
        quickAttrs: {
          grid: 12,
        },
      },
    ],
  },
];
</script>
<style lang="scss" scoped></style>
