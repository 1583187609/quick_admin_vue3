<!-- 页面-简介 -->
<template>
  <div>
    <div>
      <el-button
        @click="
          openPopup(
            {
              title: '温馨提示',
              beforeClose: handleBeforeClose,
              // onCancel: () => ElMessage.info('点击了取消按钮'),
              // onConfirm: () => ElMessage.info('点击了确认按钮'),
              footer: 'confirm',
            },
            Test
          )
        "
        type="primary"
      >
        打开弹窗
      </el-button>
    </div>
    <div class="mt-o">
      <el-button @click="openPopup('弹窗', '常规弹窗')" type="warning">打开常规弹窗</el-button>
      <el-button @click="openPopup(['div', {}, '弹窗标题（自定义渲染）'], '弹窗内容')" type="warning">打开弹窗（自定义header）</el-button>
      <el-button
        @click="
          openPopup(
            {
              title: '弹窗',
              onConfirm() {
                ElMessage.info('点击了确认按钮');
              },
              footer: 'confirm',
            },
            '弹窗内容'
          )
        "
        type="warning"
        >打开弹窗（自定义footer，传'confirm'）</el-button
      >
      <el-button
        @click="
          openPopup(
            { title: '弹窗', footer: ['div', { style: 'padding:16px 0;text-align:center;background:lightgray;' }, '弹窗footer（自定义渲染）'] },
            '弹窗内容',
            'dialog'
          )
        "
        type="warning"
        >打开弹窗（自定义footer，传渲染元素）</el-button
      >
    </div>
    <div class="mt-o">
      <el-button @click="openPopup('抽屉', '常规抽屉', 'drawer')" type="info">打开常规抽屉</el-button>
      <el-button @click="openPopup(['div', {}, '抽屉标题（自定义渲染）'], '抽屉内容', 'drawer')" type="info">打开抽屉（自定义header）</el-button>
      <el-button @click="openPopup({ title: '抽屉', footer: 'alert' }, '抽屉内容', 'drawer')" type="info"
        >打开抽屉（自定义footer，传'alert'）</el-button
      >
      <el-button
        @click="
          openPopup(
            { title: '抽屉', footer: ['div', { style: 'text-align:center;background:lightgray;' }, '抽屉footer（自定义渲染）'] },
            '抽屉内容',
            'drawer'
          )
        "
        type="info"
        >打开抽屉（自定义footer，传渲染元素）</el-button
      >
    </div>
    <div class="mt-o">
      <el-button @click="openCommonPopup('ChooseMedia', 'all')" type="primary">打开常用弹窗（ChooseMedia）所有媒体</el-button>
      <el-button @click="openCommonPopup('ChooseMedia', 'image')" type="primary">打开常用弹窗（ChooseMedia）图片</el-button>
      <el-button @click="openCommonPopup('ChooseMedia', 'audio')" type="primary">打开常用弹窗（ChooseMedia）音频</el-button>
      <el-button @click="openCommonPopup('ChooseMedia', 'video')" type="primary">打开常用弹窗（ChooseMedia）视频</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
import Test from "./Test.vue";
import { useOpenGlobalPopup, usePopup } from "@/hooks";

const { openPopup, closePopup } = usePopup();

const openCommonPopup = useOpenGlobalPopup();
function handleBeforeClose(cb) {
  openPopup(
    {
      title: "关闭确认",
      onConfirm() {
        closePopup();
        cb();
      },
      footer: "confirm",
    },
    "确认关闭吗？"
  );
}
</script>
<style lang="scss" scoped></style>
