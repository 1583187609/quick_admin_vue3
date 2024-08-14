<template>
    <div class="f-sb-fs-w">
        <div class="box f-1">
            <BaseText :text="shortContent"/>
        </div>
        <div class="box f-1">
            <BaseText>{{ shortContent }}</BaseText>
        </div>
        <div class="box f-1">
            <BaseText line="2" :text="longContent"></BaseText>
        </div>
        <div class="box f-1">
            <BaseText>{{ longContent }}</BaseText>
        </div>
    </div>
</template>
<script lang="ts" setup>
const shortContent = "这是一段短文本内容";
const longContent = '这是一段超长的文本内容，会自动出现省略号，当出现省略号后，点击我可弹出对话框查看全部内容。这是一段超长的文本内容，会自动出现省略号，当出现省略号后，点击我可弹出对话框查看全部内容。这是一段超长的文本内容，会自动出现省略号，当出现省略号后，点击我可弹出对话框查看全部内容。这是一段超长的文本内容，会自动出现省略号，当出现省略号后，点击我可弹出对话框查看全部内容。'
</script>
<style lang="scss" scoped>
.box{
    min-width: 20em;
    margin: $gap-half;
}
</style>