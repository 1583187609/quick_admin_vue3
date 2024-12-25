<!-- summary 表单提交处理
@submit 配合loading
:fetch 配合 extraParams
-->
<template>
  <div class="f-sb-fs" style="width: 100%">
    <BaseForm v-model="modelData1" :fields="fields" :loading="loading" :extraParams="{ id: 1 }" @submit="handleSubmit">
      <template #zdy>
        <el-input v-model="modelData1.zdy" v-bind="inputAttrs" />
      </template>
    </BaseForm>
    <BaseForm v-model="modelData2" :fields="fields" :fetch="PostMockCommon" :extraParams="{ id: 2 }">
      <template #zdy>
        <el-input v-model="modelData2.zdy" v-bind="inputAttrs" />
      </template>
    </BaseForm>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { PostMockCommon } from "@/api-mock";
import { CommonObj } from "@/core/_types";
import { FormFieldAttrs } from "@/core/components/form/_types";
import { ElMessage } from "element-plus";

const inputAttrs = {
  rules: [{ required: true, message: "请输入自定义内容" }],
  placeholder: "请输入自定义内容",
  clearable: true,
};

const modelData1 = reactive<CommonObj>({
  age: 12,
});
const modelData2 = reactive<CommonObj>({
  age: 12,
});
const fields: FormFieldAttrs[] = [
  { prop: "name", label: "姓名", required: true },
  { prop: "gender", label: "性别", type: "select", attrs: { options: "D_Gender" } },
  { prop: "age", label: "年龄", type: "input-number", attrs: { min: 0, max: 150 } },
  { prop: "height", label: "身高", type: "slider", attrs: { min: 0, max: 250 } },
  { prop: "is_private", label: "是否保密", type: "switch", attrs: { activeText: "是", inactiveText: "否" } },
  { prop: "zdy", label: "自定义", type: "slot" },
];

const loading = ref(false);
function handleSubmit(params: CommonObj) {
  loading.value = true;
  PostMockCommon(params)
    .then(res => {
      ElMessage.success("提交成功");
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
<style lang="scss" scoped>
.base-form {
  flex-grow: 0;
  flex-basis: calc(50% - $gap-two);
}
</style>
