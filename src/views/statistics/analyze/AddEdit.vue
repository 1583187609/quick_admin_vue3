<template>
  <BaseForm
    :request="PostMockCommon"
    v-model="model"
    :style="{ width: pureText ? '350px' : '500px' }"
    :fields="fields"
    :pureText="pureText"
    :fetch="id ? PostMockCommonUpdate : PostMockCommonAdd"
    :fetchSuccess="refreshList"
  >
    <!-- @submit="handleSubmit" -->
    <template #avatar="{ form }">
      <UploadAvatar v-model="form.avatar" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { FormField } from "@/components/form/_types";
import { PostMockCommon, GetUserInfo } from "@/api-mock";
import UploadAvatar from "@/components/upload/UploadAvatar.vue";
import { PostMockCommonAdd, PostMockCommonUpdate } from "@/api-mock";
import { StrNum, FinallyNext, CommonObj } from "@/vite-env";

const props = withDefaults(
  defineProps<{
    id?: StrNum;
    pureText?: boolean;
    refreshList?: FinallyNext;
  }>(),
  {}
);
const { id } = props;
const model = reactive<CommonObj>(props.id ? {} : { gender: 0, status: 1 });
const fields = ref<FormField[]>([
  {
    prop: "avatar",
    label: "头像",
    required: false,
    type: "custom",
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
    options: "Gender",
    attrs: {
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
    options: "RoleType",
  },
  {
    prop: "status",
    label: "状态",
    type: "radio-group",
    required: false,
    options: "EnableStatus",
    attrs: {
      type: "button",
    },
  },
  {
    prop: "address",
    label: "地址",
    required: false,
    type: "cascader",
    options: "Region",
    attrs: {
      style: "width: 100%",
    },
  },
  {
    prop: "phone",
    label: "电话",
    required: true,
    extraAttrs: {
      validType: "phone",
    },
  },
]);
getDetail(id);
//获取详情数据
function getDetail(id?: StrNum) {
  if (!id) return;
  GetUserInfo({ id }).then((res: CommonObj) => {
    Object.assign(model, res);
  });
}
</script>
<style lang="scss" scoped></style>
