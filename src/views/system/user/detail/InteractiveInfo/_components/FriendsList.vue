<!-- 好友关系列表 -->
<template>
  <div class="friends-list">friends-list</div>
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
