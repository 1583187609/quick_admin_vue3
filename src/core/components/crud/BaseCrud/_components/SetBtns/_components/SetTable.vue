<template>
  <BaseTable
    style="width: 400px"
    :cols="cols"
    :rowClassName="({ row }) => (row.hidden ? 'hidden-row' : '')"
    :data="rows"
    :size="size"
    :key="tableKey"
  >
    <template #visible="{ row, col, $index }">
      <el-switch
        @change="(isTrue: boolean) => handleChange({type: 'visible', colProp: row.colProp, isTrue, rowInd: $index })"
        v-model="row.visible"
        v-bind="switchAttrs"
      />
    </template>
    <template #exportable="{ row, col, $index }">
      <el-switch
        @change="(isTrue: boolean) => handleChange({type: 'exportable', colProp: row.colProp, isTrue, rowInd: $index })"
        v-model="row.exportable"
        v-bind="switchAttrs"
      />
    </template>
    <template #sortable="{ row, col, $index }">
      <el-switch
        @change="(isTrue: boolean) => handleChange({type: 'sortable', colProp: row.colProp, isTrue, rowInd: $index })"
        v-model="row.sortable"
        v-bind="switchAttrs"
      />
    </template>
  </BaseTable>
  <div class="f-c-c mt-16">
    <BaseBtn @click="handleSave" :tpl="{ name: 'submit', text: '保存' }" />
    <BaseBtn @click="handleReset" tpl="reset" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { TableColAttrs } from "@/core/components/table/_types";
import { CommonObj, CommonSize } from "@/core/_types";
import config from "@/config";
import { showMessage } from "@/core/utils";

export type SetTableColType = "visible" | "exportable" | "sortable";
export interface SetTableChangeParams {
  type: SetTableColType;
  colProp: string;
  isTrue: boolean;
  rowInd: number;
}

const switchAttrs = {
  inlinePrompt: true,
  activeText: "是",
  inactiveText: "否",
};

const $emit = defineEmits(["change", "reset", "submit"]);
const props = withDefaults(
  defineProps<{
    rows?: CommonObj[];
    size?: CommonSize;
  }>(),
  Object.assign(
    {
      rows: () => [],
    },
    config?.BaseCrud?._components?.SetTable
  )
);

const tableKey = ref(Date.now());

const cols: TableColAttrs[] = [
  {
    prop: "label",
    label: "列名",
    minWidth: 110,
  },
  {
    prop: "visible",
    label: "是否显示",
    width: 80,
    type: "slot",
  },
  {
    prop: "sortable",
    label: "是否排序",
    width: 80,
    type: "slot",
  },
  {
    prop: "exportable",
    label: "能否导出",
    width: 80,
    type: "slot",
  },
];
function handleChange(data: SetTableChangeParams) {
  $emit("change", data);
}
function handleSave(...args) {
  showMessage("保存成功");
  $emit("submit", ...args);
}
function handleReset(...args) {
  showMessage("已重置");
  $emit("reset", ...args);
}
</script>
<style lang="scss" scoped>
:deep(.hidden-row) {
  display: none;
}
</style>
