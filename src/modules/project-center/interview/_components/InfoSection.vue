<!-- 面试题内容面板 -->
<template>
  <BaseSection :title="index + 1 + '、' + question" class="info-section" foldable>
    <template #head-right>
      <div class="items ml-a f-fs-c">
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
            <BaseIcon class="icon" :class="'nth-' + opt.level" size="1.2em" :name="opt.icon" />
          </template>
        </el-popover>
      </div>
    </template>
    <div class="answer" v-if="answer">
      <Answer :data="answer" />
    </div>
    <div class="content" v-if="content">内容：{{ content }}</div>
    <div class="parsing" v-if="parsing">解析：{{ parsing }}</div>
    <div class="notice" v-if="notice">注意：{{ notice }}</div>
    <div class="summary" v-if="summary">摘要：{{ summary }}</div>
  </BaseSection>
</template>
<script lang="ts" setup>
import { cssVars } from "@/utils";
import Answer from "./Answers.vue";
import { CommonObj } from "@/core/_types";

const deepColors = { 1: cssVars.color1, 2: cssVars.color2, 3: cssVars.color3, 4: cssVars.color4, 5: cssVars.color5 };

const props = withDefaults(
  defineProps<{
    index: number; // 问题所在数组的下标
    question?: string; // 问题
    answer?: string | string[]; // 回答
    content?: string; // 描述
    parsing?: string; // 接卸
    notice?: string; // 注意
    summary?: string; // 摘要
  }>(),
  {
    question: "无",
  }
);
const typeOpts = reactive<CommonObj[]>([
  { name: "fresh", label: "新鲜程度", level: 1, icon: "Bell", words: ["老", "新"] },
  { name: "frequency", label: "出现频率", level: 2, icon: "DataLine", words: ["低", "高"] },
  { name: "important", label: "重要程度", level: 3, icon: "Warning", words: ["轻", "重"] },
  { name: "memory", label: "记忆程度", level: 4, icon: "CircleCheck", words: ["模糊", "牢固"] },
  { name: "score", label: "得分情况", level: 5, icon: "Discount", words: ["低", "高"] },
  { name: "backLook", label: "回看意愿", level: 5, icon: "Discount", words: ["弱", "强"] },
]);
function handleChange(val: any, ind: number) {
  typeOpts[ind].level = val;
}
</script>
<style lang="scss" scoped>
// @use "./_var.scss" as *;
@use "sass:color";
@use "@/assets/styles/_var.scss";

// $color-1: color.mix($color-primary, #fff, 30%);
// $color-2: color.mix($color-primary, #fff, 50%);
// $color-3: color.mix($color-primary, #fff, 70%);
// $color-4: $color-primary;
// $color-5: color.mix($color-primary, #000, 80%);

// $color-1: color.mix($color-info, #fff, 25%);
// $color-2: color.mix($color-info, #fff, 45%);
// $color-3: color.mix($color-info, #fff, 60%);
// $color-4: color.mix($color-primary, #fff, 60%);
// $color-5: color.mix($color-primary, #fff, 100%);

$color-1: color-mix(in srgb, var(--color-info) 25%, #fff, 75%);
$color-2: color-mix(in srgb, var(--color-info) 45%, #fff, 55%);
$color-3: color-mix(in srgb, var(--color-info) 60%, #fff, 40%);
$color-4: color-mix(in srgb, var(--color-primary) 60%, #fff, 40%);
$color-5: color-mix(in srgb, var(--color-primary) 100%, #fff, 0%);
.info-section {
  &:not(:last-child) {
    margin-bottom: $gap;
  }
}
.btn {
  background: red;
}
.items {
  .icon {
    cursor: pointer;
    width: 1.4em;
    height: 1.4em;
    border-radius: $radius-lighter;
    &:hover {
      color: $color-primary;
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
