<template>
  <BaseTable style="width: 400px" :cols="cols" :rows="rows" :size="size" :key="tableKey">
    <template #isShow="{ row, col, $index }">
      <el-switch
        @change="(val: boolean) => handleShowChange(row.colProp, val, $index)"
        v-model="row.isShow"
        v-bind="switchProps"
      />
    </template>
    <template #isExport="{ row, col, $index }">
      <el-switch
        @change="(val: boolean) => handleExportChange(row.colProp, val, $index)"
        v-model="row.isExport"
        v-bind="switchProps"
        disabled
      />
    </template>
    <template #isOrder="{ row, col, $index }">
      <el-switch
        @change="(val: boolean) => handleOrderChange(row.colProp, val, $index)"
        v-model="row.isOrder"
        v-bind="switchProps"
        disabled
      />
    </template>
  </BaseTable>
</template>
<!-- <div class="f-c-c mt-16">
    <BaseBtn @click="handleSave" :name="{ name: 'submit', btnText: '保存' }" />
    <BaseBtn @click="handleResetColSet" name="reset" />
</div> -->
<script lang="ts" setup>
import { ref } from "vue";
import BaseTable from "@/components/table/BaseTable.vue";
import { TableColAttrs } from "@/components/table/_types";
import { CommonObj, CommonSize } from "@/vite-env";
import config from "@/config";
import { showMessage } from "@/components/_utils";

const switchProps = {
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
    prop: "colName",
    label: "列名",
    minWidth: 110,
  },
  {
    prop: "isShow",
    label: "是否显示",
    minWidth: 70,
    type: "custom",
  },
  {
    prop: "isExport",
    label: "是否导出",
    minWidth: 70,
    type: "custom",
  },
  {
    prop: "isOrder",
    label: "是否排序",
    minWidth: 70,
    type: "custom",
  },
];
function handleSave() {
  showMessage("保存成功");
}
</script>
<style lang="scss" scoped></style>
