<!-- 内嵌至系统的表格列类型 -->
<template>
  <UserInfo :data="row[col.prop as string]" v-bind="col.attrs" v-if="col.type === 'UserInfo'" />
</template>
<script lang="ts" setup>
import UserInfo from "@/components/UserInfo.vue";
import { TableColAttrs } from "@/core/components/table/_types";

export type InsertTableColCompsType = "UserInfo";
export type InsertTableColTplsType = "T_UserInfo";

const props = withDefaults(
  defineProps<{
    col: TableColAttrs;
    row: {
      $index: number; // 行下标
      [key: string]: any;
    };
  }>(),
  {}
);
</script>
<style lang="scss" scoped></style>
