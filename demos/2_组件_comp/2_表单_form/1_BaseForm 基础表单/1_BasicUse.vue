<!-- summary 基础用法
  最外一层是el-form-item的属性（除tpl、type、quickAttrs，attrs、slots外），attrs是el-form-item内部的控件属性
  为了减少编码量，某些使用频率较高的控件会作为默认值，或自带默认属性（可在全局config中进行配置修改）。例：表单项控件类型默认为input，el-date-picker的type默认为daterange或datetimerange（根据format而决定）
  设置v-model绑定数据的初始值即可设置默认值
 -->
<template>
  <BaseForm v-model="modelData" :fields="fields" :fetch="PostMockCommon">
    <template #zdy>
      <input placeholder="请输入（这是自定义的输入框）" style="width: 400px; border: 1px solid purple; border-radius: 6px" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { PostMockCommon, GetMockCascader } from "@/api-mock";
import { CommonObj, OptionItem } from "@/core/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";

const modelData = reactive<CommonObj>({
  age: 12,
  gender: 0,
  live_city: 1,
  plan_city: [1, 3]
});
const genderOpts = [
  { label: "未知", value: 0 },
  { label: "男", value: 1 },
  { label: "女", value: 2 },
];
const cityOpts = [
  { label: "成都", value: 1 },
  { label: "杭州", value: 2 },
  { label: "重庆", value: 3 },
  { label: "西安", value: 4 },
  { label: "大理", value: 5 },
  { label: "北京", value: 6 },
  { label: "天津", value: 7 },
];
const regionOpts = ref<OptionItem[]>([]);
const fields: FormFieldAttrs[] = [
  { prop: "name", label: "姓名", required: true }, // 控件类型type默认为 input，可省略不写
  { prop: "gender", label: "性别", type: "select", attrs: { options: genderOpts } },
  { prop: "age", label: "年龄", type: "input-number", attrs: { min: 0, max: 150 } },
  { prop: "height", label: "身高", type: "slider", attrs: { min: 0, max: 250 } },
  { prop: "is_private", label: "是否保密", type: "switch", attrs: { activeText: "是", inactiveText: "否" } },
  { prop: "region", label: "家乡", type: "cascader", attrs: { options: regionOpts.value } },
  { prop: "live_city", label: "现居地", type: "radio-group", attrs: { type: "button", options: cityOpts } },
  { prop: "plan_city", label: "计划定居", type: "checkbox-group", attrs: { options: cityOpts } },
  {
    prop: "phone",
    label: "电话号码",
    type: "input",
    required: true,
    rules: [{ pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: "请输入合规的11位电话号码" }],
    attrs: { maxlength: 11 },
  },
  { prop: "remark", label: "备注", attrs: { type: "textarea" } },
  { prop: "avtivity_times", label: "活动时间", type: "date-picker", attrs: { type: "daterange" } },
  { prop: "zdy", label: "自定义", type: "slot" },
];

const getRegionOpts = () => {
  GetMockCascader().then(res => (regionOpts.value = res));
};
getRegionOpts();
</script>
<style lang="scss" scoped></style>
