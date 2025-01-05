<!-- 页面-简介 -->
<template>
  <component
    v-model="modelData[field!.prop as string]"
    :is="layoutType === 'flex' ? FieldItem : FieldItemCol"
    class="form-item"
    :class="currSize"
    :size="currSize"
    :field="field"
    :colAttrs="layoutType === 'flex' ? undefined : { class: 'query-field-item' }"
    :disabled="field?.quickAttrs?.disabled ?? disabled"
    :readonly="field?.quickAttrs?.readonly ?? readonly"
    :inputDebounce="inputDebounce"
    @blur="(...args) => $emit('blur', ...args)"
    @focus="(...args) => $emit('focus', ...args)"
    @change="(...args) => $emit('change', ...args)"
  >
    <template #custom="{ field: currField }">
      <slot name="custom" :field="currField" />
    </template>
  </component>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { FormFieldAttrs } from "@/core/components/form/_types";
import FieldItem from "@/core/components/form/_components/FieldItem/Index.vue";
import FieldItemCol from "@/core/components/form/_components/FieldItemCol/Index.vue";
import { CommonObj, CommonSize } from "@/core/_types";
import { defaultCommonSize } from "@/core/utils";
import { QueryFormItemLayoutType } from "../Index.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj;
    field: FormFieldAttrs;
    size?: CommonSize;
    disabled?: boolean;
    readonly?: boolean;
    inputDebounce?: boolean;
    layoutType?: QueryFormItemLayoutType;
  }>(),
  {
    modelValue: () => reactive({}),
    size: defaultCommonSize,
  }
);
const $emit = defineEmits(["update:modelValue", "change", "blur", "focus"]);
const currSize = computed(() => props.field?.size ?? props.size);
const modelData = computed<CommonObj>({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});
</script>
<style lang="scss">
.form-item {
  margin-bottom: $gap-half;
}
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
</style>
