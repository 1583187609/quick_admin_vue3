# BaseTable 基础表格

&emsp;&emsp;目标：定位为基础表格。继承`el-table`属性，并扩展功能：内嵌组件(系统内置、业务需求内嵌)、默认列宽度和属性、快捷属性`quickAttrs: popover`。
## 基础用法

&emsp;&emsp;字段  
&emsp;&emsp;插槽  
&emsp;&emsp;操作按钮  
&emsp;&emsp;暂不支持`fetch`用法

::: demo 
/demos/2_组件_comp/3_表格_table/1_BaseTable 基础表格/1_BasicUse.vue
:::
## 组件用法

&emsp;&emsp;内置组件  
&emsp;&emsp;内嵌组件

::: demo 
/demos/2_组件_comp/3_表格_table/1_BaseTable 基础表格/2_CompUse.vue
:::
## 模板用法（非必须）

&emsp;&emsp;未找到模板，会抛出错误

::: demo 
/demos/2_组件_comp/3_表格_table/1_BaseTable 基础表格/3_TplsUse.vue
:::
## 插槽规则

&emsp;&emsp;`head`插槽  
&emsp;&emsp;列插槽  
&emsp;&emsp;多行表头  
&emsp;&emsp;快捷属性

::: demo 
/demos/2_组件_comp/3_表格_table/1_BaseTable 基础表格/4_SlotRule.vue
:::
## 权限处理

&emsp;&emsp;是否隐藏  
&emsp;&emsp;是否禁用

::: demo 
/demos/2_组件_comp/3_表格_table/1_BaseTable 基础表格/5_AuthHandle.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`cols`|表头|`TableColAttrs[]`|`[]`|
|`data`|表格行数据|`CommonObj[]`|`[]`|
|`loading`|是否处于加载中|`boolean`|-|
|`showSummary`|是否显示汇总行|`boolean`|-|
|`summaryMethod`|计算汇总的方法|`() => void`|`handleTableSummary`|
|`getHandleAuthBtns`|-|`() => void`|-|
|`operateBtns`|操作栏属性|`BtnItem[]`|`[]`|
|`operateBtnsAttrs`|-|`OperateBtnsAttrs`|-|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`tableRef`|-|`() => void`|


## 类型声明

::: details
<<< E:\self\quick_admin_vue3/src/core/components/table/_types.ts
:::  
