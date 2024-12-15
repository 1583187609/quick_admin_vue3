<!-- 数据库表字段类型模板列表 -->
<template>
  <BaseCrud
    v-model="modelData"
    :cols="cols"
    :fields="fields"
    :fetch="GetUserList"
    :extraBtns="['add']"
    :operateBtns="['edit', 'delete']"
    @extraBtns="onExtraBtns"
    @operateBtns="onOperateBtns"
  >
  </BaseCrud>
</template>
<script lang="ts" setup>
import { GetUserList, DeleteUserList } from "@/api-mock";
import { FormField } from "@/core/components/form/_types";
import { TableCol } from "@/core/components/table/_types";
import { handleBtnNext } from "@/utils";
import AddEdit from "./AddEdit.vue";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { CommonObj, FinallyNext } from "@/core/_types";
import { usePopup } from "@/hooks";
import BaseOption from "@/core/components/BaseOption.vue";

function getNum(bytes = 1, signed = true) {
  let n = bytes * 8;
  if (signed) n--;
  return Math.pow(2, n);
}
function getMaxLengthRange(bytes = 1, signed = false) {
  // 示例：有符号： -128 ~ 127，无符号：0 ~ 255
  if (signed === undefined) {
    const minNum = getNum(bytes);
    const maxNum = getNum(bytes, false);
    // return `-${minNum}~${minNum - 1} | 0~${maxNum - 1}`;
    // return `±${minNum} | ${maxNum - 1}`;
    return `${minNum} | ${maxNum - 1}`;
  }
  const num = getNum(bytes, signed);
  // return signed ? `-${num}~${num - 1}` : `0~${num - 1}`;
  return signed ? `±${num}` : `${num - 1}`;
}
const tplTypeOpts = [
  {
    label: "ID",
    value: "id",
    children: [
      { label: "通用id", value: "id", slots: BaseOption },
      { label: "创建人id", value: "creatorId", slots: BaseOption },
      { label: "更新人id", value: "updatorId", slots: BaseOption },
    ],
  },
  {
    label: "用户",
    value: "user",
    children: [
      { label: "姓名", value: "name", slots: BaseOption },
      { label: "性别", value: "gender", slots: BaseOption },
      { label: "年龄", value: "age", slots: BaseOption },
    ],
  },
];
const dataTypeOpts = (signed = true) => {
  return [
    {
      value: 1,
      label: "数字",
      children: [
        { label: "tinyint", value: "tinyint", range: getMaxLengthRange(1, signed), slots: [BaseOption, { rightKey: "range" }] },
        { label: "smallint", value: "smallint", range: getMaxLengthRange(2, signed), slots: [BaseOption, { rightKey: "range" }] },
        {
          label: "mediumint",
          value: "mediumint",
          range: getMaxLengthRange(3, signed),
          slots: [BaseOption, { rightKey: "range" }],
        },
        { label: "int", value: "int", range: getMaxLengthRange(4, signed), slots: [BaseOption, { rightKey: "range" }] },
        { label: "integer", value: "integer", range: getMaxLengthRange(5, signed), slots: [BaseOption, { rightKey: "range" }] },
        { label: "bigint", value: "bigint", range: getMaxLengthRange(6, signed), slots: [BaseOption, { rightKey: "range" }] },
        { label: "float", value: "float", range: getMaxLengthRange(7, signed), slots: [BaseOption, { rightKey: "range" }] },
        { label: "double", value: "double", range: getMaxLengthRange(8, signed), slots: [BaseOption, { rightKey: "range" }] },
      ],
    },
    {
      value: 2,
      label: "可变字符串",
      children: [
        { label: "char", value: "char" },
        { label: "varchar", value: "varchar" },
      ],
    },
    {
      value: 3,
      label: "文本字符串",
      children: [
        { label: "tinytext", value: "tinytext" },
        { label: "text", value: "text" },
        { label: "mediumtext", value: "mediumtext" },
        { label: "longtext", value: "longtext" },
      ],
    },
    {
      value: 4,
      label: "日期",
      children: [
        { label: "date", value: "date" },
        { label: "datetime", value: "datetime" },
        { label: "time", value: "time" },
        { label: "year", value: "year" },
        { label: "timestamp", value: "timestamp" },
      ],
    },
    {
      label: "Blob",
      value: "blob",
      children: [
        { label: "tinyblob", value: "tinyblob" },
        { label: "blob", value: "blob" },
        { label: "mediumblob", value: "mediumblob" },
        { label: "longblob", value: "longblob" },
      ],
    },
  ];
};
const { openPopup } = usePopup();
const modelData = reactive<CommonObj>({ isUnsigned: 1 });
const fields: FormField[] = computed(() => {
  const isNum = true;
  return [
    {
      prop: "tpl",
      label: "模板类型",
      type: "select",
      attrs: {
        filterable: true,
        options: tplTypeOpts,
      },
    },
    {
      prop: "type",
      label: "数据类型",
      type: "select",
      attrs: {
        filterable: true,
        options: dataTypeOpts(modelData.isUnsigned === 0),
      },
    },
    {
      prop: "creator_name",
      label: "创建人",
    },
    {
      prop: "creator_id",
      label: "创建人ID",
    },
    {
      prop: "remark",
      label: "备注",
    },
    {
      prop: "create_time",
      label: "创建时间",
      type: "date-picker",
    },
  ];
});
const cols: TableCol[] = [
  { tpl: "T_Sort" },
  { tpl: "T_Id" },
  { prop: "tpl", label: "模板类型" },
  { prop: "name", label: "字段名称" },
  { prop: "type", label: "数据类型" },
  { prop: "length", label: "长度" },
  { prop: "decimal", label: "小数位数" },
  { prop: "notNull", label: "是否非空" },
  { prop: "isPrimaryKey", label: "是否主键" },
  { prop: "defaultValue", label: "默认值" },
  { prop: "isAutoIncrement", label: "是否自增" },
  { prop: "isUnsigned", label: "无符号" },
  { prop: "isFillZero", label: "填充零" },
  { prop: "joinChar", label: "连接符" },
  { tpl: "T_Remark" },
  { tpl: "T_Create" },
  { tpl: "T_Update" },
];
function onExtraBtns(name: BtnName, next: FinallyNext) {
  handleBtnNext(
    {
      add: () => handleAddEdit(null, next),
    },
    name
  );
}
function onOperateBtns(name: BtnName, row: CommonObj, next: FinallyNext) {
  const { id } = row;
  handleBtnNext(
    {
      edit: () => handleAddEdit(row, next),
      delete: () => DeleteUserList({ id }).then(() => next()),
    },
    name
  );
}
//新增/编辑
function handleAddEdit(row: CommonObj | null, next: FinallyNext) {
  openPopup(`${row ? "编辑" : "新增"}`, [
    AddEdit,
    { data: row, refreshList: next, tplTypeOpts, dataTypeOpts: dataTypeOpts(false) },
  ]);
}
</script>
<style lang="scss" scoped></style>
