<!-- 页面-简介 -->
<template>
  <FieldItemCol
    :colAttrs="{ class: 'query-field-item' }"
    class="form-item"
    :class="currSize"
    :field="field"
    :size="currSize"
    :disabled="field?.extraAttrs?.disabled ?? disabled"
    :readonly="field?.extraAttrs?.readonly ?? readonly"
    :inputDebounce="inputDebounce"
    @change="(key:string, val:any)=>emits('change', key,val)"
    v-model="model[field!.prop as string]"
  >
    <template #custom="{ field: currField }">
      <slot name="custom" :field="currField"></slot>
    </template>
  </FieldItemCol>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { FormFieldAttrs } from "@/components/form/_types";
import FieldItemCol from "@/components/form/_components/FieldItemCol/Index.vue";
import { CommonObj, CommonSize } from "@/vite-env";
import { defaultCommonSize } from "@/components/_utils";

const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj;
    field?: FormFieldAttrs;
    size?: CommonSize;
    disabled?: boolean;
    readonly?: boolean;
    inputDebounce?: boolean;
  }>(),
  {
    modelValue: () => ({}),
    size: defaultCommonSize,
  }
);
const emits = defineEmits(["update:modelValue", "change"]);
const currSize = computed(() => props.field?.size ?? props.size);
const model = computed<CommonObj>({
  get: () => props.modelValue,
  set: (val: any) => emits("update:modelValue", val),
});
</script>
<style lang="scss">
.query-field-item {
  .form-item {
    margin-bottom: 0px;
    &.large {
      margin-bottom: $gap-large;
      .el-form-item__label {
        margin-left: $gap-large;
      }
    }
    &.default {
      margin-bottom: $gap-default;
      .el-form-item__label {
        margin-left: $gap-default;
      }
    }
    &.small {
      margin-bottom: $gap-small;
      .el-form-item__label {
        margin-left: $gap-small;
      }
    }
  }
}

// .field-item {
//   width: 100%;
//   margin-bottom: 8px !important;
//   :deep(.el-form-item__label) {
//     margin-left: $gap-half;
//     // background: red;
//   }
// }
// :deep(.el-form-item__label) {
//   margin-left: $gap-half;
//   // background: red;
// }
</style>
