<!-- 组件-可编辑的标签 -->
<template>
  <div class="add-del-tags f-fs-fs-w">
    <el-tag class="mr-h" @close="handleDel(item, ind)" v-for="(item, ind) in tags" :key="item" closable>{{ item }} </el-tag>
    <template v-if="tags.length < maxNum">
      <el-input
        v-model="inpVal"
        v-focus
        class="m-2"
        :style="{ width: maxlength + 3 + 'em' }"
        closable
        placeholder="请输入"
        autofocus
        clearable
        :maxlength="maxlength"
        @blur="handleAdd"
        ref="inpRef"
        v-if="showInp"
      />
      <el-button :icon="Plus" type="primary" plain @click="showInp = true" v-else />
    </template>
  </div>
</template>
<script lang="ts" setup>
import { Plus } from "@element-plus/icons-vue";
import { useFormItem } from "element-plus";
import { showMessage } from "@/core/utils";

const { formItem } = useFormItem();
const props = withDefaults(
  defineProps<{
    modelValue?: string[];
    maxNum?: number; // 最大个数
    maxlength?: number;
  }>(),
  {
    maxNum: 3,
    maxlength: 6,
    modelValue: () => reactive([]),
  }
);
const $emit = defineEmits(["update:modelValue"]);
const inpRef = ref();
const inpVal = ref("");
const tags = ref<string[]>(props.modelValue);
const showInp = ref(false);
watch(
  tags,
  newVal => {
    $emit("update:modelValue", JSON.parse(JSON.stringify(newVal)));
    formItem?.validate("change");
  },
  { deep: true }
);
//处理删除逻辑
function handleDel(item: string, ind: number) {
  tags.value.splice(ind, 1);
}
//处理新增逻辑
function handleAdd() {
  if (inpVal.value === "") {
    showInp.value = false;
    return;
  }
  if (tags.value.find(it => it === inpVal.value)) {
    showMessage(inpVal.value + "已添加");
    return nextTick(() => inpRef.value.focus());
  }
  tags.value.push(inpVal.value);
  showInp.value = false;
  inpVal.value = "";
}
</script>
<style lang="scss" scoped></style>
