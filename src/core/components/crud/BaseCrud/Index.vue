<!-- summary
  目标：简化增删改查的逻辑书写。
  功能：支持条件展开/折叠、条件分组；请求参数、响应数据处理；
-->
<template>
  <div class="base-crud f-fs-s-c" ref="baseCrudRef">
    <QueryForm
      v-model="modelData"
      class="f-0"
      :disabled="disabled"
      :readonly="readonly"
      :fields="fields"
      :sections="sections"
      :loading="loading"
      :inputDebounce="inputDebounce"
      :grid="grid"
      :rowNum="rowNum"
      :afterReset="handleAfterReset"
      v-bind="formAttrs"
      @ready="handleReady"
      @change="handleChange"
      @submit="handleSearch"
      ref="queryFormRef"
    >
      <template #custom="{ field }">
        <slot :name="field.prop as string" :field="field" />
      </template>
    </QueryForm>
    <div class="middle" v-if="$slots.middle">
      <slot name="middle" />
    </div>
    <div class="f-fs-fs">
      <ExtraBtns
        class="f-1 mr-a"
        :seledAmount="seledRows.length"
        :totalAmount="pageInfo.total"
        :btns="newExtraBtns"
        :disabled="disabled"
        @click="onExtraBtns"
        v-if="newExtraBtns.length"
      />
      <SetBtns
        v-model:cols="newCols"
        :originCols="originCols"
        class="f-0"
        :class="newExtraBtns.length ? ' ml-o' : ' ml-a'"
        :disabled="disabled"
        v-if="showSetBtn"
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
      :loading="loading"
      :data="newRows"
      :total="pageInfo.total"
      :operateBtns="operateBtns"
      :currPage="currPageInfo[currPageKey]"
      :pageSize="currPageInfo[pageSizeKey]"
      :refreshList="refreshList"
      :disabled="disabled"
      :operateBtnsAttrs="operateBtnsAttrs"
      :handleAuth="handleAuth"
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
      class="mt-h f-0"
      v-model:currPage="currPageInfo[currPageKey]"
      v-model:pageSize="currPageInfo[pageSizeKey]"
      :total="pageInfo.total"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrChange"
      v-if="pageSizeNum && showPagination"
    />
  </div>
</template>
<script lang="ts" setup>
import { FormField, FormFieldAttrs, Grid } from "@/core/components/form/_types";
import { TableCol, TableColAttrs } from "@/core/components/table/_types";
import ExtraBtns from "./_components/ExtraBtns.vue";
import SetBtns from "./_components/SetBtns/Index.vue";
import QueryTable from "@/core/components/crud/BaseCrud/_components/QueryTable.vue";
import QueryForm from "@/core/components/crud/BaseCrud/_components/QueryForm/Index.vue";
import { BaseBtnType, BtnItem, BtnName, EndBtnItem, HandleAuthFn } from "@/core/components/BaseBtn/_types";
import { getBtnObj } from "@/core/components/BaseBtn";
import {
  omitAttrs,
  printLog,
  showMessage,
  typeOf,
  showConfirmMessage,
  exportExcel,
  judgeIsInDialog,
  splitPropsParams,
} from "@/core/utils";
import { emptyVals, isDev, propsJoinChar } from "@/core/consts";
import config, { defaultRangeJoinChar, defaultReqResMap, defaultCommonSize } from "@/core/config";
import Sortable from "sortablejs";
import Pagination from "@/core/components/table/_components/Pagination.vue";
import { getQueryFieldValue } from "./_utils";
import { ExportCfg } from "./_types";
import { batchBtnNames } from "@/core/components/crud/BaseCrud/_config";
import { getExportRows } from "@/core/components/crud/BaseCrud/_utils";
import { OperateBtnsAttrs, OperateBtnsType } from "@/core/components/table/_components/OperateBtns.vue";
import { CommonObj, UniteFetchType, FinallyNext, StrNum, CommonSize, GetRequired, BaseDataType } from "@/core/_types";
import { SectionFormItemAttrs, FormAttrs } from "@/core/components/form/_types";
import { ClosePopupType } from "@/core/components/BasicPopup/_types";
import { SummaryListType } from "@/core/components/table/_types";
import { KeyValItem, ReqResMap, TriggerGetListType } from "@/core/components/crud/BaseCrud/_types";
import { defaultFormAttrs, defaultGridAttrsMap } from "@/core/components/form/_config";
import { defaultTableAttrs } from "@/core/components/table/_config";
import { TableAttrs } from "@/core/components/table/_types";
import { getHandleAuthBtns } from "@/core/components/crud/_utils";
import { getStandardCols, operateBtnsEmitName } from "@/core/components/table";
import { cssVars } from "@/utils";
import { usePopup } from "@/hooks";
import { ImportCfgAttrs } from "@/core/components/BaseBtn/_components/CommonImport.vue";
import _ from "lodash";

const CommonImport = defineAsyncComponent(() => import("@/core/components/BaseBtn/_components/CommonImport.vue"));

const { merge, cloneDeep, upperFirst } = _;
const $slots = defineSlots<{
  default: () => void; // 默认插槽
  middle?: () => void; // 中间插槽
  content?: () => void; // 内容插槽
  "[formItem]": () => void; // 表单项插槽
  "[colItem]": () => void; // 表格列插槽
}>();

const { openPopup, closePopup } = usePopup();
const props = withDefaults(
  defineProps<{
    /** 顶部表单 **/
    modelValue?: CommonObj; // 表单数据，可设默认值
    fields?: FormField[]; // 表单字段
    sections?: SectionFormItemAttrs[]; // 分块的表单字段
    extraParams?: CommonObj; // 额外的参数
    changeFetch?: boolean; // 是否onChang之后就发送请求（仅限于Select类组件，不含Input类组件）
    immediateFetch?: boolean; // 页面刚准备好时是否发送请求
    inputDebounce?: boolean; // 输入框输入时，是否通过防抖输入，触发搜索
    grid?: Grid; // 栅格配置，同ElementPlus的el-col的属性
    rowNum?: number; // 筛选条件的(表单)展示几行
    formAttrs?: FormAttrs; //el-form 的属性配置
    /** 中间按钮 **/
    extraBtns?: BaseBtnType[]; //额外的按钮，在表单下方，表格上方
    importCfg?: ImportCfgAttrs; //导入的下载模板配置
    exportCfg?: ExportCfg; //导出配置
    showSetBtn?: boolean;
    /** 底部表格 **/
    cols?: TableCol[]; //表格列数据
    operateBtns?: OperateBtnsType; //操作栏的分组按钮，在表格的操作一栏
    operateBtnsAttrs?: OperateBtnsAttrs; // 操作栏按钮的配置
    handleAuth?: HandleAuthFn; // 按钮权限处理逻辑
    tableAttrs?: TableAttrs; // el-table 的属性配置
    /** 分页设置 **/
    pageSizeNum?: number; // 分页大小，如果为0，则不按分页条件查询
    showPagination?: boolean; // 是否显示分页
    /** 整体控制 **/
    omits?: boolean | BaseDataType[]; // 是否剔除掉null, undefined, ""的属性值
    size?: CommonSize; // 整体的控件大小
    readonly?: boolean; // 是否只读
    disabled?: boolean; // 是否禁用
    /** 请求控制 **/
    log?: boolean | "req" | "res"; // 是否打印console.log(data)
    debug?: boolean; // 是否在打印请求数据之后不执行请求的逻辑
    reqResMap?: ReqResMap; // 请求/响应参数的键名映射
    fetch?: UniteFetchType;
    afterSuccess?: (res: any) => void; // 请求成功的回调函数
    afterFail?: (err: any) => void; // 请求成功的回调函数
    /** 下面是待确定项，可以更改名称，可能移除或替换 **/
    summaryList?: SummaryListType; // 汇总请求数据的 list
  }>(),
  {
    fields: () => [],
    cols: () => [],
    log: isDev,
    changeFetch: true,
    immediateFetch: true,
    omits: true,
    inputDebounce: true,
    showSetBtn: true,
    pageSizeNum: 20,
    showPagination: _props => !!_props.pageSizeNum,
    // reqResMap: () => ({ ...defaultReqResMap }),
    grid: _props => ({ ...defaultGridAttrsMap[_props.size ?? defaultCommonSize] }),
    exportCfg: () => ({ limit: 10000 }),
    formAttrs: () => defaultFormAttrs,
    tableAttrs: () => defaultTableAttrs,
    ...config?.BaseCrud?.Index,
  }
);
const $emit = defineEmits(["update:modelValue", "extraBtns", operateBtnsEmitName, "selectionChange", "rows", "dargSortEnd"]);
let initParams: CommonObj = {}; // 初始化时的参数（即：第一次请求列表后的参数）
const baseCrudRef = ref<any>(null);
const queryFormRef = ref<any>(null);
const queryTableRef = ref<any>(null);
const { extraParams = {} } = props;
const reqResMap = { ...defaultReqResMap, ...props.reqResMap } as GetRequired<ReqResMap>;
const { curr_page: currPageKey, page_size: pageSizeKey } = reqResMap;
const initPageInfo = { [currPageKey]: 1, [pageSizeKey]: props.pageSizeNum };
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
let params: CommonObj = { ...initPageInfo, ...extraParams };
const newExtraBtns = computed<BtnItem[]>(() => {
  const { extraBtns = [], disabled, handleAuth } = props;
  const btns = extraBtns.map((btn: BaseBtnType) => {
    const btnObj: BtnItem = getBtnObj(btn);
    if (disabled) {
      if (btnObj.attrs) {
        btnObj.attrs.disabled = disabled;
      } else {
        btnObj.attrs = { disabled };
      }
      return btnObj;
    }
    const { name, attrs, handleClickType } = btnObj;
    if (batchBtnNames?.includes(name as string)) {
      btnObj.popconfirm = false;
      if (attrs) {
        const byTotalDisabled = !handleClickType || name === "export";
        attrs.disabled = byTotalDisabled ? !pageInfo.total : !seledRows.value.length;
      }
    }
    return btnObj;
  });
  return getHandleAuthBtns(btns, handleAuth);
});
let originCols: TableColAttrs[] = [];
let dragSortable = false;
const newCols = ref<TableColAttrs[]>([]);
watch(
  () => props.cols,
  newVal => {
    const _cols = getStandardCols(newVal);
    // 不能使用JSON.stringify，因为它会删除函数的键值对，会导致formatter函数丢失，除非不会用到函数类属性
    originCols = JSON.parse(JSON.stringify(_cols));
    dragSortable = !!_cols.find(col => col.type === "sort");
    newCols.value = _cols;
  },
  {
    immediate: true,
    deep: true,
  }
);
// 当额外参数改变时，发起请求
watch(
  () => props.extraParams,
  newVal => {
    merge(params, newVal);
    getList(params, undefined, "extraParams");
  },
  { deep: true }
);
// 搜索
function handleSearch(data: CommonObj) {
  props.pageSizeNum && Object.assign(params, { [currPageKey]: 1 });
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
  props.pageSizeNum && Object.assign(params, { [currPageKey]: 1, [pageSizeKey]: val });
  getList(params, undefined, "sizeChange");
}
// 当前页码变化时
function handleCurrChange(val: number) {
  props.pageSizeNum && Object.assign(params, { [currPageKey]: val });
  getList(params, undefined, "currChange");
}
// 初始化刚准备好时
function handleReady() {
  merge(params, modelData.value);
  initParams = JSON.parse(JSON.stringify(params));
  props.immediateFetch && getList(params, undefined, "ready");
}
/**
 * 处理change事件
 * @param changedVals change变动的表单字段
 * @param isInit 是否是初始化表单数据
 */
function handleChange(changedVals: CommonObj) {
  if (!props.changeFetch) return;
  changedVals = splitPropsParams(changedVals);
  // merge(params, changedVals, props.pageSizeNum ? { [currPageKey]: 1 } : undefined); //用merge合并时，属性值为对象时，不能完成合并，故采用下面的方法进行合并
  Object.assign(params, changedVals, props.pageSizeNum ? { [currPageKey]: 1 } : undefined);
  getList(params, undefined, "change");
}
//获取列表数据
function getList(args: CommonObj = params, cb?: FinallyNext, trigger: TriggerGetListType = "expose") {
  // console.log(trigger, "trigger-------触发getList类型");
  const { fetch, omits, summaryList, afterSuccess, afterFail, log } = props;
  args = omitAttrs(args, omits);
  if (log === true || log === "req") printLog(args, "req");
  loading.value = true;
  fetch?.(args)
    .then((res: any) => {
      // if (!res) return console.error("未请求到预期数据，请检查接口是否有误");
      const newList = res[reqResMap.records as string];
      if (!newList) return console.error("响应数据不是标准的分页数据结构，请传入resMap参数进行转换：", res);
      (log === true || log === "res") && printLog(newList, "res");
      const _currPage = args[currPageKey];
      if (summaryList) {
        const t = typeOf(summaryList);
        const oldList = newRows.value;
        if (t === "Boolean") {
          newRows.value = _currPage === 1 ? newList : [...oldList, ...newList];
        } else if (t === "Function") {
          newRows.value = (summaryList as Function)(_currPage, oldList, newList);
        } else {
          throw new Error(`暂未处理此种类型：${t}`);
        }
      } else {
        newRows.value = newList;
      }
      Object.assign(pageInfo, { total: res[reqResMap.total_num as string], hasMore: res[reqResMap.has_more as string] });
      props.pageSizeNum && Object.assign(currPageInfo, { [currPageKey]: _currPage, [pageSizeKey]: args[pageSizeKey] });
      afterSuccess?.(res);
      $emit("rows", newRows.value, args);
      cb?.();
    })
    .catch((err: any) => afterFail?.(err))
    .finally(() => {
      loading.value = false;
    });
}
// 获取带刷新功能的新next回调函数
function getRefreshNext(next: FinallyNext) {
  return (hint?: string, closeType?: ClosePopupType, cb?: () => void, isRefreshList = true) => {
    next(hint, closeType, cb);
    isRefreshList && refreshList();
  };
}
// 点击额外的按钮
function onExtraBtns(tpl: BtnName, btnObj: EndBtnItem, next: FinallyNext, e: Event) {
  const newNext = getRefreshNext(next);
  const { name = "", text, handleClickType, attrs } = btnObj;
  // 默认的导入文件
  if (name === "import" && handleClickType) {
    if (handleClickType !== "common") throw new Error(`暂未提供其他导入组件模板`);
    return openPopup("导入文件", [CommonImport, props.importCfg]);
  }
  // 如果是自定义逻辑或者不是批量处理的按钮
  if (!handleClickType || !batchBtnNames.includes(name)) {
    return $emit("extraBtns", name, newNext, { selectedKeys: [], selectedRows: [] }, e);
  }

  const { total } = pageInfo;
  const { exportCfg, tableAttrs } = props;
  const { rowKey } = tableAttrs;
  const seledKeys = seledRows.value.map((it: CommonObj) => {
    const key = typeof rowKey === "string" ? rowKey : rowKey?.();
    return it[key];
  });
  const cols = newCols.value;
  // 计算出 hintTips 和 colorType
  const colorType = attrs?.type || "primary";
  const colorKey = `color${upperFirst(colorType)}`;
  const color = cssVars[colorKey];
  const style = `style="color:${color};"`;
  const isCommonExport = name === "export" && handleClickType === "common";
  const isSeledAll = seledRows.value.length === total || (isCommonExport ? seledRows.value.length === 0 : false);
  const len = isSeledAll ? total : seledRows.value.length;
  const hintTips = `确定 <b ${style}>${text}${isSeledAll ? "全部" : ""}</b> 共 <b ${style}>${len}</b> 条记录吗？`;
  // 默认的（常用）导出逻辑
  if (isCommonExport) {
    const isOverLimit = exportCfg?.limit ? seledRows.value.length > exportCfg.limit : false;
    if (isOverLimit) {
      const htmlMsg = `单次${text}不能超过 <b>${exportCfg!.limit}</b> 条，请缩小查询范围！`;
      return showMessage({ message: htmlMsg, dangerouslyUseHTMLString: true }, "warning");
    }
    return showConfirmMessage(hintTips, colorType).then(() => {
      const _newCols = cols.filter((it: TableColAttrs) => !(it as TableColAttrs)?.prop?.startsWith("$"));
      return exportExcel(getExportRows(_newCols, seledRows.value));
    });
  }
  showConfirmMessage(hintTips, colorType).then(() => {
    $emit("extraBtns", name, next, { selectedKeys: seledKeys, selectedRows: seledRows }, e);
  });
}

// 点击操作栏按钮
function onOperateBtns(btnObj: BtnItem, row: CommonObj, next: FinallyNext, e: Event) {
  const { name } = btnObj;
  $emit(operateBtnsEmitName, name, row, getRefreshNext(next), e);
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
  if (!ele) throw new Error(`为找到tbody元素`);
  Sortable.create(ele, {
    handle: ".sort-cell",
    animation: 300,
    onEnd(res: CommonObj) {
      const { newIndex, oldIndex } = res;
      $emit("dargSortEnd", { newIndex, oldIndex }, (tips = "修改排序成功") => showMessage(tips));
    },
  });
}

onMounted(() => {
  // judgeIsInDialog("basic-dialog");
  dragSortable && handleDragSort();
});

defineExpose({
  formRef: queryFormRef,
  tableRef: queryTableRef,
  getList,
  refreshList,
  // 获取查询参数
  getQueryParams: omits => omitAttrs(params, omits),
  // 获取查询字段
  getQueryFields(excludeKeys = [currPageKey, pageSizeKey]) {
    const queryFields: KeyValItem[] = [];
    const rangeKeys: string[] = [];
    const propFields = queryFormRef.value.getFields() as FormFieldAttrs[];
    propFields.forEach((it: FormFieldAttrs) => {
      if (it.prop?.includes(propsJoinChar)) rangeKeys.push(it.prop as string);
    }) as unknown as FormFieldAttrs[];
    for (const prop in params) {
      if (excludeKeys?.length && excludeKeys.includes(prop)) continue;
      const target = propFields.find((it: FormFieldAttrs) => it.prop === prop);
      if (!target) continue;
      const val = params[prop];
      const canPush = !emptyVals.includes(val) && (typeOf(val) !== "Array" || val.some((it: StrNum) => it !== ""));
      if (!canPush) continue;
      queryFields.push({
        label: target.label,
        value: getQueryFieldValue(target, val),
      });
    }
    rangeKeys.forEach(prop => {
      const [minKey, maxKey] = prop.split(propsJoinChar);
      const minVal = params[minKey];
      const maxVal = params[maxKey];
      const target = propFields.find((it: FormFieldAttrs) => it.prop!.includes(prop));
      if (!target || (!minVal && !maxVal)) return;
      queryFields.push({
        label: target.label,
        value: [minVal, maxVal].join(defaultRangeJoinChar),
      });
    });
    return queryFields;
  },
});
</script>
<style lang="scss" scoped>
.base-crud {
  height: 100%;
  width: 100%;
  .query-form,
  .middle {
    margin-bottom: var(--gap-half);
  }
}
</style>
