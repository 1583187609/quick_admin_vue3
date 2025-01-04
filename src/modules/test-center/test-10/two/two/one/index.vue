<!-- 页面-简介 -->
<template>
  <div class="q-page-view">
    <!-- <el-input v-model="modelVal" @change="handleChange" /> -->
    <el-switch v-model="modelVal" v-bind="supportSwitchAttrs" />
    <el-select v-model="modelVal" @change="handleChange">
      <el-option v-for="(item, ind) in 2" :key="ind" :label="ind" :value="ind"></el-option>
    </el-select>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
const supportSwitchAttrs: CommonObj = {
  activeValue: 1,
  inactiveValue: 0,
  inlinePrompt: true,
  activeText: "支持",
  inactiveText: "不支持",
  style: "width: 5em",
};
const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
const modelVal = ref(1);
function handleChange(val) {
  console.log(val, "change-------------");
}
setTimeout(() => {
  modelVal.value = 2;
}, 3000);
</script>
<style lang="scss" scoped></style>
