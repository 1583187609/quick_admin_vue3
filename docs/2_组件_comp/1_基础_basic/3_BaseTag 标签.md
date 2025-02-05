# BaseTag 标签

&emsp;&emsp;目标：对`el-tag`进行封装，使得可以处理字典文件，并包含样式，然后可应用于表单、表格中，并保证样式风格统一。
## 基础用法

&emsp;&emsp;设置`name`指定字典名称（为了增加变量名称辨识度，统一增加`D_`前缀），默认为`D_EnableStatus`。  
&emsp;&emsp;设置`value`指定字典的值。  
&emsp;&emsp;设置`pureText`，以纯文本展示。  
&emsp;&emsp;设置`count`，显示该状态下的徽章数值。

::: demo 
/demos/2_组件_comp/1_基础_basic/3_BaseTag 标签/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`name`|-|`DictName`|`D_EnableStatus`|
|`value`|-|`StrNum`|-|
|`pureText`|-|`boolean`|-|
|`count`|-|`StrNum`|-|
|`empty`|-|`any`|`defaultEmptyStr`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`default`|-|`tag`|


## 类型声明

::: details


``` ts
import type { TagProps } from "element-plus";

export type TagType = TagProps["type"];
export type TagSize = TagProps["size"];
export type TagEffect = TagProps["effect"];

export interface TagAttrs {
  color?: string;
  type?: TagType;
  style?: StyleType;
  class?: ClassType;
  effect?: TagEffect;
}
```

:::  
