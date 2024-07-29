<!-- 页面-简介 -->
<template>
  <el-radio-group class="input-ways" v-model="inpType">
    <el-radio :label="opt.value" v-for="(opt, ind) in newOpts" :key="ind" :disabled="opt.disabled">
      {{ opt.label }}
    </el-radio>
  </el-radio-group>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum, OptionItem } from "@/vite-env";
export type InputType = 0 | 1 | 2; //输入方式
const options: OptionItem[] = [
  { label: "JSON", value: 0 },
  { label: "动态添加", value: 1 },
  { label: "请求获取", value: 2 },
];
const props = withDefaults(
  defineProps<{
    modelValue?: InputType;
    excepts?: InputType[];
  }>(),
  {
    modelValue: 0,
  }
);
const newOpts = computed(() => {
  const { excepts } = props;
  return [
    { label: "JSON", value: 0 },
    { label: "动态添加", value: 1 },
    { label: "请求获取", value: 2, disabled: true },
  ].filter(it => (excepts ? excepts.includes(opt.value) : true));
});
const emits = defineEmits(["update:modelValue"]);
//输入类型
const inpType = computed({
  get() {
    return props.modelValue;
  },
  set(val: InputType) {
    emits("update:modelValue", val);
  },
});
</script>
<style lang="scss" scoped></style>
