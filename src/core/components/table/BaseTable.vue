<!-- summary
  目标：定位为基础表格。继承el-table属性，并扩展功能：内嵌组件(系统内置、业务需求内嵌)、默认列宽度和属性、快捷属性quickAttrs: popover。
-->
<template>
  <el-table class="base-table" v-bind="defaultTableAttrs" v-loading="loading" :data="data" ref="tableRef">
    <Column
      :col="col"
      :operateBtnsAttrs="operateBtnsAttrs"
      :getBtns="(row: CommonObj, ind: number) => getOperateBtns(row, ind, props)"
      @operateBtns="onOperateBtns"
      v-for="(col, cInd) in newCols"
      :key="cInd"
    />
    <template #empty>
      <BaseEmpty />
    </template>
  </el-table>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { CommonObj, FinallyNext } from "@/core/_types";
import Column, { RowBtnInfo } from "@/core/components/table/_components/Column.vue";
import { TableColAttrs } from "@/core/components/table/_types";
import { defaultTableAttrs, operateBtnsEmitName, getHandleCols } from "@/core/components/table";
import { handleTableSummary } from "@/core/utils";
import { BtnItem } from "@/core/components/BaseBtn/_types";
import { OperateBtnsAttrs } from "@/core/components/table/_components/OperateBtns.vue";
import { getOperateBtns } from "./_utils";
import { HandleButtonAuth } from "../crud/BaseCrud/_types";

const props = withDefaults(
  defineProps<{
    /**
     * 基础属性
     */
    cols: TableColAttrs[]; // 表头
    data?: CommonObj[]; // 表格行数据
    loading?: boolean; // 是否处于加载中
    /**
     * 处理过的属性
     */
    showSummary?: boolean; // 是否显示汇总行
    summaryMethod?: (arg: any) => string[]; //计算汇总的方法
    getHandleAuthBtns?: (btns: BtnItem[], handleAuth?: HandleButtonAuth) => BtnItem[];
    /**
     * 操作栏属性
     */
    operateBtns?: BtnItem[];
    operateBtnsAttrs?: OperateBtnsAttrs;
  }>(),
  {
    cols: () => [],
    data: () => [],
    operateBtns: () => [],
    summaryMethod: handleTableSummary,
  }
);
const $emit = defineEmits([operateBtnsEmitName]);

let rowNum = props.showSummary ? 2 : 1;
const tableRef = ref<any>();
const newCols = reactive<TableColAttrs[]>(
  getHandleCols(props, (maxLev: number, cols: any[]) => {
    rowNum += maxLev - 1;
    // console.log(cols, "cols------------");
  })
);
//点击操作栏按钮
function onOperateBtns(btnObj: BtnItem, { row, col, $index }: RowBtnInfo, next: FinallyNext, e: Event) {
  const { name } = btnObj;
  $emit(operateBtnsEmitName, name, { $index, ...row }, next, e);
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
