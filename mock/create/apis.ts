import { getRequestParams, responseData, getConstructorObj, getFilterList, getListTotal, defaultDateFormat } from "../utils";
import _allUsers from "../data/user";
import roleRows from "../data/roles";
import { getDictLabel } from "../dict";
import dayjs from "dayjs";
import { CommonObj } from "@/core/_types";
import { designMap } from "../design";
import _ from "lodash";

const { merge } = _;

let allRoles = JSON.parse(JSON.stringify(roleRows));

/**
 * 生成restful 风格的 api
 * @param {string} name 名称
 * @param {string} prefix 前缀，例："/common
 * @returns {object}
 */
export function createRestfulApis(name = "user", prefix = "") {
  const design = designMap[name];
  if (!design) throw new Error(`不存在该类型：${name}`);
  const { name: cnName = name, list = [], privateKeys } = design;
  return {
    // 新增
    [`POST ${prefix}/${name}/add`]: (req: CommonObj) => {
      const params = getRequestParams(req);
      const { role, status } = params;
      const target = allRoles.find((it: CommonObj) => it.role === role);
      if (target) return responseData({ code: 1, msg: `该${cnName}已存在` });
      const data = merge(getConstructorObj(allRoles?.[0]), params, {
        id: allRoles.slice(-1)[0].id + 1,
        role_text: getDictLabel("D_RoleType", role),
        status_text: getDictLabel("D_EnableStatus", status),
        create_time: dayjs(Date.now()).format(defaultDateFormat),
      });
      allRoles.push(data);
      return responseData({ data });
    },
    // 删除
    [`DELETE ${prefix}/${name}/list`]: (req: CommonObj) => {
      const params: CommonObj = getRequestParams(req);
      // const { ids = [] } = params;
      allRoles = getFilterList(allRoles, params, { ids: ["enums", "same", "id"] }, true);
      return responseData();
    },
    // 修改
    [`POST ${prefix}/${name}/update`]: (req: CommonObj) => {
      const params = getRequestParams(req);
      const { id, role, role_text, status, remark, menu_auth } = params;
      const data = allRoles.find((it: CommonObj) => it.id === id);
      if (!data) return responseData({ code: 1, msg: `不存在该${cnName}` });
      merge(data, params, {
        role_text: getDictLabel("D_RoleType", role),
        status_text: getDictLabel("D_Gender", status),
        update_time: dayjs(Date.now()).format(defaultDateFormat),
      });
      return responseData({ data });
    },
    // 查询/导出列表
    [`GET ${prefix}/${name}/list`]: (req: CommonObj) => {
      const { curr_page, page_size, ...params } = getRequestParams(req);
      let queryList = getFilterList(
        list,
        params,
        { age: ["range", "number"], name: ["match", "blur"], create_time_range: ["range", "date", "create_time"] },
        false,
        privateKeys
      );
      // 如果是导出列表
      if (exports) {
        const { fields, ids } = exports;
        if (ids?.length) queryList = getFilterList(queryList, { ids }, { ids: ["enums", "same", "id"] });
        if (fields?.length) {
          queryList = queryList.map(row => {
            const newRow: CommonObj = {};
            fields.forEach((key: string) => (newRow[key] = row[key]));
            return newRow;
          });
        }
        return responseData({ data: queryList });
      }
      // 如果是查询列表
      const isPage = curr_page !== undefined && page_size !== undefined; // 是否分页
      const total_num = getListTotal(queryList);
      if (isPage) {
        const sInd = (curr_page - 1) * page_size;
        const eInd = sInd + page_size;
        return responseData({
          data: {
            total_num,
            records: queryList.slice(sInd, eInd),
            curr_page,
            page_size,
            has_next: eInd < total_num - 1,
          },
        });
      }
      return responseData({ data: { total_num, records: queryList } });
    },
    // 查询详情
    [`GET ${prefix}/${name}/detail`]: (req: CommonObj) => {
      const { id } = getRequestParams(req);
      const data = allRoles.find((it: CommonObj) => it.id === id);
      if (!data) return responseData({ code: 1, msg: `不存在该${cnName}` });
      return responseData({ data });
    },
  };
}
