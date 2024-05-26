<!-- 页面-简介 -->
<template>
  <div style="width: 400px">
    <div class="step">步骤1：下载导入模板（若已下载过模板，可跳过此步骤）。</div>
    <el-button class="mb-h btn" type="primary">模板下载</el-button>
    <div class="step">步骤2：上传文件。</div>
    <el-button class="btn" type="primary" plain>上传文件</el-button>
    <ul class="ul">
      <li class="li" v-for="(item, ind) in tips" :key="ind">{{ item }}</li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const tips: string[] = ["不支持Excel公式导入", "不支持除xls、xlsx以外格式导入"];
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
</script>
<style lang="scss" scoped>
.step {
  font-weight: 500;
  margin-bottom: $gap-qtr;
}
.btn {
  margin-left: 3.5em;
}
.ul {
  margin: $gap $gap 0;
  &::before {
    content: "注：";
    color: $color-danger;
  }
  .li {
    color: $color-danger;
    list-style: decimal;
  }
}
</style>
