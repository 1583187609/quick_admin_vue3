import { CommonObj, PopupType } from "@/core/_types";
import { defineAsyncComponent } from "vue";
import { ElMessage } from "element-plus";
import { usePopup } from "@/core/hooks";

// PopupAttrs 为 el-dialog 或 el-drawer的属性，外加：confirm（确认方法）、cancel（取消方法）
interface PopupAttrs {
  [key: string]: any;
}

/**
 * 全局弹窗映射（支持两种写法：对象、函数）
 */
export const commonPopupMap: CommonObj = {
  // 对象示例
  // AddSku: {
  //   component: defineAsyncComponent(() => import("@/components/add-sku/index.vue")),
  //   configMap(props: AddSkuProps) {
  //     const addSkuTitleMap = { 1: "编辑需预约的商品", 2: "编辑需支付的商品" };
  //     const { isRaffle, authType = 1 } = props;
  //     const title = !isRaffle ? "选择参加活动的商品" : addSkuTitleMap[authType] ?? "";
  //     return {
  //       popup: { title },
  //       props,
  //       // popupType: 'dialog',
  //     };
  //   },
  // },
  ChooseMedia: {
    component: defineAsyncComponent(() => import("./_components/ChooseMedia.vue")),
    // 配置类型
    configMap: {
      // 选择所有类型
      all: {
        popup: {
          title: "选择媒体（图片、音频、视频）",
          onConfirm: () => ElMessage.info("点击了ChooseMedia的onConfirm"),
        },
        props: { type: "all" },
        // popupType: 'dialog',
      },
      // 选择图片
      image: {
        popup: {
          title: "选择图片",
          onConfirm: () => ElMessage.info("点击了ChooseMedia的onConfirm"),
        },
        props: { type: "image" },
      },
      // 选择音频
      audio: {
        popup: {
          title: "选择音频",
          onConfirm: () => ElMessage.info("点击了ChooseMedia的onConfirm"),
        },
        props: { type: "audio" },
      },
      // 选择视频
      video: {
        popup: {
          title: "选择视频",
          onConfirm: () => ElMessage.info("点击了ChooseMedia的onConfirm"),
        },
        props: { type: "video" },
      },
    },
  },
};

export type GlobalPopupName = keyof typeof commonPopupMap;

// 全局公用弹窗
export default () => {
  const { openPopup } = usePopup();
  /**
   * 根据名称打开弹窗
   * @param name 弹窗名称
   * @param type 弹窗配置类型
   * @notice 通用弹窗一般就那几种，故不再提供其他参数来进行属性覆盖设置
   */
  return (globalPopup: GlobalPopupName | PopupAttrs, type: string | CommonObj = {}, popType?: PopupType) => {
    let popupName = "";
    let popupAttrs: CommonObj = {};
    if (typeof globalPopup === "string") {
      popupName = globalPopup;
    } else if (typeof globalPopup === "object" && globalPopup !== null) {
      const { name, ...popup } = globalPopup;
      if (!name) throw new Error(`name必传`);
      popupName = name;
      popupAttrs = popup;
    }
    const currPopup = commonPopupMap[popupName];
    if (!currPopup) throw new Error(`不存在此弹窗名称：${popupName}`);
    const { component, configMap } = currPopup;
    const t = typeof configMap;
    let config: CommonObj = {};
    if (t === "object" && t !== null) {
      if (typeof type !== "string") throw new Error(`type应为 ${Object.keys(configMap).join(", ")} 类型之一`);
      if (!configMap[type as string]) throw new Error(`不存在此弹窗类型：${type}`);
      config = configMap[type as string];
    } else if (t === "function") {
      // type && 是为了排除 type 为 null 的情况
      if (type && typeof type !== "object") throw new Error(`传入的组件props应为object类型`);
      config = configMap(type as CommonObj);
    } else {
      throw new Error(`暂不支持此类型：${t}`);
    }
    const { popup, props, popupType = popType } = config;
    openPopup({ ...popup, ...popupAttrs }, [component, props], popupType);
  };
};
