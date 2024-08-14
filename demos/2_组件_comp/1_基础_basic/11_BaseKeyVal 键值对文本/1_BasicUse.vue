<!-- summary
  键值对文本
  @notice {warning} 后续可能会移除这个组件
-->
<template>
  <div class="f-fs-fs-w">
    <BaseKeyVal class="item f-1"/>
    <BaseKeyVal class="item f-1" label="姓名" icon="User"/>
    <BaseKeyVal class="item f-1" label="性别"/>
    <BaseKeyVal class="item f-1" label="年龄" labelWidth="4em"/>
    <BaseKeyVal class="item f-1" label="籍贯" line="1" />
    <BaseKeyVal class="item f-1" label="状态" popover="启用状态"/>
    <BaseKeyVal class="item f-1" label="电话" value="15312212312"/>
    <!-- 每列三个，补充两个空的，让样式对齐 -->
    <div class="item f-1 f-empty" v-for="(item,ind) in 2" :key="ind"></div>
  </div>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.item{
  margin: $gap-half;
  flex-basis: 30%;
}
</style>