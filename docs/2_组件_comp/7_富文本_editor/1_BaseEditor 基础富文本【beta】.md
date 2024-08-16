# BaseEditor 基础富文本  <Badge class="title-badge" type="warning" text="beta" />


::: warning 实验性
本功能处于实验性阶段，谨慎使用！
:::




## API 
### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`editor`|-|`any`|-|
|`modelValue`|-|`string`|-|
|`height`|-|`StrNum`|`300`|
|`placeholder`|-|`string`|-|
|`mode`|-|`ModeTypes`|`simple`|
|`toolBarConfig`|-|`CommonObj`|{}|
|`editorConfig`|-|`CommonObj`|{}|

### Emits

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`change`|-|-|
|`focus`|-|-|
|`blur`|-|-|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`editor`|-|`() => void`|



## 类型声明
::: details
/src/components/BaseEditor.vue

``` ts


export type ModeTypes = "default" | "simple";






```

:::  


