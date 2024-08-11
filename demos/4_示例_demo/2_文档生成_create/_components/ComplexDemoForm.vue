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
        <!-- @change="(prop:any,val:any)=>emits('change',prop,val)" -->
        <FieldItem
          :field="field"
          :pureText="field.extraAttrs?.pureText || pureText"
          v-model="formData[field.prop as string]"
          @change="(prop:any,val:any)=>emits('change',prop,val)"
          :formRef="formRef"
          v-for="(field, ind) in newFields"
          :key="field.key ?? ind"
        >
          <template #custom="{ field: currField }">
            <slot :name="currField.prop" :field="currField" :form="formData"></slot>
          </template>
        </FieldItem>
      </template>
      <template v-else>空空如也~</template>
    </div>
    <FooterBtns
      :loading="loading"
      :moreBtns="moreBtns"
      :submitText="submitText"
      :resetText="resetText"
      :formRef="formRef"
      :isOmit="isOmit"
      :log="log"
      :debug="debug"
      :params="params"
      :fetch="fetch"
      :fetchSuccess="fetchSuccess"
      :fetchFail="fetchFail"
      :noSubmitProps="noSubmitProps"
      :handleRequest="handleRequest"
      :disabled="!newFields.length"
      @moreBtns="(name:string, args?:CommonObj, cb?:FinallyNext) => emits('moreBtns', name, args, cb)"
      @submit="(args:CommonObj)=>emits('submit', args)"
      ref="footerBtnsRef"
      v-if="!pureText && footer"
    />
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import { FormInstance } from "element-plus";
import { handleFields } from "@/components/form/_utils";
import FieldItem from "@/components/form/_components/FieldItem/Index.vue";
import { FormField, FormFieldAttrs } from "@/components/form/_components/FieldItem";
import { merge } from "lodash";
import FooterBtns from "@/components/form/_components/FooterBtns.vue";
import { isProd } from "@/components/_utils";
import { BaseBtnType } from "@/components/BaseBtn";
import { defaultFormAttrs } from "@/components/form";
import { CommonObj, FinallyNext, UniteFetchType } from "@/vite-env";

/** props Props
 * 通过设置 `@title: Props` 可覆盖默认的 title（属性）。
 * @notice 这是 props 的tip信息
 */
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj; //表单数据
    fields: FormField[]; //表单字段项
    pureText?: boolean; //是否纯文本展示
    fetch?: UniteFetchType; //请求接口，一般跟fetchSuccess，fetchFail一起配合使用
    fetchSuccess?: FinallyNext; //fetch请求成功之后的回调方法
    fetchFail?: FinallyNext; //fetch请求失败之后的回调方法
    span?: string | number; //同ElementPlus 的span，1 ~ 24
    footer?: boolean; //是否显示底部按钮
    submitText?: string; //提交按钮的文字
    resetText?: string; //提交按钮的文字
    extraParams?: CommonObj; //额外的参数
    moreBtns?: BaseBtnType[]; //底部的额外更多按钮
    loading?: boolean; //提交按钮是否显示加载图标
    isOmit?: boolean; //是否剔除掉 undefined，'' 参数
    log?: boolean; //是否通过 console.log 打印输出请求参数和响应参数
    debug?: boolean; //是否终止提交，并打印传参
    isCache?: boolean; //是否缓存
    autoFixedFoot?: boolean; //是否自动固定底部下方按钮（设为false时，盒子阴影才不会被遮挡）
    noSubmitProps?: string[]; //提交表单时，不要提交的prop属性
    handleRequest?: (args: CommonObj) => CommonObj; //处理参数
  }>(),
  {
    modelValue: () => reactive({}),
    log: !isProd,
    grid: 24,
    footer: true,
    isOmit: true,
    autoFixedFoot: true,
    fields: () => [],
  }
);
/** emits
 * @notice 提示类信息可以设置一个，也可以设置多个
 * @notice {warning} 这是 emits 的 warning 信息
 */
const emits = defineEmits([
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
    emits("update:modelValue", val);
  },
});
const params = computed(() => merge({}, formData.value, props.extraParams));

watch(
  () => props.fields,
  newVal => {
    const { modelValue } = props;
    const result = handleFields(newVal, emits, modelValue);
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
    emits("submit", params.value);
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
  getQueryParams(isOmit = props.isOmit) {
    return isOmit ? true : params;
  },
  getQueryFields(excludeKeys = []) {
    const queryFields: any[] = [];
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
//   formValidate: () => void; //表单校验
//   tempTestFn_1: () => void; //临时的测试方法
// }>({
//   formRef,
//   formValidate() {
//     return footerBtnsRef.value.formValidate();
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
