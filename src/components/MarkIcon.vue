<!-- 用作标识的图标 -->
<template>
  <el-tooltip :showAfter="500" :content="mark.tips" :disabled="disabled || !mark.tips">
    <el-icon class="mark-icon" :color="mark.color" v-bind="$attrs">
      <component :is="mark.icon" />
    </el-icon>
  </el-tooltip>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, useAttrs } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { WarningFilled } from "@element-plus/icons-vue";
import cssVars from "@/assets/styles/_var.module.scss";
import { defaultCommonSize, getPopoverAttrs, ThemeColorType } from "@/components/_utils";
import _ from "lodash";

export type MarkType = "noDebug";

defineOptions({
  inheritAttrs: false,
});

const { upperFirst } = _;

const $attrs = useAttrs();
const markMap = {
  noDebug: {
    tips: "未联调",
    icon: WarningFilled,
    color: cssVars.colorDanger,
  },
};

const props = withDefaults(
  defineProps<{
    type?: MarkType;
    disabled?: boolean;
  }>(),
  {
    type: "noDebug",
  }
);
const mark = markMap[props.type];
</script>
<style lang="scss" scoped>
.mark-icon {
  vertical-align: middle;
  font-size: 1.1em;
}
</style>
