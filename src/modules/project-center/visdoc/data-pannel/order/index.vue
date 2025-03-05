<!-- 订单数据 -->
<template>
  <BaseCrud :cols="cols" :fields="fields" :fetch="GetMockUser" :extraBtns="['export']"> </BaseCrud>
</template>
<script lang="ts" setup>
import { GetMockUser } from "@/api-mock";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";

const fields: FormField[] = [
  { prop: "yhid", label: "订单ID" },
  { prop: "ffzt", label: "VIP等级", type: "select" },
  { prop: "czr", label: "第三方订单号" },
  { prop: "bz", label: "用户ID" },
  { prop: "ffsj", label: "支付状态", type: "select" },
  { prop: "ffsj", label: "支付位置", type: "select" },
  { prop: "ffsj", label: "转化最小周期" },
  { prop: "ffsj", label: "转化最大周期" },
  { prop: "ffsj", label: "渠道类型", type: "select" },
  { prop: "ffsj", label: "广告来源", type: "select" },
  { prop: "ffsj", label: "广告单元", type: "select" },
  { prop: "ffsj", label: "广告关键词" },
  { prop: "ffsj", label: "广告描述" },
  { prop: "ffsj", label: "支付订单号" },
  { prop: "ffsj", label: "支付时间", type: "date-picker" },
  { prop: "ffsj", label: "生成时间", type: "date-picker" },
  { prop: "zcsj", label: "注册时间", type: "date-picker" },
];
const cols: TableCol[] = [
  { prop: "ffcgyhid", label: "订单ID" },
  { tpl: "T_BaseTag", prop: undefined, label: "是否挽留", attrs: { name: "D_YesNoStatus" } },
  { tpl: "T_BaseTag", prop: undefined, label: "VIP种类" },
  { tpl: "T_BaseTag", prop: undefined, label: "是否付费", attrs: { name: "D_YesNoStatus" } },
  { tpl: "T_BaseTag", prop: undefined, label: "是否续费", attrs: { name: "D_YesNoStatus" } },
  { tpl: "T_BaseTag", label: "续费周期" },
  { tpl: "T_BaseTag", label: "订单生成时间" },
  { tpl: "T_BaseTag", label: "支付时间" },
  { tpl: "T_BaseTag", label: "用户注册时间" },
  { tpl: "T_BaseTag", label: "用户ID" },
  { prop: "zcsj", label: "前台ID" },
  { prop: "bz", label: "用户名称" },
  { tpl: "T_BaseTag", label: "支付方式" },
  { prop: "shddh", label: "商户订单号" },
  { prop: "updated", label: "支付订单号" },
  { tpl: "T_BaseTag", prop: undefined, label: "是否扫码", attrs: { name: "D_YesNoStatus" } },
  { prop: "updated", label: "注册转化周期" },
  { prop: "updated", label: "支付金额" },
  { prop: "updated", label: "订单金额" },
  { tpl: "T_BaseTag", prop: undefined, label: "支付位置", attrs: { name: "D_YesNoStatus" } },
  { prop: "updated", label: "广告计划" },
  { tpl: "T_BaseTag", prop: undefined, label: "广告来源", attrs: { name: "D_YesNoStatus" } },
  { tpl: "T_BaseTag", prop: undefined, label: "广告单元", attrs: { name: "D_YesNoStatus" } },
  { prop: "updated", label: "广告关键词" },
  { prop: "updated", label: "广告描述" },
];
</script>
<style lang="scss" scoped></style>
