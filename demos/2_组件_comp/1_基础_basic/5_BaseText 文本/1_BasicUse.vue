<!-- summary 基础用法
  超过n行会自动省略。出现省略号后可点击，以 dialog 展示全部内容。
-->
<template>
  <div class="f-sb-fs-w">
    <div class="box f-1">
      <BaseText :text="shortContent" />
    </div>
    <div class="box f-1">
      <BaseText>{{ shortContent }}</BaseText>
    </div>
    <div class="box f-1">
      <BaseText maxLine="3" :text="longContent"></BaseText>
    </div>
    <div class="box f-1">
      <BaseText title="查看完整内容">{{ longContent }}</BaseText>
    </div>
  </div>
</template>
<script lang="ts" setup>
const shortContent = "这是一段短文本内容";
const longContent =
  "这是一段超长的文本内容，会自动出现省略号，当出现省略号后，点击我可弹出对话框查看全部内容。这是一段超长的文本内容，会自动出现省略号，当出现省略号后，点击我可弹出对话框查看全部内容。这是一段超长的文本内容，会自动出现省略号，当出现省略号后，点击我可弹出对话框查看全部内容。这是一段超长的文本内容，会自动出现省略号，当出现省略号后，点击我可弹出对话框查看全部内容。这是一段超长的文本内容，会自动出现省略号，当出现省略号后，点击我可弹出对话框查看全部内容这是一段超长的文本内容，会自动出现省略号，当出现省略号后，点击我可弹出对话框查看全部内容。。";
</script>
<style lang="scss" scoped>
.box {
  flex-basis: 40%;
  min-width: 20em;
  max-width: 560px;
  margin: $gap-half;
}
</style>
