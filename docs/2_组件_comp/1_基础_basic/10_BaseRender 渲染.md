# BaseRender 渲染

&emsp;&emsp;目标：统一空状态组件
## 基础用法

&emsp;&emsp;了解本部分内容，有助于了解后续的插槽自定义内容。本质就是通过`BaseRender`进行解析的。  
&emsp;&emsp;支持基础数据类型，即：`null, undefined, boolean, number, string`。  
&emsp;&emsp;支持对象，即：引入的同步/异步`Vue`组件。  
&emsp;&emsp;支持数组，即：等同于`h(...args)`中的`args`。  
&emsp;&emsp;支持函数，即：`h()`。

::: demo 
/demos/2_组件_comp/1_基础_basic/10_BaseRender 渲染/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`description`|-|`string`|空空如也~|
|`size`|-|`StrNum`|`50`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`default`|-|-|
