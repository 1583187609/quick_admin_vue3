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
          <el-button link :type="tpl.type" circle>
            <template #icon><BaseIcon :name="tpl.icon" :size="iconSize" /></template>
          </el-button>
        </template>
      </el-popconfirm>
      <el-button link :type="tpl.type" circle @click="handleClick(tpl, $event)" v-else>
        <template #icon><BaseIcon :name="tpl.icon" :size="iconSize" /></template>
      </el-button>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { typeOf } from "@/core/utils";
import { CommonObj, StrNum } from "@/core/_types";
import { getPopconfirmAttrs } from "@/core/components/BaseBtn/_utils";
import { iconBtnsMap } from "@/core/components/form/_config";
import { useNextCallback, usePopup } from "@/core/hooks";

export type IconBtnTpl = "add" | "delete" | "edit";

const { closePopup } = usePopup();
const props = withDefaults(
  defineProps<{
    tpl?: IconBtnTpl | IconBtnTpl[];
    gap?: string;
    stop?: boolean; // 是否阻止冒泡
    iconSize?: StrNum;
  }>(),
  {
    iconSize: "1.8em",
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
  }
}
</style>
