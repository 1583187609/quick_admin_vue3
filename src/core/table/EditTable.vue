<!-- summary
  可编辑的表格
-->
<template>
  <BaseForm v-bind="formAttrs" v-model="modelData" :fields="fields" class="edit-table" ref="formRef">
    <slot name="front" />
    <template #custom>
      <BaseTable v-bind="$attrs" :cols="cols" :rows="modelValue" class="table" ref="tableRef">
        <template #header="{ column, col }">
          <span :class="{ required: col?.required && col.field }">{{ column.label }}</span>
        </template>
        <template #default="scope">
          <template v-if="scope.col.field">
            <slot :name="scope.col.prop" v-bind="scope" v-if="scope.col.field.type === 'custom'" />
            <FieldItem style="margin-bottom: 0" v-model="scope.row[scope.col.prop]" :field="scope.col.field" v-else />
          </template>
          <template v-else>{{ scope.row[scope.col.prop] }}</template>
        </template>
      </BaseTable>
    </template>
    <slot name="behind" />
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, useAttrs } from "vue";
import { FormInstance } from "element-plus";
import { CommonObj } from "@/vite-env";
import { TableColAttrs } from "@/core/table/_types";
import FieldItem from "@/core/form/_components/FieldItem/Index.vue";

defineOptions({
  inheritAttrs: false,
});

const $attrs = useAttrs();
const props = withDefaults(
  defineProps<{
    cols: TableColAttrs[]; // 表头
    modelValue?: CommonObj[]; // 表格行数据
    formAttrs?: CommonObj; // 表单属性
  }>(),
  {
    modelValue: () => reactive([]),
  }
);
const $emit = defineEmits(["update:modelValue"]);
const formRef = ref<FormInstance | null>(null);
const tableRef = ref<FormInstance | null>(null);
const modelData = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});
// function getVals() {
//   const { cols, modelValue } = props;
//   const keys = cols.map(col => col.prop);
//   const vals = modelValue.map(row => {
//     const obj = {};
//     keys.forEach(key => {
//       obj[key] = row[key];
//     });
//     return obj;
//   });
//   console.log(vals, "vals-------------");
// }
// getVals();
const fields = computed(() => {
  const { cols } = props;
  return cols
    .map(it => {
      const { prop, label, required, field } = it;
      return { prop, label, required, ...field };
    })
    .filter(it => !!it);
});

// 暴露属性方法
defineExpose({
  // ...formRef.value,
  // ...tableRef.value,
  formRef,
  tableRef,
});
</script>
<style lang="scss" scoped>
.edit-table {
  max-height: 100%;
  width: 100%;
  overflow: auto;
  .table {
    width: 100%;
    height: auto;
    max-height: 100%;
    overflow: auto;
  }
}
.required {
  &::before {
    color: red;
    content: "*";
  }
}
</style>
