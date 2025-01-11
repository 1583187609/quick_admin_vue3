<!-- 疑问浮框 -->
<template>
  <el-popover v-bind="popoverAttrs" v-if="popoverAttrs">
    <BaseRender :renderData="(popoverAttrs as PopoverSlots).slots?.default" v-if="(popoverAttrs as PopoverSlots).slots?.default" />
    <template #reference>
      <el-icon :color="cssVars[`color${upperFirst(type)}`]" class="icon f-0" :class="[newSize]" v-bind="$attrs">
        <QuestionFilled />
      </el-icon>
    </template>
  </el-popover>
</template>
<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import { CommonSize, PopoverAttrs, PopoverSlots } from "@/core/_types";
import { defaultCommonSize, getPopoverAttrs, ThemeColorType } from "@/core/utils";
import cssVars from "@/assets/styles/_var.module.scss";
import { QuestionFilled } from "@element-plus/icons-vue";
import _ from "lodash";

defineOptions({
  inheritAttrs: false,
});

const { upperFirst } = _;
const $attrs = useAttrs();
const props = withDefaults(
  defineProps<{
    popover?: PopoverAttrs | PopoverSlots | string;
    type?: ThemeColorType;
    size?: CommonSize;
  }>(),
  {
    type: "info",
  }
);
const popoverAttrs = computed(() => getPopoverAttrs(props.popover));
const newSize = computed(() => props.size ?? defaultCommonSize);
</script>
<style lang="scss" scoped>
.icon {
  vertical-align: middle;
  font-size: 1.1em;
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
