import { getRequestParams, responseData, toViteMockApi, getNavsTree, findTreeNode, getFilterList } from "../utils";
// import { getDictLabel } from "../dict";
// import dayjs from "dayjs";
// import { CommonObj } from "@/core/_types";
// import allData from "../data";
// import _ from "lodash";

// const { merge } = _;
// let allNavsTree = getNavsTree(allData.navs.list);
// let allRoles = allData.role.list;

export default toViteMockApi({
  // // 查询菜单列表
  // "GET /mock/menu/list": (req: CommonObj) => {
  //   const { curr_page, page_size, ...params } = getRequestParams(req);
  //   const cloneAllNavsTree = JSON.parse(JSON.stringify(allNavsTree));
  //   const queryList = getFilterList(cloneAllNavsTree, params, {
  //     name: ["match", "blur"],
  //     create_times: ["between", "date", "create_time"],
  //   });
  //   return responseData({
  //     data: {
  //       total_num: queryList.length,
  //       records: queryList,
  //       // curr_page,
  //       // page_size,
  //       has_next: false,
  //     },
  //   });
  // },
  // // 删除菜单
  // "DELETE /mock/menu/list": (req: CommonObj) => {
  //   const params: CommonObj = getRequestParams(req);
  //   allNavsTree = getFilterList(allNavsTree, params, { ids: ["pick", "same", "id"] }, true);
  //   return responseData();
  // },
  // // 查询菜单详情
  // "GET /mock/menu/info": (req: CommonObj) => {
  //   const { id } = getRequestParams(req, ["id"]);
  //   const data = findTreeNode(allNavsTree, id);
  //   if (!data) return responseData({ code: 1, msg: "不存在该菜单" });
  //   return responseData({ data });
  // },
  // // 新增菜单
  // "POST /mock/menu/add": (req: CommonObj) => {
  //   // const params = getRequestParams(req);
  //   // let code, msg, data;
  //   // const { type, gender, phone, address } = params;
  //   // const isExist = allNavsTree.find((it: CommonObj) => it.phone === phone);
  //   // if (isExist) {
  //   //   code = 1;
  //   //   msg = "该菜单已存在";
  //   // } else {
  //   //   data = merge(getConstructorObj(allNavsTree?.[0]), params, {
  //   //     id: allNavsTree.slice(-1)[0].id + 1,
  //   //     type_text: getDictLabel("D_RoleType", type),
  //   //     gender_text: getDictLabel("D_Gender", gender),
  //   //     address_text: getCascadeLabel("C_Region", address),
  //   //     create_time: dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
  //   //   });
  //   //   allNavsTree.push(data);
  //   // }
  //   // return responseData({ code, msg, data });
  //   return responseData();
  // },
  // // 修改菜单
  // "POST /mock/menu/update": (req: CommonObj) => {
  //   const params = getRequestParams(req);
  //   const { id } = params;
  //   let data = findTreeNode(allNavsTree, id);
  //   if (!data) return responseData({ code: 1, msg: "不存在该菜单/目录/按钮" });
  //   data = merge(data, params, {
  //     update_time: dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
  //   });
  //   return responseData({ data });
  // },
});
