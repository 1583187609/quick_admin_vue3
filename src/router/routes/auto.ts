// 自动路由
import { needParam } from "#/mock/utils";
import { ResponseMenuItem } from "@/layout/_components/SideMenu/_types";
import { defaultIconName, sortObjArrByKey, toCamelCase } from "@/utils";
import { RouteRecordRaw } from "vue-router";

const orderJoinChar = "_"; // order的链接符号

/**
 * 从路径中获取排序序号
 * @returns {number}
 */
function getOrderFromPath(path: string) {
  if (!path) return;
  const name = path.split("/").at(-2);
  if (!name) return;
  const n = Number(name.split(orderJoinChar)[0]);
  if (isNaN(n)) return;
  return n;
}

/**
 * 获取去除order序号之后的路由地址
 * @param routPath 路由路径
 * @returns {string}
 */
function getRoutePathRemoveOrder(routPath: string) {
  return routPath
    .split("/")
    .map(it => it.split(orderJoinChar).at(-1))
    .join("/");
}

// 获取自动路由（扁平化，非嵌套结构）
function getAutoRoutesFlat(comps, pages, prefix = "../../modules/", fileName = "page.json"): RouteRecordRaw[] {
  return Object.entries(pages)
    .map(([path, meta]) => {
      // 去除路径中的 '../../modules/' 前缀和 '/page.json' 后缀
      let routPath = path.slice(prefix.length, -(fileName.length + 1));
      routPath = getRoutePathRemoveOrder(routPath); // 去掉路径中的序号
      const compPath = path.replace(`/${fileName}`, "/index.vue");
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

/**
 * 获取自动路由（嵌套结构；文件路径中的order优先级高于page.json中的order）
 * @param comps vue组件信息
 * @param pages 页面信息
 * @param prefix 要忽略掉的前缀
 * @param fileName 要查找的页面信息文件名称
 * @returns {object[]}
 */
function getAutoRoutesTree(comps, pages, prefix = "../../modules/", fileName = "page.json") {
  const tree = [];
  const paths = Object.keys(pages);
  paths.sort((a, b) => a.length - b.length); // 排序处理
  paths.forEach(path => {
    const compPath = path.replace(`/${fileName}`, "/index.vue");
    const component = comps[compPath]; // 组件
    const meta = pages[path];
    const order = getOrderFromPath(compPath);
    if (order !== undefined) meta.order = order;
    let routPath = path.slice(prefix.length, -(fileName.length + 1)); // 去除路径中的 '../../modules/' 前缀和 '/index.vue' 后缀 或者 '/page.json' 后缀
    routPath = getRoutePathRemoveOrder(routPath); // 去掉路径中的序号
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
  sortObjArrByKey(tree, "asc", "meta.order");
  return tree;
}

// 获取自动路由的菜单
function getAutoMenus(routes: any[] = [], idStr = "", level = 0): ResponseMenuItem[] {
  if (!routes?.length) return [];
  return routes.map((item: any, ind: number) => {
    const { meta = {}, name, path, children, component } = item;
    const isMenu = component !== undefined;
    const { id, title = name, icon = defaultIconName, type = isMenu ? 1 : 0, disabled } = meta;
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
export const autoRoutes = getAutoRoutesFlat(comps, pages); // 自动路由
export const autoMenus = getAutoMenus(getAutoRoutesTree(comps, pages)); // 根据自动路由生成的自动菜单
