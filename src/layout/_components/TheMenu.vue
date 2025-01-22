<template>
  <div class="asider f-sb-s-c" :class="{ fold: menuStore.isCollapse }">
    <h1 @click="router.push(defaultHomePath)" class="h1 f-0 f-c-c">
      <div class="title q-line-1">
        {{ menuStore.isCollapse ? VITE_APP_NAME.charAt(0) : VITE_APP_NAME }}
      </div>
    </h1>
    <SideMenu :menus="setStore.layout.type === 'columns' ? menuStore.sideMenus : undefined" class="f-1" />
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import SideMenu from "@/layout/_components/SideMenu/Index.vue";
import { useMenuStore, useSetStore } from "@/store";
import { defaultHomePath } from "@/core/config";

const { VITE_APP_NAME } = import.meta.env;

const menuStore = useMenuStore();
const setStore = useSetStore();
const router = useRouter();
</script>
<style lang="scss" scoped>
.asider {
  color: var(--nav-text-color-light);
  width: var(--asider-width);
  height: 100vh;
  background: var(--nav-bg-dark);
  &.fold {
    width: auto;
  }
  .h1 {
    cursor: pointer;
    padding: 0 $gap;
    font-weight: 500;
    font-size: $font-size-main;
    height: var(--header-height);
    .title {
      font-size: $font-size-heavy;
    }
  }
}
</style>
