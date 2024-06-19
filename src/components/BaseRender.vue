<!-- 页面-简介 -->
<template>
  <!-- <template v-if="!emptyVals.includes(data)"> -->
  <template v-if="data !== undefined && data !== null">
    <!-- 如果是基本数据类型 -->
    <template v-if="!(typeof data === 'object')">{{ data }}</template>
    <!-- 如果是虚拟dom -->
    <component :is="data" v-else-if="isVNode(data)"></component>
    <!-- 如果是引入的组件 -->
    <component v-bind="data.attrs" :is="data.component" v-else>
      <template v-if="typeof data.attrs?.slots === 'string'">
        {{ data.attrs?.slots }}
      </template>
      <template #[key] v-for="(val, key) in data.attrs?.slots" :key="key">
        <BaseRender :data="(val as string)" />
      </template>
    </component>
  </template>
</template>
<script lang="ts" setup>
import { RendererElement, RendererNode, VNode, isVNode } from "vue";
import { devErrorTips, emptyVals } from "@/utils";
//虚拟dom，即 h 函数返回的对象
export type VirtualDomProps = VNode<RendererNode, RendererElement, { [key: string]: any }>;
export interface RenderComponent {
  component: any;
  attrs?: {
    slots?:
      | string
      | {
          [key: string]: string | RenderComponent;
        };
    [key: string]: any;
  };
}
export type BaseRenderData = string | RenderComponent | VirtualDomProps; //可支持字符串、RenderComponent、h函数生成的虚拟dom

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
