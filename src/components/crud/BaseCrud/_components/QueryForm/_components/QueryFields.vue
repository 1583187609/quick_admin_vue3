<!-- 页面-简介 -->
<template>
  <el-col class="query-fields">
    <FieldItem
      style="width: 100%"
      :className="className"
      :field="field"
      :inputDebounce="inputDebounce"
      :size="size"
      @change="(key:string, val:any)=>emits('change', key,val)"
      v-model="model[field!.prop as string]"
    >
      <template #custom="{ field: currField }">
        <slot name="custom" :field="currField"></slot>
      </template>
    </FieldItem>
  </el-col>
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
    className?: string;
    inputDebounce?: boolean;
  }>(),
  {
    modelValue: () => ({}),
  }
);
const emits = defineEmits(["update:modelValue", "change"]);
const model = computed<CommonObj>({
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
:deep(.el-form-item__label) {
  margin-left: $gap-half;
}
</style>
