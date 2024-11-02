<!--  summary
  常规同用增删改查列表
 -->
<template>
  <div class="base-crud f-fs-s-c" ref="baseCrudRef">
    <QueryForm
      v-model="modelData"
      class="f-0"
      :class="formAttrs?.size ?? size"
      :disabled="disabled"
      :readonly="readonly"
      :fields="fields"
      :sections="sections"
      :loading="loading"
      :inputDebounce="inputDebounce"
      :grid="grid"
      :compact="compact"
      :size="formAttrs?.size ?? size"
      :rowNum="rowNum"
      v-bind="formAttrs"
      @reset="handleReset"
      @search="handleSearch"
      @change="handleChange"
      ref="queryFormRef"
    >
      <template #custom="{ field, form }">
        <slot :name="field.prop" :field="field" :form="form" />
      </template>
    </QueryForm>
    <div class="middle" :class="tableAttrs?.size ?? size" v-if="$slots.middle">
      <slot name="middle" />
    </div>
    <div class="f-fs-fs">
      <ExtraBtns
        class="f-1 mr-a"
        :btns="newExtraBtns"
        :disabled="disabled"
        :size="tableAttrs?.size ?? size"
        @click="onExtraBtns"
        v-if="newExtraBtns.length"
      />
      <SetBtns
        v-model="newCols"
        :originCols="originCols"
        class="f-0"
        :class="newExtraBtns.length ? ' ml-o' : ' ml-a'"
        :disabled="disabled"
        :size="tableAttrs?.size ?? size"
      />
    </div>
    <slot :loading="loading" :rows="newRows" :total="pageInfo.total" :hasMore="pageInfo.hasMore" :params="params" :onOperateBtns="onOperateBtns">
      <QueryTable
        :compact="compact"
        :loading="loading"
        :cols="newCols"
        :rows="newRows"
        :total="pageInfo.total"
        :operateBtns="operateBtns"
        :currPage="pagination ? currPageInfo[reqMap.curr_page] : 1"
        :pageSize="pagination ? currPageInfo[reqMap.page_size] : 20"
        :refreshList="refreshList"
        :disabled="disabled"
        :size="tableAttrs?.size ?? size"
        :operateBtnsAttrs="operateBtnsAttrs"
        v-bind="tableAttrs"
        @operateBtns="onOperateBtns"
        @selectionChange="handleSelectionChange"
        @update:cols="(cols: TableColAttrs[]) => newCols = cols"
        ref="queryTableRef"
      >
        <template #custom="{ row, col, $index }">
          <slot :name="col.prop as string" v-bind="{ row, col, $index }" />
        </template>
      </QueryTable>
    </slot>
    <Pagination
      v-bind="pageAttrs"
      v-model:currPage="currPageInfo[reqMap.curr_page]"
      v-model:pageSize="currPageInfo[reqMap.page_size]"
      :total="pageInfo.total"
      :size="tableAttrs?.size ?? size"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrChange"
      v-if="pagination && showPagination"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, onMounted, inject } from "vue";
import { FormField, FormFieldAttrs, Grid } from "@/core/form/_types";
import { TableCol, TableColAttrs } from "@/core/table/_types";
import ExtraBtns from "./_components/ExtraBtns.vue";
import SetBtns from "./_components/SetBtns/Index.vue";
import QueryTable from "@/core/crud/BaseCrud/_components/QueryTable.vue";
import QueryForm from "@/core/crud/BaseCrud/_components/QueryForm/Index.vue";
import { BaseBtnType, BtnItem } from "@/core/BaseBtn/_types";
import { getBtnObj } from "@/core/BaseBtn";
import { omitAttrs, printLog, propsJoinChar, rangeJoinChar, showMessage, typeOf, emptyVals, defaultReqMap, defaultResMap } from "@/core/_utils";
import _ from "lodash";
import config from "@/config";
import Sortable from "sortablejs";
import Pagination from "./_components/Pagination.vue";
import { OperateBtnsAttrs, OperateBtnsType } from "@/core/table/_components/GroupBtns.vue";
import { splitPropsParams } from "@/core/_utils";
import { handleClickExtraBtns, getQueryFieldValue } from "./_utils";
import { batchBtnNames } from "@/core/crud/BaseCrud";
import { CommonObj, UniteFetchType, FinallyNext, StrNum, CommonSize, GetRequired, ClosePopupInject } from "@/vite-env";
import { SectionFormItemAttrs, FormAttrs } from "@/core/form/_types";
import { ClosePopupType, OpenPopupInject } from "@/core/BasicPopup/_types";
import { SummaryListType, TablePaginationAttrs } from "@/core/table/_types";
import { KeyValItem, ReqMap, ResMap, TriggerGetListType, FilterByAuthFn } from "@/core/crud/BaseCrud/_types";
import { TplCfgAttrs } from "./_components/CommonImport.vue";
import { defaultFormAttrs, defaultGridAttrs } from "@/core/form/_config";
import { defaultTableAttrs } from "@/core/table/_config";
import { ExportCfg } from "./_types";
import { TableAttrs } from "@/core/table/_types";
import { defaultCommonSize, judgeIsInDialog } from "@/core/_utils";
import { filterBtnsByAuth } from "@/core/crud/_utils";
import { operateBtnsEmitName } from "@/core/table";

const { merge, cloneDeep } = _;
const $slots = defineSlots<{
  default: () => void; // 默认插槽
  middle?: () => void; // 中间插槽
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
    immediate?: boolean; // 页面刚创建时是否立即发起请求获取数据
    extraParams?: CommonObj; // 额外的参数
    changeFetch?: boolean; // 是否onChang之后就发送请求（仅限于Select类组件，不含Input类组件）
    inputDebounce?: boolean; // 输入框输入时，是否通过防抖输入，触发搜索
    grid?: Grid; // 栅格配置，同ElementPlus的el-col的属性
    rowNum?: number; // 筛选条件的(表单)展示几行
    /** 中间按钮 **/
    extraBtns?: BaseBtnType[]; //额外的按钮，在表单下方，表格上方
    importCfg?: TplCfgAttrs; //导入的下载模板配置
    exportCfg?: ExportCfg; //导出配置
    /** 底部表格 **/
    cols?: TableCol[]; //表格列数据
    operateBtns?: OperateBtnsType; //操作栏的分组按钮，在表格的操作一栏
    operateBtnsAttrs?: OperateBtnsAttrs; // 操作栏按钮的配置
    filterByAuth?: FilterByAuthFn; // 按钮权限处理逻辑
    formAttrs?: FormAttrs; //el-form 的属性配置
    /** 整体控制 **/
    omit?: boolean; // 是否剔除掉undefined, ''的属性值
    size?: CommonSize; // 整体的控件大小
    compact?: boolean; // 表单项、表格列之间排列是否紧凑点
    readonly?: boolean; // 是否只读
    disabled?: boolean; // 是否禁用
    tableAttrs?: TableAttrs; // el-table 的属性配置
    pageAttrs?: CommonObj; // 分页配置
    pagination?: false | TablePaginationAttrs; //是否分页
    optimization?: boolean; // 默认为 false。若开启则会规避表格、表单中计算开销较多的逻辑。场景示例：操作栏列宽计算
    showPagination?: boolean; // 是否显示分页
    /** 请求控制 **/
    log?: boolean; // 是否打印console.log(rows)
    debug?: boolean; // 是否在打印请求数据之后不执行请求的逻辑
    reqMap?: ReqMap; // 请求参数的键名映射
    resMap?: ResMap; // 响应参数的键名映射
    afterSuccess?: (res: any) => void; // 请求成功的回调函数
    afterFail?: (err: any) => void; // 请求成功的回调函数
    handleRequest?: (args: CommonObj) => CommonObj; //处理参数
    handleResponse?: (res: any) => any; // 处理响应数据
    /** 下面是待确定项，可以更改名称，可能移除或替换 **/
    summaryList?: SummaryListType; // 汇总请求数据的 list
  }>(),
  Object.assign(
    {
      fields: () => [],
      cols: () => [],
      immediate: true,
      changeFetch: true,
      size: defaultCommonSize,
      omit: true,
      inputDebounce: true,
      showPagination: true,
      pagination: () => ({ currPage: 1, pageSize: 20 }),
      reqMap: () => defaultReqMap,
      resMap: () => defaultResMap,
      grid: () => defaultGridAttrs,
      compact: (_props: CommonObj) => _props.grid.xl < 6,
      filterByAuth: (auth: number[]) => true,
      exportCfg: () => ({ limit: 10000 }),
      formAttrs: () => defaultFormAttrs,
      tableAttrs: () => defaultTableAttrs,
    },
    config?.BaseCrud?.Index
  )
);
const $emit = defineEmits(["update:modelValue", "extraBtns", operateBtnsEmitName, "selectionChange", "rows", "dargSortEnd"]);
const closePopup = inject<ClosePopupInject>("closePopup");
const queryTableRef = ref<any>(null);
const queryFormRef = ref<any>(null);
const baseCrudRef = ref<any>(null);
const { extraParams = {} } = props;
const reqMap: GetRequired<ReqMap> = props.reqMap;
const resMap: GetRequired<ResMap> = props.resMap;
const initPageInfo = props.pagination
  ? {
      [`${reqMap.curr_page}`]: props.pagination.currPage,
      [`${reqMap.page_size}`]: props.pagination.pageSize,
    }
  : {};
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
        attrs.disabled = handleClickType === "custom" ? !pageInfo.total : !seledRows.value.length;
      }
    }
    if (disabled) attrs!.disabled = disabled;
    return btnObj;
  });
  return filterBtnsByAuth(btns, filterByAuth);
});

// 不能使用JSON.stringify，因为它会删除函数的键值对，会导致formatter函数丢失
const originCols = computed<TableColAttrs[]>(() => props.cols.filter(it => !!it) as TableColAttrs[]);
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

// 重置
function handleReset() {
  Object.assign(currPageInfo, initPageInfo);
  params = cloneDeep(initParams);
  getList(params, undefined, "reset");
}
// 点击搜索
function handleSearch(data: CommonObj) {
  Object.assign(params, { [`${reqMap.curr_page as string}`]: 1 });
  getList(params, undefined, "search");
}
// 每页条数变化时
function handleSizeChange(val: number) {
  Object.assign(params, {
    [`${reqMap.curr_page as string}`]: 1,
    [`${reqMap.page_size as string}`]: val,
  });
  getList(params, undefined, "sizeChange");
}
// 当前页码变化时
function handleCurrChange(val: number) {
  Object.assign(params, { [`${reqMap.curr_page as string}`]: val });
  getList(params, undefined, "currChange");
}
/**
 * 处理change事件
 * @param changedVals change变动的表单字段
 * @param withModelData model是否有值（即初始值，是否有值）
 */
function handleChange(changedVals: CommonObj, withModelData?: boolean) {
  const { immediate, changeFetch } = props;
  console.log(changedVals, "changedVals-----------");
  changedVals = splitPropsParams(changedVals);
  if (withModelData) {
    merge(params, changedVals);
    Object.assign(initParams, params);
  } else {
    if (!changeFetch) return;
    // merge(params, changedVals, { [`${reqMap.curr_page}`]: 1 }); //用merge合并时，属性值为对象时，不能完成合并，故采用下面的方法进行合并
    Object.assign(params, changedVals, { [`${reqMap.curr_page}`]: 1 });
  }
  immediate && getList(params, undefined, "change");
}
//获取列表数据
function getList(args: CommonObj = params, cb?: FinallyNext, trigger: TriggerGetListType = "expose") {
  // console.log(trigger, "trigger-------触发getList类型");
  const { fetch, handleRequest, omit, handleResponse, summaryList, afterSuccess, afterFail, log } = props;
  if (!fetch) return;
  loading.value = true;
  if (handleRequest) args = handleRequest(args);
  omit && (args = omitAttrs(args)); //剔除掉值为undefined, '', null的属性
  log && printLog(args, "req");
  fetch(args)
    .then((res: any) => {
      if (!res) return showMessage("未请求到预期数据，请检查接口是否有误");
      if (handleResponse) res = handleResponse(res);
      const newList = res[resMap.records as string];
      if (!newList) return console.error("响应数据不是标准的分页数据结构，请传入resMap参数进行转换：", res);
      log && printLog(newList, "res");
      const _currPage = args[reqMap.curr_page as string];
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
      Object.assign(pageInfo, {
        total: res[resMap.total_num as string],
        hasMore: res[resMap.has_more as string],
      });
      Object.assign(currPageInfo, {
        [reqMap.curr_page]: _currPage,
        [reqMap.page_size]: args[reqMap.page_size as string],
      });
      afterSuccess?.(res);
      $emit("rows", newRows.value, args);
      cb?.();
    })
    .catch((err: any) => {
      afterFail?.(err);
    })
    .finally(() => {
      loading.value = false;
    });
}

// 点击额外的按钮
function onExtraBtns(btnObj: BtnItem) {
  const { exportCfg, importCfg, tableAttrs, cols } = props;
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
    $emit,
    next: (hint = `${text || "操作"}成功`, closeType?: ClosePopupType, cb?: () => void, isRefreshList: boolean = true) => {
      showMessage(hint);
      closePopup(closeType);
      isRefreshList && refreshList();
      cb?.();
    },
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
  getQueryParams(omit = props.omit) {
    return omit ? omitAttrs(params) : params;
  },
  getQueryFields(excludeKeys = [reqMap.curr_page, reqMap.page_size]) {
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
