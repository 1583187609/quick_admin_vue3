<template>
  <el-col class="field-item-col" v-bind="getElColAttrs(field.quickAttrs?.grid ?? grid, colAttrs)">
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
        <slot name="custom" v-bind="scope" />
      </template>
    </FieldItem>
  </el-col>
</template>
<script lang="ts" setup>
import { useAttrs, computed } from "vue";
import { CommonObj, CommonSize } from "@/vite-env";
import { Grid, FormFieldAttrs } from "@/components/form/_types";
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
    grid?: Grid;
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
const $emit = defineEmits(["update:modelValue"]);
const newVal = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});

defineExpose({});
</script>
<style lang="scss" scoped>
// .field-item-col {}
</style>
