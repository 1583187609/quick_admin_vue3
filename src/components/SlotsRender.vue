<!-- 页面-简介 -->
<template>
  <slot :name="key" v-for="(val, key) in slots" :key="key">
    <BaseRender :data="val" />
  </slot>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj } from "./_types";
const props = withDefaults(
  defineProps<{
    slots?: CommonObj;
  }>(),
  {}
);
</script>
<style lang="scss" scoped></style>
