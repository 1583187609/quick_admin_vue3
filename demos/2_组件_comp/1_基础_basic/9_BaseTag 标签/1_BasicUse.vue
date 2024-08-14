<template>
  <BaseTag />
  <BaseTag name="RoleType" value="0" />
  <BaseTag name="RoleType" value="0" pureText />
  <BaseTag name="RoleType" value="0" count="10" />
  <BaseTag :map="typeMap" />
  <BaseTag :map="classifyMap" />
</template>
<script lang="ts" setup>
const typeMap = {
  0: "类型1",
  1: "类型2",
};
const classifyMap = {
  0: {
    text: "类目1",
    attrs: {
      type: "primary",
    },
  },
  1: {
    text: "类目2",
    attrs: {
      type: "warning",
    },
  },
};
</script>
<style lang="scss" scoped>
.base-tag {
  margin: $gap-half;
}
</style>
