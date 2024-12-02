<template>
  <BaseTable
    style="width: 400px"
    :cols="cols"
    :rowClassName="({ row }) => (row.hidden ? 'hidden-row' : '')"
    :rows="rows"
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
    <BaseBtn @click="handleSave" :name="{ name: 'submit', text: '保存' }" />
    <BaseBtn @click="handleReset" name="reset" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import BaseTable from "@/core/components/table/BaseTable.vue";
import { SpecialTableColType, TableColAttrs } from "@/core/components/table/_types";
import { CommonObj, CommonSize } from "@/core/_types";
import config from "@/config";
import { showMessage } from "@/core/utils";
import { specialColKeys } from "@/core/components/table";

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
    type: "custom",
  },
  {
    prop: "sortable",
    label: "是否排序",
    width: 80,
    type: "custom",
  },
  {
    prop: "exportable",
    label: "能否导出",
    width: 80,
    type: "custom",
  },
];
function handleChange(data: SetTableChangeParams) {
  $emit("change", data);
}
function handleSave() {
  showMessage("保存成功");
  $emit("submit");
}
function handleReset() {
  showMessage("已重置");
  $emit("reset");
}
</script>
<style lang="scss" scoped>
:deep(.hidden-row) {
  display: none;
}
</style>
