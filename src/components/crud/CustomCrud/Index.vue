<!--  summary
  这是自定义的增删改查列表
 -->
<template>
  <BaseCrud class="custom-crud" :summaryList="summaryList" :showPagination="!summaryList" ref="crudRef">
    <template #default="{ loading, params, rows, total, hasMore }">
      <LoadMore
        class="f-1"
        @reachBottom="handleReachBottom(params)"
        :paddingBottom="hasMore ? 0 : 250"
        :loading="loading"
        v-if="summaryList"
      >
        <slot name="list" :list="rows" :total="total" :hasMore="hasMore"> </slot>
      </LoadMore>
      <div class="list-box f-1" v-loading="loading" v-else>
        <slot name="list" :list="rows" :total="total" :hasMore="hasMore"> </slot>
      </div>
    </template>
  </BaseCrud>
</template>
<script lang="ts" name="CustomCrud" setup>
import { ref, reactive, watch, computed, inject, useSlots } from "vue";
import LoadMore from "@/components/LoadMore.vue";
import { PaginationAttrs, SummaryListType } from "@/components/table";
import { CommonObj, UniteFetchType, FinallyNext } from "@/vite-env";
import { FilterByAuthFn } from "../BaseCrud";
const props = withDefaults(
  defineProps<{
    summaryList?: SummaryListType; //汇总请求数据的 list
    filterByAuth?: FilterByAuthFn;
  }>(),
  {}
);
const emits = defineEmits(["update:modelValue", "extraBtns", "operateBtns", "selectionChange"]);
const crudRef = ref<any>(null);
/**
 * 刷新列表
 * @param cb function 预留的回调函数
 */
function handleReachBottom(params: CommonObj) {
  params.page = params.page + 1;
  crudRef.value.getList(params);
}
defineExpose(crudRef.value);
</script>
<style lang="scss" scoped>
.custom-crud {
  overflow: auto;
  .list-box {
    overflow: auto;
  }
}
</style>
