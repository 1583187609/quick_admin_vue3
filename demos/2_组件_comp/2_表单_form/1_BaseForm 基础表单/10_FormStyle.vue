<!-- summary 表单样式
styleType
pureText
-->
<template>
  <BaseForm v-model="modelData" :fields="fields" :fetch="PostMockCommon">
    <!-- <template #zdy></template> -->
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { PostMockCommon, GetMockCascader } from "@/api-mock";
import { CommonObj, OptionItem } from "@/core/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";

const modelData = reactive<CommonObj>({
  age: 12,
});
const regionOpts = ref<OptionItem[]>([]);
const fields: FormFieldAttrs[] = [{ prop: "name", label: "姓名", required: true }];
</script>
<style lang="scss" scoped></style>
