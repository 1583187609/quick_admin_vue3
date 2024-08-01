# BasicDialog 全局对话框





## API

### 属性

|属性|说明|类型|默认值|
|:---|:---|:---|:---|
|`body`|-|`any`|-|
|`footer`|-|`any`|-|


### 事件

|事件名称|说明|回调参数|
|:---|:---|:---|
|`update:modelValue`||-|





## 类型声明
::: details

``` ts
// showMessage("点击了【取消按钮 - cancel】", "info");
  },
  //必须要延迟一段时间，不然在过渡动画时间中时，获取到的高度会不足动画完成时的最终高度
  setTimeout(() => {
    // 当在dialog中，出现垂直滚动条时，设置height属性才能避免展示条数过多时（此时有额外按钮，筛选条件）时，最后几条条看不到的问题
    // body.style.height = `calc(100vh - ${cssVars.dialogTop} - ${cssVars.dialogTop} - 58px)`;
    body.style.height = hasVBar ? getComputedStyle(body).maxHeight : undefined;
```

:::  


