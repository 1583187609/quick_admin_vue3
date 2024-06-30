<!-- 页面-简介 -->
<template>
  <span class="base-tag span m-2" :class="tag ? tag?.attrs?.type : 'main'" v-bind="tag?.attrs" v-if="pureText || !tag">
    <slot :tag="tag">{{ tag?.text || empty }}</slot>
  </span>
  <el-tag class="base-tag m-2" v-bind="tag?.attrs" v-else>
    <slot :tag="tag"
      >{{ tag?.text || empty }}<template v-if="count">：{{ count }}</template></slot
    >
  </el-tag>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { DictName } from "@/dict";
import { CommonObj, StrNum } from "@/vite-env";
import { emptyVals } from "@/utils";
import type { TagProps } from "element-plus";
import { useDictMap } from "@/hooks";
export type BaseDictType = "tag" | "text";
export type TagType = TagProps["type"];
export type TagEffect = TagProps["effect"];
const { getMap } = useDictMap();
const props = withDefaults(
  defineProps<{
    name?: DictName;
    value?: StrNum;
    codeMap?: CommonObj;
    pureText?: boolean;
    empty?: any;
    count?: StrNum;
  }>(),
  {
    name: "EnableStatus",
    empty: "-",
  }
);
const tag = computed(() => {
  const { name, value, codeMap } = props;
  if (emptyVals.includes(value as string)) return null;
  let currMap: CommonObj = {};
  currMap = getMap(name, codeMap);
  return currMap[value as string] || {};
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
