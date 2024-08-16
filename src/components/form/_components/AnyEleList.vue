<!-- 任意元素的字段列表 -->
<template>
  <template v-for="(field, ind) in fields" :key="ind">
    <el-row :gutter="16">
      <FieldItemCol
        v-model="modelData[field.prop as string]"
        :prefixProp="prefixProp"
        :field="field"
        :grid="field?.extraAttrs?.grid ?? grid"
        :readonly="field?.extraAttrs?.readonly ?? readonly"
        :pureText="field?.extraAttrs?.pureText ?? pureText"
        :disabled="field?.extraAttrs?.disabled ?? disabled"
        :size="field?.attrs?.size ?? field.size ?? size"
        :labelWidth="field?.labelWidth ?? labelWidth"
        :showChildrenLabel="showChildrenLabel"
        v-bind="field"
        isChild
      />
    </el-row>
  </template>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { CommonObj, CommonSize } from "@/vite-env";
import { Grid, FormFieldAttrs } from "./FieldItem/_types";
import FieldItemCol from "@/components/form/_components/FieldItemCol/Index.vue";

const props = withDefaults(
  defineProps<{
    modelValue: CommonObj;
    prefixProp?: string;
    fields?: FormFieldAttrs[];
    grid?: Grid;
    size?: CommonSize;
    readonly?: boolean;
    pureText?: boolean;
    disabled?: boolean;
    labelWidth?: string;
    showChildrenLabel?: boolean; //是否显示子级的label
  }>(),
  {
    fields: () => [],
  }
);
const emits = defineEmits(["update:modelValue"]);
const modelData = computed({
  get: () => props.modelValue,
  set: (val: CommonObj) => emits("update:modelValue", val),
});
</script>
<style lang="scss" scoped></style>
