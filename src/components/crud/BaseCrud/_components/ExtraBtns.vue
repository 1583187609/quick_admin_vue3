<template>
  <div class="extra-btns f-fs-fs-w">
    <BaseBtn
      :name="btn"
      :size="size"
      class="btn-item"
      :class="size"
      :disabled="disabled"
      @click="handleClick(btn)"
      v-for="(btn, ind) in newBtns"
      :key="ind"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { sortObjArrByKey } from "@/components/_utils";
import { BaseBtnType, BtnItem } from "@/components/BaseBtn/_types";
import { getBtnObj } from "@/components/BaseBtn";
import config from "@/config";
import { CommonSize } from "@/vite-env";
import { defaultCommonSize } from "@/components/_utils";

const props = withDefaults(
  defineProps<{
    size?: CommonSize;
    btns?: BaseBtnType[];
    disabled?: boolean;
  }>(),
  Object.assign(
    {
      size: defaultCommonSize,
      btns: () => [],
    },
    config?.BaseCrud?._components?.ExtraBtns
  )
);
const emits = defineEmits(["click"]);
const newBtns = computed(() => {
  const _newBtns = props.btns.map(btn => getBtnObj(btn));
  sortObjArrByKey(_newBtns);
  return _newBtns;
});
function handleClick(btnObj: BtnItem) {
  emits("click", btnObj);
}
</script>
<style lang="scss" scoped>
.btn-item {
  &.large {
    margin-bottom: $gap-large;
  }
  &.default {
    margin-bottom: $gap-default;
  }
  &.small {
    margin-bottom: $gap-small;
  }
}
</style>
