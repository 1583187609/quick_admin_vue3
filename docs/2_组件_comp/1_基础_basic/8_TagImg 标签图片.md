# TagImg 标签图片

&emsp;&emsp;目标：给图片提供带 `bar `提示语的功能
## 基础用法

&emsp;&emsp;继承 `BaseImg `的属性，并额外提供了标签样式属性。

::: demo 
/demos/2_组件_comp/1_基础_basic/8_TagImg 标签图片/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`tagSize`|`el-tag `的大小|`CommonSize`|`defaultCommonSize`|
|`topTag`|-|`string \| NestedTagAttrs`|-|
|`bottomTag`|-|`string \| NestedTagAttrs`|-|
|`leftTags`|-|`TSParenthesizedType[]`|-|
|`hoverMove`|当鼠标移动到图片上时，顶部、底部的`bar`文本信息是否移开|`boolean`|`true`|


## 类型声明

::: details


``` ts
// 嵌套的tag属性，先临时这样取名
export interface NestedTagAttrs {
  text: string;
  attrs?: {
    type?: TagType;
  };
}
```

:::  
