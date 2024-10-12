<template>
  <BaseTable style="width: 400px" :cols="cols" :rowClassName="getRowClassName" :rows="rows" :size="size" :key="tableKey">
    <template #visible="{ row, col, $index }">
      <el-switch
        @change="(val: boolean) => handleShowChange(row.colProp, val, $index)"
        v-model="row.visible"
        v-bind="switchAttrs"
      />
    </template>
    <template #exportable="{ row, col, $index }">
      <el-switch
        @change="(val: boolean) => handleExportChange(row.colProp, val, $index)"
        v-model="row.exportable"
        v-bind="switchAttrs"
        disabled
      />
    </template>
    <template #sortable="{ row, col, $index }">
      <el-switch
        @change="(val: boolean) => handleOrderChange(row.colProp, val, $index)"
        v-model="row.sortable"
        v-bind="switchAttrs"
        disabled
      />
    </template>
  </BaseTable>
</template>
<!-- <div class="f-c-c mt-16">
    <BaseBtn @click="handleSave" :name="{ name: 'submit', text: '保存' }" />
    <BaseBtn @click="handleResetColSet" name="reset" />
</div> -->
<script lang="ts" setup>
import { ref } from "vue";
import BaseTable from "@/components/table/BaseTable.vue";
import { SpecialTableColType, TableColAttrs } from "@/components/table/_types";
import { CommonObj, CommonSize } from "@/vite-env";
import config from "@/config";
import { showMessage } from "@/components/_utils";
import { specialColKeys } from "@/components/table";

const switchAttrs = {
  inlinePrompt: true,
  activeText: "是",
  inactiveText: "否",
};
const props = withDefaults(
  defineProps<{
    rows?: CommonObj[];
    size?: CommonSize;
    handleShowChange: (propName: string, val: boolean, ind: number) => void;
    handleExportChange: (propName: string, val: boolean, ind: number) => void;
    handleOrderChange: (propName: string, val: boolean, ind: number) => void;
    handleResetColSet: () => void;
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
    minWidth: 70,
    type: "custom",
  },
  {
    prop: "exportable",
    label: "能否导出",
    minWidth: 70,
    type: "custom",
  },
  {
    prop: "sortable",
    label: "是否排序",
    minWidth: 70,
    type: "custom",
  },
];
function getRowClassName({ row, rowIndex }) {
  console.log(row, "getRowClassNameRes---------");
  return "hidden";
}
function handleSave() {
  showMessage("保存成功");
}
</script>
<style lang="scss" scoped></style>
