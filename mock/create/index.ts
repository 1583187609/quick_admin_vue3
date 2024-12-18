import { getRequestParams, responseData, getFilterList, getListTotal, defaultDateFormat, needParam } from "../utils";
import dayjs from "dayjs";
import { CommonObj } from "@/core/_types";
import allData from "../data";
import _ from "lodash";

const { merge } = _;

function getRowByFields(data: CommonObj, exportFields: string[] = []): CommonObj {
  const row: CommonObj = {};
  exportFields.forEach((key: string) => {
    const val = data[key];
    if (val === undefined) return;
    row[key] = val;
  });
  return row;
}

/**
 * 待办事项
 * 1、列表返回字典文本_text
 */

/**
 * 转成数组
 * @param {object|object[]} data 要处理的数据
 * @returns {object[]}
 */
function toArray(data: CommonObj | CommonObj[]) {
  if (!Array.isArray(data)) return [data];
  return data as CommonObj[];
}

/**
 * 当新增时将对象填充满属性
 * @param {object} currentObj 当前要处理的对象
 * @param {object} targetObj 目标对象
 * @returns {object}
 */
function whenAddfillAttrs(currentObj: CommonObj = needParam(), targetObj: CommonObj = needParam(), lastId = needParam()) {
  const currKeys = Object.keys(currentObj);
  const tarKeys = Object.keys(targetObj);
  tarKeys.forEach(key => {
    const findInd = currKeys.findIndex(it => it === key);
    if (findInd !== -1) return currKeys.splice(findInd, 1);
    let val: any = null;
    if (key === "id") val = lastId + 1;
    else if (key === "create_time") val = dayjs().format(defaultDateFormat);
    currentObj[key] = val;
    /**
     * 后续再处理
     * 1、默认值填充
     * 2、id自动递增
     */
  });
  // 以目标对象为准，剔除掉传入的多余属性
  currKeys.forEach(key => {
    console.warn(`多传入了属性：${key}`);
    delete currentObj[key];
  });
  return currentObj;
}

/**
 * 生成restful 风格的 api
 * @param {string} enName 模块的英文名称
 * @param {string} prefix 前缀，例："/mock
 * @returns {object}
 */
export function createRestfulApis(enName = "user", prefix = "/mock") {
  const target = allData[enName];
  if (!target) throw new Error(`不存在该类型：${enName}`);
  let { list = [] } = target;
  const { name: cnName = needParam() } = target; // cnName 模块的中文名称
  return {
    // 新增/批量新增（导入）
    [`POST ${prefix}/${enName}`]: (req: CommonObj) => {
      const params = getRequestParams(req);
      const { byKey = "id", data = needParam() } = params;
      const newList: CommonObj[] = toArray(data);
      const byIds = newList.map(it => it[byKey]);
      const findList = getFilterList(list, { ids: byIds }, { ids: ["enums", "same", byKey] });
      if (findList?.length) return responseData({ code: 1, msg: `${cnName}已存在：${findList.map(it => it[byKey]).join(", ")}` });
      newList.forEach((row, ind) => whenAddfillAttrs(row, list[0], list.at(-1)[byKey] + ind)); // 将新增的每项填充好缺失的属性
      list.push(...newList);
      return responseData({ data: newList.length === 1 ? newList[0] : newList });
    },
    // 删除/批量删除
    [`DELETE ${prefix}/${enName}`]: (req: CommonObj) => {
      const params: CommonObj = getRequestParams(req);
      const { byKey = "id", ids = needParam() } = params;
      if (!ids.length) return responseData({ code: 1, msg: `请传入参数：ids` });
      const byIds: CommonObj[] = toArray(ids);
      const findList = getFilterList(list, { ids: byIds }, { ids: ["enums", "same", byKey] }, undefined, undefined, []);
      const findIds = findList.map(it => it[byKey]);
      if (byIds.length !== findIds.length) {
        const notFindIds = byIds.filter(id => !findIds.includes(id));
        return responseData({ code: 1, msg: `${cnName}不存在：${notFindIds.join(", ")}` });
      }
      list = getFilterList(list, { ids: byIds }, { ids: ["enums", "same", byKey] }, true);
      return responseData();
    },
    // 修改全部（类似post）
    [`PUT ${prefix}/${enName}`]: (req: CommonObj) => {
      const params = getRequestParams(req);
      const { byKey = "id", data = needParam() } = params;
      const putList: CommonObj[] = toArray(data); // 一维数组，无嵌套
      const byIds = putList.map((row: CommonObj) => row[byKey]);
      const findList = getFilterList(list, { ids: byIds }, { ids: ["enums", "same", byKey] }, undefined, undefined, []);
      const findIds = findList.map(it => it[byKey]);
      if (byIds.length !== findIds.length) {
        const notFindIds = byIds.filter(id => !findIds.includes(id));
        return responseData({ code: 1, msg: `${cnName}不存在：${notFindIds.join(", ")}` });
      }
      function updateList(arr: CommonObj[]) {
        if (!arr?.length) return;
        arr.find((row: CommonObj) => {
          const id = row[byKey];
          const { children } = row;
          const findInd = putList.findIndex(it => it[byKey] === id);
          if (findInd === -1) return updateList(children);
          merge(row, putList[findInd]);
          putList.splice(findInd, 1);
          return !putList.length;
        });
      }
      updateList(list);
      return responseData();
    },
    // // 修改局部（类似post，只针对更改过的，是对put的补充，patch意为修补）
    // [`PATCH ${prefix}/${enName}`]: (req: CommonObj) => {
    //   const params = getRequestParams(req);
    //   // 逻辑同 PUT
    //   return responseData({ data });
    // },
    // 查询详情/查询列表/导出列表
    [`GET ${prefix}/${enName}`]: (req: CommonObj) => {
      const pageParams = getRequestParams(req);
      const { byKey = "id", ids, curr_page, page_size, exports, ...params } = pageParams;
      const isPage = curr_page !== undefined && page_size !== undefined; // 是否分页
      let queryList: CommonObj[] = [];
      // 查询详情
      if (ids && !isPage && !exports && !Object.keys(params).length) {
        const byIds = toArray(ids);
        queryList = getFilterList(list, { ids: byIds }, { ids: ["enums", "same", byKey] }, false);
        return responseData({ data: queryList.length === 1 ? queryList[0] : queryList });
      }
      queryList = getFilterList(
        list,
        { curr_page, page_size, ...params },
        {
          ids: ["enums", "same", "id"],
          age: ["range", "number"],
          name: ["match", "blur"],
          create_times: ["range", "date", "create_time"],
        },
        false
      );
      const total = getListTotal(queryList);
      // 如果是导出列表（暂不支持嵌套的列表导出）
      if (exports) {
        const maxLimit = 2000;
        if (!queryList?.length) return responseData({ code: 1, msg: `导出失败：未查询到记录` });
        if (queryList.length > maxLimit) {
          return responseData({ code: 1, msg: `导出失败：单次导出上限为 ${maxLimit} 条，当前为 ${queryList.length} 条` });
        }
        const allKeys = Object.keys(queryList[0]);
        if (!allKeys.length) throw new Error(`列表项不能为空`);
        const { includesKeys = allKeys, excludesKeys, isFlat = true } = exports;
        const exportFields = excludesKeys?.length ? includesKeys.filter(key => !excludesKeys.includes(key)) : includesKeys;
        function cycleHandle(arr: CommonObj[], flatList: CommonObj[] | undefined = isFlat ? [] : undefined) {
          if (!arr?.length) return [];
          const treeList = arr.map(item => {
            const { children } = item;
            const row: CommonObj = getRowByFields(item, exportFields);
            if (flatList) {
              flatList.push(row);
              cycleHandle(children, flatList);
              return row;
            }
            if (children?.length) row.children = cycleHandle(children);
            return row;
          });
          return flatList ?? treeList;
        }
        queryList = cycleHandle(queryList);
        return responseData({ data: { total_num: total, records: queryList } });
      }
      // 如果是查询列表
      if (!isPage) return responseData({ data: { total_num: total, records: queryList } });
      const sInd = (curr_page - 1) * page_size;
      const eInd = sInd + page_size;
      queryList = queryList.slice(sInd, eInd);
      return responseData({ data: { total_num: total, records: queryList, curr_page, page_size, has_next: eInd < total - 1 } });
    },
  };
}
