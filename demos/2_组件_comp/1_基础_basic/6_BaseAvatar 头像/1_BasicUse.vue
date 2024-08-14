<!-- summary -->
<template>
    <BaseAvatar />
    <BaseAvatar :gender="0" />
    <BaseAvatar :gender="1" />
    <BaseAvatar :src="url" to="/"/>
    <BaseAvatar :src="url" round/>
    <BaseAvatar :src="url" size="60px"/>
    <BaseAvatar :src="url" height="60px" width="100px"/>
</template>
<script lang="ts" setup>
const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';
</script>
<style lang="scss" scoped>
.base-avatar{
  margin: $gap-half;
}
</style>