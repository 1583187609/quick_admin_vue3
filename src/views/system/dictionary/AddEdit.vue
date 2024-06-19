<!-- 组件 - 新增/编辑 -->
<template>
  <BaseForm
    style="width: 600px"
    v-model="model"
    :fields="fields"
    :fetch="data ? PutUserUpdate : PostUserAdd"
    :fetchSuccess="refreshList"
    :extraParams="data ? { id: data.id } : undefined"
  >
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField } from "@/components/BaseFormItem";
import { PostUserAdd, PutUserUpdate } from "@/api-mock";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { useDictStore } from "@/store";
const { getOpts, getText } = useDictStore();
const enableOpts = getOpts("EnableStatus");
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    refreshList?: FinallyNext;
  }>(),
  {}
);
const model = reactive<CommonObj>(Object.assign({}, props.data));
const fields: FormField[] = [
  {
    prop: "zdmc",
    label: "字典名称",
    required: true,
    attrs: {
      maxlength: 10,
    },
  },
  {
    prop: "zdlx",
    label: "字典类型",
    required: true,
    type: "select",
  },
  {
    prop: "bz",
    label: "备注",
    attrs: {
      type: "textarea",
    },
  },
];
</script>
<style lang="scss" scoped></style>
