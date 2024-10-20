<!-- summary
  自定义渲染的表格头
 -->
<template>
  <BaseRender :data="col._label ?? col.label" />
  <QuestionPopover :popover="popover" v-if="popover" />
  <MarkIcon :class="size" v-if="isMark" />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import MarkIcon from "@/components/MarkIcon.vue";
import QuestionPopover from "@/components/QuestionPopover.vue";
import { isOptimization, propsJoinChar, defaultCommonSize } from "@/components/_utils";

const props = withDefaults(
  defineProps<{
    col: TableColAttrs;
    scope: any;
    size?: CommonSize;
    popover?: PopoverAttrs;
  }>(),
  {
    size: defaultCommonSize,
  }
);
const $emit = defineEmits(["update:colAttrs"]);

const markWidth = 20;
const isMark = computed(() => {
  const isNo = getIsNoHandle();
  if (!isNo) return false;
  const { minWidth, width } = props.col;
  const obj: TableColAttrs = {};
  if (minWidth !== undefined) {
    obj.minWidth = minWidth + markWidth;
  }
  if (width !== undefined) {
    obj.width = width + markWidth;
  }
  $emit("update:colAttrs", obj);
  return true;
});

// 该列是否标记为未联调
function getIsNoHandle() {
  if (isOptimization) return false;
  const { scope, col } = props;
  const { _self, column } = scope;
  const { type, prop } = col;
  if ((prop as string).startsWith("$") || type === "custom") return false;
  if (!_self.data?.length) return false;
  const row = _self.data[0];
  if (prop?.includes(propsJoinChar)) {
    return (prop as string).split(propsJoinChar).some(key => typeof row[key] === "undefined");
  } else if (prop?.includes(".")) {
    const keys = (prop as string).split(".");
    let data: CommonObj = row;
    for (const key of keys) {
      data = row[key];
      if (typeof data === "undefined") return true;
    }
    return false;
  }
  return row?.[prop as string] === undefined;
}
</script>
<style lang="scss" scoped>
.mark-icon {
  margin-left: 2px;
  &.large {
    margin-left: 4px;
  }
  &.default {
    margin-left: 2px;
  }
  &.small {
    margin-left: 0;
  }
}
</style>
