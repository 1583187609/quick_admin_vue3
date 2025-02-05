<!-- 可拖动工作台 -->
<template>
  <div class="q-page-view f-fs-s-c">
    <div class="f-0">待完善（支持拖动块，及其块的宽度、高度设置）</div>
    <Draggable v-model="gridList" class="drag-view f-1" item-key="id" animation="300" chosen-class="chosen" force-fallback="true">
      <template #item="{ element }">
        <div class="item f-c-c">
          {{ element.num }}
        </div>
      </template>
    </Draggable>
  </div>
</template>
<script lang="ts" setup>
import Draggable from "vuedraggable";
import { CommonObj } from "@/core/_types";

const gridList = reactive<CommonObj[]>([
  { id: 1, num: 1 },
  { id: 2, num: 2 },
  { id: 3, num: 3 },
  { id: 4, num: 4 },
  { id: 5, num: 5 },
  { id: 6, num: 6 },
  { id: 7, num: 7 },
  { id: 8, num: 8 },
  { id: 9, num: 9 },
]);
</script>
<style lang="scss" scoped>
.drag-view {
  display: grid;
  grid-template-rows: 33.3% 33.3% 33.3%;
  grid-template-columns: 33.3% 33.3% 33.3%;
  height: 100%;
  .item {
    cursor: move;
    color: #ffffff;
    font-size: $font-size-heavyer;
    border: $border-main;
    &:nth-child(1) {
      background-color: #87bba2;
    }
    &:nth-child(2) {
      background-color: #ff9b54;
    }
    &:nth-child(3) {
      background-color: #73628a;
    }
    &:nth-child(4) {
      background-color: #76c893;
    }
    &:nth-child(5) {
      background-color: #619b8a;
    }
    &:nth-child(6) {
      background-color: #55828b;
    }
    &:nth-child(7) {
      background-color: #427aa1;
    }
    &:nth-child(8) {
      background-color: #38a3a5;
    }
    &:nth-child(9) {
      background-color: #fcca46;
    }
  }
}

.chosen {
  border: 2px solid #89cffd !important;
}
</style>
