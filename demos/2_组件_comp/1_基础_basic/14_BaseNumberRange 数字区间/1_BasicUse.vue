<template>
  <div class="part">
    <div>基础用法：</div>
    <BaseNumberRange v-model="modelVals1" />
  </div>
  <div class="part">
    <div>设置默认值、值范围：</div>
    <BaseNumberRange v-model="modelVals2" :min="0" :max="100" />
  </div>
  <div class="part">
    <div>设置默认值、值范围，且默认值超出了值范围：</div>
    <BaseNumberRange v-model="modelVals3" :min="0" :max="100" />
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { StrNum } from "@/core/_types";
const modelVals1 = reactive<[StrNum?, StrNum?]>([]);
const modelVals2 = reactive<[StrNum?, StrNum?]>([1, 2]);
const modelVals3 = reactive<[StrNum?, StrNum?]>([-10, 1001]);
</script>
<style lang="scss" scoped>
.part {
  &:not(:last-child) {
    margin-bottom: $gap;
  }
}
</style>
