/**
 * 排序逻辑
 */
// import { SortParams, sortByMap } from "@/hooks/sortable/types";
import { reactive } from "vue";
import { SortParams } from "./types";
import { CommonObj } from "@/core/_types";
//keyMap示例：左侧key为表单列的prop，value为要传递给后端的排序key值
// const keyMap: CommonObj = {
//   exposure: "amount_attitude",
//   receiveLike: "receive_like",
//   loved_ratio: "like_ratio",
// };
const sortByMap: CommonObj = {
  ascending: "ASC",
  descending: "DESC",
};
export default (keyMap: CommonObj) => {
  const sortParams = reactive<SortParams>({
    sortKey: "",
    sortBy: "",
  });
  function handleSortChange(res: CommonObj) {
    const { column, prop, order } = res;
    const sortBy = sortByMap[order] || "";
    Object.assign(sortParams, {
      sortKey: sortBy ? keyMap[prop] : "",
      sortBy,
    });
  }
  return {
    sortParams,
    handleSortChange,
  };
};
