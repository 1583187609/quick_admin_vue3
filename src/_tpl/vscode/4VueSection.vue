<!-- 表单描述 -->
<template>
  <SectionForm v-model="modalData" :sections="sections" :fetch="PostMockCommon">
    <template #zdy>
      <input v-model="modalData.zdy" />
    </template>
  </SectionForm>
</template>
<script lang="ts" setup>
import { FormFieldAttrs, SectionFormItemAttrs } from "@/core/components/form/_types";
import { ref, reactive, watch, computed } from "vue";
import { PostMockCommon } from "@/api-mock";
import { CommonObj } from "@/vite-env";
import SectionForm from "@/core/components/form/SectionForm.vue";

const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {
    data: () => ({}),
  }
);
const $emit = defineEmits(["update:modelValue"]);

const modalData = reactive<CommonObj>(
  Object.assign({}, props.data, {
    srk: "这是输入框的初始值",
  })
);

const sections: SectionFormItemAttrs[] = [
  {
    title: "第一部分",
    fields: [
      {
        prop: "srk",
        label: "输入框",
      },
      {
        prop: "xzk",
        label: "选择框",
        type: "select",
        attrs: {
          options: [],
        },
      },
    ],
  },
  {
    title: "第二部分",
    fields: [
      {
        prop: "rqqj",
        label: "日趋区间",
        type: "date-picker",
      },
      {
        prop: "zdy",
        label: "自定义",
        type: "custom",
      },
    ],
  },
];
</script>
<style lang="scss" scoped></style>
