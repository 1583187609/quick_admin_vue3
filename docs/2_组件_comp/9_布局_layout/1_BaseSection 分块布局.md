# BaseSection 分块布局

&emsp;&emsp;目标：内容分块的布局载体。并提供了折叠等功能。
## 基础用法

&emsp;&emsp;这是`BaseSection`的基础使用示例。

::: demo 
/demos/2_组件_comp/9_布局_layout/1_BaseSection 分块布局/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`title`|-|`string`|标题|
|`badge`|-|`number \| string`|`0`|
|`max`|-|`number`|`99`|
|`bodyClass`|-|`string`||
|`foldable`|-|`boolean`|`false`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`head-right`|-|-|
|`default`|-|-|
