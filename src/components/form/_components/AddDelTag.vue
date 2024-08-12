<!-- 组件-可编辑的标签 -->
<template>
  <div class="add-del-tag f-fs-fs-w">
    <el-tag class="m-2" @close="handleDel(item, ind)" v-for="(item, ind) in tags" :key="item" closable>{{ item }} </el-tag>
    <template v-if="tags.length < maxNum">
      <el-input
        class="inp m-2"
        size="small"
        closable
        placeholder="请输入"
        autofocus
        clearable
        v-model="inpVal"
        @blur="handleAdd"
        v-focus
        ref="inpRef"
        v-if="showInp"
      />
      <el-button class="m-2" :icon="Plus" size="small" type="primary" plain @click="showInp = true" v-else> </el-button>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, nextTick } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { useFormItem } from "element-plus";
import { showMessage } from "../../_utils";

const props = withDefaults(
  defineProps<{
    modelValue?: string[];
    maxNum?: number; //最大个数
  }>(),
  {
    maxNum: 10,
    modelValue: () => [],
  }
);
const emits = defineEmits(["update:modelValue"]);
const { formItem } = useFormItem();
const inpRef = ref();
const inpVal = ref("");
const tags = ref<string[]>(props.modelValue);
const showInp = ref(false);
watch(
  tags,
  newVal => {
    emits("update:modelValue", JSON.parse(JSON.stringify(newVal)));
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
</style>
