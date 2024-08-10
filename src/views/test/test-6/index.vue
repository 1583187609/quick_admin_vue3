<!-- 页面-简介 -->
<template>
  <el-tabs v-model="activeName" tab-position="left" style="height: 100%" class="demo-tabs">
    <el-tab-pane label="基础表单" name="baseForm">
      <FormTest />
    </el-tab-pane>
    <el-tab-pane label="基础表格" name="baseTable">
      <TableTest />
    </el-tab-pane>
    <el-tab-pane label="分块表单" name="sectionForm">
      <SectionFormTest />
    </el-tab-pane>
    <el-tab-pane label="基础增删改查" name="baseCrudTest">
      <BaseCrudTest />
    </el-tab-pane>
  </el-tabs>
  <!-- <BaseTable :cols="cols" :rows="rows"></BaseTable> -->
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import FormTest from "./_components/FormTest.vue";
import SectionFormTest from "./_components/SectionFormTest.vue";
import TableTest from "./_components/TableTest.vue";
import BaseCrudTest from "./_components/BaseCrudTest.vue";

const activeName = ref("baseCrudTest");

const cols = [
  { prop: "id", label: "用户ID" },
  { prop: "nc", label: "昵称" },
  {
    prop: "zy",
    label: "职业",
  },
  { prop: "xm", label: "姓名" },
  { prop: "xb", label: "性别" },
  { prop: "nl", label: "年龄" },
  { prop: "xx", label: "学校" },
  { prop: "jg", label: "籍贯" },
  { prop: "xjd", label: "现居地" },
  { prop: "ip", label: "IP地址" },
  { prop: "dh", label: "电话" },
];

const rows = [];
</script>
<style lang="scss">
.demo-tabs {
  height: 100%;
  width: 100%;
  .el-tab-pane {
    width: 100%;
    height: 100%;
  }
}
</style>
