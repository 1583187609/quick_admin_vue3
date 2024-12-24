<!-- summary 基础用法
  支持仅复制、to跳转和复制、自定义click事件和复制。点击区域和文本区域鼠标样式会自动变化。
  设置maxLine，最多显示几行，默认为1。
-->
<template>
  <div class="mb-h">
    <BaseCopy>这是待复制内容1</BaseCopy>
  </div>
  <div class="mb-h">
    <BaseCopy>这是待复制内容<b style="color: red">2</b>（复制html字符串中的纯文本内容）</BaseCopy>
  </div>
  <div class="mb-h">
    <BaseCopy clickIconCopy>这是待复制内容3（当且仅当点击图标时才复制文本）</BaseCopy>
  </div>
  <div class="mb-h">
    <BaseCopy to="/">这是待复制内容4（同时满足跳转和复制功能，注意各区域的鼠标样式）</BaseCopy>
  </div>
  <div class="mb-h">
    <BaseCopy @click="handleClick">这是待复制内容5,（同时满足自定义点击事件和复制功能，注意各区域的鼠标样式）</BaseCopy>
  </div>
  <div class="mb-h">
    <BaseCopy maxLine="2" tips="已成功复制，请粘贴看效果">
      这是待复制内容5,（请按下F12键打开控制台后，调节窗口宽度，并留意出现省略号的最大行数）
    </BaseCopy>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
function handleClick() {
  ElMessage.info("触发了click事件");
}
</script>
