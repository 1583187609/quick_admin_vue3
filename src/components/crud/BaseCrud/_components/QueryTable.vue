<!-- header-row-class-name="header-bg" -->
<!-- :header-row-style="{ background: 'green !important' }" -->
<template>
  <el-table
    class="query-table"
    :data="rows"
    v-loading="loading"
    @selection-change="handleSelectionChange"
    @scroll.capture="handleScroll"
    v-bind="newAttrs"
    ref="tableRef"
    v-if="newCols.length"
  >
    <Column
      :col="col"
      :selection="selection"
      :refreshList="refreshList"
      :groupBtnsAttrs="groupBtnsAttrs"
      :getGroupBtnsOfRow="getGroupBtnsOfRow"
      @groupBtn="onGroupBtn"
      :disabled="disabled"
      v-for="(col, cInd) in newCols"
      :key="cInd"
    >
      <template #custom="{ row, col: c, ind }">
        <slot name="custom" v-bind="{ row, col: c, $index: ind }"></slot>
      </template>
    </Column>
    <template #empty v-if="!loading">
      <BaseEmpty />
    </template>
  </el-table>
</template>
<script lang="ts" setup>
import { ref, computed, watchEffect, useAttrs, reactive } from "vue";
import { GroupBtnsAttrs } from "./GroupBtns.vue";
import { BaseBtnType, BtnItem, getBtnObj } from "@/components/BaseBtn";
import { typeOf, handleTableSummary, defaultGroupBtnsMaxNum, getChinaCharLength } from "@/components/_utils";
import { useCacheScroll } from "@/hooks";
import { GroupBtnsType } from "@/components/crud/BaseCrud/_components/GroupBtns.vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import Column, { RefreshListFn, RowBtnInfo } from "@/components/crud/BaseCrud/_components/Column.vue";
import { needPushSpecialCol } from "@/components/crud/BaseCrud";
import { getTempGroupBtnsOfRow } from "@/components/crud/BaseCrud";
import { TableColAttrs, TableField, defaultTableAttrs, getColLevel, getSpecialColMap } from "@/components/table";
import config from "@/config";

const props = withDefaults(
  defineProps<{
    tableAttrs?: CommonObj; //ElementPlus 表格的属性
    groupBtnsAttrs?: GroupBtnsAttrs;
    loading?: boolean;
    cols: TableField[]; //表头
    rows: CommonObj[]; //表格行数据
    groupBtns?: GroupBtnsType;
    sort?: boolean; //是否显示排序列
    index?: boolean; //是否展示序号列
    disabled?: boolean;
    selection?: boolean; //是否显示选择框
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
      summaryMethod: handleTableSummary,
    },
    config?.BaseCrud?._components?.QueryTable
  )
);
const emits = defineEmits(["update:cols", "selectionChange", "groupBtn", "change"]);
const $attrs = useAttrs();
const { handleScroll } = useCacheScroll();
let operateWidth = 0; //操作栏的宽度
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
  const { cols, currPage, pageSize } = props;
  const specialColMap = getSpecialColMap(currPage, pageSize);
  const { index, sort, selection, operate } = specialColMap;
  needPushSpecialCol("index", props) && cols.unshift(index);
  needPushSpecialCol("sort", props) && cols.unshift(sort);
  needPushSpecialCol("selection", props) && cols.unshift(selection);
  needPushSpecialCol("operate", props) && cols.push(operate);
  const levels = cols.map(col => {
    if (typeOf(col) !== "Object") return 1;
    const { col: newCol, level } = getColLevel(col as TableColAttrs, 1, specialColMap, $attrs.size === "small");
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
function onGroupBtn(btnObj: BtnItem, { row, col, $index }: RowBtnInfo, next: FinallyNext) {
  emits("groupBtn", btnObj, { $index, ...row }, next);
}
//当选择项发生变化时会触发该事件
function handleSelectionChange(rows: CommonObj[]) {
  seledRows.value = rows;
  const keys = rows.map(it => it[newAttrs.value.rowKey]);
  emits("selectionChange", rows, keys);
}
// 获取每一行的分组按钮
function getGroupBtnsOfRow(row: CommonObj, ind: number) {
  const { groupBtns = [], rows, filterBtnsByAuth } = props;
  const tempBtns = getTempGroupBtnsOfRow(row, ind, groupBtns);
  const filterBtns = filterBtnsByAuth(tempBtns);
  const width = getOperateColWidth(filterBtns);
  if (ind < rows.length - 1) {
    if (operateWidth < width) {
      operateWidth = width;
      newCols.slice(-1)[0].minWidth = operateWidth;
    }
  } else {
    //如果操作栏没有按钮，则按照最小宽度展示操作栏，例如新增按钮
    if (operateWidth < 30) {
      operateWidth = getOperateColWidth();
      newCols.slice(-1)[0].minWidth = operateWidth;
    }
  }
  return filterBtns;
}
//获取操作栏的宽度
function getOperateColWidth(btns?: BtnItem[]): number {
  //按钮size为default时
  // const fontSize = 12;
  // const btnPadding = 11;
  // const btnMargin = 12;
  // const cellPadding = 12;
  //按钮size为small时
  const fontSize = 12;
  const btnPadding = 3;
  const btnMargin = 12;
  const cellPadding = 12;
  //最小宽度
  if (!btns) return 3 * fontSize + 1 * btnPadding * 2 + cellPadding * 2;
  let em = 0; //按钮文字字符数量
  let width = 0;
  const { groupBtnsAttrs = {} } = props;
  const { vertical, maxNum = defaultGroupBtnsMaxNum } = groupBtnsAttrs as GroupBtnsAttrs;
  if (btns.length > maxNum) {
    btns = btns.slice(0, maxNum - 1).concat([{ text: "更多" } as BtnItem]);
  }
  if (vertical) {
    btns.forEach((item: BtnItem) => {
      // if (!item) return; //已经过滤过了，所以注释掉
      em = getChinaCharLength(item.text) + 1; //文字加图标 (全角符算1个，半角符算0.5个字符)
      const currWidth = em * fontSize + btnPadding * 2 + cellPadding * 2; //字符的宽度 + 按钮左右padding值 + 各个按钮之间的margin值 + 单元格的左右padding值
      if (currWidth > width) {
        width = currWidth;
      }
    });
  } else {
    btns.forEach((item: BtnItem) => {
      // if (!item) return; //已经过滤过了，所以注释掉
      em += getChinaCharLength(item.text) + 1; //文字加图标 (全角符算1个，半角符算0.5个字符)
    });
    width = em * fontSize + btns.length * btnPadding * 2 + (btns.length - 1) * btnMargin + cellPadding * 2; //字符的宽度 + 按钮左右padding值 + 各个按钮之间的margin值 + 单元格的左右padding值
  }
  return width;
}
//暴露的方法
//参考：https://juejin.cn/post/6844903864039145485
//参考：https://blog.csdn.net/qq_26018335/article/details/127348107
defineExpose({
  tableRef,
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
