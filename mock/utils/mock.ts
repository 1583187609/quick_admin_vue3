import allAddress from "../data/address";
import { getCascadeLabel, getDictValues, getDictLabel } from "../dict";
import { createPhone } from "../create";
import { CommonObj } from "@/core/_types";
import { getRandomDate, typeOf } from "./base";
import Mock from "mockjs";
import _ from "lodash";
import { needParam } from "@/utils";

const { merge, upperFirst, snakeCase } = _;
const { Random } = Mock;

// 创建 Mock.js 方法来生成数据
Mock.Random.extend({
  randomDate: getRandomDate, // 获取随机时间（创建时间、修改时间）
});

/**
 * 生成mock配置
 * @param {object} rules
 * @returns
 */
// 默认值，也作为示例值
const defaultRules: CommonObj = {
  id: { min: 1 }, //id递增，min是起始地址值
  enum: { name: "D_EnableStatus", withText: true, prop: "status" }, //枚举值
  // // 若为数组，则会生成两个
  // enum: [
  //   { name: "D_EnableStatus", prop: "status" },
  //   { name: "D_Gender", prop: "gender" },
  // ],
  phone: { pre: "135" }, //电话号码
  cascader: { name: "Region", withText: true, level: 3, prop: "address" }, //级联：(level: 3表示返回共3级)
  remark: { minLength: 5, maxLength: 20 }, //备注
  integer: { min: 1, max: 30, prop: "age" }, //随机整数
  earlyDate: {
    min: 60 * 60 * 24 * 365 * 18,
    max: 60 * 60 * 24 * 365 * 30,
    prop: "birthday",
  },
  //创建、修改时间
  createUpdateTime: {
    createTimeProp: "create_time",
    updateTimeProp: "update_time",
  },
  // // 此处用作自定义示例
  //  custom: {
  //    real_name: () => Random.cname(), //姓名
  //  },
};
export function getMockCfg(rules: CommonObj): CommonObj {
  const cfg: CommonObj = {};
  for (const key in rules) {
    const _rule = rules[key];
    const t = typeOf(_rule);
    const records: CommonObj[] = [];
    if (t === "Null" || t === "Object") {
      records.push(Object.assign({ prop: key }, defaultRules[key], _rule));
    } else if (t === "Array") {
      records.push(..._rule?.map((it: CommonObj) => Object.assign({ prop: key }, defaultRules[key], it)));
    } else {
      throw new Error(`不支持参数类型${t}`);
    }
    const type = key;
    records.forEach((rule: CommonObj, ind) => {
      const { prop } = rule;
      if (type === "id") {
        const { min } = rule;
        cfg[`${prop}|+1`] = min;
      } else if (type === "enum") {
        const { name, withText } = rule;
        cfg[`${prop}|+1`] = getDictValues(name);
        if (withText) {
          cfg[`${prop}_text`] = (res: CommonObj) => {
            const code = res.context.currentContext[prop];
            return getDictLabel(name, code);
          };
        }
      } else if (type === "phone") {
        const { prefix } = rule;
        cfg[prop] = createPhone(prefix);
      } else if (type === "cascader") {
        const { name, withText, level } = rule;
        // cfg.address = () => Random.city(true); //地址
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
          }
          return ids.slice(0, level);
        };
        if (withText) {
          cfg[`${prop}_text`] = (res: CommonObj) => {
            const codes = res.context.currentContext[prop];
            return getCascadeLabel("Region", codes);
          };
        }
      } else if (type === "remark") {
        const { minLength, maxLength } = rule;
        cfg[prop] = () => Random.ctitle(minLength, maxLength);
      } else if (type === "integer") {
        const { min, max } = rule;
        cfg[prop] = () => Mock.Random.integer(min, max);
      } else if (type === "createUpdateTime") {
        // 一并生成创建时间、更新时间
        const { createTimeProp, updateTimeProp } = rule;
        let createDate = "";
        if (createTimeProp)
          cfg[createTimeProp] = () => {
            createDate = Mock.Random.randomDate();
            return createDate;
          };
        if (updateTimeProp) cfg[updateTimeProp] = () => Mock.Random.randomDate(createDate);
      } else if (type === "earlyDate") {
        const { min, max } = rule;
        cfg[prop] = () => Mock.Random.randomDate(min, max, "YYYY-MM-DD");
      } else if (type === "custom") {
        Object.assign(cfg, rule);
      } else {
        throw new Error(`暂未处理此类型：${type}`);
      }
    });
  }
  return cfg;
}

// mock模板
// 示例
// T_Example: {
//   type: "int",
//   remark: "id",
//   length: undefined,
//   decimal: undefined,
//   notNull: undefined,
//   isPrimaryKey: undefined,
//   defaultValue: undefined,
//   isAutoIncrement: undefined,
//   isUnsigned: undefined,
//   isFillZero: undefined,
//   enum: undefined,
//   joinChar: undefined, // 默认','
// },
export const defaultMockTpls = {
  T_Id: {
    type: "id",
    // prop: "id", // 省略不写，则跟模板名称的下划线命名保持一致
    remark: "自增id",
    attrs: {
      min: 1,
    },
  },
  T_EnableStatus: {
    type: "enum",
    remark: "启用状态",
    attrs: {
      enum: { 0: "禁用", 1: "启用" },
    },
  },
  T_Age: {
    type: "integer",
    remark: "年龄",
    attrs: {
      min: 1,
      max: 30,
    },
  },
  T_Birthday: {
    type: "date",
    remark: "出生日期",
    attrs: {
      min: "-40y",
    },
  },
  T_CreateTime: {
    type: "date",
    remark: "创建时间",
    attrs: {
      min: "-1y",
      max: "-1M",
    },
  },
  T_UpdateTime: {
    type: "date",
    remark: "更新时间",
    attrs: {
      min: "-1M",
    },
  },
  T_Remark: {
    type: "ctitle",
    remark: "备注",
    attrs: {
      minLength: 5,
      maxLength: 20,
    },
  },
  T_UserName: {
    type: "cname",
    remark: "姓名（中文）",
    attrs: {},
  },
  T_Phone: {
    type: "phone",
    remark: "电话号码",
    attrs: {
      pre: "135", // 电话号码前缀
    },
  },
  T_Region: {
    type: "cascader",
    remark: "行政地址",
    attrs: {
      name: "Region",
    },
  },
  T_City: {
    type: "city",
    remark: "城市",
    attrs: {},
  },
};

/**
 * 获取标准的模板名称
 * @param {stirng} tpl  简写模板名称
 * @returns {string}
 */
function getTplName(tpl: string) {
  if (!tpl) throw new Error(`模板名称不能为空`);
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
  const info: CommonObj = {};
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
      [tpl, prop = snakeCase(tpl), remark] = list;
      Tpl = getTplName(tpl as unknown as string);
    } else {
      throw new Error(`暂未处理超出三段的类型`);
    }
    merge(info, defaultMockTpls[Tpl], { tpl: Tpl, prop, remark });
  } else if (t === "Object") {
    const { tpl, ...rest } = simple as CommonObj;
    const Tpl = getTplName(tpl);
    merge(info, defaultMockTpls[Tpl], rest, { tpl: Tpl });
  } else {
    throw new Error(`暂未处理此类型：${t}`);
  }
  return info;
}

function getCfg(rule: CommonObj, cfg: CommonObj = {}) {
  const { type, prop, remark, attrs } = rule;
  if (cfg[prop] !== undefined) throw new Error(`已添加过属性：${prop}`);
  // 自增 id
  if (type === "id") {
    const { min } = attrs;
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
  // 电话号码
  if (type === "phone") {
    const { prefix = needParam() } = attrs;
    cfg[prop] = createPhone(prefix);
    return cfg;
  }
  // 城市
  if (type === "city") {
    cfg[prop] = () => Random.city(true);
    return cfg;
  }
  // 级联
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
        return getCascadeLabel("Region", codes);
      };
    }
    return cfg;
  }
  // 备注、文本类
  if (type === "ctitle") {
    const { minLength, maxLength } = attrs;
    cfg[prop] = () => Random.ctitle(minLength, maxLength);
    return cfg;
  }
  // 年龄类
  if (type === "integer") {
    const { min, max } = attrs;
    cfg[prop] = () => Mock.Random.integer(min, max);
    return cfg;
  }
  // 日期类
  if (type === "date") {
    const { min, max } = attrs;
    cfg[prop] = () => Mock.Random.randomDate(min, max, "YYYY-MM-DD");
    return cfg;
  }
  // 自定义
  if (type === "custom") return Object.assign(cfg, attrs);
  throw new Error(`暂未处理此类型：${type}`);
}

export function getMockData(rules: (CommonObj | string)[] = ["id", { tpl: "enableStatus" }]): CommonObj {
  const cfg: CommonObj = {};
  rules.forEach((simpleRule: CommonObj | string) => getCfg(getStandardRule(simpleRule), cfg));
  return cfg;
}
