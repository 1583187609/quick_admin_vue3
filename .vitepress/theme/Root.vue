<!-- summary
提供了两个弹出层dialog和drawer。默认dialog，可在全局配置中进行配置
-->
<template>
  <el-config-provider :size="defaultCommonSize" :locale="zhCn">
    <BasicSkins>
      <BasicPopup>
        <Layout />
      </BasicPopup>
    </BasicSkins>
  </el-config-provider>
</template>
<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import BasicPopup from "@/core/components/BasicPopup/Index.vue";
import { defaultCommonSize } from "@/core/config";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import BasicSkins from "@/core/components/BasicSkins/Index.vue";

const { Layout } = DefaultTheme;
</script>

<style lang="scss"></style>
