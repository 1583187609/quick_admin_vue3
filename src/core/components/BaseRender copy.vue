<!-- summary
描述：渲染内容元素，支持渲染html字符串
-->
<template>
  <!-- 如果是引入的组件或者是虚拟dom -->
  <component
    :is="renderData"
    v-bind="$attrs"
    v-if="dataType === 'Object' && ((renderData as RenderVue).setup || isVNode(renderData))"
  />
  <!-- 如果是数组（创建虚拟DOM的参数 -->
  <component :is="h(...(renderData as HArgs))" v-bind="$attrs" v-else-if="dataType === 'Array'" />
  <!-- 如果是基本数据类型 -->
  <template v-else>{{ renderData }}</template>
</template>
<script lang="ts" setup>
// h函数传参规则见：https://cn.vuejs.org/api/render-function.html#h
import { RendererElement, RendererNode, VNode, isVNode, h, computed, useAttrs } from "vue";
import type { Component } from "vue";
import { typeOf } from "@/core/utils";
import { BaseDataType } from "@/core/_types";

//虚拟dom，即 h 函数返回的对象
export type VirtualDomProps = VNode<RendererNode, RendererElement, { [key: string]: any }>;

// 直接导入的vue文件
export interface ImportVue {
  name: string;
  render: (_ctx, _cache, $props, $setup, $data, $options) => any;
  setup: (__props, { expose }) => any;
  __file: string;
  __hmrId: string;
  __name: string;
  __scopeId: string;
}
// 通过 defineAsyncComponent 导入的vue文件
export interface AsyncImportVue {
  name: string;
  setup: () => any;
  __asyncLoader: () => any;
  __asyncResolved: () => any;
}

// 直接引入的vue组件或通过defineAsyncComponent引入的异步组件
export type RenderVue = ImportVue | AsyncImportVue;

type Children = string | number | boolean | null | VNode | Children[];

type Slot = () => Children;

type Slots = { [name: string]: Slot };

type HType = string | Component;
type HProps = Object | null;
type HChildren = Children | Slot | Slots;

export type SlotsType = Slot | Slots;
export type HArgs = [HType, HProps?, HChildren?]; //h函数的参数

// 渲染组件的类型
export type BaseRenderComponentType =
  | RenderVue //引入的Vue文件
  | HArgs //h函数的参数
  | VirtualDomProps;

//可支持字符串、h函数生成的虚拟dom
export type BaseRenderData =
  | BaseDataType //基础数据类型
  | BaseRenderComponentType;

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    renderData?: BaseRenderData;
  }>(),
  {}
);
const dataType = computed(() => typeOf(props.renderData));

// 暂不考虑双向绑定，在弹窗表单中不应该再使用vModel用法（解耦，让逻辑层次清晰，各自组件干各自的事情）
// const $attrs = useAttrs();
// const newAttrs = ref({});
// const dataType = computed(() => {
//   const { renderData } = props;
//   const t = typeOf(renderData);
//   if (t === "Array") {
//     const { vModel } = renderData[1];
//     if (vModel) {
//       newAttrs.value = {
//         ...$attrs,
//         modelValue: vModel,
//         // onUpdateModelValue() {
//         //   console.log("执行了onUpdateModelValue----------");
//         // },
//       };
//     }
//   } else {
//     newAttrs.value = $attrs;
//   }
//   return t;
// });
</script>
<style lang="scss" scoped></style>
