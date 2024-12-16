import Mock from "mockjs";
import { getMockCfg } from "../utils";
import { CommonObj } from "@/core/_types";
import { getMockConfig } from "../design/_utils";
import dayjs from "dayjs";
import { getDictLabel, getDictValues } from "../dict";
import { needParam } from "@/utils";
// import allSchool from "../data/school";
// import allCompany from "../data/company";
// import allJob from "../data/job";

const { Random } = Mock;

/**
 * 生成正式用户列表数据
 * @param {string} num  生成数量
 * @param {object} defObj  模板默认值
 */
export function createPhone(phonePre = "135") {
  const reg = new RegExp(`\\d{${11 - phonePre.length}}`);
  return phonePre + Mock.mock(reg);
}

/**
 * 生成公司列表数据
 * @param {string} num  生成总数数量
 * @param idStart id开始值
 */
export function createCompanyList(num = 100, idStart = 1) {
  const mockData = Mock.mock({
    [`list|${num}`]: [
      {
        "id|+1": idStart, //id递增
        fullName(res: CommonObj) {
          return `${Random?.ctitle(3, 8)}公司`;
        },
        //简称
        shortName(res: CommonObj) {
          const { fullName } = res.context.currentContext;
          return Random?.cword(fullName, 1, 5);
        },
      },
    ],
  });
  mockData.list = num > 1 ? mockData.list : [mockData.list];
  return mockData.list;
}

/**
 * 生成常用字段
 * @param fields string[字段名][指定值] 示例：[["phone"],["name"]]
 * @param
 */
export function createTestFields(num = 199) {
  const mockData = Mock.mock({
    [`list|${num}`]: [
      getMockCfg({
        id: null,
        // enum: { name: "D_EnableStatus", prop: "status" },
        enum: [
          { name: "D_EnableStatus", prop: "status" },
          { name: "D_Gender", prop: "gender" },
        ],
        phone: null,
        cascader: null,
        remark: null,
        integer: null,
        earlyDate: null,
        createUpdateTime: null,
        custom: null,
      }),
    ],
  });
  mockData.list = num > 1 ? mockData.list : [mockData.list];
  return mockData.list;
}

/**
 * 获取用户的默认配置
 * @param defaultData
 */
// 待完善配置项
// userData
// { type: "url", prop: "avatar" },
function getUserConfig(defaultData: CommonObj = {}) {
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
  return getMockConfig([
    "id",
    "userCode",
    "phone",
    "nickname",
    { type: "enum", prop: "gender", attrs: { name: "D_Gender" } },
    "userName:name:用户姓名",
    "avatar",
    "region:address:地址",
    "birthday",
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
    "enableStatus",
    "createTime:register_time:注册时间",
    "createUser",
    "updateTime",
    "updateUser",
    "remark",
    { type: "ctitle", prop: "produce", attrs: { min: 3, max: 200 } },
    {
      type: "custom",
      attrs: {
        user_data(res: CommonObj) {
          const { id, user_code, address, address_text, avatar, gender, nickname } = res.context.currentContext;
          return {
            id, // id
            user_code, // 学号
            avatar, // 头像
            gender, // 性别
            nickname, // 用户昵称
            "account_status|1": getDictValues("D_AccountStatus"), // 账号状态
            "company_status|1": [0, 1], // 公司认证
            "school_status|1": [0, 1], // 学历认证
            "school_certificate_level|1": getDictValues("D_EducationType"), // 学历
            "single_type|1": getDictValues("D_MatrimonyStatus"), // 单身状态
            // "school_name|1": allSchoolNames, // 学校
            // "company_name|1": allCompanyName, // 公司
            // "job_name|1": allJobName, // 职业
            "income_type_name|1": ["小于10w", "10~20w", "20~30w", "30~50w", "100w以上"], // 收入
            live_city: address.slice(0, 2), // 现居地
            live_city_text: address_text, // 现居地
            city: address.slice(0, 2), // 家乡
            city_text: address_text, // 家乡
          };
        },
      },
    },
  ]);
}

function getRoleConfig(defaultData: CommonObj = {}) {
  const codes = getDictValues("D_RoleType");
  const num = codes.length;
  return getMockConfig([
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
}

export function getMockList(num = 9, config = needParam()) {
  const mockData = Mock.mock({
    [`list|${num}`]: [config],
  });
  mockData.list = num > 1 ? mockData.list : [mockData.list];
  return mockData.list;
}
