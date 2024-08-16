<!-- 文本内容 -->
<template>
  <div class="base-text" :class="{ [`line-${maxLine}`]: true, over: isOver }" @click="handleClick" ref="baseTextRef">
    <slot>{{ text }}</slot>
  </div>
</template>
<script lang="ts" setup>
import { ref, inject, onMounted } from "vue";
import { OpenPopupInject, StrNum } from "@/vite-env";
import { getIsOver } from "@/components/_utils";

const openPopup = inject<OpenPopupInject>("openPopup");
const props = withDefaults(
  defineProps<{
    maxLine?: StrNum; //最多显示几行，可选值：1~5 必须为整数
    title?: string;
    width?: StrNum;
    text?:string;
  }>(),
  {
    maxLine: 5,
    title: "详情",
    width: "500px",
  }
);
const baseTextRef = ref<HTMLDivElement | null>(null);
const isOver = ref(false);
onMounted(() => {
  isOver.value = getIsOver(baseTextRef.value);
});
function handleClick(e: any) {
  if (isOver.value) {
    openPopup({ title: props.title, width: props.width }, e.target.innerText);
  }
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
