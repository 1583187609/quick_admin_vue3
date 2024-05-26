<template>
  <el-empty class="base-empty" style="padding: 16px" :description="tips" :image-size="Number(size)">
    <slot></slot>
  </el-empty>
</template>
<script lang="ts" setup>
import { toCssVal } from "@/utils";
import { StrNum } from "@/vite-env";
import { ref, reactive } from "vue";
const props = withDefaults(
  defineProps<{
    tips?: string;
    size?: StrNum;
  }>(),
  {
    tips: "空空如也~",
    size: 50,
  }
);
</script>
<style lang="scss">
.base-empty {
  // --el-empty-padding: $gap;
  margin: 0 auto;
}
// :deep(.el-empty) {
//   .el-empty__description {
//     p {
//       color: red;
//       font-size: 12px;
//       margin-top: $gap-half;
//       line-height: 1.4;
//     }
//   }
// }
// :deep(.el-empty__description) {
//   p {
//     font-size: 12px;
//     margin-top: $gap-half;
//     line-height: 1.4;
//   }
// }
// :deep(.el-empty__description) {
//   margin-top: 0 !important;
//   p {
//     color: red;
//   }
// }
// :deep(.el-table__empty-text) {
//   line-height: 1em;
//   background: red;
// }
</style>
