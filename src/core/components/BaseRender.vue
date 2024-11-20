<!-- summary
描述：渲染内容元素
-->
<template>
  <!-- 如果是引入的组件或者是虚拟dom -->
  <component :is="data" v-bind="$attrs" v-if="dataType === 'Object' && ((data as RenderVue).setup || isVNode(data))" />
  <!-- 如果是数组（创建虚拟DOM的参数 -->
  <component :is="h(...(data as HArgs))" v-else-if="dataType === 'Array'" />
  <!-- 如果是基本数据类型 -->
  <template v-else>{{ data }}</template>
</template>
<script lang="ts" setup>
// h函数传参规则见：https://cn.vuejs.org/api/render-function.html#h
import { RendererElement, RendererNode, VNode, isVNode, h, computed, useAttrs } from "vue";
import type { Component } from "vue";
import { devErrorTips, typeOf } from "@/core/utils";
import { BaseDataType } from "../vite-env";

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

const $attrs = useAttrs();
const props = withDefaults(
  defineProps<{
    data?: BaseRenderData;
  }>(),
  {
    data: devErrorTips("数据空空") as any,
  }
);
const dataType = computed(() => typeOf(props.data));
</script>
<style lang="scss" scoped></style>
