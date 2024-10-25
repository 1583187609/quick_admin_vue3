<!-- 页面-简介 -->
<template>
  <FieldItemCol
    :colAttrs="{ class: 'query-field-item' }"
    class="form-item"
    :class="currSize"
    :field="field"
    :size="currSize"
    :disabled="field?.quickAttrs?.disabled ?? disabled"
    :readonly="field?.quickAttrs?.readonly ?? readonly"
    :inputDebounce="inputDebounce"
    @change="(key:string, val:any)=>$emit('change', key,val)"
    v-model="modelData[field!.prop as string]"
  >
    <template #custom="{ field: currField }">
      <slot name="custom" :field="currField" />
    </template>
  </FieldItemCol>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { FormFieldAttrs } from "@/core/form/_types";
import FieldItemCol from "@/core/form/_components/FieldItemCol/Index.vue";
import { CommonObj, CommonSize } from "@/vite-env";
import { defaultCommonSize } from "@/core/_utils";

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
const $emit = defineEmits(["update:modelValue", "change"]);
const currSize = computed(() => props.field?.size ?? props.size);
const modelData = computed<CommonObj>({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
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
