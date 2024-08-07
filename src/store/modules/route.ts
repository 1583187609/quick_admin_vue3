import { defineStore } from "pinia";
import { ref } from "vue";
import { camelCase } from "lodash";
import { useRouter } from "vue-router";
import { useMenuStore } from "@/store";
import { RouteItem } from "./menu";
import { ResponseMenuItem } from "@/layout/_components/SideMenu/_types";

const modules = import.meta.glob("../../views/**/*.vue");
export default defineStore("route", () => {
  const menuStore = useMenuStore();
  const router = useRouter();
  // const currRoutes = ref<RouteItem[]>([]);
  // const currentRoutes = ref<(() => void)[]>([]);
  const isCreatedRoute = ref(false); //是否创建好了路由

  /**
   * 将菜单拉平成一级
   * @param menus 菜单数据
   * @notice type //0目录 1菜单（显示） 2菜单（不显示）3外链（暂未使用）
   * @returns
   */
  function getFlatMenus(menus?: ResponseMenuItem[]): ResponseMenuItem[] {
    const _menus: ResponseMenuItem[] = [];
    function flatMenus(menus: ResponseMenuItem[] = []) {
      menus.forEach((menu: ResponseMenuItem) => {
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
  function getRoute(menu: ResponseMenuItem): RouteItem {
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
    const routes = getFlatMenus(menus).map((it: ResponseMenuItem) => getRoute(it));
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
