<!-- 用作标识的图标 -->
<template>
  <el-tooltip :showAfter="500" :content="mark.tips" :disabled="disabled || !mark.tips">
    <el-icon class="mark-icon" :size="size" :color="mark.color">
      <component :is="mark.icon" />
    </el-icon>
  </el-tooltip>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { WarningFilled } from "@element-plus/icons-vue";
import cssVars from "@/assets/styles/_var.module.scss";
import { defaultCommonSize, getPopoverAttrs, ThemeColorType } from "@/components/_utils";
import _ from "lodash";

const { upperFirst } = _;

export type MarkType = "noDebug";

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
    size?: StrNum;
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
