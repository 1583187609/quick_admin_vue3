/**
 * @link 取消请求参考链接：https://blog.csdn.net/lu2925028830/article/details/126296846
 */

import qs from "qs";
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import { typeOf, isDev } from "@/utils";
import { showLoading, hideLoading, showToast } from "./_utils";
import { GetRequired } from "@/vite-env";
let source: CancelTokenSource = axios.CancelToken.source();

// 可选的自定义请求配置
export interface CustomRequestConfig {
  isStringify?: boolean; // 是否字符串序列化
  loadEnable?: boolean; // 是否启用loading
  toastEnable?: boolean; // 当返回状态码不为成功时，是否进行弹窗提示
  maxCount?: number; // 请求失败后的最大尝试重新请求次数
}

export interface NewAxiosRequestConfig extends AxiosRequestConfig {
  customConfig: GetRequired<CustomRequestConfig>;
}

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

const defaultCustomCfg = {
  isStringify: false, //对于post请求的参数是否字符串序列化
  loadEnable: true, // 是否启用全局loading
  toastEnable: true, // 对于code非成功值的提示信息是否要进行toast提示
  maxCount: 1, //失败后重新请求的最大尝试次数
};

const statusMap: Record<number, string> = {
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
    const { loadEnable } = config.customConfig as GetRequired<CustomRequestConfig>;
    loadEnable && showLoading();
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
    const { data: resData, status, config } = res;
    const { loadEnable, toastEnable } = config.customConfig as GetRequired<CustomRequestConfig>;
    const { code, data, msg } = resData;
    loadEnable && hideLoading();
    if (status !== 200) return Promise.reject(showToast(statusMap[status] || "请求失败"));
    if (code === 0) return data;
    toastEnable && showToast(msg);
    console.error("请求错误：", msg);
    return Promise.reject(msg);
  },
  (err: AxiosError) => {
    if (axios.isCancel(err)) return Promise.reject(err);
    const { message, config } = err;
    const { loadEnable, toastEnable } = config.customConfig as GetRequired<CustomRequestConfig>;
    loadEnable && hideLoading();
    if (message === "Network Error") {
      showToast(isDev ? "Mock服务端错误！" : "网络错误", "error");
    } else if (message === "Request failed with status code 404") {
      console.error("接口不存在：" + config?.url);
      showToast("接口不存在", "error");
    } else {
      console.error("响应错误：", err);
      showToast("网络错误", "error");
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
 * @param {Object} customCfg 自定义的携带在axios config上的属性
 * @param {Object} othersCfg 除上述三个axios配置参数外，其余任意多个axios的标准参数
 * @returns
 */
function fetch(
  method = "get",
  url = "",
  data: any,
  customCfg: GetRequired<CustomRequestConfig>,
  othersCfg?: AxiosRequestConfig
): Promise<any> {
  method = method.toLowerCase();
  const cfg: NewAxiosRequestConfig = { url, method, customConfig: customCfg, cancelToken: source.token, ...othersCfg };
  if (["get"].includes(method)) {
    cfg.params = data;
  } else if (["post", "put", "patch", "delete"].includes(method)) {
    const isObj = typeOf(data) === "Object";
    const { isStringify } = customCfg;
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
 * @param {Object} customCfg 自定义的携带在axios config上的属性
 * @param {Object} othersCfg 除上述三个axios配置参数外，其余任意多个axios的标准参数
 * @param {number} max 请求失败后，最大重新请求次数
 * @returns
 */
function http<T,K>(
  method: string,
  url: string,
  data: T,
  customCfg?: CustomRequestConfig,
  othersCfg?: AxiosRequestConfig,
  max = customCfg?.maxCount ?? defaultCustomCfg.maxCount
): Promise<K> {
  customCfg = customCfg ? Object.assign({}, defaultCustomCfg, customCfg) : defaultCustomCfg;
  const maxCount = customCfg.maxCount!;
  // console.log(source.token._listeners, "source--------------");
  return fetch(method, url, data, customCfg as GetRequired<CustomRequestConfig>, othersCfg).catch(err => {
    if (axios.isCancel(err) || max <= 1) {
      Promise.reject(err);
    } else {
      console.warn(`接口请求失败，尝试第${maxCount - max + 1}次重新请求`);
      http(method, url, data, customCfg, othersCfg, max - 1);
    }
  });
  // return fetch(method, url, data, customCfg as GetRequired<CustomRequestConfig>, othersCfg);
}

export default http;
