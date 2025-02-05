<!-- summary
目标：统一空状态组件
-->
<template>
  <el-empty class="base-empty" style="padding: 16px" :description="description" :image-size="+size">
    <slot />
  </el-empty>
</template>
<script lang="ts" setup>
import { StrNum } from "@/core/_types";
const props = withDefaults(
  defineProps<{
    description?: string;
    size?: StrNum;
  }>(),
  {
    description: "空空如也~",
    size: 50,
  }
);
</script>
<style lang="scss">
.base-empty {
  margin: 0 auto;
  .el-empty__description {
    margin-top: 0;
    line-height: 2;
  }
}
</style>
