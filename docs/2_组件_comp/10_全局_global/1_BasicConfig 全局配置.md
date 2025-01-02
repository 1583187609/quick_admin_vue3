# BasicConfig 全局配置

&emsp;&emsp;目标：通过打开和关闭两个方法，实现打开/关闭全局弹窗，同时让弹窗属性统一，开发时无需关心属性设置，但支持属性值覆盖。  
&emsp;&emsp;目前只提供了两种弹出层：`dialog `和 `drawer`，默认为 `dialog`。
## 全局按钮配置

&emsp;&emsp;全局按钮  
&emsp;&emsp;全局按钮模板、

::: demo 
/demos/2_组件_comp/10_全局_global/1_BasicConfig 全局配置/1_GlobalBtnConfig.vue
:::
## 全局字典配置

&emsp;&emsp;全局字典  
&emsp;&emsp;全局字典模板

::: demo 
/demos/2_组件_comp/10_全局_global/1_BasicConfig 全局配置/2_GlobalDictConfig.vue
:::
## 全局表单配置

&emsp;&emsp;基础属性  
&emsp;&emsp;表单项模板（查询表单+通用表单）

::: demo 
/demos/2_组件_comp/10_全局_global/1_BasicConfig 全局配置/3_GlobalFormConfig.vue
:::
## 全局表格配置

&emsp;&emsp;基础属性  
&emsp;&emsp;全局表格列模板、

::: demo 
/demos/2_组件_comp/10_全局_global/1_BasicConfig 全局配置/4_GlobalTableConfig.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表单数据，可设默认值|`CommonObj`|-|
|`fields`|表单字段|`FormField[]`|`[]`|
|`sections`|分块的表单字段|`SectionFormItemAttrs[]`|-|
|`extraParams`|额外的参数|`CommonObj`|-|
|`changeFetch`|是否`onChang`之后就发送请求（仅限于`Select`类组件，不含`Input`类组件）|`boolean`|`true`|
|`inputDebounce`|输入框输入时，是否通过防抖输入，触发搜索|`boolean`|`true`|
|`grid`|栅格配置，同`ElementPlus`的`el-col`的属性|`Grid`|`defaultGridAttrs`|
|`rowNum`|筛选条件的(表单)展示几行|`number`|-|
|`formAttrs`|`el-form `的属性配置|`FormAttrs`|`defaultFormAttrs`|
|`extraBtns`|额外的按钮，在表单下方，表格上方|`BaseBtnType[]`|-|
|`importCfg`|导入的下载模板配置|`ImportCfgAttrs`|-|
|`exportCfg`|导出配置|`ExportCfg`|{ `limit: 10000 `}|
|`cols`|表格列数据|`TableCol[]`|`[]`|
|`operateBtns`|操作栏的分组按钮，在表格的操作一栏|`OperateBtnsType`|-|
|`operateBtnsAttrs`|操作栏按钮的配置|`OperateBtnsAttrs`|-|
|`filterByAuth`|按钮权限处理逻辑|`FilterByAuthFn`|`true`|
|`tableAttrs`|`el-table `的属性配置|`TableAttrs`|`defaultTableAttrs`|
|`pageAttrs`|分页配置|`CommonObj`|-|
|`pagination`|是否分页|`false \| TablePaginationAttrs`|`defaultPagination`|
|`showPagination`|是否显示分页|`boolean`|`true`|
|`omits`|是否剔除掉`null, undefined, ""`的属性值|`boolean \| Array`|`true`|
|`compact`|表单项、表格列之间排列是否紧凑点|`boolean`|`_props.grid.xl < 6`|
|`size`|整体的控件大小|`CommonSize`|`defaultCommonSize`|
|`readonly`|是否只读|`boolean`|-|
|`disabled`|是否禁用|`boolean`|-|
|`optimization`|默认为 `false`。若开启则会规避表格、表单中计算开销较多的逻辑。场景示例：操作栏列宽计算|`boolean`|-|
|`log`|是否打印`console.log(data)`|`boolean \| "req" \| "res"`|-|
|`debug`|是否在打印请求数据之后不执行请求的逻辑|`boolean`|-|
|`reqMap`|请求参数的键名映射|`ReqMap`|`defaultReqMap`|
|`resMap`|响应参数的键名映射|`ResMap`|`defaultResMap`|
|`afterSuccess`|请求成功的回调函数|`() => void`|-|
|`afterFail`|请求成功的回调函数|`() => void`|-|
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
|`content`|内容插槽|`loading, data, total, hasMore, params, onOperateBtns`|
|`col.prop as string`|-|`row, col, $index, name`|
|`default`|默认插槽|-|


## 类型声明

::: details


``` ts
import type {  PopupType,  DialogId,  DrawerId,  FootRenderData,  DialogPopup,  DrawerPopup,  ClosePopupType,  CloseDialogType,  CloseDrawerType,  DialogHeadTypes,  DrawerHeadTypes,} from "./_types";









    type = defaultPopupType;
```

:::  
