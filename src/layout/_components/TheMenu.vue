<template>
  <div class="asider f-sb-s-c" :class="{ fold: baseStore.isFold }">
    <h1 @click="router.push('/')" class="h1 f-0 f-c-c">
      <div v-if="baseStore.isFold">{{ VITE_APP_NAME.charAt(0) }}</div>
      <div class="title line-1" v-show="!baseStore.isFold">
        {{ VITE_APP_NAME }}
      </div>
    </h1>
    <SideMenu :menus="setStore.layout.type === 'columns' ? menuStore.sideMenus : undefined" class="f-1" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import SideMenu, { MenusItem } from "@/layout/_components/SideMenu/Index.vue";
import { useBaseStore, useMenuStore, useSetStore } from "@/store";
const { VITE_APP_NAME } = import.meta.env;

const menuStore = useMenuStore();
const baseStore = useBaseStore();
const setStore = useSetStore();
const router = useRouter();
const route = useRoute();
</script>
<style lang="scss" scoped>
.asider {
  color: $nav-text-color-light;
  width: $asider-width;
  height: 100vh;
  background: $nav-bg-dark;
  &.fold {
    width: auto;
  }
  .h1 {
    cursor: pointer;
    padding: 0 $gap;
    font-size: 16px;
    font-weight: 500;
    height: $header-height;
  }
}
</style>
