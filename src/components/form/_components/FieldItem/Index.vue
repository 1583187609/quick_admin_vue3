<template>
  <!-- 如果下面这样写，会导致内置的表单校验pattern失效 -->
  <!-- v-bind="deleteAttrs(newField, ['children', 'popover', 'attrs'])" -->
  <el-form-item
    class="field-item"
    v-bind="prefixProp && !newField.labelWidth ? deleteAttrs(newField, ['label']) : newField"
    :class="className"
  >
    <template #label v-if="!prefixProp || newField.labelWidth">
      <BaseRender :data="newField.label" />
      <el-popover v-bind="popoverAttrs" v-if="popoverAttrs">
        <template #reference>
          <BaseIcon :color="cssVars.colorInfo" class="icon-popover" :class="size" name="QuestionFilled"></BaseIcon>
        </template>
        <BaseRender :data="popoverAttrs.defaultSlot" v-if="popoverAttrs.defaultSlot" />
      </el-popover>
    </template>
    <div class="mr-h" v-if="newField.extraAttrs?.before">
      <BaseRender :data="newField.extraAttrs.before" />
    </div>
    <template v-if="!subFields.length">
      <template v-if="newField.extraAttrs?.pureText || pureText">{{ getKeyVal(newField, newVal).value ?? "-" }}</template>
      <template v-else>
        <!-- 以下按照使用频率高低排序 -->
        <el-input
          :class="flexClass"
          v-debounce:input="(e:any)=>handleInput(e, newField.prop as string)"
          @clear="() => emits('change', newField.prop, '')"
          v-model.trim="newVal"
          v-bind="newField.attrs"
          v-if="newField.type === 'input'"
        >
          <!-- <component :is="newField?.slots" v-if="newField?.slots"></component> -->
          <template #[key] v-for="(val, key) in newField?.slots" :key="key">
            <BaseRender :data="val" />
          </template>
        </el-input>
        <el-select
          :class="flexClass"
          @change="(val:any)=> emits('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'select'"
        >
          <template v-for="(opt, ind) in newField.options" :key="ind">
            <el-option v-bind="deleteAttrs(opt, ['customOption'])" v-if="opt?.customOption">
              <BaseRender :data="opt.customOption" />
            </el-option>
            <el-option v-bind="opt" v-else />
          </template>
          <template #[key] v-for="(val, key) in newField?.slots" :key="key">
            <BaseRender :data="val" />
          </template>
        </el-select>
        <el-date-picker
          :class="flexClass"
          @change="(val:any)=> emits('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'date-picker'"
        >
          <template #[key] v-for="(val, key) in newField?.slots" :key="key">
            <BaseRender :data="val" />
          </template>
        </el-date-picker>
        <el-radio-group
          @change="(val:any)=> emits('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'radio-group'"
        >
          <template v-if="newField?.attrs?.type === 'button'">
            <el-radio-button :disabled="opt.disabled" :value="opt.value" v-for="(opt, ind) in newField.options" :key="ind">
              {{ opt.label }}
            </el-radio-button>
          </template>
          <template v-else>
            <el-radio :disabled="opt.disabled" :value="opt.value" v-for="(opt, ind) in newField.options" :key="ind">
              {{ opt.label }}
            </el-radio>
          </template>
        </el-radio-group>
        <el-checkbox-group
          @change="(val:any)=> emits('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'checkbox-group'"
        >
          <!-- 这个表单控件需要特殊处理，不能直接使用v-bind="opt" -->
          <el-checkbox
            :disabled="opt.disabled"
            :value="opt.value"
            v-bind="deleteAttrs(opt, ['label'])"
            :name="(newField.prop as string)"
            v-for="(opt, ind) in newField.options"
            :key="ind"
          >
            <BaseRender :data="opt.label" />
          </el-checkbox>
        </el-checkbox-group>
        <el-input-number
          @change="(val:any)=> emits('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'input-number'"
        />
        <el-switch
          @change="(val:any)=> emits('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'switch'"
        />
        <el-cascader
          :class="flexClass"
          @change="(val:any)=> emits('change', newField.prop, val ?? '')"
          v-model="newVal"
          :options="newField.options"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'cascader'"
        >
          <template #[key] v-for="(val, key) in newField?.slots" :key="key">
            <BaseRender :data="val" />
          </template>
        </el-cascader>
        <slot name="custom" :field="newField" v-else-if="newField.type === 'custom'">
          <div class="err">【自定义】{{ `${newField.label}（${newField.prop})` }}</div>
        </slot>
        <BaseNumberRange
          :class="flexClass"
          @change="(prop:string, val:any)=> emits('change', prop, val ?? '')"
          :size="size"
          v-model="newVal"
          v-bind="newField"
          v-else-if="newField.type === 'BaseNumberRange'"
        />
        <BaseUpload
          @change="(val:any)=> emits('change', newField.prop, val ?? '')"
          v-bind="newField.attrs"
          v-model="newVal"
          v-else-if="newField.type === 'BaseUpload'"
        />
        <!-- <BasicEditor
          @change="(val:any)=> emits('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'BasicEditor'"
        ></BasicEditor> -->
        <el-autocomplete
          :class="flexClass"
          @change="(val:any)=> emits('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'autocomplete'"
        >
          <template #[key] v-for="(val, key) in newField?.slots" :key="key">
            <BaseRender :data="val" />
          </template>
        </el-autocomplete>
        <el-slider
          :class="flexClass"
          @change="(val:any)=> emits('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'slider'"
        />
        <el-checkbox
          @change="(val:any)=> emits('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'checkbox'"
        >
          <!-- <BaseRender
            :data="newField?.slots?.default || newField.label"
          /> -->
        </el-checkbox>
        <!-- <el-time-picker
          @change="(val:any)=> emits('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'time-picker'"
        />
        <el-time-select
          @change="(val:any)=> emits('change', newField.prop, val ?? '')"
          v-model="newVal"
          v-bind="newField.attrs"
          v-else-if="newField.type === 'time-select'"
        /> -->
        <div class="empty" v-bind="newField.attrs" v-else-if="newField.type === 'empty'"></div>
        <div class="err" v-else>【不存在】{{ newField.type }}</div>
        <div class="ml-h" v-if="newField.extraAttrs?.after">
          <BaseRender :data="newField.extraAttrs?.after" />
        </div>
      </template>
      <template v-if="newField.extraAttrs?.tips">
        <div class="show-tips" v-html="'注：' + newField.extraAttrs.tips"></div>
      </template>
    </template>
    <!-- 当有子项表单时 -->
    <template v-else>
      <AddDelList
        :parentProp="newField.prop"
        :fields="subFields"
        :pureText="pureText"
        v-model="newVal"
        :formRef="formRef"
        v-if="newField.type === 'addDel'"
      />
      <template v-for="(cField, cInd) in subFields" :key="cInd" v-else>
        <!-- :field="deleteAttrs(cField, ['label'])" -->
        <FieldItem
          :prefixProp="newField.prop as string"
          :field="cField"
          :pureText="cField.extraAttrs?.pureText || pureText"
          v-model="newVal[cField.prop as string]"
          className="mr-o"
          v-bind="cField"
        />
      </template>
    </template>
  </el-form-item>
</template>
<script lang="ts">
export default {
  name: "FieldItem",
  inheritAttrs: false,
};
</script>
<script lang="ts" setup>
// 表单校验规则参考：https://blog.csdn.net/m0_61083409/article/details/123158056
import { ref, reactive, watch, useAttrs, computed } from "vue";
import { merge, cloneDeep } from "lodash";
import { typeOf, getTextFromOpts, deleteAttrs, getPopoverAttrs, defaultFormItemType, showMessage } from "@/components/_utils";
import cssVars from "@/assets/styles/_var.module.scss";
import { CommonObj, OptionItem, StrNum, CommonSize } from "@/vite-env";
import { FormField, FormFieldAttrs, PopoverAttrs } from "./index";
import { FormItemRule } from "element-plus";
import { defaultFieldAttrs, defaultValidTypes } from ".";
import AddDelList from "./_components/AddDelList.vue";
import { rangeJoinChar } from "@/components/_utils";
import { useDictMap } from "@/hooks";
import { CascaderName, DictName } from "@/dict";

export interface RuleItem {
  type?: string; // string, number, boolean, method, regexp, integer, float, array, object, enum, date, url, hex, email, any
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  //min, max: type为array, string时，指长度。为number时，指大小
  min?: StrNum;
  max?: StrNum;
  len?: any; //type为array, string时，指长度。为number时，指值
  enum?: any; //例：{ type: 'enum', enum: ['admin', 'user', 'guest'] }
  // Deep Rules 对象的深层规则
  // fields: any; // 对象的属性名，数组的下标
  // defaultField: any; // 应用于对象、数组内的所有成员
  // transform: any; // 方法，对值的预处理
  // validator: any; // 自定义验证方法
  // asyncValidator: any; // 自定义异步验证方法
}
const props = withDefaults(
  defineProps<{
    prefixProp?: string; //前置prop属性
    // isLastChild?: boolean; // 是否是 addDel 列表中的最后一个 child
    field: FormFieldAttrs;
    pureText?: boolean; //是否展示纯文本
    modelValue?: any;
    className?: any;
    inputDebounce?: boolean;
    size?: CommonSize;
    formRef?: any;
  }>(),
  {}
);
const emits = defineEmits(["update:modelValue", "change"]);
const newVal = computed({
  get() {
    return props.modelValue;
  },
  set(val: any) {
    emits("update:modelValue", val);
  },
});
let popoverAttrs: any;
const { getCascaderOpts, getOpts } = useDictMap();
const subFields = ref<FormFieldAttrs[]>([]);
const newField = computed<FormFieldAttrs>(() => {
  const { prefixProp, field, size } = props;
  const { type: fType, label, extraAttrs = {}, children, slots } = field;
  let tempField: FormFieldAttrs = JSON.parse(JSON.stringify(field));
  // let tempField: FormFieldAttrs = field;
  if (children?.length) {
    const { required } = field;
    subFields.value = children as FormFieldAttrs[];
    // // 当是 addDel 类型的子项时，如果子项都未设置 required，则默认父级需显示必传红星符号
    // if (fType === "addDel") {
    //   const someRequired = children.some((item: FormField, ind: number) => {
    //     const isLast = ind === children.length - 1;
    //     if (typeof item === "object") return item?.required ?? (isLast ? true : false);
    //     return false;
    //   });
    //   if (someRequired) tempField.required = true;
    // } else {
    // 当子项有一个必填项时，父级自动变为必填项
    if (!required) {
      const someRequired = children.some((item: FormField) => {
        if (typeof item === "object") return item?.required ?? false;
        return false;
      });
      if (someRequired) tempField.required = true;
    }
    // }
  } else {
    const { valid = "" } = extraAttrs;
    const validField: CommonObj = valid ? defaultValidTypes[valid] : {};
    const { type: vType } = validField;
    const type = fType || vType || defaultFormItemType;
    const defField = defaultFieldAttrs[type];
    // tempField = merge({ type, required: prefixProp ? true : false }, defField, validField, field);
    tempField = merge({ type }, defField, validField, field);
    const { getAttrs } = tempField?.attrs ?? {};
    getAttrs && merge(tempField, { attrs: getAttrs(tempField) }, field);
    let { options } = tempField;
    if (typeof options === "string")
      tempField.options = type === "cascader" ? getCascaderOpts(options as CascaderName) : getOpts(options as DictName);
    popoverAttrs = getPopoverAttrs(tempField.extraAttrs?.popover);
    tempField.prop = prefixProp ? `${prefixProp}.${field.prop}` : field.prop;
    tempField.rules = getRules(tempField, field.rules);
    if (tempField?.attrs?.placeholder) {
      tempField.attrs.placeholder = getPlaceholder(tempField);
    }
    if (typeof slots === "string") {
      tempField.slots = { default: slots };
    }
  }
  // if (size === "small" && type === "date-picker") {
  //   tempField.labelWidth = label.length + 0.5 + "em";
  // }
  // delete tempField.popover; //如果将popover一并v-bind在el-form-item上，会导致该表单字段不会渲染出来，故需要单独特殊处理
  // delete tempField.extraAttrs; //此处不能删除
  delete tempField.children; //需要删除，不然会在子级表单项上 v-bind 时触发 children 警告
  return tempField;
});
const flexClass = { "f-1": newField.value.extraAttrs?.before || newField.value.extraAttrs?.after };
function getPlaceholder(field: FormFieldAttrs) {
  const { label = "", extraAttrs = {} } = field;
  const { example } = extraAttrs;
  let phr = field?.attrs?.placeholder ?? "";
  phr = phr.replace("${label}", label);
  if (example) phr += `，例：${example}`;
  return phr;
}
/**
 * 获取表单校验的rules
 * @params rules 不能取 合并之后的tempField上的rules
 */
function getRules(field: FormFieldAttrs, rules: RuleItem[] = []) {
  const { label = "", required, extraAttrs = {} } = field;
  const { valid } = extraAttrs;
  const validField: CommonObj = valid ? defaultValidTypes[valid] : {};
  const newRules: FormItemRule[] = [
    ...(validField.rules || []),
    ...(required ? [{ required, message: label + "必填", trigger: "blur" }] : []),
    ...rules,
  ];
  const _rules = mergeRules(newRules);
  return _rules;
}
//合并表单校验的rules
function mergeRules(rules: FormItemRule[] = []) {
  const arr: FormItemRule[] = [];
  rules.forEach((item: CommonObj, ind: number) => {
    const keys: string[] = ["required", "min", "max", "pattern", "validator"];
    const { type } = item;
    const findInd = rules.findIndex((it: CommonObj, i: number) => {
      // if (i < ind) return false;
      let isFind = false;
      if (type) {
        isFind = it.type === type;
      } else {
        isFind = !!keys.find((k, j) => item[k] !== undefined && it[k] !== undefined);
      }
      return isFind;
    });
    if (findInd === -1) {
      arr.push(item);
    } else {
      arr[findInd] = item;
    }
  });
  return arr;
}
// console.log(
//   "mergeRules----------",
//   mergeRules([
//     { required: true, message: "必填1" },
//     { max: 10, message: "最大10" },
//     { min: 10, message: "最小10" },
//     { pattern: /1/, message: "正则1" },
//     { max: 20, message: "最大20" },
//     { pattern: /2/, message: "正则2" },
//     { required: true, message: "必填2" },
//     { min: 20, message: "最小20" },
//   ])
// );
//获取表单键值对的值
function getKeyVal(field: FormFieldAttrs, val: any) {
  const { type = defaultFormItemType, label, attrs = {}, options = [], extraAttrs = {} } = field;
  const { after = "" } = extraAttrs;
  if (["select", "radio-group"].includes(type)) {
    val = options?.find(it => it.value === val)?.label;
  } else if (type.includes("Time") || type.includes("date")) {
    const { format } = merge({}, defaultFieldAttrs[type]?.attrs, attrs);
    const isArr = typeOf(val) === "Array";
    const joinStr = ` ${rangeJoinChar} `;
    if (props.pureText) {
      val = isArr ? val.join(joinStr) : val;
    } else {
      val = isArr ? val.map((it: any) => it.format(format)).join(joinStr) : val?.format(format);
    }
  } else if (type === "checkbox-group") {
    val = options
      ?.filter((it: OptionItem) => val.includes(it.value))
      ?.map((it: OptionItem) => it.label)
      .join("，");
  } else if (type === "input-number") {
    val = val ? val + after : "-";
  } else if (type === "switch") {
    const { activeText = "是", inactiveText = "否", activeValue } = attrs;
    val = activeValue === val ? activeText : inactiveText;
  } else if (type === "checkbox") {
    val = val ? "是" : "否";
  } else if (type === "cascader") {
    val = getTextFromOpts(attrs?.options, val) || "-";
  } else if (type === "BaseNumberRange") {
    val = val.join(rangeJoinChar);
  } else if (type === "custom") {
    val = "-";
  }
  // else {
  //   val = "暂未解析";
  // }
  return {
    label,
    value: val,
  };
}
function handleInput(e: any, prop: string) {
  if (props.inputDebounce) {
    const inp = e.querySelector("input") || e.querySelector("textarea");
    const val = inp.value;
    emits("change", prop, val);
  }
}
defineExpose({});
</script>
<style lang="scss" scoped>
.field-item {
}
.err {
  color: $color-danger;
}
.icon-popover {
  margin-left: 2px;
  margin-top: 9px;
  &.small {
    margin-left: 0;
    margin-top: 7px;
  }
}
.hide-tips,
.show-tips {
  font-weight: 500;
  line-height: 2;
  width: 100%;
  font-size: $font-size-lighter;
  :deep(a) {
    text-decoration: underline;
    &:hover {
      color: $color-primary;
    }
  }
}
.hide-tips {
  // background: $color-bg-main;
}
.show-tips {
  color: $color-text-light;
}
// .empty {
//   margin-right: auto;
// }
</style>
