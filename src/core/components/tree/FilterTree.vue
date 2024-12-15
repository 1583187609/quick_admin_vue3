<!-- 带过滤条件的树 -->
<template>
  <div class="filter-tree" :style="style" :class="props.class">
    <el-input v-model="filterText" placeholder="请输入搜索词" clearable v-bind="inputAttrs" />
    <BaseTree :filter-node-method="filterNodeMethod" defaultExpandAll v-bind="$attrs" ref="baseTreeRef" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, useAttrs } from "vue";
import { ElTree } from "element-plus";
import { CommonObj } from "@/core/_types";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    class?: any; // 外层盒子的类名
    style?: any; // 外层盒子的样式
    inputAttrs?: CommonObj;
    filterNodeMethod?: (value: string, data: CommonObj, node: CommonObj) => boolean;
  }>(),
  {
    filterNodeMethod: (val: string, data: CommonObj, node: CommonObj) => {
      if (!val) return true;
      // const labelKey = props?.label ?? "label";
      return data.label.includes(val);
    },
  }
);

const $attrs = useAttrs();
const baseTreeRef = ref<InstanceType<typeof ElTree>>();
const filterText = ref("");

watch(filterText, (val: string) => {
  baseTreeRef.value?.treeRef?.filter(val);
});

defineExpose({
  baseTreeRef,
});
</script>
<style lang="scss" scoped></style>
