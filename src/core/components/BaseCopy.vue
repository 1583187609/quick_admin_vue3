<!-- summary
目标：定位为复制文本。提供文本复制功能，并扩展路由跳转、自定义点击时间、同时兼顾复制文本（仅点击图标时可复制）等功能，同时自带样式。
-->
<template>
  <el-tooltip v-bind="tooltipAttrs" :disabled="isClickIconCopy">
    <div @click="handleCopy" class="base-copy" :class="{ 'f-fs-c': Number(line) > 0, hover: textStr && !isClickIconCopy }">
      <el-tooltip v-bind="tooltipAttrs" content="点击跳转" :disabled="!textStr || !to">
        <span @click="handleClick" class="f-1" :class="{ [`line-${line}`]: true, link: !!to && textStr, click: textStr && !!$attrs.onClick }">
          <slot>{{ textStr || emptyStr }}</slot>
        </span>
      </el-tooltip>
      <template v-if="textStr">
        <el-tooltip v-bind="tooltipAttrs" :disabled="!isClickIconCopy">
          <el-icon class="f-0 ml-4 icon hover">
            <DocumentCopy />
          </el-icon>
        </el-tooltip>
      </template>
    </div>
  </el-tooltip>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { CommonObj, RouteTo, StrNum } from "@/core/_types";
import { showMessage, defaultTooltipAttrs, typeOf, emptyStr } from "@/utils";
import { DocumentCopy } from "@element-plus/icons-vue";
import { useAttrs } from "vue";

const tooltipAttrs = {
  ...defaultTooltipAttrs,
  content: "点击复制",
};
const router = useRouter();
const props = withDefaults(
  defineProps<{
    to?: RouteTo | ((data: CommonObj) => RouteTo);
    data?: CommonObj;
    text?: StrNum;
    line?: StrNum; // 最多显示几行，超出文本会显示省略号
    stop?: boolean; // 是否阻止点击事件的冒泡
    clickIconCopy?: boolean; // 是否只当点击图标时才复制文本
    successTips?: string;
  }>(),
  {
    line: 1,
    clickIconCopy: undefined,
    successTips: "复制成功！",
  }
);

const $slots = defineSlots<{
  default?: () => any; // 默认插槽
}>();
const $attrs = useAttrs();
const isClickIconCopy = computed(() => {
  const { onClick } = $attrs;
  const { to, clickIconCopy = !!to || !!onClick } = props;
  return clickIconCopy;
});
const textStr = computed<StrNum>(() => props.text ?? $slots.default?.()[0]?.children ?? "");
// 跳转页面或触发点击事件
function handleClick(e) {
  const { to, data } = props;
  if (!textStr.value || !to) return;
  e.stopPropagation();
  if (typeOf(to) === "Function") return router.push((to as Function)(data));
  return router.push(to as RouteTo);
}
// 处理点击事件
function handleCopy(e) {
  if (!textStr.value) return;
  const { tagName, classList } = e.target.parentNode;
  const { stop, successTips } = props;
  if (stop) e.stopPropagation();
  const isAtIcon = classList.contains("icon") || tagName === "svg";
  if ($attrs.onClick && !isAtIcon) return $attrs.onClick?.();
  if (isClickIconCopy.value && !isAtIcon) return;
  const input = document.createElement("input");
  input.setAttribute("value", textStr.value as string);
  document.body.appendChild(input);
  input.select();
  const copyText = document.execCommand("copy");
  if (copyText) showMessage(successTips, "success");
  document.body.removeChild(input);
}
</script>
<style lang="scss" scoped>
@mixin hover() {
  cursor: pointer;
  &:hover {
    color: $color-primary;
  }
}
.base-copy {
  display: inline-flex;
  &.hover {
    @include hover();
  }
  .link {
    text-decoration: underline;
    @include hover();
  }
  .click {
    @include hover();
  }
  .icon {
    @include hover();
  }
}
</style>
