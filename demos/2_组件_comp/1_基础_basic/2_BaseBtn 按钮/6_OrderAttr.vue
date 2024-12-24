<!-- summary 按钮顺序
  使用 order 设置多个按钮存在时的排列顺序值，数值越小越靠前。这在一组按钮中（查询列表的额外按钮组、表格的操作栏按钮组）会非常有用，避免开发时需要记忆按钮顺序。
-->
<template>
  <BaseBtn v-bind="btn" v-for="(btn, ind) in tplOrderBtns" :key="ind" />
  <br />
  <BaseBtn v-bind="btn" v-for="(btn, ind) in customOrderBtns" :key="ind" />
</template>
<script lang="ts" setup>
const tplOrderBtns = [{ tpl: "enable" }, { tpl: "delete" }, { tpl: "view" }, { tpl: "add" }, { tpl: "forbid" }, { tpl: "edit" }];
const customOrderBtns = [
  { tpl: "enable", order: 1 },
  { tpl: "delete", order: 2 },
  { tpl: "view", order: 3 },
  { tpl: "add", order: 4 },
  { tpl: "forbid", order: 5 },
  { tpl: "edit", order: 6 },
];
</script>
<style lang="scss" scoped>
.base-btn {
  margin: $gap-qtr;
}
</style>
