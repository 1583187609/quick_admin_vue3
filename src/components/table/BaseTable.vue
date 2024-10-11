<!-- summary
  基础表格
-->
<template>
  <el-table class="base-table" :data="rows" v-bind="defaultTableAttrs" :size="size" ref="tableRef">
    <Column
      :col="col"
      :size="size"
      :selectable="!!selectable"
      @operateBtns="onOperateBtns"
      :operateBtnsAttrs="operateBtnsAttrs"
      :getGroupBtnsByRow="(row: CommonObj, ind: number)=>getGroupBtnsOfRow(row,ind,props,newCols)"
      v-for="(col, cInd) in newCols"
      :key="cInd"
    >
      <template #header="scope">
        <slot name="header" v-bind="scope">{{ scope.column.label }}</slot>
      </template>
      <template #default="scope">
        <slot v-bind="scope">{{ scope.row[scope.col.prop as string] }}</slot>
      </template>
      <template #custom="{ row, col: c, $index: ind }">
        <slot :name="c.prop" v-bind="{ row, col: c, $index: ind }" />
      </template>
    </Column>
    <template #empty>
      <BaseEmpty />
    </template>
  </el-table>
</template>
<script lang="ts" setup>
import { ref, reactive, watchEffect } from "vue";
import { CommonObj, CommonSize, FinallyNext } from "@/vite-env";
import Column, { RowBtnInfo } from "@/components/table/_components/Column.vue";
import { TableColAttrs, TableDragSortType, TableIndexType, TableSelectableType } from "@/components/table/_types";
import { getColLevel, defaultTableAttrs } from "@/components/table";
import { typeOf, handleTableSummary } from "@/components/_utils";
import { BtnItem } from "@/components/BaseBtn/_types";
import { OperateBtnsAttrs } from "@/components/table/_components/GroupBtns.vue";
import { ClosePopupType } from "@/components/BasicPopup/_types";
import { getGroupBtnsOfRow, getAddSpecialCols } from "./_utils";
import { defaultCommonSize } from "@/components/_utils";
import { FilterByAuthFn } from "../crud/BaseCrud/_types";

const props = withDefaults(
  defineProps<{
    cols: TableColAttrs[]; //表头
    rows?: CommonObj[]; //表格行数据
    size?: CommonSize;
    selectable?: TableSelectableType; //是否显示选择框
    dragSortable?: TableDragSortType; //是否显示排序列
    showSummary?: boolean; //是否显示汇总行
    operateBtnsAttrs?: OperateBtnsAttrs;
    summaryMethod?: (arg: any) => string[]; //计算汇总的方法
    filterBtnsByAuth?: (btns: BtnItem[], filterByAuth?: FilterByAuthFn) => BtnItem[];
    operateBtns?: BtnItem[];
  }>(),
  {
    size: defaultCommonSize,
    cols: () => [],
    rows: () => [],
    summaryMethod: handleTableSummary,
  }
);
const emits = defineEmits(["operateBtns"]);

const tableRef = ref<any>();
const newCols = reactive<TableColAttrs[]>([]);
//调用stopWatch（），确保下面的方法只执行一次
const stopWatch = watchEffect(() => {
  const levels = getAddSpecialCols(props).map(col => {
    if (typeOf(col) !== "Object") return 1;
    const { col: newCol, level } = getColLevel(col as TableColAttrs, 1);
    newCols.push(newCol);
    return level;
  });
  // const maxLev = Math.max(...levels);
  // rowNum += maxLev - 1;
  // emits("update:cols", newCols);
});
stopWatch();

// function onOperateBtns(btnObj: BtnItem, { row, col, $index }: RowBtnInfo, next: FinallyNext) {
//   emits("operateBtns", btnObj, { $index, ...row }, next);
// }

//点击操作栏按钮
function onOperateBtns(btnObj: BtnItem, { row, col, $index }: RowBtnInfo, next: FinallyNext, isRefreshList: boolean = true) {
  const { name } = btnObj;
  emits("operateBtns", name, { $index, ...row }, (hint?: string, closeType?: ClosePopupType, cb?: () => void) => {
    next(hint, closeType, cb);
    // isRefreshList && refreshList();
  });
}
defineExpose({
  tableRef,
});
</script>
<style lang="scss" scoped>
.base-table {
  height: 100%;
  width: 100%;
}
</style>
