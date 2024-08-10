<!-- 页面-简介 -->
<template>
  <FieldItem
    style="width: 100%; margin-bottom: 8px"
    :field="field"
    :disabled="field?.extraAttrs?.disabled ?? disabled"
    :readonly="field?.extraAttrs?.readonly ?? readonly"
    :size="field?.size ?? size"
    :inputDebounce="inputDebounce"
    @change="(key:string, val:any)=>emits('change', key,val)"
    v-model="model[field!.prop as string]"
  >
    <template #custom="{ field: currField }">
      <slot name="custom" :field="currField"></slot>
    </template>
  </FieldItem>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField, FormFieldAttrs } from "@/components/form";
import FieldItem from "@/components/form/_components/FieldItem/Index.vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";

const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj;
    field?: FormFieldAttrs;
    size?: string;
    small?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    inputDebounce?: boolean;
  }>(),
  {
    modelValue: () => ({}),
  }
);
const emits = defineEmits(["update:modelValue", "change"]);
const model = computed<CommonObj>({
  get: () => props.modelValue,
  set: (val: any) => emits("update:modelValue", val),
});
</script>
<style lang="scss" scoped>
:deep(.el-form-item__label) {
  margin-left: $gap-half;
  // background: red;
}
</style>
