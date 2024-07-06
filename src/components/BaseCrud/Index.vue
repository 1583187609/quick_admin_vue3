<template>
  <div class="base-crud f-fs-s-c" ref="baseCrudRef">
    <QueryForm
      class="f-0"
      :class="size === 'small' ? 'mb-6' : 'mb-h'"
      v-model="model"
      :disabled="disabled"
      :fields="fields"
      :sections="sections"
      :loading="loading"
      :inputDebounce="inputDebounce"
      :colSpanAttrs="colSpanAttrs"
      :compact="compact"
      @reset="handleReset"
      @search="handleSearch"
      @change="handleChange"
      :size="size"
      :rowNum="rowNum"
      v-bind="formAttrs"
      ref="queryFormRef"
    >
      <template #custom="{ field, form }">
        <slot :name="field.prop" :field="field" :form="form"></slot>
      </template>
    </QueryForm>
    <slot name="middle"></slot>
    <ExtraBtns
      class="f-0"
      :columns="newCols"
      :allColumns="allCols"
      :btns="newExtraBtns"
      :isEmpty="!newRows?.length"
      @update:cols="(cols:TableField[])=>{newCols = cols}"
      @click="onExtraBtn"
      :total="pageInfo.total"
      :batchBtn="batchBtn && selection"
      :size="size"
      ref="extraBtnsRef"
      v-if="newExtraBtns.length"
    />
    <slot
      :loading="loading"
      :rows="newRows"
      :total="pageInfo.total"
      :hasMore="pageInfo.hasMore"
      :params="params"
      :onGroupBtn="onGroupBtn"
    >
      <QueryTable
        :groupBtnsAttrs="{
          compact,
          small: size === 'small',
          ...groupBtnsAttrs,
        }"
        :loading="loading"
        :cols="newCols"
        :rows="newRows"
        :total="pageInfo.total"
        :sort="!!sort"
        :index="index"
        :selection="selectable"
        :groupBtns="groupBtns"
        :currPage="pagination ? currPageInfo[reqMap!.curr_page] : 1"
        :pageSize="pagination ? currPageInfo[reqMap!.page_size] : 20"
        :filterBtnsByAuth="filterBtnsByAuth"
        :refreshList="refreshList"
        @groupBtn="onGroupBtn"
        @selectionChange="handleSelectionChange"
        @update:cols="(cols:TableField[])=>{allCols=cols}"
        :disabled="disabled"
        v-bind="tableAttrs"
        :size="size"
        ref="queryTableRef"
      >
        <template #custom="{ row, col, $index }">
          <slot :name="col.prop" v-bind="{ row, col, $index }"></slot>
        </template>
      </QueryTable>
    </slot>
    <Pagination
      v-bind="pageAttrs"
      v-model:currPage="currPageInfo[reqMap!.curr_page]"
      v-model:pageSize="currPageInfo[reqMap!.page_size]"
      :total="pageInfo.total"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrChange"
      :small="size === 'small'"
      v-if="pagination && showPagination"
    />
  </div>
</template>
<script lang="ts" name="BaseCrud" setup>
import { ref, reactive, watch, computed, onMounted, inject } from "vue";
import { FormField, FormFieldAttrs } from "@/components/BaseFormItem";
import { TableField } from "@/components/table";
import { GroupBtnsType } from "@/components/BaseCrud/_components/GroupBtns.vue";
import { pickBy, cloneDeep, merge, upperFirst } from "lodash";
import ExtraBtns, { ToolBtnName } from "./_components/ExtraBtns/Index.vue";
import QueryTable from "@/components/BaseCrud/_components/QueryTable.vue";
import QueryForm from "@/components/BaseCrud/_components/QueryForm/Index.vue";
import { BtnName, BaseBtnType, getBtnObj, BtnItem } from "@/components/BaseBtn";
import {
  isProd,
  omitAttrs,
  printLog,
  propsJoinChar,
  rangeJoinChar,
  showMessage,
  typeOf,
  emptyVals,
  defaultReqMap,
  defaultResMap,
  defaultColSpanAttrs,
} from "@/components/_utils";
import Pagination from "./_components/Pagination.vue";
import { GroupBtnsAttrs } from "./_components/GroupBtns.vue";
import { splitPropsParams } from "@/components/_utils";
import { handleClickExtraBtns, getQueryFieldValue } from "./_utils";
import { FilterByAuthFn, batchBtnNames } from "@/components/BaseCrud";
import { CommonObj, FetchType, UniteFetchType, FinallyNext, StrNum, CommonSize } from "@/vite-env";
import { SectionFieldsItemAttrs } from "@/components/form";
import { ColSpanAttrs } from "@/components/form";
import { ClosePopupType } from "@/App.vue";
import config from "@/config";
import { SummaryListType, PaginationAttrs } from "@/components/table";
import { QueryFieldsItem, ReqMap, ResMap, TriggerGetListType } from "@/components/BaseCrud";
import Sortable from "sortablejs";
import { TplCfgAttrs } from "./_components/ImportPopup.vue";

const openPopup = inject<any>("openPopup");
const allCols = ref<TableField[]>([]);
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj; //表单数据
    rowKey?: string;
    formAttrs?: CommonObj; //el-form的属性配置
    tableAttrs?: CommonObj; //el-table的属性配置
    pageAttrs?: CommonObj; //分页配置
    disabled?: boolean; //是否禁用
    groupBtnsAttrs?: GroupBtnsAttrs; //分页配置
    pagination?: false | PaginationAttrs; //是否分页
    fields?: FormField[];
    sections?: SectionFieldsItemAttrs[];
    cols?: TableField[];
    selectAll?: boolean;
    fetch?: UniteFetchType;
    fetchSuccess?: (res: any) => void; //请求成功的回调函数
    fetchFail?: (err: any) => void; //请求成功的回调函数
    immediate?: boolean; //页面刚创建时是否立即发起请求获取数据
    extraBtns?: BaseBtnType[]; //额外的按钮，在表单下方，表格上方
    groupBtns?: GroupBtnsType; //分组按钮，在表格的操作一栏
    reqMap?: ReqMap; //请求参数的键名映射
    resMap?: ResMap; //响应参数的键名映射
    showPagination?: boolean;
    summaryList?: SummaryListType; //汇总请求数据的 list
    sort?: boolean | UniteFetchType; //是否展示排序列
    index?: boolean; //是否展示序号列
    selection?: boolean; //是否展示选择框
    batchBtn?: boolean; //是否显示批量按钮
    exportCfg?: {
      limit: number; //一次性导出数据的上限条数
    };
    importCfg?: TplCfgAttrs; //导入的下载模板配置
    extraParams?: CommonObj; //额外的参数
    log?: boolean; //是否console.log(rows)
    debug?: boolean; //是否在打印请求数据之后不执行请求的逻辑
    isOmit?: boolean; //是否剔除掉undefined, ''的属性值
    changeFetch?: boolean; //是否onChang之后就发送请求（仅限于Select类组件，不含Input类组件）
    inputDebounce?: boolean; //输入框输入时，是否通过防抖输入，触发搜索
    filterByAuth?: FilterByAuthFn;
    colSpanAttrs?: ColSpanAttrs;
    compact?: boolean; //表单项之间排列是否紧凑点
    size?: CommonSize;
    rowNum?: number; //筛选条件的表单展示几行
    handleRequest?: (args: CommonObj) => CommonObj; //处理参数
    handleResponse?: (res: any) => any; //处理响应数据
  }>(),
  Object.assign(
    {
      rowKey: "id",
      log: !isProd,
      fields: () => [],
      cols: () => [],
      immediate: true,
      changeFetch: true,
      batchBtn: false,
      isOmit: true,
      inputDebounce: true,
      exportCfg: () => ({ limit: 10000 }),
      pagination: () => ({ currPage: 1, pageSize: 20 }),
      reqMap: () => defaultReqMap,
      resMap: () => defaultResMap,
      showPagination: true,
      colSpanAttrs: () => defaultColSpanAttrs,
      // 跟下面的size: "small" 搭配使用，会，会使得排版布局更加紧凑
      // colSpanAttrs: () => ({
      //  xs: 12,
      //   sm: 12,
      //   md: 8,
      //   lg: 4,
      //   xl: 3,
      // }),
      // size: "small",
      compact: (_props: CommonObj) => _props.colSpanAttrs.xl < 6,
      filterByAuth: (auth: number[]) => true,
    },
    config?.BaseCrud?.Index
  )
);
const emits = defineEmits(["update:modelValue", "extraBtn", "groupBtn", "selectionChange", "rows", "dargSortEnd"]);
const closePopup: any = inject("closePopup");
const queryTableRef = ref<any>(null);
const queryFormRef = ref<any>(null);
const extraBtnsRef = ref<any>(null);
const baseCrudRef = ref<any>(null);
const { reqMap, resMap, extraParams = {} } = props;
const initPageInfo = props.pagination
  ? {
      [`${reqMap!.curr_page}`]: props.pagination.currPage,
      [`${reqMap!.page_size}`]: props.pagination.pageSize,
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
const model = computed({
  get() {
    return props.modelValue;
  },
  set(val: any) {
    emits("update:modelValue", val);
  },
});
//请求参数
let params: CommonObj = cloneDeep(initParams);
const newExtraBtns = computed<BtnItem[]>(() => {
  const { extraBtns = [], disabled } = props;
  const btns = extraBtns.map((btn: BaseBtnType) => {
    const btnObj: BtnItem = getBtnObj(btn);
    const { name, attrs, customRules } = btnObj;
    if (batchBtnNames?.includes(name as string)) {
      btnObj.popconfirm = false;
      if (customRules) {
        attrs!.disabled = !pageInfo.total;
      } else {
        attrs!.disabled = !seledRows.value.length;
      }
    }
    if (disabled) {
      attrs!.disabled = disabled;
    }
    return btnObj;
  });
  return filterBtnsByAuth(btns);
});
//是否存在批量按钮，若存在且不是自定义处理按钮逻辑，则表格中需要自动添加 selection 列
const existBatchBtns = computed<boolean>(() => {
  return !!newExtraBtns.value.find((it: BtnItem) => batchBtnNames.includes(it.name as BtnName) && !it.customRules);
});
const selectable = computed(() => props.selection || existBatchBtns.value);
const newCols = ref<TableField[]>(props.cols.slice());
//当额外参数改变时，发起请求
watch(
  () => props.extraParams,
  newVal => {
    merge(params, newVal);
    getList(params, undefined, "extraParams");
  },
  { deep: true }
);
onMounted(() => {
  // judgeIsInDialog("basic-dialog");
  props.sort && handleDragSort();
});
//重置
function handleReset() {
  Object.assign(currPageInfo, initPageInfo);
  params = cloneDeep(initParams);
  getList(params, undefined, "reset");
}
/**
 * 判断是否位于 dialog 弹窗中
 * @notice 先不要删除，后面可能会有用
 */
function judgeIsInDialog(className: string = "basic-dialog", startLevel: number = 5) {
  let isInDia = false;
  getTargetPar(startLevel);
  function getTargetPar(sLevel = 0) {
    let targetPar = baseCrudRef.value.parentNode;
    while (sLevel > 0) {
      targetPar = targetPar?.parentNode;
      sLevel--;
      if (targetPar?.classList?.contains(className)) {
        isInDia = true;
        break;
      }
    }
  }
  return isInDia;
}
//点击搜索
function handleSearch(data: CommonObj) {
  Object.assign(params, { [`${reqMap!.curr_page as string}`]: 1 });
  getList(params, undefined, "search");
}
//每页条数变化时
function handleSizeChange(val: number) {
  Object.assign(params, {
    [`${reqMap!.curr_page as string}`]: 1,
    [`${reqMap!.page_size as string}`]: val,
  });
  getList(params, undefined, "sizeChange");
}
//当前页码变化时
function handleCurrChange(val: number) {
  Object.assign(params, { [`${reqMap!.curr_page as string}`]: val });
  getList(params, undefined, "currChange");
}
/**
 * 处理change事件
 * @param changedVals change变动的表单字段
 * @param withModelData model是否有值（即初始值，是否有值）
 */
function handleChange(changedVals: CommonObj, withModelData?: boolean) {
  const { immediate, changeFetch } = props;
  changedVals = splitPropsParams(changedVals);
  if (withModelData) {
    merge(params, changedVals);
    Object.assign(initParams, params);
  } else {
    if (!changeFetch) return;
    // merge(params, changedVals, { [`${reqMap!.curr_page}`]: 1 }); //用merge合并时，属性值为对象时，不能完成合并，故采用下面的方法进行合并
    Object.assign(params, changedVals, { [`${reqMap!.curr_page}`]: 1 });
  }
  immediate && getList(params, undefined, "change");
}
//获取列表数据
function getList(args: CommonObj = params, cb?: FinallyNext, trigger: TriggerGetListType = "expose") {
  // console.log(trigger, "trigger-------触发getList类型");
  const { fetch, handleRequest, isOmit, handleResponse, selectAll, summaryList, fetchSuccess, fetchFail, log } = props;
  if (!fetch) return;
  loading.value = true;
  if (handleRequest) args = handleRequest(args);
  isOmit && (args = omitAttrs(args)); //剔除掉值为undefined, '', null的属性
  log && printLog(args, "req");
  fetch(args)
    .then((res: any) => {
      if (!res) return;
      if (handleResponse) res = handleResponse(res);
      const newList = res[resMap!.records as string];
      if (!newList) return console.error("响应数据不是标准的分页数据结构，请自测：", res);
      log && printLog(newList, "res");
      const _currPage = args[reqMap!.curr_page as string];
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
        total: res[resMap!.total_num as string],
        hasMore: res[resMap!.has_more as string],
      });
      Object.assign(currPageInfo, {
        [reqMap!.curr_page]: _currPage,
        [reqMap!.page_size]: args[reqMap!.page_size as string],
      });
      if (selectAll) {
        seledRows.value = newList;
      }
      fetchSuccess?.(res);
      emits("rows", newRows.value, args);
      cb?.();
    })
    .catch((err: any) => {
      fetchFail?.(err);
    })
    .finally(() => {
      loading.value = false;
    });
}
//点击额外的按钮
function onExtraBtn(btnObj: BtnItem) {
  const { rowKey, exportCfg, importCfg } = props;
  const { text } = btnObj;
  handleClickExtraBtns({
    btnObj,
    cols: allCols.value,
    seledRows: seledRows.value,
    seledKeys: seledRows.value.map((it: CommonObj) => it[rowKey]),
    total: pageInfo.total,
    exportCfg,
    emits,
    next: (hint = `${text || "操作"}成功`, closeType?: ClosePopupType, cb?: () => void, isRefreshList: boolean = true) => {
      showMessage(hint);
      closePopup(closeType);
      isRefreshList && refreshList();
      selectable.value && queryTableRef.value.clearSelection(); //清空全选
      cb?.();
    },
    openPopup,
    importCfg,
  });
}
//点击操作栏按钮
function onGroupBtn(btnObj: BtnItem, row: CommonObj, next: FinallyNext, isRefreshList: boolean = true) {
  const { name, text } = btnObj;
  emits("groupBtn", name, row, (hint?: string, closeType?: ClosePopupType, cb?: () => void) => {
    next(hint, closeType, cb);
    isRefreshList && refreshList();
  });
}
//处理多选改变时
function handleSelectionChange(rows: CommonObj[], keys: string[]) {
  seledRows.value = rows;
  emits("selectionChange", rows, keys);
}
//根据权限对按钮进行过滤
function filterBtnsByAuth(btns: BtnItem[] = []) {
  const { filterByAuth } = props;
  if (!filterByAuth) return btns;
  return btns.filter(({ auth }) => {
    return auth?.length ? filterByAuth(auth) : true;
  });
}
/**
 * 刷新列表
 * @param cb function 预留的回调函数
 */
function refreshList(cb?: () => void) {
  getList(params, cb, "refresh");
}
defineExpose({
  refreshList,
  getList,
  getQueryParams(isOmit = props.isOmit) {
    return isOmit ? omitAttrs(params) : params;
  },
  getQueryFields(excludeKeys = [reqMap!.curr_page, reqMap!.page_size]) {
    const queryFields: QueryFieldsItem[] = [];
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
});
// 拖拽排序
function handleDragSort(ele = queryTableRef.value.tableRef.$el.querySelector(".el-table__body-wrapper tbody") as HTMLElement) {
  const { rowKey } = props;
  Sortable.create(ele, {
    handle: ".sort-cell",
    animation: 300,
    onEnd(res: CommonObj) {
      const { newIndex, oldIndex } = res;
      if (typeof props.sort === "boolean") {
        emits("dargSortEnd", { newIndex, oldIndex }, (tips = "修改排序成功") => {
          // const removeItem = newRows.value.splice(oldIndex, 1)[0];
          // newRows.value.splice(newIndex, 0, removeItem);
          showMessage(tips);
        });
      } else {
        // (props.sort as any)({[rowKey]})
      }
    },
  });
}
</script>
<style lang="scss" scoped>
.base-crud {
  height: 100%;
  width: 100%;
  // overflow: auto;
}
</style>
