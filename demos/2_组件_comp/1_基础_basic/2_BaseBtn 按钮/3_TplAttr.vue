<!-- summary 模板用法
  写入tpl属性，即可拥有该类型按钮的所有特性。可传入其他el-button的属性，进行覆盖。也可传入tpl对象进行覆盖，两者效果等价。
-->
<template>
  <div class="f-fs-fs-w">
    <BaseBtn tpl="add" />
    <BaseBtn tpl="add" type="success">创建</BaseBtn>
    <BaseBtn :tpl="addTplInfo" />
    <BaseBtn tpl="edit" />
    <BaseBtn tpl="edit" type="info" :icon="EditPen" disabled />
    <BaseBtn :tpl="editTplInfo" />
  </div>
</template>
<script lang="ts" setup>
import { EditPen } from "@element-plus/icons-vue";
const addTplInfo = {
  type: "success",
  text: "创建",
};
const editTplInfo = {
  type: "info",
  attrs: {
    disabled: true,
    icon: "EditPen",
  },
};
</script>
<style lang="scss" scoped>
.base-btn {
  margin: 0 $gap $gap 0;
}
</style>
