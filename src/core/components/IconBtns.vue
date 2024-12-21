<!-- 图标按钮组 -->
<template>
  <div class="icon-btns f-0">
    <template v-for="(tpl, ind) in tplsAttrs" :key="ind">
      <el-popconfirm
        v-if="tpl.popconfirm"
        v-bind="getPopconfirmAttrs(tpl.popconfirm, { text: tpl.text, attrs: { type: tpl.type } })"
        @confirm="handleClick(tpl.name)"
      >
        <template #reference>
          <el-button :size="size" text :type="tpl.type">
            <template #icon><BaseIcon :name="tpl.icon" /></template>
          </el-button>
        </template>
      </el-popconfirm>
      <el-button :size="size" text :type="tpl.type" @click.stop="handleClick(tpl.name)" v-else>
        <template #icon><BaseIcon :name="tpl.icon" /></template>
      </el-button>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { typeOf } from "@/core/utils";
import { StrNum, CommonSize } from "@/core/_types";
import { getPopconfirmAttrs } from "@/core/components/BaseBtn/_utils";
import { toCssVal } from "@/core/utils";
import { iconBtnsMap } from "@/core/components/form/_config";

export type IconBtnTpl = "add" | "delete" | "edit";

const props = withDefaults(
  defineProps<{
    tpl?: IconBtnTpl | IconBtnTpl[];
    fontSize?: StrNum;
    size?: CommonSize;
    gap?: string;
  }>(),
  {
    fontSize: "1.6em",
    tpl: "add",
    gap: "0",
  }
);
const $emit = defineEmits(["click"]);
const tplsAttrs = computed(() => {
  const { tpl } = props;
  const t = typeOf(tpl);
  if (t === "String") return [iconBtnsMap[tpl as IconBtnTpl]];
  if (t === "Array") return (tpl as IconBtnTpl[]).map(it => iconBtnsMap[it]); //;
  throw new Error(`暂未处理此类型：${t}`);
});
function handleClick(type: IconBtnTpl) {
  $emit("click", type);
}
</script>
<style lang="scss" scoped>
.icon-btns {
  .el-button {
    width: 1em;
    font-size: v-bind(toCssVal(fontSize));
    & + .el-button {
      margin-left: v-bind(toCssVal(gap));
    }
  }
  // .base-icon {
  //   &:not(:first-child) {
  //     margin-left: 0.25em;
  //   }
  // }
}
</style>
