<!-- summary 基础用法
  默认为新增按钮，继承 el-button 属性，所以传入 el-button 的属性都是生效的。
-->
<template>
  <div class="f-fs-c-w">
    <BaseBtn tpl="add" />
    <BaseBtn tpl="add" type="success" :icon="CirclePlus">新增</BaseBtn>
    <BaseBtn tpl="add" type="success" :icon="Edit">编辑</BaseBtn>
    <BaseBtn tpl="add" type="danger" :icon="Remove">删除</BaseBtn>
    <BaseBtn tpl="add" type="info" :icon="View">详情</BaseBtn>
    <BaseBtn tpl="add" type="primary" :icon="Top" @click="openPopup('导入', [CommonImport, {}])">导入</BaseBtn>
    <BaseBtn tpl="add" type="warning" :icon="Link" @click="router.push('/')" link>前往首页</BaseBtn>
  </div>
</template>
<script lang="ts" setup>
import { CirclePlus, Edit, Link, Remove, Top, View } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { usePopup } from "@/hooks";
import CommonImport from "@/core/components/BaseBtn/_components/CommonImport.vue";

const { openPopup } = usePopup();
const router = useRouter();
</script>
<style lang="scss" scoped>
.base-btn {
  margin: $gap-qtr;
}
</style>
