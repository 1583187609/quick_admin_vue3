<template>
  <el-menu
    id="side-menu"
    class="side-menu all-hide-scroll"
    :background-color="effect === 'dark' ? navBgDark : navBgLight"
    :text-color="effect === 'dark' ? navTextColorLight : navBgLight"
    :collapse="menuStore.isCollapse"
    :default-active="route.path"
    :default-openeds="defaultOpeneds"
    :unique-opened="!!setStore.menu.uniqueOpened"
    @click="handleClick"
    :router="false"
  >
    <SubMenu :data="menusData" v-if="menusData?.length" />
    <BaseEmpty tips="无" size="32" v-else />
  </el-menu>
</template>

<script lang="ts" setup>
import SubMenu from "./_components/SubMenu.vue";
import { CommonObj } from "@/core/_types";
import { useMenuStore, useSetStore } from "@/store";
import { useRoute } from "vue-router";
import cssVars from "@/assets/styles/_var.module.scss";
import { ResponseMenuItem, MenuEffect } from "./_types";
import { computed } from "vue";

const { navBgDark, navTextColorLight, navBgLight } = cssVars;
const props = withDefaults(
  defineProps<{
    defaultOpeneds?: string[]; // 默认打开的 sub-menu 的 index 的数组
    map?: CommonObj; // 键值对映射 ResponseMenuItem
    menus?: ResponseMenuItem[];
    effect?: MenuEffect;
  }>(),
  {
    effect: "dark",
  }
);
const route = useRoute();
const menuStore = useMenuStore();
const setStore = useSetStore();
const menusData = computed(() => props.menus ?? menuStore.allMenus);
menuStore.initMenusActive(route.path); // 初始菜单选中项
function handleClick() {
  if (setStore.layout.type === "columns") {
    menuStore.isCollapse = false;
  }
}
</script>

<style lang="scss" scoped>
.side-menu {
  overflow: auto;
  border-right: none;
}
</style>
