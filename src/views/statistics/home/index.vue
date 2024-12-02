<!-- 文件说明-模板文件 -->
<template>
  <div class="">数据概览</div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
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
