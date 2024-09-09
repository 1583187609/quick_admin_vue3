<template>
  <el-popover ref="popoverRef" placement="bottom" :width="width - 100" trigger="click">
    <template #reference>
      <el-input v-model="menuText" placeholder="请选择父级菜单" @clear="emits('update:modelValue', '')" clearable></el-input>
    </template>
    <el-tree
      class="menu-tree"
      ref="treeRef"
      :data="data"
      :props="{
        label: 'name',
        class: customNodeClass,
      }"
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
    />
  </el-popover>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { ElTree, useFormItem } from "element-plus";
import { getTextFromOptions } from "@/utils";
import { StrNum } from "@/vite-env";

export interface MenuTreeNode {
  id: number;
  parentId: number;
  name: string;

  type: 0 | 1 | 2 | 3; //0目录 1菜单 2外链 3按钮
  component: string;
  // haveChild: boolean;
  disabled: boolean;
  children: MenuTreeNode[];
}
const props = withDefaults(
  defineProps<{
    width?: number;
    data?: MenuTreeNode[];
    modelValue?: StrNum; //父级id
  }>(),
  {
    data: () => [],
    width: 600,
    modelValue: "",
  }
);
const emits = defineEmits(["update:modelValue"]);
const treeRef = ref<InstanceType<typeof ElTree>>();
const customNodeClass = (data: MenuTreeNode, node: MenuTreeNode) => {
  if (data.type === 0) return null;
  return "node-hide";
};
const popoverRef = ref<any>(null);
const menuText = computed(() => {
  const { data, modelValue } = props;
  return getTextFromOptions(data, modelValue, { label: "name", value: "id" }, "");
});
const { formItem } = useFormItem();
const handleNodeClick = (data: MenuTreeNode) => {
  const { id, name } = data;
  emits("update:modelValue", id);
  formItem?.validate("blur");
  popoverRef.value.hide();
};
</script>
<style lang="scss" scoped>
.menu-tree {
  max-height: 500px;
  overflow: auto;
}
:deep(.node-hide) {
  display: none;
}
</style>
