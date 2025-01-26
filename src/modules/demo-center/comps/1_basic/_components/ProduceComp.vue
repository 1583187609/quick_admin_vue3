<!-- 组件简介 -->
<template>
  <div class="produce-compo">
    <template v-if="funcs?.length || link">
      <ul>
        <li class="mb-q" v-for="(item, ind) in funcs">
          <template v-if="typeof item === 'string'">
            <div class="title">功能特性</div>
            <div>{{ ind + 1 }}. {{ item }}</div>
          </template>
          <template v-else>
            <div class="title">{{ znNum[ind] }}、{{ item.text }}</div>
            <ul>
              <li class="mb-q" v-for="(it, i) in item.children" :key="i">{{ i + 1 }}. {{ it }}</li>
            </ul>
          </template>
        </li>
      </ul>
      <div class="mt-t" v-if="link">
        示例详见：<RouterLink class="link" :to="link">{{ link }}</RouterLink>
      </div>
    </template>
    <BaseEmpty v-else />
  </div>
</template>
<script lang="ts" setup>
const znNum = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
const props = withDefaults(
  defineProps<{
    funcs: string[] | { text: string; children: string[] }[];
    link: string;
  }>(),
  {
    funcs: () => [],
    link: "/docs/xxx",
  }
);
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: $gap-half;
  font-weight: bold;
}
.link {
  text-decoration: underline;
  &:hover {
    color: $color-primary;
  }
}
</style>
