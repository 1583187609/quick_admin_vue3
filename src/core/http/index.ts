/**
 * @link 取消请求参考链接：https://blog.csdn.net/lu2925028830/article/details/126296846
 */

import qs from "qs";
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios";
import { typeOf, isDev, storage } from "@/utils";
import { showLoading, hideLoading, showToast, getResData, defaultResDataMap } from "./_utils";
import { GetRequired } from "@/vite-env";
let source: CancelTokenSource = axios.CancelToken.source();

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

export interface NewAxiosRequestConfig extends AxiosRequestConfig {
  customConfig: GetRequired<CustomRequestConfig>;
}

const defaultCustomCfg = {
  isStringify: false, //对于post请求的参数是否字符串序列化
  loadEnable: true, // 是否启用全局loading
  toastEnable: true, // 对于code非成功值的提示信息是否要进行toast提示
  reconnectMax: 1, //失败后重新请求的最大尝试次数
  resDataMap: defaultResDataMap,
};

const statusMap: Record<number, string> = {
  400: "请求失败，请重试",
  401: "token已过期",
  403: "操作无权限",
  404: "资源不存在",
  405: "请求方式错误，请重试",
  408: "请求超时，请重试",
  500: "服务异常",
  502: "网关错误",
  503: "服务不可用",
  504: "网关超时",
};

const service: AxiosInstance = axios.create({
  withCredentials: true,
  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  // baseURL: 'https://some-domain.com/api/',
  // paramsSerializer: function (params) {
  //   return qs.stringify(params, { arrayFormat: "repeat" });
  // },
  paramsSerializer: function (params) {
    return qs.stringify(params, { indices: false });
  },
  // paramsSerializer: {
  //   indexes: null,
  // },
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { loadEnable } = config.customConfig as GetRequired<CustomRequestConfig>;
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
    const { data: resData, config } = res;
    const { loadEnable, toastEnable, intercept = true, resDataMap } = config.customConfig as GetRequired<CustomRequestConfig>;
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
    const { status, config } = err;
    const { loadEnable } = config.customConfig as GetRequired<CustomRequestConfig>;
    loadEnable && hideLoading();
    const errMsg = statusMap[status] || "请求失败";
    console.error(`${errMsg}：${config.url}`, err);
    showToast(errMsg);
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
  method = "get",
  url = "",
  data: any,
  customCfg: GetRequired<CustomRequestConfig>,
  othersCfg?: AxiosRequestConfig
): Promise<T> {
  method = method.toLowerCase();
  const cfg: NewAxiosRequestConfig = { url, method, customConfig: customCfg, cancelToken: source.token, ...othersCfg };
  if (["get"].includes(method)) {
    cfg.params = data;
  } else if (["post", "put", "patch", "delete"].includes(method)) {
    const isObj = typeOf(data) === "Object";
    const { isStringify } = customCfg;
    cfg.data = isObj && isStringify ? qs.stringify(data) : data;
  } else {
    throw new Error(`不存在此请求方法：${method}`);
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
  method: string,
  url: string,
  data: any,
  customCfg?: CustomRequestConfig,
  othersCfg?: AxiosRequestConfig,
  max = customCfg?.reconnectMax ?? defaultCustomCfg.reconnectMax
): Promise<T> {
  customCfg = customCfg ? Object.assign({}, defaultCustomCfg, customCfg) : defaultCustomCfg;
  const reconnectMax = customCfg.reconnectMax!;
  return fetch(method, url, data, customCfg as GetRequired<CustomRequestConfig>, othersCfg).catch(err => {
    if (axios.isCancel(err) || max <= 1) {
      return Promise.reject(err);
    } else {
      console.warn(`接口请求失败，尝试第${reconnectMax - max + 1}次重新请求`);
      http(method, url, data, customCfg, othersCfg, max - 1);
    }
  });
}

export default http;

/**
 * 取消请求
 * @returns
 */
export function cancelHttp() {
  if (!source.token._listeners?.length) return;
  // source.cancel("请求已被取消"); // 会取消请求栈内的所有请求
  source.cancel(); // 会取消请求栈内的所有请求
  source = axios.CancelToken.source();
  showToast("请求已被取消");
}
