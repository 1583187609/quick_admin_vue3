import { getRequestParams, resData, deleteAttrs, filterByConditions, toViteMockApi } from "../utils";
import allUsers from "../data/user";
import allNavs from "../data/navs";
import roleRows from "../data/roles";
import testFields from "../data/test";
import { userRows } from "../data/rows";
import dictMap, { getDictText } from "../dict";
import allAddress from "../data/address";
import allSchool from "../data/school";
import allCompany from "../data/company";
import { CommonObj } from "@/vite-env";

const delAttrs: string[] = ["psd"];

export default toViteMockApi({
  /**
   * 测试综合数据
   * @param type {string} XXXX
   */
  "GET /mock/test": (req: CommonObj) => {
    const { curr_page = 1, page_size = 10 } = getRequestParams(req);
    return resData({ data: testFields });
  },
  /**
   * 测试
   * @param type {string} XXXX
   */
  "GET /mock/user": (req: CommonObj) => {
    const { curr_page = 1, page_size = 10 } = getRequestParams(req);
    return resData({ data: allUsers });
  },
  /**
   * 字典映射
   */
  "GET /mock/dict": (req: CommonObj) => {
    const { name } = getRequestParams(req);
    if (name) {
      if (dictMap[name]) {
        return resData({ data: dictMap[name] });
      } else {
        return resData({
          code: 1,
          msg: "未找到该字典映射",
          data: null,
        });
      }
    } else {
      return resData({ data: dictMap });
    }
  },
  /**
   * 获取地区省市区县
   */
  "GET /mock/address": (req: CommonObj) => {
    // const { name } = getRequestParams(req);
    const cloneAddress = allAddress.map((pItem, pInd) => {
      const { id, name, city } = pItem;
      const cloneCity = city.map((cItem, cInd) => {
        const { id, name, area } = cItem;
        const cloenArea = area.map((aItem, aInd) => {
          const { id, name } = aItem;
          return { value: id, label: name };
        });
        return {
          value: id,
          label: name,
          children: cloenArea,
        };
      });
      return {
        value: id,
        label: name,
        children: cloneCity,
      };
    });
    return resData({ data: cloneAddress });
  },
  /**
   * 获取学校列表
   */
  "GET /mock/school/list": (req: CommonObj) => {
    const { name } = getRequestParams(req);
    let list = allSchool.filter((it: CommonObj) => it.name.includes(name));
    // list = list.map((item: CommonObj) => {
    //   const { name, id, ...rest } = item;
    //   return { label: name, value: id, ...rest };
    // });
    return resData({ data: list });
  },
  /**
   * 获取公司列表
   */
  "GET /mock/company/list": (req: CommonObj) => {
    const { name } = getRequestParams(req);
    let list = allCompany.filter((it: CommonObj) => it.fullName.includes(name));
    // list = list.map((item: CommonObj) => {
    //   const { fullName, id, ...rest } = item;
    //   return { label: fullName, value: id, ...rest };
    // });
    return resData({ data: list });
  },
  /**
   * 用户提交表单（测试）
   */
  "POST /user/submit": (req: CommonObj) => {
    return resData({ data: null });
  },
});
