<!-- 页面-简介 -->
<template>
  <div class="q-page-view">
    <BaseForm v-model="modelData" :fields="fields" disabled :footer="false" style="height: auto" />
    <div>
      <el-button type="primary" @click="handleLogOut">立即切换账号登录</el-button>
    </div>
    <div class="mt-t">注：</div>
    <div class="mt-h">1. 退出到登录页后，点击账号，可选择不用角色类型的用户。</div>
    <div class="mt-h">2. 重新登录成功后，注意观察左侧菜单变化</div>
  </div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { useUserStore } from "@/store";
import { getUserInfo } from "@/utils";
import { ElMessageBox } from "element-plus";

const userStore = useUserStore();
const { role } = getUserInfo() ?? {};
const modelData = reactive<CommonObj>({ route_type: "auto", role_type: role });
const fields: FormFieldAttrs[] = [
  {
    prop: "route_type",
    label: "当前路由类型",
    type: "radio-group",
    attrs: {
      options: [
        { label: "静态路由", value: "static" },
        { label: "自动路由", value: "auto" },
        { label: "动态路由", value: "dynamic" },
      ],
    },
  },
  {
    prop: "role_type",
    label: "当前角色类型",
    type: "radio-group",
    attrs: {
      options: "D_RoleType",
    },
  },
];
function handleLogOut() {
  ElMessageBox.confirm("确定退出重新登录吗？", { type: "warning" })
    .then(() => userStore.handleLoginOut())
    .catch(() => {});
}
</script>
<style lang="scss" scoped></style>
