import { CommonObj, PopupType } from "@/vite-env";
import { defineAsyncComponent } from "vue";
import { ElMessage } from "element-plus";
import { usePopup } from "@/core/_hooks";

export const compMap: CommonObj = {
  ChooseMedia: {
    component: defineAsyncComponent(() => import("./_components/ChooseMedia.vue")),
    popupAttrs: {
      onConfirm: () => ElMessage.info("点击了ChooseMedia的onConfirm"),
    },
    // compAttrs: {},
    // popupType: true,
  },
};

export type GlobalPopupName = "ChooseMedia";

// 全局公用弹窗
export default () => {
  const { openPopup, closePopup } = usePopup();
  // 根据名称打开弹窗
  return (type: GlobalPopupName, _popupAttrs?: any, _compAttrs?: any, _popupType?: PopupType) => {
    const comp = compMap[type];
    if (!comp) throw new Error(`不存在此弹窗：${type}`);
    const { popupAttrs, compAttrs, component, popupType } = comp;
    openPopup(_popupAttrs ?? popupAttrs, [component, _compAttrs ?? compAttrs], _popupType ?? popupType);
  };
};
