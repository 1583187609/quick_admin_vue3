<!-- 任意元素的字段列表 -->
<template>
  <template v-for="(field, ind) in fields" :key="ind">
    <el-row :gutter="16">
      <!-- :grid="field?.quickAttrs?.grid ?? grid"
        :readonly="field?.quickAttrs?.readonly ?? readonly"
        :pureText="field?.quickAttrs?.pureText ?? pureText"
        :disabled="field?.quickAttrs?.disabled ?? disabled"
        :size="field?.attrs?.size ?? field.size ?? size"
        :labelWidth="field?.labelWidth ?? labelWidth" -->
      <FieldItemCol v-model="modelData[field.prop as string]" :prefixProp="prefixProp" :field="field" isChild />
    </el-row>
  </template>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { CommonObj, CommonSize } from "@/core/_types";
import { Grid, FormFieldAttrs } from "./FieldItem/_types";
import FieldItemCol from "@/core/components/form/_components/FieldItemCol/Index.vue";

const props = withDefaults(
  defineProps<{
    modelValue: CommonObj;
    prefixProp?: string;
    fields?: FormFieldAttrs[];
    // grid?: Grid;
    // size?: CommonSize;
    // readonly?: boolean;
    // pureText?: boolean;
    // disabled?: boolean;
    // labelWidth?: string;
  }>(),
  {
    fields: () => [],
  }
);
const $emit = defineEmits(["update:modelValue"]);
const modelData = computed({
  get: () => props.modelValue,
  set: (val: CommonObj) => $emit("update:modelValue", val),
});
</script>
<style lang="scss" scoped></style>
