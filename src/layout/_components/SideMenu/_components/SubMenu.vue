<template>
  <template v-for="(item, ind) in data" :key="ind">
    <el-sub-menu :index="item.path" v-if="item.children?.length">
      <template #title>
        <BaseIcon size="1.2em" :name="item.icon" v-if="item.icon" />
        <TooltipLabel :label="item.label" />
      </template>
      <SubMenu :data="item.children" v-if="item.children?.length" />
    </el-sub-menu>
    <template v-else>
      <el-menu-item @click="handleClick(item)" :index="item.path" :disabled="item.disabled" v-if="item.type !== 2">
        <template #title>
          <BaseIcon size="1.2em" :name="item.icon" v-if="item.icon" />
          <TooltipLabel :label="item.label" />
        </template>
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
import type { ResponseMenuItem } from "@/layout/_components/SideMenu/_types";
import TooltipLabel from "@/layout/_components/TooltipLabel.vue";
const props = withDefaults(
  defineProps<{
    data: ResponseMenuItem[];
  }>(),
  {
    data: () => [],
  }
);
const router = useRouter();
function handleClick(menu: ResponseMenuItem) {
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
    // tagIcon.href = "/ico.svg";
    // win?.document.head.appendChild(tagIcon);
  } else {
    throw new Error(`暂未处理外链类型：${link_type}`);
  }
}
</script>

<style lang="scss" scoped>
.base-icon {
  margin-right: $gap-qtr;
}
</style>
