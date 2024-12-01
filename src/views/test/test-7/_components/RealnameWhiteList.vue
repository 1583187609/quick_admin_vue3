<!-- 组件-实名白名单配置 -->
<template>
  <BaseForm v-model="modelData" :fields="fields" class="realname-white-list" />
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { FormField } from "@/core/components/form/_types";
import { CommonObj } from "@/vite-env";
const modelData = reactive<CommonObj>({
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
        tpl: "identity",
        prop: "sfzh",
        label: "身份证号",
        labelWidth: "auto",
        required: true,
        quickAttrs: {},
      },
    ],
  },
]);
</script>
<style lang="scss" scoped></style>
