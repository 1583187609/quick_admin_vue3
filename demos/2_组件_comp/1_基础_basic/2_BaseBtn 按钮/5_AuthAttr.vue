<!-- summary 按钮权限
  使用 auth 设置按钮权限。不设置、空数组视为始终有权限。无权限时，按钮会不可见。若要可见，且按钮禁用，则数组元素应为对象，设置disabled为true。
-->
<template>
  <BaseBtn tpl="edit" :auth="[]">编辑（角色值为0可见，数组）</BaseBtn>
  <BaseBtn tpl="edit" :auth="[0, 1, 2, 3, 4, 5]">编辑（角色值为0可见，数组）</BaseBtn>
  <BaseBtn tpl="import" :auth="[0, 1, { code: 2, disabled: true }]">导入（角色值为0可见，数组）</BaseBtn>
  <BaseBtn tpl="delete" :auth="(list: any[]) => true">删除（自定义权限控制方法）</BaseBtn>
</template>
