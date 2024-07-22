<!-- 存在问题，未来可能会用到 -->
<template>
  <el-input v-model="model.inp" placeholder="请输入路径，例：/auth/menu/Index" clearable>
    <template #prepend>
      <el-select v-model="model.sel" placeholder="请选择" style="width: 140px">
        <el-option :label="item.label" :value="item.value" v-for="(item, ind) in options" :key="ind" />
      </el-select>
    </template>
    <template #append> .vue </template>
  </el-input>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ClickOutside, useFormItem } from "element-plus";
import { OptionItem } from "@/vite-env";
const { formItem } = useFormItem();
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    options?: OptionItem[];
  }>(),
  {
    modelValue: "/views/system/menu/Index.vue",
    options: () => [],
  }
);
const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
const model = computed({
  get() {
    const [e1, ...rest] = props.modelValue?.slice(1, -4).split("/");
    return new Proxy(
      { sel: "/" + e1 + "/", inp: rest.join("/") },
      {
        set(obj, name, val) {
          const { sel, inp } = obj;
          if (val.startsWith("/")) {
            val = val.slice(1);
          }
          emits("update:modelValue", `${sel}${val}.vue`);
          // formItem?.validate("input");
          return true;
        },
      }
    );
  },
  set(val) {
    // console.log(val, "val-----------val");
    // emits("update:modelValue", val);
  },
});
</script>
<style lang="scss" scoped></style>
