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
import { CommonObj, FinallyNext } from "@/vite-env";
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
const dataTypeOpts = (signed = true) => {
  return [
    {
      value: 1,
      label: "数字",
      children: [
        { label: "tinyint", value: "tinyint", slots: [BaseOption, { left: "tinyint", right: getMaxLengthRange(1, signed) }] },
        { label: "smallint", value: "smallint", slots: [BaseOption, { left: "smallint", right: getMaxLengthRange(2, signed) }] },
        { label: "mediumint", value: "mediumint", slots: [BaseOption, { left: "mediumint", right: getMaxLengthRange(3, signed) }] },
        { label: "int", value: "int", slots: [BaseOption, { left: "int", right: getMaxLengthRange(4, signed) }] },
        { label: "integer", value: "integer", slots: [BaseOption, { left: "integer", right: getMaxLengthRange(5, signed) }] },
        { label: "bigint", value: "bigint", slots: [BaseOption, { left: "bigint", right: getMaxLengthRange(6, signed) }] },
        { label: "float", value: "float", slots: [BaseOption, { left: "float", right: getMaxLengthRange(7, signed) }] },
        { label: "double", value: "double", slots: [BaseOption, { left: "double", right: getMaxLengthRange(8, signed) }] },
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
      prop: "name",
      label: "字段名称",
      attrs: {
        maxlength: 16,
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
      prop: "remark",
      label: "备注",
      attrs: {
        maxlength: 6,
      },
      quickAttrs: {
        popover: "将作为表单label，表格列的label展示，请注意长度（最好为4字符以内）",
      },
    },
    {
      prop: "isUnsigned",
      label: "是否无符号",
      type: "select",
      attrs: {
        options: "YesNoStatus",
      },
      quickAttrs: {
        popover: "若为是，则为自然数（0和正整数）",
      },
    },
    {
      prop: "length",
      label: "长度",
      attrs: { maxlength: 6 },
      quickAttrs: {
        popover: isNum
          ? "为数字类型时：指显示位宽（占用空间是固定的，与设置的 n 无关）"
          : "为char类型时，char(n)为定长字符串，会占用n字符空间；varchar(n)为可变字符串，n最大存储字符数；",
      },
    },
    { prop: "defaultValue", label: "默认值" },
    { prop: "decimal", label: "小数位数", type: "input-number" },
    {
      prop: "notNull",
      label: "是否非空",
      type: "select",
      attrs: {
        options: "YesNoStatus",
      },
      quickAttrs: {
        popover: "即：是否必填",
      },
    },
    {
      prop: "isPrimaryKey",
      label: "是否主键",
      type: "select",
      attrs: {
        options: "YesNoStatus",
      },
    },
    {
      prop: "isAutoIncrement",
      label: "是否自增",
      type: "select",
      attrs: {
        options: "YesNoStatus",
      },
    },
    {
      prop: "isFillZero",
      label: "是否填充零",
      type: "select",
      attrs: {
        options: "YesNoStatus",
      },
      quickAttrs: {
        popover: "当不满足长度位数时，是否用0填充占位",
      },
    },
    {
      prop: "joinChar",
      label: "连接符",
      type: "select",
      attrs: {
        options: [
          { label: "英文逗号", value: "," },
          { label: "中文逗号", value: "，" },
        ],
      },
      quickAttrs: {
        popover: "多个值的数组转为字符串时的连接符号。例：ids为[1,2,3]，连接符为','，会转成1,2,3",
      },
    },
  ];
});
const cols: TableCol[] = [
  {
    prop: "ffcgyhid",
    label: "发放成功用户ID",
    minWidth: 210,
  },
  {
    prop: "ffsbyhid",
    label: "发放失败用户ID",
    minWidth: 210,
  },
  {
    prop: "ffje",
    label: "发放金额",
    minWidth: 90,
  },
  {
    prop: "ffzt",
    label: "发放状态",
    type: "BaseTag",
    attrs: {
      name: "SendStatus",
    },
  },
  { prop: "ffsj", label: "发放时间" },
  { prop: "imtz", label: "IM通知", minWidth: 190 },
  { prop: "bz", label: "备注", minWidth: 140 },
  { prop: "updated", label: "操作人", type: "update" },
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
  openPopup(`${row ? "编辑" : "新增"}`, [AddEdit, { data: row, refreshList: next }]);
}
</script>
<style lang="scss" scoped></style>
