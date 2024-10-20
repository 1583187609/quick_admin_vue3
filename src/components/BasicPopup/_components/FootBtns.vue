<!-- 页面-简介 -->
<template>
  <div class="foot-btns">
    <el-button v-debounce.immediate="() => $emit('cancel')">取消</el-button>
    <el-button type="primary" v-debounce.immediate="() => $emit('confirm')">确认</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
// const props = withDefaults(
//   defineProps<{
//     _example_prop?: CommonObj;
//   }>(),
//   {
//     _example_prop: () => ({}),
//   }
// );
const $emit = defineEmits(["confirm", "cancel"]);
</script>
<style lang="scss" scoped></style>
