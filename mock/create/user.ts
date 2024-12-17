import { createPhone } from "./base";
import Mock from "mockjs";
import dayjs from "dayjs";
import { getDictLabel, getDictValues, getCascadeLabel } from "../dict";
import { getAvatarUrl } from "../utils";
import allAddress from "../data/address";
import allSchool from "../data/school";
import allCompany from "../data/company";
import allJob from "../data/job";
import { CommonObj } from "@/core/_types";

const { Random } = Mock;

const allSchoolNames = allSchool.map(it => it.name);
const allCompanyName = allCompany.map(it => it.name);
const allJobName = allJob.map(it => it.name);

/**
 * 生成正式用户列表数据
 * @param {string} num  生成数量
 * @param {object} defObj  模板默认值
 */
export function createUserList(defObj: CommonObj = {}, num = 100, idStart = 1) {
  const { userCode, gender, type, phonePre = "135" } = defObj;
  //角色名称映射
  const roleNameMap: CommonObj = {
    0: "superAdmin",
    1: "admin",
    2: "specialUser",
    3: "user",
    4: "visitor",
    5: "developer",
  };
  const mockData = Mock.mock({
    [`list|${num}`]: [
      {
        "id|+1": idStart, //id递增
        userCode: Mock.Random.natural(10000000, 99999999), // 学号
        "type|1": type === undefined ? getDictValues("D_RoleType") : [type],
        type_text: (res: CommonObj) => {
          const { type } = res.context.currentContext;
          return getDictLabel("D_RoleType", type);
        },
        phone: () => createPhone(phonePre), //电话号码
        account(res: CommonObj) {
          const { id, type } = res.context.currentContext;
          return `${roleNameMap[type]}_${id}`;
        },
        nickname: (res: CommonObj) => {
          const { type_text } = res.context.currentContext;
          return Random.cword("别样的感动", 1, 5);
        },
        "gender|1": gender ? [gender] : getDictValues("D_Gender"),
        gender_text(res: CommonObj) {
          const { gender } = res.context.currentContext;
          return getDictLabel("D_Gender", gender);
        },
        psd: `${roleNameMap[type]}12345`,
        name: () => Random.cname(), //姓名
        "roles|1": getDictValues("D_RoleType"), // 角色类型
        avatar(res: CommonObj) {
          const { gender } = res.context.currentContext;
          return getAvatarUrl(gender);
        },
        // address: () => Random.city(true), //地址
        //地址 ids
        address() {
          const arrAreas = allAddress.map((pItem, pInd) => {
            const cloneCity = pItem.city.map((cItem, cInd) => {
              const cloneArea = cItem.area.map((aItem, aInd) => {
                return aItem.id;
              });
              return cloneArea;
            });
            return cloneCity;
          });
          const pInd = Math.floor(Math.random() * arrAreas.length);
          const cInd = Math.floor(Math.random() * arrAreas[pInd].length);
          const aInd = Math.floor(Math.random() * arrAreas[pInd][cInd].length);
          return [allAddress[pInd].id, allAddress[pInd].city[cInd].id, allAddress[pInd].city[cInd].area[aInd].id];
        },
        // 对应的地址文本
        address_text(res: CommonObj) {
          const { address } = res.context.currentContext;
          return getCascadeLabel("Region", address);
        },
        birthday() {
          //出生日期
          return Random.date();
        },
        age(res: CommonObj) {
          //年龄
          const { birthday } = res.context.currentContext;
          return dayjs().diff(birthday, "year");
        },
        // 账号启用禁用状态
        "status|1": getDictValues("D_EnableStatus"),
        status_text(res: CommonObj) {
          const { status } = res.context.currentContext;
          return getDictLabel("D_EnableStatus", status);
        },
        // 介绍
        produce() {
          return Random.ctitle(3, 200);
        },
        // 注册时间
        register_time() {
          return Random.datetime();
        },
        // 创建人
        create_user() {
          return Random.cname();
        },
        // 创建时间
        create_time() {
          return Random.datetime();
        },
        // 更新人
        update_user() {
          return Random.cname();
        },
        // 更新时间
        update_time() {
          return Random.datetime();
        },
        // 备注
        remark() {
          return Random.ctitle(0, 20);
        },
        // 用户信息
        user_data(res: CommonObj) {
          const { id, userCode, address, address_text, avatar, gender, nickname } = res.context.currentContext;
          return {
            id, // id
            userCode, // 学号
            avatar, // 头像
            gender, // 性别
            nickname, // 用户昵称
            "account_status|1": getDictValues("D_AccountStatus"), // 账号状态
            "company_status|1": [0, 1], // 公司认证
            "school_status|1": [0, 1], // 学历认证
            "school_certificate_level|1": getDictValues("D_EducationType"), // 学历
            "single_type|1": getDictValues("D_MatrimonyStatus"), // 单身状态
            "school_name|1": allSchoolNames, // 学校
            "company_name|1": allCompanyName, // 公司
            "job_name|1": allJobName, // 职业
            "income_type_name|1": ["小于10w", "10~20w", "20~30w", "30~50w", "100w以上"], // 收入
            live_city: address.slice(0, 2), // 现居地
            live_city_text: address_text, // 现居地
            city: address.slice(0, 2), // 家乡
            city_text: address_text, // 家乡
          };
        },
      },
    ],
  });
  mockData.list = num > 1 ? mockData.list : [mockData.list];
  return mockData.list.map((item: CommonObj, ind: number) => {
    const { phone } = item;
    item.phone = String(phone);
    return item;
  });
}
/**
 * 创建角色列表数据
 * @param {string} num  生成数量
 * @param {object} defObj  模板默认值
 */
export function createRoleList() {
  const codes = getDictValues("D_RoleType");
  const num = codes.length;
  const mockData = Mock.mock({
    [`list|${num}`]: [
      {
        "id|+1": 1, //id递增
        role(res: CommonObj) {
          const { id } = res.context.currentContext;
          return codes[id - 1];
        }, //角色类型
        role_text: (res: CommonObj) => {
          const { role } = res.context.currentContext;
          return getDictLabel("D_RoleType", role);
        },
        "status|1": getDictValues("D_EnableStatus"), //启用状态
        //备注
        remark() {
          return Random.ctitle(3, 20);
        },
        //创建时间
        create_time() {
          return Random.datetime();
        },
        //更新时间
        update_time() {
          return Random.datetime();
        },
      },
    ],
  });
  mockData.list = num > 1 ? mockData.list : [mockData.list];
  return mockData.list;
}
