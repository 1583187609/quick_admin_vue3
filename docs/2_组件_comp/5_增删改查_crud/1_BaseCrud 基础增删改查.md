# BaseCrud 基础增删改查

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


## 类型声明

::: details
<<< E:\Quick-Admin\quick_admin_vue3/src/core/components/crud/BaseCrud/_types.ts
:::  
