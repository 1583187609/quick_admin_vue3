<!-- summary 模板用法（非必须）
 未找到模板，会抛出错误
 -->
<template>
  <BaseTable :cols="cols" :data="rows" :operateBtns="['edit', 'delete']" @operateBtns="onOperateBtns"> </BaseTable>
</template>
<script lang="ts" setup>
import { handleBtnNext } from "@/utils";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { CommonObj, FinallyNext } from "@/core/_types";

const cols = [
  { tpl: "T_UserInfo" },
  { tpl: "T_Id" },
  { tpl: "T_Avatar" },
  { prop: "nam", label: "姓名", width: 100 },
  { prop: "gender", label: "性别", width: 100 },
  { prop: "age", label: "年龄", width: 100 },
  { prop: "nickname", label: "昵称", width: 100 },
  { prop: "job", label: "职业", width: 100 },
  { prop: "school", label: "学校", minWidth: 100 },
  { prop: "home_city", label: "籍贯", minWidth: 100 },
  { prop: "live_city", label: "现居地", minWidth: 100 },
  { prop: "ip", label: "IP地址", minWidth: 100 },
  { prop: "phone", label: "电话", minWidth: 100 },
  { tpl: "T_EnableStatus" },
  { tpl: "T_Remark" },
  { tpl: "T_Create" },
  { tpl: "T_Update" },
];

const rows = [
  { id: 1, name: "李四", gender: "男" },
  { id: 2, namg: "张三", gender: "男" },
  { id: 2, namg: "王朝凤", gender: "女" },
];

function onOperateBtns(name: BtnName, row: CommonObj, next: FinallyNext) {
  const { id } = row;
  handleBtnNext(
    {
      // edit: () => handleAddEdit(row, next),
      // delete: () => DeleteMockUser({ id }).then(() => next()),
    },
    name
  );
}
</script>
<style lang="scss" scoped></style>
