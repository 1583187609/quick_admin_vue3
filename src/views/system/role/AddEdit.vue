<template>
  <BaseForm
    v-model="model"
    style="width: 600px"
    :fields="fields"
    :fetch="id ? PostAuthRoleUpdate : PostAuthRoleAdd"
    :onSuccess="refreshList"
  >
    <template #menu_auth="{ form }">
      <BaseTree></BaseTree>
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import { FormField } from "@/components/form/_types";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { GetAuthRoleInfo, PostAuthRoleAdd, PostAuthRoleUpdate } from "@/api-mock";

const props = withDefaults(
  defineProps<{
    id?: StrNum;
    refreshList?: FinallyNext;
  }>(),
  {}
);
const model = reactive<CommonObj>(props.id ? {} : { status: 1 });
const fields = ref<FormField[]>([
  { prop: "role_text", label: "角色名称", required: true },
  { prop: "role", label: "角色标识符", required: true },
  {
    prop: "menu_auth",
    label: "菜单权限",
    type: "custom",
  },
  {
    prop: "status",
    label: "启用状态",
    type: "radio-group",
    options: "EnableStatus",
    attrs: {
      type: "button",
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
getInfo(props.id);
function getInfo(id?: StrNum) {
  if (!id) return;
  GetAuthRoleInfo({ id }).then((res: CommonObj) => {
    Object.assign(model, res);
  });
}
</script>
<style lang="scss" scoped></style>
