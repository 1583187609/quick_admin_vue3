<!-- 表态列表 -->
<template>
  <div class="attitude-list">attitude-list</div>
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
