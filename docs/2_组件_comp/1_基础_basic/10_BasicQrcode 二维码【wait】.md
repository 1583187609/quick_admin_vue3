# BasicQrcode 二维码  <Badge class="title-badge" type="danger" text="wait" />

::: danger 待完善
本功能暂不可用，敬请期待！
:::

&emsp;&emsp;目标：二维码组件  
&emsp;&emsp;注意：该功能待完善
## 基础用法



::: demo 
/demos/2_组件_comp/1_基础_basic/10_BasicQrcode 二维码【wait】/1_BasicUse.vue
:::


## API 

### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`value`|-|`string`||
|`size`|-|`StrNum`|`200`|
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
