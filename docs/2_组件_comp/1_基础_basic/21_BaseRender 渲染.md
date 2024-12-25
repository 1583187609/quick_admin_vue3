# BaseRender 渲染

&emsp;&emsp;描述：渲染内容元素
## 基础用法

&emsp;&emsp;了解本部分内容，有助于了解后续的插槽自定义内容。本质就是通过`BaseRender`进行解析的。  
&emsp;&emsp;支持基础数据类型，即：`null, undefined, boolean, number, string`。  
&emsp;&emsp;支持对象，即：引入的同步/异步`Vue`组件。  
&emsp;&emsp;支持数组，即：等同于`h(...args)`中的`args`。  
&emsp;&emsp;支持函数，即：`h()`。

::: demo 
/demos/2_组件_comp/1_基础_basic/21_BaseRender 渲染/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`renderData`|-|`BaseRenderData`|-|


## 类型声明

::: details


``` ts
import type { Component } from "vue";

//虚拟dom，即 h 函数返回的对象
export type VirtualDomProps = VNode<RendererNode, RendererElement, { [key: string]: any }>;

// 直接导入的vue文件
export interface ImportVue {
  name: string;
  render: (_ctx, _cache, $props, $setup, $data, $options) => any;
  setup: (__props, { expose }) => any;
  __file: string;
  __hmrId: string;
  __name: string;
  __scopeId: string;
}
// 通过 defineAsyncComponent 导入的vue文件
export interface AsyncImportVue {
  name: string;
  setup: () => any;
  __asyncLoader: () => any;
  __asyncResolved: () => any;
}

// 直接引入的vue组件或通过defineAsyncComponent引入的异步组件
export type RenderVue = ImportVue | AsyncImportVue;

type Children = string | number | boolean | null | VNode | Children[];

type Slot = () => Children;

type Slots = { [name: string]: Slot };

type HType = string | Component;
type HProps = Object | null;
type HChildren = Children | Slot | Slots;

export type SlotsType = Slot | Slots;
export type HArgs = [HType, HProps?, HChildren?]; //h函数的参数

// 渲染组件的类型
export type BaseRenderComponentType =
  | RenderVue //引入的Vue文件
  | HArgs //h函数的参数
  | VirtualDomProps;

//可支持字符串、h函数生成的虚拟dom
export type BaseRenderData =
  | BaseDataType //基础数据类型
  | BaseRenderComponentType;
```

:::  
