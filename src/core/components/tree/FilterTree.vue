<!-- summary
  继承自BaseTree，带过滤条件的树。
-->
<template>
  <div class="filter-tree f-fs-s-c" :style="style" :class="props.class">
    <el-input class="f-0" size="small" v-model.trim="filterText" placeholder="请输入关键词" clearable v-bind="inputAttrs">
      <template #prepend v-if="options?.length">
        <el-select v-model="selectType" placeholder="请选择" style="width: 6em">
          <el-option v-bind="opt" v-for="(opt, ind) in options" :key="ind" />
        </el-select>
      </template>
    </el-input>
    <BaseTree class="f-1" :filter-node-method="filterNodeMethod" defaultExpandAll v-bind="$attrs" ref="baseTreeRef" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, useAttrs } from "vue";
import { ElTree } from "element-plus";
import { CommonObj, OptionItem } from "@/core/_types";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    class?: any; // 外层盒子的类名
    style?: any; // 外层盒子的样式
    inputAttrs?: CommonObj;
    options?: OptionItem[];
    defaultSelectValue?: number;
    filterNodeMethod?: (value: string, data: CommonObj, node: CommonObj) => boolean;
  }>(),
  {
    defaultSelectValue: 0,
    filterNodeMethod: (value: string | (string | number)[], data: CommonObj, node: CommonObj) => {
      const val = Array.isArray(value) ? value[1] : value;
      if (!val) return true;
      return data.label.includes(val);
    },
  }
);

const $attrs = useAttrs();
const baseTreeRef = ref<InstanceType<typeof ElTree>>();
const selectType = ref<number>(props.defaultSelectValue);
const filterText = ref("");

watch([filterText, selectType], ([newVal, newNum]: [string, number]) => {
  baseTreeRef.value?.treeRef?.filter(props.options?.length ? [newVal, newNum] : newVal);
});

defineExpose({
  baseTreeRef,
});
</script>
<style lang="scss" scoped>
.filter-tree {
  height: 100%;
  .el-input {
    margin-bottom: $gap-half;
  }
}
</style>
