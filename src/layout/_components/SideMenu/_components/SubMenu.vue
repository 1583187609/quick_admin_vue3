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
  const { id, link_type, path, label } = menu;
  if (!link_type) {
    router.push(path);
    document.title = label;
    return;
  }
  router.push({ name: "innerLink", query: { url: path } });
  if (link_type === 1) {
    document.title = label;
  } else if (link_type === 2) {
    // const win =  window.open(path, "_blank"); // 空白页打开
    const win = window.open(path, id); // 空白页打开，且保证id相同时，始终打开同一个标签页（不另开一个标签页打开）

    // console.log(win, "win---------");
    // const tagIcon = document.createElement("link");
    // tagIcon.rel = "icon";
    // tagIcon.type = "image/svg+xml";
    // tagIcon.href = "/favicon.ico";
    // win?.document.head.appendChild(tagIcon);
  } else {
    throw new Error(`暂不支持code为${link_type}的外链类型`);
  }
}
</script>

<style lang="scss" scoped>
.base-icon {
  margin-right: $gap-qtr;
}
</style>
