<!-- 页面-简介 -->
<!--
{ width?: string | number ; minWidth?: string | number ; label?: string ; prop?: string | [string, string] ;  headerAlign?: AlignType; ... 9 more ...; children?: TableColAttrs[]; }
{ width?: string | number; minWidth?: string | number; type?: string;  showOverflowTooltip?: boolean | Partial<Pick<ElTooltipProps, "placement" | ... 7 more ... | "showArrow">>; ... 35 more ...; style?: unknown; }
-->
<template>
  <template v-if="visible">
    <el-table-column v-bind="bindAttrs" v-if="type && ['index', 'selection'].includes(type)" />
    <template v-else>
      <el-table-column v-bind="bindAttrs" v-if="children?.length">
        <template #[key]="scope" v-for="(val, key) in getTableColSlots(col)" :key="key">
          <BaseRender :renderData="val" :scope="scope" />
          <template v-if="key === 'header'">
            <QuestionPopover :popover="quickAttrs?.popover" :size="size" v-if="quickAttrs?.popover" />
          </template>
        </template>
        <Column
          :col="subCol"
          :size="size"
          :refreshList="refreshList"
          :operateBtnsAttrs="operateBtnsAttrs"
          :getBtns="getBtns"
          :disabled="disabled"
          v-for="(subCol, subInd) in (children as TableColAttrs[])"
          :key="subInd"
        >
          <template #custom="scope">
            <slot name="children-custom" v-bind="scope" />
          </template>
        </Column>
      </el-table-column>
      <el-table-column v-bind="bindAttrs" v-else>
        <template #[key]="scope" v-for="(val, key) in getTableColSlots(col)" :key="key">
          <BaseRender :renderData="val" :scope="scope" />
          <template v-if="key === 'header'">
            <QuestionPopover :popover="quickAttrs?.popover" :size="size" v-if="quickAttrs?.popover" />
            <MarkIcon v-if="getShowMark(scope)" />
          </template>
        </template>
        <template #default="{ row, column, $index }">
          <slot v-bind="{ row, column, $index, col }" v-if="!type">
            <!-- 下面拆成两段写是为了formatter属性生效，在#default插槽中时，element-plus 的 formatter不会生效 -->
            <BaseRender :renderData="formatter(row, column, row[prop as string], $index)" v-if="formatter" />
            <template v-else>{{ renderValue(row[prop as string]) }}</template>
          </slot>
          <template v-else>
            <!-- 拖动排序列 -->
            <el-icon size="1.2em" v-if="type === 'sort'"><Sort /></el-icon>
            <BaseTag :value="row[prop as string]" v-bind="attrs" v-else-if="type === 'BaseTag'" />
            <BaseImg :src="row[prop as string]" v-bind="attrs" v-else-if="type === 'BaseImg'" />
            <BaseText v-bind="attrs" v-else-if="type === 'BaseText'">
              {{ renderValue(row[prop as string]) }}
            </BaseText>
            <BaseCopy :data="row" v-bind="attrs" v-else-if="type === 'BaseCopy'">
              {{ row[prop as string] }}
            </BaseCopy>
            <!-- 自定义列 -->
            <slot name="custom" v-bind="{ row, column, $index, col }" v-else-if="type === 'slot'" />
            <!-- 用户时间列（例：创建时间、修改时间） -->
            <UserTime :prop="prop" :data="row" v-bind="attrs" v-else-if="type === 'UserTime'" />
            <!-- 操作栏按钮列 -->
            <OperateBtns
              :size="size"
              :row="{ ...row, $index }"
              :btns="getBtns(row, $index)"
              v-bind="operateBtnsAttrs"
              @click="(...args) => handleClickGroupBtns(args, { row, col, $index })"
              v-else-if="type === 'operate'"
            />
            <!-- 内嵌自定义表单列，例：UserInfo -->
            <InsertCustomTableColComps
              :col="col"
              :row="{ ...row, $index }"
              v-else-if="getIsInnerComponent(type as InsertTableColCompsType)"
            />
            <!-- 内嵌表单控件列 -->
            <InnerExtendTableColComps :col="col" :row="{ ...row, $index }" :refreshList="refreshList" v-else />
          </template>
        </template>
      </el-table-column>
    </template>
  </template>
</template>
<script lang="ts" setup>
import { propsJoinChar, deleteAttrs, renderValue, getTableColSlots, defaultCommonSize, isOptimization } from "@/core/utils";
import { BtnItem } from "@/core/components/BaseBtn/_types";
import { TableColAttrs } from "@/core/components/table/_types";
import OperateBtns, { OperateBtnsAttrs } from "@/core/components/table/_components/OperateBtns.vue";
import InsertCustomTableColComps, { InsertTableColCompsType } from "@/config/_components/InsertCustomTableColComps.vue";
import InnerExtendTableColComps from "@/config/_components/InnerExtendTableColComps.vue";
import config from "@/config";
import { CommonObj, CommonSize, NextArgs } from "@/core/_types";
import { operateBtnsEmitName } from "..";
import UserTime from "./UserTime.vue";
import { Sort } from "@element-plus/icons-vue";
import QuestionPopover from "@/core/components/QuestionPopover.vue";
import MarkIcon from "@/core/components/MarkIcon.vue";
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
    getBtns: (row: CommonObj, rowInd: number) => BtnItem[];
  }>(),
  {
    size: defaultCommonSize,
    ...config?.BaseCrud?._components?.Column,
  }
);
const $emit = defineEmits([operateBtnsEmitName]);
const { type, prop, formatter, visible, children, attrs, quickAttrs } = toRefs(props.col);
const bindAttrs = deleteAttrs(props.col, ["children", "slots", "quickAttrs"]);

// 判断是否是内嵌的组件（外部扩展）
function getIsInnerComponent(type: InsertTableColCompsType) {
  const code = type.charCodeAt(0);
  return code >= 65 && code <= 90; // 大写字母
}
function handleClickGroupBtns(args: NextArgs, data: { row: CommonObj; col: TableColAttrs; $index: number }) {
  const [tpl, btnObj, next, e] = args;
  $emit(operateBtnsEmitName, btnObj, data, next, e);
}

// 是否标记（显示）未联调图标
function getShowMark(scope: CommonObj, markWidth = 20) {
  if (!getIsNoHandle(scope)) return false;
  // const { minWidth, width } = props.col;
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
  const { prop, type } = props.col;
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
