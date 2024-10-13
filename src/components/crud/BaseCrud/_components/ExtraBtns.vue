<template>
  <div class="extra-btns f-fs-fs-w">
    <BaseBtn :name="btn" class="btn-item" :class="size" @click="emits('click', btn)" v-for="(btn, ind) in newBtns" :key="ind" />
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { sortObjArrByKey } from "@/components/_utils";
import { BaseBtnType } from "@/components/BaseBtn/_types";
import { getBtnObj } from "@/components/BaseBtn";
import config from "@/config";
import { CommonSize } from "@/vite-env";
import { defaultCommonSize } from "@/components/_utils";

const props = withDefaults(
  defineProps<{
    size?: CommonSize;
    btns?: BaseBtnType[];
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
const newBtns = computed(() => sortObjArrByKey(props.btns.map(btn => getBtnObj(btn))));
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
