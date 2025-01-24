<!-- summary 按钮权限
  使用 auth 设置按钮权限。不设置、空数组视为始终有权限。无权限时，按钮会不可见。若要可见，且按钮禁用，则数组元素应为对象，设置disabled为true。
-->
<template>
  <div class="f-fs-c mb-o">
    <span>当前角色：</span>
    <el-radio-group v-model="currRole">
      <el-radio-button v-bind="opt" v-for="(opt, ind) in roleOpts" :key="ind">{{ opt.label }}({{ opt.value }})</el-radio-button>
    </el-radio-group>
  </div>
  <BaseBtn tpl="edit" :auth="[]" :handleAuth="handleAuth">编辑（所有角色可见，auth为空数组）</BaseBtn>
  <BaseBtn tpl="delete" :auth="[0, 1, 2, 3, 4, 5]" :handleAuth="handleAuth"
    >删除（角色值为0, 1, 2, 3, 4, 5可见，auth为数组）</BaseBtn
  >
  <BaseBtn tpl="import" :auth="[0, 1, { code: 2, type: 'disabled' }]" :handleAuth="handleAuth"
    >导入（角色值为0, 1可见；为2时，按钮呈禁用状态，auth为数组）</BaseBtn
  >
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useDict } from "@/hooks";
const { getOpts } = useDict();
const roleOpts = getOpts("D_RoleType");
const currRole = ref(0);
function handleAuth(auth: (number | { code: number; type?: "disabled" })[]) {
  const role = currRole.value;
  let type;
  const isFind = auth.find(it => {
    if (typeof it === "number") return it === role;
    const isFind = it.code === role;
    if (isFind) type = it.type;
    return isFind;
  });
  return isFind ? type || true : false;
}
</script>
