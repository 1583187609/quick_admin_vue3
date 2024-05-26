<!-- 组件-公司认证配置 -->
<template>
  <BaseForm :fields="fields" class="company-auth" log> </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField } from "@/components/BaseFormItem";
import { BtnName } from "@/components/BaseBtn";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const childrenFields: FormField[] = [
  { prop: "id", label: "ID", labelWidth: "2.5em" },
  {
    prop: "ewm",
    label: "二维码",
    labelWidth: "5em",
    attrs: {
      style: { width: "550px" },
    },
  },
];
const fields = ref<FormField[]>([
  {
    prop: "qwshy",
    label: "企微审核员",
    labelWidth: "6em",
    children: childrenFields,
  },
  {
    prop: "ddshy",
    label: "钉钉审核员",
    labelWidth: "6em",
    children: childrenFields,
  },
  {
    prop: "fsshy",
    label: "飞书审核员",
    labelWidth: "6em",
    children: childrenFields,
  },
]);
</script>
<style lang="scss" scoped>
.company-auth {
  width: 1000px;
}
</style>
