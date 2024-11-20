<!-- summary
  目标：定位为基础表格。继承el-table属性，并扩展功能：内嵌组件(系统内置、业务需求内嵌)、默认列宽度和属性、快捷属性quickAttrs: popover。
-->
<template>
  <el-table v-bind="defaultTableAttrs" class="base-table" :data="rows" :size="size" ref="tableRef">
    <Column
      :col="col"
      :size="size"
      @operateBtns="onOperateBtns"
      :operateBtnsAttrs="operateBtnsAttrs"
      :getGroupBtnsByRow="(row: CommonObj, ind: number) => getGroupBtnsOfRow(row, ind, props, newCols.at(-1), (width)=>(newCols.at(-1)!.width=width))"
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
import { ref, reactive } from "vue";
import { CommonObj, CommonSize, FinallyNext } from "@/vite-env";
import Column, { RowBtnInfo } from "@/core/components/table/_components/Column.vue";
import { TableColAttrs } from "@/core/components/table/_types";
import { defaultTableAttrs, operateBtnsEmitName, getHandleCols } from "@/core/components/table";
import { handleTableSummary } from "@/core/utils";
import { BtnItem } from "@/core/components/BaseBtn/_types";
import { OperateBtnsAttrs } from "@/core/components/table/_components/GroupBtns.vue";
import { ClosePopupType } from "@/core/components/BasicPopup/_types";
import { getGroupBtnsOfRow } from "./_utils";
import { defaultCommonSize } from "@/core/utils";
import { FilterByAuthFn } from "../crud/BaseCrud/_types";

const props = withDefaults(
  defineProps<{
    cols: TableColAttrs[]; //表头
    rows?: CommonObj[]; //表格行数据
    size?: CommonSize;
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
    operateBtns: () => [],
    summaryMethod: handleTableSummary,
  }
);
const $emit = defineEmits([operateBtnsEmitName]);

let rowNum = props.showSummary ? 2 : 1;
const tableRef = ref<any>();
const newCols = reactive<TableColAttrs[]>(
  getHandleCols(props, (maxLev: number) => {
    rowNum += maxLev - 1;
  })
);
//点击操作栏按钮
function onOperateBtns(btnObj: BtnItem, { row, col, $index }: RowBtnInfo, next: FinallyNext, isRefreshList: boolean = true) {
  const { name } = btnObj;
  $emit(operateBtnsEmitName, name, { $index, ...row }, (hint?: string, closeType?: ClosePopupType, cb?: () => void) => {
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
  max-height: 100%;
  width: 100%;
}
</style>
