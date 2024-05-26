import qs from "qs";
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { typeOf, isDev } from "@/utils";
import { showLoading, hideLoading, showToast } from "./_utils";
import { CommonObj } from "@/vite-env";

const statusMap: CommonObj = {
  400: "请求失败！请您稍后重试",
  401: "登录失效！请您重新登录",
  403: "当前账号无权限访问！",
  404: "你所访问的资源不存在！",
  405: "请求方式错误！请您稍后重试",
  408: "请求超时！请您稍后重试",
  500: "服务异常！",
  502: "网关错误！",
  503: "服务不可用！",
  504: "网关超时！",
};

const service: AxiosInstance = axios.create();

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    showLoading();
    // config.headers["Content-Type"] = "application/json;charset=utf-8";
    return config;
  },
  (err: AxiosError) => {
    console.error("请求错误：", err);
    return err;
  }
);

service.interceptors.response.use(
  (res: AxiosResponse) => {
    const { data: resData, status } = res;
    const { code, data, msg } = resData;
    hideLoading();
    if (status !== 200) return Promise.reject(showToast(statusMap[status] || "请求失败"));
    if (code === 0) return data;
    showToast(msg);
    console.error("请求错误：", msg);
    return Promise.reject(msg);
  },
  (err: AxiosError) => {
    const { message, config } = err;
    hideLoading();
    if (message === "Network Error") {
      showToast(isDev ? "Mock服务端错误！" : "网络错误", "error");
    } else if (message === "Request failed with status code 404") {
      console.error("接口不存在：" + config?.url);
      showToast("接口不存在");
    } else {
      console.error("响应错误：", err);
      showToast("网络错误");
    }
    return Promise.reject(err);
  }
);

/**
 * 发送http请求
 * @param {String} method 请求类型（区分大小写），可选值：get,post,put,patch,delete
 * get 获取数据。请求指定的页面信息，并返回实体主体。
 * post 提交数据。如：提交表单或上传文件。数据被包含在请求体中
 * put 更新全部数据（类似post）
 * patch 更新局部数据（类似post，只针对更改过的）。是对put的补充，patch意为修补。
 * delete 删除数据。
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} others 除上述三个axios配置参数外，其余任意多个axios的标准参数
 * @returns
 */
function fetch(method = "get", url = "", data: any, others?: AxiosRequestConfig, isStringify = false): Promise<any> {
  method = method.toLowerCase();
  const cfg: AxiosRequestConfig = { url, method, ...others };
  if (["get"].includes(method)) {
    cfg.params = data;
  } else if (["post", "put", "patch", "delete"].includes(method)) {
    // cfg.data = isStringify ? qs.stringify(data) : data;
    const isObj = typeOf(data) === "Object";
    cfg.data = isObj && isStringify ? qs.stringify(data) : data;
  } else {
    throw new Error("请传入正确的请求方法");
  }
  return service(cfg);
}

/**
 * 发送http请求
 * @param {String} method 请求类型（区分大小写），可选值：get,post,put,patch,delete
 * get 获取数据。请求指定的页面信息，并返回实体主体。
 * post 提交数据。如：提交表单或上传文件。数据被包含在请求体中
 * put 更新全部数据（类似post）
 * patch 更新局部数据（类似post，只针对更改过的）。是对put的补充，patch意为修补。
 * delete 删除数据。
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} others 除上述三个axios配置参数外，其余任意多个axios的标准参数
 * @param {number} maxCount 请求失败后，最大重新请求次数
 * @returns
 */
function http(
  method: string,
  url: string,
  data: any,
  others?: AxiosRequestConfig,
  isStringify?: boolean,
  maxCount = 3
): Promise<any> {
  return fetch(method, url, data, others, isStringify).catch(err => {
    maxCount--;
    console.warn(`接口请求失败，尝试第${3 - maxCount}次重新请求`);
    if (maxCount <= 0) {
      Promise.reject(err);
    } else {
      http(method, url, data, others, isStringify, maxCount);
    }
  });
}

export default http;
