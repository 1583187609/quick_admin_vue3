<!-- 基础增删改查 -->
<template>
  <div class="">基础增删改查</div>
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
