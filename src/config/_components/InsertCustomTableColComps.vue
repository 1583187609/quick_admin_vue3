<!-- 内嵌至系统的表格列类型 -->
<template>
  <UserInfo :data="row[col.prop as string]" v-bind="col.attrs" v-if="col.type === 'UserInfo'" />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import UserInfo from "@/components/UserInfo.vue";
import { TableColAttrs } from "@/core/components/table/_types";
import { CommonObj } from "@/vite-env";

export type InsertTableColCompsType = "UserInfo";

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
