// import { useSlots } from "vue";
import * as Icons from "@element-plus/icons-vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { getUserInfo, typeOf } from "@/components/_utils";
import { btnsMap } from "@/components/BaseBtn";
import cssVars from "@/assets/styles/_var.module.scss";
import { CommonObj } from "@/vite-env";
import { BaseBtnType, BtnItem, BtnName, BtnFn, BtnAttrs } from "./_types";
import { FilterAuthItem } from "@/components/crud/BaseCrud/_types";
import { PopconfirmAttrs, PopconfirmType } from "../_types";
import _ from "lodash";

const { merge, upperFirst } = _;

/**
 * 获取popconfirm的属性对象
 * @param {string | boolean | PopconfirmAttrs} popconfirm
 * @param {string} btnText 按钮文字
 */
function getPopconfirmAttrs(popconfirm: PopconfirmType, btnObj: BtnItem): PopconfirmAttrs {
  const { btnText, attrs = {} } = btnObj;
  const title = `确认${btnText}吗？`;
  const t = typeOf(popconfirm);
  if (t === "String") return { title: popconfirm as string };
  if (t === "Object") return merge({ title }, popconfirm);
  if (popconfirm === true) {
    const { type } = attrs;
    return {
      title,
      iconColor: cssVars["color" + upperFirst(type)],
      confirmButtonType: type,
    };
  }
  console.error(`暂未处理此种情况：${t}`, popconfirm);
  return { title: "~error~", icon: CircleCloseFilled, iconColor: "#f56c6c" };
}

/**
 * 根据按钮名或按钮对象获取按钮对象
 * @param {string | object | Function} btn 按钮名或按钮对象或方法函数
 * @param {CommonObj} baseBtnAttrs  额外添加的属性，用来覆盖
 */
export function getBtnObj(btn: BaseBtnType, row?: CommonObj, baseBtnAttrs?: { [key: string]: BtnAttrs }): BtnItem {
  const t = typeOf(btn);
  // const $slots = useSlots();
  let btnObj: BtnItem = { name: "" };
  if (t === "String") {
    const targetBtn = btnsMap[btn as BtnName] || Object.assign({}, btnsMap.empty, { btnText: btn });
    //icon 经过 JSON.parse(JSON.stringify())之后，重新渲染时会报错，故做此处理
    const { icon } = targetBtn.attrs || {};
    btnObj = JSON.parse(JSON.stringify(targetBtn));
    btnObj!.attrs!.icon = icon;
  } else if (t === "Object") {
    const { name } = btn as BtnItem;
    btnObj = merge({}, btnsMap[name as string], btn);
    if (btnObj.btnText === undefined) {
      // btnObj.btnText = $slots.default?.()?.[0]?.children as string;
      btnObj.btnText = "空按钮";
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
      if (disabled && getUserInfo()?.type === code) {
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
  if (baseBtnAttrs) {
    const { attrs, ...rest } = baseBtnAttrs;
    merge(btnObj.attrs, attrs);
    if (rest) {
      for (const key in rest) {
        if (rest[key] === undefined) continue;
        btnObj[key] = rest[key];
      }
    }
  }
  return btnObj;
}
