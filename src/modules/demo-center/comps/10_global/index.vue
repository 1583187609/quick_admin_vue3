<!-- 全局弹窗示例 -->
<template>
  <div class="q-page-view">
    <BaseSection title="打开弹窗基础用法（默认为dialog）">
      <el-button
        @click="
          openPopup(
            {
              title: '温馨提示', // 可省略不写
              beforeClose: handleBeforeClose,
              // onCancel: () => ElMessage.info('点击了取消按钮'),
              // onConfirm: () => ElMessage.info('点击了确认按钮'),
              footer: 'confirm',
            },
            StaticComponent
          )
        "
        type="primary"
        plain
      >
        打开二次确认关闭弹窗（点击弹窗右上角x）
      </el-button>
      <!-- 此处表单不应该再使用vModel用法（解耦，让逻辑层次清晰，各自组件干各自的事情） -->
      <el-button
        type="primary"
        plain
        @click="
          openPopup('打开表单弹窗', [
            ModelComponent,
            {
              data: formData,
              onConfirm(args) {
                Object.assign(formData, args);
              },
            },
          ])
        "
        >打开表单弹窗</el-button
      >
    </BaseSection>
    <BaseSection title="打开对话框（dialog）">
      <el-button @click="openPopup('弹窗', '常规弹窗')" type="warning">打开常规弹窗</el-button>
      <el-button @click="openPopup(['div', {}, '弹窗标题（自定义渲染）'], '弹窗内容')" type="warning"
        >打开弹窗（自定义header）</el-button
      >
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
            {
              title: '弹窗',
              footer: ['div', { style: 'padding:16px 0;text-align:center;background:lightgray;' }, '弹窗footer（自定义渲染）'],
            },
            '弹窗内容',
            'dialog'
          )
        "
        type="warning"
        >打开弹窗（自定义footer，传渲染元素）</el-button
      >
    </BaseSection>
    <BaseSection title="打开抽屉（drawer）">
      <el-button @click="openPopup('抽屉', '常规抽屉', 'drawer')" type="info">打开常规抽屉</el-button>
      <el-button @click="openPopup(['div', {}, '抽屉标题（自定义渲染）'], '抽屉内容', 'drawer')" type="info"
        >打开抽屉（自定义header）</el-button
      >
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
    </BaseSection>
    <BaseSection title="打开全局通用弹窗">
      <el-button @click="openCommonPopup('ChooseMedia', 'all')" type="primary">打开常用弹窗（ChooseMedia）所有媒体</el-button>
      <el-button @click="openCommonPopup('ChooseMedia', 'image')" type="primary">打开常用弹窗（ChooseMedia）图片</el-button>
      <el-button @click="openCommonPopup('ChooseMedia', 'audio')" type="primary">打开常用弹窗（ChooseMedia）音频</el-button>
      <el-button @click="openCommonPopup('ChooseMedia', 'video')" type="primary">打开常用弹窗（ChooseMedia）视频</el-button>
    </BaseSection>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";
import StaticComponent from "./_components/StaticComponent.vue";
import ModelComponent from "./_components/ModelComponent.vue";
import { useOpenGlobalPopup, usePopup } from "@/hooks";
import { CommonObj } from "@/core/_types";

const { openPopup, closePopup } = usePopup();

const openCommonPopup = useOpenGlobalPopup();
const formData = reactive<CommonObj>({ name: "张三" });
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
