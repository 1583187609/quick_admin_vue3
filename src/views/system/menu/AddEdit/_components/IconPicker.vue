<template>
  <div @click="showDialog = true" class="icon-box f-c-c">
    <template v-if="iconName">
      <BaseIcon class="line-1" style="line-height: 1" size="28" :name="iconName"></BaseIcon>
      <span class="ml-h">{{ iconName }}</span>
    </template>
    <span class="placeholder" v-else> 点击选择图标 </span>
  </div>
  <BasicDialog title="选择图标" v-model="showDialog" :footer="null">
    <el-tabs v-model="currTab" class="f-0" @tab-click="(tab) => (currTab = tab.paneName as TabNames)">
      <el-tab-pane label="所有图标" name="All"></el-tab-pane>
      <el-tab-pane label="线框风格" name="Line"></el-tab-pane>
      <el-tab-pane label="加粗风格" name="Bold"></el-tab-pane>
      <el-tab-pane label="实底风格" name="Filled"></el-tab-pane>
    </el-tabs>
    <el-input
      class="search"
      placeholder="请输入图标名称"
      :prefix-icon="ElementPlus"
      :suffix-icon="Search"
      v-model="searchVal"
      tabindex="1"
      v-focus
    />
    <ul class="list f-sb-fs-w all-hide-scroll f-1">
      <li @click="handleClick('')" class="item f-c-c-c" :class="{ active: iconName == '' }">
        <span class="f-c-c" style="height: 32px; width: 32px; font-size: 22px">无</span>
        <span class="text line-1">none</span>
      </li>
      <li
        @click="handleClick(name)"
        class="item f-c-c-c"
        :class="{ active: iconName == name }"
        v-for="(name, ind) in names"
        :key="ind"
      >
        <BaseIcon :name="name" size="28"></BaseIcon>
        <BaseCopy class="text line-1" :text="name" clickIconCopy stop />
      </li>
      <li class="item f-c-c-c f-empty" v-for="(item, ind) in 9" :key="ind"></li>
    </ul>
  </BasicDialog>
</template>
<script lang="ts" setup>
import { ref, inject, watch, computed } from "vue";
import * as Icons from "@element-plus/icons-vue";
import { ElementPlus, Search } from "@element-plus/icons-vue";
import { useFormItem } from "element-plus";
import BasicDialog from "@/components/BasicDialog.vue";
import { CommonObj } from "@/vite-env";
export type TabNames = "All" | "Line" | "Bold" | "Filled";
//实底风格
const filledIcons = [
  "Avatar",
  "Briefcase",
  "CaretTop",
  "CaretRight",
  "CaretBottom",
  "CaretLeft",
  "Checked",
  "Comment",
  "DCaret",
  "Flag",
  "Grid",
  "Checked",
  "Failed",
  "List",
  "Management",
  "Menu",
  "Histogram",
  "Platform",
  "Opportunity",
  "Promotion",
  "Shop",
  "Stamp",
  "TrendCharts",
  "Ticket",
  "Tools",
];
//加粗风格
const boldIcons = ["Eleme", "Expand", "Fold", "Select", "SemiSelect", "Share"];
const props = withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: "",
  }
);
const emits = defineEmits(["update:modelValue"]);
const { formItem } = useFormItem();
const searchVal = ref("");
const showDialog = ref(false);
const currTab = ref<TabNames>("All");
const iconsMap: CommonObj = {
  All: [],
  Line: [],
  Filled: [],
  Bold: [],
};
Object.keys(Icons).filter(it => {
  iconsMap.All.push(it);
  if (!it.endsWith("Filled") && !it.endsWith("Bold") && !boldIcons.includes(it) && !filledIcons.includes(it))
    iconsMap.Line.push(it);
  else if (it.endsWith("Filled") || filledIcons.includes(it)) iconsMap.Filled.push(it);
  else if (it.endsWith(currTab.value) || boldIcons.includes(it)) iconsMap.Bold.push(it);
});
const names = computed(() => {
  const icons = iconsMap[currTab.value];
  if (!searchVal.value) return icons;
  return icons.filter((it: string) => {
    const val = searchVal.value.toLowerCase();
    return it.toLowerCase().includes(val);
  });
});
const iconName = computed({
  get() {
    return props.modelValue;
  },
  set(val: string) {
    emits("update:modelValue", val);
    formItem?.validate("change");
  },
});
function handleClick(name: string) {
  iconName.value = name;
  showDialog.value = false;
}
</script>
<style lang="scss" scoped>
.list {
  // max-height: 100%;
  max-height: calc(90vh - 100px);
  min-width: 500px;
  max-width: 1300px;
  width: 80vw;
  overflow: auto;
  align-content: flex-start;
  .item {
    cursor: pointer;
    flex-basis: 120px;
    margin: $gap-half $gap-qtr;
    &:hover {
      color: #000;
      transform: scale(1.2);
      transition: 0.3s;
    }
    &.active {
      color: $color-primary;
      transform: scale(1.2);
      transition: 0.3s;
      .text {
        color: $color-primary;
      }
    }
    .text {
      font-weight: 500;
      margin-top: 2px;
      font-size: $font-size-light;
    }
  }
}
.icon-box {
  cursor: pointer;
}
.placeholder {
  cursor: pointer;
  color: $color-text-light;
}
.search {
  position: absolute;
  right: $gap;
  top: 75px;
  background: #fff;
  width: 250px;
}
</style>
