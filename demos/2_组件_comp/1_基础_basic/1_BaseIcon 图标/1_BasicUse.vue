<!-- summary
    默认图标，方便快速开发（占位，省去引入图标再使用的时间），并可设置名称、大小属性覆盖。
-->
<template>
    <div class="f-fs-fs-w">
        <BaseIcon />
        <BaseIcon name="CirclePlus"/>
        <BaseIcon name="CirclePlusFilled" size="2em"/>
    </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.base-icon{
    margin: $gap-half;
}
</style>