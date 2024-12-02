import { inject } from "vue";
import { ClosePopupInject, OpenPopupInject } from "@/core/_types";

// 全局公用弹窗
export default () => {
  const openPopup = inject<OpenPopupInject>("openPopup");
  const closePopup = inject<ClosePopupInject>("closePopup");
  return { openPopup, closePopup };
};
