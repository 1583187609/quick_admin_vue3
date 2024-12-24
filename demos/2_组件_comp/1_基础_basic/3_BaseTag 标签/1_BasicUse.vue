<!-- summary 基础用法
  设置name指定字典名称（为了增加变量名称辨识度，统一增加`D_`前缀），默认为D_EnableStatus。
  设置value指定字典的值。
  设置pureText，以纯文本展示。
  设置count，显示该状态下的徽章数值。
-->
<template>
  <div class="f-fs-fs-w">
    <BaseTag />
    <BaseTag>启/禁用</BaseTag>
    <BaseTag name="D_RoleType" value="0" />
    <BaseTag name="D_RoleType" value="0" pureText />
    <BaseTag name="D_RoleType" value="0" count="10" />
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.base-tag {
  margin: $gap-half;
}
</style>
