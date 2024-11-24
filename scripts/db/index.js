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
  if (tableName === "user") {
    function getFrontStr(type = "处理") {
      return `${N}${N}-- ${type}${tableName}表${N}`;
    }
    // 插入表
    sqlStr +=
      getFrontStr("插入") +
      insertTable(
        tableName,
        [
          ["userName", "gender"],
          ["唐六", 1],
          ["程八", 2],
        ],
        standardFields
      );
    // 删除表
    sqlStr += getFrontStr("删除") + deleteTable(tableName, "id=5");
    sqlStr += getFrontStr("删除") + deleteTable(tableName, { id: 6, user_name: "李四", age: ">20" });
    // 修改表
    sqlStr += getFrontStr("修改") + updateTable(tableName, { gender: 2 }, { user_name: "李四" });
    // 查找表
    sqlStr += getFrontStr("查找") + queryTable(tableName, { user_name: "李四", age: ">=20" });
    sqlStr += getFrontStr("查找") + queryTable(tableName, [{ "user_name|not": ["李四", "张三"], "age|not": "=24" }, { user_name: "王五" }]);
    sqlStr += getFrontStr("查找") + queryTable(tableName, { user_name: ["李四", "张三"] });
  }

  return sqlStr;
}

/**
 * 整个系统的所有表
 * @advice 数据库建议名称 Interview Surprise（面试突袭）
 */
const tables = {
  // 用户表
  user: {
    fields: ["id:用户id", "phone", "password", "userName", "nickname", "gender", "age", "role", "dateTime:registerTime:注册时间"],
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
  // // 用户行为表
  // userBehavior: {
  //   //
  // },
  // // 用户交际关系表
  // relationship: {
  //   //
  // },
  // 分类表
  classify: {
    fields: ["id:所属行业id", "id:pId:父级id", { type: "shortText", name: "name", remark: "分类名称", length: 10 }],
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
      "dateTime:createTime:创建时间",
      { type: "enum", name: "auditStatus", remark: "审核状态", enums: auditStatus },
      { type: "enum", name: "enableStatus", remark: "启用状态", enums: enableStatus },
    ],
  },
  // 题目使用情况表
  // topicUse: {
  //   fields: ["id:topicId:题目id", "id:userId:用户id"],
  // },
  // 日志表
  log: {
    fields: ["id:日志id", "enum:business:业务类型", "enum:operateType:操作类型", "id:operateUserId:操作人id", "dateTime:operateTime:操作时间"],
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
