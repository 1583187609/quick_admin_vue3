<!-- 自定义增删改查测试 -->
<template>
  <TestView :records="records">
    <BaseCrud
      style="width: calc(100vw - 600px)"
      v-model="modelData"
      :fields="fields"
      :cols="cols"
      :fetch="GetMockCommonList"
      :grid="{ xs: 24, sm: 12, md: 12, lg: 8, xl: 6 }"
      :disabled="false"
      :readonly="true"
      :size="size"
      :extraBtns="['add']"
      :operateBtns="['delete', 'edit']"
      @extraBtns="onExtraBtns"
      @operateBtns="onOperateBtns"
    >
      <template #middle>
        <div class="f-c-c">这是中间内容</div>
      </template>
      <template #zdy>这是自定义表格列</template>
    </BaseCrud>
    <!-- <template #side> </template> -->
  </TestView>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { CommonObj, CommonSize, FinallyNext } from "@/core/_types";
import TestView from "@/core/components/TestView.vue";
import { handleBtnNext } from "@/utils";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { useSelectOpts } from "@/hooks";
import { GetMockCommonList } from "@/api-mock";
import { BtnName } from "@/core/components/BaseBtn/_types";

const records = {
  hasTest: {
    title: "已测试属性",
    list: [],
  },
  waitBetter: {
    title: "待完善属性",
    list: [],
  },
};
const size: CommonSize = "default"; // large, default, small
const { getSearchOpts } = useSelectOpts();

//默认搜索值
const modelData = reactive<CommonObj>({
  xm: "张三",
  multi_tag: [0],
  date_range_def_val: ["2023-08-19", "2023-08-27"],
  num_range_def_val: [10, 20],
});
//搜索表单
const fields: FormFieldAttrs[] = [
  {
    prop: "xm",
    label: "姓名",
  },
  {
    prop: "qyzt",
    label: "启用状态",
    type: "select",
    attrs: {
      options: "D_EnableStatus",
    },
  },
  {
    prop: "qqxl",
    label: "请求下拉",
    type: "select",
    attrs: {
      options: "TestFetchLazy",
    },
  },
  {
    prop: "multi_tag",
    label: "多标签",
    type: "select",
    attrs: {
      options: "D_RoleType",
      multiple: true,
    },
  },
  {
    prop: "live_city",
    label: "居住地址",
    type: "cascader",
    attrs: {
      options: "Region",
      filterable: true,
    },
  },
  getSearchOpts("school", {
    prop: "schoolId",
    label: "学校",
    quickAttrs: {
      popover: "采用hooks封装复杂逻辑",
    },
  }),
  getSearchOpts("company", {
    prop: "companyId",
    label: "公司",
    quickAttrs: {
      popover: "hooks封装且自定义选择下拉项",
    },
  }),
  {
    prop: "num_range_arr",
    label: "数字(数组)",
    type: "BaseNumberRange",
  },
  {
    prop: ["num_range_min", "num_range_max"],
    label: "数字(对象)",
    type: "BaseNumberRange",
  },
  {
    prop: "num_range_def_val",
    label: "数字(默值)",
    type: "BaseNumberRange",
  },
  {
    prop: "date_range",
    label: "日期(数组)",
    type: "date-picker",
  },
  {
    prop: ["date_range_min", "date_range_max"],
    label: "日期(对象)",
    type: "date-picker",
  },
  {
    prop: "date_range_def_val",
    label: "日期(默值)",
    type: "date-picker",
  },
  {
    prop: "zdy",
    label: "自定义",
    type: "slot",
    quickAttrs: {
      popover: "在搜索表单中一般几乎用不到自定义特性，此处用作示例",
    },
  },
];
const cols = [
  { prop: "user_info", label: "用户ID", fixed: "left", type: "UserInfo" },
  { prop: "nc", label: "昵称" },
  {
    prop: "zy",
    label: "职业",
    type: "BaseImg",
  },
  { prop: "xm", label: "姓名" },
  { prop: "xb", label: "性别" },
  { prop: "nl", label: "年龄" },
  { prop: "xx", label: "学校" },
  { prop: "jg", label: "籍贯" },
  { prop: "xjd", label: "现居地" },
  { prop: "ip", label: "IP地址" },
  { prop: "dh", label: "电话" },
  { prop: "zdy", label: "自定义", type: "slot" },
];
//点击列表上方的额外的按钮
function onExtraBtns(name: BtnName, next: FinallyNext) {
  handleBtnNext(
    {
      // add: () => handleAddEdit(null, next),
    },
    name
  );
}
function onOperateBtns(name: BtnName, row: CommonObj, next: FinallyNext) {
  const { id } = row;
  handleBtnNext(
    {
      // edit: () => handleAddEdit(row, next),
      // delete: () => DeleteUserList({ id }).then(() => next()),
    },
    name
  );
}
</script>
<style lang="scss" scoped></style>
