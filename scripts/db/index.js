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
  //   // 插入表
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
  //   // 删除表
  //   sqlStr += getFrontStr("删除") + deleteTable(tableName, "id=5");
  //   sqlStr += getFrontStr("删除") + deleteTable(tableName, { id: 6, user_name: "李四", age: ">20" });
  //   // 修改表
  //   sqlStr += getFrontStr("修改") + updateTable(tableName, { gender: 2 }, { user_name: "李四" });
  //   // 查找表
  //   sqlStr += getFrontStr("查找") + queryTable(tableName, { user_name: "李四", age: ">=20" });
  //   sqlStr += getFrontStr("查找") + queryTable(tableName, [{ "user_name|not": ["李四", "张三"], "age|not": "=24" }, { user_name: "王五" }]);
  //   sqlStr += getFrontStr("查找") + queryTable(tableName, { user_name: ["李四", "张三"] });
  // }

  return sqlStr;
}

/**
 * 整个系统的所有表
 * @advice 数据库建议名称 Interview Surprise（面试突袭）
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
      "id:createUser:创建人",
      "updateTime",
      "id:updateUser:最后修改人",
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
      "id:createUser:创建人",
      "updateTime",
      "id:updateUser:最后修改人",
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
      "role",
      "createTime:注册时间",
      "commonTime:destroyTime:注销时间",
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
      "id:createUser:创建人",
      "updateTime",
      "id:updateUser:最后修改人",
      "enableStatus",
    ],
  },
  // 题目表
  topic: {
    fields: [
      "id:题目id",
      "id:industryId:所属行业id",
      {
        type: "title",
        name: "question",
        remark: "题目问题",
        notNull: true,
      },
      {
        type: "longText",
        name: "content",
        remark: "题目内容",
        notNull: true,
      },
      "id:creatorId:创建者id",
      "createTime:创建时间",
      "auditStatus",
      "enableStatus",
    ],
  },
  // 交易表
  deal: {
    fields: [
      "id:交易id",
      "id:userId:用户id",
      "id:goodsId:购买的商品id",
      "id:setMealsId:套餐id",
      { type: "enum", name: "dealType", remark: "交易类型", enums: { 1: "收入", 2: "支出" } },
      { type: "enum", name: "monetaryType", remark: "货币类型", enums: { 1: "人民币", 2: "金币" } },
      "price", // 有了套餐id，可以无需存储价格（但考虑性能，还是存一个）
      "amount",
      "price:totalPrice:总价", // 总价 = 价格(price) * 数量(amount)。有了套餐id，可以无需存储总价格（但考虑性能，还是存一个）
      "createTime:创建交易时间",
    ],
  },
  // 套餐表
  setMeals: {
    fields: [
      "id:套餐id",
      "shortText:content:套餐内容",
      "price",
      "amount:limitSellAmount:套餐限售数量",
      "commonTime:endTime:套餐到期时间",
      "createTime",
      "id:createUser:创建人",
      "updateTime",
      "id:updateUser:最后修改人",
      "enableStatus",
    ],
  },
  // // 地区表（省市区级联）
  // region: {
  //   fields: [
  //     "id",
  //     "id:pId:父级id",
  //     { type: "shortText", name: "name", remark: "名称", length: 10 },
  //     "createTime",
  //     "id:createUser:创建人",
  //     "updateTime",
  //     "id:updateUser:最后修改人",
  //   ],
  // },
  // 日志表
  log: {
    fields: [
      "id:日志id",
      "enum:business:业务类型",
      "enum:operateType:操作类型",
      "id:operateUserId:操作人id",
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
