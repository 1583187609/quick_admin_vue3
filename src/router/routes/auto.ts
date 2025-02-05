// 自动路由
import { ResponseMenuItem } from "@/layout/_components/SideMenu/_types";
import { getUserInfo, sortObjArrByKey, toCamelCase } from "@/utils";
import { defaultIconName } from "@/core/config";
import { getBasePath, getWorksDomain } from "#/mock/_platform/_utils";
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
// function getAutoRoutesFlatOld(comps, pages, prefix = "../../modules/", fileName = "page.json"): RouteRecordRaw[] {
//   return Object.entries(pages)
//     .map(([path, meta]) => {
//       // 去除路径中的 prefix 前缀和 fileName 文件名称
//       let routPath = path.slice(prefix.length, -(fileName.length + 1));
//       routPath = getRoutePathRemoveOrder(routPath); // 去掉路径中的序号
//       const compPath = path.replace(`/${fileName}`, "/index.vue");
//       const component = comps[compPath];
//       return {
//         path: routPath,
//         name: toCamelCase(routPath),
//         component,
//         meta,
//       } as RouteRecordRaw;
//     })
//     .filter(it => it.component);
// }
// 获取自动路由（扁平化，非嵌套结构）
export function getAutoRoutesFlat(routes: any[] = [], flatRoutes: RouteRecordRaw[] = [], authCodes?: number[]): RouteRecordRaw[] {
  if (!routes?.length) return [];
  routes.forEach((item: any, ind: number) => {
    const { meta = {}, name, path, children, component } = item;
    if (authCodes?.length) {
      if (meta.auth_codes === undefined) meta.auth_codes = authCodes;
      else meta.auth_codes = meta.auth_codes.filter(it => authCodes.includes(it)); // 子级的codes只能是父级codes的子集
    }
    if (!component) return getAutoRoutesFlat(children, flatRoutes, meta.auth_codes); // 没有component，说明是菜单，不是页面
    flatRoutes.push({ path, name, component, meta });
  });
  return flatRoutes;
}

/**
 * 获取自动路由（嵌套结构；文件路径中的order优先级高于page.json中的order）
 * @param comps vue组件信息
 * @param pages 页面信息
 * @param prefix 要忽略掉的前缀
 * @param fileName 要查找的页面信息文件名称
 * @returns {object[]}
 */
export function getAutoRoutesTree(comps, pages, prefix = "../../modules/", fileName = "page.json") {
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
        child = { name: partName, path: routPath, component, children: [], meta };
        node.push(child);
      }
      addToTree(child.children, parts, level + 1);
    }
    addToTree(tree, parts);
  });
  sortObjArrByKey(tree, "asc", "meta.order");
  return tree;
}

const tagMap = { wait: "待完善" };
// 获取自动路由的菜单
export function getAutoMenus(routes: any[] = [], role = getUserInfo()?.role, idStr = "", level = 0): ResponseMenuItem[] {
  if (!routes?.length) return [];
  return routes.filter((item: any, ind: number) => {
    const { meta = {}, name, path, children, component } = item;
    const isMenu = component !== undefined;
    const {
      id,
      title = name,
      icon = defaultIconName,
      type = isMenu ? 1 : 0,
      auth_codes = null,
      disabled,
      statusTag,
      link_type = 0,
      is_cache = 1,
      status = 1,
    } = meta;
    let { target } = meta;
    if (link_type && !target) throw new Error(`当配置为外部连接时，必须设置target属性`);
    if (link_type === 1 && target.startsWith("/")) target = `${getBasePath()}${target}`;
    if (link_type === 2 && target.startsWith("/")) target = `${getWorksDomain()}${target}`;
    idStr = idStr ? `${idStr}-${ind + 1}` : id;
    const tagText = statusTag ? `【${tagMap[statusTag] ?? ""}】` : "";
    Object.assign(item, {
      id: idStr,
      label: title + tagText,
      icon: level < 2 ? icon : undefined,
      path: link_type ? target : `/${path}`,
      type,
      auth_codes,
      status,
      is_cache,
      link_type,
      create_time: "2010-12-01 15:20:47",
      update_time: "1995-03-15 04:23:10",
      source: level === 0 ? "auto" : undefined,
      disabled,
      component: isMenu ? `/${path}/index.vue` : undefined,
      // component,
      children: getAutoMenus(children, role, idStr, level + 1),
    });
    if (!auth_codes?.length) return true;
    return auth_codes.includes(role);
  });
}
