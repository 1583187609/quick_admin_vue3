<template>
  <el-table class="base-table" :data="rows" v-bind="newAttrs" ref="tableRef" v-if="newCols.length">
    <!-- :refreshList="refreshList"
      :groupBtnsAttrs="groupBtnsAttrs"
      :getGroupBtnsOfRow="getGroupBtnsOfRow"
      @groupBtn="onGroupBtn" -->
    <Column :col="col" :selection="selection" v-for="(col, cInd) in newCols" :key="cInd">
      <template #custom="{ row, col, ind }">
        <slot :name="col.prop" v-bind="{ row, col, $index: ind }"></slot>
      </template>
    </Column>
    <template #empty>
      <BaseEmpty />
    </template>
  </el-table>
</template>
<script lang="ts" setup>
import { merge } from "lodash";
import { ref, reactive, watchEffect } from "vue";
import { CommonObj } from "@/vite-env";
import Column from "@/components/BaseCrud/_components/Column.vue";
import { TableFieldAttrs } from "@/components/table";
import { needPushSpecialCol } from "@/components/BaseCrud";
import { getColLevel } from "@/components/table";
import { getSpecialColMap } from "@/components/table";
import { defaultTableAttrs, defaultColumnAttrs } from "@/components/table";
import { typeOf, handleTableSummary } from "@/utils";

const specialColMap = getSpecialColMap();
const props = withDefaults(
  defineProps<{
    cols: TableFieldAttrs[]; //表头
    rows: CommonObj[]; //表格行数据
    total?: number;
    pageAttrs?: CommonObj; //分页属性
    sort?: boolean; //是否显示排序列
    index?: boolean; //是否展示序号列
    selection?: boolean; //是否显示选择框
    sortable?: boolean; //是否启用排序
    showSummary?: boolean; //是否显示汇总行
    summaryMethod?: (arg: any) => string[]; //计算汇总的方法
  }>(),
  {
    cols: () => [],
    rows: () => [],
    summaryMethod: handleTableSummary,
  }
);
const tableRef = ref<any>();
const newAttrs = reactive(merge({}, defaultTableAttrs));
const newCols = ref<TableFieldAttrs[]>([]);
//调用stopWatch（），确保下面的方法只执行一次
const stopWatch = watchEffect(() => {
  const { cols } = props;
  needPushSpecialCol("index", props) && cols.unshift(specialColMap.index);
  needPushSpecialCol("sort", props) && cols.unshift(specialColMap.sort);
  needPushSpecialCol("selection", props) && cols.unshift(specialColMap.selection);
  needPushSpecialCol("operate", props) && cols.push(specialColMap.operate);
  const levels = cols.map(col => {
    if (typeOf(col) !== "Object") return 1;
    const { col: newCol, level } = getColLevel(col as TableFieldAttrs, 1, specialColMap, defaultColumnAttrs);
    newCols.value.push(newCol);
    return level;
  });
  // const maxLev = Math.max(...levels);
  // rowNum += maxLev - 1;
  // emits("update:cols", newCols.value);
});
stopWatch();
defineExpose({
  tableRef,
});
</script>
<style lang="scss" scoped>
// .base-table {
// :deep(.base-table .el-table__row) {
//   overscroll-behavior: auto;
// }
// }
</style>
