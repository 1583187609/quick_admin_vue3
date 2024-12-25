# BaseEditor 基础富文本

&emsp;&emsp;基于`WangEditor`封装。
## 基础用法

&emsp;&emsp;摘要介绍暂时略

::: demo 
/demos/2_组件_comp/7_富文本_editor/1_BaseEditor 基础富文本/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|-|`string`||
|`mode`|-|`ModeTypes`|`simple`|
|`height`|-|`string`|`300px`|
|`width`|-|`string`|`100%`|
|`minHeight`|-|`string`|`none`|
|`maxHeight`|-|`string`|`none`|
|`placeholder`|-|`string`|-|
|`maxlength`|-|`number`|-|
|`readonly`|-|`boolean`|-|
|`disabled`|-|`boolean`|-|
|`toolBarConfig`|-|`CommonObj`|-|
|`editorConfig`|-|`CommonObj`|-|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`input`|-|-|
|`change`|-|-|
|`focus`|-|-|
|`blur`|-|-|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`editorRef`|-|`() => void`|


## 类型声明

::: details


``` ts
export type ModeTypes = "default" | "simple";
export type EditorValueType = "html" | "text";
```

:::  
