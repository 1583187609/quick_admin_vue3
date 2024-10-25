<template>
  <el-icon class="base-icon" :size="size">
    <component :is="Icons[name] ?? Icons[defaultIconName]" />
  </el-icon>
</template>

<script lang="ts" setup>
import * as Icons from "@element-plus/icons-vue";
import { defaultIconName } from "@/core/_utils";
import { StrNum } from "./_types";

export type IconNames = keyof typeof Icons;

const props = withDefaults(
  defineProps<{
    name?: IconNames;
    size?: StrNum;
  }>(),
  {
    name: defaultIconName,
    size: "1em",
  }
);
</script>
