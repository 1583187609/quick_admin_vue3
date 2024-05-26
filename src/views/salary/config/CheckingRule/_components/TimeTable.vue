<!-- 页面-简介 -->
<template>
  <BaseTable :cols="cols" :rows="rows">
    <template #qj="{ row, $index }">
      <template v-if="$index === 0">
        <div class="f-c-c"><BaseNumberRange style="width: 200px" />（含）</div>
      </template>
      <template v-else> <el-input-number v-model="row.qj" class="mr-q" :min="0" />以上 </template>
    </template>
    <template #gz="{ row, $index }">
      <div class="f-c-c">
        <template v-if="$index === 0">
          <BaseNumberRange style="width: 200px" />
          <span class="f-0 ml-q">次（含）</span></template
        >
        <el-radio-group class="mr-o ml-o f-0" v-model="row.gz.type">
          <el-radio-button :disabled="opt.disabled" :value="opt.value" v-for="(opt, ind) in ruleOpts" :key="ind">
            {{ opt.label }}
          </el-radio-button>
        </el-radio-group>
        <el-input-number v-model="row.gz.val" :min="0" />
        <span class="f-0 ml-q">以上</span>
      </div>
    </template>
    <template #cz="{ row, $index }">
      <el-button @click="handleAdd" type="primary" size="small" v-if="$index === rows.length - 1">添加</el-button>
      <el-button @click="handleDel" type="danger" size="small" v-else>删除</el-button>
    </template>
  </BaseTable>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { TableFieldAttrs } from "@/components/table";
import { CommonObj, FinallyNext, StrNum, OptionItem } from "@/vite-env";
import { ElMessage } from "element-plus";
const ruleOpts: OptionItem[] = [
  { label: "扣款", value: 1 },
  { label: "旷工", value: 2 },
];
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
const cols: TableFieldAttrs = [
  { prop: "qj", label: "区间（分钟）", type: "custom", minWidth: 120 },
  { prop: "gz", label: "规则", type: "custom", minWidth: 300 },
  { prop: "cz", label: "cz", type: "custom", width: 100 },
];
const rows = reactive<CommonObj[]>([
  { qj: 10, gz: { type: 1, val: 10 } },
  { qj: 30, gz: { type: 2, val: 10 } },
]);
function handleAdd() {
  ElMessage.info("点击了添加按钮");
}
function handleDel() {
  ElMessage.info("点击了删除按钮");
}
</script>
<style lang="scss" scoped></style>
