<template>
  <div class="group-btns" :class="[vertical ? 'f-c-c-c' : 'f-c-c']">
    <BaseBtn
      :class="{ 'ml-0-i': vertical }"
      :name="btn"
      :data="row"
      @click="handleClick(btn)"
      v-bind="defaultBtnAttrs"
      v-for="(btn, ind) in newBtns.slice(0, isOver ? maxNum - 1 : maxNum)"
      :key="ind"
    />
    <el-dropdown :trigger="dropPopconfirm ? 'hover' : 'click'" :hide-on-click="dropPopconfirm" v-if="isOver">
      <el-button class="ml-12" :class="[vertical ? 'ml-0-i' : '']" :icon="ArrowDown" type="primary" v-bind="defaultBtnAttrs">
        更多
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(btn, ind) in newBtns.slice(maxNum - 1)" :key="ind">
            <BaseBtn :name="btn" :data="row" @click="handleClick(btn)" v-bind="defaultBtnAttrs" />
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <template v-if="!newBtns.length">{{ emptyStr }}</template>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { sortObjArrByKey, showMessage, defaultGroupBtnsMaxNum } from "@/components/_utils";
import { BaseBtnType, BtnItem, getBtnObj } from "@/components/BaseBtn";
import { ClosePopupType } from "@/components/GlobalPopup.vue";
import config from "@/config";
import { CommonObj, FinallyNext } from "@/vite-env";
export type GroupBtnsType = BaseBtnType[] | ((row: CommonObj) => BaseBtnType[]);
export interface GroupBtnsAttrs {
  vertical?: boolean;
  maxNum?: number;
  compact?: boolean; //是否紧凑型
  small?: boolean; //是否小型
}
const defaultBtnAttrs = {
  size: "small",
  plain: true,
  text: true,
  style: "padding: 0",
};
const router = useRouter();
const closePopup: any = inject("closePopup");
const props = withDefaults(
  defineProps<{
    btns?: BaseBtnType[];
    row?: CommonObj;
    maxNum?: number;
    vertical?: boolean;
    emptyStr?: any;
    compact?: boolean;
    small?: boolean;
  }>(),
  Object.assign(
    {
      btns: () => [],
      maxNum: defaultGroupBtnsMaxNum,
      emptyStr: "-",
    },
    config?.BaseCrud?._components?.GroupBtns
  )
);
const emits = defineEmits(["click"]);
let dropPopconfirm = false; //更多按钮的下拉菜单中是否存在 popconfirm
const isOver = computed(() => props.btns?.length > props.maxNum); //必须使用computed，不然会导致更多下拉项不能变为普通按钮显示状态
const newBtns = computed(() => {
  const { maxNum } = props;
  //将按钮名字，转换成完整对象形式的按钮信息
  const tempBtns = props.btns?.map((item: any) => getBtnObj(item)) || [];
  sortObjArrByKey(tempBtns);
  dropPopconfirm = !tempBtns.slice(maxNum - 1).some(it => it.popconfirm);
  return tempBtns;
});
function handleClick(btnObj: BtnItem) {
  const { name, text, to } = btnObj;
  if (to) {
    router.push(to as any);
  } else {
    emits("click", btnObj, (hint = `${text || "操作"}成功！`, closeType?: ClosePopupType, cb?: () => void) => {
      showMessage(hint);
      closePopup(closeType);
      cb?.();
    });
  }
}
</script>
<style lang="scss" scoped>
.group-btns {
}
.ml-0-i {
  margin-left: 0 !important;
}
</style>
