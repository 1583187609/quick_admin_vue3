<!-- 自定树节点 -->
<template>
  <div class="tree-node f-sb-c">
    <span class="mr-a">{{ scope.data.label }}</span>
    <span class="draft" v-if="scope.data?.data?.isDraft">草稿</span>
    <span v-if="!scope.node.isLeaf">{{ scope.data.total }}</span>
    <IconBtns
      stop
      gap="4px"
      iconSize="1.4em"
      :hidden="hidden"
      :tpl="scope.node.isLeaf ? ['delete', 'edit'] : ['add']"
      @click="handleClick"
      v-if="!onlyDraft"
    />
  </div>
</template>
<script lang="ts" setup>
import { CommonObj } from "@/core/_types";
import IconBtns from "@/core/components/IconBtns.vue";
const props = withDefaults(
  defineProps<{
    // scope 属性是从插槽中取到的
    scope: CommonObj;
    hidden?: boolean;
    onlyDraft?: boolean;
  }>(),
  {
    hidden: true,
  }
);
const $emit = defineEmits(["add", "delete", "edit"]);
function handleClick(type: "add" | "delete" | "edit") {
  const { data, node } = props.scope;
  $emit(type, data, node);
}
</script>
<style lang="scss" scoped>
.tree-node {
  width: 100%;
  padding-right: $gap-half;
  .icon-btns {
    margin-left: $gap-qtr;
  }
  &:hover {
    .icon-btns {
      display: flex;
    }
  }
}
.draft {
  margin-left: $gap-qtr;
  font-size: 12px;
  color: $color-info;
  // border-radius: $radius-light;
  // border: $border-main;
  // padding: 0;
  // line-height: 1;
}
</style>
