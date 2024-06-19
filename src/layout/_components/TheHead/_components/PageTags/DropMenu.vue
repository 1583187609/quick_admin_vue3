<template>
  <el-dropdown ref="dropRef" class="drop-menu" :style="style" trigger="contextmenu" @visible-change="handleVisible" hide-on-click>
    <div class="dot"></div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          @click="onMenuItem(item.type)"
          :divided="item.divided"
          :disabled="getDisabled(item.type)"
          v-for="(item, ind) in dropdowns"
          :key="ind"
        >
          {{ item.text }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { ref, watch, reactive, computed } from "vue";
import { CommonObj } from "@/vite-env";
export type RouteTagType = "home" | "first" | "other" | "last";
export type MenuItemType =
  | "closeIndex"
  | "closeOthers"
  | "closeRight"
  | "closeLeft"
  | "closeAll"
  | "closeSaved"
  | "reload"
  | "copyPath"
  | "copyWholePath";
export type CopyType = "path";
export interface PageTagItemType {
  text: string; //路由标题
  path: string; //路由路径
  name: string; //路由对应的组件名称
  id?: string;
  icon?: string;
}
interface DropdownItem {
  text: string;
  type: MenuItemType;
  divided: boolean;
}
const dropdowns: DropdownItem[] = [
  {
    text: "关闭",
    type: "closeIndex",
    divided: false,
  },
  {
    text: "关闭其他",
    type: "closeOthers",
    divided: false,
  },
  {
    text: "关闭到右侧",
    type: "closeRight",
    divided: false,
  },
  {
    text: "关闭到左侧",
    type: "closeLeft",
    divided: false,
  },
  {
    text: "全部关闭",
    type: "closeAll",
    divided: false,
  },
  // {
  //   text: "关闭已保存",
  //   type: "closeSaved",
  //   divided: false,
  // },
  {
    text: "复制路径",
    type: "copyPath",
    divided: true,
  },
  {
    text: "复制完整路径",
    type: "copyWholePath",
    divided: false,
  },
  {
    text: "刷新",
    type: "reload",
    divided: true,
  },
];
const props = withDefaults(
  defineProps<{
    data?: null | CommonObj;
    currInd: number;
    total: number;
  }>(),
  {
    total: 0,
    currInd: -1,
  }
);
const emits = defineEmits(["menuItem"]);
const dropRef = ref();
const visible = ref(false);
let style = reactive({});
const status: CommonObj = reactive({
  isHome: false,
  isFirst: false,
  isLast: false,
  isEmpty: false,
  isOnly: false,
});
const getDisabled = computed(() => {
  const { isHome, isEmpty, isOnly, isLast, isFirst } = status;
  const map: CommonObj = {
    closeIndex: isHome,
    closeOthers: isHome ? isEmpty : isOnly,
    closeRight: isLast,
    closeLeft: isHome || isFirst,
    closeAll: isEmpty,
    closeSaved: true,
    copyPath: false,
    copyWholePath: false,
    reload: isHome,
  };
  return (type: MenuItemType) => {
    return map[type];
  };
});
watch(
  () => {
    return { currInd: props.currInd, total: props.total };
  },
  newVal => {
    const { currInd, total } = newVal;
    status.isHome = currInd === -1;
    status.isFirst = currInd === 0;
    status.isLast = currInd === total - 1;
    status.isEmpty = total === 0;
    status.isOnly = total === 1;
  },
  { immediate: true }
);
watch(
  () => props.data,
  (newVal: CommonObj) => {
    const { width, height, left, top } = newVal;
    style = {
      height: 0,
      width: 0,
      left: left + width / 2 + "px",
      top: top + height + "px",
    };
    dropRef.value.handleOpen();
  },
  { deep: true }
);
function onMenuItem(type: MenuItemType) {
  emits("menuItem", type, props.currInd);
}
function handleVisible(isShow: boolean) {
  visible.value = isShow;
}
</script>
<style lang="scss" scoped>
.drop-menu {
  position: fixed;
}
.dot {
  z-index: -1;
}
</style>
