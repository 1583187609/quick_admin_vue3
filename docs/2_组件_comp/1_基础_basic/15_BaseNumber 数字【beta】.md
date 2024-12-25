# BaseNumber 数字  <Badge class="title-badge" type="warning" text="beta" />

::: warning 实验性
本功能处于实验性阶段，谨慎使用！
:::

&emsp;&emsp;目标：数字升降。
## 基础用法

&emsp;&emsp;待完善

::: demo 
/demos/2_组件_comp/1_基础_basic/15_BaseNumber 数字【beta】/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`changeValue`|变化的值|`number`|-|
|`riseIcon`|-|`string`|`Top`|
|`declineIcon`|-|`string`|`Bottom`|
|`iconLast`|-|`boolean`|-|
|`showChar`|是否显示正负符号|`boolean`|`false`|
|`transition`|是否从`0`过渡到目标值|`boolean`|`true`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`default`|-|-|
