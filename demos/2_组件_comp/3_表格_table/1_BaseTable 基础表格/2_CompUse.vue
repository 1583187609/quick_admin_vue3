<!-- summary 组件用法
内置组件
内嵌组件
-->
<template>
  <BaseTable :cols="cols" :data="rows" />
</template>
<script lang="ts" setup>
const cols = [
  { prop: "user_info", label: "用户信息", type: "UserInfo", minWidth: 240 },
  { prop: "avatar", label: "头像", minWidth: 120, type: "BaseImg" },
  { prop: "ip", label: "IP地址", minWidth: 100 },
  { prop: "phone", label: "电话", minWidth: 100 },
  { prop: "remark", label: "备注", minWidth: 100 },
];

const rows = [
  { id: 1, zy: "大家看到", xb: 0, nc: "昵称1", nl: 25, zt: 0 },
  { id: 2, zy: "大家看到", xb: 1, nc: "昵称2", nl: 32, zt: 1 },
  { id: 2, zy: "大家看到", xb: 2, nc: "昵称3", nl: 18, zt: 0 },
];
</script>
<style lang="scss" scoped></style>
