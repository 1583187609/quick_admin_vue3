<!-- 组件-分享嘉宾角色配置 -->
<template>
  <BaseForm v-model="model" :fields="fields" class="share-user-role"></BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField } from "@/components/BaseFormItem";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
let model = reactive<CommonObj>({
  list: [{ yyid: "123456" }],
});
const fields = ref<FormField[]>([
  {
    prop: "list",
    label: "列表",
    type: "addDel",
    children: [
      {
        prop: "yyid",
        label: "运营ID",
      },
    ],
  },
]);
</script>
<style lang="scss" scoped>
.share-user-role {
  width: 360px;
}
.item {
  &:not(:last-child) {
    margin-bottom: $gap;
  }
}
</style>
