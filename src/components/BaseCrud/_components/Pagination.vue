<!-- 组件 - 分页 -->
<template>
  <el-pagination
    class="f-c-c mt-h f-0"
    v-model:currentPage="newCurrPage"
    v-model:pageSize="newPageSize"
    :total="total"
    :pageSizes="pageSizes"
    @size-change="(val:number)=>emits('update:sizeChange',val)"
    @current-change="(val:number)=>emits('update:currentChange',val)"
    v-bind="defaultPaginationAttrs"
  />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, toRefs } from "vue";
import { CommonObj } from "@/vite-env";
import config from "@/config";
import { defaultPaginationAttrs } from "@/components/table";

const props = withDefaults(
  defineProps<{
    currPage?: number;
    pageSize?: number;
    total?: number;
    pageSizes?: number[];
  }>(),
  Object.assign(
    {
      pageSize: 10,
      currPage: 1,
      pageSizes: () => [10, 20, 30, 50, 100],
    },
    config?.BaseCrud?._components?.Pagination
  )
);
const emits = defineEmits(["update:currPage", "update:pageSize", "update:sizeChange", "update:currentChange"]);
const newCurrPage = computed({
  get: () => props.currPage,
  set: (val: number) => emits("update:currPage", val),
});
const newPageSize = computed({
  get: () => props.pageSize,
  set: (val: number) => emits("update:pageSize", val),
});
</script>
<style lang="scss" scoped></style>
