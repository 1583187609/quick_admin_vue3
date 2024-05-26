<!-- 页面-简介 -->
<template>
  <BaseForm style="width: 400px" :fields="fields" :fetch="PostUserList" :fetchSuccess="refreshList"></BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { PostUserList } from "@/api-mock";
import { FormFieldAttrs } from "@/components/BaseFormItem";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    refreshList: FinallyNext;
  }>(),
  {}
);
const fields: FormFieldAttrs[] = [{ prop: "", label: "分组名称", required: true }];
</script>
<style lang="scss" scoped></style>
