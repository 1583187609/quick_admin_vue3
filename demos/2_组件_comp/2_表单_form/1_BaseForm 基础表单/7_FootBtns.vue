<!-- summary 底部按钮
 submitBtn：支持传入模板（save、submit等）、文字（创建、确认）、对象（遵循BaseBtn的对象规则），监听事件始终为 onSubmit
 resetBtn：支持传入模板、文字、对象（规则同submit），监听事件始终为 onReset
 moreBtns：支出传入数组，数组元素遵循BaseBtn的规则，监听事件为：onMoreBtns(name, params, next, e)。通过设置validateForm为false，让点击按钮后不进行表单校验。
 footer 默认（提交、重置按钮）和自定义（使用footer插槽方式实现）
 设置：autoFixedFoot，默认为true，若为true，则底部按钮会自适应固定在底部，若超出，内容区域会出现滚动条
 注：要保证最外层表单（BaseForm、SectionForm）的高度可获得（height：50vh这种，若百分比高度，如果某一级没有传递百分比，则会导致传递链路整体失效）。
-->
<template>
  <div class="f-sb-fs-w" style="width: 100%">
    <BaseForm :fields="fields" :fetch="PostMockCommon" />
    <BaseForm :fields="fields" :fetch="PostMockCommon" submitBtn="确认" resetBtn="置空" @submit="args => handleSubmit(args, 1)" />
    <BaseForm :fields="fields" :fetch="PostMockCommon" submitBtn="add" resetBtn="view" @submit="args => handleSubmit(args, 2)" />
    <BaseForm
      :fields="fields"
      :fetch="PostMockCommon"
      :submitBtn="{ name: 'add', text: '创建' }"
      :resetBtn="{ name: 'view', text: '清空' }"
      @submit="args => handleSubmit(args, 2)"
    />
    <BaseForm
      :fields="fields"
      :fetch="PostMockCommon"
      :moreBtns="['reject', { name: 'forbid', validateForm: false, text: '点击不会触发表单校验' }]"
      @submit="args => handleSubmit(args, 3)"
      @moreBtns="handleMoreBtns"
    />
    <BaseForm :fields="fields" :fetch="PostMockCommon" @submit="args => handleSubmit(args, 4)" />
    <BaseForm :fields="fields" ref="formRef">
      <template #footer>
        <div class="f-sb-c">
          <el-button class="f-1" type="primary" @click="args => handleCustomSubmit(args, 5)">提交</el-button>
          <el-button class="f-1" @click="formRef.reset()">重置</el-button>
        </div>
      </template>
    </BaseForm>
  </div>
</template>
<script lang="ts" setup>
import { PostMockCommon } from "@/api-mock";
import { CommonObj } from "@/core/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { ElMessage } from "element-plus";
import { BtnName } from "@/core/components/BaseBtn/_types";

const formRef = ref<any>(null);
const fields: FormFieldAttrs[] = [{ prop: "name", label: "姓名", required: true }];

function handleSubmit(params, ind: number) {
  ElMessage.info(`提交了表单 ${ind}，参数为：${JSON.stringify(params)}`);
}

function handleCustomSubmit(params, ind: number) {
  formRef.value.validate().then(() => {
    ElMessage.info(`提交了表单 ${ind}，参数为：${JSON.stringify(params)}`);
  });
}

function handleMoreBtns(name: BtnName, params: CommonObj) {
  const clickMap: CommonObj = {
    reject: () => ElMessage.info(`点击了驳回按钮，参数为：${JSON.stringify(params)}`),
    forbid: () => ElMessage.info(`点击了禁用按钮，并且未触发表单校验，参数为：${JSON.stringify(params)}`),
  };
  clickMap[name]?.();
}
</script>
<style lang="scss" scoped>
.base-form {
  flex-grow: 0;
  flex-basis: calc(50% - $gap-two);
  margin-bottom: $gap-two;
}
</style>
