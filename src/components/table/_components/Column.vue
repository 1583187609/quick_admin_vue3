<!-- 页面-简介 -->
<!--
{ width?: string | number ; minWidth?: string | number ; label?: string ; prop?: string | [string, string] ;  headerAlign?: AlignType; ... 9 more ...; children?: TableColAttrs[]; }
{ width?: string | number; minWidth?: string | number; type?: string;  showOverflowTooltip?: boolean | Partial<Pick<ElTooltipProps, "placement" | ... 7 more ... | "showArrow">>; ... 35 more ...; style?: unknown; }
-->
<template>
  <template v-if="newCol.visible">
    <el-table-column v-bind="newCol" v-if="newCol.type && ['index', 'selection'].includes(newCol.type)" />
    <template v-else>
      <el-table-column v-bind="deleteAttrs(newCol, ['children'])" v-if="newCol.children?.length">
        <Column
          :col="subCol"
          :size="size"
          :refreshList="refreshList"
          :operateBtnsAttrs="operateBtnsAttrs"
          :getGroupBtnsByRow="getGroupBtnsByRow"
          :disabled="disabled"
          v-for="(subCol, subInd) in newCol?.children"
          :key="subInd"
        />
      </el-table-column>
      <template v-else>
        <!-- 下面拆成两段写是为了formatter属性生效，在#default插槽中时，element-plus 的 formatter不会生效 -->
        <el-table-column v-bind="newCol" v-if="newCol.formatter">
          <template #header="scope">
            <slot name="header" v-bind="{ ...scope, col: newCol }">
              <BaseRender
                :data="newCol._label ?? devErrorTips(scope.column.label, getIsMarkNoHandle(scope._self, scope.column, newCol) ? undefined : '')"
              />
              <QuestionPopover
                :popover="popoverAttrs"
                :type="getIsMarkNoHandle(scope._self, scope.column, newCol) ? 'danger' : 'info'"
                v-if="popoverAttrs"
              />
            </slot>
          </template>
        </el-table-column>
        <el-table-column v-bind="newCol" v-else>
          <template #header="scope">
            <slot name="header" v-bind="{ ...scope, col: newCol }">
              <BaseRender
                :data="newCol._label ?? devErrorTips(scope.column.label, getIsMarkNoHandle(scope._self, scope.column, newCol) ? undefined : '')"
              />
              <QuestionPopover
                :popover="popoverAttrs"
                :type="getIsMarkNoHandle(scope._self, scope.column, newCol) ? 'danger' : 'info'"
                v-if="popoverAttrs"
              />
            </slot>
          </template>
          <template #default="{ row, column, $index }">
            <!-- <BaseRender
            :data="devErrorTips(newCol.prop as string)"
            v-if="!specialColKeys.includes(newCol.type) && row[newCol.prop as string] === undefined"
          /> -->
            <!-- <template v-else> -->
            <template v-if="!newCol.type">
              <slot v-bind="{ row, column, $index, col: newCol }">{{ renderValue(row[newCol.prop as string]) }}</slot>
            </template>
            <GroupBtns
              :size="size"
              :row="{ ...row, $index }"
              :btns="getGroupBtnsByRow?.(row, $index)"
              v-bind="operateBtnsAttrs"
              @click="(btnObj, next) => onOperateBtns(btnObj, { row, col: newCol, $index }, next)"
              v-else-if="newCol.type === 'operate'"
            />
            <el-icon size="1.2em" v-else-if="newCol.type === 'sort'">
              <Sort />
            </el-icon>
            <!-- id和备注列 -->
            <template v-else-if="['id', 'remark'].includes(newCol.type)">
              {{ renderValue(row?.[newCol.prop as string]) }}
            </template>
            <!-- 自定义列 -->
            <slot name="custom" v-bind="{ row, column, $index, col: newCol }" v-else-if="newCol.type === 'custom'" />
            <!-- 创建和修改列（后面再考虑优化） -->
            <template v-else-if="['create', 'update'].includes(newCol.type)">
              <!-- {{ getSplitPropsVal(row, newCol.prop) }} -->
              <template v-if="newCol.prop?.includes(propsJoinChar)">
                <div>
                  <BaseRender :data="getCreateOrUpdateText(row, newCol.prop as string, 0) " />
                </div>
                <div>
                  <BaseRender :data="getCreateOrUpdateText(row, newCol.prop as string, 1) " />
                </div>
              </template>
              <template v-else>
                {{ renderValue(row?.[newCol.prop as string]) }}
              </template>
            </template>
            <template v-else-if="newCol.type === 'switch'">
              <el-switch
                :modelValue="row[newCol.prop as string]"
                v-bind="deleteAttrs(newCol.attrs, ['onChange'])"
                @change="(val:StrNum | boolean)=>handleSwitchChange(newCol, row, $index)"
                v-if="newCol?.attrs?.fetch"
              />
              <el-switch v-model="row[newCol.prop as string]" v-bind="newCol.attrs" v-else />
            </template>
            <BaseTag :value="row[newCol.prop as string]" v-bind="newCol.attrs" v-else-if="newCol.type === 'BaseTag'" />
            <template v-else-if="newCol.type === 'BaseImg'">
              <BaseImg style="margin: 0 auto" :src="row[newCol.prop as string]" v-bind="newCol.attrs" v-if="row[newCol.prop as string]" />
              <template v-else>-</template>
            </template>
            <BaseText v-bind="newCol.attrs" v-else-if="newCol.type === 'BaseText'">
              {{ renderValue(row[newCol.prop as string]) }}
            </BaseText>
            <BaseCopy :data="row" :text="row[newCol.prop as string]" v-bind="newCol.attrs" v-else-if="newCol.type === 'BaseCopy'" />
            <CustomSpecialTableCols :row="row" :col="newCol" v-else />
            <!-- </template> -->
          </template>
        </el-table-column>
      </template>
    </template>
  </template>
</template>
<script lang="ts" setup>
import { propsJoinChar, deleteAttrs, devErrorTips, showMessage, renderValue, getVNodeInnerText } from "@/components/_utils";
import { BtnItem } from "@/components/BaseBtn/_types";
import { TableColAttrs } from "@/components/table/_types";
import GroupBtns, { OperateBtnsAttrs } from "@/components/table/_components/GroupBtns.vue";
import CustomSpecialTableCols from "@/config/_components/CustomSpecialTableCols.vue";
import config from "@/config";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import QuestionPopover from "@/components/QuestionPopover.vue";
import { defaultCommonSize } from "@/components/_utils";
import { CommonSize, PopoverAttrs, PopoverSlots } from "@/components/_types";
import { operateBtnsEmitName, specialColKeys } from "..";
import { isOptimization } from "@/components/_utils";
import { Sort } from "@element-plus/icons-vue";

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
    getGroupBtnsByRow?: (row: CommonObj, rowInd: number) => BtnItem[];
  }>(),
  Object.assign(
    {
      size: defaultCommonSize,
    },
    config?.BaseCrud?._components?.Column
  )
);
const $emit = defineEmits([operateBtnsEmitName]);
let popoverAttrs: PopoverAttrs | PopoverSlots | string | undefined;
const newCol = getNewCol(props.col);

function getNewCol(col: TableColAttrs) {
  popoverAttrs = col?.quickAttrs?.popover;
  if (typeof col.label !== "string") {
    col._label = col.label;
    col.label = getVNodeInnerText(col._label);
  }
  delete col.quickAttrs; //popover属性只能绑定在 el-popover上，不然会触发 ElementPlus 的警告
  return col;
}
// 该列是否标记为未联调（表格头字体会变红）
function getIsMarkNoHandle(_self: CommonObj, column: CommonObj, col: TableColAttrs) {
  if (isOptimization) return false;
  const { type, prop } = col;
  if ((newCol.prop as string).startsWith("$") || type === "custom") return false;
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
function onOperateBtns(btnObj: BtnItem, { row, col, $index }: RowBtnInfo, next: FinallyNext) {
  $emit("operateBtns", btnObj, { row, col, $index }, next);
}
// 此功能后续可能会移除
function handleSwitchChange(col: TableColAttrs, row: CommonObj, ind: number) {
  const { attrs = {} } = col;
  const { fetch, idKeys = ["id", "id"], statusKey = "status" } = attrs;
  const preKey = attrs?.activeValue === row[statusKey] ? "in" : "";
  ind !== -1 &&
    fetch?.({
      [idKeys[0]]: row[idKeys[1]],
      [statusKey]: attrs?.[preKey + "activeValue"],
    }).then(() => {
      showMessage(`${attrs?.[preKey + "activeText"]}成功`);
      props.refreshList?.();
    });
}
function getCreateOrUpdateText(row: CommonObj, prop: string, ind: number = 0) {
  const keys = prop.split(propsJoinChar);
  const val = row?.[keys?.[ind]];
  return renderValue(val);
}
</script>
<style lang="scss" scoped>
.question-icon {
  vertical-align: middle;
  font-size: 1.1em;
  margin-left: 2px;
}
</style>
