<!-- 页面-简介 -->
<template>
  <span class="custom-head">{{ text }}</span>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    isPopover?: boolean;
  }>(),
  {}
);
const text = `${props.isPopover ? "这是" : ""}自定义表格头${props.isPopover ? "的自定义popover" : ""}`;
</script>
<style lang="scss" scoped></style>

<!-- <template>
  <BaseRender :data="devErrorTips(text, hasHandle || isPopover ? '' : undefined)" class="custom-head" />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { devErrorTips } from "@/utils";
import BaseRender from "@/components/BaseRender.vue";
const props = withDefaults(
  defineProps<{
    isPopover?: boolean;
    hasHandle?: boolean;
  }>(),
  {}
);
const text = `${props.isPopover ? "这是" : ""}自定义表格头${props.isPopover ? "的自定义popover" : ""}`;
</script>
<style lang="scss" scoped></style> -->
