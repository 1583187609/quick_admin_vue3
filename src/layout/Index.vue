<template>
  <div class="layout f-sb-s">
    <template v-if="setStore.layout.type !== 'horizontal'">
      <div class="main-menu f-fs-s f-fs-c-c" v-if="setStore.layout.type === 'columns'">
        <div class="f-c-c-c f-0 logo">
          <BaseImg :src="logoImg" size="60%" style="border-radius: 0" :to="{ name: 'home' }" />
        </div>
        <ul id="main-menu" class="list f-fs-c-c f-1 all-hide-scroll">
          <li
            class="item f-c-c-c"
            :class="{ active: menuStore.activeIndex === ind }"
            @click="menuStore.changeActiveIndex(ind)"
            v-for="(item, ind) in menuStore.allMenus"
            :key="ind"
          >
            <BaseIcon size="20" :name="item.icon" />
            <TooltipLabel :label="item.label" />
          </li>
        </ul>
      </div>
      <TheMenu class="f-0" />
    </template>
    <!-- 1px为了让f-1生效，从而让子视图的表格宽度100%生效 -->
    <div class="f-1 f-sb-s-c" style="width: 1px">
      <TheHead class="f-0" />
      <div class="container f-1 all-hide-scroll">
        <RouterView v-slot="{ Component, route: currRoute }">
          <Transition name="main" mode="out-in" appear>
            <KeepAlive :include="keepAliveStore.list" :max="20">
              <component :is="formatComponentInstance(Component, currRoute)" :key="aliveCompKey || currRoute.fullPath" />
            </KeepAlive>
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// 路由动画：http://www.dearweb.cn/qianduan/dw-333.html
import TheHead from "./_components/TheHead/Index.vue";
import TheMenu from "./_components/TheMenu.vue";
import { ref, reactive, nextTick, provide, computed, h } from "vue";
import { useRouter, useRoute } from "vue-router";
import logoImg from "@/assets/images/logo.png";
import { storage, showMessage, getCompNameByRoute, getIsOver, defaultRefreshDictExpired } from "@/utils";
import { useMenuStore, useKeepAliveStore, useSetStore } from "@/store";
import TooltipLabel from "@/layout/_components/TooltipLabel.vue";
import { useDict } from "@/hooks";

const { updateStorageDict } = useDict();
const keepAliveStore = useKeepAliveStore();
const menuStore = useMenuStore();
const setStore = useSetStore();
const aliveCompKey = ref("");
const route = useRoute();

/*
 * 将router传个我们的组件重新换一个新的组件，原组件包里面
 * 参考示例：https://blog.csdn.net/wjlhanhan/article/details/130890143
 */
const compMap = new Map(); // 用来存已经创建的组件
function formatComponentInstance(component: any, route: any) {
  if (!component) return;
  let comp;
  const compName = getCompNameByRoute(route);
  if (compMap.has(compName)) {
    comp = compMap.get(compName);
  } else {
    comp = {
      name: compName,
      render() {
        return h(component);
      },
    };
    compMap.set(compName, comp);
    keepAliveStore.add(compName);
  }
  return h(comp);
}
//重新加载当前路由
function reloadView(hint = "刷新成功") {
  const compName = route.matched.at(-1)?.components?.default.name;
  keepAliveStore.remove(compName as string);
  aliveCompKey.value = " ";
  nextTick(() => {
    aliveCompKey.value = "";
    nextTick(() => {
      showMessage(hint);
    });
  });
}
// // 刷新字典数据
// function refreshDict() {
//   const lastTime = storage.getItem("lastRefreshDate");
//   if (!lastTime || new Date(lastTime).getTime() + defaultRefreshDictExpired < Date.now()) {
//     updateStorageDict();
//   }
// }
// refreshDict();
provide("reloadView", reloadView);
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
  width: 100%;
}
.main-menu {
  color: $nav-text-color-light;
  background: $nav-bg-dark-heavy;
  .logo {
    height: $header-height;
  }
  .list {
    overflow: auto;
    padding-bottom: 4em;
    .item {
      $bg-darker: mix($nav-bg-dark-heavy, #000000, 50%);
      $bg-darkest: mix($nav-bg-dark-heavy, #000000, 0.01%);
      cursor: pointer;
      padding: $gap-half $gap-qtr;
      width: $main-menu-width;
      .tooltip-label {
        margin-top: $gap-qtr;
        font-size: $font-size-lighter;
      }
      &:hover {
        background: $bg-darker;
      }
      &.active {
        color: $color-primary;
        background: $bg-darkest;
      }
    }
  }
}
.container {
  padding: $gap-half;
  width: 100%;
  overflow: auto;
  background: $color-bg-white;
}
//路由动画(主内容区动画)
.main-enter-active {
  transition: 0.2s;
}

.main-leave-active {
  transition: 0.15s;
}

.main-enter-from {
  opacity: 0;
  margin-left: -20px;
}

.main-leave-to {
  opacity: 0;
  margin-left: 20px;
}
</style>
