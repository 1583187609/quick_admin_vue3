<!-- 图例简介 -->
<template>
  <ul class="q-page-view">
    <li class="li" v-for="(item, ind) in list" :key="ind">
      <div class="desc">{{ ind + 1 + ". " + item.desc }}</div>
      <BaseImg class="img" :src="item.url" />
    </li>
  </ul>
</template>
<script lang="ts" setup>
const list = [
  { desc: "增删改查：表格列 + 表格列渲染 + 额外按钮组 + 操作栏按钮组", url: "/public/static/imgs/produce/produce-1.png" },
  { desc: "增删改查：表单字段 + 表单校验 + 弹出层（dialog、drawer、popover、popconfirm）", url: "/public/static/imgs/produce/produce-2.png" },
  { desc: "表单类型：基础表单 + 分块表单 + 单元格格表单 + 纯文本表单", url: "/public/static/imgs/produce/produce-3.png" },
  { desc: "表格类型：基础表格 + 可编辑表格 + 增删改查表格（全局统一字典/标签）", url: "/public/static/imgs/produce/produce-4.png" },
  { desc: "树：基础树 + 过滤树（待完善）", url: "/public/static/imgs/produce/produce-5.png" },
  {
    desc: "工程移植性：Echarts 图表（全局/页面/组件分层级默认配置、轻松渲染） + 全局默认配置（可覆盖） + 主题换肤 + 按钮角色权限控制",
    url: "/public/static/imgs/produce/produce-6.png",
  },
  { desc: "后续低码计划：一站式前后端低码设计方案", url: "/public/static/imgs/produce/produce-7.png" },
];
</script>
<style lang="scss" scoped>
.li {
  margin-bottom: $gap-two;
  .desc {
    font-weight: bold;
    font-size: $font-size-heavy;
    margin-bottom: $gap-half;
  }
  .img {
    width: 100%;
    height: auto;
  }
}
</style>
