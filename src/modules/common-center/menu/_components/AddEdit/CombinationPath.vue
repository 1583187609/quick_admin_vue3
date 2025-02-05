<!-- 组合的组件路径 -->
<template>
  <el-input v-model="modelData.path" placeholder="请输入路径，例：/auth/menu/Index" clearable>
    <template #prepend>
      <el-select v-model="modelData.root" placeholder="请选择" filterable style="width: 12em">
        <el-option :value="item.value" v-for="(item, ind) in options" :key="ind">
          {{ item.value }}
        </el-option>
      </el-select>
    </template>
    <!-- <template #append>{{ suffix }}</template> -->
  </el-input>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useFormItem } from "element-plus";
import { getModuleNames } from "@/utils";
const { formItem } = useFormItem();

interface CompPathData {
  root: string;
  path: string;
}
const suffix = ".vue";
const props = withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    // modelValue: "/common-center/menu/dynamic/index.vue",
  }
);
const options = getModuleNames();
const $emit = defineEmits(["update:modelValue"]);
const modelData = computed<CompPathData>({
  get() {
    if (!props.modelValue) return "";
    const [e1, ...rest] = props.modelValue.slice(1).split("/");
    return new Proxy(
      { root: e1, path: "/" + rest.join("/") },
      {
        set(obj, name, val) {
          const { root, path } = obj;
          console.log(root, path, "root-path--------");
          if (val.startsWith("/")) val = val.slice(1);
          $emit("update:modelValue", `/${root}/${val}.vue`);
          formItem?.validate("input");
          return true;
        },
      }
    );
  },
  set(val: string) {
    $emit("update:modelValue", val);
  },
});
</script>
<style lang="scss" scoped></style>
