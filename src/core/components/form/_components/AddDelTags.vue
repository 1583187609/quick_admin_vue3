<!-- 组件-可编辑的标签 -->
<template>
  <div class="add-del-tags f-fs-fs-w">
    <el-tag class="m-2" @close="handleDel(item, ind)" v-for="(item, ind) in tags" :key="item" closable>{{ item }} </el-tag>
    <template v-if="tags.length < maxNum">
      <el-input
        v-model="inpVal"
        v-focus
        class="inp m-2"
        closable
        placeholder="请输入"
        autofocus
        clearable
        @blur="handleAdd"
        ref="inpRef"
        v-if="showInp"
      />
      <el-button class="btn" :icon="Plus" type="primary" plain @click="showInp = true" v-else />
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, nextTick } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { useFormItem } from "element-plus";
import { defaultCommonSize, showMessage } from "@/core/utils";
import { CommonSize } from "@/core/_types";

const { formItem } = useFormItem();
// formItem.size // default
const props = withDefaults(
  defineProps<{
    modelValue?: string[];
    maxNum?: number; // 最大个数
    size?: CommonSize; // element官方的bug（不能识别el-form上的size），故需要手动传递
  }>(),
  {
    maxNum: 3,
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
<style lang="scss" scoped>
.inp {
  width: 6em;
}
.btn {
  // width: 2em;
  &:not(:last-child) {
    margin-right: $gap-qtr;
  }
}
</style>
