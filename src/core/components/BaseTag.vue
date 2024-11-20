<!-- summary
目标：对el-tag进行封装，使得可以处理字典文件，并包含样式，然后可应用于表单、表格中，并保证样式风格统一。
-->
<template>
  <span class="base-tag span m-2" :class="tag?.attrs?.type ?? 'main'" v-bind="tag?.attrs" v-if="pureText || !tag">
    <slot :tag="tag">
      {{ tagText }}
      <template v-if="count">：{{ count }}</template>
    </slot>
  </span>
  <el-tag class="base-tag m-2" v-bind="tag?.attrs" v-else>
    <slot :tag="tag">
      {{ tagText }}
      <template v-if="count">：{{ count }}</template>
    </slot>
  </el-tag>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { DictName } from "@/dict/_types";
import { ClassType, CommonObj, StrNum, StyleType } from "@/vite-env";
import { emptyStr, emptyVals } from "@/core/utils";
import type { TagProps } from "element-plus";
import { useDict } from "@/hooks";

export type TagType = TagProps["type"];
export type TagSize = TagProps["size"];
export type TagEffect = TagProps["effect"];

export interface TagAttrs {
  color?: string;
  type?: TagType;
  style?: StyleType;
  class?: ClassType;
  effect?: TagEffect;
}

const { getMap } = useDict();
const props = withDefaults(
  defineProps<{
    name?: DictName;
    value?: StrNum;
    pureText?: boolean;
    count?: StrNum;
    empty?: any;
  }>(),
  {
    name: "EnableStatus",
    empty: emptyStr,
  }
);
const tag = computed(() => {
  const { name, value } = props;
  if (emptyVals.includes(value as string)) return null;
  const currMap = getMap(name);
  // console.log(currMap, "currMap----------");
  const val = currMap?.[value as string];
  const t = typeof val;
  if (t === "string") return { text: val };
  if (t === "undefined") return { text: value };
  return val;
});
const tagText = computed(() => {
  const { empty, value } = props;
  const { text = value } = tag.value ?? {};
  return emptyVals.includes(text) ? empty : text;
});
</script>
<style lang="scss" scoped>
.base-tag {
  &.span {
    font-size: 1em;
  }
  &.main {
    color: $color-text-main;
  }
  &.success {
    color: $color-success;
  }
  &.info {
    color: $color-info;
  }
  &.danger {
    color: $color-danger;
  }
  &.warning {
    color: $color-warning;
  }
}
</style>
