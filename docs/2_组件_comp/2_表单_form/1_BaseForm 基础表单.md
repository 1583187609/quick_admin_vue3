<script lang="ts" setup>
import {reactive} from "vue";
const model=reactive({
  xb: 0
})
const fields=[
  {prop: 'xm',label: '姓名',required:true},
  {prop: 'zh',label: '电话',extra:{ valid: 'phone' }},
  {prop: 'mm',label: '密码',extra:{ valid: 'password' }},
  {prop:'lx',label:'类型',type: 'select',options: [
    {label: '类型0',value: 0},
    {label: '类型1',value: 1},
    {label: '类型2',value: 2}
  ]},
  {prop:'xb',label:'性别',type: 'radio-group',options: [
    {label: '未知',value: 0},
    {label: '男',value: 1},
    {label: '女',value: 2}
  ]}
]
</script>

# 基础表单

## 表单字段类型

ElementPlus、内置、custom
<BaseForm v-model="model" :fields="fields"/>

## 常规属性

required

## 额外属性

```js
const extra = {
  valid: "phone", //password
  popover: "popover气泡提示",
  tips: "字段底部提示信息",
  example: "拼接在placeholder后面的示例文本内容",
};
```

## API

### 属性

| 属性  |     说明     |        类型         | 默认值 |
| :---: | :----------: | :-----------------: | :----: |
| model | 表单数据对象 | Record<string, any> |   -    |

### 方法

|  方法名  |                            说明                             |                                              类型                                               |
| :------: | :---------------------------------------------------------: | :---------------------------------------------------------------------------------------------: |
| validate | 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise | `(callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>` |

### 事件

| 事件名称 |          说明          |                             回调参数                              |
| :------: | :--------------------: | :---------------------------------------------------------------: |
| validate | 任一表单项被校验后触发 | `(prop: FormItemProp, isValid: boolean, message: string) => void` |

### 插槽

| 插槽名 |      说明      |  子标签  |
| :----: | :------------: | :------: |
|   -    | 自定义默认内容 | FormItem |

## TS 类型

::: details

```ts
type Test = "1" | "2";
interface Example {}
```

:::
