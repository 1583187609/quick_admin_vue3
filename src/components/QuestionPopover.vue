<!-- 疑问浮框 -->
<template>
  <el-popover v-bind="popoverAttrs" v-if="popoverAttrs">
    <BaseRender :data="(popoverAttrs as PopoverSlots).slots?.default" v-if="(popoverAttrs as PopoverSlots).slots?.default" />
    <template #reference>
      <el-icon :color="cssVars[`color${upperFirst(type)}`]" class="icon f-0" :class="[iconClass, size]">
        <QuestionFilled />
      </el-icon>
    </template>
  </el-popover>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { CommonSize, PopoverAttrs, PopoverSlots } from "@/components/_types";
import { defaultCommonSize, getPopoverAttrs, ThemeColorType } from "@/components/_utils";
import cssVars from "@/assets/styles/_var.module.scss";
import { QuestionFilled } from "@element-plus/icons-vue";
import _ from "lodash";

const { upperFirst } = _;
const props = withDefaults(
  defineProps<{
    popover?: PopoverAttrs | PopoverSlots | string;
    type?: ThemeColorType;
    iconClass?: string;
    size?: CommonSize;
  }>(),
  {
    type: "info",
    size: defaultCommonSize,
  }
);
const popoverAttrs = computed(() => getPopoverAttrs(props.popover));
</script>
<style lang="scss" scoped>
.icon {
  vertical-align: middle;
  font-size: 1.1em;
  margin-left: 2px;
  &.large {
    margin-left: 4px;
    // margin-top: 12px;
  }
  &.default {
    margin-left: 2px;
    // margin-top: 9px;
  }
  &.small {
    margin-left: 0;
    // margin-top: 7px;
  }
}
</style>
