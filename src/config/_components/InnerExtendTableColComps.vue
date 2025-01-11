<!-- summary
  内置至系统的表格列类型
  此组件后续可能会移除
-->
<template>
  <FormItem v-model="newRow[col.prop]" :is="col.type" :field="col" @change="handleChange" @blur="handleBlur" @focus="handleFocus" />
  <!-- <template v-if="col.type === 'switch'">
    <el-switch
      :modelValue="newRow[col.prop]"
      v-bind="deleteAttrs(col.attrs, ['onChange'])"
      @change="handleSwitchChange"
      v-if="col.quickAttrs?.handleChange"
    />
    <el-switch v-model="newRow[col.prop]" v-bind="col.attrs" v-else />
  </template>
  <el-input v-model="newRow[col.prop]" v-bind="col.attrs" @change="handleInputChange" v-else-if="col.type === 'input'" /> -->
</template>
<script lang="ts" setup>
import { deleteAttrs, showMessage } from "@/core/utils";
import { TableColStandardAttrs } from "@/core/components/table/_types";
import { CommonObj, StrNum } from "@/core/_types";
import { RefreshListFn } from "@/core/components/table/_components/Column.vue";
import FormItem from "@/core/components/form/_components/FormItem/Index.vue";
import { ElFormItemType } from "@/core/components/form/_components/FormItem/_types";

export type InsertTabColFormType = ElFormItemType;

// let isFirst = true;
const props = withDefaults(
  defineProps<{
    col: TableColStandardAttrs;
    row: {
      $index: number; // 行下标
      [key: string]: any;
    };
    refreshList?: RefreshListFn;
  }>(),
  {
    row: () => reactive({}),
  }
);

const $emit = defineEmits(["update:row"]);
const newRow = computed({
  get: () => props.row,
  set: (val: any) => $emit("update:row", val),
});

function handleChange(val: any) {
  console.log(val, props.col.prop, "val-change------------");
}
function handleBlur(val: any) {
  console.log(val, props.col.prop, "val-blur------------");
}
function handleFocus(val: any) {
  console.log(val, props.col.prop, "val-focus------------");
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
