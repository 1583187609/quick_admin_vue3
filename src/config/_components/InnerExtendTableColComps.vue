<!-- summary
  内置至系统的表格列类型
  此组件后续可能会移除
-->
<template>
  <template v-if="col.type === 'switch'">
    <el-switch
      :modelValue="row[col.prop as string]"
      v-bind="deleteAttrs(col.attrs, ['onChange'])"
      @change="handleSwitchChange"
      v-if="quickAttrs?.fetch"
    />
    <el-switch v-model="row[col.prop as string]" v-bind="col.attrs" v-else />
  </template>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { propsJoinChar, deleteAttrs, devErrorTips, showMessage, renderValue, getVNodeInnerText } from "@/components/_utils";
import { TableColAttrs } from "@/components/table/_types";
import { CommonObj } from "@/vite-env";

export type InsertTabColFormType = "switch";

const props = withDefaults(
  defineProps<{
    col: TableColAttrs;
    row: CommonObj;
    index: number;
    quickAttrs?: CommonObj;
    refreshList?: RefreshListFn;
  }>(),
  {}
);

// 处理switch的change事件
function handleSwitchChange(val: StrNum | boolean) {
  const { col, row, index: rowInd, refreshList, quickAttrs } = props;
  if (rowInd === -1) return;
  const { prop, attrs = {} } = col;
  const { activeValue } = attrs;
  const { fetch } = quickAttrs;
  const preKey = activeValue === row[prop] ? "in" : "";
  fetch(row, rowInd, (hintStr = `${attrs[preKey + "activeText"]}成功`) => {
    showMessage(hintStr);
    refreshList?.();
  });
}
</script>
<style lang="scss" scoped></style>
