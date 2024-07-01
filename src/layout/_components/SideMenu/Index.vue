<template>
  <el-menu
    id="side-menu"
    class="side-menu all-hide-scroll"
    :background-color="effect === 'dark' ? navBgDark : navBgLight"
    :text-color="effect === 'dark' ? navTextColorLight : navBgLight"
    :collapse="baseStore.isFold"
    :default-active="route.path"
    :default-openeds="defaultOpeneds"
    :unique-opened="!!setStore.menu.uniqueOpened"
    @click="handleClick"
    :router="false"
  >
    <SubMenu :data="props.menus ?? menuStore.allMenus" v-if="(props.menus ?? menuStore.allMenus)?.length" />
    <BaseEmpty tips="无" size="32" v-else />
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import SubMenu from "./_components/SubMenu.vue";
import { CommonObj } from "@/vite-env";
import { useMenuStore, useBaseStore, useSetStore } from "@/store";
import { useRoute } from "vue-router";
import cssVars from "@/assets/styles/_var.module.scss";
import { ResponseMenuItem, MenuEffect } from "./_types";

const { navBgDark, navTextColorLight, navBgLight } = cssVars;
const props = withDefaults(
  defineProps<{
    defaultOpeneds?: string[]; //默认打开的 sub-menu 的 index 的数组
    map?: CommonObj; //键值对映射 ResponseMenuItem
    menus?: ResponseMenuItem[];
    effect?: MenuEffect;
  }>(),
  {
    effect: "dark",
  }
);
const route = useRoute();
const baseStore = useBaseStore();
const menuStore = useMenuStore();
const setStore = useSetStore();
menuStore.initMenusActive(route.path); //初始菜单选中项
function handleClick() {
  if (setStore.layout.type === "columns") {
    baseStore.isFold = false;
  }
}
</script>

<style lang="scss" scoped>
.side-menu {
  overflow: auto;
  border-right: none;
}
</style>
