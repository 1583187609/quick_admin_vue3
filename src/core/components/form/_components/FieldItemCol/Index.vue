<template>
  <el-col class="field-item-col" v-bind="elColAttrs">
    <FieldItem v-model="newVal" :prefixProp="prefixProp" :field="field" :inputDebounce="inputDebounce" :hideLabel="hideLabel" v-bind="$attrs">
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
import _ from "lodash";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    colAttrs?: CommonObj; //el-col的属性
    field: FormFieldAttrs;
    prefixProp?: string;
    grid?: Grid;
    // pureText?: boolean; //是否展示纯文本
    // readonly?: boolean; //是否只读
    inputDebounce?: boolean;
    hideLabel?: boolean; //是否隐藏label
  }>(),
  {}
);
const $emit = defineEmits(["update:modelValue"]);
const $attrs = useAttrs();
const elColAttrs = computed(() => {
  const { colAttrs, grid } = props;
  return getElColAttrs(grid, colAttrs);
});
const newVal = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});

defineExpose({});
</script>
<style lang="scss" scoped></style>
