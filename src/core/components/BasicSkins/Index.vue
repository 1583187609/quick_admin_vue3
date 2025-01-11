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
import { LayoutSize, ThemeName } from "@/core/_types";
import { defaultSet } from "@/store/modules/set";
const props = withDefaults(
  defineProps<{
    theme?: ThemeName;
    size?: LayoutSize;
  }>(),
  {}
);
const elementPlusVar = getComputedStyle(document.documentElement).getPropertyValue("--el-color-primary").trim();
console.log(elementPlusVar, "elementPlusVar-----------");
function setSkin(theme: ThemeName = defaultSet.theme.name, size: LayoutSize = defaultSet.layout.size) {
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
