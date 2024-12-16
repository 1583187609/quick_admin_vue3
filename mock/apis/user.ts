import { getRequestParams, responseData, deleteAttrs, toViteMockApi, getConstructorObj, getFilterList } from "../utils";
import Mock from "mockjs";
import _allUsers from "../data/user";
// import testUserFields from "../data/test";
import allNavs from "../data/navs";
import { getDictLabel, getCascadeLabel, getDictValues } from "../dict";
import { CommonObj } from "@/core/_types";
import dayjs from "dayjs";
import _ from "lodash";

// console.log(testUserFields, "testUserFields----------");
const { merge } = _;
const delAttrs: string[] = ["psd"];
let allUsers = JSON.parse(JSON.stringify(_allUsers));
//缓存数据
const cacheData: CommonObj = {
  token: "", //登录授权token
  captcha: "", //4位验证码
};
//设置（修改）缓存
function setCache(key: string, val: any) {
  cacheData[key] = val;
}

export default toViteMockApi({
  /**
   * 用户验证码
   * @param {boolean} ilo0 是否排除ilo0
   */
  "GET /user/captcha": (req: CommonObj) => {
    const { num = 4, ilo0 = true } = getRequestParams(req);
    const captchaReg = new RegExp(ilo0 ? `[a-hj-km-zA-HJ-KM-Z2-9]{${num}}` : `[a-zA-Z0-9]{${num}}`);
    const { captcha } = Mock.mock({
      captcha: captchaReg,
    });
    setCache("captcha", captcha);
    return responseData({ data: captcha });
  },
  // 注册/新增用户
  "POST /user/add": (req: CommonObj) => {
    const params = getRequestParams(req);
    const { type, gender, phone, address } = params;
    let data = allUsers.find((it: CommonObj) => it.phone === phone);
    if (data) return responseData({ code: 1, msg: "该账号已存在" });
    data = merge(getConstructorObj(allUsers?.[0]), params, {
      id: allUsers.slice(-1)[0].id + 1,
      type_text: getDictLabel("D_RoleType", type),
      gender_text: getDictLabel("D_Gender", gender),
      address_text: getCascadeLabel("Region", address),
      create_time: dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
    });
    allUsers.push(data);
    return responseData({ data });
  },
  // 删除用户
  "DELETE /user/list": (req: CommonObj) => {
    const params: CommonObj = getRequestParams(req);
    // const { ids = [] } = params;
    const queryList = getFilterList(allUsers, params, { ids: ["enums", "same", "id"] }, true);
    allUsers = queryList;
    return responseData();
  },
  // 修改用户
  "POST /user/update": (req: CommonObj) => {
    const params = getRequestParams(req);
    const { id, phone, type, gender, address } = params;
    const user = allUsers.find((it: CommonObj) => it.id === id || it.phone === phone);
    if (!user) return responseData({ code: 1, msg: "不存在该用户" });
    const data = merge(user, params, {
      type_text: getDictLabel("D_RoleType", type),
      gender_text: getDictLabel("D_Gender", gender),
      address_text: getCascadeLabel("Region", address),
      update_time: dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss"),
    });
    return responseData({ data });
  },
  // 查询/导出用户列表
  "GET /user/list": (req: CommonObj) => {
    const { curr_page = 1, page_size = 10, ...params } = getRequestParams(req);
    const { id, type, gender, age = [], name, exports, status } = params;
    let queryList = getFilterList(allUsers, params, { age: ["range", "number"], name: ["match", "blur"] });
    queryList = queryList.map((item: CommonObj) => {
      item = deleteAttrs(item, delAttrs);
      return item;
    });
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
  // 查询用户信息
  "GET /user/info": (req: CommonObj) => {
    const { id } = getRequestParams(req);
    const data = allUsers.find((it: CommonObj) => it.id === id);
    if (!data) return responseData({ code: 1, msg: "不存在该用户" });
    return responseData({ data });
  },
  // 获取登录账号（一类角色各选取一个账号）
  "GET /user/login/accounts": (req: CommonObj) => {
    const roles = getDictValues("D_RoleType");
    const accounts: CommonObj[] = [];
    let ind = 0;
    _allUsers.find((item: CommonObj) => {
      if (roles[ind] === item.type) {
        const { account, type_text, phone, id, psd } = item;
        accounts.push({ account, type_text, phone, id, psd });
        ind++;
      }
      return ind >= roles.length;
    });
    return responseData({
      data: accounts,
    });
  },
  // 用户登录
  "POST /user/login": (req: CommonObj) => {
    const { phone = "", psd = "", captcha = "" } = getRequestParams(req, ["captcha", "phone", "psd"]);
    const data: CommonObj[] = allUsers.find((it: CommonObj) => {
      return (it.phone === phone || it.account === phone) && it.psd === psd;
    });
    if (!data) return responseData({ code: 1, msg: "账号或密码错误" });
    const isErr = captcha?.toLowerCase() !== cacheData.captcha?.toLowerCase();
    if (isErr) {
      return responseData({ code: 1, msg: "验证码错误" });
    } else {
      const { token } = Mock.mock({ token: "@guid" }); //生成32位uuid 的token
      setCache("token", token);
      return responseData({
        data: {
          navs: allNavs,
          user: { token, ...deleteAttrs(data, delAttrs) },
        },
      });
    }
  },
  // 用户退出
  "POST /user/logout": (req: CommonObj) => {
    const { phone, token } = getRequestParams(req);
    const target = allUsers.find((it: CommonObj) => it.phone === phone);
    if (!target) return responseData({ code: 1, msg: "不存在该用户" });
    return responseData();
  },
  // 删除用户
  // "DELETE /user/:id": (req: CommonObj) => {
  //   const { id } = getRequestParams(req);
  //   const findInd = allUsers.findIndex((it: CommonObj) => it.id === id);
  //   if (findInd === -1) return responseData({ code: 1, msg: "不存在该用户" });
  //   allUsers.splice(findInd, 1);
  //   return responseData();
  // },
});
