<!-- 页面-简介 -->
<template>
  <div class="example-vue">
    <el-radio-group v-model="valObj.type">
      <el-radio :disabled="opt.disabled" :value="opt.value" v-for="(opt, ind) in options" :key="ind">
        {{ opt.label }}
      </el-radio>
    </el-radio-group>
    <div class="f-fs-c">
      <span class="f-0 mr-h">扣款基数</span>
      <el-input-number style="width: 250px" v-model="valObj.val" placeholder="请输入扣款基数" :min="0" />
      <el-button
        @click="openPopup('基数配置', { component: BaseNumCfg, attrs: {} })"
        class="ml-h"
        type="primary"
        v-if="valObj.type === 2"
        >配置</el-button
      >
    </div>
    <div v-if="stagework && valObj.type === 2">
      <el-checkbox v-model="valObj.qyfdjx"> 启用分段计薪（适用于分段计薪） </el-checkbox>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, inject } from "vue";
import BaseNumCfg from "./BaseNumCfg.vue";
import { CommonObj, FinallyNext, StrNum, OptionItem } from "@/vite-env";
const openPopup = inject<any>("openPopup");
const options: OptionItem[] = [
  { label: "固定基数", value: 1 },
  { label: "引用基数", value: 2 },
];
const props = withDefaults(
  defineProps<{
    stagework?: boolean;
    modelValue?: CommonObj;
  }>(),
  {
    modelValue: () => ({}),
  }
);
const emits = defineEmits(["update:modelValue"]);
// const valObj = computed({
//   get() {
//     return props.modelValue;
//   },
//   set(val: any) {
//     emits("update:modelValue", val);
//   },
// });
const valObj = reactive({
  type: 1,
  val: 0,
});
</script>
<style lang="scss" scoped></style>
