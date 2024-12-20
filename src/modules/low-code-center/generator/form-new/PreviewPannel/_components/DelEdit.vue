<!-- 删除编辑按钮 -->
<template>
  <div class="del-edit">
    <AddDelBtn @click="$emit('del')" type="del" />
    <AddDelBtn @click="$emit('edit')" type="edit" />
  </div>
</template>
<script lang="ts" setup>
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import AddDelBtn from "@/core/components/form/_components/AddDelBtn.vue";
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const $emit = defineEmits(["del", "edit"]);
</script>
<style lang="scss" scoped></style>
