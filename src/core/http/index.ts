/**
 * @link 取消请求参考链接：https://blog.csdn.net/lu2925028830/article/details/126296846
 * @function 功能点：异常消息提示、统一get和post参数写法、失败后尝试重新请求（有最大次数限制）、取消请求、全局Loading兜底、默认配置（支持配置扩展）
 */

import qs from "qs";
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  Method,
  AxiosPromise,
} from "axios";
import { typeOf, storage } from "@/utils";
import { showLoading, hideLoading, showToast, getResData, defaultResDataMap, goLogin } from "./_utils";
import { GetRequired } from "@/core/_types";

const enableMock = true; // 是否启用mock

// 可选的自定义请求配置
export interface CustomRequestConfig {
  isStringify?: boolean; // 是否字符串序列化
  loadEnable?: boolean; // 是否启用loading
  toastEnable?: boolean; // 当返回状态码不为成功时，是否进行弹窗提示
  reconnectMax?: number; // 请求失败后的最大尝试重新请求次数
  intercept?: boolean; // 是否拦截{code, msg, data}这层数据
  resDataMap?: {
    code: any;
    data: any;
    msg: any;
  };
}

export interface AxiosCustomConfig {
  customConfig?: GetRequired<CustomRequestConfig>;
}

const defaultCustomCfg = {
  isStringify: undefined, // 对于post请求的参数，get请求的数组或对象参数，是否字符串序列化
  loadEnable: true, // 是否启用全局loading
  toastEnable: true, // 对于code非成功值的提示信息是否要进行toast提示
  reconnectMax: 1, //失败后重新请求的最大尝试次数
  resDataMap: defaultResDataMap,
};

const statusMap: Record<number, string> = {
  400: "请求失败，请重试",
  401: "token已过期，请重新登录",
  403: "操作无权限",
  404: "资源不存在",
  405: "请求方式错误，请重试",
  408: "请求超时，请重试",
  500: "服务异常",
  502: "网关错误",
  503: "服务不可用",
  504: "网关超时",
};

let controller: any = null;
const service: AxiosInstance = axios.create({
  withCredentials: true,
  // baseURL: 'https://some-domain.com/api/',
  // paramsSerializer: function (params) {
  //   // query = qs.stringify(params,{arrayFormat:'repeat'})
  //   // return qs.stringify(params, { indices: false });
  //   return qs.stringify(params, { arrayFormat: "repeat" });
  // },
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig & AxiosCustomConfig) => {
    const { loadEnable } = config?.customConfig ?? {};
    loadEnable && showLoading();
    // config.headers["Content-Type"] = "application/json;charset=utf-8";
    const token = storage.getItem("token");
    config.headers.token = token;
    config.headers["x-csrf-token"] = storage.getItem("csrfToken", "cookie");
    // config.headers.Cookie = `csrfToken=${token}`;
    return config;
  },
  (err: AxiosError) => {
    console.error("请求错误：", err);
    return err;
  }
);

service.interceptors.response.use(
  (res: AxiosResponse) => {
    const { data: resData, config = {} } = res;
    const { loadEnable, toastEnable, intercept = true, resDataMap } = config?.customConfig ?? {};
    loadEnable && hideLoading();
    if (!intercept) return resData;
    const { code, data, msg, successCode = 0 } = getResData(resData, resDataMap);
    if (code === successCode) return data;
    const newMsg = msg || "请求错误";
    toastEnable ? showToast(newMsg) : console.error(newMsg);
    return Promise.reject(msg);
  },
  (err: AxiosError) => {
    if (axios.isCancel(err)) return Promise.reject(err);
    const { status, config = {}, code } = err;
    const { loadEnable } = config?.customConfig ?? {};
    loadEnable && hideLoading();
    // 未授权，去登录
    const errMsg = code === "ECONNABORTED" ? "请求超时，请重试" : statusMap[status] ?? "请求失败";
    console.error(`${errMsg}：${config.url}`, err);
    showToast(errMsg);
    if (status === 401) goLogin();
    return Promise.reject(err);
  }
);

/**
 * 发送http请求
 * @param {String} method 请求类型（区分大小写），可选值：get,post,put,patch,delete
 * - get 获取数据。请求指定的页面信息，并返回实体主体。
 * - post 提交数据。如：提交表单或上传文件。数据被包含在请求体中
 * - put 更新全部数据（类似post）
 * - patch 更新局部数据（类似post，只针对更改过的）。是对put的补充，patch意为修补。
 * - delete 删除数据。
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} customCfg 自定义的携带在axios config上的属性
 * @param {Object} othersCfg 除上述三个axios配置参数外，其余任意多个axios的标准参数
 * @returns
 */
function fetch<T = any>(
  method: Method = "get",
  url = "",
  data: any,
  customCfg: GetRequired<CustomRequestConfig>,
  othersCfg?: AxiosRequestConfig
): AxiosPromise<T> {
  method = method.toLowerCase() as Method;
  controller = new AbortController();
  const cfg: AxiosRequestConfig & AxiosCustomConfig = { url, method, customConfig: customCfg, signal: controller.signal, ...othersCfg };
  const { isStringify } = customCfg;
  if (method === "get") {
    if (isStringify || enableMock) {
      // 将数组或对象字符串序列化
      for (const key in data) {
        const val = data[key];
        if (typeof val === "object") data[key] = JSON.stringify(val);
      }
    }
    cfg.params = data;
  } else if (["post", "put", "patch", "delete"].includes(method)) {
    const isObj = typeOf(data) === "Object";
    cfg.data = isObj && isStringify ? qs.stringify(data) : data;
  } else {
    throw new Error(`暂不支持此请求方法：${method}`);
  }
  return service(cfg);
}

/**
 * 发送http请求
 * @param {String} method 请求类型（区分大小写），可选值：get,post,put,patch,delete
 * - get 获取数据。请求指定的页面信息，并返回实体主体。
 * - post 提交数据。如：提交表单或上传文件。数据被包含在请求体中
 * - put 更新全部数据（类似post）
 * - patch 更新局部数据（类似post，只针对更改过的）。是对put的补充，patch意为修补。
 * - delete 删除数据。
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} customCfg 自定义的携带在axios config上的属性
 * @param {Object} othersCfg 除上述三个axios配置参数外，其余任意多个axios的标准参数
 * @param {number} max 请求失败后，最大重新请求次数
 * @returns
 */
function http<T = any>(
  method: Method,
  url: string,
  data: any,
  customCfg?: CustomRequestConfig,
  othersCfg?: AxiosRequestConfig,
  max = customCfg?.reconnectMax ?? defaultCustomCfg.reconnectMax
): Promise<AxiosResponse<any, any> | T> {
  customCfg = customCfg ? Object.assign({}, defaultCustomCfg, customCfg) : defaultCustomCfg;
  const reconnectMax = customCfg.reconnectMax!;
  return fetch(method, url, data, customCfg as GetRequired<CustomRequestConfig>, othersCfg).catch(err => {
    if (axios.isCancel(err) || max <= 1) {
      return Promise.reject(err);
    } else {
      console.warn(`接口请求失败，尝试第${reconnectMax - max + 1}次重新请求`);
      return http(method, url, data, customCfg, othersCfg, max - 1);
    }
  });

  // try {
  //   return fetch(method, url, data, customCfg as GetRequired<CustomRequestConfig>, othersCfg);
  // } catch (err) {
  //   if (axios.isCancel(err) || max <= 1) {
  //     return Promise.reject(err);
  //   } else {
  //     const isRetry = true;
  //     if (isRetry) {
  //       console.warn(`接口请求失败，尝试第${reconnectMax - max + 1}次重新请求`);
  //       return http(method, url, data, customCfg, othersCfg, max - 1);
  //     }
  //     console.error("请求错误捕获：", err);
  //     throw new Error("请求错误捕获");
  //   }
  // }
}

export default http;

/**
 * 取消请求
 * @returns
 */
export function cancelHttp() {
  controller.abort();
}
