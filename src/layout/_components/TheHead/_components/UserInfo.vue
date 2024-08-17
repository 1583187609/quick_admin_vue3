<template>
  <BaseForm
    style="width: 400px"
    :fields="fields"
    v-model="model"
    :fetch="GetUserList"
    :moreBtns="[editEnable ? { name: 'view', btnText: '查看' } : { name: 'edit', btnText: '修改' }]"
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
import { CommonObj } from "@/vite-env";
import { FormFieldAttrs } from "@/components/form/_types";
import { GetUserList } from "@/api-mock";
import { BtnName } from "@/components/BaseBtn/_types";

const editEnable = ref(false);
const model = reactive<CommonObj>(getUserInfo());
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
      options: "Gender",
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
      attrs: {
        disabled: !editEnable.value,
      },
      extraAttrs: {
        validType: "phone",
      },
    },
    ...(editEnable.value
      ? [
          {
            prop: "password",
            label: "新密码",
            attrs: {
              type: "password",
            },
            extraAttrs: {
              validType: "password",
            },
          },
          {
            prop: "rePassword",
            label: "确认密码",
            rules: [{ validator: checkConfirmPsd, trigger: "blur" }],
            attrs: {
              type: "password",
            },
            extraAttrs: {
              validType: "password",
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
      view: () => (editEnable.value = false),
    },
    name
  );
}
</script>
<style lang="scss" scoped></style>
