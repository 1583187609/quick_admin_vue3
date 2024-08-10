<!-- 单元格表格 -->
<template>
  <el-row class="cell-table f-fs-s-w">
    <el-col class="cell" v-bind="newColAttrs(field)" v-for="(field, ind) in newFields" :key="ind">
      <div class="custom-all-box" v-if="field.type === 'custom-all'">
        <slot :name="field.prop" :field="field"></slot>
      </div>
      <BaseKeyVal :colon="false" :labelWidth="getMaxLength(props.fields as FormField[]) + 'em'" v-bind="field" v-else>
        <slot :name="field.prop" :field="field" :data="data" v-if="field.type === 'custom'"></slot>
      </BaseKeyVal>
    </el-col>
    <div class="cell f-1" v-if="spaceCell"></div>
  </el-row>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { getMaxLength, getScreenSizeType } from "@/components/_utils";
import { useEvent } from "@/hooks";
import { CommonObj, OptionItem } from "@/vite-env";
import { FormField, FormItemType, GridValAttrs, ValidType } from "@/components/form";
export type CellTableFieldType = "text" | "custom" | "custom-all" | "none" | FormItemType;
export interface CellTableFieldItem {
  prop: string;
  label: string;
  type?: CellTableFieldType;
  required?: boolean;
  attrs?: CommonObj;
  grid?: GridValAttrs;
  vertical?: boolean;
  options?: OptionItem[];
  direction?: "vertical" | "horizontal";
  extraAttrs?: {
    popover?: string | CommonObj;
    valid?: ValidType;
  };
}
const defaultColSpanAttrs: CommonObj = {
  // xs: 24, // <768
  // sm: 12, // >=768
  // md: 8, // >=992
  // lg: 6, // >=1200
  // xl: 4, // >=1920
  span: 6,
};
const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    fields?: CellTableFieldItem[];
    grid?: GridValAttrs;
  }>(),
  {
    data: () => ({}),
    fields: () => [],
  }
);
const spaceCell = ref(true);
const newColAttrs = computed(() => {
  return (field: CellTableFieldItem) => {
    return field.grid || Object.assign({}, defaultColSpanAttrs, props.grid);
  };
});
const newFields = computed(() => {
  const { fields, data } = props;
  return fields.map((item: CellTableFieldItem, ind: number) => {
    const { prop } = item;
    const val = data[prop];
    if (val !== undefined) {
      item.value = val;
    }
    return item;
  });
});
useEvent(
  "resize",
  () => {
    let total = 0;
    const size = getScreenSizeType();
    props.fields.map(({ grid }, ind) => {
      const cAttrs = Object.assign({}, defaultColSpanAttrs, props.grid, grid);
      total += cAttrs?.[size] || cAttrs.span || 0;
    });
    spaceCell.value = total % 24 !== 0;
  },
  true
);
</script>
<style lang="scss" scoped>
.cell-table {
  width: 100%;
  border-right: $border-main;
  border-bottom: $border-main;
  .cell {
    border-top: $border-main;
    border-left: $border-main;
  }
  .base-key-val {
  }
}
.custom-all-box {
  padding: $gap-qtr $gap-half;
}
:deep(.base-key-val) {
  height: 100%;
  .key {
    padding: $gap-qtr;
    border-right: $border-main;
    background: $color-bg-lighter;
  }
  .val {
    padding: $gap-qtr;
  }
}
</style>
