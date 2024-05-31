<!-- 组件-分享嘉宾角色配置 -->
<template>
  <BaseForm v-model="model" :fields="fields" class="share-user-role" log>
    <template #list="{ form }">
      <div class="f-fs-c item" v-for="(item, ind) in form.list" :key="ind">
        <BaseFormItem
          :field="{
            prop: 'yyid',
            label: '运营ID',
            type: 'input',
            labelWidth: '4em',
          }"
          v-model="item.yyid"
        />
        <AddDelBtn
          class="ml-h"
          @click="(type:AddDelBtnType)=>handleAddDel(type,ind)"
          :type="ind === form.list.length - 1 ? 'add' : 'del'"
        />
      </div>
    </template>
  </BaseForm>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { FormField } from "@/components/BaseFormItem";
import AddDelBtn, { AddDelBtnType } from "@/components/AddDelBtn.vue";
import { BtnName } from "@/components/BaseBtn";
import { CommonObj, FinallyNext, StrNum } from "@/vite-env";
const props = withDefaults(
  defineProps<{
    _example_prop?: CommonObj;
  }>(),
  {
    _example_prop: () => ({}),
  }
);
let model = reactive<CommonObj>({
  list: [{ yyid: undefined }],
});
const fields = ref<FormField[]>([
  {
    prop: "list",
    label: "列表",
    type: "custom",
    labelWidth: "0",
  },
]);
function handleAddDel(type: AddDelBtnType, ind: number) {
  if (type === "add") {
    model.list.push({ yyid: undefined });
  } else if (type === "del") {
    model.list.splice(ind, 1);
  }
}
</script>
<style lang="scss" scoped>
.share-user-role {
  width: 360px;
}
.item {
  &:not(:last-child) {
    margin-bottom: $gap;
  }
}
</style>
