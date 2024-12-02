<template>
  <el-col class="field-item-col" v-bind="elColAttrs">
    <FieldItem
      v-model="newVal"
      :prefixProp="prefixProp"
      :field="field"
      :inputDebounce="inputDebounce"
      :isChild="isChild"
      :formRef="formRef"
      v-bind="$attrs"
    >
      <template #custom="scope">
        <slot name="custom" v-bind="scope" />
      </template>
    </FieldItem>
  </el-col>
</template>
<script lang="ts" setup>
import { useAttrs, computed } from "vue";
import { CommonObj, CommonSize } from "@/core/_types";
import { Grid, FormFieldAttrs } from "@/core/components/form/_types";
import { getElColAttrs } from "@/core/components/form/_utils";
import FieldItem from "@/core/components/form/_components/FieldItem/Index.vue";
import { useFormAttrs } from "@/hooks";
import _ from "lodash";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    prefixProp?: string; //前置prop属性
    colAttrs?: CommonObj; //el-col的属性
    field: FormFieldAttrs;
    // grid?: Grid;
    // size?: CommonSize;
    // pureText?: boolean; //是否展示纯文本
    // disabled?: boolean; //是否禁用
    // readonly?: boolean; //是否只读
    // labelWidth?: string; //label宽度
    inputDebounce?: boolean;
    isChild?: boolean; //是否是父级children 的子级
    formRef?: any;
  }>(),
  {}
);
const $emit = defineEmits(["update:modelValue"]);
const $attrs = useAttrs();
const formAttrs = useFormAttrs({ ...props, ...$attrs });
const elColAttrs = computed(() => {
  const { field, colAttrs } = props;
  const grid = field.quickAttrs?.grid ?? formAttrs.grid;
  return getElColAttrs(grid, colAttrs);
});
const newVal = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});

defineExpose({});
</script>
<style lang="scss" scoped></style>
