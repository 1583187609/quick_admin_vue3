import { defineConfig, loadEnv } from "vite";
import getViteConfig from "./plugins";

// https://vitejs.dev/config/
export default (cfg: any) => {
  const { mode, command } = cfg;
  const env = loadEnv(mode, process.cwd()); // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const apiMap = {
    "/api": env.VITE_APP_API_BASEURL,
    "/fuxi": "https://fanlichuan.gitee.io",
  };
  const viteConfig = getViteConfig(cfg, apiMap);
  return defineConfig(viteConfig);
};
