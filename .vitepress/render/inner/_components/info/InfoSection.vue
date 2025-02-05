<!-- 面试题内容面板 -->
<template>
  <BaseSection class="info-section" foldable>
    <template #head-right>
      <div class="items f-fs-c">
        <el-popover width="fit-content" :title="opt.label" placement="top" v-for="(opt, ind) in typeOpts" :key="ind">
          <el-rate
            v-model="opt.level"
            :texts="[`很${opt.words[0]}`, `较${opt.words[0]}`, `一般`, `较${opt.words[1]}`, `很${opt.words[1]}`]"
            :colors="deepColors"
            show-text
            :allow-half="false"
            @change="val => handleChange(val, ind)"
          />
          <template #reference>
            <BaseIcon class="item" :class="'nth-' + opt.level" size="1.2em" :name="opt.icon" />
          </template>
        </el-popover>
      </div>
    </template>
  </BaseSection>
</template>
<script lang="ts" setup>
import { cssVars } from "@/utils";

const deepColors = { 1: cssVars.color1, 2: cssVars.color2, 3: cssVars.color3, 4: cssVars.color4, 5: cssVars.color5 };
const typeOpts = reactive<CommonObj[]>([
  { value: 1, label: "新鲜程度", level: 1, icon: "Bell", words: ["老", "新"] },
  { value: 2, label: "出现频率", level: 2, icon: "DataLine", words: ["低", "高"] },
  { value: 3, label: "重要程度", level: 3, icon: "Warning", words: ["轻", "重"] },
  { value: 4, label: "记忆程度", level: 4, icon: "CircleCheck", words: ["模糊", "牢固"] },
  { value: 5, label: "回看意愿", level: 5, icon: "Discount", words: ["弱", "强"] },
  { value: 6, label: "得分情况", level: 5, icon: "Discount", words: ["低", "高"] },
]);
function handleChange(val: any, ind: number) {
  typeOpts[ind].level = val;
}
</script>
<style lang="scss" scoped>
@use "./_var.scss" as *;
.info-section {
  &:not(:last-child) {
    margin-bottom: $gap;
  }
}
.btn {
  background: red;
}
.items {
  .item {
    cursor: pointer;
    width: 1.4em;
    height: 1.4em;
    border-radius: $radius-lighter;
    &:hover {
      opacity: 1;
      transition: all $transition-time-main;
      background: $color-bg-light;
      font-weight: bolder;
    }
    &:not(:last-child) {
      margin-right: $gap-qtr;
    }
    &.nth-1 {
      color: $color-1;
    }
    &.nth-2 {
      color: $color-2;
    }
    &.nth-3 {
      color: $color-3;
    }
    &.nth-4 {
      color: $color-4;
    }
    &.nth-5 {
      color: $color-5;
    }
  }
}
</style>
