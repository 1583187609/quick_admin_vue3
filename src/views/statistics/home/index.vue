<!-- 文件说明-模板文件 -->
<template>
  <div class="">数据分析-首页</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {
    data: () => ({}),
  }
);
</script>
<style lang="scss" scoped></style>
