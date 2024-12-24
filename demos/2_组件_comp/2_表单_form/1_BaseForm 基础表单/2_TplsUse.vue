<!-- summary 模板用法
  字段模板（tpl）：以`T_`开头。可在全局配置文件中配置修改
  字典模板（options）：以`D_`开头。可在全局配置文件中配置修改
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
import { PostMockCommon } from "@/api-mock";
import { CommonObj } from "@/core/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";

const modelData = reactive<CommonObj>({
  age: 12,
  gender: 0,
  live_city: 1,
  plan_city: [1, 3]
});
const cityOpts = [
  { label: "成都", value: 1 },
  { label: "杭州", value: 2 },
  { label: "重庆", value: 2 },
  { label: "西安", value: 2 },
  { label: "大理", value: 2 },
  { label: "北京", value: 2 },
  { label: "天津", value: 2 },
];
const fields: FormFieldAttrs[] = [
  { prop: "name", label: "姓名", required: true }, // 控件类型type默认为 input，可省略不写
  { prop: "gender", label: "性别", type: "select", attrs: { options: "D_Gender" } }, // 采用字典模板 D_Gender
  { tpl: "T_Age" }, // 采用字段模板（可选）
  { prop: "height", label: "身高", type: "slider", attrs: { min: 0, max: 250 } }, // 未配置模板，采用原始写法
  { tpl: "T_YesNoStatus", prop: "is_private", label: "是否保密" }, // 模板属性覆盖
  { tpl: "T_Region", prop: "region", label: "家乡" },
  { prop: "live_city", label: "现居地", type: "radio-group", attrs: { options: cityOpts } },
  { prop: "plan_city", label: "计划定居", type: "checkbox-group", attrs: { options: cityOpts } },
  { tpl: "T_Phone", required: true },
  { tpl: "T_Remark" },
  { prop: "avtivity_times", label: "活动时间", type: "date-picker" }, // 默认 el-date-picker 的 type 类型为：datetimerange
  { prop: "err", label: "分类", type: "cascader", attrs: { options: [] } },
  { prop: "zdy", label: "自定义", type: "slot" },
];
</script>
<style lang="scss" scoped></style>
