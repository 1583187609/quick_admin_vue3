<template>
  <div class="operate-btns table-operate-col" :class="[vertical ? 'f-c-c-c' : 'f-c-c']">
    <BaseBtn
      :tpl="btn"
      :data="row"
      class="btn"
      :class="[vertical ? 'vertical' : '']"
      v-bind="defaultBtnAttrs"
      @click="handleClick"
      v-for="(btn, ind) in newBtns.slice(0, isOver ? max - 1 : max)"
      :key="ind"
    />
    <el-dropdown :trigger="dropPopconfirm ? 'hover' : 'click'" :hide-on-click="dropPopconfirm" v-if="isOver">
      <el-button class="more btn" :class="{ vertical }" :icon="ArrowDown" type="primary" v-bind="defaultBtnAttrs">
        更多
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(btn, ind) in newBtns.slice(max - 1)" :key="ind">
            <BaseBtn
              :tpl="btn"
              :data="row"
              class="btn"
              :class="[vertical ? 'vertical' : '']"
              v-bind="defaultBtnAttrs"
              @click="handleClick"
            />
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <template v-if="!newBtns.length">{{ defaultEmptyStr }}</template>
  </div>
</template>
<script lang="ts" setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { sortObjArrByKey } from "@/core/utils";
import config from "@/core/config";
import { defaultGroupBtnsMaxNum, defaultEmptyStr } from "@/core/config";
import { BaseBtnType } from "@/core/components/BaseBtn/_types";
import { getBtnObj } from "@/core/components/BaseBtn";
import { CommonObj, NextArgs } from "@/core/_types";

export type OperateBtnsType = BaseBtnType[] | ((row: CommonObj) => BaseBtnType[]);
export interface OperateBtnsAttrs {
  vertical?: boolean;
  max?: number;
}
const defaultBtnAttrs = {
  plain: true,
  text: true,
  // style: "padding: 0",
};
const router = useRouter();
const props = withDefaults(
  defineProps<{
    btns?: BaseBtnType[];
    row?: CommonObj;
    max?: number; // 最多展示按钮的数量，若超出，则会以更多下拉形式呈现按钮
    vertical?: boolean;
  }>(),
  {
    btns: () => [],
    max: defaultGroupBtnsMaxNum,
    ...config?.BaseCrud?.OperateBtns,
  }
);
const $emit = defineEmits(["click"]);
let dropPopconfirm = false; //更多按钮的下拉菜单中是否存在 popconfirm
const isOver = computed(() => props.btns?.length > props.max); //必须使用computed，不然会导致更多下拉项不能变为普通按钮显示状态
const newBtns = computed(() => {
  const { max, btns } = props;
  //将按钮名字，转换成完整对象形式的按钮信息
  const tempBtns = btns?.map((item: any) => getBtnObj(item)) || [];
  sortObjArrByKey(tempBtns);
  dropPopconfirm = !tempBtns.slice(max - 1).some(it => it.popconfirm);
  return tempBtns;
});
function handleClick(...args) {
  const [tpl, btnObj, next, e] = args as NextArgs;
  const { to } = btnObj;
  if (to) return router.push(to as any);
  $emit("click", ...args);
}
</script>
<style lang="scss">
//添加 table-operate-col 类是为了防止全局重复。如果子级按钮是删除，因为包裹了一层el-popconfirm，所以处理透传class会有两种情况，导致删除按钮透传得到的class不会生效
.operate-btns.table-operate-col {
  .el-button + .el-button {
    margin-left: var(--gap-half);
  }
  .btn {
    padding: var(--gap-half);
    &.more {
      margin-left: var(--gap-half);
    }
    &.vertical {
      margin-left: 0 !important;
    }
  }
}
</style>
