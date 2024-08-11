<!-- 基础表单测试 -->
<template>
  <TestView :records="records">
    <BaseForm class="f-2" v-model="model" :fields="fields" grid="12" label-suffix="：" :size="size">
      <template #zdy>这是自定义的表单字段</template>
    </BaseForm>
    <template #side>
      <el-form label-suffix="：" class="f-1 ml-t">
        <el-form-item label="姓名">
          <el-input clearable />
        </el-form-item>
      </el-form>
    </template>
  </TestView>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, CommonSize, FinallyNext, StrNum } from "@/vite-env";
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
const model = reactive({ id: 0, nc: "这是用户昵称", zy: 0, xm: "" });
const fields = [
  { prop: "id", label: "用户ID", extraAttrs: {} },
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
  { prop: "zdy", label: "自定义", type: "custom" },
];
</script>
<style lang="scss" scoped></style>
