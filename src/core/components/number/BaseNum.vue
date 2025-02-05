<!-- summary
目标：定位为数字组件。
注意：此功能待完善。
-->
<template>
  <div class="base-num" :class="'color-' + (num > 0 ? 'success' : num < 0 ? 'danger' : 'info')">
    <template v-if="showText">{{ num > 0 ? "收入" : num < 0 ? "支出" : defaultEmptyStr }} </template>
    <template v-else>
      {{ (num > 0 ? "+" : "") + num }}
    </template>
  </div>
</template>
<script lang="ts" setup>
import { defaultEmptyStr } from "@/core/config";

const props = withDefaults(
  defineProps<{
    value?: number | string;
    plusText?: "收入";
    decreaseText?: "支出";
    showText?: boolean;
  }>(),
  {
    value: 0,
  }
);
const num = computed(() => Number(props.value));
</script>
<style lang="scss" scoped></style>
