import { loadEnv } from "vite";
import getViteConfig, { getApiProxy } from "./vite-config";

// https://vitejs.dev/config/
export default (cfg: any) => {
  const { mode, command } = cfg;
  // const isDev = mode === "dev";
  const viteConfig = getViteConfig(cfg);
  // if (isDev) {
  const env = loadEnv(mode, process.cwd()); // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const apiMap = {
    "/api": env.VITE_APP_API_BASEURL,
    "/git": "https://fanlichuan.gitee.io",
  };
  viteConfig.server.proxy = getApiProxy(apiMap);
  // }
  return viteConfig;
};
