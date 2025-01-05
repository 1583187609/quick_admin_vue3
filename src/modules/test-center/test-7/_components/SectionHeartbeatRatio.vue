<!-- 组件-心动嘉宾比例配置 -->
<template>
  <SectionForm v-model="modelData" :sections="sections" style="width: 480px"> </SectionForm>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { FormFieldAttrs, SectionFormItem } from "@/core/components/form/_types";
import SectionForm from "@/core/components/form/SectionForm.vue";
import { CommonObj } from "@/core/_types";
const addDelChildrenFields: FormFieldAttrs[] = [
  { prop: "user_type", label: "嘉宾类型", type: "select" },
  { prop: "ratio", label: "占比", type: "input-number" },
];
const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
const modelData = reactive<CommonObj>({
  new_user: [{ user_type: undefined, ratio: undefined }],
  quality_user: [{ user_type: undefined, ratio: undefined }],
  common_user: [{ user_type: undefined, ratio: undefined }],
});
const sections: SectionFormItem[] = [
  {
    // prop: "new_user",
    title: "新用户",
    fields: [
      {
        prop: "new_user",
        label: "新用户",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
    ],
  },
  {
    // prop: "quality_user",
    title: "优质嘉宾",
    fields: [
      {
        prop: "quality_user",
        label: "优质嘉宾",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
    ],
  },
  {
    // prop: "common_user",
    title: "普通用户",
    fields: [
      {
        prop: "common_user",
        label: "普通用户",
        type: "BaseAddDelList",
        attrs: {
          fields: addDelChildrenFields,
        },
      },
    ],
  },
];
</script>
<style lang="scss" scoped></style>
