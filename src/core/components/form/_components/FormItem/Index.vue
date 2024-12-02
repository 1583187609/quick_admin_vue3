<!-- 表单控件 -->
<template>
  <!-- el-cascader的默认插槽中如果写了v-if之类的条件语句，会导致级联的下拉项的label不会展示，故需要分开处理 -->
  <component
    v-model="modelVal"
    :is="`el-${elType}`"
    v-bind="itemAttrs"
    @blur="handleBlur"
    @focus="handleFocus"
    @change="handleChange"
    v-if="elType === 'cascader'"
  >
    <template #[key] v-for="(val, key) in getSlotsMap(slots)" :key="key">
      <BaseRender :data="val" />
    </template>
  </component>
  <component v-model="modelVal" :is="`el-${elType}`" v-bind="itemAttrs" @blur="handleBlur" @focus="handleFocus" @change="handleChange" v-else>
    <template #[key] v-for="(val, key) in getSlotsMap(slots)" :key="key">
      <BaseRender :data="val" />
    </template>
    <template v-if="elType === 'select'">
      <!-- 分组下拉项 -->
      <template v-if="subOptions?.find(it => !!it.children)">
        <el-option-group v-for="(gItem, gInd) in subOptions" v-bind="deleteAttrs(gItem, ['slots', 'children'])" :key="gInd">
          <!-- <template #[key] v-for="(val, key) in getSlotsMap((gItem as OptionItem).slots)" :key="key"> -->
          <el-option v-bind="deleteAttrs(opt, ['slots'])" v-for="(opt, ind) in gItem.children" :key="ind">
            <template #[key] v-for="(val, key) in getSlotsMap((opt as OptionItem).slots)" :key="key">
              <BaseRender :data="val" />
            </template>
          </el-option>
          <!-- </template> -->
        </el-option-group>
      </template>
      <!-- 不分组下拉项 -->
      <template v-else>
        <el-option v-bind="deleteAttrs(opt, ['slots'])" v-for="(opt, ind) in subOptions" :key="ind">
          <template #[key] v-for="(val, key) in getSlotsMap((opt as OptionItem).slots)" :key="key">
            <BaseRender :data="val" />
          </template>
        </el-option>
      </template>
    </template>
    <template v-else-if="elType === 'radio-group'">
      <component
        :is="`el-radio${$attrs.type ? `-${$attrs.type}` : ''}`"
        v-bind="deleteAttrs(opt, ['slots'])"
        v-for="(opt, ind) in subOptions"
        :key="ind"
      >
        <template #[key] v-for="(val, key) in getSlotsMap(opt?.slots)" :key="key">
          <BaseRender :data="val" />
        </template>
      </component>
    </template>
    <template v-else-if="elType === 'checkbox-group'">
      <!-- 这个表单控件需要特殊处理，不能直接使用v-bind="opt" -->
      <el-checkbox :name="name" v-bind="deleteAttrs(opt, ['slots'])" v-for="(opt, ind) in subOptions" :key="ind">
        <template #[key] v-for="(val, key) in getSlotsMap(opt?.slots)" :key="key">
          <BaseRender :data="val" />
        </template>
      </el-checkbox>
    </template>
  </component>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { CommonSlots, OptionItem } from "@/core/_types";
import { defaultFormItemType, deleteAttrs, getSlotsMap } from "@/core/utils";
import { useFormAttrs } from "@/hooks";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    elType?: string;
    name?: string; // el-checkbox 是必须的
    slots?: CommonSlots;
    subOptions?: OptionItem[];
  }>(),
  {
    elType: defaultFormItemType,
  }
);
const $emit = defineEmits(["update:modelValue", "blur", "focus", "change"]);
const $attrs = useAttrs();
const itemAttrs = useFormAttrs({ ...props, ...$attrs }, ["disabled", "readonly", "size"]);

const modelVal = computed({
  get: () => props.modelValue,
  set: (val: any) => $emit("update:modelValue", val),
});

function handleBlur(e: any = "") {
  const val = e.target?.value ?? e;
  $emit("blur", val, e);
}
function handleFocus(e: any = "") {
  const val = e.target?.value ?? e;
  $emit("focus", val, e);
}
function handleChange(val: any = "") {
  $emit("change", val);
}

// 校验props传参是否合法
function checkProps() {
  const { elType, name } = props;
  if (elType === "checkbox-group" && !name) throw new Error(`checkbox-group需要传入name属性`);
}
checkProps();
</script>
<style lang="scss" scoped></style>
