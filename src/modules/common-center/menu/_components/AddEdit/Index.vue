<template>
  <BaseForm
    v-model="modelData"
    style="width: 600px"
    :fields="fields"
    :fetch="data ? PatchMockMenu : PostMockMenu"
    :afterSuccess="() => refreshList?.()"
    @change="handleChange"
  >
    <template #parent_id>
      <MenuTree v-model="modelData.parent_id" />
    </template>
    <template #icon="{}">
      <IconPicker v-model="modelData.icon" />
    </template>
    <!-- <template #comp_slot>
      <CombinationPath />
    </template> -->
  </BaseForm>
</template>
<script lang="ts" setup>
import { reactive, computed } from "vue";
import IconPicker from "@/core/components/IconPicker/Index.vue";
import { PostMockMenu, PatchMockMenu, GetMockMenu } from "@/api-mock";
import MenuTree from "@/core/components/MenuTree.vue";
import { CommonObj, FinallyNext, StrNum } from "@/core/_types";
import { defaultIconName } from "@/core/config";
import { useDict } from "@/hooks";
import { MenuListType } from "../MenuList.vue";
// import CombinationPath from "./CombinationPath.vue";

const { getText } = useDict();
const props = withDefaults(
  defineProps<{
    type?: MenuListType;
    data?: CommonObj;
    refreshList?: FinallyNext;
  }>(),
  {}
);
const modelData = reactive<CommonObj>({
  type: 1,
  order: 1,
  is_cache: 1,
  is_link: 0,
  is_blank_open: 0,
  is_show: 1,
  status: 1,
  icon: defaultIconName,
  ...props.data,
});
const fields = computed(() => {
  const menuType = modelData.type;
  return [
    {
      prop: "type",
      label: "菜单类型",
      required: true,
      type: "radio-group",
      attrs: {
        options: "D_MenuType",
        type: "button",
      },
      quickAttrs: {
        explain: "目录：XXXX；菜单：XXXX；按钮：XXXXX",
      },
    },
    menuType === 1 && {
      prop: "parent_id",
      label: "上级菜单",
      type: "slot",
      quickAttrs: {
        explain: "上级菜单",
      },
    },
    {
      prop: "name",
      label: getText("D_MenuType", menuType) + "名称",
      required: true,
      attrs: {
        maxlength: 10,
      },
    },
    menuType !== 2 && {
      prop: "icon",
      label: "图标",
      type: "slot",
      required: true,
    },
    ...(menuType === 2
      ? [
          {
            prop: "perms",
            label: "权限标识",
            attrs: {
              placeholder: "请输入权限标识，用,或，隔开（示例：0,1，2）",
            },
          },
        ]
      : []),
    {
      prop: "order",
      label: "排序",
      required: true,
      type: "input-number",
      quickAttrs: {
        explain: "数值越大越靠后",
      },
      attrs: {
        style: "width: 205px",
        placeholder: "数值越小，越靠前",
      },
    },
    // { prop: "comp_slot", label: "组件路径slot", type: "slot" },
    ...(menuType === 1
      ? [
          {
            prop: "component_path",
            label: "组件路径",
            required: true,
            quickAttrs: {
              explain: "仅输入src/views后面的路径即可",
              example: "/common-center/menu/index.vue",
            },
          },
          {
            prop: "menu_path",
            label: "路由地址",
            required: true,
            quickAttrs: {
              example: "/common-center/menu",
              tips: "建议跟组件路径保持一致",
            },
          },
          {
            prop: "is_cache",
            label: "是否缓存",
            type: "radio-group",
            required: true,
            attrs: {
              options: "D_YesNoStatus",
            },
            quickAttrs: {
              grid: 12,
              explain: "是否缓存该页面",
            },
          },
          {
            prop: "is_show",
            label: "是否显示",
            type: "radio-group",
            required: true,
            attrs: {
              options: "D_YesNoStatus",
            },
            quickAttrs: {
              grid: 12,
              explain: "在菜单目录中是否可见",
            },
          },
          {
            prop: "is_link",
            label: "是否外链",
            required: true,
            type: "radio-group",
            attrs: {
              options: "D_YesNoStatus",
            },
            quickAttrs: {
              grid: 12,
            },
          },
          modelData.is_link === 1 && {
            prop: "is_blank_open",
            label: "新窗口打开",
            required: true,
            type: "radio-group",
            attrs: {
              options: "D_YesNoStatus",
            },
            quickAttrs: {
              grid: 12,
            },
          },
        ]
      : []),
    {
      prop: "status",
      label: "状态",
      required: true,
      type: "radio-group",
      attrs: {
        options: "D_EnableStatus",
      },
      quickAttrs: {
        grid: 12,
        explain: "启用后，在菜单中可见，否则不可见",
      },
    },
  ];
});
getInfo(props.data?.id);
function getInfo(id?: StrNum) {
  if (!id) return;
  GetMockMenu({ id }).then((res: CommonObj) => {
    const { type } = res;
    type === 2 && (res.type = 1);
    type === 3 && (res.type = 2);
    Object.assign(modelData, res);
  });
}
function handleChange(val: any, prop: string) {
  if (prop === "component_path") {
    const endInd = val.endsWith("index.vue") ? -10 : -4;
    modelData.menu_path = val.slice(0, endInd);
  }
}
</script>
<style lang="scss" scoped></style>
