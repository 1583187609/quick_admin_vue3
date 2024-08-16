# BaseAudio 音频  <Badge class="title-badge" type="warning" text="beta" />


::: warning 实验性
本功能处于实验性阶段，谨慎使用！
:::



## 基础用法



::: demo 
/demos/2_组件_comp/1_基础_basic/12_BaseAudio 音频【beta】/1_BasicUse.vue
:::



## API 
### Props

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`src`|-|`string`|-|
|`showProgress`|-|`boolean`|`true`|
|`default`|-|`boolean`|`true`|

### Expose

|方法名|说明|类型|
|:---|:---|:---|
|`playing`|-|`() => void`|
|`progress`|-|`() => void`|
|`timeStr`|-|`() => void`|
|`muted`|-|`() => void`|
|`play`|-|`() => void`|
|`pause`|-|`() => void`|
|`audioCtx`|-|`() => void`|
|`toggleMuted`|-|`() => void`|
|`formatTime`|-|`() => void`|

### Slots

|插槽名|说明|Scope|
|:---|:---|:---|
|`default`|-|`playing, muted, currentTime, duration, timeStr, progress, play, pause, togglePlaying, toggleMuted, formatTime`|



## 类型声明
::: details
/src/components/BaseAudio.vue

``` ts


```

:::  


