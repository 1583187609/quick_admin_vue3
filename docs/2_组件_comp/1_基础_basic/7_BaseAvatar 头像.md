# BaseAvatar 头像

&emsp;&emsp;目标：定位为头像。用作占位，实现快速开发，兼顾细节处理，性别默认头像等，同时考虑扩展性，可能会增加会员标识、用户类型标识等。
## 基础用法

&emsp;&emsp;继承 `BaseImg `的属性，并额外提供了`gender`（性别）属性。  
&emsp;&emsp;考虑扩展性（可能还有`vip`、状态标识），所以有必要将头像单独封装成一个组件

::: demo 
/demos/2_组件_comp/1_基础_basic/7_BaseAvatar 头像/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`src`|-|`string`|-|
|`gender`|性别|`GenderType`|`0`|


## 类型声明

::: details


``` ts
export type GenderType = 0 | 1;
```

:::  
