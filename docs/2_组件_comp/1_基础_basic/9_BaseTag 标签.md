# BaseTag 标签

el-tag标签的升级版，可以解析字典映射、纯文本显示等



## API 
### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`name`|-|`DictName`|"`EnableStatus`"|
|`value`|-|`StrNum`|-|
|`codeMap`|-|`CommonObj`|-|
|`pureText`|-|`boolean`|-|
|`empty`|-|`any`|"-"|
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


```

:::  


