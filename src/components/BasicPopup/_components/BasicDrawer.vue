<template>
  <el-drawer v-model="show" class="basic-drawer" :title="title">
    <slot />
  </el-drawer>
</template>
<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
  }>(),
  {
    modelValue: false,
    title: "查看详情",
  }
);
const emits = defineEmits(["update:modelValue"]);
const show = computed({
  get: () => props.modelValue,
  set: (isShow: boolean) => emits("update:modelValue", isShow),
});
</script>
<style lang="scss">
// 抽屉（drawer)
.basic-drawer {
  .el-drawer__header {
    // font-weight: 600;
    margin-bottom: 0;
    padding-bottom: $gap-half;
    // background: $color-bg-light;
    border-bottom: $border-main;
  }
  .el-drawer__title {
    font-size: $font-size-heavyer;
  }
}
</style>
