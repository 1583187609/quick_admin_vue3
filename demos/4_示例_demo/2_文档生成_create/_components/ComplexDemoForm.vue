<!-- summary 复杂示例表单
  在这里，会考虑其他复杂边界情况的解析处理
  @notice 此表单仅做示例使用，不含任何业务功能
 -->
<!-- summary
  @notice {warning} 这是warning信息示例
  @notice {danger} 这是danger信息示例
-->
<template>
  <el-form class="base-form f-fs-s-c f-1" :model="formData" v-bind="defaultFormAttrs" @keyup.enter="handleEnter" ref="formRef">
    <div class="all-hide-scroll" :class="[newFields.length ? 'f-fs-fs-w' : 'f-c-c', autoFixedFoot && 'auto-fixed-foot']">
      <template v-if="newFields.length">
        <FieldItemCol
          :field="field"
          :pureText="field.quickAttrs?.pureText || pureText"
          v-model="formData[field.prop as string]"
          @change="(prop:FieldPropType,val:any)=>$emit('change',prop,val)"
          :formRef="formRef"
          v-for="(field, ind) in newFields"
          :key="field.key ?? ind"
        >
          <template #custom="{ field: currField }">
            <slot :name="currField.prop" :field="currField" :form="formData" />
          </template>
        </FieldItemCol>
      </template>
      <template v-else>
        <BaseEmpty />
      </template>
    </div>
    <FooterBtns
      :loading="loading"
      :moreBtns="moreBtns"
      :submitBtn="submitBtn"
      :resetBtn="resetBtn"
      :formRef="formRef"
      :omits="omits"
      :log="log"
      :debug="debug"
      :params="params"
      :afterSuccess="afterSuccess"
      :onFail="onFail"
      :disabled="!newFields.length"
      :renderData="footer"
      @moreBtns="(name:string, args?:CommonObj, cb?:FinallyNext) => $emit('moreBtns', name, args, cb)"
      @submit="$attrs.onSubmit"
      ref="footerBtnsRef"
      v-if="!pureText && footer"
    />
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import { FormInstance } from "element-plus";
import { handleFields } from "@/core/components/form/_utils";
import FieldItemCol from "@/core/components/form/_components/FieldItemCol/Index.vue";
import { FormField, FormFieldAttrs, FieldPropType } from "@/core/components/form/_components/FieldItem/_types";
import _ from "lodash";
import FooterBtns from "@/core/components/form/_components/FooterBtns.vue";
import { isProd } from "@/core/components/_utils";
import { BaseBtnType } from "@/core/components/BaseBtn/_types";
import { defaultFormAttrs } from "@/core/components/form";
import { CommonObj, FinallyNext, UniteFetchType } from "@/core/_types";
import { KeyValItem } from "@/core/components/crud/BaseCrud/_types";

const { merge } = _;
/** props Props
 * 通过设置 `@title: Props` 可覆盖默认的 title（属性）。
 * @notice 这是 props 的tip信息
 */
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj; //表单数据
    fields: FormField[]; //表单字段项
    pureText?: boolean; //是否纯文本展示
    afterSuccess?: FinallyNext; //fetch请求成功之后的回调方法
    onFail?: FinallyNext; //fetch请求失败之后的回调方法
    span?: string | number; //同ElementPlus 的span，1 ~ 24
    footer?: boolean; //是否显示底部按钮
    submitBtn?: FootBtn; //提交按钮的文字
    resetBtn?: FootBtn; //提交按钮的文字
    extraParams?: CommonObj; //额外的参数
    moreBtns?: BaseBtnType[]; //底部的额外更多按钮
    loading?: boolean; //提交按钮是否显示加载图标
    omits?: boolean; //是否剔除掉值为 undefined, null, “” 的参数
    log?: boolean; //是否通过 console.log 打印输出请求参数和响应参数
    debug?: boolean; //是否终止提交，并打印传参
    autoFixedFoot?: boolean; //是否自动固定底部下方按钮（设为false时，盒子阴影才不会被遮挡）
  }>(),
  {
    modelValue: () => reactive({}),
    grid: 24,
    footer: true,
    omits: true,
    autoFixedFoot: true,
    fields: () => [],
  }
);
/** $emit
 * @notice 提示类信息可以设置一个，也可以设置多个
 * @notice {warning} 这是 $emit 的 warning 信息
 */
const $emit = defineEmits([
  "update:modelValue", // 双向绑定（无Ts）
  "submit", // 提交（无Ts）
  "change", // 变化（无Ts）
  "moreBtns", // 更多按钮（无Ts）
]);
const footerBtnsRef = ref<any>(null);
const formRef = ref<FormInstance>();
const newFields = ref<FormFieldAttrs[]>([]);
const formData = computed({
  get() {
    return props.modelValue;
  },
  set(val: CommonObj) {
    $emit("update:modelValue", val);
  },
});
const params = computed(() => merge({}, formData.value, props.extraParams));

watch(
  () => props.fields,
  newVal => {
    const { modelValue } = props;
    const result = handleFields(newVal, $emit, modelValue);
    const { data, fields } = result;
    newFields.value = fields;
    merge(formData.value, data);
  },
  { immediate: true, deep: true }
);
//处理表单的enter时间
function handleEnter() {
  if (props.fetch) {
    footerBtnsRef.value.submit();
  } else {
    $emit("submit", params.value);
  }
}
/** slots
 * @notice {danger} 这是 slots 的tip信息
 */
defineSlots<{
  default?: (props: { msg: string }) => any; //             默认插槽
  tempTest?: (props: { id: number }) => any; //这是临时写的用作测试的插槽
}>();

/** expose 方法(expose)
 * 这是 expose 的 description。通过写入 description 获得
 * @notice {warning} 注意这部分的title——【方法(expose)】是通过写入覆盖默认值的
 */
const refreshList = () => {};
defineExpose({
  // 这是测试方法
  refreshList,
  getList: () => {},
  getQueryParams(omits = props.omits) {
    return omits ? true : params;
  },
  getQueryFields(excludeKeys = []) {
    const queryFields: KeyValItem[] = [];
    const rangeKeys: string[] = [];
    const propFields = [];
    rangeKeys.forEach(prop => {
      const [minKey, maxKey] = prop.split(",");
      const minVal = params[minKey];
      const maxVal = params[maxKey];
      const target: any = propFields.find((it: FormFieldAttrs) => it.prop!.includes(prop));
      if (target && (minVal || maxVal)) {
        queryFields.push({
          label: target.label,
          value: [minVal, maxVal].join("~"),
        });
      }
    });
    return queryFields;
  },
});
// 下面注释是故意放这里的
// defineExpose<{
//   formRef: any; //表单实例
//   validate: () => void; //表单校验
//   tempTestFn_1: () => void; //临时的测试方法
// }>({
//   formRef,
//   validate() {
//     return footerBtnsRef.value.validate();
//   },
//   tempTestFn_1: () => {
//     console.log("执行了临时的测试方法");
//   },
// });
</script>
<style lang="scss" scoped>
.base-form {
  height: 100%;
}
.auto-fixed-foot {
  overflow: auto;
  overscroll-behavior: auto;
}
</style>
