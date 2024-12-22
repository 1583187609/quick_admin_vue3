import { CommonObj } from "@/core/_types";
import { getMockList } from "./_utils";
import { getDictLabel, getDictMap, getDictValues } from "../dict";
import dayjs from "dayjs";
import allRegions from "../data/regions";
import allSchool from "../data/school";
import allCompany from "../data/company";
import allJob from "../data/job";
import allNavs from "../data/navs";
import allDepartment from "../data/department";
import Mock from "mockjs";
import { getNavsTree, typeOf } from "../utils";

const { Random } = Mock;

export const designMap = {
  common: {
    name: "通用表",
    getList() {
      const roles = getDictValues("D_RoleType");
      const allJobNames = allJob.map(it => it.name);
      const allSchoolNames = allSchool.map(it => it.name);
      const allCompanyNames = allCompany.map(it => it.full_name);
      const allIncomeTypes = ["小于10w", "10~20w", "20~30w", "30~50w", "100w以上"];
      const roleMap: CommonObj = getDictMap("D_RoleType");
      // 各个角色的账号数量占比
      const roleWeight = {
        0: { phonePre: "18483221518", amount: 1 },
        1: { phonePre: "180", amount: 2 },
        2: { phonePre: "181", amount: 3 },
        3: { phonePre: "182", amount: 4 },
        4: { phonePre: "183", amount: 5 },
        5: { phonePre: "184", amount: 6 },
        6: { phonePre: "185", amount: 10 },
      };
      let untilInd = 0;
      let roleInd = 0;
      function getInfo(ind: number) {
        if (ind === untilInd) {
          untilInd += roleWeight[roleInd].amount;
          roleInd++;
          return true;
        }
      }
      return getMockList(
        [
          "id",
          "userCode",
          "userName:name:用户姓名",
          "gender",
          "nickname",
          "avatar",
          "birthday",
          "region:address:现处地址",
          { type: "cascader", prop: "live_city", remark: "现居地", attrs: { name: "C_Region", level: 2 } },
          { type: "cascader", prop: "city", remark: "家乡", attrs: { name: "C_Region", level: 2 } },
          {
            type: "dict",
            prop: "role", // 角色类型
            attrs: { name: "D_RoleType" },
            handler({ context }: CommonObj) {
              const { id } = context.currentContext;
              if (roleInd < roles.length) getInfo(id - 1);
              return roleInd - 1;
            },
          },
          {
            type: "phone",
            prop: "phone",
            handler: ({ context }: CommonObj) => Random.phone(roleWeight[context.currentContext.role].phonePre),
          },
          {
            // 账号
            account({ context }: CommonObj) {
              const { id, role } = context.currentContext;
              return `${roleMap[role]}_${id}`;
            },
          },
          { password: ({ context }: CommonObj) => `role${context.currentContext.role}123456` },
          { age: ({ context }: CommonObj) => dayjs().diff(context.currentContext.birthday, "year") },
          { type: "dict", prop: "account_status", attrs: { name: "D_AccountStatus" } }, // 账号状态
          { type: "dict", prop: "company_status", attrs: { name: "D_YesNoStatus" } }, // 公司是否认证
          { type: "dict", prop: "school_status", attrs: { name: "D_YesNoStatus" } }, // 学校是否认证
          { type: "dict", prop: "school_certificate_level", attrs: { name: "D_EducationType" } }, // 学历：专科、本科、硕士、博士
          { type: "dict", prop: "single_type", attrs: { name: "D_MatrimonyStatus" } }, // 单身状态
          { type: "helper", prop: "job_name", attrs: { typeKey: "pick", arr: allJobNames } }, // 职业名称
          { type: "helper", prop: "school_name", attrs: { typeKey: "pick", arr: allSchoolNames } }, // 学校名称
          { type: "helper", prop: "company_name", attrs: { typeKey: "pick", arr: allCompanyNames } }, // 公司名称
          { type: "helper", prop: "income_type_name", attrs: { typeKey: "pick", arr: allIncomeTypes } }, // 收入类型
          { type: "string", prop: "produce", attrs: { typeKey: "ctitle", min: 3, max: 200 } },
          { user_data: ({ context }: CommonObj) => JSON.parse(JSON.stringify(context.currentContext)) },
          "enableStatus", // 启用禁用状态
          "createUpdate",
          "remark",
        ],
        22
      );
    },
  },
  // 用户表
  user: {
    name: "用户",
    privateKeys: ["password"],
    getList() {
      const roles = getDictValues("D_RoleType");
      const allJobNames = allJob.map(it => it.name);
      const allSchoolNames = allSchool.map(it => it.name);
      const allCompanyNames = allCompany.map(it => it.full_name);
      const allIncomeTypes = ["小于10w", "10~20w", "20~30w", "30~50w", "100w以上"];
      const roleMap: CommonObj = getDictMap("D_RoleType");
      // 各个角色的账号数量占比
      const roleWeight = {
        0: { phonePre: "18483221518", amount: 1 },
        1: { phonePre: "180", amount: 2 },
        2: { phonePre: "181", amount: 3 },
        3: { phonePre: "182", amount: 4 },
        4: { phonePre: "183", amount: 5 },
        5: { phonePre: "184", amount: 6 },
        6: { phonePre: "185", amount: 10 },
      };
      let untilInd = 0;
      let roleInd = 0;
      function getInfo(ind: number) {
        if (ind === untilInd) {
          untilInd += roleWeight[roleInd].amount;
          roleInd++;
          return true;
        }
      }
      return getMockList(
        [
          "id",
          "userCode",
          "userName:name:用户姓名",
          "gender",
          "nickname",
          "avatar",
          "birthday",
          "region:address:现处地址",
          { type: "cascader", prop: "live_city", remark: "现居地", attrs: { name: "C_Region", level: 2 } },
          { type: "cascader", prop: "city", remark: "家乡", attrs: { name: "C_Region", level: 2 } },
          {
            type: "dict",
            prop: "role", // 角色类型
            attrs: { name: "D_RoleType" },
            handler({ context }: CommonObj) {
              const { id } = context.currentContext;
              if (roleInd < roles.length) getInfo(id - 1);
              return roleInd - 1;
            },
          },
          {
            type: "phone",
            prop: "phone",
            handler: ({ context }: CommonObj) => Random.phone(roleWeight[context.currentContext.role].phonePre),
          },
          {
            // 账号
            account({ context }: CommonObj) {
              const { id, role } = context.currentContext;
              return `${roleMap[role]}_${id}`;
            },
          },
          { password: ({ context }: CommonObj) => `role${context.currentContext.role}123456` },
          { age: ({ context }: CommonObj) => dayjs().diff(context.currentContext.birthday, "year") },
          { type: "dict", prop: "account_status", attrs: { name: "D_AccountStatus" } }, // 账号状态
          { type: "dict", prop: "company_status", attrs: { name: "D_YesNoStatus" } }, // 公司是否认证
          { type: "dict", prop: "school_status", attrs: { name: "D_YesNoStatus" } }, // 学校是否认证
          { type: "dict", prop: "school_certificate_level", attrs: { name: "D_EducationType" } }, // 学历：专科、本科、硕士、博士
          { type: "dict", prop: "single_type", attrs: { name: "D_MatrimonyStatus" } }, // 单身状态
          { type: "helper", prop: "job_name", attrs: { typeKey: "pick", arr: allJobNames } }, // 职业名称
          { type: "helper", prop: "school_name", attrs: { typeKey: "pick", arr: allSchoolNames } }, // 学校名称
          { type: "helper", prop: "company_name", attrs: { typeKey: "pick", arr: allCompanyNames } }, // 公司名称
          { type: "helper", prop: "income_type_name", attrs: { typeKey: "pick", arr: allIncomeTypes } }, // 收入类型
          { type: "string", prop: "produce", attrs: { typeKey: "ctitle", min: 3, max: 200 } },
          { user_data: ({ context }: CommonObj) => JSON.parse(JSON.stringify(context.currentContext)) },
          "enableStatus", // 启用禁用状态
          "createUpdate",
          "remark",
        ],
        42,
        {
          // 有权限的用户
          authUsers(list: CommonObj[] = []) {
            // 统计有权限账号的个数
            const total = Object.keys(roleWeight)
              .filter(n => Number(n) < 3)
              .reduce((pre, cur) => pre + Number(cur), 0);
            return list.slice(0, total);
          },
        }
      );
    },
  },
  // 角色表
  role: {
    name: "角色",
    getList() {
      const roles = getDictValues("D_RoleType");
      const total = roles.length;
      return getMockList(
        [
          "id",
          {
            role: ({ context }: CommonObj) => roles[context.currentContext.id - 1],
            role_text: ({ context }: CommonObj) => getDictLabel("D_RoleType", context.currentContext.role),
          },
          "enableStatus",
          "createUpdate",
          "remark",
        ],
        total
      );
    },
  },
  // 部门表
  department: {
    name: "部门",
    getList() {
      return allDepartment;
    },
  },
  // 行政地址
  region: {
    name: "行政地址",
    getList() {
      return allRegions;
    },
  },
  // 公司
  company: {
    name: "公司",
    getList() {
      // const beforePrefix = () => Random.province();
      // const afterPrefix = ["股份有限公司", "科技公司", "有限公司", "公司"];
      // return getMockList(
      //   [
      //     "id",
      //     {
      //       full_name: () => `${beforePrefix().replace(/[省市]/g, "")}${Random.ctitle(3, 8)}${Random.pick(afterPrefix)}`,
      //       short_name: ({ context }: CommonObj) => Random.cword(context.currentContext.full_name, 1, 5),
      //     },
      //   ],
      //   100
      // );
      return allCompany;
    },
  },
  // 学校
  school: {
    name: "学校",
    getList() {
      return allSchool;
    },
  },
  // 职业
  job: {
    name: "职业",
    getList() {
      return allJob;
    },
  },
  // 菜单
  menu: {
    name: "菜单",
    getList() {
      return getNavsTree(allNavs);
    },
  },
};

export function getDesignData(designCfg: CommonObj = designMap, keys = Object.keys(designCfg)) {
  const data: CommonObj = {};
  keys.forEach(key => {
    const { getList, ...rest } = designCfg[key];
    const result = getList();
    const t = typeOf(result);
    let list = [];
    let rules = [];
    if (t === "Array") {
      list = result;
    } else if (t === "Object") {
      list = result.list;
      rules = result.rules;
    } else {
      throw new Error(`暂未处理此类型：${t}`);
    }
    data[key] = {
      list,
      rules,
      ...rest,
    };
  });
  return data;
}
