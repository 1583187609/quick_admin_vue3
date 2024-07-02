<!-- 组件-代理列表-新增/编辑 -->
<template>
  <SectionForm style="width: 800px" :sections="sections">
    <template #yebd>
      <BaseCrud :fetch="GetMockCommonList" :cols="cols" :tableAttrs="{ size: 'small' }" :pageAttrs="{ small: true }">
        <template #bd="{ row, index }">
          <BaseNum :value="(index % 2 === 0 ? 1 : -1) * 20" showText />
        </template>
        <template #je="{ row, index }">
          <BaseNum :value="(index % 2 === 0 ? 1 : -1) * 20" />
        </template>
      </BaseCrud>
    </template>
  </SectionForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { GetMockCommonList } from "@/api-mock";
import { TableField } from "@/components/table";
import SectionForm from "@/components/form/SectionForm.vue";
import { SectionFormItem } from "@/components/form";
import { CommonObj, FinallyNext } from "@/vite-env";

const props = withDefaults(
  defineProps<{
    data?: CommonObj;
    refreshList?: FinallyNext;
  }>(),
  {}
);
const form = ref<CommonObj | undefined>(props.data);
const sections: SectionFormItem[] = [
  {
    title: "代理账户",
    fields: [
      { prop: "zfbxm", label: "支付宝姓名", span: 12 },
      { prop: "zfbzh", label: "支付宝账户", span: 12 },
    ],
  },
  {
    title: "基本信息",
    fields: [
      {
        prop: "gsr",
        label: "归属人",
        type: "select",
      },
      {
        prop: "bz",
        label: "备注",
        attrs: {
          type: "textarea",
          maxlength: 30,
        },
      },
    ],
  },
  {
    name: "yebd",
    title: "余额变动",
    type: "custom",
  },
];
const cols: TableField[] = [
  { prop: "bd", label: "变动", type: "custom" },
  { prop: "je", label: "金额", type: "custom" },
  { prop: "lx", label: "类型" },
  { prop: "ye", label: "余额" },
  { prop: "sj", label: "时间" },
];
</script>
<style lang="scss" scoped></style>
