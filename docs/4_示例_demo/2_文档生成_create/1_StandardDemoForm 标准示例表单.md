# StandardDemoForm 标准示例表单

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



## 测试表单
::: demo 这是行内表单的描述。重点介绍了BaseForm的相关API的使用。这是一个html标签<BaseForm/>的示例。完整英文句子示例：Hello, world!
/demos/4_示例_demo/2_文档生成_create/1_StandardDemoForm 标准示例表单/0_TestForm.vue
:::

::: tip
这是`tip`信息示例
:::


## 全部控件类型
::: demo 全部控件类型包含：ElementPlus（input, select）、内置（BaseNumberRange）、自定义扩展（UserInfo）三部分。
/demos/4_示例_demo/2_文档生成_create/1_StandardDemoForm 标准示例表单/1_AllFields.vue
:::


## 额外属性
::: demo 除了ElementPlus的属性外，其他的功能属性一律添加在 extraAttrs 中
/demos/4_示例_demo/2_文档生成_create/1_StandardDemoForm 标准示例表单/2_ExtraAttrs.vue
:::


## 继承与扩展
::: demo 插槽及其他属性功能，完全继承自ElementPlus。需谨记 Dom嵌套跟JSON嵌套保持一致的原则
/demos/4_示例_demo/2_文档生成_create/1_StandardDemoForm 标准示例表单/5_ExtendMore.vue
:::



### Props属性自定义标题


这是props的描述
|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表单数据，可设默认值|`CommonObj`|-|
|`fields`|表单字段|`FormField[]`|-|
|`sections`|分块的表单字段|`SectionFormItemAttrs[]`|-|
|`fetch`|列表请求接口|`UniteFetchType`|-|
|`immediate`|页面刚创建时是否立即发起请求获取数据|`boolean`|-|
|`extraParams`|额外的参数|`CommonObj`|-|
|`changeFetch`|是否`onChang`之后就发送请求（仅限于`Select`类组件，不含`Input`类组件）|`boolean`|-|
|`inputDebounce`|输入框输入时，是否通过防抖输入，触发搜索|`boolean`|-|
|`grid`|栅格配置，同`ElementPlus`的`el-col`的属性|`GridValAttrs`|-|
|`rowNum`|筛选条件的(表单)展示几行|`number`|-|
|`reqMap`|请求参数的键名映射|`ReqMap`|-|
|`resMap`|响应参数的键名映射|`ResMap`|-|
|`fetchSuccess`|请求成功的回调函数|`() => void`|-|
|`fetchFail`|请求成功的回调函数|`() => void`|-|
|`handleRequest`|处理参数|`() => void`|-|
|`handleResponse`|处理响应数据|`() => void`|-|
|`extraBtns`|额外的按钮，在表单下方，表格上方|`BaseBtnType[]`|-|
|`importCfg`|导入的下载模板配置|`TplCfgAttrs`|-|
|`exportCfg`|导出配置|`ExportCfg`|-|
|`cols`|表格列数据|`TableField[]`|-|
|`sort`|是否展示排序列|`boolean \| UniteFetchType`|-|
|`index`|是否展示序号列|`boolean`|-|
|`selection`|是否展示选择框|`boolean`|-|
|`operateBtns`|操作栏的分组按钮，在表格的操作一栏|`OperateBtnsType`|-|
|`operateBtnsAttrs`|操作栏按钮的配置|`OperateBtnsAttrs`|-|
|`filterByAuth`|按钮权限处理逻辑|`FilterByAuthFn`|-|
|`formAttrs`|`el-form `的属性配置|`FormAttrs`|-|
|`disabled`|是否禁用|`boolean`|-|
|`readonly`|是否只读|`boolean`|-|
|`log`|是否`console.log(rows`)|`boolean`|-|
|`debug`|是否在打印请求数据之后不执行请求的逻辑|`boolean`|-|
|`isOmit`|是否剔除掉`undefined, `''的属性值|`boolean`|-|
|`size`|整体的控件大小|`CommonSize`|-|
|`compact`|表单项、表格列之间排列是否紧凑点|`boolean`|-|
|`tableAttrs`|`el-table `的属性配置|`TableAttrs`|-|
|`pageAttrs`|分页配置|`CommonObj`|-|
|`pagination`|是否分页|`false \| PaginationAttrs`|-|
|`showPagination`|是否显示分页|`boolean`|-|
|`selectAll`|是否选择全部|`boolean`|-|
|`summaryList`|汇总请求数据的 `list`|`SummaryListType`|-|
|`batchBtn`|是否显示批量按钮|`boolean`|-|

::: tip
这是 `props `的 `tip `信息
:::



### Emits

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`extraBtns`|-|-|
|`operateBtns`|-|-|
|`selectionChange`|-|-|
|`rows`|-|-|
|`dargSortEnd`|-|-|

::: warning
这是 `emits `的 `warning `信息
:::



### 方法(expose)


这是 expose 的 description。通过写入 description 获得
|方法名|说明|类型|
|:---|:---|:---|
|`refreshList`|-|`() => void`|
|`getList`|-|`() => void`|
|`getQueryParams`|-|`() => void`|
|`getQueryFields`|-|`() => void`|



### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`field.prop`|-|`name, field, form`|
|`middle`|-|-|
|`default`|-|`loading, rows, total, hasMore, params, onOperateBtns`|
|`col.prop`|-|`row, col, $index, name`|

::: tip
这是默认的 `tip `信息
:::

::: warning
这是 `warning `信息
:::

::: danger
这是 `danger `信息
:::

::: details
这是 `details `信息
:::





## 类型声明
::: details
/demos/4_示例_demo/2_文档生成_create/_typescript/standard.ts

<<< E:\Quick-Admin\quick_admin_vue3/demos/4_示例_demo/2_文档生成_create/_typescript/standard.ts
:::  


