<!-- summary 基础用法
  同ElementPlus用法保持一致
-->
<template>
  <div class="f-fs-fs-w">
    <BaseBtn />
    <BaseBtn type="success" :icon="CirclePlus">新增</BaseBtn>
    <BaseBtn type="sucess" :icon="Edit">编辑</BaseBtn>
    <BaseBtn type="danger" :icon="Remove">删除</BaseBtn>
    <BaseBtn type="info" :icon="View">详情</BaseBtn>
    <BaseBtn type="primary" :icon="Top" @click="openPopup('导入', [CommonImport, {}])">导入</BaseBtn>
    <BaseBtn type="warning" :icon="Link" @click="router.push('/')" link>前往首页</BaseBtn>
  </div>
</template>
<script lang="ts" setup>
import { CirclePlus, Edit, Link, Remove, Top, View } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { usePopup } from "@/hooks";
import CommonImport from "@/core/components/crud/BaseCrud/_components/CommonImport.vue";

const { openPopup } = usePopup();
const router = useRouter();
</script>
<style lang="scss" scoped>
.base-btn {
  margin: 0 $gap $gap 0;
}
</style>
