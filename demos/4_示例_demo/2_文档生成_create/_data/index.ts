// import fs from "fs";
// export const vueStr = fs.readFileSync("../_components/StandardDemoForm.vue");

export const vueStr = `
<!-- summary 标准示例表单
  在这里，会以标准写法来完成文件
  @notice {tip} 此表单仅做示例使用，不含任何业务功能
 -->
<template>
  <el-form class="base-form f-fs-s-c f-1" :model="formData" v-bind="defaultFormAttrs" @keyup.enter="handleEnter" ref="formRef">
    <div class="all-hide-scroll" :class="[newFields.length ? 'f-fs-fs-w' : 'f-c-c', autoFixedFoot && 'auto-fixed-foot']">
      <template v-if="newFields.length">
        <!-- @change="(prop:any,val:any)=>$emit('change',prop,val)" -->
        <FieldItemCol
          :field="field"
          :pureText="field.quickAttrs?.pureText || pureText"
          v-model="formData[field.prop as string]"
          @change="(prop:any,val:any)=>$emit('change',prop,val)"
          :formRef="formRef"
          v-for="(field, ind) in newFields"
          :key="field.key ?? ind"
        >
          <template #custom="{ field: currField }">
            <slot :name="currField.prop" :field="currField" :form="formData"/>
          </template>
        </FieldItemCol>
      </template>
      <BaseEmpty v-else/>
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
      :afterSuccess="onSuccess"
      :fetchFail="fetchFail"
      :disabled="!newFields.length"
      @moreBtns="(name:string, args?:CommonObj, cb?:FinallyNext) => $emit('moreBtns', name, args, cb)"
      @submit="(args:CommonObj)=>$emit('submit', args)"
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
import { FormField, FormFieldAttrs } from "@/core/components/form/_components/FieldItemCol";
import { merge } from "lodash";
import FooterBtns from "@/core/components/form/_components/FooterBtns.vue";
import { isProd } from "@/core/components/_utils";
import { BaseBtnType } from "@/core/components/BaseBtn/_types";
import { defaultFormAttrs } from "@/core/components/form";
import { CommonObj, FinallyNext, UniteFetchType } from "@/core/_types";

/** props Props
 * 描述信息（props）
 * @notice {tip} 这是 props 的 tip 信息
 */
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj; //表单数据
    fields: FormField[]; //表单字段项
    pureText?: boolean; //是否纯文本展示
    fetch?: UniteFetchType; //请求接口，一般跟fetchSuccess，fetchFail一起配合使用
    afterSuccess?: FinallyNext; //fetch请求成功之后的回调方法
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

/** $emit
 * @warning 这是 $emit 的 warning 信息
 */
const $emit = defineEmits<{
  (e: "update:modelValue", args: CommonObj): void; //双向绑定值
  (e: "submit", args: CommonObj): void; //表单提交
  (e: "change", prop: string, val: string | number): void; //change事件
  (e: "moreBtns", name: string, args: CommonObj, cb: FinallyNext): void; //监听操作栏的按钮点击事件
}>();
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
 * @danger 这是 slots 的tip信息
 */
defineSlots<{
  default?: (props: { msg: string }) => any; //默认插槽
  item?: (props: { id: number }) => any; //item插槽
}>();

/** expose 方法(expose)
 * 这是 expose 的 description。通过写入 description 获得
 * @notice {warning} 注意这部分的title——【方法(expose)】是通过写入覆盖默认值的
 */
defineExpose<{
  formRef: any; //表单实例
  validate: () => void; //表单校验
  tempTestFn_1: () => void; //临时的测试方法
}>({
  formRef,
  validate() {
    return footerBtnsRef.value.validate();
  },
  tempTestFn_1: () => {
    console.log("执行了临时的测试方法");
  },
});
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
`;
