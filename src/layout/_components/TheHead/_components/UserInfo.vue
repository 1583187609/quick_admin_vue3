<template>
  <BaseForm
    style="width: 400px"
    :fields="fields"
    v-model="model"
    :fetch="PostUserList"
    :moreBtns="[editEnable ? { name: 'view', text: '查看' } : { name: 'edit', text: '修改' }]"
    :submitText="editEnable ? undefined : ''"
    :resetText="editEnable ? undefined : ''"
    @moreBtns="onMoreBtns"
  >
    <template #avatar>
      <BaseAvatar :src="model.avatar" size="100" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { getUserInfo, handleBtnNext } from "@/utils";
import { useDictStore } from "@/store";
import { CommonObj } from "@/vite-env";
import { FormFieldAttrs } from "@/components/BaseFormItem";
import { PostUserList } from "@/api-mock";
import { BtnName } from "@/components/BaseBtn";

const { getOpts } = useDictStore();
const genderOpts = getOpts("Gender");
const editEnable = ref(false);
let model = reactive<CommonObj>(getUserInfo());
// const props = withDefaults(
//   defineProps<{
//     data?: CommonObj;
//   }>(),
//   {
//     data: () => ({}),
//   }
// );
const fields = computed<FormFieldAttrs[]>(() => {
  return [
    {
      prop: "avatar",
      label: "头像",
      type: editEnable.value ? "BaseUpload" : "custom",
      attrs: {
        disabled: !editEnable.value,
      },
    },
    {
      prop: "account",
      label: "账号名称",
      attrs: {
        disabled: true,
      },
    },
    {
      prop: "name",
      label: "用户名称",
      attrs: {
        disabled: true,
        maxlength: 10,
      },
    },
    {
      prop: "type_text",
      label: "用户类型",
      attrs: {
        disabled: true,
      },
    },
    {
      prop: "gender",
      label: "性别",
      type: "radio-group",
      options: genderOpts,
      attrs: {
        type: "button",
        disabled: true,
      },
    },
    {
      prop: "nickname",
      label: "用户昵称",
      attrs: {
        maxlength: 10,
        disabled: !editEnable.value,
      },
    },
    {
      prop: "phone",
      label: "电话号码",
      valid: "phone",
      attrs: {
        disabled: !editEnable.value,
      },
    },
    ...(editEnable.value
      ? [
          {
            prop: "password",
            label: "新密码",
            valid: "password",
            attrs: {
              type: "password",
            },
          },
          {
            prop: "rePassword",
            label: "确认密码",
            valid: "password",
            rules: [{ validator: checkConfirmPsd, trigger: "blur" }],
            attrs: {
              type: "password",
            },
          },
        ]
      : []),
  ];
});
// 自定义校验：校验两次输入的密码是否一致
function checkConfirmPsd(rule: any, value: any, callback: any) {
  if (value !== model.password) {
    callback(new Error("密码和确认密码需要保持一致"));
  } else {
    callback();
  }
}
function onMoreBtns(name: BtnName) {
  handleBtnNext(
    {
      edit: () => (editEnable.value = true),
      view: () => {
        console.log("点击了查看按钮");
        editEnable.value = false;
      },
    },
    name
  );
}
</script>
<style lang="scss" scoped></style>
