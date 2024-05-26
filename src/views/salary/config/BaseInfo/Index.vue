<!-- 页面-简介 -->
<template>
  <BaseForm :fields="fields" submitText="下一步">
    <template #symbcy="{ form }">
      <SearchTplUserList />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormFieldAttrs } from "@/components/BaseFormItem";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import SearchTplUserList from "./SearchTplUserList.vue";
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const fields = computed<FormFieldAttrs>(() => {
  return [
    { prop: "mbmc", label: "模板名称", required: true },
    { prop: "symbcy", label: "适用模板成员", required: true, type: "custom" },
  ];
});
</script>
<style lang="scss" scoped></style>
