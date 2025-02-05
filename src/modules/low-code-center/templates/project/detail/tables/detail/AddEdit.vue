<!-- 新增/编辑表字段 -->
<template>
  <BaseForm
    style="width: 600px"
    v-model="modelData"
    :fields="fields"
    :fetch="data ? PatchMockCommon : PostMockCommon"
    :afterSuccess="() => refreshList?.()"
    :extraParams="data ? { id: data.id } : undefined"
    :grid="12"
  >
  </BaseForm>
</template>
<script lang="ts" setup>
import { FormField } from "@/core/components/form/_types";
import { PostMockCommon, PatchMockCommon } from "@/api-mock";
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
// import SectionForm from "@/core/components/form/SectionForm.vue";
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    refreshList?: FinallyNext;
  }>(),
  {}
);
const modelData = reactive<CommonObj>(Object.assign({}, props.data));
const fields: FormField[] = computed(() => {
  const isDate = true;
  return [
    {
      prop: "tpl",
      label: "模板",
      type: "select",
      attrs: {
        filterable: true,
        options: [
          { label: "id", value: 1 },
          { label: "creatorId", value: 2 },
        ],
      },
    },
    {
      prop: "classify",
      label: "所属分类",
      type: "select",
      attrs: {
        filterable: true,
        options: [
          { label: "分类1", value: 1 },
          { label: "分类2", value: 2 },
        ],
      },
    },
    {
      prop: "name",
      label: "字段名",
      required: true,
    },
    {
      prop: "type",
      label: "值类型",
      type: "select",
      required: true,
      attrs: {
        filterable: true,
        options: [{ label: "int", value: "int" }],
      },
    },
    {
      prop: "length",
      label: "长度",
      type: "input-number",
    },
    {
      prop: "decimal",
      label: "小数位数",
      type: "input-number",
    },
    {
      prop: "isPrimaryKey",
      label: "是否主键",
      type: "switch",
    },
    {
      prop: "notNull",
      label: "是否必填",
      type: "switch",
    },
    {
      prop: "isAutoIncrement",
      label: "是否自增",
      type: "switch",
    },
    {
      prop: "isUnsigned",
      label: "无符号",
      type: "switch",
    },
    {
      prop: "isFillZero",
      label: "填充零",
      type: "switch",
    },
    {
      prop: "defaultValue",
      label: "默认值",
      type: isDate ? "select" : "input",
    },
    true && {
      prop: "joinChar",
      label: "拼接符号",
    },
    {
      prop: "enums",
      label: "枚举类型",
      attrs: {
        type: "textarea",
      },
      quickAttrs: {
        grid: 24,
      },
    },
    {
      prop: "remark",
      label: "备注",
      attrs: {
        type: "textarea",
      },
      quickAttrs: {
        grid: 24,
      },
    },
  ];
});
</script>
<style lang="scss" scoped></style>
