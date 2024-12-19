import { getRequestParams, responseData, deleteAttrs, toViteMockApi } from "../utils";
import Mock from "mockjs";
import { getDictValues } from "../dict";
import { CommonObj } from "@/core/_types";
import allData from "../data";
import { getSession, setSession } from "./_session";

const delAttrs: string[] = allData.user.privateKeys;
const allUsers = allData.user.list;
const allNavs = allData.menu.list;

export default toViteMockApi({
  /**
   * 用户验证码
   * @param {boolean} ilo0 是否排除ilo0
   */
  "GET /mock/captcha": (req: CommonObj) => {
    const { num = 4, ilo0 = true } = getRequestParams(req);
    const captchaReg = new RegExp(ilo0 ? `[a-hj-km-zA-HJ-KM-Z2-9]{${num}}` : `[a-zA-Z0-9]{${num}}`);
    const { captcha } = Mock.mock({ captcha: captchaReg });
    setSession("captcha", captcha);
    return responseData({ data: captcha });
  },
  // 获取登录账号（一类角色各选取一个账号）
  "GET /mock/user/login/accounts": (req: CommonObj) => {
    const roles = getDictValues("D_RoleType");
    const accounts: CommonObj[] = [];
    let ind = 0;
    allUsers.find((item: CommonObj) => {
      if (roles[ind] === item.role) {
        const { account, role_text, phone, id, password } = item;
        accounts.push({ account, role_text, phone, id, password });
        ind++;
      }
      return ind >= roles.length;
    });
    return responseData({ data: accounts });
  },
  // 登录
  "POST /mock/user/login": (req: CommonObj) => {
    const { phone = "", password = "", captcha = "" } = getRequestParams(req, ["captcha", "phone", "password"]);
    const data: CommonObj[] = allUsers.find((it: CommonObj) => {
      return (it.phone === phone || it.account === phone) && it.password === password;
    });
    if (!data) return responseData({ code: 1, msg: "账号或密码错误" });
    const isErr = captcha?.toLowerCase() !== getSession("captcha")?.toLowerCase();
    if (isErr) return responseData({ code: 1, msg: "验证码错误" });
    const { token } = Mock.mock({ token: "@guid" }); // 生成32位uuid 的token
    setSession("token", token);
    setSession("userInfo", data);
    return responseData({ data: { navs: allNavs, user: { token, ...deleteAttrs(data, delAttrs) } } });
  },
  // 登出（推出登录）
  "POST /mock/user/logout": (req: CommonObj) => {
    const { phone, token } = getRequestParams(req);
    const target = allUsers.find((it: CommonObj) => it.phone === phone);
    if (!target) return responseData({ code: 1, msg: "不存在该用户" });
    setSession("userInfo", null);
    return responseData();
  },
});
