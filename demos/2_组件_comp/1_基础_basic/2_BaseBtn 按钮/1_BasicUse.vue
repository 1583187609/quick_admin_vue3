<!-- summary
  默认按钮，方便快速开发（占位，省去引入图标、保证样式风格统一等时间）。
  设置attrs属性覆盖默认样式。
  删除按钮，自带 popconfirm，可设置文本内容覆盖默认提示语，也可设置false来禁用功能。
  导入按钮，自带下载模板弹出层。
-->
<template>
  <div class="f-fs-fs-w">
    <BaseBtn />
    <BaseBtn text="按钮" />
    <BaseBtn name="add" />
    <BaseBtn name="edit" />
    <BaseBtn name="edit" :attrs="{ type: 'info' }" />
    <BaseBtn name="detail" to="/" />
    <BaseBtn name="import" />
    <BaseBtn name="import" @click="ElMessage.info('点击了导入按钮，可以自定义点击逻辑')" handleClickType="custom" />
    <BaseBtn name="delete" />
    <BaseBtn name="delete" :auth="[0]">删除（角色值为0可见）</BaseBtn>
    <BaseBtn name="delete" popconfirm="删除后将不能进行恢复，确定删除吗？" />
    <BaseBtn name="delete" :popconfirm="false" />
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
</script>
<style lang="scss" scoped>
.base-btn {
  margin: $gap-half;
}
</style>
