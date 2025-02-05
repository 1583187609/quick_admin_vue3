<!-- 组件-公司认证配置 -->
<template>
  <BaseForm v-model="modelData" :fields="fields" class="company-auth"></BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { CommonObj } from "@/core/_types";

const addDelChildrenFields: FormFieldAttrs[] = [
  { prop: "id", label: "ID" },
  {
    prop: "qrcode",
    label: "二维码",
    attrs: {
      style: { width: "550px" },
    },
  },
];
const modelData = reactive<CommonObj>({});
const fields = ref<FormFieldAttrs[]>([
  {
    prop: "enterprise_we_chat",
    label: "企微审核员",
    labelWidth: "6em",
    type: "BaseAddDelList",
    attrs: {
      fields: addDelChildrenFields,
    },
  },
  {
    prop: "ding_ding",
    label: "钉钉审核员",
    labelWidth: "6em",
    type: "BaseAddDelList",
    attrs: {
      fields: addDelChildrenFields,
    },
  },
  {
    prop: "fei_shu",
    label: "飞书审核员",
    labelWidth: "6em",
    type: "BaseAddDelList",
    attrs: {
      fields: addDelChildrenFields,
    },
  },
]);
</script>
<style lang="scss" scoped>
.company-auth {
  width: 1000px;
}
</style>
