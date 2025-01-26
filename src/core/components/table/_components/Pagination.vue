<!-- 组件 - 分页 -->
<template>
  <el-pagination
    class="pagination f-c-c"
    v-model:currentPage="newCurrPage"
    v-model:pageSize="newPageSize"
    :total="total"
    :pageSizes="pageSizes"
    v-bind="defaultPaginationAttrs"
    @size-change="(val: number)=>$emit('update:sizeChange', val)"
    @current-change="(val: number)=>$emit('update:currentChange', val)"
  />
</template>
<script lang="ts" setup>
import config from "@/core/config";
import { defaultPaginationAttrs } from "@/core/components/table";

const props = withDefaults(
  defineProps<{
    currPage?: number;
    pageSize?: number;
    total?: number;
    pageSizes?: number[];
  }>(),
  {
    pageSize: 10,
    currPage: 1,
    pageSizes: () => [10, 20, 30, 50, 100],
    ...config?.Pagination,
  }
);
const $emit = defineEmits(["update:currPage", "update:pageSize", "update:sizeChange", "update:currentChange"]);
const newCurrPage = computed({
  get: () => props.currPage,
  set: (val: number) => $emit("update:currPage", val),
});
const newPageSize = computed({
  get: () => props.pageSize,
  set: (val: number) => $emit("update:pageSize", val),
});
</script>
<style lang="scss" scoped></style>
