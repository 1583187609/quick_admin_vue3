<!-- summary
  内置至系统的表格列类型
  此组件后续可能会移除
-->
<template>
  <FormItem
    v-model="modelVal"
    :is="col.type"
    :field="newField"
    @update:field="attrs => (newField = attrs)"
    @change="(...args) => handleEvent('change', ...args)"
    @blur="(...args) => handleEvent('blur', ...args)"
    @focus="(...args) => handleEvent('focus', ...args)"
    @input="(...args) => handleEvent('input', ...args)"
  />
  <!-- <template v-if="col.type === 'switch'">
    <el-switch v-model="modelVal" v-bind="deleteAttrs(col.attrs, ['onChange'])" @change="handleSwitchChange" v-if="col.quickAttrs?.handleChange" />
    <el-switch v-model="modelVal" v-bind="col.attrs" v-else />
  </template>
  <el-input v-model="modelVal" v-bind="col.attrs" @change="handleInputChange" v-else-if="col.type === 'input'" /> -->
</template>
<script lang="ts" setup>
import { deleteAttrs, showMessage } from "@/core/utils";
import { TableColStandardAttrs } from "@/core/components/table/_types";
import { BaseDataType, CommonObj, StrNum } from "@/core/_types";
import { RefreshListFn } from "@/core/components/table/_components/Column.vue";
import FormItem from "@/core/components/form/_components/FormItem/Index.vue";
import { ElFormItemType } from "@/core/components/form/_components/FormItem/_types";
import { useModelData } from "@/hooks";

export type InsertTabColFormType = ElFormItemType;

const props = withDefaults(
  defineProps<{
    modelValue: BaseDataType;
    refreshList?: RefreshListFn;
    col: TableColStandardAttrs;
    row: CommonObj;
  }>(),
  {}
);

const $emit = defineEmits(["update:modelValue", "change", "focus", "blur", "input"]);
const modelVal = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});
const newField = ref(props.col);
function handleEvent(name: "change" | "focus" | "blur" | "input", val: any, e: Event) {
  const { row, refreshList } = props;
  const { label, attrs } = newField.value;
  let hintStr = `${label}修改成功`;
  $emit(
    name,
    val,
    row,
    (hint = hintStr, isRefresh = true) => {
      showMessage(hint);
      isRefresh && refreshList?.();
    },
    e
  );
}

// 处理switch的change事件
// function handleSwitchChange(val: StrNum | boolean) {
//   if (isFirst) {
//     isFirst = false;
//     return;
//   }
//   const { col, row, refreshList } = props;
//   const {quickAttrs} = col;
//   const { prop, attrs = {} } = col;
//   const { activeValue } = attrs;
//   const { handleChange } = quickAttrs;
//   const preKey = activeValue === row[prop] ? "in" : "";
//   handleChange(val, row, (hint = `${attrs[preKey + "activeText"]}成功`) => {
//     showMessage(hint);
//     newRow.value[prop] = val;
//     refreshList?.();
//   });
// }

// 处理input的change事件
// function handleInputChange(val: any) {
//   if (isFirst) {
//     isFirst = false;
//     return;
//   }
//   const { col, row, refreshList } = props;
//   const {quickAttrs} = col;
//   const { attrs = {}, prop, label = "" } = col;
//   const { handleBlur } = quickAttrs;
//   handleBlur?.(val, row, (hint = `${label}修改成功`) => {
//     showMessage(hint);
//     newRow.value[prop] = val;
//     refreshList?.();
//   });
// }
</script>
<style lang="scss" scoped></style>
