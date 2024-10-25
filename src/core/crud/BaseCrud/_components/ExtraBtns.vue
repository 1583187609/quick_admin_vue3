<template>
  <div class="extra-btns f-fs-fs-w">
    <BaseBtn :name="btn" class="btn-item" :class="size" @click="$emit('click', btn)" v-for="(btn, ind) in newBtns" :key="ind" />
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { sortObjArrByKey } from "@/core/_utils";
import { BaseBtnType } from "@/core/BaseBtn/_types";
import { getBtnObj } from "@/core/BaseBtn";
import config from "@/config";
import { CommonSize } from "@/vite-env";
import { defaultCommonSize } from "@/core/_utils";

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
const $emit = defineEmits(["click"]);
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
