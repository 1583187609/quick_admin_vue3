<!-- 数据看板 -->
<template>
  <div class="data-pannel">data-pannel</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";

type ColorType = keyof typeof colors;
const colors = {
  purple: [],
  red: [],
  blur: [],
  orange: [],
};
const props = withDefaults(
  defineProps<{
    color?: ColorType;
  }>(),
  {
    color: "purple",
  }
);
</script>
<style lang="scss" scoped>
.data-pannel {
  border-radius: $radius-main;
}
</style>
