<!-- 组件-分享嘉宾角色配置 -->
<template>
  <BaseForm v-model="modelData" :fields="fields" class="share-user-role"> </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { CommonObj } from "@/core/_types";

const listFields: FormFieldAttrs[] = [
  {
    prop: "user_id",
    label: "运营ID",
  },
];
const modelData = reactive<CommonObj>({
  list: [{ user_id: "123456" }],
});
const fields = ref<FormFieldAttrs[]>([
  {
    prop: "list",
    label: "列表",
    type: "BaseAddDelList",
    attrs: {
      fields: listFields,
    },
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
