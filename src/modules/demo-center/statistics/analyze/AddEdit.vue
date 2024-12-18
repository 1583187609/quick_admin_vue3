<template>
  <BaseForm
    v-model="modelData"
    :style="{ width: pureText ? '350px' : '500px' }"
    :fields="fields"
    :pureText="pureText"
    :fetch="id ? PostMockCommonUpdate : PostMockCommonAdd"
    :afterSuccess="() => refreshList?.()"
  >
    <template #avatar>
      <UploadAvatar v-model="modelData.avatar" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { FormField } from "@/core/components/form/_types";
import { GetUserInfo } from "@/api-mock";
import UploadAvatar from "@/core/components/upload/UploadAvatar.vue";
import { PostMockCommonAdd, PostMockCommonUpdate } from "@/api-mock";
import { StrNum, FinallyNext, CommonObj } from "@/core/_types";

const props = withDefaults(
  defineProps<{
    id?: StrNum;
    pureText?: boolean;
    refreshList?: FinallyNext;
  }>(),
  {}
);
const { id } = props;
const modelData = reactive<CommonObj>({ gender: 0, status: 1 });
const fields = ref<FormField[]>([
  {
    prop: "avatar",
    label: "头像",
    required: false,
    type: "slot",
  },
  {
    prop: "nickname",
    label: "昵称",
    required: false,
    attrs: { maxlength: 16 },
  },
  { prop: "name", label: "姓名", attrs: { maxlength: 6 } },
  {
    prop: "gender",
    label: "性别",
    type: "radio-group",
    attrs: {
      options: "D_Gender",
      type: "button",
    },
  },
  {
    prop: "age",
    label: "年龄",
    type: "input-number",
    attrs: {
      min: 0,
      max: 150,
    },
  },
  {
    prop: "type",
    label: "类型",
    type: "select",
    required: false,
    attrs: {
      options: "D_RoleType",
    },
  },
  {
    prop: "status",
    label: "状态",
    type: "radio-group",
    required: false,
    attrs: {
      options: "D_EnableStatus",
      type: "button",
    },
  },
  {
    prop: "address",
    label: "地址",
    required: false,
    type: "cascader",
    attrs: {
      options: "C_Region",
      style: "width: 100%",
    },
  },
  {
    tpl: "T_Phone",
    prop: "phone",
    label: "电话",
    required: true,
  },
]);
id && getDetail(id);
//获取详情数据
function getDetail(id: StrNum) {
  GetUserInfo({ id }).then((res: CommonObj) => {
    Object.assign(modelData, res);
  });
}
</script>
<style lang="scss" scoped></style>
