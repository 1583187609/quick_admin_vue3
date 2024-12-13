// 自动路由
import { ResponseMenuItem } from "@/layout/_components/SideMenu/_types";
import { toCamelCase } from "@/utils";
import { RouteRecordRaw } from "vue-router";

// 获取自动路由
function getAutoRoutes(): RouteRecordRaw[] {
  const pages = import.meta.glob("../../demo-center/**/page.js", { eager: true, import: "default" });
  const comps = import.meta.glob("../../demo-center/**/index.vue");
  return Object.entries(pages).map(([path, meta]) => {
    const routPath = "demo-center" + path.replace("../../demo-center", "").replace("/page.js", "");
    const compPath = path.replace("/page.js", "/index.vue");
    const component = comps[compPath];
    return {
      path: routPath,
      name: toCamelCase(routPath),
      component,
      meta,
    } as RouteRecordRaw;
  });
}

// function getAutoRoutesTree(globModules) {
//   const tree = [];
//   for (const path in globModules) {
//     // 去除路径中的 './' 前缀和 '.vue' 后缀
//     const relativePath = path.slice(6, -10);
//     // 将路径拆分为目录和文件名
//     const parts = relativePath.split("/");
//     // 使用递归函数将路径添加到树中
//     function addToTree(node, parts, index) {
//       if (index >= parts.length) return;
//       const part = parts[index];
//       let child = node.find(child => child.name === part);
//       if (!child) {
//         child = {
//           name: part,
//           children: [],
//         };
//         node.push(child);
//       }
//       addToTree(child.children, parts, index + 1);
//     }
//     // 从根节点开始添加路径
//     addToTree(tree, parts, 0);
//   }
//   return tree;
// }

function getAutoRoutesTreeNew(autoRoutes) {
  const tree = [];
  function addToTree(nodes, parts, level = 0) {
    if (level >= parts.length) return;
    const partName = toCamelCase(parts.slice(0, level + 1).join("/"));
    let child = nodes.find(child => child.name === partName);
    if (!child) {
      child = {
        name: partName,
        children: [],
      };
      nodes.push(child);
    }
    addToTree(child.children, parts, level + 1);
  }
  autoRoutes.forEach(item => {
    const { path, name } = item;
    const parts = path.split("/"); // 将路径拆分为目录和文件名
    addToTree(tree, parts); // 从根节点开始添加路径
  });
  return tree;
}

// 获取自动路由的菜单
function getAutoMenus(autoRoutes: RouteRecordRaw[] = []) {
  const routesTree = getAutoRoutesTreeNew(autoRoutes);
  console.log(routesTree, "getAutoRoutesTreeNew-------------");
  return [
    {
      id: "199",
      label: "演示中心",
      icon: "Histogram",
      path: "/demo-center",
      type: 0,
      auth_codes: null,
      status: 1,
      is_cache: 1,
      link_type: 0,
      create_time: "2010-12-01 15:20:47",
      update_time: "1995-03-15 04:23:10",
      source: "auto",
      children: autoRoutes.map(item => {
        const { name, path, meta = {} } = item;
        const { title = name } = meta;
        return {
          id: name,
          label: title,
          icon: "DataAnalysis",
          path: `/${path}`,
          type: 1,
          auth_codes: null,
          status: 1,
          is_cache: 1,
          link_type: 0,
          // create_time: "1993-05-24 16:27:38",
          // update_time: "2015-02-14 18:01:17",
          // component: "/demo-center/one/index.vue",
        };
      }),
    },
  ];
}
export const autoRoutes = getAutoRoutes(); // 自动路由
export const autoMenus = getAutoMenus(autoRoutes); // 根据自动路由生成的自动菜单
console.log(autoRoutes, "autoRoutes---------");
// console.log(getAutoRoutesTree(import.meta.glob("../../demo-center/**/index.vue")), "getAutoRoutesTree-------------");
