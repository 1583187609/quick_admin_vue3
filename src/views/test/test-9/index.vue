<!-- 组件 - 生成表单 -->
<template>
  <div class="test-six f-fs-s-c">
    <el-tabs class="f-0" v-model="activeName" @tab-click="(tab:CommonObj) => (activeName = tab.paneName)">
      <el-tab-pane label="基础表单" name="base-form"></el-tab-pane>
      <el-tab-pane label="分块表单" name="section-form"></el-tab-pane>
    </el-tabs>
    <CreateBaseForm class="f-1" v-if="activeName === 'base-form'"></CreateBaseForm>
    <CreateSectionForm class="f-1" v-if="activeName === 'section-form'"></CreateSectionForm>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import CreateBaseForm from "./CreateBaseForm.vue";
import CreateSectionForm from "./CreateSectionForm.vue";
export type TabName = "base-form" | "section-form";
const activeName = ref("base-form");
</script>
<style lang="scss" scoped>
.test-six {
  height: 100%;
}
</style>
