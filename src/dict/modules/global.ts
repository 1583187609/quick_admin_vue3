import { GetCascaderRegion } from "@/api-mock";
import { CommonObj } from "@/vite-env";
import { lazyFetch } from "..";

export default {
  // 省市区级联
  Region: lazyFetch(GetCascaderRegion),
} as CommonObj;
