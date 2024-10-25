<!-- summary
提供了两个弹出层dialog和drawer。默认dialog，可在全局配置中进行配置
-->
<template>
  <BasicPopup>
    <Layout />
  </BasicPopup>
</template>
<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import BasicPopup from "@/core/BasicPopup/Index.vue";

const { Layout } = DefaultTheme;
</script>
