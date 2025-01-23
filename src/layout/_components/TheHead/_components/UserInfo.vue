<template>
  <BaseForm
    v-model="modelData"
    style="width: 400px"
    :fields="fields"
    :fetch="GetMockUser"
    :moreBtns="[editEnable ? { name: 'view', text: '查看' } : { name: 'edit', text: '修改' }]"
    :submitBtn="editEnable ? undefined : ''"
    :resetBtn="editEnable ? undefined : ''"
    :key="editEnable"
    @moreBtns="onMoreBtns"
  >
  </BaseForm>
</template>
<script lang="ts" setup>
import { getUserInfo, handleBtnNext } from "@/utils";
import { CommonObj } from "@/core/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { GetMockUser } from "@/api-mock";
import { BtnName } from "@/core/components/BaseBtn/_types";

const editEnable = ref(false);
const modelData = reactive<CommonObj>(Object.assign({}, getUserInfo()));
const fields = computed<FormFieldAttrs[]>(() => {
  return [
    {
      prop: "avatar",
      label: "头像",
      type: editEnable.value ? "BaseUpload" : "BaseAvatar",
      attrs: {
        size: "8.6em",
        circle: true,
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
      prop: "role_text",
      label: "角色类型",
      attrs: {
        disabled: true,
      },
    },
    {
      prop: "gender",
      label: "性别",
      type: "radio-group",
      attrs: {
        type: "button",
        options: "D_Gender",
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
      tpl: "T_Phone",
      // prop: "phone",
      // label: "电话号码",
      attrs: {
        disabled: !editEnable.value,
      },
    },
    ...(editEnable.value
      ? [
          {
            tpl: "T_Password",
            // prop: "password",
            // label: "新密码",
            // attrs: {
            //   type: "password",
            // },
          },
          {
            tpl: "T_Password",
            prop: "rePassword",
            label: "确认密码",
            rules: [{ validator: checkConfirmPsd, trigger: "blur" }],
            // attrs: {
            //   type: "password",
            // },
          },
        ]
      : []),
  ];
});
// 自定义校验：校验两次输入的密码是否一致
function checkConfirmPsd(rule: any, value: any, callback: any) {
  if (value !== modelData.password) {
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
