<template>
  <el-col class="field-item-col" v-bind="getElColAttrs(field.extraAttrs?.grid ?? grid, colAttrs)">
    <FieldItem
      v-model="newVal"
      v-bind="$attrs"
      :prefixProp="prefixProp"
      :field="field"
      :grid="grid"
      :size="size"
      :pureText="pureText"
      :disabled="disabled"
      :readonly="readonly"
      :labelWidth="labelWidth"
      :inputDebounce="inputDebounce"
      :showChildrenLabel="showChildrenLabel"
      :isChild="isChild"
      :formRef="formRef"
    >
      <template #custom="scope">
        <slot name="custom" v-bind="scope"></slot>
      </template>
    </FieldItem>
  </el-col>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, useAttrs, computed } from "vue";
import { CommonObj, OptionItem, StrNum, CommonSize } from "@/vite-env";
import { GridValAttrs, FormField, FormFieldAttrs } from "./index";
import { getElColAttrs } from "@/components/form/_utils";
import FieldItem from "@/components/form/_components/FieldItem/Index.vue";

defineOptions({
  inheritAttrs: false,
});

const $attrs = useAttrs();
const props = withDefaults(
  defineProps<{
    modelValue?: any;
    prefixProp?: string; //前置prop属性
    colAttrs?: CommonObj; //el-col的属性
    grid?: GridValAttrs;
    size?: CommonSize;
    field: FormFieldAttrs;
    pureText?: boolean; //是否展示纯文本
    disabled?: boolean; //是否禁用
    readonly?: boolean; //是否只读
    labelWidth?: string; //label宽度
    inputDebounce?: boolean;
    showChildrenLabel?: boolean; //子项的label是否显示
    isChild?: boolean; //是否是父级children 的子级
    formRef?: any;
  }>(),
  {
    grid: 24,
  }
);

const emits = defineEmits(["update:modelValue"]);
const newVal = computed({
  get: () => props.modelValue,
  set: (val: any) => emits("update:modelValue", val),
});

defineExpose({});
</script>
<style lang="scss" scoped>
// .field-item-col {}
</style>
