<!-- 参考博客：https://juejin.cn/post/7041489184938262564 -->
<template>
  <input placeholder="请输入内容" @blur="onBlur" @change="onChange" type="text" :value="modelValue" />
</template>
<script lang="ts" setup>
import { useFormItem } from "element-plus";
const { formItem } = useFormItem();
withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: "",
  }
);
const emits = defineEmits(["update:modelValue"]);
function onBlur() {
  formItem?.validate("blur");
}
function onChange(val: Event) {
  const inputEle: HTMLInputElement = val.target as HTMLInputElement;
  emits("update:modelValue", inputEle.value);
}
</script>

<style lang="scss" scoped></style>
