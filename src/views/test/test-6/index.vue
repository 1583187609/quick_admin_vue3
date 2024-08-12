<!-- 页面-简介 -->
<template>
  <el-tabs v-model="activeName" tab-position="left" style="height: 100%" class="demo-tabs">
    <el-tab-pane label="基础表单" name="baseForm">
      <BaseFormTest />
    </el-tab-pane>
    <el-tab-pane label="分块表单" name="sectionForm">
      <SectionFormTest />
    </el-tab-pane>
    <el-tab-pane label="单元格表单？" name="cellForm">
      <CellFormTest />
    </el-tab-pane>
    <el-tab-pane label="嵌套表单？" name="nestedForm">
      <NestedFormTest />
    </el-tab-pane>
    <el-tab-pane label="基础表格" name="baseTable">
      <BaseTableTest />
    </el-tab-pane>
    <el-tab-pane label="编辑表格？" name="editTable">
      <EditTableTest />
    </el-tab-pane>
    <el-tab-pane label="基础增删改查" name="baseCrud">
      <BaseCrudTest />
    </el-tab-pane>
    <el-tab-pane label="卡片增删改查？" name="cardCrud">
      <CardCrudTest />
    </el-tab-pane>
    <el-tab-pane label="自定义增删改查？" name="customCrud">
      <CustomCrudTest />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import BaseFormTest from "./_components/BaseFormTest.vue";
import CellFormTest from "./_components/CellFormTest.vue";
import NestedFormTest from "./_components/NestedFormTest.vue";
import SectionFormTest from "./_components/SectionFormTest.vue";
import BaseTableTest from "./_components/BaseTableTest.vue";
import EditTableTest from "./_components/EditTableTest.vue";
import BaseCrudTest from "./_components/BaseCrudTest.vue";
import CardCrudTest from "./_components/CardCrudTest.vue";
import CustomCrudTest from "./_components/CustomCrudTest.vue";

const activeName = ref("cellForm");

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
