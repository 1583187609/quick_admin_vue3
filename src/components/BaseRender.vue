<!-- 组件 - 渲染内容元素 -->
<template>
  <!-- 如果是引入的组件或者是虚拟dom -->
  <component :is="data" v-if="dataType === 'Object' && (data.render || isVNode(data))" />
  <!-- 如果是数组（创建虚拟DOM的参数 -->
  <component :is="h(...data)" v-else-if="dataType === 'Array'" />
  <!-- 如果是基本数据类型 -->
  <template v-else>{{ data }}</template>
</template>
<script lang="ts" setup>
// h函数传参规则见：https://cn.vuejs.org/api/render-function.html#h
import { RendererElement, RendererNode, VNode, isVNode, h, computed } from "vue";
import type { Component } from "vue";
import { devErrorTips, typeOf } from "@/components/_utils";
import { BaseDataType } from "../vite-env";

//虚拟dom，即 h 函数返回的对象
export type VirtualDomProps = VNode<RendererNode, RendererElement, { [key: string]: any }>;

export interface RenderVue {
  render: any;
  setup: any;
  [key: string]: any;
}

type Children = string | number | boolean | null | VNode | Children[];

type Slot = () => Children;

type Slots = { [name: string]: Slot };

type HType = string | Component;
type HProps = Object | null;
type HChildren = Children | Slot | Slots;

export type SlotsType = Slot | Slots;
export type HArgs = [HType, HProps?, HChildren?]; //h函数的参数

export type BaseRenderData =
  | BaseDataType //基础数据类型
  | RenderVue //引入的Vue文件
  | HArgs //h函数的参数
  | VirtualDomProps; //可支持字符串、h函数生成的虚拟dom、

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
