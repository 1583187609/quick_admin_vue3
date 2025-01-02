import { CommonObj } from "@/core/_types";
import { defineAsyncComponent } from "vue";
import { ElMessage } from "element-plus";
import { usePopup } from "@/core/hooks";
import { ChoolseMediaType } from "./_components/ChooseMedia.vue";
import { typeOf } from "@/utils";

export const commonPopupMap: CommonObj = {
  ChooseMedia: {
    component: defineAsyncComponent(() => import("./_components/ChooseMedia.vue")),
    // 配置类型
    configMap: {
      // 选择所有类型
      all: {
        popupAttrs: {
          title: "选择媒体（图片、音频、视频）",
          onConfirm: () => ElMessage.info("点击了ChooseMedia的onConfirm"),
        },
        compAttrs: {
          type: "all",
        },
        // popupType: 'dialog',
        // footerType: 'confirm'
      },
      // 选择图片
      image: {
        popupAttrs: {
          title: "选择图片",
          onConfirm: () => ElMessage.info("点击了ChooseMedia的onConfirm"),
        },
        compAttrs: {
          type: "image",
        },
        // popupType: 'dialog',
        // footerType: 'confirm'
      },
      // 选择音频
      audio: {
        popupAttrs: {
          title: "选择音频",
          onConfirm: () => ElMessage.info("点击了ChooseMedia的onConfirm"),
        },
        compAttrs: {
          type: "audio",
        },
        // popupType: 'dialog',
        // footerType: 'confirm'
      },
      // 选择视频
      video: {
        popupAttrs: {
          title: "选择视频",
          onConfirm: () => ElMessage.info("点击了ChooseMedia的onConfirm"),
        },
        compAttrs: {
          type: "video",
        },
        // popupType: 'dialog',
        // footerType: 'confirm'
      },
    },
  },
  // AddSku: {
  //   component: defineAsyncComponent(() => import("@/components/add-sku/index.vue")),
  //   configMap({ isRaffle, authType, onConfirm }) {
  //     return {
  //       popupAttrs: {
  //         title: !isRaffle ? "选择参加活动的商品" : authType == 1 ? "编辑需预约的商品" : authType == 2 ? "编辑需支付的商品" : "",
  //         onConfirm,
  //       },
  //       // compAttrs: {
  //       //   type: 'all',
  //       // },
  //       // popupType: 'dialog',
  //       // footerType: 'confirm'
  //     };
  //   },
  // },
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
  return (name: GlobalPopupName, type: string | CommonObj) => {
    const currPopup = commonPopupMap[name];
    if (!currPopup) throw new Error(`不存在此弹窗：${name}`);
    const { component, configMap } = currPopup;
    const t = typeOf(configMap);
    let config: CommonObj = {};
    if (t === "Object") {
      // if (typeOf(type) !== "String") throw new Error(`期望传入一个字符串类型，当前为：${JSON.stringify(type)}`);
      if (!configMap[type as string]) throw new Error(`不存在此配置类型：${type}`);
      config = configMap[type as string];
    } else if (t === "Function") {
      // if (typeOf(type) !== "Object") throw new Error(`期望传入一个对象类型，当前为：${type}`);
      config = configMap(type as CommonObj);
    }
    const { popupAttrs, compAttrs, popupType, footerType } = config;
    openPopup(popupAttrs, [component, compAttrs], popupType, footerType);
  };
};
