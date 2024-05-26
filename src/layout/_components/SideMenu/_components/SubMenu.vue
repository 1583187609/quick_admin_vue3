<template>
  <template v-for="(item, ind) in data" :key="ind">
    <el-sub-menu :index="item.path" v-if="item.children?.length">
      <template #title>
        <BaseIcon size="1.4em" :name="item.icon" v-if="item.icon" />
        <span>{{ item.label }}</span>
      </template>
      <SubMenu :data="item.children" v-if="item.children?.length" />
    </el-sub-menu>
    <template v-else>
      <el-menu-item @click="handleClick(item)" :index="item.path" :disabled="item.disabled" v-if="item.type !== 2">
        <BaseIcon size="1.4em" :name="item.icon" v-if="item.icon" />
        <template #title>{{ item.label }}</template>
      </el-menu-item>
    </template>
  </template>
</template>
<script lang="ts">
export default {
  name: "SubMenu",
};
</script>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import type { MenusItem } from "../Index.vue";
import { CommonObj } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    data: MenusItem[];
  }>(),
  {
    data: () => [],
  }
);
const router = useRouter();
function handleClick(menu: MenusItem) {
  const { link_type, path, label } = menu;
  if (link_type) {
    router.push({ name: "innerLink", query: { url: path } });
    if (link_type === 1) {
      return (document.title = label);
    }
    if (link_type === 2) {
      return window.open(path, "_blank");
    }
    throw new Error(`暂不支持code为${link_type}的外链类型`);
  } else {
    router.push(path);
    document.title = label;
  }
}
</script>

<style lang="scss" scoped>
.base-icon {
  margin-right: $gap-qtr;
}
</style>
