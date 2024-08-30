<!-- 复制文本 -->
<!-- @click="clickIconCopy ? undefined : handleClick" -->
<!-- <DocumentCopy class="f-0 ml-4 f-0" size="1em" /> -->
<template>
  <div @click="handleClick" class="base-copy" :class="{ 'f-fs-c': Number(line) > 0, hover: textStr && !clickIconCopy }">
    <span :class="`line-${line} f-1`">
      <slot>{{ textStr || "-" }}</slot>
    </span>
    <template v-if="textStr">
      <el-tooltip :show-after="500" content="点击复制">
        <BaseIcon class="f-0 ml-4 icon hover" name="DocumentCopy" />
      </el-tooltip>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { StrNum } from "@/vite-env";
import { showMessage } from "./_utils";
import { DocumentCopy } from "@element-plus/icons-vue";
import { useSlots, computed } from "vue";

const $slots = useSlots();

const props = withDefaults(
  defineProps<{
    text?: StrNum;
    line?: StrNum; //最多显示几行，超出文本会显示省略号
    clickIconCopy?: boolean; //是否只当点击图标时才复制文本
    stop?: boolean; //是否阻止点击事件的冒泡
  }>(),
  {
    line: 1,
  }
);
const textStr = computed<StrNum>(() => props.text ?? $slots.default?.()[0]?.children ?? "");
function handleClick(e) {
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
  .icon {
    // font-size: 1em;
    //vertical-align: bottom;
    //line-height: inherit;
    @include hover();
  }
}
</style>
