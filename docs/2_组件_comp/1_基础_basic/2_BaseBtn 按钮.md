# BaseBtn 按钮

&emsp;&emsp;目标：仅传入`name`属性，即可享有对应按钮的全部功能（含颜色、文本、图标、权限、默认逻辑等），也可传入属性值进行覆盖，同时提供了快捷属性（`to`、`popoconfirm`）。
## 基础用法

&emsp;&emsp;默认为新增按钮，继承 `el-button `属性，所以传入 `el-button `的属性都是生效的。

::: demo 
/demos/2_组件_comp/1_基础_basic/2_BaseBtn 按钮/1_BasicUse.vue
:::
## 模板用法

&emsp;&emsp;写入`tpl`属性，即可拥有该类型按钮的所有特性。可传入其他`el-button`的属性，进行覆盖。也可传入`tpl`对象进行覆盖，两者效果等价。

::: demo 
/demos/2_组件_comp/1_基础_basic/2_BaseBtn 按钮/2_TplAttr.vue
:::
## 确认提示

&emsp;&emsp;某些危险按钮（例：删除按钮）自带`popconfirm`确认提示框。`popover `可为布尔值、字符串、对象（同`el-popconfirm`的属性）

::: demo 
/demos/2_组件_comp/1_基础_basic/2_BaseBtn 按钮/4_PopconfirmAttr.vue
:::
## 按钮权限

&emsp;&emsp;使用 `auth `设置按钮权限。不设置、空数组视为始终有权限。无权限时，按钮会不可见。若要可见，且按钮禁用，则数组元素应为对象，设置`disabled`为`true`。

::: demo 
/demos/2_组件_comp/1_基础_basic/2_BaseBtn 按钮/5_AuthAttr.vue
:::
## 按钮顺序

&emsp;&emsp;使用 `order `设置多个按钮存在时的排列顺序值，数值越小越靠前。这在一组按钮中（查询列表的额外按钮组、表格的操作栏按钮组）会非常有用，避免开发时需要记忆按钮顺序。

::: demo 
/demos/2_组件_comp/1_基础_basic/2_BaseBtn 按钮/6_OrderAttr.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|表单数据，可设默认值|`CommonObj`|-|
|`fields`|表单字段|`FormField[]`|`[]`|
|`sections`|分块的表单字段|`SectionFormItemAttrs[]`|-|
|`fetch`|列表请求接口|`UniteFetchType`|-|
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
|`log`|是否打印`console.log(rows)`|`boolean \| "req" \| "res"`|-|
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
|`content`|内容插槽|`loading, rows, total, hasMore, params, onOperateBtns`|
|`col.prop as string`|-|`row, col, $index, name`|
|`default`|默认插槽|-|
