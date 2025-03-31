<!-- summary
目标：占位，方便快速开发。
-->
<template>
  <el-icon class="base-icon" @click="handleClick" :data-pointer="!!to" :size="size">
    <component :is="Icons[name] ?? Icons[defaultIconName]" />
  </el-icon>
</template>

<script lang="ts" setup>
import * as Icons from "@element-plus/icons-vue";
import { defaultIconName } from "@/core/config";
import { RouteTo, StrNum } from "@/core/_types";
import { useRouter } from "vue-router";

export type IconNames = keyof typeof Icons;

const router = useRouter();
const props = withDefaults(
  defineProps<{
    name?: IconNames;
    size?: StrNum;
    to?: RouteTo;
    disabled?: boolean;
  }>(),
  {
    name: defaultIconName,
    size: "1em",
  }
);
const $emit = defineEmits(["click"]);
// 跳转页面或触发点击事件
function handleClick(e: Event) {
  const { to, disabled } = props;
  if (disabled) return;
  if (to) return router.push(to as RouteTo);
  $emit("click", e);
}
</script>
<style lang="scss" scope>
.base-icon {
  &[data-pointer="true"] {
    cursor: pointer;
    &:hover {
      color: $color-primary;
    }
  }
}
</style>
