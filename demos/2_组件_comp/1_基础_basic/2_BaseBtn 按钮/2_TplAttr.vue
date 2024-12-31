<!-- summary 模板用法（非必须）
  写入tpl属性，即可拥有该类型按钮的所有特性。可传入其他el-button的属性，进行覆盖。也可传入tpl对象进行覆盖，两者效果等价。
-->
<template>
  <BaseBtn tpl="add" />
  <BaseBtn tpl="add" type="success">创建</BaseBtn>
  <BaseBtn :tpl="addTplInfo" />
  <br />
  <BaseBtn tpl="edit" />
  <BaseBtn tpl="edit" type="info" :icon="EditPen" disabled />
  <BaseBtn :tpl="editTplInfo" />
  <br />
  <BaseBtn tpl="import" />
</template>
<script lang="ts" setup>
import { EditPen } from "@element-plus/icons-vue";
const addTplInfo = {
  name: "add",
  text: "创建",
  attrs: {
    type: "success",
  },
};
const editTplInfo = {
  name: "edit",
  attrs: {
    type: "info",
    disabled: true,
    icon: "EditPen",
  },
};
</script>
<style lang="scss" scoped>
.base-btn {
  margin: $gap-qtr;
}
</style>
