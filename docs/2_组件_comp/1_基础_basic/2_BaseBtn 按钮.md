# BaseBtn 按钮

&emsp;&emsp;目标：仅传入`name`属性，即可享有对应按钮的全部功能（含颜色、文本、图标、权限、默认逻辑等），也可传入属性值进行覆盖，同时提供了快捷属性（`to`、`popoconfirm`）。
## 基础用法

&emsp;&emsp;默认为新增按钮，继承 `el-button `属性，所以传入 `el-button `的属性都是生效的。

::: demo 
/demos/2_组件_comp/1_基础_basic/2_BaseBtn 按钮/1_BasicUse.vue
:::
## 模板用法（非必须）

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
|`summaryList`|汇总请求数据的 `list`|`SummaryListType`|-|
|`handleAuth`|-|`HandleButtonAuth`|-|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`extraBtns`|-|-|
|`selectionChange`|-|-|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`list`|-|`list, total, hasMore`|
