import { GetMockCommonList, GetCascaderRegion } from "@/api-mock";
import { CommonObj } from "@/vite-env";

export default {
  // 省市区级联
//   Region: GetCascaderRegion,
  // 测试用的请求下拉项
  TestFetchAsync: {},
//   TestFetchAsync: ()=>{
//     return  GetMockCommonList().then((res: CommonObj) => {
//       const list = res.records.slice(0,3)
//       const obj: CommonObj = {};
//       list.forEach((item: string, ind: number) => {
//         obj[ind] = {text: `请求下拉项${ind}`};
//       });
//       return obj;
//     })
//   }
};
