<template>
  <el-tree class="base-tree" :load="load" :data="data" :lazy="lazy" ref="treeRef">
    <template #empty>
      <BaseEmpty />
    </template>
    <template #[key]="scope" v-for="(val, key) in getSlotsMap(slots)" :key="key">
      <BaseRender :renderData="val" :scope="scope" />
    </template>
  </el-tree>
</template>

<script lang="ts" setup>
import { CommonObj, CommonSlots } from "@/core/_types";
import { getSlotsMap } from "@/utils";
import { ElTree } from "element-plus";

const props = withDefaults(
  defineProps<{
    load?: (node: Node, resolve: (data: CommonObj[]) => void) => CommonObj[];
    lazy?: boolean;
    data?: CommonObj[];
    slots?: CommonSlots;
  }>(),
  {
    lazy: _props => !!_props.load,
    data: () => [],
  }
);
const treeRef = ref<InstanceType<typeof ElTree>>(null);

defineExpose({
  treeRef,
});
</script>
