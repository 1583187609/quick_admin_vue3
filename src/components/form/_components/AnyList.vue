<!-- 页面-简介 -->
<!-- :field="deleteAttrs(field, ['label'])" -->
<template>
  <template v-for="(field, ind) in fields" :key="ind">
    <el-row :gutter="16">
      <FieldItem
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
import { ref, reactive, watch, computed } from "vue";
import { CommonObj, CommonSize, FinallyNext, StrNum } from "@/vite-env";
import { GridValAttrs, FormField, FormFieldAttrs } from "./FieldItem/_types";
import FieldItem from "@/components/form/_components/FieldItem/Index.vue";

const props = withDefaults(
  defineProps<{
    modelValue: CommonObj;
    prefixProp?: string;
    fields?: FormFieldAttrs[];
    grid?: GridValAttrs;
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
