<!-- 主题换肤 -->
<template>
  <!-- <div>
    <div class="skin-demo">东风快递司法局卡</div> -->
  <slot />
  <!-- </div> -->
</template>
<script lang="ts" setup>
// 主题换肤，参照：https://blog.csdn.net/gaotlantis/article/details/139931309
import { provide, reactive, watch, computed } from "vue";
import { CommonSize, ThemeColor } from "@/core/_types";
const props = withDefaults(
  defineProps<{
    theme?: ThemeColor;
    size?: CommonSize;
  }>(),
  {
    theme: "orange",
    size: "default",
  }
);
function setSkin(theme: ThemeColor = "orange", size: CommonSize = "default") {
  document.documentElement.setAttribute("theme", theme);
  document.documentElement.setAttribute("size", size);
}
setSkin(props.theme, props.size);
provide("setSkin", setSkin);
</script>
<style lang="scss">
@import "./public.scss";
@import "./size.scss";
@import "./theme.scss";
.skin-demo {
  font-size: var(--gap-two);
}
</style>
