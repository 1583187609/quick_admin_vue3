<!-- 下拉项item -->
<template>
  <div class="custom-option f-sb-c">
    <div class="f-1 line-one">{{ fullName || "-" }}</div>
    <div class="f-0 short-name">{{ shortName }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
const props = withDefaults(
  defineProps<{
    fullName?: string;
    shortName?: string;
  }>(),
  {}
);
</script>
<style lang="scss" scoped>
.custom-option {
  min-width: 300px;
  .line-one {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .short-name {
    color: $color-text-light;
    margin-left: $gap;
  }
}
</style>
