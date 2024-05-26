<template>
  <el-drawer class="basic-drawer" v-model="show" v-bind="newAttrs" append-to-body destroy-on-close>
    <slot>
      <BaseRender :data="body" />
    </slot>
  </el-drawer>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
const defaultAttrs = {
  title: "title 标题",
  size: "none",
  closeOnClickModal: false,
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
  get() {
    return props.modelValue;
  },
  set(isShow: boolean) {
    emits("update:modelValue", isShow);
  },
});
</script>
<style lang="scss" scoped>
// :deep(.el-drawer__header) {
//   font-weight: 700;
//   font-size: 28px;
//   margin-bottom: 0 !important;
// }
// ::v-deep {
//   // .el-drawer {
//   .el-drawer__header {
//     margin-bottom: 0 !important;
//   }
//   // }
// }
// :deep(.el-drawer .el-drawer__header) {
//   margin-bottom: 0 !important;
// }
// .el-drawer__header {
//   margin-bottom: 0 !important;
// }
</style>
