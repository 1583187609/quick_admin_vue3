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
      :refreshList="refreshList"
      :operateBtnsAttrs="operateBtnsAttrs"
      :getGroupBtnsByRow="(row: CommonObj, ind: number) => getGroupBtnsOfRow(row, ind, props, newCols.at(-1), (width)=>(newCols.at(-1)!.width=width))"
      @operateBtns="onOperateBtns"
      @update:colAttrs="(colAttrs: TableColAttrs)=>handleUpdateCol(colAttrs, cInd)"
      :disabled="disabled"
      v-for="(col, cInd) in newCols"
      :key="cInd"
    >
      <template #custom="{ row, col: c, $index: ind }">
        <slot name="custom" v-bind="{ row, col: c, $index: ind }" />
      </template>
      <template #children-custom="{ row, col: c, $index: ind }">
        <slot name="children-custom" v-bind="{ row, col: c, $index: ind }" />
      </template>
    </Column>
    <template #empty v-if="!loading">
      <BaseEmpty />
    </template>
  </el-table>
</template>
<script lang="ts" setup>
import { ref, computed, reactive } from "vue";
import { OperateBtnsAttrs, OperateBtnsType } from "@/core/components/table/_components/GroupBtns.vue";
import { BtnItem } from "@/core/components/BaseBtn/_types";
import { handleTableSummary } from "@/core/utils";
import { useCacheScroll } from "@/hooks";
import { CommonObj, CommonSize, FinallyNext } from "@/core/_types";
import Column, { RefreshListFn, RowBtnInfo } from "@/core/components/table/_components/Column.vue";
import { defaultTableAttrs, getHandleCols, operateBtnsEmitName } from "@/core/components/table";
import { TableColAttrs } from "@/core/components/table/_types";
import { getGroupBtnsOfRow } from "@/core/components/table/_utils";
import { defaultCommonSize } from "@/core/utils";
import config from "@/config";

const props = withDefaults(
  defineProps<{
    cols: TableColAttrs[]; //表头
    rows: CommonObj[]; //表格行数据
    size?: CommonSize;
    compact?: boolean; //是否紧凑
    operateBtns?: OperateBtnsType;
    operateBtnsAttrs?: OperateBtnsAttrs;
    disabled?: boolean;
    loading?: boolean;
    showSummary?: boolean; //是否显示汇总行
    currPage: number; //当前分页页码
    pageSize: number; //每页多少条
    refreshList?: RefreshListFn;
    summaryMethod?: (arg: any) => string[]; //计算汇总的方法
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
const $emit = defineEmits(["update:cols", "selectionChange", operateBtnsEmitName, "change"]);
const { handleScroll } = useCacheScroll();
let rowNum = props.showSummary ? 2 : 1;
const tableRef = ref<any>(null);
const seledRows = ref<CommonObj[]>([]);

/**
 * 弹窗标题高度 +  分页组件高度 + 分页组件margin-top + el-dialog__body上下padding + el-table头部高度
 * 55+32+8+16*2+40+3 = 55+40+32+40+3 = 95+75 = 170
 * 216px 170px
 */
const newCols = reactive<TableColAttrs[]>(
  getHandleCols(props, (maxLev: number, cols: TableColAttrs[]) => {
    rowNum += maxLev - 1;
    $emit("update:cols", cols);
  })
);

const newAttrs = computed(() => {
  const { showSummary, summaryMethod } = props;
  return Object.assign(
    {
      maxHeight: `calc(100% + ${rowNum * 40}px)`,
      cellClassName(res: CommonObj) {
        const { row, column, rowIndex, columnIndex } = res;
        if (column.type === "sort") return "sort-cell";
      },
    },
    defaultTableAttrs,
    { showSummary, summaryMethod }
  );
});

function onOperateBtns(btnObj: BtnItem, { row, col, $index }: RowBtnInfo, next: FinallyNext) {
  $emit(operateBtnsEmitName, btnObj, { $index, ...row }, next);
}
function handleUpdateCol(colAttrs: TableColAttrs, ind: number) {
  Object.assign(newCols[ind], colAttrs);
}
//当选择项发生变化时会触发该事件
function handleSelectionChange(rows: CommonObj[]) {
  seledRows.value = rows;
  const keys = rows.map(it => it[newAttrs.value.rowKey]);
  $emit("selectionChange", rows, keys);
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
