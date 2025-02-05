<!-- 表单描述 -->
<template>
  <BaseForm v-model="modalData" :fields="fields" :fetch="PostMockCommon">
    <template #zdy>
      <input v-model="modalData.zdy" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { FormFieldAttrs } from "@/core/components/form/_types";
import { ref, reactive, watch, computed } from "vue";
import { PostMockCommon } from "@/api-mock";
import { CommonObj } from "@/core/_types";

const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {
    data: () => ({}),
  }
);
const $emit = defineEmits(["update:modelValue"]);

const modalData = reactive<CommonObj>(Object.assign({ srk: "这是输入框的初始值" }, props.data));

const fields: FormFieldAttrs[] = [
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
  {
    prop: "rqqj",
    label: "日趋区间",
    type: "date-picker",
  },
  {
    prop: "zdy",
    label: "自定义",
    type: "slot",
  },
];
</script>
<style lang="scss" scoped></style>
