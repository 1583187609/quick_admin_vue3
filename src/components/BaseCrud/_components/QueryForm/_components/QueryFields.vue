<!-- 页面-简介 -->
<template>
  <el-col class="query-fields">
    <BaseFormItem
      style="width: 100%"
      :className="className"
      :field="field"
      :inputDebounce="inputDebounce"
      :size="size"
      @change="(key:string, val:any)=>emits('change', key,val)"
      v-model="model[field.prop as string]"
    >
      <template #custom="{ field }">
        <slot name="custom" :field="field"></slot>
      </template>
    </BaseFormItem>
  </el-col>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj;
    field?: FormFieldAttrs;
    size?: string;
    className?: string;
    inputDebounce?: boolean;
  }>(),
  {
    modelValue: () => ({}),
  }
);
const emits = defineEmits(["update:modelValue", "change"]);
let model = computed<CommonObj>({
  get() {
    return props.modelValue;
  },
  set(val: any) {
    emits("update:modelValue", val);
  },
});
</script>
<style lang="scss" scoped>
.mb-half {
  margin-bottom: $gap-half;
}
.mb-qtr {
  margin-bottom: $gap-qtr;
}
</style>
