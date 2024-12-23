<!-- summary 所有用法 -->
<template>
  <div class="f-fs-fs-w">
    <BaseBtn />
    <BaseBtn type="success" :icon="CirclePlus">新增</BaseBtn>
    <BaseBtn type="sucess" :icon="Edit">编辑</BaseBtn>
    <br />
    <BaseBtn tpl="detail" />
    <BaseBtn tpl="detail" to="/" />
    <br />
    <BaseBtn tpl="import" />
    <BaseBtn tpl="import" @click="ElMessage.info('点击了导入按钮，可以自定义点击逻辑')" handleClickType="custom" />
    <BaseBtn tpl="import" @click="ElMessage.info('点击了未采用防抖的导入按钮')" handleClickType="custom" :isDebounce="false" />
    <br />
    <BaseBtn tpl="delete" />
    <BaseBtn tpl="delete" :popconfirm="false" />
    <BaseBtn tpl="delete" popconfirm="删除后将XXX，确定删除吗？" />
    <BaseBtn tpl="delete" :popconfirm="{ title: '请再次确定要删除吗？', width: '400px' }" />
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { CirclePlus, Edit } from "@element-plus/icons-vue";
</script>
<style lang="scss" scoped>
.base-btn {
  margin: 0 $gap $gap 0;
}
</style>
