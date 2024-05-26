<!-- 页面-简介 -->
<template>
  <BaseForm
    style="width: 400px"
    v-model="model"
    :fields="fields"
    :fetch="PostUserList"
    :fetchSuccess="refreshList"
    :pureText="isView"
  >
    <template #qzfs="{ form }">
      <GetValWays v-model="form.qzfs" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { PostUserList } from "@/api-mock";
import { FormFieldAttrs } from "@/components/BaseFormItem";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import GetValWays from "./_components/GetValWays.vue";
const props = withDefaults(
  defineProps<{
    data: CommonObj;
    refreshList: FinallyNext;
    isView?: boolean;
  }>(),
  {}
);
let model = reactive({ bl: 2, qzfs: { type: 1, val: "" } });
const fields: FormFieldAttrs[] = [
  { prop: "mc", label: "名称", required: true },
  {
    prop: "qzsy",
    label: "强制使用",
    type: "checkbox",
    tips: "选中后该项将出现在每个模板中",
  },
  {
    prop: "szsx",
    label: "设置属性",
    required: true,
    type: "select",
    options: [],
    attrs: { disabled: true },
  },
  {
    prop: "szlx",
    label: "设置类型",
    required: true,
    type: "select",
    options: [],
    attrs: { disabled: true },
  },
  {
    prop: "jwgz",
    label: "进位规则",
    required: true,
    type: "select",
    options: [],
    attrs: { disabled: true },
  },
  {
    prop: "bl",
    label: "保留",
    required: true,
    type: "input-number",
    attrs: {
      min: 0,
      max: 10,
    },
    after: "位小数",
  },
  {
    prop: "qzfs",
    label: "取值方式",
    required: true,
    type: "custom",
  },
  { prop: "bz", label: "备注" },
];
</script>
<style lang="scss" scoped></style>
