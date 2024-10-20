<!-- summary
  内置至系统的表格列类型
  此组件后续可能会移除
-->
<template>
  <template v-if="col.type === 'switch'">
    <el-switch
      :modelValue="newRow[col.prop]"
      v-bind="deleteAttrs(col.attrs, ['onChange'])"
      @change="handleSwitchChange"
      v-if="quickAttrs?.handleChange"
    />
    <el-switch v-model="newRow[col.prop]" v-bind="col.attrs" v-else />
  </template>
  <el-input v-model="newRow[col.prop]" v-bind="col.attrs" @change="handleInputChange" v-else-if="col.type === 'input'" />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { propsJoinChar, deleteAttrs, devErrorTips, showMessage, renderValue, getVNodeInnerText } from "@/components/_utils";
import { TableColAttrs } from "@/components/table/_types";
import { CommonObj } from "@/vite-env";

export type InsertTabColFormType = "switch";

let isFirst = true;
const props = withDefaults(
  defineProps<{
    col: TableColAttrs;
    row: {
      $index: number; // 行下标
      [key: string]: any;
    };
    quickAttrs?: CommonObj;
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

// 处理switch的change事件
function handleSwitchChange(val: StrNum | boolean) {
  if (isFirst) {
    isFirst = false;
    return;
  }
  const { col, row, refreshList, quickAttrs } = props;
  const { prop, attrs = {} } = col;
  const { activeValue } = attrs;
  const { handleChange } = quickAttrs;
  const preKey = activeValue === row[prop] ? "in" : "";
  handleChange(val, row, (hint = `${attrs[preKey + "activeText"]}成功`) => {
    showMessage(hint);
    newRow.value[prop] = val;
    refreshList?.();
  });
}

// 处理input的change事件
function handleInputChange(val: any) {
  if (isFirst) {
    isFirst = false;
    return;
  }
  const { col, row, refreshList, quickAttrs } = props;
  const { attrs = {}, prop, label = "" } = col;
  const { handleBlur } = quickAttrs;
  handleBlur?.(val, row, (hint = `${label}修改成功`) => {
    showMessage(hint);
    newRow.value[prop] = val;
    refreshList?.();
  });
}
</script>
<style lang="scss" scoped></style>
