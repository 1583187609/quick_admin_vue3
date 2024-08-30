<!-- 文本内容 -->
<template>
  <div class="base-text" :class="{ [`line-${maxLine}`]: true, over: isOver }" @click="handleClick" ref="baseTextRef">
    <slot>{{ textStr }}</slot>
  </div>
</template>
<script lang="ts" setup>
import { ref, inject, onMounted, computed, useSlots } from "vue";
import { OpenPopupInject, StrNum } from "@/vite-env";
import { getIsOver } from "@/components/_utils";

const openPopup = inject<OpenPopupInject>("openPopup");
const defaultPopupAttrs = {
  title: "详情",
  width: "500px",
};
const props = withDefaults(
  defineProps<{
    maxLine?: StrNum; //最多显示几行，可选值：1~5 必须为整数
    popupAttrs?: any;
    text?: string;
  }>(),
  {
    maxLine: 5,
    popupAttrs: () => defaultPopupAttrs,
  }
);
const $slots = useSlots();
const textStr = computed<StrNum>(() => props.text ?? $slots.default?.()[0]?.children ?? "");
const baseTextRef = ref<HTMLDivElement | null>(null);
const isOver = ref(false);
onMounted(() => {
  isOver.value = getIsOver(baseTextRef.value);
});
function handleClick(e: any) {
  if (!isOver.value) return;
  openPopup({ ...defaultPopupAttrs, ...props.popupAttrs }, e.target.innerText);
}
</script>
<style lang="scss" scoped>
.base-text {
  &.over {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
