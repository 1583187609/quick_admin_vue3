import { CommonObj } from "@/core/_types";
import { getMockList } from "./_utils";
import { getDictLabel, getDictValues } from "../dict";
import dayjs from "dayjs";
import allAddress from "../data/address";
import allSchool from "../data/school";
import allCompany from "../data/company";
import allJob from "../data/job";
import allNavs from "../data/navs";

export const designMap = {
  // 用户表
  user: {
    name: "用户",
    list: [], // allUsers,
    privateKeys: ["psd"],
    // 待完善配置项
    // user_data
    // { type: "url", prop: "avatar" },
    getList(defaultData: CommonObj = {}) {
      // const allSchoolNames = allSchool.map(it => it.name);
      // const allCompanyName = allCompany.map(it => it.name);
      // const allJobName = allJob.map(it => it.name);
      const { role } = defaultData;
      //角色名称映射
      const roleNameMap: CommonObj = {
        0: "superAdmin",
        1: "admin",
        2: "specialUser",
        3: "user",
        4: "visitor",
        5: "developer",
      };
      return getMockList([
        "id",
        "userCode",
        "phone",
        "nickname",
        "birthday",
        "gender",
        "userName:name:用户姓名",
        "avatar",
        "region:address:现处地址",
        { type: "cascader", porp: "live_city", remark: "现居地", attrs: { name: "Region", level: 2 } },
        { type: "cascader", porp: "city", remark: "家乡", attrs: { name: "Region", level: 2 } },
        {
          type: "custom",
          attrs: {
            "role|1": role === undefined ? getDictValues("D_RoleType") : [role],
          },
        },
        {
          type: "custom",
          attrs: {
            account(res: CommonObj) {
              const { id, role } = res.context.currentContext;
              return `${roleNameMap[role]}_${id}`;
            },
          },
        },
        {
          type: "custom",
          attrs: {
            psd(res: CommonObj) {
              const { role } = res.context.currentContext;
              return `${roleNameMap[role]}12345`;
            },
          },
        },
        {
          type: "custom",
          attrs: {
            age(res: CommonObj) {
              const { birthday } = res.context.currentContext;
              return dayjs().diff(birthday, "year");
            },
          },
        },
        { type: "dict", prop: "status", attrs: { name: "D_AccountStatus" } }, // 账号状态
        "createTime:register_time:注册时间",
        "createUser",
        "updateTime",
        "updateUser",
        "remark",
        { type: "dict", prop: "company_status", attrs: { name: "D_YesNoStatus" } }, // 公司是否认证
        { type: "dict", prop: "school_status", attrs: { name: "D_YesNoStatus" } }, // 学校是否认证
        { type: "dict", prop: "school_certificate_level", attrs: { name: "D_EducationType" } }, // 学历：专科、本科、硕士、博士
        { type: "dict", prop: "single_type", attrs: { name: "D_MatrimonyStatus" } }, // 单身状态
        { type: "enum", prop: "income_type_name", attrs: { enums: ["小于10w", "10~20w", "20~30w", "30~50w", "100w以上"] } }, // 收入类型
        { type: "ctitle", prop: "produce", attrs: { min: 3, max: 200 } },
        {
          type: "custom",
          attrs: {
            user_data(res: CommonObj) {
              return res.context.currentContext;
            },
          },
        },
      ]);
    },
  },
  // 角色表
  role: {
    name: "角色",
    list: [],
    getList(defaultData: CommonObj = {}) {
      const codes = getDictValues("D_RoleType");
      const num = codes.length;
      return getMockList([
        "id",
        {
          role(res: CommonObj) {
            const { id } = res.context.currentContext;
            return codes[id - 1];
          },
          role_text: (res: CommonObj) => {
            const { role } = res.context.currentContext;
            return getDictLabel("D_RoleType", role);
          },
        },
        "enableStatus",
        "remark",
        "createTime",
        "updateTime",
        "createUser",
        "updateUser",
      ]);
    },
    // 行政地址
    region: {
      name: "行政地址",
      list: [],
      getList() {
        return allAddress;
      },
    },
    // 公司
    company: {
      name: "公司",
      list: [],
      getList() {
        return allCompany;
      },
    },
    // 学校
    school: {
      name: "学校",
      list: [],
      getList() {
        return allSchool;
      },
    },
    // 职业
    job: {
      name: "职业",
      list: [],
      getList() {
        return allJob;
      },
    },
    // 导航
    navs: {
      name: "导航",
      list: [],
      getList() {
        return allNavs;
      },
    },
  },
};
