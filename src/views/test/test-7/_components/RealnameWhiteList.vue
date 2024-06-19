<!-- 组件-实名白名单配置 -->
<template>
  <BaseForm v-model="model" :fields="fields" class="realname-white-list" log> </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { FormField } from "@/components/BaseFormItem";
import { CommonObj } from "@/vite-env";
const model = reactive<CommonObj>({
  list: [{ xm: "张三", sfzh: "51162119900319075X" }],
});
const fields = ref<FormField[]>([
  {
    prop: "list",
    label: "白名单列表",
    type: "addDel",
    children: [
      {
        prop: "xm",
        label: "姓名",
        labelWidth: "auto",
        required: true,
      },
      {
        prop: "sfzh",
        label: "身份证号",
        labelWidth: "auto",
        required: true,
        extra: {
          valid: "identity",
        },
      },
    ],
  },
]);
</script>
<style lang="scss" scoped></style>
