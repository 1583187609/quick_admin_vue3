# BaseImg 图片


## 基础用法



::: demo 
/demos/2_组件_comp/1_基础_basic/5_BaseImg 图片/1_BasicUse.vue
:::



## API 
### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`size`|-|`number \| string`|-|
|`sizeType`|-|`CommonSize`|`defaultCommonSize`|
|`width`|-|`number \| string`|-|
|`height`|-|`number \| string`|-|
|`src`|-|`string`|-|
|`fit`|-|`ImgFitType`|`cover`|
|`round`|-|`boolean`|-|
|`to`|-|`string \| CommonObj`|-|
|`initialIndex`|-|`number`|-|
|`zoomRate`|-|`number`|-|
|`stopPropagation`|点击图片时，是否阻止冒泡|`boolean`|-|
|`preview`|-|`boolean`|`props.to === undefined`|
|`loadTips`|-|`string`|玩命加载中…|
|`errTips`|-|`string`|加载失败|
|`errImgSrc`|-|`string`|-|

### Emits

|事件名称|说明|回调参数|
|:---|:---|:---|
|`click`|-|-|
|`error`|-|-|



## 类型声明
::: details
/src/components/img/BaseImg.vue

``` ts


export type ImgFitType = "" | "fill" | "contain" | "cover" | "none" | "scale-down";

```

:::  


