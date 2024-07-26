# 测试

## Ts属性示例

### Vue Props

#### Ts类型


``` ts
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
  }>
```




::: details

``` md
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
```

:::


#### 表格展示

|属性|说明|类型|默认值|
|:---:|:---:|:---:|:---:|
|`modelValue`|表单数据|`CommonObj`|-|
|`fields`|表单字段项|`FormField[]`|-|
|`pureText`|是否纯文本展示|`boolean`|-|
|`fetch`|请求接口，一般跟`fetchSuccess`，`fetchFail`一起配合使用|`UniteFetchType`|-|
|`fetchSuccess`|`fetch`请求成功之后的回调方法|`FinallyNext`|-|
|`fetchFail`|`fetch`请求失败之后的回调方法|`FinallyNext`|-|
|`span`|同`ElementPlus `的`span`，`1 `~ `24`|`string \| number`|-|
|`footer`|是否显示底部按钮|`boolean`|-|
|`submitText`|提交按钮的文字|`string`|-|
|`resetText`|提交按钮的文字|`string`|-|
|`extraParams`|额外的参数|`CommonObj`|-|
|`moreBtns`|底部的额外更多按钮|`BaseBtnType[]`|-|
|`loading`|提交按钮是否显示加载图标|`boolean`|-|
|`isOmit`|是否剔除掉 `undefined`，'' 参数|`boolean`|-|
|`log`|是否通过 `console.log `打印输出请求参数和响应参数|`boolean`|-|
|`debug`|是否终止提交，并打印传参|`boolean`|-|
|`isCache`|是否缓存|`boolean`|-|
|`autoFixedFoot`|是否自动固定底部下方按钮（设为`false`时，盒子阴影才不会被遮挡）|`boolean`|-|
|`noSubmitProps`|提交表单时，不要提交的`prop`属性|`string[]`|-|
|`handleRequest`|处理参数|`(args: CommonObj) => CommonObj`|-|

### TS Interface

#### Ts 类型


``` ts
interface FormFieldAttrs {
  key?: any; //v-for的key，如果不写，则是默认的index作为key
  type?: FormItemType; //控件类型，例：input
  /**
   * 下面都是为了迎合业务需求而新添加的属性
   */
  // extraAttrs?: {
  //   span?: number; //占位栅栏的宽度，同ElementPlus 的 span 1~24
  //   example?: string; //示例，写在placeholder中的示例文本
  //   popover?: string | PopoverAttrs; //ElementPlus 的 popover组件
  //   tips?: string; //注意提示语，位于字段的下方
  //   pureText?: boolean; //是否纯文本展示
  //   valid?: ValidType; //校验类型
  //   before?: any; //字段前面拼接的内容，可以是文本、组件等
  //   after?: any; //字段后面拼接的内容，可以是文本、组件等
  //   className?: string | CommonObj | any[]; //写在el-form-item上的类名
  // };
  children?: FormField[];
  //控件的属性，例：placeholder
  attrs?: CommonObj;
  //插槽
  slots?: SlotsType;
  /**
   * 下面是 el-form-item 的属性
   */
  prop?: string | [string, string]; //属性名，当存在children时，可以不传
  label: string;
  class?: any; //el-form-item 的class属性
  style?: any; //el-form-item 的style属性
  required?: boolean; //是否必填
  rules?: FormRules[]; //校验规则
  options?: DictName | CascaderName | OptionItem[]; //select、cascader等的options属性
  labelWidth?: string | number; //label文字的宽度
  fetchSuggestions?: (queryStr: string, cb: any) => void; //autocomplete 时候的参数
}
```




::: details

``` md
key?: any; //v-for的key，如果不写，则是默认的index作为key
  type?: FormItemType; //控件类型，例：input
  /**
   * 下面都是为了迎合业务需求而新添加的属性
   */
  // extraAttrs?: {
  //   span?: number; //占位栅栏的宽度，同ElementPlus 的 span 1~24
  //   example?: string; //示例，写在placeholder中的示例文本
  //   popover?: string | PopoverAttrs; //ElementPlus 的 popover组件
  //   tips?: string; //注意提示语，位于字段的下方
  //   pureText?: boolean; //是否纯文本展示
  //   valid?: ValidType; //校验类型
  //   before?: any; //字段前面拼接的内容，可以是文本、组件等
  //   after?: any; //字段后面拼接的内容，可以是文本、组件等
  //   className?: string | CommonObj | any[]; //写在el-form-item上的类名
  // };
  children?: FormField[];
  //控件的属性，例：placeholder
  attrs?: CommonObj;
  //插槽
  slots?: SlotsType;
  /**
   * 下面是 el-form-item 的属性
   */
  prop?: string | [string, string]; //属性名，当存在children时，可以不传
  label: string;
  class?: any; //el-form-item 的class属性
  style?: any; //el-form-item 的style属性
  required?: boolean; //是否必填
  rules?: FormRules[]; //校验规则
  options?: DictName | CascaderName | OptionItem[]; //select、cascader等的options属性
  labelWidth?: string | number; //label文字的宽度
  fetchSuggestions?: (queryStr: string, cb: any) => void; //autocomplete 时候的参数
```

:::


#### 表格展示

|属性|说明|类型|默认值|
|:---:|:---:|:---:|:---:|
|`key`|`v-for`的`key`，如果不写，则是默认的`index`作为`key`|`any`|-|
|`type`|控件类型，例：`input`|`FormItemType`|-|
|`children`|};   `className`?: `string `| `CommonObj `| `any`[];|`FormField[]`|-|
|`attrs`|控件的属性，例：`placeholder`|`CommonObj`|-|
|`slots`|插槽|`SlotsType`|-|
|`prop`|属性名，当存在`children`时，可以不传|`string \| [string, string]`|-|
|`label`||`string`|-|
|`class`|`el-form-item `的`class`属性|`any`|-|
|`style`|`el-form-item `的`style`属性|`any`|-|
|`required`|是否必填|`boolean`|-|
|`rules`|校验规则|`FormRules[]`|-|
|`options`|`select`、`cascader`等的`options`属性|`DictName \| CascaderName \| OptionItem[]`|-|
|`labelWidth`|`label`文字的宽度|`string \| number`|-|
|`fetchSuggestions`|`autocomplete `时候的参数|`(queryStr: string, cb: any) => void`|-|

### TS Type

#### Ts 类型


``` ts
type FormItemType =
  | "input"
  | "select"
  | "date-picker"
  | "radio-group"
  | "checkbox-group"
  | "input-number"
  | "switch"
  | "cascader"
  | "custom"
  | "BaseNumberRange"
  | "autocomplete"
  | "slider"
  | "checkbox"
  | "empty"
  | "time-picker"
  | "time-select"
  | "BaseUpload"
  | "BaseEditor"
  | "addDel";
```




::: details

``` md
| "input"
  | "select"
  | "date-picker"
  | "radio-group"
  | "checkbox-group"
  | "input-number"
  | "switch"
  | "cascader"
  | "custom"
  | "BaseNumberRange"
  | "autocomplete"
  | "slider"
  | "checkbox"
  | "empty"
  | "time-picker"
  | "time-select"
  | "BaseUpload"
  | "BaseEditor"
  | "addDel"
```

:::


