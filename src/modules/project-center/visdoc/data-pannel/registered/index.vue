<!-- 注册数据 -->
<template>
  <BaseCrud
    :cols="cols"
    :fields="fields"
    :fetch="GetMockUser"
    :extraBtns="['export']"
    :operateBtns="[
      { name: 'add', text: '赠送VIP' },
      { name: 'delete', text: '清除VIP', popconfirm: false },
    ]"
    @operateBtns="onOperateBtns"
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { GetMockUser, DeleteMockUser } from "@/api-mock";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";
import { handleBtnNext } from "@/utils";
import GiveVip from "./GiveVip.vue";
import ClearVip from "./ClearVip.vue";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { CommonObj, FinallyNext } from "@/core/_types";
import { usePopup } from "@/hooks";

const { openPopup } = usePopup();
const fields: FormField[] = [
  { prop: "yhid", label: "用户ID" },
  {
    prop: "ffzt",
    label: "用户前台ID",
  },
  { prop: "czr", label: "用户昵称" },
  { prop: "bz", label: "手机号码" },
  { prop: "ffsj", label: "邮箱" },
  { prop: "ffsj", label: "是否会员", type: "select" },
  { prop: "ffsj", label: "用户状态", type: "select" },
  { prop: "ffsj", label: "广告来源", type: "select" },
  { prop: "ffsj", label: "广告单元", type: "select" },
  { prop: "ffsj", label: "广告关键词" },
  { prop: "ffsj", label: "广告描述" },
  { tpl: "T_CreateTime", label: "注册时间" },
];
const cols: TableCol[] = [
  {
    prop: "ffcgyhid",
    label: "用户ID",
    minWidth: 210,
  },
  {
    prop: "ffsbyhid",
    label: "前台ID",
    minWidth: 210,
  },
  {
    prop: "ffje",
    label: "用户昵称",
    minWidth: 90,
  },
  {
    prop: "ffzt",
    label: "手机号码",
  },
  { prop: "ffsj", label: "邮箱" },
  { tpl: "T_BaseTag", label: "会员类型" },
  { tpl: "T_BaseTag", label: "注册位置" },
  { tpl: "T_BaseTag", label: "是否会员" },
  { tpl: "T_BaseTag", label: "用户状态" },
  { tpl: "T_BaseTag", label: "是否付费" },
  { prop: "zcsj", l: "注册时间" },
  { prop: "bz", label: "广告计划" },
  { tpl: "T_BaseTag", label: "广告来源" },
  { tpl: "T_BaseTag", label: "广告单元" },
  { prop: "updated", label: "广告关键词" },
  { prop: "updated", label: "广告描述" },
  { prop: "updated", label: "最后登录时间" },
];
function onOperateBtns(name: BtnName, row: CommonObj, next: FinallyNext) {
  const { id } = row;
  handleBtnNext(
    {
      add: () => openPopup(`赠送VIP`, [GiveVip, { data: row, refreshList: next }]),
      delete: () => openPopup(`清除VIP`, [ClearVip, { data: row, refreshList: next }]),
    },
    name
  );
}
</script>
<style lang="scss" scoped></style>
