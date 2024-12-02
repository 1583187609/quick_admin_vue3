<!-- 登录信息 -->
<template>
  <BaseTable class="" :cols="cols" :rows="rows"></BaseTable>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { TableColAttrs } from "@/core/components/table/_types";
import { CommonObj } from "@/core/_types";

const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {
    data: () => ({}),
  }
);
const cols: TableColAttrs[] = [
  { prop: "dlsj", label: "登录时间" },
  { prop: "dlip", label: "登录IP" },
  { prop: "wzxx", label: "位置信息" },
  { prop: "sbxx", label: "设备信息" },
  { prop: "dlzd", label: "登录终端" },
];
const rows: CommonObj[] = reactive<CommonObj[]>([]);
</script>
<style lang="scss" scoped></style>
