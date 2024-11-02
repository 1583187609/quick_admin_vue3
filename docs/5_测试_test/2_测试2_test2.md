# 测试2

&emsp;&emsp;常规同用增删改查列表
## 基础用法

&emsp;&emsp;摘要介绍暂时略

::: demo 
/demos/2_组件_comp/5_增删改查_crud/1_BaseCrud 基础增删改查/1_BasicUse.vue
:::
## 内嵌组件

&emsp;&emsp;内嵌组件的说明

::: demo 
/demos/2_组件_comp/5_增删改查_crud/1_BaseCrud 基础增删改查/2_Embedded.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表单数据，可设默认值|`CommonObj`|-|
|`fields`|表单字段|`FormField[]`|`[]`|
|`sections`|分块的表单字段|`SectionFormItemAttrs[]`|-|
|`fetch`|列表请求接口|`UniteFetchType`|-|
|`immediate`|页面刚创建时是否立即发起请求获取数据|`boolean`|`true`|
|`extraParams`|额外的参数|`CommonObj`|-|
|`changeFetch`|是否`onChang`之后就发送请求（仅限于`Select`类组件，不含`Input`类组件）|`boolean`|`true`|
|`inputDebounce`|输入框输入时，是否通过防抖输入，触发搜索|`boolean`|`true`|
|`grid`|栅格配置，同`ElementPlus`的`el-col`的属性|`Grid`|`defaultGridAttrs`|
|`rowNum`|筛选条件的(表单)展示几行|`number`|-|
|`extraBtns`|额外的按钮，在表单下方，表格上方|`BaseBtnType[]`|-|
|`importCfg`|导入的下载模板配置|`TplCfgAttrs`|-|
|`exportCfg`|导出配置|`ExportCfg`|{ `limit: 10000 `}|
|`cols`|表格列数据|`TableCol[]`|`[]`|
|`operateBtns`|操作栏的分组按钮，在表格的操作一栏|`OperateBtnsType`|-|
|`operateBtnsAttrs`|操作栏按钮的配置|`OperateBtnsAttrs`|-|
|`filterByAuth`|按钮权限处理逻辑|`FilterByAuthFn`|`true`|
|`formAttrs`|`el-form `的属性配置|`FormAttrs`|`defaultFormAttrs`|
|`omit`|是否剔除掉`undefined, ''`的属性值|`boolean`|`true`|
|`size`|整体的控件大小|`CommonSize`|`defaultCommonSize`|
|`compact`|表单项、表格列之间排列是否紧凑点|`boolean`|`_props.grid.xl < 6`|
|`readonly`|是否只读|`boolean`|-|
|`disabled`|是否禁用|`boolean`|-|
|`tableAttrs`|`el-table `的属性配置|`TableAttrs`|`defaultTableAttrs`|
|`pageAttrs`|分页配置|`CommonObj`|-|
|`pagination`|是否分页|`false \| TablePaginationAttrs`|{ `currPage: 1, pageSize: 20 `}|
|`optimization`|默认为 `false`。若开启则会规避表格、表单中计算开销较多的逻辑。场景示例：操作栏列宽计算|`boolean`|-|
|`showPagination`|是否显示分页|`boolean`|`true`|
|`log`|是否打印`console.log(rows)`|`boolean`|-|
|`debug`|是否在打印请求数据之后不执行请求的逻辑|`boolean`|-|
|`reqMap`|请求参数的键名映射|`ReqMap`|`defaultReqMap`|
|`resMap`|响应参数的键名映射|`ResMap`|`defaultResMap`|
|`afterSuccess`|请求成功的回调函数|`() => void`|-|
|`afterFail`|请求成功的回调函数|`() => void`|-|
|`handleRequest`|处理参数|`() => void`|-|
|`handleResponse`|处理响应数据|`() => void`|-|
|`summaryList`|汇总请求数据的 `list`|`SummaryListType`|-|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`extraBtns`|-|-|
|`selectionChange`|-|-|
|`rows`|-|-|
|`dargSortEnd`|-|-|

### Expose

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
|`middle`|中间插槽|-|
|`default`|默认插槽|`loading, rows, total, hasMore, params, onOperateBtns`|
|`col.prop as string`|-|`row, col, $index, name`|


## 类型声明

::: details
<<< E:\Quick-Admin\quick_admin_vue3/src/core/crud/BaseCrud/_types.ts
:::  
