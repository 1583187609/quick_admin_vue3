# 摘要描述标题

这是标准示例表单。也是摘要描述内容示例，在这个文件里，会以标准写法来完成文件撰写


::: tip
这是声明的 `tip `信息
:::

::: warning
这是声明的 `warning `信息
:::

::: danger
这是声明的 `danger `信息
:::

::: details
这是声明的 `details `信息
:::



## Info

``` md
{"exportName":"default","displayName":"StandardDemoForm","description":"","tags":{},"expose":[{"name":"formRef","description":"表单实例","tags":[{"title":"type","type":{"name":"(str: string, arr: string[])=>void"},"description":"如果存在type ，会替代 param -> return 的推导过程"}]},{"name":"formValidate","description":"表单校验","tags":[{"title":"param","type":{"name":"string"},"name":"str","description":"传入的字符串"},{"title":"param","type":{"name":"string[]"},"name":"arr","description":"传入的数组"},{"title":"returns","type":{"name":"void"}}]},{"name":"tempTestFn_1","description":"表单测试","tags":[{"title":"returns","type":{"name":"void"}}]}],"props":[{"name":"modelValue","description":"表单数据的双向绑定值","required":false,"type":{"name":"CommonObj"},"defaultValue":{"func":false,"value":"() => reactive({})"}},{"name":"fields","description":"表单字段项","required":true,"type":{"name":"Array","elements":[{"name":"FormField"}]},"defaultValue":{"func":false,"value":"() => []"}},{"name":"pureText","description":"是否纯文本展示","required":false,"type":{"name":"boolean"}},{"name":"fetch","description":"请求接口，一般跟fetchSuccess，fetchFail一起配合使用","required":false,"type":{"name":"UniteFetchType"}},{"name":"fetchSuccess","description":"fetch请求成功之后的回调方法","required":false,"type":{"name":"FinallyNext"}},{"name":"fetchFail","description":"fetch请求失败之后的回调方法","required":false,"type":{"name":"FinallyNext"}},{"name":"span","description":"同ElementPlus 的span，1 ~ 24","required":false,"type":{"name":"union","elements":[{"name":"string"},{"name":"number"}]},"defaultValue":{"func":false,"value":"24"}},{"name":"footer","description":"是否显示底部按钮","required":false,"type":{"name":"boolean"},"defaultValue":{"func":false,"value":"true"}},{"name":"submitText","description":"提交按钮的文字","required":false,"type":{"name":"string"}},{"name":"resetText","description":"提交按钮的文字","required":false,"type":{"name":"string"}},{"name":"extraParams","description":"额外的参数","required":false,"type":{"name":"CommonObj"}},{"name":"moreBtns","description":"底部的额外更多按钮","required":false,"type":{"name":"Array","elements":[{"name":"BaseBtnType"}]}},{"name":"loading","description":"提交按钮是否显示加载图标","required":false,"type":{"name":"boolean"}},{"name":"isOmit","description":"是否剔除掉 undefined，'' 参数","required":false,"type":{"name":"boolean"},"defaultValue":{"func":false,"value":"true"}},{"name":"log","description":"是否通过 console.log 打印输出请求参数和响应参数","required":false,"type":{"name":"boolean"},"defaultValue":{"func":false,"value":"!isProd"}},{"name":"debug","description":"是否终止提交，并打印传参","required":false,"type":{"name":"boolean"}},{"name":"isCache","description":"是否缓存","required":false,"type":{"name":"boolean"}},{"name":"autoFixedFoot","description":"是否自动固定底部下方按钮（设为false时，盒子阴影才不会被遮挡）","required":false,"type":{"name":"boolean"},"defaultValue":{"func":false,"value":"true"}},{"name":"noSubmitProps","description":"提交表单时，不要提交的prop属性","required":false,"type":{"name":"Array","elements":[{"name":"string"}]}},{"name":"handleRequest","description":"处理参数（如果有type，则返回type，否则返回 param 和 return 推导的类型","tags":{"type":[{"title":"type","type":{"name":"(args: CommonObj) => CommonObj"},"description":"TS类型"}],"params":[{"title":"param","type":{"name":"CommonObj"},"name":"args","description":"请求参数"}],"returns":[{"title":"returns","type":{"name":"CommonObj"},"description":"返回参数"}]},"required":false,"type":{"name":"TSFunctionType"}}],"events":[{"name":"update:modelValue","type":{"names":["vals: CommonObj"]},"description":"双向绑定更新值"},{"name":"submit","type":{"names":["args: CommonObj"]},"description":"提交事件"},{"name":"change","type":{"names":["prop: string, val: string | number"]},"description":"提交事件"},{"name":"moreBtns","type":{"names":["name: string, args: CommonObj, cb: FinallyNext"]},"description":"更多按钮"}],"slots":[{"name":"currField.prop","scoped":true,"description":"prop 名称即为 插槽名称","tags":{"notice":[{"description":"这是默认的 tip 信息","title":"notice"},{"description":"{tip} 这是 tip 信息","title":"notice"},{"description":"{warning} 这是 warning 信息","title":"notice"},{"description":"{danger} 这是 danger 信息","title":"notice"},{"description":"{details} 这是 details 信息","title":"notice"}]},"bindings":[{"name":"name","title":"binding"},{"name":"field","title":"binding"},{"name":"form","title":"binding"}]},{"name":"defaultTest","description":"默认插槽"},{"name":"itemTest","description":"item插槽"}],"sourceFiles":["E:\\Quick-Admin\\quick_admin_vue3\\demos\\0_示例_demo\\_components\\StandardDemoForm.vue"]}
```

### Props属性自定义标题


这是props的描述
|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表单数据的双向绑定值|`CommonObj`|-|
|`fields`|表单字段项|`FormField[ ]`|-|
|`pureText`|是否纯文本展示|`boolean`|-|
|`fetch`|请求接口，一般跟`fetchSuccess`，`fetchFail`一起配合使用|`UniteFetchType`|-|
|`fetchSuccess`|`fetch`请求成功之后的回调方法|`FinallyNext`|-|
|`fetchFail`|`fetch`请求失败之后的回调方法|`FinallyNext`|-|
|`span`|同`ElementPlus `的`span`，`1 ~ 24`|`string \| number`|-|
|`footer`|是否显示底部按钮|`boolean`|-|
|`submitText`|提交按钮的文字|`string`|-|
|`resetText`|提交按钮的文字|`string`|-|
|`extraParams`|额外的参数|`CommonObj`|-|
|`moreBtns`|底部的额外更多按钮|`BaseBtnType[ ]`|-|
|`loading`|提交按钮是否显示加载图标|`boolean`|-|
|`isOmit`|是否剔除掉 `undefined`，'' 参数|`boolean`|-|
|`log`|是否通过 `console.log `打印输出请求参数和响应参数|`boolean`|-|
|`debug`|是否终止提交，并打印传参|`boolean`|-|
|`isCache`|是否缓存|`boolean`|-|
|`autoFixedFoot`|是否自动固定底部下方按钮（设为`false`时，盒子阴影才不会被遮挡）|`boolean`|-|
|`noSubmitProps`|提交表单时，不要提交的`prop`属性|`string[ ]`|-|
|`handleRequest`|处理参数（如果有`type`，则返回`type`，否则返回 `param `和 `return `推导的类型|`(args: CommonObj) => CommonObj`|-|

### 事件

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|双向绑定更新值|(`vals: CommonObj`)|
|`submit`|提交事件|(`args: CommonObj`)|
|`change`|提交事件|(`prop: string, val: string \| number`)|
|`moreBtns`|更多按钮|(`name: string, args: CommonObj, cb: FinallyNext`)|

### 方法(expose)


这是 expose 的 description。通过写入 description 获得
|方法名|说明|类型|
|:---|:---|:---|
|`formRef`|表单实例|`(str: string, arr: string[])=>void`|
|`formValidate`|表单校验|`(str: string, arr: string[]) => void`|
|`tempTestFn_1`|表单测试|`() => void`|

### 插槽

|插槽名|说明|子标签|
|:---|:---|:---|
|`currField.prop`|`prop `名称即为 插槽名称|`name, field, form`|
|`defaultTest`|默认插槽|-|
|`itemTest`|`item`插槽|-|


## 类型声明
::: details

``` ts
/** props Props属性自定义标题
 * 这是props的描述
 * @notice 这是 props 的 tip 信息
 */
const props = withDefaults(
    /**
     * 表单数据的双向绑定值
     */
    modelValue?: CommonObj;
    /**
     * 表单字段项
     */
    fields: FormField[];
    /**
     * 是否纯文本展示
     */
    pureText?: boolean;
    /**
     * 请求接口，一般跟fetchSuccess，fetchFail一起配合使用
     */
    fetch?: UniteFetchType;
    /**
     * fetch请求成功之后的回调方法
     */
    fetchSuccess?: FinallyNext;
    /**
     * fetch请求失败之后的回调方法
     */
    fetchFail?: FinallyNext;
    /**
     * 同ElementPlus 的span，1 ~ 24
     */
    span?: string | number;
    /**
     * 是否显示底部按钮
     */
    footer?: boolean;
    /**
     * 提交按钮的文字
     */
    submitText?: string;
    /**
     * 提交按钮的文字
     */
    resetText?: string;
    /**
     * 额外的参数
     */
    extraParams?: CommonObj;
    /**
     * 底部的额外更多按钮
     */
    moreBtns?: BaseBtnType[];
    /**
     * 提交按钮是否显示加载图标
     */
    loading?: boolean;
    /**
     * 是否剔除掉 undefined，'' 参数
     */
    isOmit?: boolean;
    /**
     * 是否通过 console.log 打印输出请求参数和响应参数
     */
    log?: boolean;
    /**
     * 是否终止提交，并打印传参
     */
    debug?: boolean;
    /**
     * 是否缓存
     */
    isCache?: boolean;
    /**
     * 是否自动固定底部下方按钮（设为false时，盒子阴影才不会被遮挡）
     */
    autoFixedFoot?: boolean;
    /**
     * 提交表单时，不要提交的prop属性
     */
    noSubmitProps?: string[];
    /**
     * 处理参数（如果有type，则返回type，否则返回 param 和 return 推导的类型
     * @type {(args: CommonObj) => CommonObj} TS类型
     * @param {CommonObj} args 请求参数
     * @returns {CommonObj} 返回参数
     */
    handleRequest?: (args: CommonObj) => CommonObj;

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

//处理表单的enter时间
function handleEnter() {

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
  formValidate: () => void;
  /**
   * 临时的测试方法
   */
  tempTestFn_1: () => void;
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
  /**
   * 表单测试
   * @returns {void}
   */
  tempTestFn_1: () => {
```

:::  

