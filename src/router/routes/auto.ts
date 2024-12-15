// 自动路由
import { ResponseMenuItem } from "@/layout/_components/SideMenu/_types";
import { defaultIconName, toCamelCase } from "@/utils";
import { RouteRecordRaw } from "vue-router";

// 获取自动路由
function getAutoRoutes(comps, pages): RouteRecordRaw[] {
  return Object.entries(pages)
    .map(([path, meta]) => {
      const routPath = path.slice(14, -10); // 去除路径中的 '../../modules/' 前缀和 '/page.json' 后缀
      const compPath = path.replace("/page.json", "/index.vue");
      const component = comps[compPath];
      return {
        path: routPath,
        name: toCamelCase(routPath),
        component,
        meta,
      } as RouteRecordRaw;
    })
    .filter(it => it.component);
}

function sortByOrder(arr = []) {
  if (arr?.length) {
    arr.forEach((it: any) => sortByOrder(it.children));
    arr.sort((a: any, b: any) => (a?.meta?.order ?? 1) - (b?.meta?.order ?? 1));
  }
}

function getAutoRoutesTree(comps, pages) {
  const tree = [];
  const keys = Object.keys(pages);
  keys.sort((a, b) => a.length - b.length); // 排序处理
  keys.forEach(path => {
    const compPath = path.replace("/page.json", "/index.vue");
    const component = comps[compPath]; // 组件
    const meta = pages[path];
    const routPath = path.slice(14, -10); // 去除路径中的 '../../modules/' 前缀和 '/index.vue' 后缀 或者 '/page.json' 后缀
    const parts = routPath.split("/");
    function addToTree(node, parts, level = 0) {
      if (level >= parts.length) return;
      const partName = toCamelCase(parts.slice(0, level + 1).join("/"));
      let child = node.find(child => child.name === partName);
      if (!child) {
        child = {
          name: partName,
          path: routPath,
          component,
          children: [],
          meta,
        };
        node.push(child);
      }
      addToTree(child.children, parts, level + 1);
    }
    addToTree(tree, parts);
  });
  sortByOrder(tree);
  return tree;
}

// 获取自动路由的菜单
function getAutoMenus(routes: any[] = [], idStr = "", level = 0) {
  if (!routes?.length) return [];
  return routes.map((item: any, ind: number) => {
    const { meta = {}, name, path, children, component } = item;
    const isMenu = component !== undefined;
    const { id, title = name, icon, type = isMenu ? 1 : 0, disabled } = meta;
    idStr = idStr ? `${idStr}-${ind + 1}` : id;
    return {
      id: idStr,
      label: title,
      icon: level < 2 ? icon : undefined,
      path: `/${path}`,
      type,
      auth_codes: null,
      status: 1,
      is_cache: 1,
      link_type: 0,
      create_time: "2010-12-01 15:20:47",
      update_time: "1995-03-15 04:23:10",
      source: level === 0 ? "auto" : undefined,
      disabled,
      component: isMenu ? `/${path}/index.vue` : undefined,
      children: getAutoMenus(children, idStr, level + 1),
    };
  });
}

const comps = import.meta.glob("../../modules/**/index.vue");
const pages = import.meta.glob("../../modules/**/page.json", { eager: true, import: "default" });
export const autoRoutes = getAutoRoutes(comps, pages); // 自动路由
export const autoMenus = getAutoMenus(getAutoRoutesTree(comps, pages)); // 根据自动路由生成的自动菜单
