<!-- 基础表格-->
<template>
  <BaseTable class="q-page-view" :cols="cols" :data="rows" :operateBtns="['edit', 'delete']" @operateBtns="onOperateBtns">
    <template #zdy>这是自定义表格列</template>
  </BaseTable>
</template>
<script lang="ts" setup>
import { CommonObj, FinallyNext } from "@/core/_types";
import { handleBtnNext } from "@/utils";
import { BtnName } from "@/core/components/BaseBtn/_types";

const cols = [
  { prop: "xm", label: "用户信息", type: "UserInfo" },
  // { prop: "id", label: "用户ID", fixed: "left" },
  // { prop: "nc", label: "昵称" },
  // {
  //   prop: "zy",
  //   label: "职业",
  // },
  { prop: "xb", label: "性别" },
  { prop: "nl", label: "年龄" },
  { prop: "xx", label: "学校" },
  { prop: "jg", label: "籍贯" },
  { prop: "xjd", label: "现居地" },
  { prop: "ip", label: "IP地址" },
  { prop: "dh", label: "电话" },
  { prop: "zdy", label: "自定义", type: "slot" },
];

const rows = [
  { id: 1, zy: "大家看到", xb: "男" },
  { id: 2, zy: "大家看到", xb: "男" },
  { id: 3, zy: "大家看到", xb: "男" },
  { id: 4, zy: "大家看到", xb: "男" },
  { id: 5, zy: "大家看到", xb: "男" },
  { id: 6, zy: "大家看到", xb: "男" },
  { id: 7, zy: "大家看到", xb: "男" },
  { id: 8, zy: "大家看到", xb: "男" },
  { id: 9, zy: "大家看到", xb: "男" },
  { id: 10, zy: "大家看到", xb: "男" },
  { id: 11, zy: "大家看到", xb: "男" },
  { id: 12, zy: "大家看到", xb: "男" },
  { id: 13, zy: "大家看到", xb: "男" },
];

function onOperateBtns(name: BtnName, row: CommonObj, next: FinallyNext) {
  const { id } = row;
  handleBtnNext(
    {
      // edit: () => handleAddEdit(row, next),
      // delete: () => DeleteMockUser({ id }).then(() => next()),
    },
    name
  );
}
</script>
<style lang="scss" scoped></style>
