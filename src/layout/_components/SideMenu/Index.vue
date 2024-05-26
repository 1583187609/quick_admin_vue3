<template>
  <el-menu
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
import { CommonObj, ShowCodes } from "@/vite-env";
import { useMenuStore, useBaseStore, useSetStore } from "@/store";
import { useRoute } from "vue-router";
import cssVars from "@/assets/styles/_var.module.scss";
export type LinkType = 0 | 1 | 2; //1 内部iframe渲染； 2, 新打开一个浏览器标签页展示
export interface MenusItem {
  id: string;
  label: string; //导航文字
  icon: string; //首字母大写，ElementPlus中有效的图标均可，例：Promotion
  path: string;
  type: number; //0目录 1菜单（显示） 2菜单（不显示）3外链（暂未使用）
  auth_codes?: number[] | null; //该路由的权限 0超级管理员 1普通管理员 2特殊用户 3普通用户 4游客用户 5开发人员
  status: ShowCodes; //0 禁用 1启用
  is_cache?: ShowCodes; //是否缓存：0否 1是
  link_type?: LinkType;
  disabled?: ShowCodes; //是否禁用：0否 1是
  order?: number; //显示的位置顺序，数值越大越靠后，支持负数
  component?: string;
  children?: MenusItem[];
  create_time?: string; //创建时间
  update_time?: string; //修改时间
}
export type MenuEffect = "dark" | "light";
const { navBgDark, navTextColorLight, navBgLight } = cssVars;
const props = withDefaults(
  defineProps<{
    defaultOpeneds?: string[]; //默认打开的 sub-menu 的 index 的数组
    map?: CommonObj; //键值对映射 MenusItem
    menus?: MenusItem[];
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
