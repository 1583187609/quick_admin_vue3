<template>
  <BaseForm
    v-model="modelData"
    style="width: 600px"
    :fields="fields"
    :fetch="data ? PostAuthMenuUpdate : PostAuthMenuAdd"
    :onSuccess="refreshList"
    @change="handleChange"
  >
    <template #parent_id>
      <MenuTree :data="menuTree" v-model="modelData.parent_id" />
    </template>
    <template #icon="{}">
      <IconPicker v-model="modelData.icon" />
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import IconPicker from "./_components/IconPicker/Index.vue";
import { GetAuthMenuInfo, PostAuthMenuAdd, PostAuthMenuUpdate } from "@/api-mock";
import MenuTree from "./_components/MenuTree.vue";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
import { defaultIconName } from "@/utils";
import { useDict } from "@/hooks";

const { getText } = useDict();
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    menuTree?: any[];
    refreshList?: FinallyNext;
  }>(),
  {}
);
const modelData = reactive<CommonObj>(
  Object.assign(
    {
      type: 1,
      order: 1,
      is_cache: 1,
      is_link: 0,
      is_blank_open: 0,
      is_show: 1,
      status: 1,
      icon: defaultIconName,
    },
    props.data
  )
);
const fields = computed(() => {
  const menuType = modelData.type;
  return [
    {
      prop: "type",
      label: "菜单类型",
      required: true,
      type: "radio-group",
      options: "MenuType",
      quickAttrs: {
        popover: "目录：XXXX；菜单：XXXX；按钮：XXXXX",
      },
      attrs: {
        type: "button",
      },
    },
    menuType === 1 && {
      prop: "parent_id",
      label: "上级菜单",
      type: "custom",
      quickAttrs: {
        popover: "上级菜单",
      },
    },
    {
      prop: "name",
      label: getText("MenuType", menuType) + "名称",
      required: true,
      attrs: {
        maxlength: 10,
      },
    },
    menuType !== 2 && {
      prop: "icon",
      label: "图标",
      type: "custom",
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
        popover: "数值越大越靠后",
      },
      attrs: {
        style: "width: 205px",
        placeholder: "数值越小，越靠前",
      },
    },
    ...(menuType === 1
      ? [
          {
            prop: "component_path",
            label: "组件路径",
            required: true,
            quickAttrs: {
              popover: "仅输入src/views后面的路径即可",
            },
          },
          {
            prop: "menu_path",
            label: "路由地址",
            required: true,
            quickAttrs: {
              example: "/auth",
              tips: "建议跟组件路径保持一致",
            },
          },
          {
            prop: "is_cache",
            label: "是否缓存",
            type: "radio-group",
            required: true,
            options: "YesNoStatus",
            quickAttrs: {
              grid: 12,
              popover: "是否缓存该页面",
            },
          },
          {
            prop: "is_show",
            label: "是否显示",
            type: "radio-group",
            required: true,
            options: "YesNoStatus",
            quickAttrs: {
              grid: 12,
              popover: "在菜单目录中是否可见",
            },
          },
          {
            prop: "is_link",
            label: "是否外链",
            required: true,
            type: "radio-group",
            options: "YesNoStatus",
            quickAttrs: {
              grid: 12,
            },
          },
          modelData.is_link === 1 && {
            prop: "is_blank_open",
            label: "新窗口打开",
            required: true,
            type: "radio-group",
            options: "YesNoStatus",
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
      options: "EnableStatus",
      quickAttrs: {
        grid: 12,
        popover: "启用后，在菜单中可见，否则不可见",
      },
    },
  ];
});
getInfo(props.data?.id);
function getInfo(id?: StrNum) {
  if (!id) return;
  GetAuthMenuInfo({ id }).then((res: CommonObj) => {
    const { type } = res;
    type === 2 && (res.type = 1);
    type === 3 && (res.type = 2);
    Object.assign(modelData, res);
  });
}
function handleChange(prop: string, val: any) {
  if (prop === "component_path") {
    if (!modelData.menu_path) modelData.menu_path = val.replace(".vue", "");
  }
}
</script>
<style lang="scss" scoped></style>
