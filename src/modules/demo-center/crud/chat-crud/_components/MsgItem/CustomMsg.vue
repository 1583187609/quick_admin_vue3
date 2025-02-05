<!-- 页面-简介 -->
<template>
  <div class="custom-msg" :style="{ textAlign: position }">
    {{ data?.msgContent?.Data?.message }}
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, NextHintCb, StrNum } from "@/core/_types";
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
<style lang="scss" scoped>
.custom-msg {
  color: $color-text-light;
  width: 100%;
}
</style>
