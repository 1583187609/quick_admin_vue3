<!-- 下载设置 -->
<template>
  <BaseForm v-model="modelData" :fields="fields" @sbumit="handleSubmit"></BaseForm>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { reactive } from "vue";

// const props = withDefaults(
//   defineProps<{
//     exampleProp?: CommonObj;
//   }>(),
//   {
//     exampleProp: () => ({}),
//   }
// );
const $emit = defineEmits(["confirm"]);
const modelData = reactive<CommonObj>({ path: "" });
const fields: FormFieldAttrs[] = [{ prop: "path", label: "存放路径" }];
function handleSubmit() {
  $emit("confirm", modelData);
}
</script>
<style lang="scss" scoped></style>
