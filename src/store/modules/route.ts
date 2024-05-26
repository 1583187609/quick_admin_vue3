import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { camelCase, cloneDeep } from "lodash";
import { useRouter } from "vue-router";
import { useMenuStore, useUserStore } from "@/store";
import { RouteItem } from "./menu";
import { MenusItem } from "@/layout/_components/SideMenu/Index.vue";
import { CommonObj } from "@/vite-env";

const modules = import.meta.glob("../../views/**/*.vue");
export default defineStore("route", () => {
  const userStore = useUserStore();
  const menuStore = useMenuStore();
  const router = useRouter();
  // const currRoutes = ref<RouteItem[]>([]);
  // const currentRoutes = ref<(() => void)[]>([]);
  const isCreatedRoute = ref(false); //是否创建好了路由

  /**
   * 将菜单拉平成一级
   * @param menus 菜单数据
   * @notice //0目录 1菜单（显示） 2菜单（不显示）3外链（暂未使用）
   * @returns
   */
  function getFlatMenus(menus?: MenusItem[]): MenusItem[] {
    const _menus: MenusItem[] = [];
    function flatMenus(menus?: MenusItem[]) {
      menus?.forEach((menu: MenusItem) => {
        const { type, auth_codes, children } = menu;
        if (type === 0) {
          flatMenus(children);
        } else {
          _menus.push(menu);
        }
      });
    }
    flatMenus(menus);
    return _menus;
  }

  /**
   * 获取route信息
   * @param menu 单个菜单数据
   * @returns
   */
  function getRoute(menu: MenusItem): RouteItem {
    const { label, path, auth_codes, link_type, component, icon, is_cache } = menu;
    return {
      path,
      name: camelCase(path), //小驼峰路由名，大驼峰组件名
      // component: () => import(`@/views${item.path}.vue`); //webpack用这种方式
      component: modules[`../../views${component}`], //vite用这种方式
      meta: {
        title: label,
        cache: !!is_cache,
        icon,
        linkType: link_type,
      },
    };
  }

  /**
   * 创建路由
   */
  function createRoutes(menus = menuStore.allMenus) {
    const routes = getFlatMenus(menus).map((it: MenusItem) => getRoute(it));
    routes.forEach((item: any) => {
      router.addRoute("layout", item);
    });
    isCreatedRoute.value = true;
  }

  return {
    isCreatedRoute,
    createRoutes,
    // currRoutes,
    // currentRoutes,
  };
});
