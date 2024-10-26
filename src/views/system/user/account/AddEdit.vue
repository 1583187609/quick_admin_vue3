<template>
  <BaseForm
    :request="PostMockCommon"
    v-model="modelData"
    :style="{ width: pureText ? '350px' : '550px' }"
    :fields="fields"
    :pureText="pureText"
    :fetch="id ? PostUserUpdate : PostUserAdd"
    :afterSuccess="refreshList"
  >
    <template #avatar>
      <UploadAvatar v-model="modelData.avatar" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { FormField } from "@/core/form/_types";
import { PostMockCommon, GetUserInfo } from "@/api-mock";
import UploadAvatar from "@/core/upload/UploadAvatar.vue";
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
const modelData = reactive<CommonObj>({ gender: 0, status: 1, type: 3, age: 18 });
const fields = ref<FormField[]>([
  {
    prop: "avatar",
    label: "头像",
    required: false,
    type: "custom",
    quickAttrs: {
      tips: "只能上传.jpg,.png,.gif,.jpeg类型，且大小不超过1M",
    },
  },
  {
    prop: "nickname",
    label: "昵称",
    required: false,
    attrs: { maxlength: 16 },
  },
  {
    prop: "name",
    label: "姓名",
    attrs: {
      maxlength: 6,
    },
  },
  {
    prop: "gender",
    label: "性别",
    type: "radio-group",
    attrs: {
      options: "Gender",
      type: "button",
    },
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "age",
    label: "年龄",
    type: "input-number",
    quickAttrs: {
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
    attrs: {
      options: "RoleType",
    },
    quickAttrs: {
      grid: 12,
    },
  },
  {
    prop: "status",
    label: "启用状态",
    type: "radio-group",
    required: true,
    attrs: {
      type: "button",
      options: "EnableStatus",
    },
    quickAttrs: {
      grid: 12,
    },
  },

  {
    prop: "phone",
    label: "电话",
    required: true,
    quickAttrs: {
      grid: 12,
      rulesType: "phone",
    },
  },
  {
    prop: "psd",
    label: "密码",
    required: true,
    quickAttrs: {
      grid: 12,
      rulesType: "password",
    },
  },
  {
    prop: "address",
    label: "居住地址",
    required: false,
    type: "cascader",
    attrs: {
      options: "Region",
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
    Object.assign(modelData, res);
  });
}
</script>
<style lang="scss" scoped></style>
