<!-- 页面-简介 -->
<template>
  <el-tabs v-model="activeName" tab-position="left" style="height: 100%" class="demo-tabs">
    <el-tab-pane label="基础表单" name="baseForm">
      <BaseFormTest v-if="activeName === 'baseForm'" />
    </el-tab-pane>
    <el-tab-pane label="分块表单" name="sectionForm">
      <SectionFormTest v-if="activeName === 'sectionForm'" />
    </el-tab-pane>
    <el-tab-pane label="步骤表单？" name="stepForm">
      <StepFormTest v-if="activeName === 'stepForm'" />
    </el-tab-pane>
    <el-tab-pane label="单元格表单？" name="cellForm">
      <CellFormTest v-if="activeName === 'cellForm'" />
    </el-tab-pane>
    <el-tab-pane label="嵌套表单？" name="nestedForm">
      <NestedFormTest v-if="activeName === 'nestedForm'" />
    </el-tab-pane>
    <el-tab-pane label="基础表格" name="baseTable">
      <BaseTableTest v-if="activeName === 'baseTable'" />
    </el-tab-pane>
    <el-tab-pane label="编辑表格？" name="editTable">
      <EditTableTest v-if="activeName === 'editTable'" />
    </el-tab-pane>
    <el-tab-pane label="基础增删改查" name="baseCrud">
      <BaseCrudTest v-if="activeName === 'baseCrud'" />
    </el-tab-pane>
    <el-tab-pane label="卡片增删改查？" name="cardCrud">
      <CardCrudTest v-if="activeName === 'cardCrud'" />
    </el-tab-pane>
    <el-tab-pane label="自定义增删改查？" name="customCrud">
      <CustomCrudTest v-if="activeName === 'customCrud'" />
    </el-tab-pane>
    <el-tab-pane label="字典Hooks测试？" name="dictHooksTest">
      <DictHooksTest v-if="activeName === 'dictHooksTest'" />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import BaseFormTest from "./_components/BaseFormTest.vue";
import CellFormTest from "./_components/CellFormTest.vue";
import NestedFormTest from "./_components/NestedFormTest.vue";
import SectionFormTest from "./_components/SectionFormTest.vue";
import StepFormTest from "./_components/StepFormTest.vue";
import BaseTableTest from "./_components/BaseTableTest.vue";
import EditTableTest from "./_components/EditTableTest.vue";
import BaseCrudTest from "./_components/BaseCrudTest.vue";
import CardCrudTest from "./_components/CardCrudTest.vue";
import CustomCrudTest from "./_components/CustomCrudTest.vue";
import DictHooksTest from "./_components/DictHooksTest.vue";

const activeName = ref("editTable");
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
