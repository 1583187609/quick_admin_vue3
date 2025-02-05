<template>
  <div class="extra-btns f-fs-fs-w">
    <BaseBtn :tpl="btn" isStand @click="(...args) => $emit('click', ...args)" v-for="(btn, ind) in newBtns" :key="ind" />
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { sortObjArrByKey } from "@/core/utils";
import { BaseBtnType, BtnItem } from "@/core/components/BaseBtn/_types";
import { getBtnObj } from "@/core/components/BaseBtn";
import config from "@/core/config";

const props = withDefaults(
  defineProps<{
    btns?: BaseBtnType[];
    isStand?: boolean;
  }>(),
  {
    btns: () => [],
    isStand: true,
    ...config?.BaseCrud?.ExtraBtns,
  }
);
const $emit = defineEmits(["click"]);
const newBtns = computed(() => {
  const { isStand, btns } = props;
  return sortObjArrByKey(isStand ? (btns as BtnItem[]) : btns.map(btn => getBtnObj(btn)));
});
</script>
<style lang="scss" scoped>
.extra-btns {
  padding: var(--gap-half) 0;
  .el-button + .el-button {
    margin-left: $gap-half;
  }
}
.base-btn {
  margin-bottom: var(--gap-half);
}
</style>
