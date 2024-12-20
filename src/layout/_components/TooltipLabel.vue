<!-- 当出现省略号时，鼠标放上来，会出现 title 提示 -->
<template>
  <!-- 使用 el-tooltip 会影响属性透传，暂时没想到更好的方法，故暂时不用 -->
  <!-- <el-tooltip :content="label" :show-after="200" :disabled="disabled"> -->
  <!-- v-bind="$attrs" -->
  <span class="tooltip-label line-1" :title="disabled ? '' : label" @mouseenter="handleMouseenter" ref="spanRef">
    {{ label }}
  </span>
  <!-- </el-tooltip> -->
</template>
<script lang="ts" setup>
import { ref, nextTick } from "vue";
import { getIsOver } from "@/utils";
const props = withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {}
);
// const $attrs = useAttrs();
const spanRef = ref(null);
const disabled = ref(true);
function handleMouseenter() {
  nextTick(() => {
    disabled.value = !getIsOver(spanRef.value);
  });
}
</script>
<style lang="scss" scoped>
.tooltip-label {
  font-size: 12px;
}
</style>
