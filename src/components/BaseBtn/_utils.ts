import * as Icons from "@element-plus/icons-vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { getUserInfo, typeOf } from "@/components/_utils";
import { merge, upperFirst } from "lodash";
// import { useSlots } from "vue";
import btnsMap from ".";
import cssVars from "@/assets/styles/_var.module.scss";
import { CommonObj } from "@/vite-env";
import { PopconfirmAttrs, BaseBtnType, BtnItem, BtnName, BtnFn } from "./_types";
import { FilterAuthItem } from "@/components/crud/BaseCrud";

/**
 * 获取popconfirm的属性对象
 * @param popconfirm string boolean object
 * @param text string 按钮文字
 */
function getPopconfirmAttrs(popconfirm: string | boolean | CommonObj, btnObj: BtnItem): PopconfirmAttrs {
  const { text, attrs = {} } = btnObj;
  const title = `确认${text}？`;
  const t = typeOf(popconfirm);
  if (t === "String") {
    return { title: popconfirm as string };
  } else if (t === "Object") {
    return merge({ title }, popconfirm);
  } else if (popconfirm === true) {
    const { type } = attrs;
    return {
      title,
      iconColor: cssVars["color" + upperFirst(type)],
      confirmButtonType: type,
    };
  } else {
    console.error(`暂未处理此种情况：${t}`, popconfirm);
    return { title: "~error~", icon: CircleCloseFilled, iconColor: "#f56c6c" };
  }
}

/**
 * 根据按钮名或按钮对象获取按钮对象
 * @param btn string | object | function 按钮名或按钮对象或方法函数
 * @param addBtnAttrs CommonObj 额外添加的属性，用来覆盖
 */
export function getBtnObj(btn: BaseBtnType, row?: CommonObj, addBtnAttrs?: CommonObj): BtnItem {
  const t = typeOf(btn);
  // const $slots = useSlots();
  let btnObj: BtnItem = { name: "" };
  if (t === "String") {
    const targetBtn = btnsMap[btn as BtnName] || Object.assign({}, btnsMap.empty, { text: btn });
    //icon 经过 JSON.parse(JSON.stringify())之后，重新渲染时会报错，故做此处理
    const { icon } = targetBtn.attrs || {};
    btnObj = JSON.parse(JSON.stringify(targetBtn));
    btnObj!.attrs!.icon = icon;
  } else if (t === "Object") {
    const { name } = btn as BtnItem;
    btnObj = merge({}, btnsMap[name as string], btn);
    if (btnObj.text === undefined) {
      // btnObj.text = $slots.default?.()?.[0]?.children as string;
      btnObj.text = "空按钮";
    }
  } else if (t === "Function") {
    btnObj = getBtnObj((btn as BtnFn)(row as CommonObj), row);
  }
  const { auth, attrs, popconfirm } = btnObj;
  if (auth?.length) {
    btnObj.auth = auth.map((it: FilterAuthItem) => {
      if (typeof it !== "object") return it;
      const { disabled, code } = it;
      //感觉没必要加上 && getUserInfo().type===code，但暂时先这么写，后面再思考
      if (disabled && getUserInfo().type === code) {
        attrs ? (attrs.disabled = true) : (btnObj.attrs = { disabled: true });
      }
      return code;
    });
  }
  if (popconfirm) {
    btnObj.popconfirm = getPopconfirmAttrs(popconfirm, btnObj as BtnItem);
  }
  const { icon } = attrs || {};
  if (icon && typeOf(icon) === "String") {
    const currIcon = Icons[icon as keyof typeof Icons];
    attrs ? (attrs.icon = currIcon) : (btnObj.attrs = { icon: currIcon });
  }
  if (addBtnAttrs) merge(btnObj, addBtnAttrs);
  return btnObj;
}
