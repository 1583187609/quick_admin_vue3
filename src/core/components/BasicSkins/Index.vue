<!-- 主题换肤 -->
<template>
  <slot />
</template>
<script lang="ts" setup>
// 主题换肤，参照：https://blog.csdn.net/gaotlantis/article/details/139931309
import { provide } from "vue";
import { CommonSize, ThemeName } from "@/core/_types";
import { defaultSet } from "@/store/modules/set";
const props = withDefaults(
  defineProps<{
    theme?: ThemeName;
    size?: CommonSize;
  }>(),
  {}
);
// const elementPlusVar = getComputedStyle(document.documentElement).getPropertyValue("--el-color-primary").trim();
// console.log(elementPlusVar, "elementPlusVar-----------");
function setSkin(theme: ThemeName = defaultSet.theme.name, size: CommonSize = defaultSet.layout.size) {
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
@import "./element.scss";
.skin-demo {
  font-size: var(--gap-two);
}
</style>
