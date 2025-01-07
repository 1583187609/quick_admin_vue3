import { getRequestParams, responseData, toViteMockApi } from "../utils";
import { CommonObj } from "@/core/_types";
import allData from "../data";

const nameKeyMap = {
  school: "name",
  company: "full_name",
};
export default toViteMockApi({
  // 获取下拉项：目前只支持学校(school)、公司(company)
  "GET /mock/options": (req: CommonObj) => {
    const params = getRequestParams(req);
    const { type = "school", name } = params;
    const target = allData[type];
    if (!target) return responseData({ code: -1, msg: `不存在该下拉项：${type}` });
    if (!name) return responseData({ data: target.list });
    const list = target.list.filter((it: CommonObj) => {
      const isId = !isNaN(Number(name));
      if (isId) return it.id == name;
      const nameKey = nameKeyMap[type] ?? "name";
      return it[nameKey]?.includes(name) ?? true;
    });
    return responseData({ data: list });
  },
  // 获取级联
  "GET /mock/cascader": (req: CommonObj) => {
    const params = getRequestParams(req);
    const { name = "region" } = params;
    const target = allData[name];
    if (!target) return responseData({ code: -1, msg: `不存在该级联：${name}` });
    const list = target.list;
    return responseData({ data: list });
  },
});
