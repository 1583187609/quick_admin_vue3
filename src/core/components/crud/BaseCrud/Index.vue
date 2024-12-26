<!-- summary
  目标：简化增删改查的逻辑书写。
  功能：支持条件展开/折叠、条件分组；请求参数、响应数据处理；
-->
<template>
  <div class="base-crud f-fs-s-c" ref="baseCrudRef">
    <QueryForm
      v-model="modelData"
      class="f-0"
      :class="size"
      :disabled="disabled"
      :readonly="readonly"
      :fields="fields"
      :sections="sections"
      :loading="loading"
      :inputDebounce="inputDebounce"
      :grid="grid"
      :compact="compact"
      :size="size"
      :rowNum="rowNum"
      :afterReset="handleAfterReset"
      v-bind="formAttrs"
      @search="handleSearch"
      @change="handleChange"
      ref="queryFormRef"
    >
      <template #custom="{ field, form }">
        <slot :name="field.prop" :field="field" :form="form" />
      </template>
    </QueryForm>
    <div class="middle" :class="size" v-if="$slots.middle">
      <slot name="middle" />
    </div>
    <div class="f-fs-fs">
      <ExtraBtns
        class="f-1 mr-a"
        :seledAmount="seledRows.length"
        :totalAmount="pageInfo.total"
        :btns="newExtraBtns"
        :disabled="disabled"
        :size="size"
        @click="onExtraBtns"
        v-if="newExtraBtns.length"
      />
      <SetBtns
        v-model="newCols"
        :originCols="originCols"
        class="f-0"
        :class="newExtraBtns.length ? ' ml-o' : ' ml-a'"
        :disabled="disabled"
        :size="size"
      />
    </div>
    <slot
      name="content"
      :loading="loading"
      :data="newRows"
      :total="pageInfo.total"
      :hasMore="pageInfo.hasMore"
      :params="params"
      :onOperateBtns="onOperateBtns"
      v-if="$slots.content"
    />
    <QueryTable
      v-model:cols="newCols"
      :compact="compact"
      :loading="loading"
      :data="newRows"
      :total="pageInfo.total"
      :operateBtns="operateBtns"
      :currPage="pagination ? currPageInfo[currPageKey] : defaultPagination.currPage"
      :pageSize="pagination ? currPageInfo[pageSizeKey] : defaultPagination.pageSize"
      :refreshList="refreshList"
      :disabled="disabled"
      :size="size"
      :operateBtnsAttrs="operateBtnsAttrs"
      v-bind="tableAttrs"
      @operateBtns="onOperateBtns"
      @selectionChange="handleSelectionChange"
      ref="queryTableRef"
      v-else
    >
      <template #custom="{ row, col, $index }">
        <slot :name="col.prop as string" v-bind="{ row, col, $index }" />
      </template>
      <template #children-custom="{ row, col, $index }">
        <slot :name="col.prop as string" v-bind="{ row, col, $index }" />
      </template>
    </QueryTable>
    <Pagination
      v-model:currPage="currPageInfo[currPageKey]"
      v-model:pageSize="currPageInfo[pageSizeKey]"
      :total="pageInfo.total"
      :size="size"
      v-bind="pageAttrs"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrChange"
      v-if="pagination && showPagination"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, onMounted, inject } from "vue";
import { FormField, FormFieldAttrs, Grid } from "@/core/components/form/_types";
import { TableCol, TableColAttrs } from "@/core/components/table/_types";
import ExtraBtns from "./_components/ExtraBtns.vue";
import SetBtns from "./_components/SetBtns/Index.vue";
import QueryTable from "@/core/components/crud/BaseCrud/_components/QueryTable.vue";
import QueryForm from "@/core/components/crud/BaseCrud/_components/QueryForm/Index.vue";
import { BaseBtnType, BtnItem, BtnName, EndBtnItem } from "@/core/components/BaseBtn/_types";
import { getBtnObj } from "@/core/components/BaseBtn";
import {
  omitAttrs,
  printLog,
  propsJoinChar,
  rangeJoinChar,
  showMessage,
  typeOf,
  emptyVals,
  defaultReqMap,
  defaultResMap,
} from "@/core/utils";
import config from "@/config";
import Sortable from "sortablejs";
import Pagination from "./_components/Pagination.vue";
import { OperateBtnsAttrs, OperateBtnsType } from "@/core/components/table/_components/GroupBtns.vue";
import { splitPropsParams } from "@/core/utils";
import { handleClickExtraBtns, getQueryFieldValue } from "./_utils";
import { batchBtnNames } from "@/core/components/crud/BaseCrud";
import {
  CommonObj,
  UniteFetchType,
  FinallyNext,
  StrNum,
  CommonSize,
  GetRequired,
  ClosePopupInject,
  BaseDataType,
} from "@/core/_types";
import { SectionFormItemAttrs, FormAttrs } from "@/core/components/form/_types";
import { ClosePopupType, OpenPopupInject } from "@/core/components/BasicPopup/_types";
import { SummaryListType, TablePaginationAttrs } from "@/core/components/table/_types";
import { KeyValItem, ReqMap, ResMap, TriggerGetListType, FilterByAuthFn } from "@/core/components/crud/BaseCrud/_types";
import { ImportCfgAttrs } from "./_components/CommonImport.vue";
import { defaultFormAttrs, defaultGridAttrs } from "@/core/components/form/_config";
import { defaultTableAttrs, defaultTableColTpls } from "@/core/components/table/_config";
import { ExportCfg } from "./_types";
import { TableAttrs } from "@/core/components/table/_types";
import { defaultCommonSize, defaultPagination, judgeIsInDialog } from "@/core/utils";
import { filterBtnsByAuth } from "@/core/components/crud/_utils";
import { operateBtnsEmitName } from "@/core/components/table";
import { getStandAttrsFromTpl } from "@/core/components/form/_components/FieldItem";
import _ from "lodash";

const { merge, cloneDeep, snakeCase } = _;
const $slots = defineSlots<{
  default: () => void; // 默认插槽
  middle?: () => void; // 中间插槽
  content?: () => void; // 内容插槽
  "[formItem]": () => void; // 表单项插槽
  "[colItem]": () => void; // 表格列插槽
}>();
const openPopup = inject<OpenPopupInject>("openPopup");
const props = withDefaults(
  defineProps<{
    /** 顶部表单 **/
    modelValue?: CommonObj; // 表单数据，可设默认值
    fields?: FormField[]; // 表单字段
    sections?: SectionFormItemAttrs[]; // 分块的表单字段
    fetch?: UniteFetchType; // 列表请求接口
    extraParams?: CommonObj; // 额外的参数
    changeFetch?: boolean; // 是否onChang之后就发送请求（仅限于Select类组件，不含Input类组件）
    inputDebounce?: boolean; // 输入框输入时，是否通过防抖输入，触发搜索
    grid?: Grid; // 栅格配置，同ElementPlus的el-col的属性
    rowNum?: number; // 筛选条件的(表单)展示几行
    formAttrs?: FormAttrs; //el-form 的属性配置
    /** 中间按钮 **/
    extraBtns?: BaseBtnType[]; //额外的按钮，在表单下方，表格上方
    importCfg?: ImportCfgAttrs; //导入的下载模板配置
    exportCfg?: ExportCfg; //导出配置
    /** 底部表格 **/
    cols?: TableCol[]; //表格列数据
    operateBtns?: OperateBtnsType; //操作栏的分组按钮，在表格的操作一栏
    operateBtnsAttrs?: OperateBtnsAttrs; // 操作栏按钮的配置
    filterByAuth?: FilterByAuthFn; // 按钮权限处理逻辑
    tableAttrs?: TableAttrs; // el-table 的属性配置
    /** 分页设置 **/
    pageAttrs?: CommonObj; // 分页配置
    pagination?: false | TablePaginationAttrs; //是否分页
    showPagination?: boolean; // 是否显示分页
    /** 整体控制 **/
    omits?: boolean | BaseDataType[]; // 是否剔除掉null, undefined, ""的属性值
    compact?: boolean; // 表单项、表格列之间排列是否紧凑点
    size?: CommonSize; // 整体的控件大小
    readonly?: boolean; // 是否只读
    disabled?: boolean; // 是否禁用
    optimization?: boolean; // 默认为 false。若开启则会规避表格、表单中计算开销较多的逻辑。场景示例：操作栏列宽计算
    /** 请求控制 **/
    log?: boolean | "req" | "res"; // 是否打印console.log(data)
    debug?: boolean; // 是否在打印请求数据之后不执行请求的逻辑
    reqMap?: ReqMap; // 请求参数的键名映射
    resMap?: ResMap; // 响应参数的键名映射
    afterSuccess?: (res: any) => void; // 请求成功的回调函数
    afterFail?: (err: any) => void; // 请求成功的回调函数
    /** 下面是待确定项，可以更改名称，可能移除或替换 **/
    summaryList?: SummaryListType; // 汇总请求数据的 list
  }>(),
  {
    fields: () => [],
    cols: () => [],
    changeFetch: true,
    size: defaultCommonSize,
    omits: true,
    inputDebounce: true,
    showPagination: true,
    pagination: () => defaultPagination,
    reqMap: () => defaultReqMap,
    resMap: () => defaultResMap,
    grid: () => defaultGridAttrs,
    compact: (_props: CommonObj) => _props.grid.xl < 6,
    filterByAuth: (auth: number[]) => true,
    exportCfg: () => ({ limit: 10000 }),
    formAttrs: () => defaultFormAttrs,
    tableAttrs: () => defaultTableAttrs,
    ...config?.BaseCrud?.Index,
  }
);
const $emit = defineEmits(["update:modelValue", "extraBtns", operateBtnsEmitName, "selectionChange", "rows", "dargSortEnd"]);
const { extraParams = {}, pagination } = props;
const baseCrudRef = ref<any>(null);
const queryFormRef = ref<any>(null);
const queryTableRef = ref<any>(null);
const reqMap = props.reqMap as GetRequired<ReqMap>;
const resMap = props.resMap as GetRequired<ResMap>;
const currPageKey = reqMap.curr_page as string;
const pageSizeKey = reqMap.page_size as string;
const initPageInfo = pagination ? { [currPageKey]: pagination.currPage, [pageSizeKey]: pagination.pageSize } : {};
const initParams = {
  ...initPageInfo,
  ...extraParams,
};
const currPageInfo = reactive<CommonObj>(cloneDeep(initPageInfo));
const pageInfo = reactive<CommonObj>({ total: 0, hasMore: true });
const loading = ref(false);
const newRows = ref([]);
const seledRows = ref<CommonObj[]>([]);
const modelData = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});
//请求参数
let params: CommonObj = cloneDeep(initParams);
const newExtraBtns = computed<BtnItem[]>(() => {
  const { extraBtns = [], disabled, filterByAuth } = props;
  const btns = extraBtns.map((btn: BaseBtnType) => {
    const btnObj: BtnItem = getBtnObj(btn);
    const { name, attrs, handleClickType } = btnObj;
    if (batchBtnNames?.includes(name as string)) {
      btnObj.popconfirm = false;
      if (attrs) {
        const byTotalDisabled = !handleClickType || name === "export";
        attrs.disabled = byTotalDisabled ? !pageInfo.total : !seledRows.value.length;
      }
    }
    if (disabled) attrs!.disabled = disabled;
    return btnObj;
  });
  return filterBtnsByAuth(btns, filterByAuth);
});

function filterCycle(cols: TableCol[] = []) {
  return cols
    .filter(it => !!it)
    .map((originCol: any) => {
      let { tpl, ...col } = originCol;
      const { type } = col;
      if (!tpl && defaultTableColTpls[type]) tpl = type; // 如果type类型名称跟模板名称一致，tpl属性可以不写，会默认为type的名称
      if (tpl) {
        const tplData = getStandAttrsFromTpl(tpl, defaultTableColTpls);
        col = merge(tplData, col);
      }
      const { children } = col as TableColAttrs;
      if (children?.length) (col as TableColAttrs).children = filterCycle(children);
      return col;
    });
}

// 不能使用JSON.stringify，因为它会删除函数的键值对，会导致formatter函数丢失
const originCols = computed<TableColAttrs[]>(() => filterCycle(props.cols) as TableColAttrs[]);
const newCols = ref<TableColAttrs[]>(toRaw(originCols.value));
const dragSortable = computed<boolean>(() => !!newCols.value.find(col => col.type === "sort"));

// 当额外参数改变时，发起请求
watch(
  () => props.extraParams,
  newVal => {
    merge(params, newVal);
    getList(params, undefined, "extraParams");
  },
  { deep: true }
);
// 点击搜索
function handleSearch(data: CommonObj) {
  pagination && Object.assign(params, { [currPageKey]: 1 });
  getList(params, undefined, "search");
}
// 重置
function handleAfterReset() {
  Object.assign(currPageInfo, initPageInfo);
  params = cloneDeep(initParams);
  getList(params, undefined, "reset");
}
// 每页条数变化时
function handleSizeChange(val: number) {
  pagination && Object.assign(params, { [currPageKey]: 1, [pageSizeKey]: val });
  getList(params, undefined, "sizeChange");
}
// 当前页码变化时
function handleCurrChange(val: number) {
  pagination && Object.assign(params, { [currPageKey]: val });
  getList(params, undefined, "currChange");
}
/**
 * 处理change事件
 * @param changedVals change变动的表单字段
 * @param isInit 是否是初始化表单数据
 */
function handleChange(changedVals: CommonObj, isInit?: boolean) {
  const { changeFetch } = props;
  changedVals = splitPropsParams(changedVals);
  if (isInit) {
    merge(params, changedVals);
    Object.assign(initParams, params);
  } else {
    if (!changeFetch) return;
    // merge(params, changedVals, pagination ? { [currPageKey]: 1 } : undefined); //用merge合并时，属性值为对象时，不能完成合并，故采用下面的方法进行合并
    Object.assign(params, changedVals, pagination ? { [currPageKey]: 1 } : undefined);
  }
  getList(params, undefined, isInit ? "init" : "change");
}
//获取列表数据
function getList(args: CommonObj = params, cb?: FinallyNext, trigger: TriggerGetListType = "expose") {
  // console.log(trigger, "trigger-------触发getList类型");
  const { fetch, omits, summaryList, afterSuccess, afterFail, log } = props;
  if (!fetch) return;
  loading.value = true;
  args = omitAttrs(args, omits);
  (log === true || log === "req") && printLog(args, "req");
  fetch(args)
    .then((res: any) => {
      // if (!res) return console.error("未请求到预期数据，请检查接口是否有误");
      const newList = res[resMap.records as string];
      if (!newList) return console.error("响应数据不是标准的分页数据结构，请传入resMap参数进行转换：", res);
      (log === true || log === "res") && printLog(newList, "res");
      const _currPage = args[currPageKey];
      if (summaryList) {
        const t = typeOf(summaryList);
        const oldList = newRows.value;
        if (t === "Boolean") {
          newRows.value = _currPage === 1 ? newList : [...oldList, ...newList];
        } else if (t === "Function") {
          newRows.value = summaryList(_currPage, oldList, newList);
        } else {
          throw new Error(`暂未处理此种类型：${t}`);
        }
      } else {
        newRows.value = newList;
      }
      Object.assign(pageInfo, { total: res[resMap.total_num as string], hasMore: res[resMap.has_more as string] });
      pagination && Object.assign(currPageInfo, { [currPageKey]: _currPage, [pageSizeKey]: args[pageSizeKey] });
      afterSuccess?.(res);
      $emit("rows", newRows.value, args);
      cb?.();
    })
    .catch((err: any) => afterFail?.(err))
    .finally(() => {
      loading.value = false;
    });
}

// 点击额外的按钮
function onExtraBtns(tpl: BtnName, btnObj: EndBtnItem, next: FinallyNext, e: Event) {
  const { exportCfg, importCfg, tableAttrs } = props;
  const { rowKey } = tableAttrs;
  const { text } = btnObj;
  handleClickExtraBtns({
    btnObj,
    cols: newCols.value,
    seledRows: seledRows.value,
    seledKeys: seledRows.value.map((it: CommonObj) => {
      const key = typeof rowKey === "string" ? rowKey : rowKey?.();
      return it[key];
    }),
    total: pageInfo.total,
    exportCfg,
    e,
    $emit,
    next: () => next(text, undefined, refreshList),
    openPopup,
    importCfg,
  });
}

// 点击操作栏按钮
function onOperateBtns(btnObj: BtnItem, row: CommonObj, next: FinallyNext, isRefreshList: boolean = true) {
  const { name } = btnObj;
  $emit(operateBtnsEmitName, name, row, (hint?: string, closeType?: ClosePopupType, cb?: () => void) => {
    next(hint, closeType, cb);
    isRefreshList && refreshList();
  });
}

// 处理多选改变时
function handleSelectionChange(rows: CommonObj[], keys: string[]) {
  seledRows.value = rows;
  $emit("selectionChange", rows, keys);
}
/**
 * 刷新列表
 * @param cb function 预留的回调函数
 */
function refreshList(cb?: () => void) {
  getList(params, cb, "refresh");
}
// 拖拽排序
function handleDragSort(ele = queryTableRef?.value.tableRef?.$el?.querySelector(".el-table__body-wrapper tbody") as HTMLElement) {
  const { tableAttrs } = props;
  const { rowKey } = tableAttrs;
  if (!ele) return;
  Sortable.create(ele, {
    handle: ".sort-cell",
    animation: 300,
    onEnd(res: CommonObj) {
      const { newIndex, oldIndex } = res;
      if (typeof dragSortable.value === "boolean") {
        $emit("dargSortEnd", { newIndex, oldIndex }, (tips = "修改排序成功") => {
          // const removeItem = newRows.value.splice(oldIndex, 1)[0];
          // newRows.value.splice(newIndex, 0, removeItem);
          showMessage(tips);
        });
      } else {
        // (dragSortable.value as any)({[rowKey]})
      }
    },
  });
}

onMounted(() => {
  // judgeIsInDialog("basic-dialog");
  handleDragSort(); // 待完善拖拽排序
});

defineExpose({
  refreshList,
  getList,
  getQueryParams(omits = props.omits) {
    return omitAttrs(params, omits);
  },
  getQueryFields(excludeKeys = [currPageKey, pageSizeKey]) {
    const queryFields: KeyValItem[] = [];
    const rangeKeys: string[] = [];
    const propFields = queryFormRef.value.getFields() as FormFieldAttrs[];
    propFields.forEach((it: FormFieldAttrs) => {
      if (it.prop?.includes(propsJoinChar)) {
        rangeKeys.push(it.prop as string);
      }
    }) as unknown as FormFieldAttrs[];
    for (const prop in params) {
      if (excludeKeys && !excludeKeys.includes(prop)) {
        const target = propFields.find((it: FormFieldAttrs) => it.prop === prop);
        if (target) {
          const val = params[prop];
          const canPush = !emptyVals.includes(val) && (typeOf(val) !== "Array" || val.some((it: StrNum) => it !== ""));
          if (canPush) {
            queryFields.push({
              label: target.label,
              value: getQueryFieldValue(target, val),
            });
          }
        }
      }
    }
    rangeKeys.forEach(prop => {
      const [minKey, maxKey] = prop.split(propsJoinChar);
      const minVal = params[minKey];
      const maxVal = params[maxKey];
      const target = propFields.find((it: FormFieldAttrs) => it.prop!.includes(prop));
      if (target && (minVal || maxVal)) {
        queryFields.push({
          label: target.label,
          value: [minVal, maxVal].join(rangeJoinChar),
        });
      }
    });
    return queryFields;
  },
  // ...queryFormRef.value,
  // ...queryTableRef.value,
});
</script>
<style lang="scss" scoped>
.base-crud {
  height: 100%;
  width: 100%;
  .query-form,
  .middle {
    &.large {
      margin-bottom: $gap-large;
    }
    &.default {
      margin-bottom: $gap-default;
    }
    &.small {
      margin-bottom: $gap-small;
    }
  }
}
</style>
