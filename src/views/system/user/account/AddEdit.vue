<template>
  <BaseForm
    :request="PostMockCommon"
    v-model="model"
    :style="{ width: pureText ? '350px' : '550px' }"
    :fields="fields"
    :pureText="pureText"
    :fetch="id ? PostUserUpdate : PostUserAdd"
    :onSuccess="refreshList"
  >
    <!-- @submit="handleSubmit" -->
    <template #avatar="{ form }">
      <UploadAvatar v-model="form.avatar" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import { FormField } from "@/components/form/_types";
import { PostMockCommon, GetUserInfo } from "@/api-mock";
import UploadAvatar from "@/components/upload/UploadAvatar.vue";
import { PostUserAdd, PostUserUpdate } from "@/api-mock";
import { CommonObj, FinallyNext } from "@/vite-env";

const props = withDefaults(
  defineProps<{
    id?: string | number;
    pureText?: boolean;
    refreshList?: FinallyNext;
  }>(),
  {}
);
const { id } = props;
const model = reactive<CommonObj>({ gender: 0, status: 1, type: 3, age: 18 });
const fields = ref<FormField[]>([
  {
    prop: "avatar",
    label: "头像",
    required: false,
    type: "custom",
    extraAttrs: {
      tips: "只能上传.jpg,.png,.gif,.jpeg类型，且大小不超过1M",
    },
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
    extraAttrs: {
      grid: 12,
    },
  },
  {
    prop: "age",
    label: "年龄",
    type: "input-number",
    extraAttrs: {
      grid: 12,
    },
    attrs: {
      min: 0,
      max: 150,
    },
  },
  {
    prop: "type",
    label: "角色类型",
    type: "select",
    required: true,
    extraAttrs: {
      grid: 12,
    },
    options: "RoleType",
  },
  {
    prop: "status",
    label: "启用状态",
    type: "radio-group",
    required: true,
    extraAttrs: {
      grid: 12,
    },
    options: "EnableStatus",
    attrs: {
      type: "button",
    },
  },

  { prop: "phone", label: "电话", required: true, extraAttrs: { grid: 12, validType: "phone" } },
  { prop: "psd", label: "密码", required: true, extraAttrs: { grid: 12, validType: "password" } },
  {
    prop: "address",
    label: "居住地址",
    required: false,
    type: "cascader",
    options: "Region",
    attrs: {
      style: "width: 100%",
    },
  },
  {
    prop: "remark",
    label: "备注",
    attrs: {
      type: "textarea",
    },
  },
]);
if (id) {
  getDetail(id);
}
//获取详情数据
function getDetail(id: string | number) {
  GetUserInfo({ id }).then((res: CommonObj) => {
    Object.assign(model, res);
  });
}
</script>
<style lang="scss" scoped></style>
