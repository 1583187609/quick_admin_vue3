# BaseTag 标签

&emsp;&emsp;目标：对`el-tag`进行封装，使得可以处理字典文件，并包含样式，然后可应用于表单、表格中，并保证样式风格统一。

## 基础用法

::: demo
/demos/2*组件\_comp/1*基础\_basic/9_BaseTag 标签/1_BasicUse.vue
:::

## API

### Props

| 属性       | 说明 | 类型       | 默认值           |
| :--------- | :--- | :--------- | :--------------- |
| `name`     | -    | `DictName` | `D_EnableStatus` |
| `value`    | -    | `StrNum`   | -                |
| `pureText` | -    | `boolean`  | -                |
| `count`    | -    | `StrNum`   | -                |
| `empty`    | -    | `any`      | `emptyStr`       |

### Slots

| 插槽名    | 说明 | Scope |
| :-------- | :--- | :---- |
| `default` | -    | `tag` |

## 类型声明

::: details

```ts
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
