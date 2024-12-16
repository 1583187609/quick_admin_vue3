import allAddress from "#/mock/data/address";
import { getCascadeLabel, getDictValues, getDictLabel } from "#/mock/dict";
import { createPhone } from "#/mock/create";
import { CommonObj } from "@/core/_types";
import { getAvatarUrl, getRandomDate, needParam, typeOf } from "#/mock/utils";
import defaultMockTpls from "../tpls";
import Mock from "mockjs";
import _ from "lodash";

const { merge, upperFirst, snakeCase } = _;
const { Random } = Mock;

Mock.Random.extend({
  randomDate: getRandomDate, // 获取随机时间（创建时间、修改时间）
});

/**
 * 获取标准的模板名称
 * @param {string} tpl  简写模板名称
 * @returns {string}
 */
function getTplName(tpl: string) {
  if (!tpl) return "";
  if (tpl.charAt(0) === "T") throw new Error(`不能以T开头`);
  return `T_${upperFirst(tpl)}`;
}

/**
 * 获取标准的规则
 * @param simple 简单的规则
 * @returns {object} 标准的规则
 */
function getStandardRule(simple: string | CommonObj) {
  if (!simple) throw new Error(`不允许为空`);
  const t = typeOf(simple);
  let info: CommonObj = {};
  if (t === "String") {
    const list = simple.split(":");
    let [tpl, prop, remark] = [undefined, undefined, undefined];
    let Tpl;
    if (list.length === 1) {
      [tpl] = list;
      Tpl = getTplName(tpl as unknown as string);
    } else if (list.length === 2) {
      [tpl, remark] = list;
      Tpl = getTplName(tpl as unknown as string);
    } else if (list.length === 3) {
      [tpl, prop, remark] = list;
      Tpl = getTplName(tpl as unknown as string);
    } else {
      throw new Error(`暂未处理超出三段的类型`);
    }
    info = merge({ prop: snakeCase(tpl), remark: Tpl }, defaultMockTpls[Tpl], { prop, remark }); // { tpl: Tpl }
  } else if (t === "Object") {
    const { tpl = "", type = needParam(), prop = snakeCase(tpl), ...rest } = simple as CommonObj;
    if (type !== "custom" && !tpl && !prop) throw new Error(`不能同时tpl和prop未设置`);
    const Tpl = getTplName(tpl);
    info = merge({ prop, type }, defaultMockTpls[Tpl], rest); // { tpl: Tpl }
  } else {
    throw new Error(`暂未处理此类型：${t}`);
  }
  return info;
}

function addMockConfig(rule: CommonObj, cfg: CommonObj = {}) {
  const { type, prop, remark, attrs } = rule;
  if (cfg[prop] !== undefined) throw new Error(`已添加过属性：${prop}`);
  // 自增 id，min是起始id值
  if (type === "id") {
    const { min = 1 } = attrs;
    cfg[`${prop}|+1`] = min;
    return cfg;
  }
  // 枚举类
  if (type === "enum") {
    const { name, withText = true } = attrs;
    cfg[`${prop}|+1`] = getDictValues(name);
    if (withText) {
      cfg[`${prop}_text`] = (res: CommonObj) => {
        const code = res.context.currentContext[prop];
        return getDictLabel(name, code);
      };
    }
    return cfg;
  }
  // 头像图片地址
  if (type === "avatar") {
    const { genderKey = "gender" } = attrs;
    cfg[prop] = (res: CommonObj) => {
      const data = res.context.currentContext;
      const gender = data[genderKey];
      return getAvatarUrl(gender);
    };
    return cfg;
  }
  // 电话号码
  if (type === "phone") {
    const { pre = "135" } = attrs;
    cfg[prop] = createPhone(pre);
    return cfg;
  }
  // 城市
  if (type === "city") {
    cfg[prop] = () => Random.city(true);
    return cfg;
  }
  // 级联 level: 3表示返回共3级
  if (type === "cascader") {
    const { name = needParam(), withText = true, level } = attrs;
    cfg[prop] = () => {
      let ids: number[] = [];
      if (name === "Region") {
        const arrAreas = allAddress?.map((pItem, pInd) => {
          const cloneCity = pItem.city?.map((cItem, cInd) => {
            const cloneArea = cItem.area?.map((aItem, aInd) => {
              return aItem.id;
            });
            return cloneArea;
          });
          return cloneCity;
        });
        const pInd = Math.floor(Math.random() * arrAreas.length);
        const cInd = Math.floor(Math.random() * arrAreas[pInd].length);
        const aInd = Math.floor(Math.random() * arrAreas[pInd][cInd].length);
        ids = [allAddress[pInd].id, allAddress[pInd].city[cInd].id, allAddress[pInd].city[cInd].area[aInd].id];
      } else {
        throw new Error(`暂未处理此级联：${name}`);
      }
      return ids.slice(0, level);
    };
    if (withText) {
      cfg[`${prop}_text`] = (res: CommonObj) => {
        const codes = res.context.currentContext[prop];
        return getCascadeLabel(name, codes);
      };
    }
    return cfg;
  }
  // 文本类（备注、标题）
  if (type === "ctitle") {
    const { min = 5, max = 20 } = attrs;
    cfg[prop] = () => Random.ctitle(min, max);
    return cfg;
  }
  // 中文文字
  if (type === "cword") {
    const { words = needParam(), min = 1, max = 5 } = attrs;
    cfg[prop] = () => Random.cword(words, min, max);
    return cfg;
  }
  // 用户姓名（中文）
  if (type === "cname") {
    // const {} = attrs;
    cfg[prop] = () => Random.cname();
    return cfg;
  }
  // 数字类（年龄、身高等）
  if (type === "integer") {
    const { min, max } = attrs;
    cfg[prop] = () => Mock.Random.integer(min, max); // 写函数，值就会不一样，否则就会一样
    return cfg;
  }
  // natural
  if (type === "natural") {
    const { min, max } = attrs;
    cfg[prop] = () => Mock.Random.natural(min, max); // 写函数，值就会不一样，否则就会一样
    return cfg;
  }
  // 日期类（创建时间、更新时间）
  if (type === "date") {
    const { min, max, format } = attrs;
    cfg[prop] = () => Mock.Random.randomDate(min, max, format);
    return cfg;
  }
  // 一起生成创建时间、更新时间
  if (type === "createUpdateTime") {
    const [createTimeProp = needParam(), updateTimeProp = needParam()] = prop;
    const { min, max, format } = attrs;
    let createDate = "";
    cfg[createTimeProp] = () => {
      createDate = Mock.Random.randomDate(min, max, format);
      return createDate;
    };
    cfg[updateTimeProp] = () => Mock.Random.randomDate(createDate, max, format);
  }
  // 自定义
  if (type === "custom") {
    // return merge(cfg, attrs);
    for (const key in attrs) {
      cfg[key] = attrs[key];
    }
    return cfg;
  }
  throw new Error(`暂未处理此类型：${type}`);
}

export function getMockConfig(rules: (CommonObj | string)[] = ["id", { tpl: "enableStatus" }]): CommonObj {
  const cfg: CommonObj = {};
  rules.forEach((simpleRule: CommonObj | string) => addMockConfig(getStandardRule(simpleRule), cfg));
  return cfg;
}
