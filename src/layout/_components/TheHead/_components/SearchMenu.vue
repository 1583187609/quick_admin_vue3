<template>
  <el-input class="mb-o" v-model="searchVal" placeholder="请输入菜单关键字">
    <template #prepend>
      <el-select v-model="seledKey" placeholder="请选择" style="width: 8em">
        <el-option v-bind="item" v-for="(item, ind) in opts" :key="ind" />
      </el-select>
    </template>
    <template #append>
      <el-button :icon="Search" />
    </template>
  </el-input>
  <el-tree ref="treeRef" :data="treeData" :filter-node-method="filterNode" @node-click="handleNodeClick" />
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed, inject } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElTree } from "element-plus";
import type { MenusItem } from "@/layout/_components/SideMenu/Index.vue";
import { useRouter } from "vue-router";
import { useMenuStore } from "@/store";
import { CommonObj, OptionItem } from "@/vite-env";
const router = useRouter();
const closePopup: any = inject("closePopup");
const props = withDefaults(
  defineProps<{
    defaultKey?: string;
  }>(),
  {
    defaultKey: "all",
  }
);
const menuStore = useMenuStore();
const opts = reactive<OptionItem[]>([{ label: "全部", value: "all" }]);
menuStore.allMenus.map((group: MenusItem, ind: number) => {
  const { label, path } = group;
  opts.push({ label, value: path });
});
const searchVal = ref("");
const treeData = computed(() => {
  const { allMenus } = menuStore;
  if (seledKey.value === "all") {
    return allMenus;
  } else {
    const target = allMenus.find((it: MenusItem) => it.path === seledKey.value);
    return target?.children;
  }
});
const seledKey = ref(props.defaultKey);
const treeRef = ref<InstanceType<typeof ElTree>>();
watch(searchVal, val => {
  treeRef.value!.filter(val);
});
function filterNode(value: string, data: CommonObj) {
  if (!value) return true;
  return data.label.includes(value);
}
function handleNodeClick(itemInfo: any, nodeInfo: any, arg3: any, arg4: any) {
  const { isLeaf, level } = nodeInfo;
  if (seledKey.value === "all" ? level > 1 && isLeaf : isLeaf) {
    router.push(itemInfo.path);
    closePopup?.("dialog");
    // console.log(
    //   itemInfo,
    //   nodeInfo,
    //   arg3,
    //   arg4,
    //   "itemInfo,arg2,arg3,arg4-----------------"
    // );
  }
}
</script>
<style lang="scss" scoped></style>
