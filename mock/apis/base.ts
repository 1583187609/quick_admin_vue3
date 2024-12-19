import { getRequestParams, responseData, toViteMockApi } from "../utils";
import { CommonObj } from "@/core/_types";
import allData from "../data";

export default toViteMockApi({
  // 获取下拉项
  "GET /mock/options": (req: CommonObj) => {
    const params = getRequestParams(req);
    const { name = "school", label, value } = params;
    const target = allData[name];
    if (!target) throw new Error(`不存在该下拉项：${name}`);
    const list = target.list.filter((it: CommonObj) => it.label.includes(label));
    return responseData({ data: list });
  },
  // 获取级联
  "GET /mock/cascader": (req: CommonObj) => {
    const params = getRequestParams(req);
    const { name = "region", value } = params;
    const target = allData[name];
    if (!target) throw new Error(`不存在该级联：${name}`);
    const list = target.list.filter((it: CommonObj) => true);
    return responseData({ data: list });
  },
});
