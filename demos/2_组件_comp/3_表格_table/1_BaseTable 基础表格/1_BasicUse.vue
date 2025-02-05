<!-- summary 基础用法
 字段
 插槽
 操作按钮
 暂不支持fetch用法
 -->
<template>
  <BaseTable :cols="cols" :data="rows" :operateBtns="['edit', 'delete']" @operateBtns="onOperateBtns">
    <template #create_time="{ row }">
      <div>{{ row.create_user }}</div>
      <div>{{ row.create_time }}</div>
    </template>
    <template #update_time="{ row }">
      <div>{{ row.update_user }}</div>
      <div>{{ row.update_time }}</div>
    </template>
  </BaseTable>
</template>
<script lang="ts" setup>
import { handleBtnNext } from "@/utils";
import { BtnName } from "@/core/components/BaseBtn/_types";
import { CommonObj, FinallyNext } from "@/core/_types";

const cols = [
  { prop: "id", label: "ID", width: 100, fixed: "left" },
  { prop: "nam", label: "姓名", width: 100 },
  { prop: "gender", label: "性别", width: 100 },
  { prop: "age", label: "年龄", width: 100 },
  { prop: "nickname", label: "昵称", width: 100 },
  { prop: "avatar", label: "头像", width: 100 },
  { prop: "job", label: "职业", width: 100 },
  { prop: "school", label: "学校", minWidth: 100 },
  { prop: "home_city", label: "籍贯", minWidth: 100 },
  { prop: "live_city", label: "现居地", minWidth: 100 },
  { prop: "ip", label: "IP地址", minWidth: 100 },
  { prop: "phone", label: "电话", minWidth: 100 },
  { prop: "status", label: "启用状态", type: "BaseTag", minWidth: 100, attrs: { name: "D_EnableStatus" } },
  { prop: "remark", label: "备注", minWidth: 100 },
  { prop: "create_time", label: "创建时间", minWidth: 100, slot: true },
  { prop: "update_time", label: "修改时间", minWidth: 100, slot: true },
];

const rows = [
  {
    id: 1,
    name: "李四",
    gender: "男",
    create_time: "2024-12-27 10:41:41",
    create_user: "姚超峰",
    update_time: "2024-12-31 09:02:13",
    update_user: "李显",
  },
  {
    id: 2,
    namg: "张三",
    gender: "男",
    create_time: "2024-12-27 10:41:41",
    create_user: "姚超峰",
    update_time: "2024-12-31 09:02:13",
    update_user: "李显",
  },
  {
    id: 2,
    namg: "王朝凤",
    gender: "女",
    create_time: "2024-12-27 10:41:41",
    create_user: "姚超峰",
    update_time: "2024-12-31 09:02:13",
    update_user: "李显",
  },
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
