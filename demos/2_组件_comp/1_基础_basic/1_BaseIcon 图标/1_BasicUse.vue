<!-- summary
  属性可设置：name（图标类型）、size（图标大小）、to（跳转链接，等同于 router.push(to)）
-->
<template>
  <div class="f-fs-fs-w">
    <BaseIcon />
    <BaseIcon name="CirclePlus" />
    <BaseIcon size="2em" />
    <BaseIcon name="Link" to="/" />
  </div>
</template>
<style lang="scss" scoped>
.base-icon {
  margin: $gap-half;
}
</style>
