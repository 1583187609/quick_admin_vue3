<!-- 页面-简介 -->
<template>
  <el-tree-select
    v-model="modelVal"
    check-strictly
    placeholder="请选择上级菜单"
    class="menu-tree"
    :data="autoMenus"
    :props="{ value: 'path' }"
  />
</template>
<script lang="ts" setup>
import { autoMenus } from "@/router/routes/auto";
const props = withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {}
);
const $emit = defineEmits(["update:modelValue"]);
const modelVal = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});
</script>
<style lang="scss" scoped>
.menu-tree {
}
</style>
