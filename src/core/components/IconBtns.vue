<!-- 图标按钮组 -->
<template>
  <div class="icon-btns">
    <template v-for="(tpl, ind) in tplsAttrs" :key="ind">
      <el-popconfirm
        v-if="tpl.popconfirm"
        v-bind="getPopconfirmAttrs(tpl.popconfirm, { text: tpl.text, attrs: { type: tpl.type } })"
        @confirm="handleClick(tpl.name)"
      >
        <template #reference>
          <BaseIcon :size="size" :name="tpl.icon" :color="getSysThemeColor(tpl.type)" />
        </template>
      </el-popconfirm>
      <BaseIcon :size="size" :name="tpl.icon" :color="getSysThemeColor(tpl.type)" @click.stop="handleClick(tpl.name)" v-else />
    </template>
  </div>
</template>
<script lang="ts" setup>
import { getSysThemeColor, typeOf } from "@/core/utils";
import { StrNum } from "@/core/_types";
import { getPopconfirmAttrs } from "@/core/components/BaseBtn/_utils";

export type IconTplName = "add" | "delete" | "edit";

const iconMap = {
  add: {
    name: "add",
    text: "新增",
    type: "primary",
    icon: "CirclePlus",
  },
  delete: {
    name: "delete",
    text: "删除",
    type: "danger",
    icon: "Remove",
    popconfirm: true,
  },
  edit: {
    name: "edit",
    text: "编辑",
    type: "primary",
    icon: "Edit",
  },
};
const props = withDefaults(
  defineProps<{
    tpl?: IconTplName | IconTplName[];
    size?: StrNum;
    gap?: string;
  }>(),
  {
    size: "1.2em",
    tpl: "add",
    gap: "0.5em",
  }
);
const $emit = defineEmits(["click"]);
const tplsAttrs = computed(() => {
  const { tpl } = props;
  const t = typeOf(tpl);
  if (t === "String") return [iconMap[tpl as IconTplName]];
  if (t === "Array") return (tpl as IconTplName[]).map(it => iconMap[it]); //;
  throw new Error(`暂未处理此类型：${t}`);
});
function handleClick(type: IconTplName) {
  $emit("click", type);
}
</script>
<style lang="scss" scoped>
.icon-btns {
  .base-icon {
    &:not(:first-child) {
      margin-left: 0.25em;
    }
  }
}
</style>
