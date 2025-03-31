<!-- summary
目标：定位为复制文本。提供文本复制功能，并扩展路由跳转、自定义点击时间、同时兼顾复制文本（仅点击图标时可复制）等功能，同时自带样式。
-->
<template>
  <el-tooltip v-bind="tooltipAttrs" :disabled="isClickIconCopy || !textStr">
    <div @click="handleCopy" class="base-copy" :class="{ 'f-fs-c': +maxLine > 0, hover: textStr && !isClickIconCopy }">
      <el-tooltip v-bind="tooltipAttrs" :content="toTooltip" :disabled="!textStr || !to">
        <span @click="handleClick" class="f-1" :class="{ [`q-line-${maxLine}`]: true, link: !!to && textStr, click: textStr && !!$attrs.onClick }">
          <slot v-if="textStr">{{ textStr }}</slot>
          <template v-else>{{ defaultEmptyStr }}</template>
        </span>
      </el-tooltip>
      <el-tooltip v-bind="tooltipAttrs" :disabled="!isClickIconCopy" v-if="textStr">
        <el-icon class="f-0 ml-4 icon hover">
          <DocumentCopy />
        </el-icon>
      </el-tooltip>
    </div>
  </el-tooltip>
</template>
<script lang="ts" setup>
import { showMessage } from "@/utils";
import { RouteTo, StrNum } from "@/core/_types";
import { defaultTooltipAttrs, defaultEmptyStr } from "@/core/config";
import { DocumentCopy } from "@element-plus/icons-vue";

const tooltipAttrs = {
  ...defaultTooltipAttrs,
  content: "点击复制",
};
const router = useRouter();
const props = withDefaults(
  defineProps<{
    to?: RouteTo; // 路由跳转，等价于 router.push(to)
    stop?: boolean; // 是否阻止点击事件的冒泡
    maxLine?: StrNum; // 最多显示几行，超出文本会显示省略号
    clickIconCopy?: boolean; // 是否只当点击图标时才复制文本
    successText?: string; // 复制成功之后的提示文案
    toTooltip?: string; // 提示跳转的文案
  }>(),
  {
    maxLine: 1,
    clickIconCopy: undefined,
    successText: "复制成功",
    toTooltip: "点击跳转",
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
const textStr = computed<StrNum>(() => {
  return $slots
    .default?.()
    .map(it => it.children ?? "")
    .join("");
});
// 跳转页面或触发点击事件
function handleClick(e) {
  const { to, stop } = props;
  if (!textStr.value || !to) return;
  if (stop) e.stopPropagation();
  return router.push(to as RouteTo);
}
// 处理复制逻辑
function handleCopy(e) {
  if (!textStr.value) return;
  const { tagName, classList } = e.target.parentNode;
  const { stop, successText } = props;
  if (stop) e.stopPropagation();
  const isAtIcon = classList.contains("icon") || tagName === "svg";
  if ($attrs.onClick && !isAtIcon) return $attrs.onClick?.();
  if (isClickIconCopy.value && !isAtIcon) return;
  const input = document.createElement("input");
  input.setAttribute("value", textStr.value as string);
  document.body.appendChild(input);
  input.select();
  const copyText = document.execCommand("copy");
  if (copyText) showMessage(successText, "success");
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
