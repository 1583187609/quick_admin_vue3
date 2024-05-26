<!-- 文件说明-模板文件 -->
<template>
  <div class="">富文本编辑器demo待完善</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj } from "@/vite-env";
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
