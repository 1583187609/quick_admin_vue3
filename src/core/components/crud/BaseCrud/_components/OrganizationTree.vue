<!-- 页面-人员机构树 -->
<template>
  <div class="organization-tree">organization-tree</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
</script>
<style lang="scss" scoped>
.organization-tree {
  width: 200px;
  border-radius: $radius-heavy;
  background: #fff;
  @include shadow-main();
}
</style>
