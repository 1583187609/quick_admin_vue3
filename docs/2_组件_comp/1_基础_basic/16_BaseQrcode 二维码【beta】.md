# BaseQrcode 二维码  <Badge class="title-badge" type="warning" text="beta" />

::: warning 实验性
本功能处于实验性阶段，谨慎使用！
:::

&emsp;&emsp;目标：二维码组件  
&emsp;&emsp;注意：该功能待完善
## 基础用法



::: demo 
/demos/2_组件_comp/1_基础_basic/16_BaseQrcode 二维码【beta】/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`value`|-|`string`||
|`size`|-|`StrNum`|-|
|`level`|-|`QrcodeLevel`|`M`|
|`darkColor`|-|`string`|#`000`|
|`lightColor`|-|`string`|-|
|`quality`|-|`number`|-|


## 类型声明

::: details


``` ts
export type QrcodeLevel = "L" | "M" | "Q" | "H"; // 容错率L（低）H(高)
```

:::  
