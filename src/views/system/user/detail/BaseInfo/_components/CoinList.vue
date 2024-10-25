<!-- 金币明细 -->
<template>
  <BaseTable :cols="cols" :rows="rows" class="coin-list">
    <template #bdje="{ row }">
      <div :class="row.bdje.startsWith('-') ? 'green' : 'red'">
        {{ row.bdje }}
      </div>
    </template>
  </BaseTable>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { TableColAttrs } from "@/core/table/_types";
import { CommonObj } from "@/vite-env";

const props = withDefaults(
  defineProps<{
    data?: CommonObj;
  }>(),
  {
    data: () => ({}),
  }
);
const cols: TableColAttrs[] = [
  { prop: "lx", label: "类型", width: 200 },
  { prop: "bdsj", label: "变动时间", width: 120 },
  { prop: "bdje", label: "变动金额", width: 100, type: "custom" },
  { prop: "ye", label: "余额", width: 100 },
];
const rows = reactive([
  { lx: "完善资料", bdsj: "2023-07-26", bdje: "+100", ye: 400 },
  { lx: "邀请注册", bdsj: "2023-07-26", bdje: "+100", ye: 400 },
  { lx: "解锁更多嘉宾", bdsj: "2023-07-26", bdje: "-100", ye: 400 },
]);
</script>
<style lang="scss" scoped>
.green {
  color: green;
}
.red {
  color: red;
}
</style>
