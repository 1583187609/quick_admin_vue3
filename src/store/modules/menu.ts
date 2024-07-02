import { computed, reactive, ref } from "vue";
import { useUserStore, useRouteStore, useBaseStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { defineStore } from "pinia";
import { LinkType, ResponseMenuItem } from "@/layout/_components/SideMenu/_types";
import { defaultHomePath, storage } from "@/utils";
export interface RouteItem {
  path: string;
  name: string;
  children?: string;
  component?: () => Promise<unknown>;
  meta: {
    title: string;
    icon?: string;
    cache?: boolean;
    tagIdKey?: string; //默认键名id。用keep-alive缓存同组件但不同id的页面组件时，需要依据唯一值来生成新的组件，这个唯一值的键名默认取的 id
    linkType?: LinkType;
  };
}

export default defineStore("menu", () => {
  const baseStore = useBaseStore();
  const router = useRouter();
  const activeIndex = ref<number>(0);
  const allMenus = reactive<ResponseMenuItem[]>(storage.getItem("allMenus") || []); // 完整导航数据
  const sideMenus = computed<ResponseMenuItem[]>(() => allMenus[activeIndex.value]?.children ?? []);
  function initMenus(menus: ResponseMenuItem[] = []) {
    allMenus.length = 0;
    allMenus.push(...menus);
  }
  //改变导航选中项时
  function changeActiveIndex(ind: number, toFirst: boolean = true, allNavs = allMenus) {
    activeIndex.value = ind;
    if (ind === -1) baseStore.isFold = true;
    if (!toFirst) return;
    const subNavs = allNavs[ind]?.children;
    baseStore.isFold = !subNavs?.length;
    if (subNavs?.length) toFirstPath(allNavs[ind]);
  }
  //跳转到subMenus的第一个地址
  function toFirstPath(menu: ResponseMenuItem) {
    if (!menu.children?.length) return;
    const { children = [], path, label, link_type } = menu?.children[0];
    if (link_type) {
      // router.push({ name: "innerLink", query: { url: path } });
      // if (link_type === 1) {
      //   return (document.title = label);
      // }
      // if (link_type === 2) {
      //   return window.open(path, "_blank");
      // }
      // throw new Error(`暂不支持code为${link_type}的外链类型`);
    } else {
      if (children.length) {
        if (children[0].children?.length) {
          toFirstPath(children[0]);
        } else {
          const { path, label } = children[0];
          router.push(path);
          document.title = label;
        }
      } else {
        router.push(path);
        document.title = label;
      }
    }
  }
  // 获取sideMenus第一级的路径
  function initMenusActive(pathname: string): string {
    const subMenus = allMenus;
    const activeInd = activeIndex.value;
    let currPath = defaultHomePath;
    if (subMenus[activeInd]?.children?.length) {
      function isFind(children: ResponseMenuItem[]): boolean {
        return !!children.find((sItem, sInd) => {
          const { children = [], path, label } = sItem;
          if (path === pathname) {
            document.title = label;
          }
          return path === pathname || isFind(children);
        });
      }
      const target = subMenus.find((gItem, gInd) => {
        const { children = [] } = gItem;
        const find = isFind(children);
        if (find) changeActiveIndex(gInd, false);
        return find;
      });
      if (target) currPath = target.path ?? defaultHomePath;
    } else {
      const { VITE_APP_NAME } = import.meta.env;
      const { path = defaultHomePath, label = VITE_APP_NAME } = subMenus?.[activeInd] || {};
      document.title = label;
      currPath = path;
    }
    return currPath;
  }
  return {
    allMenus,
    sideMenus,
    activeIndex,
    toFirstPath,
    initMenus,
    initMenusActive,
    changeActiveIndex,
  };
});
