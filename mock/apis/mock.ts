import { getRequestParams, resData, deleteAttrs, toViteMockApi, getFilterList } from "../utils";
import allUsers from "../data/user";
import allNavs from "../data/navs";
import allRoles from "../data/roles";
import testFields from "../data/test";
import dictMap, { getDictText } from "../dict";
import allAddress from "../data/address";
import allSchool from "../data/school";
import allCompany from "../data/company";
import { CommonObj } from "@/core/_types";

const listMap = {
  users: allUsers,
  roles: allRoles,
};

const delAttrs: string[] = ["psd"];

export default toViteMockApi({
  /**
   * 通用的获取详情数据接口
   */
  "GET /mock/common/detail": (req: CommonObj) => {
    const { byName = "users", byKeys = ["id"], ...params } = getRequestParams(req);
    const by: CommonObj = {};
    byKeys.forEach((key: string) => {
      by[key] = params[key];
    });
    const queryList: CommonObj[] = getFilterList(listMap[byName], by);
    if (!queryList.length) return resData({ code: 1, msg: "未找到记录" });
    return resData({ data: queryList.length === 1 ? queryList[0] : queryList });
  },
  /**
   * 通用的获取列表的接口(也可作为导出用)
   */
  "GET /mock/common/list": (req: CommonObj) => {
    const { curr_page = 1, page_size = 10, ...params } = getRequestParams(req);
    const { byName = "users", id, type, gender, age = [], name, status, exports } = params;
    let queryList = getFilterList(listMap[byName], params, { age: ["range", "number"], name: ["match", "blur"] });
    queryList = queryList.map((item: CommonObj) => deleteAttrs(item, delAttrs));
    if (exports) {
      const { fields, ids } = exports;
      if (ids?.length) queryList = getFilterList(queryList, { ids }, { ids: ["enums", "same", "id"] });
      if (fields?.length) {
        queryList = queryList.map(row => {
          const newRow: CommonObj = {};
          fields.forEach((key: string) => (newRow[key] = row[key]));
          return newRow;
        });
      }
      return resData({ data: queryList });
    } else {
      const sInd = (curr_page - 1) * page_size;
      const eInd = sInd + page_size;
      return resData({
        data: {
          total_num: queryList.length,
          records: queryList.slice(sInd, eInd),
          curr_page,
          page_size,
          has_next: eInd < queryList.length - 1,
        },
      });
    }
  },
  /**
   * 通用的提交数据（信息对象）接口
   */
  "POST /mock/common": (req: CommonObj) => {
    return resData();
  },
  /**
   * 通用的新增接口
   */
  "POST /mock/common/add": (req: CommonObj) => {
    const { byName = "users", byKeys = ["phone"], ...params } = getRequestParams(req);
    const by: CommonObj = {};
    byKeys.forEach((key: string) => {
      by[key] = params[key];
    });
    const queryList: CommonObj[] = getFilterList(listMap[byName], by);
    if (queryList?.length) return resData({ code: 1, msg: "已存在该记录" });
    return resData();
  },
  /**
   * 通用的修改接口
   */
  "POST /mock/common/update": (req: CommonObj) => {
    const { byName = "users", byKeys = ["id"], ...params } = getRequestParams(req);
    if (!byKeys?.length || !params) return resData();
    const by: CommonObj = {}; // 根据某些字段去查
    byKeys.forEach((key: string) => {
      by[key] = params[key];
    });
    let queryList: any[] = getFilterList(listMap[byName], by);
    if (!queryList.length) return resData({ code: 1, msg: "未找到记录" });
    queryList.forEach(item => {
      Object.keys(params).forEach(key => {
        if (item[key] !== undefined) item[key] = params[key];
      });
    });
    return resData({ data: queryList });
  },
  /**
   * 通用的导入接口
   */
  "POST /mock/common/import": (req: CommonObj) => {
    const { byName = "users", byKey = "id", ...params } = getRequestParams(req);
    const by: CommonObj = { [byKey]: params[byKey] };
    const queryList: CommonObj[] = getFilterList(listMap[byName], by);
    if (queryList?.length) return resData({ code: 1, msg: `已存在该记录：${queryList.map(it => it[byKey]).join(", ")}` });
    return resData();
  },
  /**
   * 通用的删除接口
   */
  "DELETE /mock/common": (req: CommonObj) => {
    const { byName = "users", ...params } = getRequestParams(req);
    // const { ids = [] } = params;
    const queryList: CommonObj[] = getFilterList(listMap[byName], params, { ids: ["enums", "same", "id"] }, true);
    if (!queryList.length) return resData({ code: 1, msg: "未找到记录" });
    return resData();
  },
  /**
   * 通用的更新全部数据接口（类似post）
   */
  "PUT /mock/common": (req: CommonObj) => {
    return resData();
  },
  /**
   * 通用的更新局部数据（类似post，只针对更改过的）接口。是对put的补充，patch意为修补。
   */
  "PATCH /mock/common": (req: CommonObj) => {
    return resData();
  },
});
