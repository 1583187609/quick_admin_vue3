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
import { getMaxLength, getScreenSizeType } from "@/utils";
import { useEvent } from "@/hooks";
import { CommonObj } from "@/vite-env";
import { FormField } from "@/components/BaseFormItem";
export interface ColSpanAttrs {
  xs?: number; // <768
  sm?: number; // >=768
  md?: number; // >=992
  lg?: number; // >=1200
  xl?: number; // >=1920
  //其他
  span?: number;
}
export type CellTableFieldType = "text" | "custom" | "custom-all";
export interface CellTableFieldItem {
  prop: string;
  label: string;
  value?: string | number | CommonObj;
  type?: CellTableFieldType;
  popover?: string | CommonObj;
  attrs?: CommonObj;
  colAttrs?: ColSpanAttrs;
  vertical?: boolean;
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
    colSpanAttrs?: ColSpanAttrs;
  }>(),
  {
    data: () => ({}),
    fields: () => [],
  }
);
const spaceCell = ref(true);
const newColAttrs = computed(() => {
  return (field: CellTableFieldItem) => {
    return field.colAttrs || Object.assign({}, defaultColSpanAttrs, props.colSpanAttrs);
  };
});
const newFields = computed(() => {
  const { fields, data } = props;
  return fields.map((item: CellTableFieldItem, ind: number) => {
    const { prop, value } = item;
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
    props.fields.map(({ colAttrs }, ind) => {
      const cAttrs = Object.assign({}, defaultColSpanAttrs, props.colSpanAttrs, colAttrs);
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
