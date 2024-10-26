<!-- 步骤表单测试 -->
<template>
  <TestView :records="records">
    <StepForm class="f-2" v-model="modelData" :sections="sections" label-suffix="：" :size="size">
      <template #body-partOne>这是第一部分的自定义内容</template>
      <template #head-right-partThree>这是第三部分的Head的插槽，有prop属性：【head-right-partThree】</template>
      <template #head-right-4>这是第四部分的Head的插槽，无prop属性：【head-right-4】</template>
      <template #zdy>这是自定义的表单字段</template>
    </StepForm>
  </TestView>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, CommonSize, FinallyNext, StrNum } from "@/vite-env";
import TestView from "@/core/TestView.vue";
import StepForm from "@/core/form/StepForm.vue";

const records = {
  hasTest: {
    title: "已测试属性",
    list: [],
  },
  waitBetter: {
    title: "待完善属性",
    list: ["slot"],
  },
};
const size: CommonSize = "large"; // large, default, small
const modelData = reactive({ id: 0, nc: "这是用户昵称", zy: 0, xm: "张三", partThree: { xjd: "成都" } });
const sections = [
  {
    title: "第一部分",
    // pureText: true,
    // size: "small",
    prop: "partOne",
    type: "custom",
    popover: "块级设置 {pureText: true, size: 'small'}",
    fields: [
      {
        prop: "id",
        label: "用户ID",
      },
      { prop: "nc", label: "昵称" },
      {
        prop: "zy",
        label: "职业",
        type: "select",
        attrs: {
          options: [
            { label: "职业0", value: 0 },
            { label: "职业1", value: 1 },
          ],
        },
      },
    ],
  },
  {
    title: "第二部分",
    // readonly: true,
    // labelWidth: "auto",
    popover: "块级设置 {readonly: true}",
    fields: [
      { prop: "xm", label: "姓名", quickAttrs: { pureText: true, popover: "字段级设置 {pureText: true}" } },
      { prop: "xb", label: "性别", required: true, size: "default" },
      { prop: "nl", label: "年龄" },
    ],
  },
  {
    title: "第三部分",
    popover: "块级设置 prop 属性",
    prop: "partThree",
    fields: [
      { prop: "xjd", label: "现居地", size: "default", quickAttrs: { tips: "字段级的size【el-form-item】" } },
      {
        prop: "ip",
        label: "IP地址",
        size: "default",

        quickAttrs: { tips: "控件级的size【el-input】" },
      },
    ],
  },
  {
    title: "第四部分",
    disabled: true,
    popover: "块级设置 {disabled: true}",
    fields: [
      { prop: "dh", label: "电话" },
      { prop: "ma", label: "密码" },
      {
        prop: "sfzh",
        label: "身份证号",
        attrs: { disabled: false },
        quickAttrs: { popover: "设置{disabled: false}" },
      },
      { prop: "zdy", label: "自定义", type: "custom" },
    ],
  },
];
</script>
<style lang="scss" scoped></style>
