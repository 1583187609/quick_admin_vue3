<!-- summary
@description 提供了两个弹出层dialog和drawer。默认dialog，可在全局配置中进行配置
-->
<template>
  <GlobalPopup>
    <Layout />
  </GlobalPopup>
</template>
<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import GlobalPopup from "@/components/GlobalPopup.vue";

const { Layout } = DefaultTheme;
</script>
