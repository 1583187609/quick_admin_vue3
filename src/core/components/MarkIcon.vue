<!-- 用作标识的图标 -->
<template>
  <el-tooltip :content="mark.tips" :disabled="disabled || !mark.tips" v-bind="defaultTooltipAttrs">
    <el-icon class="mark-icon" :color="mark.color" v-bind="$attrs">
      <component :is="mark.icon" />
    </el-icon>
  </el-tooltip>
</template>
<script lang="ts" setup>
import { useAttrs } from "vue";
import { WarningFilled } from "@element-plus/icons-vue";
import { cssVars } from "@/utils";
import { defaultTooltipAttrs } from "@/core/utils";
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
