<!-- 组件 - 节假日比例 -->
<template>
  <div class="f-fs-c item" v-for="(item, ind) in list" :key="ind">
    <el-select v-model="item.type">
      <el-option v-bind="opt" v-for="(opt, i) in options" :key="i"></el-option>
    </el-select>
    <el-input-number v-model="item.val" class="ml-h" placeholder="比例" :min="0" />
  </div>
  <el-button @click="list.push({})" type="primary">添加节假日类型</el-button>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, inject } from "vue";
import BaseNumCfg from "./BaseNumCfg.vue";
import { CommonObj, FinallyNext, StrNum, OptionItem } from "@/vite-env";
const openPopup = inject<any>("openPopup");
const options: OptionItem[] = [
  { label: "普通", value: 1 },
  { label: "年假", value: 2 },
];
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj;
  }>(),
  {
    modelValue: () => ({}),
  }
);
const emits = defineEmits(["update:modelValue"]);
const list = reactive<CommonObj[]>([
  {
    type: 1,
    val: 110,
  },
  {
    type: 2,
    val: 120,
  },
]);
</script>
<style lang="scss" scoped>
.item {
  width: 100%;
  margin-bottom: $gap-qtr;
}
</style>
