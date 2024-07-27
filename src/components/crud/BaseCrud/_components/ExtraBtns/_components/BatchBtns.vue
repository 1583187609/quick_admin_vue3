<!-- 页面-简介 -->
<template>
  <el-dropdown class="batch-btns">
    <el-button :disabled="disabled" :icon="SetUp" type="primary">批量</el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(btn, ind) in btns" :key="ind">
          <el-button @click="handleClick(btn.name)" style="width: 100%" v-bind="btn.attrs">{{ btn.text }}</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { SetUp } from "@element-plus/icons-vue";
import { CommonObj } from "@/vite-env";
import config from "@/config";
export type BatchBtnName = "all" | "not" | "invert";
const btns: CommonObj[] = [
  {
    name: "all",
    text: "全选",
    attrs: { type: "success", plain: true },
  },
  {
    name: "not",
    text: "全不选",
    attrs: { type: "danger", plain: true },
  },
  {
    name: "invert",
    text: "反选",
    attrs: { type: "info", plain: true },
  },
];
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    allSelection?: () => void; //全选
    clearSelection?: () => void; //全不选
    invertSelection?: () => void; //反选
  }>(),
  Object.assign(
    {
      // disabled: false,
    },
    config?.BaseCrud?._components?.BatchBtns
  )
);
function handleClick(name: BatchBtnName) {
  console.log(name, "name-------------");
  if (name === "all") {
    console.log(props.allSelection(), "allSelection----------------");
    // console.log(props.allSelection, "allSelection----------------");
  } else if (name === "not") {
    console.log(props.clearSelection(), "notSelection----------------");
    // console.log(props.clearSelection, "notSelection----------------");
  } else if (name === "invert") {
    console.log(props?.invertSelection(), "notSelection----------------");
    // console.log(props.invertSelection, "notSelection----------------");
  } else {
    console.error("不存在该name值：", name);
  }
}
</script>
<style lang="scss" scoped></style>
