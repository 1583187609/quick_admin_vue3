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
const fields: FormFieldAttrs[] = [{ prop: "", label: "移动至分组", required: true, type: "select" }];
</script>
<style lang="scss" scoped></style>
