<!-- 组件 - 新增/编辑 -->
<template>
  <BaseForm
    style="width: 600px"
    v-model="modelData"
    :fields="fields"
    :fetch="data ? PostMockCommonUpdate : PostMockCommonAdd"
    :afterSuccess="refreshList"
    :extraParams="data ? { id: data.id } : undefined"
  >
  </BaseForm>
</template>
<script lang="ts" setup>
import { FormField } from "@/core/components/form/_types";
import { PostMockCommonAdd, PostMockCommonUpdate } from "@/api-mock";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    tplTypeOpts?: OptionItem[];
    dataTypeOpts?: OptionItem[];
    refreshList?: FinallyNext;
  }>(),
  {}
);
const modelData = reactive<CommonObj>(Object.assign({}, props.data));
const fields: FormField[] = [
  {
    prop: "tpl",
    label: "模板类型",
    type: "select",
    attrs: {
      options: props.tplTypeOpts,
    },
  },
  {
    prop: "name",
    label: "字段名称",
    required: true,
    attrs: {
      maxlength: 16,
    },
    quickAttrs: { grid: 12 },
  },
  {
    prop: "type",
    label: "数据类型",
    required: true,
    type: "select",
    attrs: { filterable: true, options: props.dataTypeOpts },
    quickAttrs: { grid: 12 },
  },
  { prop: "length", label: "长度", type: "input-number", attrs: { min: 0, max: 100000 }, quickAttrs: { grid: 12 } },
  { prop: "decimal", label: "小数位数", type: "input-number", attrs: { min: 0, max: 6 }, quickAttrs: { grid: 12 } },
  { tpl: "yesNoSwitch", prop: "notNull", label: "是否非空", quickAttrs: { grid: 12 } },
  { tpl: "yesNoSwitch", prop: "isPrimaryKey", label: "是否主键", quickAttrs: { grid: 12 } },
  { tpl: "yesNoSwitch", prop: "isAutoIncrement", label: "是否自增", quickAttrs: { grid: 12 } },
  { prop: "isUnsigned", label: "无符号", type: "switch", attrs: { activeText: "有", inactiveText: "无" }, quickAttrs: { grid: 12 } },
  { prop: "isFillZero", label: "填充零", type: "switch", attrs: { activeText: "填充", inactiveText: "不填" }, quickAttrs: { grid: 12 } },
  { prop: "joinChar", label: "连接符", type: "select", quickAttrs: { grid: 12 } },
  { prop: "defaultValue", label: "默认值" },
  { tpl: "remark", required: true },
];
</script>
<style lang="scss" scoped></style>
