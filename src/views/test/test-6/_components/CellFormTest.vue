<!-- 单元格表单测试 -->
<template>
  <TestView :records="records">
    <div>
      <BaseForm
        class="f-2 m-o"
        v-model="model"
        type="cell"
        :fields="fields"
        grid="12"
        label-suffix="："
        :size="size"
        :pureText="pureText"
      >
        <template #zdy>这是自定义的表单字段</template>
      </BaseForm>
      <SectionForm class="f-2 m-o" type="cell" :sections="sections" grid="12" label-suffix="：" :size="size" :pureText="pureText">
        <template #zdy>这是自定义的表单字段</template>
      </SectionForm>
    </div>
  </TestView>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, CommonSize, FinallyNext, StrNum } from "@/vite-env";
import SectionForm from "@/components/form/SectionForm.vue";
import TestView from "@/components/TestView.vue";

const records = {
  hasTest: {
    title: "已测试属性",
    list: ["readonly", "pureText", "labelWidth", "disabled", "size", "自定义表单字段项"],
  },
  waitBetter: {
    title: "待完善属性",
    list: [`type="cell"`, "label-suffix"],
  },
};
const size: CommonSize = "default"; // large, default, small
const pureText = false;
const model = reactive({ id: 0, nc: "这是用户昵称", zy: 0, xm: "" });
const fields = [
  { prop: "id", label: "用户ID", required: true, extraAttrs: {} },
  { prop: "nc", label: "昵称", extraAttrs: {} },
  {
    prop: "zy",
    label: "职业",
    type: "select",
    options: [
      { label: "职业0", value: 0 },
      { label: "职业1", value: 1 },
    ],
    extraAttrs: {},
  },
  { prop: "xm", label: "姓名", extraAttrs: {} },
  { prop: "xb", label: "性别", extraAttrs: {} },
  { prop: "nl", label: "年龄", extraAttrs: {} },
  { prop: "xx", label: "学校", extraAttrs: { grid: 6 } },
  { prop: "jg", label: "籍贯", extraAttrs: { grid: 6 } },
  { prop: "xjd", label: "现居地", extraAttrs: { grid: 6 } },
  { prop: "ip", label: "IP地址", extraAttrs: { grid: 6 } },
  { prop: "dh", label: "电话", extraAttrs: { grid: 6 } },
  { prop: "zdy", label: "自定义", type: "custom", extraAttrs: { grid: 18 } },
];
const sections = [
  {
    title: "第一部分",
    // pureText: true,
    // size: "small",
    popover: "块级设置 {pureText: true, size: 'small'}",
    fields: [
      {
        prop: "id",
        label: "用户ID",
        extraAttrs: {},
      },
      { prop: "nc", label: "昵称", extraAttrs: {} },
      {
        prop: "zy",
        label: "职业",
        type: "select",
        options: [
          { label: "职业0", value: 0 },
          { label: "职业1", value: 1 },
        ],
        extraAttrs: {},
      },
    ],
  },
  {
    title: "第二部分",
    grid: "8",
    // readonly: true,
    // labelWidth: "auto",
    popover: "块级设置 {readonly: true}",
    fields: [
      { prop: "xm", label: "姓名", extraAttrs: { pureText: true, popover: "字段级设置 {pureText: true}" } },
      { prop: "xb", label: "性别", required: true, size: "default", extraAttrs: {} },
      { prop: "nl", label: "年龄", extraAttrs: {} },
    ],
  },
  {
    title: "第三部分",
    popover: "块级设置 prop 属性",
    prop: "partThree",
    fields: [
      { prop: "xjd", label: "现居地", size: "default", extraAttrs: { grid: 12, tips: "字段级的size【el-form-item】" } },
      {
        prop: "ip",
        label: "IP地址",
        size: "default",
        extraAttrs: { grid: 12, tips: "控件级的size【el-input】" },
      },
    ],
  },
];
</script>
<style lang="scss" scoped></style>
