<!-- summary Tag标签
  el-tag标签的升级版，可以解析字典映射、纯文本显示等
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
import { emptyStr, emptyVals } from "@/core/_utils";
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
    empty?: any;
    count?: StrNum;
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
  if (typeof val === "string") return { text: val };
  if (typeof val === "undefined") return { text: value };
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
