# 测试2

&emsp;&emsp;目标：简化增删改查的逻辑书写。  
&emsp;&emsp;功能：支持条件展开/折叠、条件分组；请求参数、响应数据处理；
## 基础用法

&emsp;&emsp;基础表单项、表格列  
&emsp;&emsp;查询条件可分块或不分块  
&emsp;&emsp;序号列、选择列、排序列

::: demo 
/demos/2_组件_comp/5_增删改查_crud/1_BaseCrud 基础增删改查/1_BasicUse.vue
:::
## 组件用法

&emsp;&emsp;内置组件：`BaseTag`、`BaseImg`、`BaseText`、`BaseCopy`、`UserTime`  
&emsp;&emsp;内嵌组件：`UserInfo`  
&emsp;&emsp;表单控件：`el-input`，`el-switch`等，并对`el-switch`，`el-select`等做了特殊处理

::: demo 
/demos/2_组件_comp/5_增删改查_crud/1_BaseCrud 基础增删改查/2_CompUse.vue
:::
## 插槽用法

&emsp;&emsp;`middle`

::: demo 
/demos/2_组件_comp/5_增删改查_crud/1_BaseCrud 基础增删改查/3_SlotsUse.vue
:::
## 模板用法（非必须）

&emsp;&emsp;表单项模板用法同`BaseForm`、表格列模板用法同`BaseTable`  
&emsp;&emsp;注：查询表单、新增/编辑表单，使用同样模板名称，呈现样式略有差别。（为了满足不同场景下的需求）

::: demo 
/demos/2_组件_comp/5_增删改查_crud/1_BaseCrud 基础增删改查/4_TplsUse .vue
:::
## 按钮规则

&emsp;&emsp;按钮分为两块：额外按钮、操作栏按钮，它们遵循同样的规则。  
&emsp;&emsp;按钮属性可为：函数、数组  
&emsp;&emsp;若为数组，数组元素可为：字符串、对象、函数  
&emsp;&emsp;内置逻辑：删除二次确认（批量/单个）、导入/导出内置逻辑（支持自定义）

::: demo 
/demos/2_组件_comp/5_增删改查_crud/1_BaseCrud 基础增删改查/5_BtnsRule.vue
:::
## 内置逻辑（支持自定义）

&emsp;&emsp;内置逻辑：删除二次确认（批量/单个）、导入/导出内置逻辑（支持自定义）

::: demo 
/demos/2_组件_comp/5_增删改查_crud/1_BaseCrud 基础增删改查/6_InnerLogic.vue
:::
## 请求参数&响应数据 处理

&emsp;&emsp;请求参数：规则同`BaseForm`  
&emsp;&emsp;响应数据：规则同`BaseTable`  
&emsp;&emsp;可统一处理：

::: demo 
/demos/2_组件_comp/5_增删改查_crud/1_BaseCrud 基础增删改查/7_HandleData.vue
:::
## 多弹出层处理

&emsp;&emsp;导入弹窗（自带，无需引入）  
&emsp;&emsp;新增/编辑弹窗（`openPopup`打开，`next`回调关闭）  
&emsp;&emsp;`xx`列表（抽屉打开，`next`回调关闭）  
&emsp;&emsp;`xx`详情（`dialog`，`openPopup`打开）  
&emsp;&emsp;`xxx`长文本弹窗（自带）  
&emsp;&emsp;批量删除、批量驳回、批量通过弹窗

::: demo 
/demos/2_组件_comp/5_增删改查_crud/1_BaseCrud 基础增删改查/8_MultiplePopup.vue
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
|`immediateFetch`|页面刚准备好时是否发送请求|`boolean`|`true`|
|`inputDebounce`|输入框输入时，是否通过防抖输入，触发搜索|`boolean`|`true`|
|`grid`|栅格配置，同`ElementPlus`的`el-col`的属性|`Grid`|{ ...`defaultGridAttrsMap[_props.size ?? defaultCommonSize`] }|
|`rowNum`|筛选条件的(表单)展示几行|`number`|-|
|`formAttrs`|`el-form `的属性配置|`FormAttrs`|`defaultFormAttrs`|
|`extraBtns`|额外的按钮，在表单下方，表格上方|`BaseBtnType[]`|-|
|`importCfg`|导入的下载模板配置|`ImportCfgAttrs`|-|
|`exportCfg`|导出配置|`ExportCfg`|{ `limit: 10000 `}|
|`showSetBtn`|-|`boolean`|`true`|
|`cols`|表格列数据|`TableCol[]`|`[]`|
|`operateBtns`|操作栏的分组按钮，在表格的操作一栏|`OperateBtnsType`|-|
|`operateBtnsAttrs`|操作栏按钮的配置|`OperateBtnsAttrs`|-|
|`handleAuth`|按钮权限处理逻辑|`HandleAuthFn`|-|
|`tableAttrs`|`el-table `的属性配置|`TableAttrs`|`defaultTableAttrs`|
|`pageSizeNum`|分页大小，如果为`0`，则不按分页条件查询|`number`|`20`|
|`showPagination`|是否显示分页|`boolean`|`!!_props.pageSizeNum`|
|`omits`|是否剔除掉`null, undefined, ""`的属性值|`boolean \| Array`|`true`|
|`size`|整体的控件大小|`CommonSize`|-|
|`readonly`|是否只读|`boolean`|-|
|`disabled`|是否禁用|`boolean`|-|
|`log`|是否打印`console.log(data)`|`boolean \| "req" \| "res"`|`isDev`|
|`debug`|是否在打印请求数据之后不执行请求的逻辑|`boolean`|-|
|`reqResMap`|请求/响应参数的键名映射|`ReqResMap`|-|
|`fetch`|-|`UniteFetchType`|-|
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
|`formRef`|-|`() => void`|
|`tableRef`|-|`() => void`|
|`getList`|-|`() => void`|
|`refreshList`|-|`() => void`|
|`getQueryParams`|获取查询参数|`() => void`|
|`getQueryFields`|获取查询字段|`() => void`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`field.prop as string`|-|`name, field`|
|`middle`|中间插槽|-|
|`content`|内容插槽|`loading, data, total, hasMore, params, onOperateBtns`|
|`col.prop as string`|-|`row, col, $index, name`|
|`default`|默认插槽|-|


## 类型声明

::: details
<<< E:\self\quick_admin_vue3/src/core/components/crud/BaseCrud/_types.ts
:::  
