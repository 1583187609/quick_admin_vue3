<template>
  <el-drawer class="basic-drawer" v-model="show" v-bind="newAttrs">
    <slot />
  </el-drawer>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
const defaultAttrs = {
  title: "title 标题",
  size: "none",
  closeOnClickModal: false,
  appendToBody: true,
  destroyOnClose: true,
};
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    body?: any;
  }>(),
  {
    modelValue: false,
  }
);
const emits = defineEmits(["update:modelValue"]);
const newAttrs = Object.assign({}, defaultAttrs);
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
