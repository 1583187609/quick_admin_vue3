import path from "path";
import { createTable, insertTable, deleteTable, updateTable, queryTable } from "./help/index.js";
import { N, upperFirst, writeFileSync } from "./utils/index.js";
import { getTableStandardFields } from "./help/create.js";
import { auditStatus, enableStatus } from "./config/fields/enums.js";

// 写入文件
function write(str = "", name = "") {
  const writePath = path.join(process.cwd(), "/scripts/db/temp.js");
  str = `const sql${upperFirst(name)}Str = \`${str}\``;
  writeFileSync(writePath, str);
}

// 生成创建表格的sql语句
function getCreateTableSql(tableName = "user", simpleFields = ["id", "userName"], insertRows = [["userName"], ["李大"]]) {
  const standardFields = getTableStandardFields(simpleFields);
  let sqlStr = "";
  const createSql = createTable(tableName, standardFields);
  sqlStr = `-- 创建${tableName}表${N}${createSql}`;
  if (insertRows?.length) {
    const insertSql = insertTable(tableName, insertRows, standardFields);
    sqlStr += `${N}${N}-- 插入${tableName}表${N}${insertSql}`;
  }
  // if (tableName === "user") {
  //   function getFrontStr(type = "处理") {
  //     return `${N}${N}-- ${type}${tableName}表${N}`;
  //   }
  //   /*** 插入表 ***/
  //   sqlStr +=
  //     getFrontStr("插入") +
  //     insertTable(
  //       tableName,
  //       [
  //         ["userName", "gender"],
  //         ["唐六", 1],
  //         ["程八", 2],
  //       ],
  //       standardFields
  //     );
  //   /*** 删除表 ***/
  //   sqlStr += getFrontStr("删除") + deleteTable(tableName, "id=5");
  //   sqlStr += getFrontStr("删除") + deleteTable(tableName, { id: 6, user_name: "李四", age: ">20" });
  //   /*** 修改表 ***/
  //   sqlStr += getFrontStr("修改") + updateTable(tableName, { gender: 2 }, { user_name: "李四" });
  //   /*** 查找表 ***/
  //   // 单表查询
  //   sqlStr += getFrontStr("查找") + queryTable({[tableName]: undefined}, { user_name: "李四", age: ">=20" });
  //   sqlStr += getFrontStr("查找") + queryTable({[tableName]: ['*']}, { user_name: ["李四", "张三"] });
  //   // 模糊查询
  //   sqlStr += getFrontStr("查找") + queryTable({[tableName]: ['*']}, { user_name|like: "%四%"}); // 名字中含有四
  //   // 正则表达式查询
  //   sqlStr += getFrontStr("查找") + queryTable({[tableName]: ['*']}, { user_name|regexp: "^李.+" }); // 姓李的
  //   // 取反查询
  //   sqlStr += getFrontStr("查找") + queryTable({[tableName]: ['*']}, [{ "user_name|not": ["李四", "张三"], "age|not": "=24" }, { user_name: "王五" }]);
  //   // 多表查询(order:默认 INNER 连接，log LEFT连接)
  //   sqlStr += getFrontStr("查找") +  queryTable({ user: ["id", "user_name", "nickname", "age"], order: ["user_id", "price", "amount"], "log|left": ["user_id"] }, { "user.age": ">20", "order.price": ">=20" });
  // }

  return sqlStr;
}

/**
 * 整个系统的所有表
 * @advice 数据库建议名称 Interview Surprise（轻松获取资料、轻松记忆、面试突袭）
 */
const tables = {
  // 字典表
  dictionary: {
    fields: [
      "id:字典id",
      // "shortText:name:字典名称(英文名称)",
      { type: "enum", name: "module", remark: "所属模块", enums: { 0: "模块0", 1: "模块1" } },
      "mediemText:data:字典数据", // JSON字符串
      "createTime",
      "creatorId",
      "updateTime",
      "updatorId",
      "enableStatus",
    ],
  },
  // 配置表
  config: {
    fields: [
      "id:配置id",
      // "shortText:name:配置名称(英文名称)",
      { type: "enum", name: "module", remark: "所属模块", enums: { 0: "模块0", 1: "模块1" } },
      "shortText:value:值", // 这项配置的值（一般对应着：0未启用 1已启用，或其他标识类英文字符）
      "createTime",
      "creatorId",
      "updateTime",
      "updatorId",
      "enableStatus", // 这项配置是否启用
    ],
  },
  // 用户表
  user: {
    fields: [
      "id:用户id",
      "phone",
      "password",
      "userName",
      "nickname",
      "gender",
      "age",
      "role", // 角色（管理员、会员、普通用户等）
      "amount:coin:金币余额",
      "commonTime:memberTime:会员到期时间",
      "createTime:注册时间",
      // "commonTime:destroyTime:注销时间",
      "accountStatus:账号状态",
    ],
    rows: [
      ["userName", "gender", "age"],
      ["李大", 1, 19],
      ["王二", 1, 54],
      ["张三", 1, 26],
      ["李四", 1, 44],
      ["王五", 1, 34],
      ["李梅", 1, 24],
    ],
  },
  // 行业分类表
  industry: {
    fields: [
      "id",
      "id:pId:父级id",
      { type: "shortText", name: "name", remark: "分类名称", length: 10 },
      "createTime",
      "creatorId",
      "updateTime",
      "updatorId",
      "enableStatus",
    ],
  },
  // 题目表
  topic: {
    fields: [
      "id:题目id",
      "id:industryId:所属行业id",
      {
        type: "question",
        notNull: true,
      },
      {
        type: "longText",
        name: "content",
        remark: "题目内容",
        notNull: true,
      },
      "creatorId",
      "createTime",
      "updatorId",
      "updateTime",
      "score",
      "auditStatus",
      "enableStatus",
    ],
  },
  // 笔记表（由题目组成）
  note: {
    fields: ["id:笔记id", "title", "ids:题目id", "creatorId", "createTime", "updatorId", "updateTime", "score", "enableStatus"],
  },
  // 文件表
  file: {
    fields: ["id:文件id", "url", "creatorId", "createTime", "score", "enableStatus"],
  },
  // 书籍表
  book: {
    fields: ["id:书籍id", "url", "creatorId", "createTime", "score", "enableStatus"],
  },
  // 订单表（购买金币、或会员）
  order: {
    fields: [
      "id:订单id",
      "id:userId:用户id",
      "id:setMealsId:套餐id",
      { type: "enum", name: "payType", remark: "支付方式（类型）", enums: { 1: "金币", 1: "人民币" }, defaultValue: 1 },
      "amount:套餐份数",
      "ratio:折扣率",
      "remark",
      "createTime",
    ],
  },
  // 算价（订单价格）
  order_price: {
    fields: ["id:orderId:订单id", "price:originPrice:应付", "price:realPrice:实付"],
  },
  // 商品套餐表（金币、会员、文档资料）
  setMeals: {
    fields: [
      "id:套餐id",
      { type: "enum", name: "type", remark: "商品类型", enums: { 1: "金币", 2: "会员", 3: "文档资料" } },
      // "shortText:content:套餐描述",
      "price",
      "amount", // 金币数量（个） 会员时长（天）、文档资料（份）
      "createTime",
      "creatorId",
      "updateTime",
      "updatorId",
      "enableStatus",
    ],
  },
  // 任务表
  task: {
    fields: [
      "id:任务id",
      { type: "enum", name: "taskType", remark: "任务类型", enums: { 1: "签到", 2: "邀请好友", 3: "贡献题目" } },
      "shortText:content:任务内容",
      { type: "enum", name: "rewardType", remark: "奖励类型", enums: { 1: "金币" } },
      "amount:奖励数量",
      "createTime",
      "enableStatus",
    ],
  },
  // 收藏表：题目、文章、文件（pdf）、书籍
  collect_topics: {
    fields: [
      "id:收藏题目id或文章id或资料id",
      { type: "enum", name: "type", remark: "收藏类型", enums: { 1: "题目", 2: "文章", 3: "文件", 4: "书籍" } },
      "createTime:收藏时间",
      "creatorId:收藏人",
      "updateTime",
      "updatorId",
      "shortText:question:改动覆盖问题",
      "longText:content:改动覆盖内容",
    ],
  },
  // 程度表：新鲜程度 出现频率 重要程度 掌握程度 回看意愿
  level: {
    fields: [
      "id:collectId:收藏id",
      { type: "enum", name: "fresh", remark: "新鲜程度", enums: getLevelEnums(["老", "新"]) },
      { type: "enum", name: "frequency", remark: "出现频率", enums: getLevelEnums(["低", "高"]) },
      { type: "enum", name: "important", remark: "重要程度", enums: getLevelEnums(["轻", "重"]) },
      { type: "enum", name: "memory", remark: "记忆程度", enums: getLevelEnums(["模糊", "牢固"]) },
      { type: "enum", name: "score", remark: "得分情况", enums: getLevelEnums(["低", "高"]) },
      { type: "enum", name: "intention", remark: "回看意愿", enums: getLevelEnums(["弱", "强"]) },
    ],
  },
  // 粉丝表
  // fans: {},
  // // 地区表（省市区级联）
  // region: {
  //   fields: [
  //     "id",
  //     "id:pId:父级id",
  //     { type: "shortText", name: "name", remark: "名称", length: 10 },
  //     "createTime",
  //     "creatorId",
  //     "updateTime",
  //     "updatorId",
  //   ],
  // },
  // 日志表
  log: {
    fields: [
      "id:日志id",
      "enum:business:业务类型",
      "enum:operateType:操作类型",
      "creatorId:operatorId:操作人id",
      "createTime:operateTime:操作时间",
    ],
  },
};

// 创建所有的表
export function createTables() {
  let sqlStr = `${N}`;
  // 创建表、插入初始数据
  Object.keys(tables).forEach((tableName, ind) => {
    const { fields, rows = [] } = tables[tableName];
    const str = getCreateTableSql(tableName, fields, rows);
    sqlStr += `${str}${N}${N}`;
  });
  write(sqlStr);
}
createTables();

// tabs 栏目
const tabs = [
  {
    label: "首页",
    value: "home",
  },
  {
    label: "动态",
    value: "home",
  },
  {
    label: "发现",
    value: "found",
    children: [
      { label: "综合", value: "1" },
      { label: "题目", value: "2" },
      { label: "文章", value: "3" },
    ],
  },
  {
    label: "资料",
    value: "info",
  },
  {
    label: "我的",
    value: "mine",
  },
];
