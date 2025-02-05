---
hello: world
---

# 在 Vue 中使用

## 插值表达式

{{ 1 + 1 }}

## 指令

<ul>
<li v-for="i in 3" :key="i">第{{ i }}项</li>
</ul>

<script setup>
import { ref } from 'vue'
import UserInfo from '@/components/UserInfo.vue'

const count = ref(0)
</script>

## Markdown 编写即 template 内容

The count is: {{ count }}

<button :class="$style.button" @click="count++">点击增加</button>

::: warning
避免在 Markdown 中使用 `<style scoped>`

在 Markdown 中使用时，`<style scoped>` 需要为当前页面的每个元素添加特殊属性，这将显著增加页面的大小。当我们需要局部范围的样式时 `<style module>` 是首选。
:::

## 使用自定义组件

<UserInfo :class="$style['user-info']"/>

<style lang="scss" module>
.button {
  color: #eee;
  background: #777;
  border-radius: 4px;
  padding: 0 16px;
  &:hover{
    background: #999;
  }
}
.user-info{
  border-radius: $radius-main;
  @include shadow-main();
}
</style>

## 转义

This <span v-pre>{{ will be displayed as-is }}</span>

::: v-pre
{{ This will be displayed as-is }}`
:::

## 代码块中不转义

```js-vue
Hello {{ 1 + 1 }}
```

::: warning
这可能会让某些字符不能正确地进行语法高亮显示。
:::

## 使用 teleport 传递组件内容

VitePress 目前只有使用 teleport 传送到 body 的 SSG 支持。对于其他地方，可以将它们包裹在内置的 `<ClientOnly>` 组件中，或者通过 postRender 钩子将 teleport 标签注入到最终页面 HTML 中的正确位置。
