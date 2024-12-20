<!-- 页面-简介 -->
<template>
  <FormItem v-model="modelData.eleType" elType="radio-group" :subOptions="beforeEleTypeOpts" type="button" />
  <FormItem elType="input" placeholder="请输入文本内容" v-if="modelData.eleType === 1" />
  <FormItem elType="select" :subOptions="systemComponentOpts" placeholder="请选择系统组件" v-if="modelData.eleType === 2" />
  <div style="width: 100%" v-else-if="modelData.eleType === 3">暂未处理</div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import FormItem from "@/core/components/form/_components/FormItem/Index.vue";
type EleType = 1 | 2 | 3; //"text" | "systemComponent" | "customComponent";
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj;
  }>(),
  {
    modelValue: () => reactive({ eleType: 1 }),
  }
);
const $emit = defineEmits(["update:modelValue"]);
const modelData = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});
const beforeEleTypeOpts = [
  { label: "文本内容", value: 1 },
  { label: "系统组件", value: 2 },
  { label: "自定义组件", value: 3 },
];
const systemComponentOpts = [
  { label: "文本内容", value: 1 },
  { label: "系统组件", value: 2 },
  { label: "自定义组件", value: 3 },
];
</script>
<style lang="scss" scoped></style>
