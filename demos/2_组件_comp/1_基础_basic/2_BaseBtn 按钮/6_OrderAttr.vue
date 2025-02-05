<!-- summary 按钮顺序
  使用 order 设置多个按钮存在时的排列顺序值，数值越小越靠前。这在一组按钮中（查询列表的额外按钮组、表格的操作栏按钮组）会非常有用，避免开发时需要记忆按钮顺序。
-->
<template>
  <div class="mb-o">
    <span>自然排序：</span>
    <BaseBtn v-bind="btn" v-for="(btn, ind) in originOrderBtns" :key="ind" />
  </div>
  <div>
    <span>order排序：</span>
    <BaseBtn v-bind="btn" v-for="(btn, ind) in sortOrderBtns" :key="ind" />
  </div>
</template>
<script lang="ts" setup>
import { sortObjArrByKey } from "@/utils";
const originOrderBtns = [
  { tpl: "enable", order: 10 },
  { tpl: "delete", order: 2 },
  { tpl: "view", order: 3 },
  { tpl: "add", order: 9 },
  { tpl: "forbid", order: 1 },
  { tpl: "edit", order: 6 },
];
const sortOrderBtns = sortObjArrByKey([...originOrderBtns]);
</script>
<style lang="scss" scoped></style>
