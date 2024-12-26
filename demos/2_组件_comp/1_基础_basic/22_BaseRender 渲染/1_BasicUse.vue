<!-- summary 基础用法
  了解本部分内容，有助于了解后续的插槽自定义内容。本质就是通过BaseRender进行解析的。
  支持基础数据类型，即：null, undefined, boolean, number, string。
  支持对象，即：引入的同步/异步Vue组件。
  支持数组，即：等同于`h(...args)`中的args。
  支持函数，即：h()。
-->
<template>
  <BaseRender renderData="红橙黄绿蓝靛紫" />
  <br />
  <BaseRender :renderData="ColorsText" />
  <br />
  <BaseRender :renderData="[ColorsText]" />
  <br />
  <BaseRender :renderData="[ColorsText, { text: '一二三四五六七' }]" />
  <br />
  <BaseRender :renderData="AsyncColorsText" />
  <br />
  <BaseRender :renderData="(h('div', { style: 'color: red' }), 'h函数渲染内容')" />
</template>
<script lang="ts" setup>
import { defineAsyncComponent, h } from "vue";
import ColorsText from "./_components/ColorsText.vue";
const AsyncColorsText = defineAsyncComponent(() => import("./_components/ColorsText.vue"));
</script>
<style lang="scss" scoped></style>
