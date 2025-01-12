<!-- 页面-简介 -->
<template>
  <component
    v-model="modelData[field!.prop as string]"
    :is="layoutType === 'flex' ? FieldItem : FieldItemCol"
    class="form-item"
    :field="getHandleField(field)"
    :colAttrs="layoutType === 'flex' ? undefined : { class: 'query-field-item' }"
    :disabled="field?.attrs?.disabled ?? disabled"
    :readonly="field?.attrs?.readonly ?? readonly"
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
import { QueryFormItemLayoutType } from "../Index.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj;
    field: FormFieldAttrs;
    // size?: CommonSize;
    disabled?: boolean;
    readonly?: boolean;
    inputDebounce?: boolean;
    layoutType?: QueryFormItemLayoutType;
  }>(),
  {
    modelValue: () => reactive({}),
  }
);
const $emit = defineEmits(["update:modelValue", "change", "blur", "focus"]);
const modelData = computed<CommonObj>({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});
function getHandleField(field: FormFieldAttrs) {
  if (field.attrs) {
    field.attrs.style = "width:100%";
  } else {
    field.attrs = { style: "width:100%" };
  }
  return field;
}
</script>
<style lang="scss">
.form-item {
  margin-bottom: var(--gap-half);
}
.query-field-item {
  .form-item {
    margin-bottom: var(--gap-half);
    .el-form-item__label {
      margin-left: var(--gap-half);
    }
  }
}
</style>
