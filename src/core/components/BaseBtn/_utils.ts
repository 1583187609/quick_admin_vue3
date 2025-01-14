import * as Icons from "@element-plus/icons-vue";
import { getSysThemeColor, getUserInfo, typeOf } from "@/core/utils";
import { btnsMap } from "@/core/components/BaseBtn";
import { CommonObj } from "@/core/_types";
import { BaseBtnType, BtnItem, EndBtnItem, BtnName, BtnFn, BtnAttrs } from "./_types";
import { FilterAuthItem } from "@/core/components/crud/BaseCrud/_types";
import { PopconfirmAttrs, PopconfirmType } from "../_types";
import { needParam } from "@/utils";
import _ from "lodash";

const { merge } = _;

/**
 * 获取popconfirm的属性对象
 * @param {string | boolean | PopconfirmAttrs} popconfirm
 * @param {string} text 按钮文字
 */
export function getPopconfirmAttrs(popconfirm: PopconfirmType, btnObj: BtnItem): PopconfirmAttrs {
  const { text, attrs = {} } = btnObj;
  const { type } = attrs;
  const btnAttrs = { iconColor: getSysThemeColor(type), confirmButtonType: type };
  const title = `确认${text}吗？`;
  const t = typeOf(popconfirm);
  if (t === "String") return { title: popconfirm as string, ...btnAttrs };
  if (t === "Object") return { title, ...btnAttrs, ...popconfirm };
  if (popconfirm === true) return { title, ...btnAttrs };
  throw new Error(`暂未处理此种情况：${t}`, popconfirm);
}

/**
 * 根据按钮名或按钮对象获取按钮对象
 * @param {string | object | Function} btn 按钮名或按钮对象或方法函数
 * @param {CommonObj} baseBtnAttrs  额外添加的属性，用来覆盖
 * @param {boolean} isStand 是否是标准的按钮属性
 */
export function getBtnObj(
  btn: BaseBtnType,
  row?: CommonObj,
  baseBtnAttrs?: { [key: string]: BtnAttrs },
  isStand = false
): EndBtnItem {
  const t = typeOf(btn);
  let btnObj: BtnItem = { name: "" };
  if (t === "String") {
    const targetBtn = btnsMap[btn as BtnName];
    if (!targetBtn) return { name: btn as string };
    //icon 经过 JSON.parse(JSON.stringify())之后，会删除掉函数等属性，重新渲染时会报错，故做如下处理
    const { icon } = targetBtn.attrs || {};
    btnObj = JSON.parse(JSON.stringify(targetBtn));
    if (icon) btnObj!.attrs!.icon = icon;
  } else if (t === "Object") {
    if (isStand) return btn as EndBtnItem;
    const { name = needParam() } = btn as BtnItem;
    btnObj = merge({}, btnsMap[name as string], btn);
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
        if (attrs) {
          attrs.disabled = true;
        } else {
          btnObj.attrs = { disabled: true };
        }
      }
      return code;
    });
  }
  if (popconfirm) {
    btnObj.popconfirm = getPopconfirmAttrs(popconfirm, btnObj as BtnItem);
  }
  if (attrs) {
    const { icon } = attrs;
    if (icon && typeOf(icon) === "String") {
      attrs.icon = Icons[icon as keyof typeof Icons];
    }
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
  if (btnObj.handleClickType === undefined) {
    btnObj.handleClickType = "common";
  }
  return btnObj;
}

// export function getBtnObjOld(btn: BaseBtnType, row?: CommonObj): BtnItem {
//   const t = typeOf(btn);
//   // const $slots = useSlots();
//   let btnObj: BtnItem = { name: "" };
//   if (t === "String") {
//     const targetBtn = btnsMap[btn as BtnName] || Object.assign({}, btnsMap.empty, { text: btn });
//     //icon 经过 JSON.parse(JSON.stringify())之后，重新渲染时会报错，故做此处理
//     const { icon } = targetBtn.attrs || {};
//     btnObj = JSON.parse(JSON.stringify(targetBtn));
//     btnObj!.attrs!.icon = icon;
//   } else if (t === "Object") {
//     const { name } = btn as BtnItem;
//     btnObj = merge({}, btnsMap[name as string], btn);
//     if (btnObj.text === undefined) {
//       // btnObj.text = $slots.default?.()?.[0]?.children as string;
//       btnObj.text = "空按钮";
//     }
//   } else if (t === "Function") {
//     btnObj = getBtnObj((btn as BtnFn)(row as CommonObj), row);
//   }
//   const { auth, attrs, popconfirm } = btnObj;
//   if (auth?.length) {
//     btnObj.auth = auth.map((it: FilterAuthItem) => {
//       if (typeof it !== "object") return it;
//       const { disabled, code } = it;
//       //感觉没必要加上 && getUserInfo().type===code，但暂时先这么写，后面再思考
//       if (disabled && getUserInfo().type === code) {
//         attrs ? (attrs.disabled = true) : (btnObj.attrs = { disabled: true });
//       }
//       return code;
//     });
//   }
//   if (popconfirm) {
//     btnObj.popconfirm = getPopconfirmAttrs(popconfirm, btnObj as BtnItem);
//   }
//   const { icon } = attrs || {};
//   if (icon && typeOf(icon) === "String") {
//     const currIcon = Icons[icon as keyof typeof Icons];
//     attrs ? (attrs.icon = currIcon) : (btnObj.attrs = { icon: currIcon });
//   }
//   return btnObj;
// }
