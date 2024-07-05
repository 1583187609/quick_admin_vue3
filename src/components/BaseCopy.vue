<!-- 页面-复制文本组件 -->
<template>
  <div @click.stop="handleClick" class="base-copy" :class="{ 'f-fs-c': Number(line) > 0 }">
    <span :class="`line-${line}`">
      <slot>{{ text || "-" }}</slot>
    </span>
    <template v-if="text">
      <el-tooltip :show-after="500" content="点击复制">
        <BaseIcon class="f-0 ml-4 icon" name="DocumentCopy" />
      </el-tooltip>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { StrNum } from "@/vite-env";
import { showMessage } from "./_utils";
const props = withDefaults(
  defineProps<{
    text?: StrNum;
    line?: StrNum; //最多显示几行，超出文本会显示省略号
  }>(),
  {
    line: 1,
  }
);
function handleClick() {
  const { text = "" } = props;
  const input = document.createElement("input");
  input.setAttribute("value", text as string);
  document.body.appendChild(input);
  input.select();
  const copyText = document.execCommand("copy");
  if (copyText) {
    showMessage("复制成功！", "success");
  }
  document.body.removeChild(input);
}
</script>
<style lang="scss" scoped>
.base-copy {
  cursor: pointer;
  display: inline-flex;
  &:hover {
    color: $color-primary;
  }
  // .icon {
  //   vertical-align: bottom;
  //   line-height: inherit;
  // }
}
</style>
