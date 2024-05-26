<!-- 页面-简介 -->
<template>
  <div class="hint">删除模板，特别提醒以下几点：</div>
  <ul class="ul">
    <li class="li" v-for="(item, ind) in tips" :key="ind">{{ item }}</li>
  </ul>
  <div class="tips">您确定要删除吗？</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const tips: string[] = ["无法继续通过当前模板的核算薪资。", "无法继续通过当前模板核算工资单。"];
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
.hint {
  color: $color-warning;
}
.ul {
  margin: $gap;
  .li {
    list-style: decimal;
    &:not(:last-child) {
      margin-bottom: $gap-qtr;
    }
  }
}
.tips {
  color: $color-danger;
}
</style>
