import { CommonObj } from "@/core/_types";
import { GetMockCommon } from "@/api-mock";

/**
 * 批量插入的字典数据
 */
export default await GetMockCommon().then((res: any) => {
  const dictMap: CommonObj = {};
  const list = res.records.slice(0, 3);
  list.map((item, ind) => {
    const name = `D_BatchInsert_${ind}`;
    const opts = Array(3).fill("");
    dictMap[name] = opts.map((it, i) => ({ label: `批量请求下拉${ind}_选项${i}`, value: i }));
  });
  return dictMap;
});
