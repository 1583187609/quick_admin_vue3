<!-- 页面-简介 -->
<template>
  <div class="custom-msg" :style="{ textAlign: position }">
    {{ data?.msgContent?.Data?.message }}
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, NextHintCb, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    data: CommonObj;
    position: "left" | "right" | "center";
  }>(),
  {
    position: "center",
  }
);
</script>
<style lang="scss" name="" scoped>
.custom-msg {
  color: $color-text-light;
  width: 100%;
}
</style>
