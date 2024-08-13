<!-- header-row-class-name="header-bg" -->
<!-- :header-row-style="{ background: 'green !important' }" -->
<template>
  <el-table
    class="query-table"
    :data="rows"
    :size="size"
    v-loading="loading"
    @selection-change="handleSelectionChange"
    @scroll.capture="handleScroll"
    v-bind="newAttrs"
    ref="tableRef"
  >
    <Column
      :col="col"
      :size="size"
      :compact="compact"
      :selection="!!selection"
      :refreshList="refreshList"
      :operateBtnsAttrs="operateBtnsAttrs"
      :getGroupBtnsOfRow="(row: CommonObj, ind: number)=>getGroupBtnsOfRow(row,ind,props,newCols)"
      @operateBtns="onOperateBtns"
      :disabled="disabled"
      v-for="(col, cInd) in newCols"
      :key="cInd"
    >
      <template #custom="{ row, col: c, $index: ind }">
        <slot name="custom" v-bind="{ row, col: c, $index: ind }"></slot>
      </template>
    </Column>
    <template #empty v-if="!loading">
      <BaseEmpty />
    </template>
  </el-table>
</template>
<script lang="ts" setup>
import { ref, computed, watchEffect, reactive } from "vue";
import { OperateBtnsAttrs } from "@/components/table/_components/GroupBtns.vue";
import { BtnItem } from "@/components/BaseBtn/_types";
import { typeOf, handleTableSummary } from "@/components/_utils";
import { useCacheScroll } from "@/hooks";
import { OperateBtnsType } from "@/components/table/_components/GroupBtns.vue";
import { CommonObj, FinallyNext } from "@/vite-env";
import Column, { RefreshListFn, RowBtnInfo } from "@/components/table/_components/Column.vue";
import {  defaultTableAttrs, getColLevel, specialColMap } from "@/components/table";
import { TableColAttrs, TableCol } from "@/components/table/_types";
import config from "@/config";
import { getGroupBtnsOfRow, getAddSpecialCols } from "@/components/table/_utils";
import { defaultCommonSize } from "@/components/_utils";

const props = withDefaults(
  defineProps<{
    cols: TableCol[]; //表头
    rows: CommonObj[]; //表格行数据
    size?: CommonSize;
    compact?: boolean; //是否紧凑
    operateBtns?: OperateBtnsType;
    operateBtnsAttrs?: OperateBtnsAttrs;
    sort?: boolean | TableColAttrs; //是否显示排序列
    index?: boolean | TableColAttrs; //是否展示序号列
    selection?: boolean | TableColAttrs; //是否显示选择框
    disabled?: boolean;
    loading?: boolean;
    showSummary?: boolean; //是否显示汇总行
    currPage: number; //当前分页页码
    pageSize: number; //每页多少条
    refreshList?: RefreshListFn;
    summaryMethod?: (arg: any) => string[]; //计算汇总的方法
    filterBtnsByAuth: (btns: BtnItem[]) => BtnItem[];
  }>(),
  Object.assign(
    {
      cols: () => [],
      rows: () => [],
      size: defaultCommonSize,
      summaryMethod: handleTableSummary,
    },
    config?.BaseCrud?._components?.QueryTable
  )
);
const emits = defineEmits(["update:cols", "selectionChange", "operateBtns", "change"]);
const { handleScroll } = useCacheScroll();
let rowNum = props.showSummary ? 2 : 1;
const tableRef = ref<any>(null);
const seledRows = ref<CommonObj[]>([]);
/**
 * 弹窗标题高度 +  分页组件高度 + 分页组件margin-top + el-dialog__body上下padding + el-table头部高度
 * 55+32+8+16*2+40+3 = 55+40+32+40+3 = 95+75 = 170
 * 216px 170px
 */
const newCols = reactive<TableColAttrs[]>([]);
//调用stopWatch（），确保下面的方法只执行一次
const stopWatch = watchEffect(() => {
  const levels = getAddSpecialCols(props).map(col => {
    if (typeOf(col) !== "Object") return 1;
    const { col: newCol, level } = getColLevel(col as TableColAttrs, 1, specialColMap, props.size);
    newCols.push(newCol);
    return level;
  });
  const maxLev = Math.max(...levels);
  rowNum += maxLev - 1;
  emits("update:cols", newCols);
});
stopWatch();
const newAttrs = computed(() => {
  const { showSummary, summaryMethod } = props;
  return Object.assign(
    {
      maxHeight: `calc(100% + ${rowNum * 40}px)`,
      cellClassName(res: CommonObj) {
        if (res.column.property === "$sort") return "sort-cell";
      },
    },
    defaultTableAttrs,
    { showSummary, summaryMethod }
  );
});
// 处理列设置的逻辑
// watch(
//   () => props.cols,
//   (newVal: any) => {
//     newCols.value = newVal;
//   },
//   { immediate: false }
// );
function onOperateBtns(btnObj: BtnItem, { row, col, $index }: RowBtnInfo, next: FinallyNext) {
  emits("operateBtns", btnObj, { $index, ...row }, next);
}
//当选择项发生变化时会触发该事件
function handleSelectionChange(rows: CommonObj[]) {
  seledRows.value = rows;
  const keys = rows.map(it => it[newAttrs.value.rowKey]);
  emits("selectionChange", rows, keys);
}
/**
 * 暴露的方法
 * @link 参考：https://juejin.cn/post/6844903864039145485
 * @link 参考：https://blog.csdn.net/qq_26018335/article/details/127348107
 */
defineExpose({
  //全不选
  clearSelection() {
    return tableRef?.value?.clearSelection();
  },
  //全选
  allSelection() {
    return tableRef?.value?.toggleAllSelection();
  },
  //反选
  invertSelection() {
    // console.log(
    //   tableRef.value.getSelectionRows(),
    //   "点击反选按钮-暴露出来的-----------------"
    // );
    seledRows?.value?.forEach((row, ind) => {
      tableRef?.value?.toggleRowSelection(row, false);
    });
  },
  ...tableRef.value,
});
</script>
<style lang="scss" scoped>
.query-table {
  border-radius: $radius-heavy;
  @include shadow-main();
}
.sort-icon {
  cursor: move;
  font-weight: 500;
}
</style>
