# BaseUpload 上传

## 基础用法

&emsp;&emsp;提供上传功能，并整合部分业务逻辑，暴露出配置项

::: demo 
/demos/2_组件_comp/1_基础_basic/9_BaseUpload 上传/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`modelValue`|-|`string`||
|`fit`|`EpPropMergeType<StringConstructor`>|`ImgFitType`|-|
|`drag`|是否可拖动上传|`boolean`|-|
|`circle`|是否圆形展示|`boolean`|-|
|`accept`|`image/png, image/jpeg`|`string`|`image/png,image/jpg,image/jpeg`|
|`limitSize`|上传文件的大小限制|`number`|`1024 * 1024 * 10`|
|`action`|-|`string`|#|
|`listType`|`EpPropMergeType<StringConstructor, "picture-card" | "picture" | "text", unknown> | undefined`;|`any`|`picture-card`|
|`limit`|文件列表可上传几张|`number`|`1`|
|`tips`|文件大小、支持类型提示文案|`string`|`getFileTips(_props)`|
|`disabled`|是否禁用上传功能|`boolean`|-|
|`showFileList`|-|`boolean`|`_props.limit > 1`|
|`handleSuccessResponse`|-|`() => void`|-|

### $emit

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`|-|-|
|`change`|-|-|


## 类型声明

::: details


``` ts
import type { UploadProps } from "element-plus";
```

:::  
