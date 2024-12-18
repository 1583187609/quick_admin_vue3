<template>
  <BaseForm
    v-model="modelData"
    style="width: 600px"
    :fields="fields"
    :fetch="id ? PatchMockRole : PostMockRole"
    :afterSuccess="() => refreshList?.()"
  >
    <template #menu_auth>
      <BaseTree v-model="modelData.menu_auth" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { FormField } from "@/core/components/form/_types";
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
import { PostMockRole, PatchMockRole, GetMockRole } from "@/api-mock";

const props = withDefaults(
  defineProps<{
    id?: StrNum;
    refreshList?: FinallyNext;
  }>(),
  {}
);
const modelData = reactive<CommonObj>(props.id ? {} : { status: 1 });
const fields = ref<FormField[]>([
  { prop: "role_text", label: "角色名称", required: true },
  { prop: "role", label: "角色标识符", required: true },
  {
    prop: "menu_auth",
    label: "菜单权限",
    type: "slot",
  },
  {
    prop: "status",
    label: "启用状态",
    type: "radio-group",
    attrs: {
      type: "button",
      options: "D_EnableStatus",
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
props.id && getInfo(props.id);
function getInfo(id: StrNum) {
  GetMockRole({ id }).then((res: CommonObj) => Object.assign(modelData, res));
}
</script>
<style lang="scss" scoped></style>
