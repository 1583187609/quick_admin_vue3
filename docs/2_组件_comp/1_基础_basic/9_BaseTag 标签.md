# BaseTag 标签

&emsp;&emsp;`el-tag`标签的升级版，可以解析字典映射、纯文本显示等


## 基础用法



::: demo 
/demos/2_组件_comp/1_基础_basic/9_BaseTag 标签/1_BasicUse.vue
:::



## API 
### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`name`|-|`DictName`|`EnableStatus`|
|`value`|-|`StrNum`|-|
|`map`|-|`CommonObj`|-|
|`pureText`|-|`boolean`|-|
|`empty`|-|`any`|-|
|`count`|-|`StrNum`|-|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`default`|-|`tag`|



## 类型声明
::: details
/src/components/BaseTag.vue

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


