<template>
  <div class="base-num" :class="'color-' + (props.value > 0 ? 'success' : props.value < 0 ? 'danger' : 'info')">
    <template v-if="showText">{{ props.value > 0 ? "收入" : props.value < 0 ? "支出" : "-" }} </template>
    <template v-else>
      {{ (props.value > 0 ? "+" : "") + props.value }}
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";

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
</script>
<style lang="scss" scoped></style>
