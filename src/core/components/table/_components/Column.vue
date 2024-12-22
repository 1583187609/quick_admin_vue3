<!-- 页面-简介 -->
<!--
{ width?: string | number ; minWidth?: string | number ; label?: string ; prop?: string | [string, string] ;  headerAlign?: AlignType; ... 9 more ...; children?: TableColAttrs[]; }
{ width?: string | number; minWidth?: string | number; type?: string;  showOverflowTooltip?: boolean | Partial<Pick<ElTooltipProps, "placement" | ... 7 more ... | "showArrow">>; ... 35 more ...; style?: unknown; }
-->
<template>
  <template v-if="newCol.visible">
    <el-table-column v-bind="bindAttrs" v-if="newCol.type && ['index', 'selection'].includes(newCol.type)" />
    <template v-else>
      <el-table-column v-bind="bindAttrs" v-if="newCol.children?.length">
        <template #[key]="scope" v-for="(val, key) in getTableColumnSlots(newCol, currPopover)" :key="key">
          <BaseRender :renderData="val" :scope="scope" />
          <template v-if="key === 'header'">
            <QuestionPopover :popover="currPopover" :size="size" v-if="currPopover" />
          </template>
        </template>
        <Column
          :col="subCol"
          :size="size"
          :refreshList="refreshList"
          :operateBtnsAttrs="operateBtnsAttrs"
          :getGroupBtnsByRow="getGroupBtnsByRow"
          :disabled="disabled"
          v-for="(subCol, subInd) in (newCol?.children as TableColAttrs[])"
          :key="subInd"
        >
          <template #custom="scope">
            <slot name="children-custom" v-bind="scope" />
          </template>
        </Column>
      </el-table-column>
      <el-table-column v-bind="bindAttrs" v-else>
        <template #[key]="scope" v-for="(val, key) in getTableColumnSlots(newCol, currPopover)" :key="key">
          <BaseRender :renderData="val" :scope="scope" />
          <template v-if="key === 'header'">
            <QuestionPopover :popover="currPopover" :size="size" v-if="currPopover" />
            <MarkIcon v-if="getShowMark(scope)" />
          </template>
        </template>
        <template #default="{ row, column, $index }">
          <slot v-bind="{ row, column, $index, col: newCol }" v-if="!newCol.type">
            <!-- 下面拆成两段写是为了formatter属性生效，在#default插槽中时，element-plus 的 formatter不会生效 -->
            <BaseRender :renderData="newCol.formatter(row, column, row[newCol.prop as string], $index)" v-if="newCol.formatter" />
            <template v-else>{{ renderValue(row[newCol.prop as string]) }}</template>
          </slot>
          <template v-else>
            <!-- 拖动排序列 -->
            <el-icon size="1.2em" v-if="newCol.type === 'sort'"><Sort /></el-icon>
            <BaseTag :value="row[newCol.prop as string]" v-bind="newCol.attrs" v-else-if="newCol.type === 'BaseTag'" />
            <BaseImg :src="row[newCol.prop as string]" v-bind="newCol.attrs" v-else-if="newCol.type === 'BaseImg'" />
            <BaseText v-bind="newCol.attrs" v-else-if="newCol.type === 'BaseText'">{{ renderValue(row[newCol.prop as string]) }}</BaseText>
            <BaseCopy :data="row" :text="row[newCol.prop as string]" v-bind="newCol.attrs" v-else-if="newCol.type === 'BaseCopy'" />
            <!-- 自定义列 -->
            <slot name="custom" v-bind="{ row, column, $index, col: newCol }" v-else-if="newCol.type === 'slot'" />
            <!-- 创建和修改列 -->
            <OperatorTime :prop="newCol.prop" :data="row" v-else-if="newCol.type === 'OperatorTime'" />
            <!-- 操作栏按钮列 -->
            <GroupBtns
              :size="size"
              :row="{ ...row, $index }"
              :btns="getGroupBtnsByRow(row, $index)"
              v-bind="operateBtnsAttrs"
              @click="(...args) => handleClickGroupBtns(args, { row, col: newCol, $index })"
              v-else-if="newCol.type === 'operate'"
            />
            <!-- 内嵌表单控件列 -->
            <InnerExtendTableColComps
              :col="newCol"
              :row="{ ...row, $index }"
              :quickAttrs="currQuickAttrs"
              :refreshList="refreshList"
              v-else-if="!isOptimization && formItemTypes.includes(newCol.type)"
            />
            <!-- 内嵌自定义表单列 -->
            <InsertCustomTableColComps :col="newCol" :row="{ ...row, $index }" v-else />
          </template>
        </template>
      </el-table-column>
    </template>
  </template>
</template>
<script lang="ts" setup>
import { propsJoinChar, deleteAttrs, renderValue, getTableColumnSlots } from "@/core/utils";
import { BtnItem, BtnName, EndBtnItem } from "@/core/components/BaseBtn/_types";
import { TableColAttrs } from "@/core/components/table/_types";
import GroupBtns, { OperateBtnsAttrs } from "@/core/components/table/_components/GroupBtns.vue";
import InsertCustomTableColComps from "@/config/_components/InsertCustomTableColComps.vue";
import InnerExtendTableColComps from "@/config/_components/InnerExtendTableColComps.vue";
import config from "@/config";
import { CommonObj, FinallyNext, PopoverType } from "@/core/_types";
import { defaultCommonSize } from "@/core/utils";
import { CommonSize, PopoverAttrs, PopoverSlots } from "@/core/_types";
import { operateBtnsEmitName } from "..";
import OperatorTime from "./OperatorTime.vue";
import { isOptimization } from "@/core/utils";
import { Sort } from "@element-plus/icons-vue";
import QuestionPopover from "@/core/components/QuestionPopover.vue";
import MarkIcon from "@/core/components/MarkIcon.vue";
import { formItemTypes } from "@/core/components/form/_components/FormItem/_config";

export type RefreshListFn = (cb?: () => void) => void;
export interface RowBtnInfo {
  row: CommonObj;
  col: TableColAttrs;
  $index: number;
}
const props = withDefaults(
  defineProps<{
    col: TableColAttrs;
    size?: CommonSize;
    disabled?: boolean;
    compact?: boolean; //是否紧凑
    refreshList?: RefreshListFn;
    operateBtnsAttrs?: OperateBtnsAttrs;
    getGroupBtnsByRow: (row: CommonObj, rowInd: number) => BtnItem[];
  }>(),
  Object.assign(
    {
      size: defaultCommonSize,
    },
    config?.BaseCrud?._components?.Column
  )
);
const $emit = defineEmits([operateBtnsEmitName, "update:colAttrs"]);
let currPopover: PopoverType;
let currQuickAttrs: any;

const newCol = getNewCol(props.col);
const bindAttrs = deleteAttrs(newCol, ["children", "slots"]);

// 获取新的列配置数据
function getNewCol(col: TableColAttrs) {
  currPopover = col.quickAttrs?.popover;
  currQuickAttrs = col.quickAttrs;
  delete col.quickAttrs; //popover属性只能绑定在 el-popover上，不然会触发 ElementPlus 的警告
  return col;
}
function handleClickGroupBtns(args: [BtnName, BtnItem, FinallyNext, Event], data: { row: CommonObj; col: TableColAttrs; $index: number }) {
  const [tpl, btnObj, next, e] = args;
  $emit("operateBtns", btnObj, data, next, e);
}

// 是否标记（显示）未联调图标
function getShowMark(scope: CommonObj, markWidth = 20) {
  if (!getIsNoHandle(scope)) return false;
  // const { minWidth, width } = newCol;
  // const obj: TableColAttrs = {};
  // if (minWidth !== undefined) {
  //   obj.minWidth = Number(minWidth) + markWidth;
  // }
  // if (width !== undefined) {
  //   obj.width = Number(width) + markWidth;
  // }
  // $emit("update:colAttrs", obj);
  return true;
  // return false;
}
// 该列是否标记为未联调
function getIsNoHandle(scope: CommonObj) {
  if (isOptimization) return false;
  const { _self } = scope;
  const { type, prop } = newCol;
  if ((prop as string).startsWith("$") || type === "slot") return false;
  if (!_self.data?.length) return false;
  const row = _self.data[0];
  if (prop?.includes(propsJoinChar)) {
    return (prop as string).split(propsJoinChar).some(key => typeof row[key] === "undefined");
  } else if (prop?.includes(".")) {
    const keys = (prop as string).split(".");
    let data: CommonObj = row;
    for (const key of keys) {
      data = row[key];
      if (typeof data === "undefined") return true;
    }
    return false;
  }
  return row?.[prop as string] === undefined;
}
</script>
<style lang="scss" scoped></style>
