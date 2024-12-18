import { getRequestParams, responseData, deleteAttrs, toViteMockApi, getFilterList } from "../utils";
import { CommonObj } from "@/core/_types";
import allData from "../data";

// 通用接口相关
export default toViteMockApi({
  // 新增
  "POST /mock/common/add": (req: CommonObj) => {
    const { byName = "user", byKeys = ["phone"], ...params } = getRequestParams(req);
    const by: CommonObj = {};
    byKeys.forEach((key: string) => {
      by[key] = params[key];
    });
    const queryList: CommonObj[] = getFilterList(allData[byName].list, by);
    if (queryList?.length) return responseData({ code: 1, msg: "已存在该记录" });
    return responseData();
  },
  // 删除
  "DELETE /mock/common": (req: CommonObj) => {
    const { byName = "user", ...params } = getRequestParams(req);
    // const { ids = [] } = params;
    const queryList: CommonObj[] = getFilterList(allData[byName].list, params, { ids: ["pick", "same", "id"] }, true);
    if (!queryList.length) return responseData({ code: 1, msg: "未找到记录" });
    return responseData();
  },
  // 修改
  "POST /mock/common/update": (req: CommonObj) => {
    const { byName = "user", byKeys = ["id"], ...params } = getRequestParams(req);
    if (!byKeys?.length || !params) return responseData();
    const by: CommonObj = {}; // 根据某些字段去查
    byKeys.forEach((key: string) => {
      by[key] = params[key];
    });
    const queryList: CommonObj[] = getFilterList(allData[byName].list, by);
    if (!queryList.length) return responseData({ code: 1, msg: "未找到记录" });
    queryList.forEach(item => {
      Object.keys(params).forEach(key => {
        if (item[key] !== undefined) item[key] = params[key];
      });
    });
    return responseData({ data: queryList });
  },
  // 查询/导出列表
  "GET /mock/common/list": (req: CommonObj) => {
    const { curr_page = 1, page_size = 10, ...params } = getRequestParams(req);
    const { byName = "user", id, type, gender, age = [], name, status, exports } = params;
    let queryList = getFilterList(allData[byName].list, params, { age: ["between", "number"], name: ["match", "blur"] });
    queryList = queryList.map((item: CommonObj) => deleteAttrs(item, allData[byName].privateKeys));
    if (exports) {
      const { fields, ids } = exports;
      if (ids?.length) queryList = getFilterList(queryList, { ids }, { ids: ["pick", "same", "id"] });
      if (fields?.length) {
        queryList = queryList.map(row => {
          const newRow: CommonObj = {};
          fields.forEach((key: string) => (newRow[key] = row[key]));
          return newRow;
        });
      }
      return responseData({ data: queryList });
    } else {
      const sInd = (curr_page - 1) * page_size;
      const eInd = sInd + page_size;
      return responseData({
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
  // 查询详情
  "GET /mock/common/detail": (req: CommonObj) => {
    const { byName = "user", byKeys = ["id"], ...params } = getRequestParams(req);
    const by: CommonObj = {};
    byKeys.forEach((key: string) => {
      by[key] = params[key];
    });
    const queryList: CommonObj[] = getFilterList(allData[byName].list, by);
    if (!queryList.length) return responseData({ code: 1, msg: "未找到记录" });
    return responseData({ data: queryList.length === 1 ? queryList[0] : queryList });
  },
  // 导入
  "POST /mock/common/import": (req: CommonObj) => {
    const { byName = "user", byKey = "id", ...params } = getRequestParams(req);
    const by: CommonObj = { [byKey]: params[byKey] };
    const queryList: CommonObj[] = getFilterList(allData[byName].list, by);
    if (queryList?.length) return responseData({ code: 1, msg: `已存在该记录：${queryList.map(it => it[byKey]).join(", ")}` });
    return responseData();
  },
  // 提交
  "POST /mock/common": (req: CommonObj) => {
    return responseData();
  },
  // 修改全部（类似post）
  "PUT /mock/common": (req: CommonObj) => {
    return responseData();
  },
  // 修改局部（类似post，只针对更改过的，是对put的补充，patch意为修补）
  "PATCH /mock/common": (req: CommonObj) => {
    return responseData();
  },
});
