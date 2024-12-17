import allAddress from "#/mock/data/address";
import { getCascadeLabel, getDictValues, getDictLabel } from "#/mock/dict";
import { CommonObj } from "@/core/_types";
import { getRandomLimitDate, needParam, typeOf } from "#/mock/utils";
import defaultMockTpls from "../tpls";
import Mock from "mockjs";
import { getBasePath } from "#/mock/_platform/_utils";
import _ from "lodash";

const { merge, upperFirst, snakeCase } = _;
const { Random } = Mock;

// 扩展 mock 能力
Random.extend({
  // 获取限定了区间的随机时间（创建时间、修改时间）
  limitDate: getRandomLimitDate,
  // 手机号码
  phone(pre = "135") {
    const reg = new RegExp(`\\d{${11 - pre.length}}`);
    return pre + Mock.mock(reg);
  },
  // // 获取字典值
  // dictValue(name = needParam()) {
  //   return Random.pick(getDictValues(name));
  // },
  // // 获取字典文本
  // dictLabel(name = needParam(), code = needParam()) {
  //   return getDictLabel(name, code);
  // },
  // 获取级联的ids
  cascaderValues(name = needParam(), level) {
    const cascaderMap = {
      Region: allAddress,
    };
    let ids: number[] = [];
    const cascaderOpts = cascaderMap[name];
    if (!cascaderOpts) throw new Error(`不存在该级联：${name}`);
    const arrAreas = cascaderOpts?.map((pItem, pInd) => {
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
    ids = [cascaderOpts[pInd].id, cascaderOpts[pInd].city[cInd].id, cascaderOpts[pInd].city[cInd].area[aInd].id];
    if (!level) return ids;
    return ids.slice(0, level);
  },
  // id(step) {
  //   return Random.increment(step);
  // },
  // 生成创建时间、更新时间
  createUpdateTime(min, max, format) {
    const createTime: string = Random.limitDate(min, max, format);
    const updateTime: string = Random.limitDate(createTime, max, format);
    return [createTime, updateTime];
  },
  /**
   * 生成头像
   * @param {0|1|2} gender 性别 0未知 1男 2女
   * @param {number} maxNum  跟性别头像的最大下标值保持一致
   * @returns
   */
  avatar(gender, maxNum = 6) {
    if (gender === 0) return "";
    const max = maxNum + 1;
    const ind = Math.floor(Math.random() * max);
    const genderMap = { 1: "boy", 2: "girl" };
    return `${getBasePath()}/static/imgs/${genderMap[gender]}-${ind}.jpg`;
  },
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

const map = {
  // 布尔相关
  boolean: {
    names: ["boolean"],
    fn(attrs) {
      const { min = 1, max = 1, current = true } = attrs; // min 的概率为 current，max的概率为 !current
      return () => Random.boolean(min, max, current);
    },
  },
  number: {
    names: ["natural", "integer", "float"],
    fn(attrs) {
      const { typeKey = "integer", min, max, dmin, dmax } = attrs;
      const args = [min, max];
      if (typeKey === "float") args.push(dmin, dmax);
      return () => Random[typeKey](...args);
    },
  },
  // 字符串相关
  string: {
    names: [],
  },
  // 数组相关
  array: {
    names: [],
  },
  // 日期相关
  date: {
    names: [],
  },
  // 图片相关
  image: {
    names: [],
  },
};

/**
 * 添加mock配置
 * @param {object} rule mock规则
 * @param {object} cfg 配置信息
 * @notice cfg[`${prop}|+1`] = Random.boolean(); // () = > Random.boolean() 写函数，列表每项的值就会不一样，否则就会一样
 * @returns {object}
 */
function addMockConfig(rule: CommonObj, cfg: CommonObj = {}, textKey = "text") {
  const { type, prop, remark, attrs } = rule;
  if (cfg[prop] !== undefined) throw new Error(`已添加过属性：${prop}`);
  /****** 布尔相关 ******/
  if (type === "boolean") {
    const { typeKey = "boolean", min = 1, max = 1, current = true } = attrs; // min 的概率为 current，max的概率为 !current
    const keys = ["boolean"];
    if (!keys.includes(typeKey)) throw new Error(`${type}仅支持类型：${keys.join(", ")}，当前为：${typeKey}`);
    cfg[prop] = () => Random[typeKey](min, max, current);
    return cfg;
  }
  /****** 数字相关 ******/
  if (type === "number") {
    // typeKey 可选值： natural(自然数，大于等于 0 的整数), integer(整数，最小： -9007199254740992，最大：9007199254740992), float(浮点数)
    // min 整数部分的最小值。默认值为 -9007199254740992。
    // max 整数部分的最大值。默认值为 9007199254740992。
    // dmin 小数部分位数的最小值。默认值为 0。
    // dmax 小数部分位数的最大值。默认值为 17。
    const { typeKey = "integer", min, max, dmin, dmax } = attrs;
    const keys = ["natural", "integer", "float"];
    if (!keys.includes(typeKey)) throw new Error(`${type}仅支持类型：${keys.join(", ")}，当前为：${typeKey}`);
    const args = [min, max];
    if (typeKey === "float") args.push(dmin, dmax);
    cfg[prop] = () => Random[typeKey](...args);
    return cfg;
  }
  /****** 字符串相关 ******/
  if (type === "string") {
    // typeKey 可选值： string(n个字符，默认为1), character(一个字符), paragraph(一段英文文本),cparagraph(一段中文文本),sentence(一个英文句子),csentence(一个中文句子),word(英文单词),cword(中文单词),title(英文标题),ctitle(中文标题)
    // pool 字符池，将从中选择一个字符返回。poool内置：'lower'、'upper'、'number'、'symbol' { lower: "abcdefghijklmnopqrstuvwxyz", upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", number: "0123456789", symbol: "!@#$%^&*()[]" }
    const { typeKey = "title", pool, min, max } = attrs;
    const keys = ["string", "character", "paragraph", "cparagraph", "sentence", "csentence", "word", "cword", "title", "ctitle"];
    if (!keys.includes(typeKey)) throw new Error(`${type}仅支持类型：${keys.join(", ")}，当前为：${typeKey}`);
    const args = typeKey === "character" ? [pool] : [min, max];
    if (["cword", "string"].includes(typeKey)) args.unshift(pool);
    cfg[prop] = () => Random[typeKey](...args);
    return cfg;
  }
  /****** 数组相关 ******/
  if (type === "array") {
    // typeKey 可选值： range(整型数组), shuffle(打乱数组中元素的顺序)
    // start 数组中整数的起始值
    // stop 数组中整数的结束值（不包含在返回值中）
    // step 数组中整数之间的步长。默认值为 1。
    const { typeKey = "range", start, stop, step, arr = typeKey === "shuffle" ? needParam() : undefined } = attrs;
    const keys = ["range", "shuffle"];
    if (!keys.includes(typeKey)) throw new Error(`${type}仅支持类型：${keys.join(", ")}，当前为：${typeKey}`);
    const argsMap = {
      range: [start, stop, step],
      shuffle: [arr],
    };
    cfg[prop] = () => Random[typeKey](...argsMap[typeKey]);
    return cfg;
  }
  /****** 日期相关 ******/
  if (type === "date") {
    // typeKey 可选值： date(日期), time(时间), datetime(日期和时间), now(当前的日期和时间), limitDate(指定了最大最小范围的日期区间)
    // 例：2002-10-23, 79-02-14；00:14:47, 3:5:13；1977-11-17 03:50:15, 02-4-23 2:49:40；1977-11-17 03:50:15, 02-4-23 2:49:40
    let { typeKey = "date" } = attrs;
    const { min, max, unit, format } = attrs;
    if (min !== undefined || max !== undefined) typeKey = "limitDate";
    const keys = ["date", "time", "datetime", "now", "limitDate"];
    if (!keys.includes(typeKey)) throw new Error(`${type}仅支持类型：${keys.join(", ")}，当前为：${typeKey}`);
    const args = [format];
    if (typeKey === "now") args.unshift(unit);
    if (typeKey === "limitDate") args.unshift(min, max);
    cfg[prop] = () => Random[typeKey](...args);
    return cfg;
  }
  /****** 图片相关 ******/
  if (type === "image") {
    // typeKey 可选值：image(图片地址), dataImage(Base64 图片编码), avatar(头像地址)
    // size 图片宽高，默认从下面选一个：['300x250', '250x250', '240x400', '336x280', '180x150', '720x300', '468x60', '234x60', '88x31', '120x90', '120x60', '120x240', '125x125', '728x90', '160x600', '120x600', '300x600']
    // background 图片的背景色。默认值为 '#000000'
    // foreground 图片的前景色（文字）。默认值为 '#FFFFFF'
    // format 默认值为 'png'，可选值包括：'png'、'gif'、'jpg'
    // text 图片上的文字。默认值为参数 size
    // gender 性别
    const { typeKey = "image", size, background, foreground, format, text, gender } = attrs;
    const keys = ["image", "dataImage", "avatar"];
    if (!keys.includes(typeKey)) throw new Error(`${type}仅支持类型：${keys.join(", ")}，当前为：${typeKey}`);
    const argsMap = {
      image: [size, background, foreground, format, text],
      dataImage: [size, text],
      avatar: [gender],
    };
    cfg[prop] = () => Random[typeKey](...argsMap[typeKey]);
    return cfg;
  }
  /****** 颜色相关 ******/
  if (type === "color") {
    // typeKey 可选值： color('#RRGGBB'), hex('#RRGGBB'), rgb('rgb(r, g, b)'), rgba(rgba(r, g, b, a)'), hsl('hsl(h, s, l)')
    const { typeKey = "color" } = attrs;
    const keys = ["color", "hex", "rgb", "rgba", "hsl"];
    if (!keys.includes(typeKey)) throw new Error(`${type}仅支持类型：${keys.join(", ")}，当前为：${typeKey}`);
    cfg[prop] = () => Random[typeKey]();
    return cfg;
  }
  /****** 姓名相关 ******/
  if (type === "name") {
    // typeKey 可选值： first(英文名), last(英文姓), name(英文姓名), cfirst(中文名), clast(英文姓), cname(中文姓名)
    // middle 布尔值。指示是否生成中间名。
    const { typeKey = "cname", middle = Math.random() < 0.5 } = attrs;
    const keys = ["first", "last", "name", "cfirst", "clast", "cname"];
    if (!keys.includes(typeKey)) throw new Error(`${type}仅支持类型：${keys.join(", ")}，当前为：${typeKey}`);
    cfg[prop] = () => Random[typeKey](middle);
    return cfg;
  }
  /****** Web相关 ******/
  if (type === "web") {
    // typeKey 可选值： url(URL), protocol(URL协议), domain(域名), tld(顶级域名), email(邮件地址), ip(IP 地址)
    const { typeKey = "url", protocol, host, domain } = attrs;
    const keys = ["url", "protocol", "domain", "tld", "email", "ip"];
    if (!keys.includes(typeKey)) throw new Error(`${type}仅支持类型：${keys.join(", ")}，当前为：${typeKey}`);
    const argsMap = { url: [protocol, host], email: [domain] };
    cfg[prop] = () => Random[typeKey](...argsMap[typeKey]);
    return cfg;
  }
  /****** 地址相关 ******/
  if (type === "address") {
    // typeKey 可选值： region(大区), province(直辖市、自治区、特别行政区), city(市), county(县), zip(邮政编码，六位数字)
    // prefix 布尔值。指示是否生成所属的省、市
    const { typeKey = "county", prefix } = attrs;
    const keys = ["region", "province", "city", "county", "zip"];
    if (!keys.includes(typeKey)) throw new Error(`${type}仅支持类型：${keys.join(", ")}，当前为：${typeKey}`);
    const argsMap = { city: [prefix], county: [prefix] };
    cfg[prop] = () => Random[typeKey](...argsMap[typeKey]);
    return cfg;
  }
  /****** 常用相关（杂项Miscellaneous） ******/
  if (type === "common") {
    // typeKey 可选值： guid(uuid), id(18 位身份证), increment(全局的自增整数)
    const { typeKey = "guid", step } = attrs;
    const keys = ["guid", "id", "increment"];
    if (!keys.includes(typeKey)) throw new Error(`${type}仅支持类型：${keys.join(", ")}，当前为：${typeKey}`);
    const argsMap = { increment: [step] };
    cfg[prop] = () => Random[typeKey](...argsMap[typeKey]);
    return cfg;
  }
  /****** 帮助相关 ******/
  if (type === "helper") {
    // typeKey 可选值： capitalize(第一个字母转换为大写), upper(把字符串转换为大写), lower(把字符串转换为小写), pick(从数组中随机选取一个元素)
    const { typeKey = "pick", arr, str } = attrs;
    const keys = ["capitalize", "upper", "lower", "pick"];
    if (!keys.includes(typeKey)) throw new Error(`${type}仅支持类型：${keys.join(", ")}，当前为：${typeKey}`);
    const argsMap = { capitalize: [str], upper: [str], lower: [str], pick: [arr] };
    cfg[prop] = () => Random[typeKey](...argsMap[typeKey]);
    return cfg;
  }
  /****** 扩展相关 ******/
  // // 自增 id，min是起始id值
  // // 可考虑用Random.increment() 来优化。increment为全局的自增整数
  // if (type === "id") {
  //   const { min = 1 } = attrs;
  //   cfg[`${prop}|+1`] = min;
  //   return cfg;
  // }
  // // 电话号码
  // if (type === "phone") {
  //   const { pre = "135" } = attrs;
  //   cfg[prop] = createPhone(pre);
  //   return cfg;
  // }
  // // 枚举类
  // if (type === "enum") {
  //   const { enums = [] } = attrs;
  //   cfg[`${prop}|+1`] = enums;
  //   return cfg;
  // }
  // // 字典类
  // if (type === "dict") {
  //   const { name, withText = true } = attrs;
  //   cfg[`${prop}|+1`] = getDictValues(name);
  //   if (withText) {
  //     cfg[`${prop}_text`] = (res: CommonObj) => {
  //       const code = res.context.currentContext[prop];
  //       return getDictLabel(name, code);
  //     };
  //   }
  //   return cfg;
  // }
  // // 级联 level: 3表示返回共3级
  // if (type === "cascader") {
  //   const { name = needParam(), withText = true, level } = attrs;
  //   cfg[prop] = () => {
  //     let ids: number[] = [];
  //     if (name === "Region") {
  //       const arrAreas = allAddress?.map((pItem, pInd) => {
  //         const cloneCity = pItem.city?.map((cItem, cInd) => {
  //           const cloneArea = cItem.area?.map((aItem, aInd) => {
  //             return aItem.id;
  //           });
  //           return cloneArea;
  //         });
  //         return cloneCity;
  //       });
  //       const pInd = Math.floor(Math.random() * arrAreas.length);
  //       const cInd = Math.floor(Math.random() * arrAreas[pInd].length);
  //       const aInd = Math.floor(Math.random() * arrAreas[pInd][cInd].length);
  //       ids = [allAddress[pInd].id, allAddress[pInd].city[cInd].id, allAddress[pInd].city[cInd].area[aInd].id];
  //     } else {
  //       throw new Error(`暂未处理此级联：${name}`);
  //     }
  //     return ids.slice(0, level);
  //   };
  //   if (withText) {
  //     cfg[`${prop}_text`] = (res: CommonObj) => {
  //       const codes = res.context.currentContext[prop];
  //       return getCascadeLabel(name, codes);
  //     };
  //   }
  //   return cfg;
  // }
  // // 一起生成创建时间、更新时间
  // if (type === "createUpdateTime") {
  //   const [createTimeProp = needParam(), updateTimeProp = needParam()] = prop;
  //   const { min, max, format } = attrs;
  //   let createDate = "";
  //   cfg[createTimeProp] = () => {
  //     createDate = Random.limitDate(min, max, format);
  //     return createDate;
  //   };
  //   cfg[updateTimeProp] = () => Random.limitDate(createDate, max, format);
  // }
  // 自增 id，min是起始id值
  // 可考虑用Random.increment() 来优化。increment为全局的自增整数
  if (type === "id") {
    const { step } = attrs;
    cfg[prop] = () => Random.increment(step);
    return cfg;
  }
  // 电话号码
  if (type === "phone") {
    const { pre } = attrs;
    cfg[prop] = () => Random.phone(pre);
    return cfg;
  }
  // 字典类
  if (type === "dict") {
    const { name = needParam(), withText = true } = attrs;
    cfg[prop] = () => Random.pick(getDictValues(name));
    if (withText) cfg[`${prop}_${textKey}`] = (res: CommonObj) => getDictLabel(name, res.context.currentContext[prop]);
    return cfg;
  }
  // 级联 level: 3表示返回共3级
  if (type === "cascader") {
    const { name = needParam(), withText = true, level } = attrs;
    cfg[prop] = () => Random.cascaderValues(name, level);
    if (withText) cfg[`${prop}_${textKey}`] = (res: CommonObj) => getCascadeLabel(name, res.context.currentContext[prop]);
    return cfg;
  }
  // 一起生成创建时间、更新时间
  if (type === "createUpdateTime") {
    const [createTime, updateTime] = () => Random.createUpdateTime(min, max, format);
    const [createTimeProp = needParam(), updateTimeProp = needParam()] = prop;
    const { min, max, format } = attrs;
    cfg[createTimeProp] = createTime;
    cfg[updateTimeProp] = updateTime;
    return cfg;
  }
  // 自定义
  if (type === "custom") return merge(cfg, attrs);
  throw new Error(`暂未处理此类型：${type}`);
}

/**
 * 获取mock列表
 * @param {(string|object)[]} rules mock规则，例："id", { tpl: "enableStatus" }
 * @param {number} num 要生成的条数
 * @returns {object[]}
 */
export function getMockList(rules: (CommonObj | string)[] = [], num = 9): CommonObj {
  const config: CommonObj = {};
  rules.forEach((simpleRule: CommonObj | string) => addMockConfig(getStandardRule(simpleRule), config));
  const mockData = Mock.mock({
    [`list|${num}`]: [config],
  });
  mockData.list = num > 1 ? mockData.list : [mockData.list];
  return mockData.list;
}
