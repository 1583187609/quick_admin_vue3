# BaseNumberRange 数字区间

&emsp;&emsp;目标：数字区间组件。
## 基础用法

&emsp;&emsp;设置 `modelValue`，显示初始值  
&emsp;&emsp;设置 `min`，最小值  
&emsp;&emsp;设置 `max`，最大值  
&emsp;&emsp;设置 `size`，控件大小类型  
&emsp;&emsp;设置 `precision`，保留`n`位小数

::: demo 
/demos/2_组件_comp/1_基础_basic/14_BaseNumberRange 数字区间/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|-|`ValsArr`|`reactive([])`|
|`min`|-|`number`|-|
|`max`|-|`number`|-|
|`size`|-|`CommonSize`|`defaultCommonSize`|
|`precision`|精度（保留`n`位小数位数）|`number`|-|
|`maxlength`|最大字符长度|`number`|-|
|`startPlaceholder`|-|`string`|最小值|
|`endPlaceholder`|-|`string`|最大值|
|`rangeSeparator`|分隔符|`string`|`rangeJoinChar`|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`change`|-|-|
|`input`|-|-|
|`clear`|-|-|
|`blur`|-|-|
|`focus`|-|-|


## 类型声明

::: details


``` ts
type ValsArr = [number?, number?]; //[StrNumUnd, StrNumUnd]
```

:::  
