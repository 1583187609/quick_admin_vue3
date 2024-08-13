# BarsImg Bar图片



## API 
### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`sizeType`|-|`CommonSize`|`defaultCommonSize`|
|`topBar`|-|`string \| BarAttrs`|-|
|`bottomBar`|-|`string \| BarAttrs`|-|
|`leftTags`|-|`TSParenthesizedType[]`|-|
|`hoverMove`|当鼠标移动到图片上时，顶部、底部的`bar`文本信息是否移开|`boolean`|`true`|



## 类型声明
::: details
/src/components/img/BarsImg.vue


``` ts


export interface BarAttrs {
  text: string;
  attrs?: {
    type?: TagType;
  };
}



```

:::  


