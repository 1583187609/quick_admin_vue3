import { N, getWhereStr, needParam, typeOf, modChar } from "../utils/index.js";
import { toStandardFieldObj } from "./create.js";

/**
 * 获取JOIN表的字符串
 * @param {string} mainKey 主表的主键，例：user.id
 * @param {object} joinTableMap 要连接标的映射，例： { order: "user_id" }
 */
function getJoinTableStr(mainKey = needParam(), joinTableMap) {
  if (!joinTableMap) return "";
  const joinTableNames = Object.keys(joinTableMap);
  if (!joinTableNames.length) return "";
  // modName 带修饰符的表单名称
  return joinTableNames
    .map(modName => {
      const [name, joinType = "INNER"] = modName.split(modChar);
      const joinKey = joinTableMap[modName];
      return `${joinType.toUpperCase()} JOIN ${name} ON ${mainKey} = ${name}.${joinKey}`;
    })
    .join(N);
}

/**
 * 获取单、多表查询的sql语句
 * @param {object} tableMap 多表映射 例：{ user: ["id", "name"], order: ["user_id|left", "order_id", "amount"] }
 * @param {string|boolean|array|object} where where规则
 * @notice 在上述映射结构中，第一个表为主表，其他为从表。主表第一个字段为主键，从表第一个字段为join主键，且这两个键都是必须的
 */
// 使用示例：
// 单表查询
// queryTable({user: undefined}, { user_name: "李四", age: ">=20" });
// queryTable({user: ['*']}, { user_name: ["李四", "张三"] });
// 模糊查询
// queryTable({user: ['*']}, { user_name|like: "%四%"}); // 名字中含有四
// 正则表达式查询
// queryTable({user: ['*']}, { user_name|regexp: "^李.+" }); // 姓李的
// 取反查询
// queryTable({user: ['*']}, [{ "user_name|not": ["李四", "张三"], "age|not": "=24" }, { user_name: "王五" }]);
// 多表查询(order:默认 INNER 连接，log LEFT连接)
// queryTable({ user: ["id", "user_name", "nickname", "age"], order: ["user_id", "price", "amount"], "log|left": ["user_id"] }, { "user.age": ">20", "order.price": ">=20" });
export default function (tableMap = needParam(), where) {
  const joinTableMap = {};
  const tableNames = Object.keys(tableMap);
  const [mainTableName, ...joinTableNames] = tableNames;
  const isSingle = tableNames.length === 1; // 是否是单表查询
  // modName 带修饰符的表单名称
  const fieldsStr = tableNames
    .map((modName, ind) => {
      const [name, joinType] = modName.split(modChar);
      let fields = tableMap[modName] ?? ["*"];
      // 后面的join表，要去除掉第一个关联主键
      if (ind === 0) {
        if (!isSingle) {
          if (!fields[0]) throw new Error(`主表${name}主键不能为空`);
          const { isPrimaryKey, name } = toStandardFieldObj(fields[0]);
          if (!isPrimaryKey) throw new Error(`主表${name}第一个键必须为主键，当前为：${name}`);
        }
      } else {
        const [relativeMainKey, ...restFiedls] = fields;
        if (!relativeMainKey) throw new Error(`从表${name}主键不能为空`);
        joinTableMap[modName] = relativeMainKey;
        fields = restFiedls.length ? restFiedls : ["*"]; // 默认为查询全部
      }
      if (!isSingle) fields = fields.map(it => `${name}.${it}`);
      return fields.join(", ");
    })
    .join(`,${N}`);
  const joinStr = isSingle ? "" : getJoinTableStr(`${mainTableName}.${tableMap[mainTableName][0]}`, joinTableMap);
  const nChar = isSingle ? " " : N;
  const whereStr = getWhereStr(where, nChar);
  return `SELECT${nChar}${fieldsStr}${nChar}FROM ${mainTableName}${nChar}${joinStr}${joinStr ? N : ""}WHERE ${whereStr};`;
}
