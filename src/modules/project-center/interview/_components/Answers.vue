<!-- 页面-简介 -->
<template>
  <div class="p" v-if="dataT === 'String'">{{ data }}</div>
  <template v-else-if="dataT === 'Array'">
    <ul class="ul" :style="{ textIndent: `${level * 1}em` }">
      <!-- :style="{ marginBottom: `${level * 2}px` }" -->
      <li class="li" v-for="(item, ind) in data" :key="ind">
        <template v-if="typeOf(item) === 'String'">
          <template v-if="data.length > 1 && !/[1-9]/.test(item.charAt(0))">{{ ind + 1 }}. </template>
          <template v-if="data.length > 1">{{ item }}</template>
          <div class="p" v-else>{{ item }}</div>
        </template>
        <template v-else-if="typeOf(item) === 'Object'">
          <div :class="{ title: level === 0 }">{{ item.title }}</div>
          <Answers :data="item.content" :level="level + 1" />
        </template>
      </li>
    </ul>
  </template>
</template>
<script lang="ts" setup>
import { typeOf } from "@/core/utils";

const props = withDefaults(
  defineProps<{
    data?: any;
    level?: number;
  }>(),
  {
    level: 0,
  }
);
// if (props.data.includes("PUT方法")) {
// console.log(props.data, "data----------------");
// }
const dataT = typeOf(props.data);
</script>
<style lang="scss" scoped>
.title {
  font-weight: bold;
  color: $color-text-light;
  margin-bottom: $gap-half;
}
.ul {
  .li {
    &:not(:first-child) {
      .title {
        margin-top: $gap;
      }
    }
  }
}
.p {
  text-indent: 2em;
}
</style>
