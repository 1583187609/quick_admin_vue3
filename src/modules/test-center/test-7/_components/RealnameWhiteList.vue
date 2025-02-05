<!-- 组件-实名白名单配置 -->
<template>
  <BaseForm v-model="modelData" :fields="fields" class="realname-white-list"></BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { FormField, FormFieldAttrs } from "@/core/components/form/_types";
import { CommonObj } from "@/core/_types";
const listFields: FormFieldAttrs[] = [
  {
    prop: "user_name",
    label: "姓名",
    labelWidth: "auto",
    required: true,
  },
  {
    tpl: "T_Identity",
    prop: "identity",
    label: "身份证号",
    labelWidth: "auto",
    required: true,
    quickAttrs: {},
  },
];
const modelData = reactive<CommonObj>({
  list: [{ user_name: "张三", identity: "51162119900319075X" }],
});
const fields = ref<FormField[]>([
  {
    prop: "list",
    label: "白名单列表",
    type: "BaseAddDelList",
    attrs: {
      fields: listFields,
    },
  },
]);
</script>
<style lang="scss" scoped></style>
