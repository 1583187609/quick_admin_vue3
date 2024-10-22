<!-- 复制文本 -->
<template>
  <el-tooltip v-bind="tooltipAttrs" :disabled="clickIconCopy">
    <div @click="handleCopy" class="base-copy" :class="{ 'f-fs-c': Number(line) > 0, hover: textStr && !clickIconCopy }">
      <el-tooltip v-bind="tooltipAttrs" content="点击跳转" :disabled="!clickIconCopy && !to">
        <span @click="handleClick" class="f-1" :class="{ [`line-${line}`]: true, link: clickIconCopy }">
          <slot>{{ textStr || "-" }}</slot>
        </span>
      </el-tooltip>
      <template v-if="textStr">
        <el-tooltip v-bind="tooltipAttrs" :disabled="!clickIconCopy">
          <el-icon class="f-0 ml-4 icon hover">
            <DocumentCopy />
          </el-icon>
        </el-tooltip>
      </template>
    </div>
  </el-tooltip>
</template>
<script lang="ts" setup>
import { CommonObj, RouteTo, StrNum } from "@/vite-env";
import { showMessage, defaultTooltipAttrs, typeOf } from "./_utils";
import { useSlots, computed } from "vue";
import { useRouter } from "vue-router";
import { DocumentCopy } from "@element-plus/icons-vue";

const tooltipAttrs = {
  ...defaultTooltipAttrs,
  content: "点击复制",
};
const $slots = useSlots();
const router = useRouter();
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    to?: RouteTo | ((data: CommonObj) => RouteTo);
    text?: StrNum;
    line?: StrNum; //最多显示几行，超出文本会显示省略号
    clickIconCopy?: boolean; //是否只当点击图标时才复制文本
    stop?: boolean; //是否阻止点击事件的冒泡
  }>(),
  {
    line: 1,
    // 暂时没有实现，检测到绑定了onClick事件后，就将clickIconCopy设为true
    clickIconCopy: _props => !!_props.to,
  }
);
const $emit = defineEmits(["click"]);
const textStr = computed<StrNum>(() => props.text ?? $slots.default?.()[0]?.children ?? "");
// 跳转页面或触发点击事件
function handleClick(e) {
  const { to, data } = props;
  if (to) {
    if (typeOf(to) === "Function") return router.push((to as Function)(data));
    return router.push(to as RouteTo);
  }
  $emit("click", data);
}
// 处理点击事件
function handleCopy(e) {
  const { tagName, classList } = e.target;
  const { clickIconCopy, stop } = props;
  if (!textStr.value) return;
  if (clickIconCopy && tagName !== "svg" && !classList.contains("icon")) return;
  if (stop) e.stopPropagation();
  const input = document.createElement("input");
  input.setAttribute("value", textStr.value as string);
  document.body.appendChild(input);
  input.select();
  const copyText = document.execCommand("copy");
  if (copyText) showMessage("复制成功！", "success");
  document.body.removeChild(input);
}
</script>
<style lang="scss" scoped>
@mixin hover() {
  &:hover {
    color: $color-primary;
  }
}
.base-copy {
  cursor: pointer;
  display: inline-flex;
  &.hover {
    @include hover();
  }
  .link {
    text-decoration: underline;
    @include hover();
  }
  .icon {
    @include hover();
  }
}
</style>
