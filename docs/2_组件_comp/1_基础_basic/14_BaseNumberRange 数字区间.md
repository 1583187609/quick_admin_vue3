# BaseNumberRange 数字区间


## 基础用法



::: demo 
/demos/2_组件_comp/1_基础_basic/14_BaseNumberRange 数字区间/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|-|`ValsArr`|`[]`|
|`min`|-|`number`|-|
|`max`|-|`number`|-|
|`size`|-|`CommonSize`|`defaultCommonSize`|
|`fixedNum`|保留`n`位小数|`number`|`0`|
|`minPlaceholder`|-|`string`|最小值|
|`maxPlaceholder`|-|`string`|最大值|
|`rangeSeparator`|分隔符|`string`|`rangeJoinChar`|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`change`|-|-|
|`input`|-|-|
|`clear`|-|-|
|`blur`|-|-|


## 类型声明

::: details
/src/core/BaseNumberRange.vue

``` ts
type ValsArr = [StrNum?, StrNum?]; //[StrNumUnd, StrNumUnd]
```

:::  
