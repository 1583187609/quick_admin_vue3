<!-- summary
  集成了样式（颜色+图标+位置）、权限、路由跳转、气泡确认框（popconfirm）等功能。
-->
<template>
  <div class="part">
    <div>基础用法 & 属性覆盖</div>
    <div class="f-fs-fs-w">
      <BaseBtn />
      <BaseBtn>按钮</BaseBtn>
      <BaseBtn text="按钮" />
      <BaseBtn name="add" />
      <BaseBtn name="edit" />
      <BaseBtn name="edit" :attrs="{ type: 'info', text: '$编辑$' }" />
    </div>
  </div>
  <div class="part">
    <div>快捷属性 & 默认逻辑</div>
    <div class="f-fs-fs-w">
      <BaseBtn name="detail" />
      <BaseBtn name="detail" to="/" />
      <BaseBtn name="import" />
      <BaseBtn name="import" @click="ElMessage.info('点击了导入按钮，可以自定义点击逻辑')" handleClickType="custom" />
      <BaseBtn name="delete" />
      <BaseBtn name="delete" :auth="[0]">删除（角色值为0可见）</BaseBtn>
      <BaseBtn name="delete" popconfirm="删除后将不能进行恢复，确定删除吗？" />
      <BaseBtn name="delete" :popconfirm="false" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
</script>
<style lang="scss" scoped>
.base-btn {
  margin: $gap-half;
}
.part {
  &:not(:last-child) {
    margin-bottom: $gap;
  }
}
</style>
