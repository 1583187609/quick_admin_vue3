/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "qs";
declare module "lodash";
declare module "element-plus";
declare module "file-saver";
declare module "sortablejs";
declare module "@wangeditor/editor-for-vue";
declare module "element-plus/dist/locale/zh-cn.mjs";
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// declare var window: Window & typeof globalThis;
// interface Window {
//   log: () => void;
//   error: () => void;
//   dir: () => void;
// }
