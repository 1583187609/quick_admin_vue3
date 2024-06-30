import { GetCascaderRegion } from "@/api-mock";

export type CascaderName = keyof typeof cascaderMap;

/**
 * 级联的逻辑处理暂时放在这里，后续再改进放置位置
 */

const cascaderMap = {
  // 地区（省市区）
  Region: await GetCascaderRegion().then((res: any) => res),
};

export default cascaderMap;
