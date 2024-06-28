<!-- 页面-简介 -->
<template>
  <template v-if="typeof data === 'object'">
    <!-- 如果是虚拟dom -->
    <component :is="data" v-if="isVNode(data)"></component>
    <!-- 如果是引入的组件 -->
    <template v-else>
      <component :is="data" v-if="data.render"></component>
      <component v-bind="data.attrs" :is="data.component" v-else>
        <template v-if="typeof data?.slots === 'string'">
          {{ data?.slots }}
        </template>
        <template #[key] v-for="(val, key) in data?.slots" :key="key">
          <BaseRender :data="(val as string)" />
        </template>
      </component>
    </template>
  </template>
  <!-- 如果是基本数据类型 -->
  <template v-else>{{ data }}</template>
</template>
<script lang="ts" setup>
import { RendererElement, RendererNode, VNode, isVNode } from "vue";
import { devErrorTips, emptyVals } from "@/utils";
import { CommonObj } from "@/vite-env";
//虚拟dom，即 h 函数返回的对象
export type VirtualDomProps = VNode<RendererNode, RendererElement, { [key: string]: any }>;
export type SlotsType =
  | string
  | {
      [key: string]: string | RenderComponent;
    };

export interface RenderVue {
  render: any;
  setup: any;
  [key: string]: any;
}

export interface RenderComponent {
  component: any;
  attrs?: CommonObj;
  slots?: SlotsType;
}

export type BaseRenderData = string | RenderVue | RenderComponent | VirtualDomProps; //可支持字符串、RenderComponent、h函数生成的虚拟dom

const props = withDefaults(
  defineProps<{
    data?: BaseRenderData;
  }>(),
  {
    data: devErrorTips("数据空空") as any,
  }
);
</script>
<style lang="scss" scoped></style>
