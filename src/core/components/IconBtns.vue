<!-- 图标按钮组 -->
<!-- icon-btns 上的 click 是为了 阻止el-confirm 的事件冒泡 -->
<template>
  <div class="icon-btns f-0" @click="e => stop && e.stopPropagation()">
    <template v-for="(tpl, ind) in tplsAttrs" :key="ind">
      <el-popconfirm
        v-if="tpl.popconfirm"
        v-bind="getPopconfirmAttrs(tpl.popconfirm, { text: tpl.text, attrs: { type: tpl.type } })"
        @confirm="handleClick(tpl)"
      >
        <template #reference>
          <el-button :size="size" text :type="tpl.type">
            <template #icon><BaseIcon :name="tpl.icon" /></template>
          </el-button>
        </template>
      </el-popconfirm>
      <el-button :size="size" text :type="tpl.type" @click="handleClick(tpl, $event)" v-else>
        <template #icon><BaseIcon :name="tpl.icon" /></template>
      </el-button>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { typeOf } from "@/core/utils";
import { StrNum, CommonSize, CommonObj } from "@/core/_types";
import { getPopconfirmAttrs } from "@/core/components/BaseBtn/_utils";
import { toCssVal } from "@/core/utils";
import { iconBtnsMap } from "@/core/components/form/_config";
import { useNextCallback, usePopup } from "@/core/hooks";

export type IconBtnTpl = "add" | "delete" | "edit";

const { closePopup } = usePopup();
const props = withDefaults(
  defineProps<{
    tpl?: IconBtnTpl | IconBtnTpl[];
    fontSize?: StrNum;
    size?: CommonSize;
    gap?: string;
    stop?: boolean; // 是否阻止冒泡
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
function handleClick(tplInfo: CommonObj, e?: Event) {
  const { name, text } = tplInfo;
  $emit("click", name, tplInfo, useNextCallback(text, closePopup), e);
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
