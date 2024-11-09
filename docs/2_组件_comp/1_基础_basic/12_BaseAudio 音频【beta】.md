# BaseAudio 音频  <Badge class="title-badge" type="warning" text="beta" />

::: warning 实验性
本功能处于实验性阶段，谨慎使用！
:::

&emsp;&emsp;目标：处理基础逻辑，减少开发心智负担，并可暴露给自定义的播放面板直接使用。  
&emsp;&emsp;注意：该功能待完善。
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
|`controls`|-|`boolean`|-|

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
|`content`|自定义内容插槽|`playing, muted, currentTime, duration, timeStr, progress, play, pause, togglePlaying, toggleMuted, formatTime`|
