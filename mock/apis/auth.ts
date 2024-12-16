import {
  getRequestParams,
  responseData,
  toViteMockApi,
  getConstructorObj,
  getNavsTree,
  findTreeNode,
  getFilterList,
} from "../utils";
import _ from "lodash";
import _allUsers from "../data/user";
import allNavs from "../data/navs";
import roleRows from "../data/roles";
import { getDictLabel, getCascadeLabel } from "../dict";
import dayjs from "dayjs";
import { CommonObj } from "@/core/_types";

const { merge } = _;
let allNavsTree = getNavsTree(allNavs);
let allRoles = JSON.parse(JSON.stringify(roleRows));

export default toViteMockApi({
  // 新增角色
  "POST /auth/role/add": (req: CommonObj) => {
    const params = getRequestParams(req);
    const { role_text, role, status, remark, menu_auth } = params;
    const target = allRoles.find((it: CommonObj) => it.role === role);
    if (target) return responseData({ code: 1, msg: "该角色已存在" });
    const data = merge(getConstructorObj(allRoles?.[0]), params, {
      id: allRoles.slice(-1)[0].id + 1,
      role,
      role_text,
      status_text: getDictLabel("D_Gender", status),
      create_time: dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
    });
    allRoles.push(data);
    return responseData({ data });
  },
  // 删除角色
  "DELETE /auth/role/list": (req: CommonObj) => {
    const params: CommonObj = getRequestParams(req);
    // const { ids = [] } = params;
    allRoles = getFilterList(allRoles, params, { ids: ["enums", "same", "id"] }, true);
    return responseData();
  },
  // 修改角色
  "POST /auth/role/update": (req: CommonObj) => {
    const params = getRequestParams(req);
    const { id, role, role_text, status, remark, menu_auth } = params;
    const data = allRoles.find((it: CommonObj) => it.id === id);
    if (!data) return responseData({ code: 1, msg: "不存在该角色" });
    merge(data, params, {
      role_text: getDictLabel("D_RoleType", role),
      status_text: getDictLabel("D_Gender", status),
      update_time: dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
    });
    return responseData({ data });
  },
  // 查询角色列表
  "GET /auth/role/list": (req: CommonObj) => {
    const { curr_page = 1, page_size = 10, ...params } = getRequestParams(req);
    // const { role, status, create_time_range } = params;
    const queryList = getFilterList(allRoles, params, { create_time_range: ["range", "date", "create_time"] });
    const sInd = (curr_page - 1) * page_size;
    const eInd = sInd + page_size;
    return responseData({
      data: {
        total_num: queryList.length,
        records: queryList,
        curr_page,
        page_size,
        has_next: eInd < queryList.length - 1,
      },
    });
  },
  // 查询角色信息
  "GET /auth/role/info": (req: CommonObj) => {
    const { id } = getRequestParams(req);
    const data = allRoles.find((it: CommonObj) => it.id === id);
    if (!data) return responseData({ code: 1, msg: "不存在该角色" });
    return responseData({ data });
  },
  // 查询菜单列表
  "GET /auth/menu/list": (req: CommonObj) => {
    const { curr_page, page_size, ...params } = getRequestParams(req);
    const cloneAllNavsTree = JSON.parse(JSON.stringify(allNavsTree));
    const queryList = getFilterList(cloneAllNavsTree, params, {
      name: ["match", "blur"],
      create_time_range: ["range", "date", "create_time"],
    });
    return responseData({
      data: {
        total_num: queryList.length,
        records: queryList,
        // curr_page,
        // page_size,
        has_next: false,
      },
    });
  },
  // 删除菜单
  "DELETE /auth/menu/list": (req: CommonObj) => {
    const params: CommonObj = getRequestParams(req);
    allNavsTree = getFilterList(allNavsTree, params, { ids: ["enums", "same", "id"] }, true);
    return responseData();
  },
  // 查询菜单详情
  "GET /auth/menu/info": (req: CommonObj) => {
    const { id } = getRequestParams(req, ["id"]);
    const data = findTreeNode(allNavsTree, id);
    if (!data) return responseData({ code: 1, msg: "不存在该菜单" });
    return responseData({ data });
  },
  // 新增菜单
  "POST /auth/menu/add": (req: CommonObj) => {
    // const params = getRequestParams(req);
    // let code, msg, data;
    // const { type, gender, phone, address } = params;
    // const isExist = allNavsTree.find((it: CommonObj) => it.phone === phone);
    // if (isExist) {
    //   code = 1;
    //   msg = "该菜单已存在";
    // } else {
    //   data = merge(getConstructorObj(allNavsTree?.[0]), params, {
    //     id: allNavsTree.slice(-1)[0].id + 1,
    //     type_text: getDictLabel("D_RoleType", type),
    //     gender_text: getDictLabel("D_Gender", gender),
    //     address_text: getCascadeLabel("Region", address),
    //     create_time: dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
    //   });
    //   allNavsTree.push(data);
    // }
    // return responseData({ code, msg, data });
    return responseData();
  },
  // 修改菜单
  "POST /auth/menu/update": (req: CommonObj) => {
    const params = getRequestParams(req);
    const { id } = params;
    let data = findTreeNode(allNavsTree, id);
    if (!data) return responseData({ code: 1, msg: "不存在该菜单/目录/按钮" });
    data = merge(data, params, {
      update_time: dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
    });
    return responseData({ data });
  },
});
