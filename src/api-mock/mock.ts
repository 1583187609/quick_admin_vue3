import http from "@/services/http";
import { CommonObj } from "@/vite-env";
// // 获取mock测试数据
export const GetMockTest = (data: CommonObj = {}) => http("get", "/mock/test", data);
// 获取mock 字典映射
export const GetMockDict = (data: CommonObj = {}) => http("get", "/mock/dict", data);
// 获取mock 地区省市区县
export const GetMockAddress = (data: CommonObj = {}) => http("get", "/mock/address", data);
// 获取mock导航数据
export const GetMockNavs = (data: CommonObj = {}) => http("get", "/mock/navs", data);
// 提交表单
export const PostMockSubmit = (data: CommonObj = {}) => http("post", "/mock/submit", data);
//测试获取表格行数据
export const GetMockRoleList = (data: CommonObj = {}) => http("get", "/mock/role/list", data);
//获取学校列表数据
export const GetMockSchoolList = (data: CommonObj = {}) => http("get", "/mock/school/list", data);
//获取公司列表数据
export const GetMockCompanyList = (data: CommonObj = {}) => http("get", "/mock/company/list", data);
