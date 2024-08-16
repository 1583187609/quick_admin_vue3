<!-- summary 摘要描述标题
 * 这是标准示例表单。也是摘要描述内容示例，在这个文件里，会以标准写法来完成文件撰写
 * @notice 这是默认的 tip 信息
 * @notice {tip} 这是声明的 tip 信息
 * @notice {warning} 这是声明的 warning 信息
 * @notice {danger} 这是声明的 danger 信息
 * @notice {details} 这是声明的 details 信息
 * @link https://vue-styleguidist.github.io/docs/Docgen.html#api
 * @link https://www.cnblogs.com/mfyngu/p/13049965.html
-->
<template>
  <el-form class="base-form f-fs-s-c f-1" :model="formData" v-bind="defaultFormAttrs" @keyup.enter="handleEnter" ref="formRef">
    <div class="all-hide-scroll" :class="[newFields.length ? 'f-fs-fs-w' : 'f-c-c', autoFixedFoot && 'auto-fixed-foot']">
      <template v-if="newFields.length">
        <FieldItemCol
          :field="field"
          :pureText="field.extraAttrs?.pureText || pureText"
          v-model="formData[field.prop as string]"
          @change="(prop:FieldPropType,val:any)=>emits('change',prop,val)"
          :formRef="formRef"
          v-for="(field, ind) in newFields"
          :key="field.key ?? ind"
        >
          <template #custom="{ field: currField }">
            <!--
              这是描述信息
              @slot prop 名称即为 插槽名称
              @notice 这是默认的 tip 信息
              @notice {tip} 这是 tip 信息
              @notice {warning} 这是 warning 信息
              @notice {danger} 这是 danger 信息
              @notice {details} 这是 details 信息
            -->
            <slot :name="currField.prop" :field="currField" :form="formData" />
          </template>
        </FieldItemCol>
      </template>
      <BaseEmpty v-else />
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
import FieldItemCol from "@/components/form/_components/FieldItemCol/Index.vue";
import { FormField, FormFieldAttrs, FieldPropType } from "@/components/form/_components/FieldItem/_types";
import _ from "lodash";
import FooterBtns from "@/components/form/_components/FooterBtns.vue";
import { isProd } from "@/components/_utils";
import { BaseBtnType } from "@/components/BaseBtn/_types";
import { defaultFormAttrs } from "@/components/form";
import { CommonObj, FinallyNext, UniteFetchType } from "@/vite-env";

const { merge } = _;
/** props Props属性自定义标题
 * 这是props的描述
 * @notice 这是 props 的 tip 信息
 */
const props = withDefaults(
  defineProps<{
    modelValue?: CommonObj; //表单数据的双向绑定值
    fields: FormField[]; //表单字段项(数组)
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
    /**
     * 处理参数（如果有type，则返回type，否则返回 param 和 return 推导的类型
     * @type {(args: CommonObj) => CommonObj} TS类型
     * @param {CommonObj} args 请求参数
     * @returns {CommonObj} 返回参数
     */
    handleRequest?: (args: CommonObj) => CommonObj;
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
 * @notice {warning} 这是 emits 的 warning 信息
 */
// const emits = defineEmits<{
//   (e: "update:modelValue", args: CommonObj): void; //双向绑定值
//   (e: "submit", args: CommonObj): void; //表单提交
//   (e: "change", prop: string, val: string | number): void; //change事件
//   (e: "moreBtns", name: string, args: CommonObj, cb: FinallyNext): void; //监听操作栏的按钮点击事件
// }>();

// 3.3+：另一种更简洁的语法  具名元组语法
const emits = defineEmits<{
  /**
   * 双向绑定更新值
   * @type {vals: CommonObj}
   */
  "update:modelValue": [CommonObj];
  /**
   * 提交事件
   * @type {args: CommonObj}
   */
  submit: [CommonObj];
  /**
   * 提交事件
   * @type {prop: string, val: string | number}
   */
  change: [prop: string, val: string | number];
  /**
   * 更多按钮
   * @type {name: string, args: CommonObj, cb: FinallyNext}
   */
  moreBtns: [name: string, args: CommonObj, cb: FinallyNext];
}>();
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
 * @notice 这是默认的 tip 信息
 * @notice {warning} 这是 warning 信息
 * @notice {danger} 这是 danger 信息
 * @notice {details} 这是 details 信息
 */
defineSlots<{
  /**
   * 默认插槽
   */
  defaultTest?: (props: { msg: string }) => any;
  /**
   * item插槽
   */
  itemTest?: (props: { id: number }) => any;
}>();

/** expose 方法(expose)
 * 这是 expose 的 description。通过写入 description 获得
 * @notices {warning} 注意这部分的title——【方法(expose)】是通过写入覆盖默认值的
 */
defineExpose<{
  /**
   * 表单实例
   */
  formRef: any;
  /**
   * 表单校验
   */
  formValidate: (str: string, arr: string[]) => any;
  /**
   * 临时的测试方法
   */
  tempTestFn_1: () => void;
}>({
  /**
   * 表单实例
   * @type {(str: string, arr: string[])=>void} 如果存在type ，会替代 param -> return 的推导过程
   */
  formRef,
  /**
   * 表单校验
   * @param {string} str 传入的字符串
   * @param {string[]} arr 传入的数组
   * @returns {void}
   */
  formValidate(str: string, arr: string[]) {
    return footerBtnsRef.value.formValidate();
  },
  //表单测试
  tempTestFn_1: () => {
    console.log("执行了临时的测试方法");
    return 1;
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
