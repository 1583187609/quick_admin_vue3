<!-- summary  确认提示
  某些危险按钮（例：删除按钮）自带popconfirm确认提示框。explain 可为布尔值、字符串、对象（同el-popconfirm的属性）
-->
<template>
  <BaseBtn tpl="forbid" />
  <BaseBtn tpl="delete" />
  <BaseBtn tpl="delete" :popconfirm="false" />
  <BaseBtn tpl="delete" popconfirm="删除后将XXX，确定删除吗？" />
  <BaseBtn tpl="delete" :popconfirm="{ title: '请再次确定要删除吗？', width: '400px' }" />
</template>
