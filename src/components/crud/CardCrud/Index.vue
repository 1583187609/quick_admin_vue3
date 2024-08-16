<!--  summary
  这是卡片式的增删改查列表
 -->
<template>
  <BaseCrud class="card-crud" @rows="getRows" ref="crudRef" selectAll>
    <template #default="{ loading, params, rows }">
      <div class="list-box f-fs-fs-w f-1" v-loading="loading">
        <template v-for="(row, $index) in rows" :key="$index">
          <template v-if="['avatar-audit', 'avatar-patrol'].includes(type)">
            <AvatarItem
              class="item"
              :row="getAvatarRowData({ ...row, $index })"
              :withMask="type === 'avatar-audit' ? [2, ''].includes(row.status) : false"
              :status="row[statusKey]"
              :operateBtns="getGroupBtnsOfRow(row, $index)"
              @operateBtns="(btn:BtnItem)=>onOperateBtns(btn,{ ...row, $index },rows,params)"
              :isPatrol="type === 'avatar-patrol'"
            />
          </template>
          <AboutItem
            class="item"
            :row="{ ...row, $index }"
            :status="row[statusKey]"
            :operateBtns="getGroupBtnsOfRow(row, $index)"
            @operateBtns="(btn:BtnItem)=>onOperateBtns(btn,{ ...row, $index },rows,params)"
            :bottomBar="row[statusKey] === 1 ? row.reason || '~原因为空~' : ''"
            v-else-if="type === 'about'"
          />
          <FaceItem
            class="item"
            :row="{ ...row, $index }"
            :status="row[statusKey]"
            :operateBtns="getGroupBtnsOfRow(row, $index)"
            @operateBtns="(btn:BtnItem)=>onOperateBtns(btn,{ ...row, $index },rows,params)"
            :bottomBar="row[statusKey] === 1 ? row.rejectReason || '~原因为空~' : ''"
            v-else-if="type === 'face'"
          />
          <PhotoItem
            class="item"
            :row="{ ...row, $index }"
            :status="row.status"
            :operateBtns="getGroupBtnsOfRow(row, $index)"
            @operateBtns="(btn:BtnItem)=>onOperateBtns(btn,{ ...row, $index },rows,params)"
            v-else-if="type === 'photo'"
          />
        </template>
        <BaseEmpty v-if="!loading && !rows.length" />
      </div>
    </template>
  </BaseCrud>
</template>
<script lang="ts" name="CardCrud" setup>
import { ref,  inject } from "vue";
import {  BtnItem, BaseBtnType } from "@/components/BaseBtn/_types";
import AvatarItem from "./_components/AvatarItem.vue";
import AboutItem from "./_components/AboutItem.vue";
import FaceItem from "./_components/FaceItem.vue";
import PhotoItem from "./_components/PhotoItem.vue";
import { getAvatarRowData } from "./_utils";
import {  showMessage } from "@/components/_utils";
import {  getTempGroupBtnsOfRow } from "@/components/crud/BaseCrud";
import {  FilterByAuthFn } from "@/components/crud/BaseCrud/_types";
import { ClosePopupInject, CommonObj } from "@/vite-env";
import { ClosePopupType } from "@/components/BasicPopup/_types";

export type AboutCode = 0 | 1; //| "aboutMe" | "aboutYou";
export type ItemType = "avatar-audit" | "avatar-patrol" | "about" | "photo" | "face";
export type AuditStatus = 0 | 1 | 2; // 0通过 1驳回 2未审核

const closePopup = inject<ClosePopupInject>("closePopup");
const props = withDefaults(
  defineProps<{
    type?: ItemType; //插入的item组件类型
    filterByAuth?: FilterByAuthFn;
    operateBtns?: BaseBtnType[];
    // extraBtns?: BaseBtnType[]; //额外的按钮，在表单下方，表格上方
  }>(),
  {
    type: "avatar-audit",
  }
);
const emits = defineEmits(["operateBtns"]);
const statusKey = "status";
const crudRef = ref<any>(null);
const newRows = ref<CommonObj[]>([]);
function getRows(rows: CommonObj[], args: CommonObj) {
  newRows.value = rows;
}
//获取每一行的分组按钮
function getGroupBtnsOfRow(row: CommonObj, $rowInd: number) {
  const { operateBtns } = props;
  const tempBtns = getTempGroupBtnsOfRow(row, $rowInd, operateBtns);
  return filterBtnsByAuth(tempBtns);
}
//点击分组按钮
function onOperateBtns(btn: BtnItem, row: CommonObj, rows: CommonObj[], params?: CommonObj) {
  const { name, text } = btn;
  emits(
    "operateBtns",
    name,
    row,
    (hint = `${text || "操作"}成功！`, closeType?: ClosePopupType, cb?: () => void) => {
      showMessage(hint);
      closePopup(closeType);
      const map: CommonObj = {
        pass: 0,
        reject: 1,
      };
      crudRef.value.refreshList(cb);
    },
    params
  );
}
//根据权限对按钮进行过滤
function filterBtnsByAuth(btns: BtnItem[] = []) {
  const { filterByAuth } = props;
  if (!filterByAuth) return btns;
  return btns.filter(({ auth }) => {
    return auth?.length ? filterByAuth(auth) : true;
  });
}
defineExpose({
  ...crudRef.value
});
</script>
<style lang="scss" scoped>
.card-crud {
  overflow: auto;
  .list-box {
    align-content: flex-start;
    position: relative;
    overflow: auto;
    .item {
      margin-right: $gap-half;
    }
  }
}
</style>
