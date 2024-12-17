import { getRequestParams, responseData, toViteMockApi } from "../utils";
import { CommonObj } from "@/core/_types";
import allData from "../data";

const allAddress = allData.region.lit;
const allSchool = allData.school.lit;
const allCompany = allData.company.lit;

export default toViteMockApi({
  // 获取学校列表
  "GET /options/school": (req: CommonObj) => {
    const params = getRequestParams(req);
    const { name } = params;
    const list = allSchool.filter((it: CommonObj) => it.name.includes(name));
    return responseData({ data: list });
  },
  // 获取公司列表
  "GET /options/company": (req: CommonObj) => {
    const params = getRequestParams(req);
    const { name } = params;
    const list = allCompany.filter((it: CommonObj) => it.full_name.includes(name));
    return responseData({ data: list });
  },
  // 获取地区省市区县
  "GET /cascader/region": (req: CommonObj) => {
    // const params = getRequestParams(req);
    // const { name } = params;
    const cloneAddress = allAddress.map((pItem, pInd) => {
      const { id, name, city } = pItem;
      const cloneCity = city.map((cItem, cInd) => {
        const { id, name, area } = cItem;
        const cloneArea = area.map((aItem, aInd) => {
          const { id, name } = aItem;
          return { value: id, label: name };
        });
        return { value: id, label: name, children: cloneArea };
      });
      return { value: id, label: name, children: cloneCity };
    });
    return responseData({ data: cloneAddress });
  },
});
