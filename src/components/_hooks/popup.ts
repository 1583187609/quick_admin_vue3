import { inject } from "vue";
import { ClosePopupInject, OpenPopupInject } from "@/vite-env";

// 全局公用弹窗
export default () => {
  const openPopup = inject<OpenPopupInject>("openPopup");
  const closePopup = inject<ClosePopupInject>("closePopup");
  return { openPopup, closePopup };
};
