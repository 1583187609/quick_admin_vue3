<!-- 表单组件 -->
<template>
  <BaseForm v-model="modelData" :fields="fields" @submit="handleSubmit" submitBtn="提交" />
</template>
<script lang="ts" setup>
import { CommonObj, FinallyNext } from "@/core/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";

const fields: FormFieldAttrs[] = [
  { prop: "name", label: "姓名" },
  { prop: "gender", label: "性别", type: "select", attrs: { options: "D_Gender" } },
];
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {}
);
const $emit = defineEmits(["confirm"]);
const modelData = reactive<CommonObj>(JSON.parse(JSON.stringify(props.data ?? {})));
function handleSubmit(params: CommonObj, next: FinallyNext) {
  next(); // 执行了提示 提交成功、关闭弹窗逻辑
  $emit("confirm", params);
}
</script>
<style lang="scss" scoped></style>
