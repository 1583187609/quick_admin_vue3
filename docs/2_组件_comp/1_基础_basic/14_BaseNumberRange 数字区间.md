# BaseNumberRange 数字区间



## API 
### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|-|`tuple`|-|
|`prop`|-|`string \| tuple`|-|
|`label`|-|`string`|''|
|`minPlaceholder`|-|`string`|'最小值'|
|`maxPlaceholder`|-|`string`|'最大值'|
|`rules`|-|`FormItemRule[]`|-|
|`attrs`|-|`CommonObj`|-|
|`rangeSeparator`|-|`string`|`rangeJoinChar`|
|`size`|-|`CommonSize`|-|

### Emits

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`change`|-|-|
|`clear`|-|-|



## 类型声明
::: details
/src/components/BaseNumberRange.vue


``` ts

import { type FormItemRule} from "element-plus";

type InputType = "min" | "max";
type StrNumUnd = StrNum | undefined;


```

:::  


