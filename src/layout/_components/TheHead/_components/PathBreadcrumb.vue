<!-- 页面-简介 -->
<template>
  <el-breadcrumb
    id="breadcrumb"
    class="path-breadcrumb"
    :class="['columns', 'classics'].includes(setStore.layout.type) ? 'dark' : 'light'"
    :separator-icon="ArrowRight"
    v-if="breadcrumbs.length"
  >
    <el-breadcrumb-item
      :to="ind === breadcrumbs.length - 1 ? undefined : item.path"
      @click="menuStore.toFirstPath(item)"
      v-for="(item, ind) in breadcrumbs"
      :key="ind"
    >
      <div class="f-c-c">
        <BaseIcon size="1.1em" class="mr-q" :name="item.icon" v-if="setStore.breadcrumb.showIcon" />
        <span>{{ item.label }}</span>
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
import { ArrowRight } from "@element-plus/icons-vue";
import { useMenuStore, useSetStore } from "@/store";
import { ResponseMenuItem } from "@/layout/_components/SideMenu/_types";
import { defaultHomePath } from "@/core/config";

const props = withDefaults(
  defineProps<{
    exampleProp?: CommonObj;
  }>(),
  {
    exampleProp: () => ({}),
  }
);
const route = useRoute();
const menuStore = useMenuStore();
const setStore = useSetStore();
const breadcrumbs = ref<ResponseMenuItem[]>([
  {
    id: "0",
    icon: "House",
    path: defaultHomePath,
    label: "首页",
    type: 0,
    status: 1,
  },
]);
watch(
  route,
  newVal => {
    const list = breadcrumbs.value.slice(0, 1);
    if (newVal.path !== defaultHomePath) {
      list.push(...(getAllBreadcrumbs(menuStore.allMenus)[newVal.path] ?? []));
    }
    breadcrumbs.value = list;
  },
  { immediate: true }
);
function getAllBreadcrumbs(menus: ResponseMenuItem[], parent = [], result: CommonObj = {}) {
  for (const item of menus) {
    result[item.path] = [...parent, item];
    if (item.children) getAllBreadcrumbs(item.children, result[item.path], result);
  }
  return result;
}
</script>
<style lang="scss" scoped>
.path-breadcrumb {
  font-size: $font-size-main;
  &.dark {
    :deep(.el-breadcrumb__inner) {
      &.is-link {
        color: $nav-text-color-light;
        &:hover {
          color: $color-primary;
        }
      }
    }
  }
  &.light {
  }
}
</style>
